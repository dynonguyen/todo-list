import { useQuery } from '@tanstack/react-query';
import { fetcher } from '~/configs/query-client';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/key';
import { Category } from '~/types/Category';
import CategoryItem from './components/CategoryItem';
import LoadingSkeleton from './components/LoadingSkeleton';

export const CategoryList = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: fetcher<Category[]>(ENDPOINT.GET_CATEGORIES)
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="flex gap-4 px-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
      <button className="btn btn-square btn-outline w-[55px] h-[55px] border-dashed">
        <span className="icon-[ph--plus] w-6 h-6"></span>
      </button>
    </div>
  );
};

export default CategoryList;
