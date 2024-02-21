import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '~/components/Loading';
import ServerError from '~/components/ServerError';
import { fetcher } from '~/configs/query-client';
import { QUERY_KEY } from '~/constants/key';
import { Todo } from '~/types/Todo';
import NoTodoFound from './components/NoTodoFound';
import TodoItem from './components/TodoItem';

export const TodoList = () => {
  const {
    data: todos = [],
    isFetching,
    isError
  } = useQuery({ queryKey: [QUERY_KEY.TODOS], queryFn: fetcher<Todo[]>('todos') });

  React.useEffect(() => {
    axios.get('http://localhost:3000/todos', { params: { _page: 1, _limit: 10 } }).then((res) => {
      console.log(res.headers['X-Total-Count']); // length of your data without page limit
    });
  }, []);
  if (isFetching) return <Loading />;

  if (isError) return <ServerError />;

  return (
    <div className="flex flex-col gap-4 px-4 max-h-[550px]">
      {todos.length ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <NoTodoFound />}
    </div>
  );
};

export default TodoList;
