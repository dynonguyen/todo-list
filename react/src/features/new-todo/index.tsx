import React from 'react';

export const NewTodo = () => {
  return (
    <React.Fragment>
      <button className="relative w-16 h-16 -top-11 btn btn-circle btn-primary">
        <span className="icon-[ph--plus] w-8 h-8 text-gray-300"></span>
      </button>
    </React.Fragment>
  );
};

export default NewTodo;
