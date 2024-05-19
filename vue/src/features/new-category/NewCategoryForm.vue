<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'
import { axiosInstance } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Category } from '~/types/Category'
import CategoryIconSelect from './CategoryIconSelect.vue'

const emit = defineEmits<{ success: [] }>()

type CategoryForm = Pick<Category, 'name' | 'color' | 'icon'>

const MAX = { NAME: 100 }
const DEFAULT = {
  COLOR: '#464748'
}

const schema = yup.object({
  name: yup.string().trim().required().max(MAX.NAME),
  icon: yup.string().trim().required(),
  color: yup.string().trim().required()
})

const addCategory = (category: CategoryForm) => {
  const now = new Date()
  return axiosInstance.post(ENDPOINT.POST_NEW_CATEGORY, {
    ...category,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now
  })
}

const { handleSubmit, resetForm, errors, defineField } = useForm<CategoryForm>({
  validationSchema: schema,
  initialValues: { color: DEFAULT.COLOR }
})
const toast = useToast()

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: addCategory,
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Success')
    resetForm()
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] })
    emit('success')
  }
})

const handleAddCategory = handleSubmit((form) => {
  mutation.mutate(form)
})

const [name, nameAttrs] = defineField('name')
const [color, colorAttrs] = defineField('color')
const [icon] = defineField('icon')
</script>

<template>
  <form class="flex flex-col gap-3 py-4" @submit="handleAddCategory">
    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text" :class="{ 'text-error': Boolean(errors.name) }">Category name:</span>
      </div>
      <input
        type="text"
        placeholder="Enter the name"
        class="w-full max-w-xs input input-bordered input-sm"
        :class="{ 'input-error': Boolean(errors.name) }"
        :maxlength="MAX.NAME"
        v-model="name"
        v-bind="nameAttrs"
      />

      <div v-if="errors.name" class="label">
        <span class="label-text-alt text-error">{{ errors.name }}</span>
      </div>
    </label>

    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text" :class="{ 'text-error': Boolean(errors.icon) }">Category icon:</span>
      </div>

      <CategoryIconSelect v-model="icon" />
    </label>

    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text" :class="{ 'text-error': Boolean(errors.color) }">Category color:</span>
      </div>
      <input type="color" v-model="color" v-bind="colorAttrs" />
    </label>

    <button type="submit" class="btn btn-primary btn-md">Submit</button>
  </form>
</template>
