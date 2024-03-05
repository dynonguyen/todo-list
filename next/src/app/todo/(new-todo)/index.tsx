'use client';

import clsx from 'clsx';
import React from 'react';
const NewTodoForm = React.lazy(() => import('./components/NewTodoForm'));

export const NewTodo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <button
        className="relative w-16 h-16 drawer-button -top-11 btn btn-circle btn-primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <span className="icon-[ph--plus] w-8 h-8 text-gray-300"></span>
      </button>

      <dialog className={`modal ${clsx({ 'modal-open': open })}`}>
        <div className="relative w-80 modal-box -top-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">New task</h3>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {open && (
            <React.Suspense
              fallback={
                <div className="flex justify-center my-2">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              }
            >
              <NewTodoForm onSuccess={() => setOpen(false)} />
            </React.Suspense>
          )}
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default NewTodo;
