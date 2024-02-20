export const Todo = () => {
  return (
    <li className="px-2.5 py-3 bg-base-200 rounded-lg flex gap-3 items-center cursor-pointer">
      <input type="checkbox" name="radio-1" className="rounded-full checkbox checkbox-xs shrink-0" />
      <div className="flex flex-col gap-1">
        <h6 className="text-base font-normal">
          Todo title Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, quas.
        </h6>
        <p className="text-sm text-gray-500">23:15 11/12/2023</p>
      </div>
    </li>
  );
};

export default Todo;
