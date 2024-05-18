<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SEARCH_PARAM_KEY } from '~/constants/key'

export type FilterValue = 'all' | 'active' | 'completed'

const route = useRoute()
const router = useRouter()

const filters = computed<Array<{ value: FilterValue; title: string; active: boolean }>>(() => {
  const query = route.query
  const filtered = (query[SEARCH_PARAM_KEY.FILTER] || 'all') as FilterValue

  return [
    { value: 'all', title: 'All', active: filtered !== 'active' && filtered !== 'completed' },
    { value: 'active', title: 'Active', active: filtered === 'active' },
    { value: 'completed', title: 'Completed', active: filtered === 'completed' }
  ]
})

const handleFilterChange = (filter: FilterValue) => {
  router.push({ query: { ...route.query, [SEARCH_PARAM_KEY.FILTER]: filter } })
}
</script>

<template>
  <div class="flex justify-between gap-2">
    <button
      v-for="filter in filters"
      :key="filter.value"
      class="btn btn-outline grow btn-sm btn-neutral"
      :class="{ 'btn-active btn-accent': filter.active }"
      @click="handleFilterChange(filter.value)"
    >
      {{ filter.title }}
    </button>
  </div>
</template>
