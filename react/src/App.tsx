import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './configs/query-client';
import router from './routes/router';

function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
