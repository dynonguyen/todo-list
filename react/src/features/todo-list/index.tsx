import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import ServerError from '~/components/ServerError';
import { fetcher } from '~/configs/query-client';
import { DEFAULT } from '~/constants/default';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '~/constants/key';
import { Paginated } from '~/types/Paginated';
import { Todo } from '~/types/Todo';
import LoadingSkeleton from './components/LoadingSkeleton';
import NoTodoFound from './components/NoTodoFound';
import TodoItem from './components/TodoItem';

export const TodoList = () => {
  const [searchParams] = useSearchParams();
  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE) || 1),
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT) || DEFAULT.PAGE_LIMIT)
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.TODOS, page, limit],
    queryFn: fetcher<Paginated<Todo>>(ENDPOINT.GET_TODOS, {
      params: { _page: page, _limit: limit, _sort: 'createdAt', _order: 'desc' }
    })
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <ServerError />;

  const todos = data?.docs || [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col gap-4 px-4 max-h-[550px]">
      {todos.length ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <NoTodoFound />}

      {Number(pagination?._total) > limit && <Pagination total={pagination?._total} />}
    </div>
  );
};

export default TodoList;
