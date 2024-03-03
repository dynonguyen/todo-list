'use server';

import { CategoryForm } from '~/app/category/(new-category)/components/NewCategoryForm';
import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { Category } from '~/types/Category';
import { fetcher, mutation } from '~/utils/fetcher';

export const getCategories = () => {
  return fetcher<Category[]>(ENDPOINT.GET_CATEGORIES, { tags: [TAGS.CATEGORIES] });
};

export const getCategory = (id: string) => {
  return fetcher<Category>(ENDPOINT.GET_CATEGORY.replace(':id', id), { tags: [`${TAGS.CATEGORY}:${id}`] });
};

export const deleteCategory = async (id: string) => {
  return mutation(ENDPOINT.DELETE_CATEGORY.replace(':id', id), {
    method: 'DELETE',
    invalidatesTags: [TAGS.CATEGORIES]
  });
};

export const addCategory = async (category: CategoryForm) => {
  return mutation(ENDPOINT.POST_NEW_CATEGORY, {
    method: 'POST',
    body: category,
    invalidatesTags: [TAGS.CATEGORIES]
  });
};
