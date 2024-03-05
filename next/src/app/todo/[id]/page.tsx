import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { Todo } from '~/types/Todo';
import { fetcher } from '~/utils/fetcher';

export const generateStaticParams = async () => {
  const [_, todos = []] = await fetcher<Todo[]>(ENDPOINT.GET_TODOS, { tags: [TAGS.TODOS], next: { revalidate: 30 } });

  return todos.map((todo) => ({ id: todo.id }));
};

export const TodoPage = (props: any) => {
  const { params } = props;

  return <div>{params.id}</div>;
};

export default TodoPage;
