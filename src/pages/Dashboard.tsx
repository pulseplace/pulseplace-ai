
import React from 'react';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import TaskRunner from '@/components/chat/TaskRunner';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Task Runner Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">System Tasks</h2>
        <TaskRunner />
      </div>
      
      {/* Main Dashboard Content */}
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
