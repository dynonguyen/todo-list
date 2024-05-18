<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { axiosInstance } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoin'
import { QUERY_KEY } from '~/constants/key'
import type { Todo } from '~/types/Todo'

const { id, title, createdAt, isCompleted } = defineProps<Todo>()

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
  markDoneMutation.mutate({ id, isCompleted: !isCompleted })
}

const handleDeleteTodo = (ev: MouseEvent) => {
  ev.preventDefault()
  ev.stopPropagation()

  if (deleteMutation.isPending.value) return
  deleteMutation.mutate({ id })
}
</script>

<template>
  <li
    className="group px-2.5 py-3 bg-base-200 hover:shadow-lg rounded-lg flex gap-3 items-center cursor-pointer transition-shadow"
    @click="handleToggleComplete"
  >
    <input
      type="checkbox"
      :checked="isCompleted"
      readOnly
      class="rounded-full checkbox checkbox-xs shrink-0"
      :class="{ 'checkbox-success': isCompleted }"
    />

    <div className="flex flex-col gap-1 grow">
      <h6 className="text-base font-normal break-all whitespace-pre-wrap ">{{ title }}</h6>
      <p className="text-sm text-gray-500">{{ dayjs(createdAt).format('HH:mm DD/MM/YYYY') }}</p>
    </div>

    <span v-if="deleteMutation.isPending.value" className="loading text-error loading-spinner"></span>
    <span
      v-else
      className="icon-[ph--trash-simple-fill] w-5 h-5 text-error shrink-0 group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all hover:text-error/80"
      @click="handleDeleteTodo"
    ></span>

    <!-- {categoryId && <TodoCategory id="{categoryId}" />} -->
  </li>
</template>
