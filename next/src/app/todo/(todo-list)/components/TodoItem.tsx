'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { toast } from 'react-toastify';
import { Todo } from '~/types/Todo';
import { deleteTodo, makeDoneTodo } from '../actions/todo';
import TodoCategory from './TodoCategory';

export const TodoItem = (props: Todo) => {
  const { id, title, createdAt, isCompleted, categoryId } = props;
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleToggleComplete = async () => {
    const [error] = await makeDoneTodo({ id, isCompleted: !isCompleted });
    if (error) toast.error(error.message);
  };

  const handleDeleteTodo = async (ev: React.MouseEvent) => {
    setIsDeleting(true);

    ev.preventDefault();
    ev.stopPropagation();

    const [error] = await deleteTodo(id);

    if (error) toast.error(error.message);

    setIsDeleting(false);
  };

  return (
    <li
      className="group px-2.5 py-3 bg-base-200 hover:shadow-lg rounded-lg flex gap-3 items-center cursor-pointer transition-shadow"
      onClick={handleToggleComplete}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        readOnly
        className={`rounded-full checkbox checkbox-xs shrink-0 ${clsx({ 'checkbox-success': isCompleted })}`}
      />

      <div className="flex flex-col gap-1 grow">
        <h6 className="text-base font-normal break-all whitespace-pre-wrap ">{title}</h6>
        <p className="text-sm text-gray-500">{dayjs(createdAt).format('HH:mm DD/MM/YYYY')}</p>
      </div>

      {isDeleting ? (
        <span className="loading text-error loading-spinner"></span>
      ) : (
        <span
          className="icon-[ph--trash-simple-fill] w-5 h-5 text-error shrink-0 group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all hover:text-error/80"
          onClick={handleDeleteTodo}
        ></span>
      )}

      {categoryId && <TodoCategory id={categoryId} />}
    </li>
  );
};

export default TodoItem;
