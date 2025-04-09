
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PulseProvider } from '@/contexts/PulseContext';

const Root: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Effect to handle any navigation issues or redirects
  useEffect(() => {
    // Example: Redirect authenticated users from certain pages
    // Check for any route-specific logic here
    
    console.log('Navigation to:', location.pathname);
    
    // Log route changes for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Current route:', location.pathname);
    }
  }, [location, navigate]);

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
