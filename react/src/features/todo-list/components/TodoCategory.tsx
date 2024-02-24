import { useQuery } from '@tanstack/react-query';
import { fetcher } from '~/configs/query-client';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/key';
import { Category } from '~/types/Category';

interface TodoCategoryProps {
  id: string;
}

export const TodoCategory = (props: TodoCategoryProps) => {
  const { id } = props;

  const { data: category } = useQuery({
    queryKey: [QUERY_KEY.CATEGORY, id],
    queryFn: fetcher<Category>(ENDPOINT.GET_CATEGORY.replace(':id', id))
  });

  if (!category) return null;

  return (
    <div className="tooltip" data-tip={category.name}>
      <div
        className="flex items-center justify-center w-8 h-8 transition-colors rounded-md cursor-pointer bg-base-300/70 hover:bg-base-300"
        style={{ backgroundColor: category.color }}
      >
        <img className="w-4 h-4 mx-auto" src={category.icon} />
      </div>
    </div>
  );
};

export default TodoCategory;
