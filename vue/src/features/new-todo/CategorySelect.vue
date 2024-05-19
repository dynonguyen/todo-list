<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { fetcher } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Category } from '~/types/Category'

const model = defineModel()
const open = ref(false)

const { data: categories } = useQuery({
  queryKey: [QUERY_KEY.CATEGORIES],
  queryFn: fetcher<Category[]>(ENDPOINT.GET_CATEGORIES),
  enabled: open
})

const handleSelect = (id: string) => {
  open.value = false
  model.value = id
}
</script>

<template>
  <div
    v-if="model"
    class="flex items-center justify-center transition-colors rounded-md cursor-pointer w-11 h-11 bg-base-300/70 hover:bg-base-300"
    @click.prevent="open = true"
  >
    <img class="w-5 h-5 mx-auto" :src="categories?.find((cat) => cat.id === model)?.icon" />
  </div>
  <button v-else type="button" class="btn btn-sm" @click="open = true">
    <span class="icon-[ph--tag-fill]"></span>
    Choose category
  </button>

  <dialog class="modal" :class="{ 'modal-open': open }">
    <div class="modal-box">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">Choose category</h3>
        <button type="button" class="btn btn-sm btn-circle btn-ghost" @click="open = false">✕</button>
      </div>

      <p v-if="!categories?.length" class="mt-4 text-sm text-center text-gray-500">No category found</p>
      <div v-else class="grid grid-cols-4 gap-4 py-4">
        <div v-for="category in categories" :key="category.id" class="tooltip tooltip-top" :data-tip="category.name">
          <div
            class="flex items-center justify-center w-10 h-10 transition-shadow rounded-md cursor-pointer hover:shadow-lg"
            :style="{ backgroundColor: category.color }"
            @click.prevent="handleSelect(category.id)"
          >
            <img class="w-5 h-5" :src="category.icon" />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
