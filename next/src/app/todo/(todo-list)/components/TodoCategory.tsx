'use client';

import useSWR from 'swr';
import { ENDPOINT } from '~/constants/endpoint';
import { Category } from '~/types/Category';
import { swrFetcher } from '~/utils/swr';

interface TodoCategoryProps {
  id: string;
}

export const TodoCategory = (props: TodoCategoryProps) => {
  const { id } = props;

  const { data: category } = useSWR<Category>(ENDPOINT.GET_CATEGORY.replace(':id', id), { fetcher: swrFetcher });

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
