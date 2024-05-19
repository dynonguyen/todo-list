<script setup lang="ts">
import { ref } from 'vue'
import { useGetCategoryIcons } from './hooks/useGetCategoryIcons'

const model = defineModel<string>()

const open = ref(false)
const search = ref('')

const icons = useGetCategoryIcons(search)

const handleSelect = (icon: string) => {
  model.value = icon
  open.value = false
}
</script>

<template>
  <div
    v-if="model"
    class="flex items-center justify-center transition-colors rounded-md cursor-pointer w-11 h-11 bg-base-300/70 hover:bg-base-300"
    @click="open = !open"
  >
    <img :src="model" class="w-5 h-5 mx-auto" />
  </div>
  <button v-else type="button" class="btn btn-sm" @click="open = !open">Choose icon</button>

  <div class="dropdown" :class="{ 'dropdown-open': open }">
    <div class="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-full">
      <div class="mb-4">
        <label class="flex items-center gap-2 input input-sm input-bordered">
          <input v-model="search" type="text" class="grow" placeholder="Search" />
          <span class="icon-[ph--magnifying-glass] w-4 h-4 opacity-70"></span>
        </label>
      </div>

      <div class="flex flex-wrap gap-4">
        <div v-if="!icons?.length" class="mx-auto text-sm text-center text-gray-500">No icon found</div>
        <template v-else>
          <img
            v-for="icon in icons"
            :key="icon"
            :title="icon.split('/').pop()?.replace('.svg', '')"
            :src="icon"
            @click="handleSelect(icon)"
            class="w-5 h-5 mx-auto transition-transform cursor-pointer hover:scale-110"
          />
        </template>
      </div>
    </div>
  </div>
</template>
