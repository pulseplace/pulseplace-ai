
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="py-4 px-6 shadow-sm bg-white">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png"
              alt="PulsePlace Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-purple-700">PulsePlace.ai</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <Outlet />
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Need help? Contact <a href="mailto:support@pulseplace.ai" className="text-purple-600 hover:text-purple-800">support@pulseplace.ai</a>
            </p>
          </div>
        </div>
      </main>
      
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PulsePlace.ai - All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
