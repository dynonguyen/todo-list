<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { axiosInstance } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Category } from '~/types/Category'

const deleteCategory = async ({ id }: Pick<Category, 'id'>) => {
  return axiosInstance.delete(ENDPOINT.DELETE_CATEGORY.replace(':id', id))
}
const props = defineProps<Category>()

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: deleteCategory,
  onSuccess: () => {
    queryClient.setQueriesData<Category[]>({ queryKey: [QUERY_KEY.CATEGORIES] }, (prevData) => {
      return prevData?.filter((item) => item.id !== props.id)
    })
  }
})

const handleDelete = () => {
  if (mutation.isPending.value) return
  mutation.mutate({ id: props.id })
}
</script>

<template>
  <div class="flex flex-col gap-2" :title="props.name">
    <div
      class="relative flex items-center justify-center w-16 h-16 mx-auto overflow-hidden rounded-lg cursor-pointer group"
      :style="{ backgroundColor: props.color }"
    >
      <img class="w-8 h-8" :src="props.icon" />
      <span
        class="absolute flex items-center justify-center invisible w-full h-full transition-all opacity-0 bg-gray-800/70 group-hover:visible group-hover:opacity-100"
        @click="handleDelete"
      >
        <span v-if="mutation.isPending.value" class="loading text-error loading-spinner"></span>
        <span
          v-else
          class="w-5 h-5 text-error cursor-pointer hover:scale-110 transition-transform icon-[ph--trash-simple-fill]"
        ></span>
      </span>
    </div>
    <div class="max-w-full text-sm text-center truncate text-base-content/80">{{ props.name }}</div>
  </div>
</template>
