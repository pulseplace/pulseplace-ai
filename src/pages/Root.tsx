
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PulseProvider } from '@/contexts/PulseContext';

const Root: React.FC = () => {
  return (
    <AuthProvider>
      <PulseProvider>
        <div className="min-h-screen">
          <Outlet />
        </div>
      </PulseProvider>
    </AuthProvider>
  );
};

export default Root;
