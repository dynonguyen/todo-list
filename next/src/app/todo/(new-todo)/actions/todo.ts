'use server';

import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { Todo } from '~/types/Todo';
import { mutation } from '~/utils/fetcher';

export const addTodo = async (todo: Todo) => {
  return mutation(ENDPOINT.POST_NEW_TODO, {
    method: 'POST',
    body: todo,
    invalidatesTags: [TAGS.TODOS]
  });
};
