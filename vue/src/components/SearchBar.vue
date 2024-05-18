<script setup lang="ts">
import { debounce, omit } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { SEARCH_PARAM_KEY } from '~/constants/key'

const { searchBy } = defineProps<{ searchBy: string }>()

const router = useRouter()
const { query } = useRoute()

const handleSearch = debounce((ev: Event) => {
  const keyword = (ev.target as HTMLInputElement).value.trim()

  if (keyword) {
    router.push({ query: { ...query, [SEARCH_PARAM_KEY.SEARCH_BY]: searchBy, [SEARCH_PARAM_KEY.KEYWORD]: keyword } })
  } else {
    router.push({ query: omit(query, [SEARCH_PARAM_KEY.SEARCH_BY, SEARCH_PARAM_KEY.KEYWORD]) })
  }
}, 350)
</script>

<template>
  <label className="flex items-center h-10 gap-2 input input-bordered">
    <input
      type="text"
      className="grow"
      placeholder="Search"
      autoFocus
      :defaultValue="$route.query[SEARCH_PARAM_KEY.KEYWORD] || ''"
      @input="handleSearch"
    />
    <span className="icon-[ph--magnifying-glass] w-4 h-4 text-gray-500"></span>
  </label>
</template>
