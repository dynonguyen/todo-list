<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { fetcher } from '~/configs/query-client'
import { ENDPOINT } from '~/constants/endpoint'
import { QUERY_KEY } from '~/constants/key'
import type { Category } from '~/types/Category'
import NewCategory from '../new-category/NewCategory.vue'
import CategoryItem from './CategoryItem.vue'
import LoadingSkeleton from './LoadingSkeleton.vue'

const { data: categories = [], isLoading } = useQuery({
  queryKey: [QUERY_KEY.CATEGORIES],
  queryFn: fetcher<Category[]>(ENDPOINT.GET_CATEGORIES)
})
</script>

<template>
  <LoadingSkeleton v-if="isLoading" />
  <div v-else class="grid grid-cols-4 gap-4 px-4">
    <template v-if="categories?.length">
      <CategoryItem v-for="category in categories" :key="category.id" :="category" />
    </template>

    <NewCategory />
  </div>
</template>
