import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import SearchBar from '~/components/SearchBar';
import ServerError from '~/components/ServerError';
import { fetcher } from '~/configs/query-client';
import { DEFAULT } from '~/constants/default';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '~/constants/key';
import { Paginated } from '~/types/Paginated';
import { Todo } from '~/types/Todo';
import LoadingSkeleton from './components/LoadingSkeleton';
import NoTodoFound from './components/NoTodoFound';
import TodoFilter from './components/TodoFilter';
import TodoItem from './components/TodoItem';

export const TodoList = () => {
  const [searchParams] = useSearchParams();
  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE) || 1),
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT) || DEFAULT.PAGE_LIMIT)
  ];

  const keyword = searchParams.get(SEARCH_PARAM_KEY.KEYWORD) || '';
  const filteredStatus = searchParams.get(SEARCH_PARAM_KEY.FILTER);
  const isCompletedFilter = (filteredStatus === 'completed' || filteredStatus === 'active') && {
    isCompleted: filteredStatus === 'completed'
  };
  const params = {
    _page: page,
    _limit: limit,
    _sort: 'createdAt',
    _order: 'desc',
    ...(keyword && { title_like: keyword }),
    ...isCompletedFilter
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.TODOS, { page, limit, keyword, ...isCompletedFilter }],
    queryFn: fetcher<Paginated<Todo>>(ENDPOINT.GET_TODOS, { params })
  });

  if (isError) return <ServerError />;

  const todos = data?.docs || [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col gap-4 p-4 pt-1 max-h-[550px]">
      <div className="flex flex-col gap-3">
        <SearchBar searchBy="title" />
        <TodoFilter />
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <React.Fragment>
          {todos.length ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <NoTodoFound />}

          {Number(pagination?._total) > limit && (
            <div className="flex justify-end w-full">
              <Pagination total={pagination?._total} />
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default TodoList;
