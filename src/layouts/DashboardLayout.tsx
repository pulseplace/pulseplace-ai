
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavigation from '@/components/dashboard/DashboardNavigation';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold md:ml-2">PulsePlace.ai Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-sm text-gray-600 hidden md:inline-block">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-200 ease-in-out z-30
          w-64 bg-white border-r border-gray-200 pt-16
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
        `}>
          <div className="h-full px-4 py-6">
            <DashboardNavigation />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 py-8">
          <Outlet />
        </main>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
