import clsx from 'clsx';
import React from 'react';
import NewCategoryForm from './components/NewCategoryForm';

export const NewCategory = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-2">
        <button className="w-16 h-16 mx-auto border-dashed btn btn-square btn-outline" onClick={() => setOpen(true)}>
          <span className="icon-[ph--plus] w-6 h-6"></span>
        </button>
        <div className="max-w-full text-sm text-center truncate text-base-content/80">Add new</div>
      </div>

      <dialog className={`modal ${clsx({ 'modal-open': open })}`}>
        <div className="relative w-80 modal-box -top-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">New category</h3>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <NewCategoryForm onSuccess={() => setOpen(false)} />
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default NewCategory;
