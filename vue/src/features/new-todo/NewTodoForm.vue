<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'
import { axiosInstance } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Todo } from '~/types/Todo'
import CategorySelect from './CategorySelect.vue'

type TodoForm = Pick<Todo, 'title' | 'categoryId'>

const emit = defineEmits<{ success: [] }>()

const MAX = { TITLE: 100 }

const addTodo = (todo: TodoForm) => {
  const now = new Date()
  return axiosInstance.post(ENDPOINT.POST_NEW_TODO, {
    ...todo,
    id: uuidv4(),
    isCompleted: false,
    createdAt: now,
    updatedAt: now
  })
}

const schema = yup.object({ title: yup.string().trim().required().max(MAX.TITLE) })
const { errors, defineField, handleSubmit, resetForm } = useForm<TodoForm>({
  validationSchema: schema
})

const toast = useToast()

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: addTodo,
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Success')
    resetForm()
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
    emit('success')
  }
})

const [title, titleAttr] = defineField('title')
const [categoryId] = defineField('categoryId')

const handleAddTodo = handleSubmit((form: TodoForm) => {
  mutation.mutate(form)
})
</script>

<template>
  <form novalidate class="flex flex-col gap-4 mt-2" @submit="handleAddTodo">
    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text" :class="{ 'text-error': errors.title }">Title:</span>
      </div>
      <input
        type="text"
        placeholder="Enter title"
        class="w-full max-w-xs input input-bordered input-sm"
        :class="{ 'input-error': errors.title }"
        :maxLength="MAX.TITLE"
        autoFocus
        v-model="title"
        v-bind="titleAttr"
      />

      <div v-if="errors.title" class="label">
        <span class="label-text-alt text-error">{{ errors.title }}</span>
      </div>
    </label>

    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text">Category:</span>
      </div>
      <CategorySelect v-model="categoryId" />
    </label>

    <button class="btn btn-primary btn-md">
      <span v-if="mutation.isPending.value" class="loading loading-spinner"></span> Submit
    </button>
  </form>
</template>
