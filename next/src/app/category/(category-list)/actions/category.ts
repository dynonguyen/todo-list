'use server';

import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { mutation } from '~/utils/fetcher';

export const deleteCategory = async (id: string) => {
  return mutation(ENDPOINT.DELETE_CATEGORY.replace(':id', id), {
    method: 'DELETE',
    invalidatesTags: [TAGS.CATEGORIES]
  });
};
