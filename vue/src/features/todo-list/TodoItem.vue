<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { axiosInstance } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Todo } from '~/types/Todo'
import TodoCategory from './TodoCategory.vue'

const props = defineProps<Todo>()

const queryClient = useQueryClient()

const markDoneTodo = async ({ id, isCompleted }: Pick<Todo, 'id' | 'isCompleted'>) => {
  return axiosInstance.patch(ENDPOINT.PATCH_MARK_DONE.replace(':id', id), { isCompleted })
}

const deleteTodo = async ({ id }: Pick<Todo, 'id'>) => {
  return axiosInstance.delete(ENDPOINT.DELETE_TODO.replace(':id', id))
}

const markDoneMutation = useMutation({
  mutationFn: markDoneTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
  }
})

const deleteMutation = useMutation({
  mutationFn: deleteTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
  }
})

const handleToggleComplete = () => {
  markDoneMutation.mutate({ id: props.id, isCompleted: !props.isCompleted })
}

const handleDeleteTodo = (ev: MouseEvent) => {
  ev.preventDefault()
  ev.stopPropagation()

  if (deleteMutation.isPending.value) return
  deleteMutation.mutate({ id: props.id })
}
</script>

<template>
  <li
    class="group px-2.5 py-3 bg-base-200 hover:shadow-lg rounded-lg flex gap-3 items-center cursor-pointer transition-shadow"
    @click="handleToggleComplete"
  >
    <input
      type="checkbox"
      :checked="props.isCompleted"
      readOnly
      class="rounded-full checkbox checkbox-xs shrink-0"
      :class="{ 'checkbox-success': props.isCompleted }"
    />

    <div class="flex flex-col gap-1 grow">
      <h6 class="text-base font-normal break-all whitespace-pre-wrap">{{ props.title }}</h6>
      <p class="text-sm text-gray-500">{{ dayjs(props.createdAt).format('HH:mm DD/MM/YYYY') }}</p>
    </div>

    <span v-if="deleteMutation.isPending.value" class="loading text-error loading-spinner"></span>
    <span
      v-else
      class="icon-[ph--trash-simple-fill] w-5 h-5 text-error shrink-0 group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all hover:text-error/80"
      @click="handleDeleteTodo"
    ></span>

    <TodoCategory v-if="categoryId" :id="categoryId" />
  </li>
</template>
