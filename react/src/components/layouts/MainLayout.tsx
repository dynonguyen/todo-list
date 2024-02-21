import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import TopBar from './TopBar';

export const MainLayout = () => {
  return (
    <div className="max-w-[375px] mx-auto my-8 overflow-hidden shadow-lg rounded-2xl bg-base-300">
      <TopBar />

      <div className="flex-grow h-[450px] my-4 overflow-auto">
        <React.Suspense fallback={null}>
          <Outlet />
        </React.Suspense>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
