<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT } from '~/constants/default'
import { SEARCH_PARAM_KEY } from '~/constants/key'

const props = defineProps<{ total: number }>()

const route = useRoute()
const router = useRouter()

const params = computed(() => {
  const { query } = route

  const [page, limit] = [
    Number(query[SEARCH_PARAM_KEY.PAGE] || 1),
    Number(query[SEARCH_PARAM_KEY.LIMIT] || DEFAULT.PAGE_LIMIT)
  ]

  return { page, limit, totalPage: Math.ceil(props.total / limit) }
})

const handlePageChange = (currentPage: number) => {
  router.push({ query: { ...route.query, [SEARCH_PARAM_KEY.PAGE]: currentPage.toString() } })
}
</script>

<template>
  <div class="flex justify-center join">
    <button
      class="join-item btn btn-sm"
      :class="{ 'btn-disabled': params.page <= 1 }"
      @click="handlePageChange(params.page - 1)"
    >
      «
    </button>
    <button class="join-item btn btn-sm">Page {{ params.page }}</button>
    <button
      class="join-item btn btn-sm"
      :class="{ 'btn-disabled': params.page >= params.totalPage }"
      @click="handlePageChange(params.page + 1)"
    >
      »
    </button>
  </div>
</template>
