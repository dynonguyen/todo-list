'use server';

import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { Todo } from '~/types/Todo';
import { mutation } from '~/utils/fetcher';

export const makeDoneTodo = ({ id, isCompleted }: Pick<Todo, 'id' | 'isCompleted'>) => {
  return mutation(`${ENDPOINT.PATCH_MARK_DONE.replace(':id', id)}`, {
    method: 'PATCH',
    body: { isCompleted },
    invalidatesTags: [TAGS.TODOS]
  });
};

export const deleteTodo = (id: string) => {
  return mutation(`${ENDPOINT.DELETE_TODO.replace(':id', id)}`, {
    method: 'DELETE',
    invalidatesTags: [TAGS.TODOS]
  });
};
