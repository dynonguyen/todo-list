<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { fetcher } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Category } from '~/types/Category'

const props = defineProps<{ id: string }>()

const { data: category } = useQuery({
  queryKey: [QUERY_KEY.CATEGORY, props.id],
  queryFn: fetcher<Category>(ENDPOINT.GET_CATEGORY.replace(':id', props.id))
})
</script>

<template>
  <div v-if="category" class="tooltip" :data-tip="category.name">
    <div
      class="flex items-center justify-center w-8 h-8 transition-colors rounded-md cursor-pointer bg-base-300/70 hover:bg-base-300"
      :style="{ backgroundColor: category.color }"
    >
      <img class="w-4 h-4 mx-auto" :src="category.icon" />
    </div>
  </div>
</template>
