import clsx from 'clsx';
import dayjs from 'dayjs';
import { Todo } from '~/types/Todo';

export const TodoItem = (props: Todo) => {
  const { title, createdAt, isCompleted } = props;

  return (
    <li className="px-2.5 py-3 bg-base-200 rounded-lg flex gap-3 items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isCompleted}
        readOnly
        className={`rounded-full checkbox checkbox-xs shrink-0 ${clsx({ 'checkbox-success': isCompleted })}`}
      />
      <div className="flex flex-col gap-1">
        <h6 className="text-base font-normal">{title}</h6>
        <p className="text-sm text-gray-500">{dayjs(createdAt).format('HH:mm DD/MM/YYYY')}</p>
      </div>
    </li>
  );
};

export default TodoItem;
