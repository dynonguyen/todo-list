import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '~/components/layouts/MainLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const TodoList = React.lazy(() => import('~/features/todo-list'));

// -----------------------------
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: PATH.TODO, element: <TodoList /> },
      { path: PATH.CATEGORY, element: <div>Category</div> },
      { path: PATH.CALENDAR, element: <div>Calendar</div> },
      { path: PATH.FOCUS, element: <div>Focus</div> },
      { path: '*', element: <Navigate to={PATH.TODO} /> }
    ]
  }
]);

export default router;
