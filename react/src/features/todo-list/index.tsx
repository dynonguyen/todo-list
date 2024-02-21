import noTodoSrc from '~/assets/no-todo.svg';

export const TodoList = () => {
  return (
    <div className="flex flex-col gap-4 max-h-[550px]">
      <div className="flex flex-col items-center justify-center">
        <img src={noTodoSrc} className="w-56" />
        <div className="flex flex-col gap-2.5">
          <h3 className="text-lg text-center">What do you want to do today?</h3>
          <span className="text-sm text-center">Tap + to add your tasks</span>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
