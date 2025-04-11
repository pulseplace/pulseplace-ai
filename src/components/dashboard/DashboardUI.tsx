
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import DashboardOverview from './DashboardOverview';

const DashboardUI = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">PulsePlace.ai Dashboard</h1>
        </div>
      </header>
      <div className="flex">
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 p-6 w-full">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
            <DashboardOverview />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardUI;
