'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { addTodo } from '~/server-actions/todo';
import { Todo } from '~/types/Todo';
import CategorySelect from './CategorySelect';

const MAX = { TITLE: 100 };

const schema = yup.object({
  title: yup.string().trim().required().max(MAX.TITLE)
});

type TodoForm = Pick<Todo, 'title' | 'categoryId'>;

export const NewTodoForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TodoForm>({
    resolver: yupResolver(schema)
  });
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddTodo = async (todo: TodoForm) => {
    setIsAdding(true);
    const now = new Date().toString();

    const [error] = await addTodo({
      ...todo,
      id: uuidv4(),
      isCompleted: false,
      createdAt: now,
      updatedAt: now
    });

    if (error) toast.error(error.message);
    else {
      onSuccess();
      reset({ title: '', categoryId: '' });
    }

    setIsAdding(false);
  };

  return (
    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit(handleAddTodo)}>
      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className={clsx('label-text', { 'text-error': errors.title })}>Title:</span>
        </div>
        <input
          type="text"
          placeholder="Enter title"
          className={clsx('w-full max-w-xs input input-bordered input-sm', {
            'input-error': errors.title
          })}
          maxLength={MAX.TITLE}
          autoFocus
          {...register('title')}
        />
        {errors.title && (
          <div className="label">
            <span className="label-text-alt text-error">{errors.title.message}</span>
          </div>
        )}
      </label>

      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className="label-text">Category:</span>
        </div>
        <CategorySelect
          onSelect={(id) => {
            setValue('categoryId', id, { shouldValidate: true });
          }}
          value={getValues('categoryId')}
        />
      </label>

      <button className="btn btn-primary btn-md">
        {isAdding && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </form>
  );
};

export default NewTodoForm;
