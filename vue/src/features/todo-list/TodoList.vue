<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '~/components/SearchBar.vue'
import ServerError from '~/components/ServerError.vue'
import { fetcher } from '~/configs/query-client'
import { DEFAULT } from '~/constants/default'
import { ENDPOINT } from '~/constants/endpoin'
import { QUERY_KEY, SEARCH_PARAM_KEY } from '~/constants/key'
import type { Paginated } from '~/types/Paginated'
import type { Todo } from '~/types/Todo'
import LoadingSkeleton from './LoadingSkeleton.vue'
import NoTodoFound from './NoTodoFound.vue'
import TodoFilter from './TodoFilter.vue'
import TodoItem from './TodoItem.vue'

const route = useRoute()

const params = computed(() => {
  const { query } = route

  const [page, limit] = [
    Number(query[SEARCH_PARAM_KEY.PAGE] || 1),
    Number(query[SEARCH_PARAM_KEY.LIMIT] || DEFAULT.PAGE_LIMIT)
  ]

  const keyword = query[SEARCH_PARAM_KEY.KEYWORD] || ''
  const filteredStatus = query[SEARCH_PARAM_KEY.FILTER]
  const isCompletedFilter = (filteredStatus === 'completed' || filteredStatus === 'active') && {
    isCompleted: filteredStatus === 'completed'
  }

  return {
    _page: page,
    _limit: limit,
    _sort: 'createdAt',
    _order: 'desc',
    ...(keyword && { title_like: keyword }),
    ...isCompletedFilter
  }
})

const { data, isLoading, isError } = useQuery({
  queryKey: [QUERY_KEY.TODOS, params.value],
  queryFn: fetcher<Paginated<Todo>>(ENDPOINT.GET_TODOS, { params: params.value })
})
</script>

<template>
  <ServerError v-if="isError" />
  <div v-else className="flex flex-col gap-4 p-4 pt-1 max-h-[550px]">
    <div className="flex flex-col gap-3">
      <SearchBar searchBy="title" />
      <TodoFilter />
    </div>

    <LoadingSkeleton v-if="isLoading" />
    <template v-else>
      <NoTodoFound v-if="!data?.docs || data?.docs.length === 0" />
      <template v-else>
        <TodoItem v-for="todo in data.docs" :key="todo.id" :="todo" />
      </template>
    </template>
  </div>
</template>
