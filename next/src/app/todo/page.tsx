import Pagination from '~/components/Pagination';
import SearchBar from '~/components/SearchBar';
import { DEFAULT } from '~/constants/default';
import { ENDPOINT } from '~/constants/endpoint';
import { SEARCH_PARAM_KEY } from '~/constants/key';
import { Paginated } from '~/types/Paginated';
import { Todo } from '~/types/Todo';
import { fetcher } from '~/utils/fetcher';
import NoTodoFound from './(todo-list)/components/NoTodoFound';
import TodoFilter from './(todo-list)/components/TodoFilter';
import TodoItem from './(todo-list)/components/TodoItem';

type TodoListPageProps = {
  searchParams: Record<string, string>;
};

export const TodoListPage = async (props: TodoListPageProps) => {
  const { searchParams } = props;

  const [page, limit] = [
    Number(searchParams[SEARCH_PARAM_KEY.PAGE] || 1),
    Number(searchParams[SEARCH_PARAM_KEY.LIMIT] || DEFAULT.PAGE_LIMIT)
  ];

  const keyword = searchParams[SEARCH_PARAM_KEY.KEYWORD] || '';
  const filteredStatus = searchParams[SEARCH_PARAM_KEY.FILTER];
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

  const [_, data] = await fetcher<Paginated<Todo>>(ENDPOINT.GET_TODOS, { params });

  const todos = data?.docs || [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col gap-4 p-4 pt-1 max-h-[550px]">
      <div className="flex flex-col gap-3">
        <SearchBar searchBy="title" />
        <TodoFilter />
      </div>

      {todos.length ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <NoTodoFound />}
      {Number(pagination?._total) > limit && <Pagination total={pagination?._total} />}
    </div>
  );
};

export default TodoListPage;
