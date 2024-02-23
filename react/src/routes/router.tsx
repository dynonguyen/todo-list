import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import ComingSoon from '~/components/ComingSoon';
import MainLayout from '~/components/layouts/MainLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const TodoList = React.lazy(() => import('~/features/todo-list'));
const CategoryList = React.lazy(() => import('~/features/category-list'));

// -----------------------------
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: PATH.TODO, element: <TodoList /> },
      { path: PATH.CATEGORY, element: <CategoryList /> },
      { path: PATH.CALENDAR, element: <ComingSoon /> },
      { path: PATH.FOCUS, element: <ComingSoon /> },
      { path: '*', element: <Navigate to={PATH.TODO} /> }
    ]
  }
]);

export default router;
