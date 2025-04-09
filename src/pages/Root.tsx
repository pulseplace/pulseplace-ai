
import React from 'react';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default Root;
