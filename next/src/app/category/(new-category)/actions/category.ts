'use server';

import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { mutation } from '~/utils/fetcher';
import { CategoryForm } from '../components/NewCategoryForm';

export const addCategory = async (category: CategoryForm) => {
  return mutation(ENDPOINT.POST_NEW_CATEGORY, {
    method: 'POST',
    body: category,
    invalidatesTags: [TAGS.CATEGORIES]
  });
};
