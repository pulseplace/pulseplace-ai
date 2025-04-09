
import React from 'react';
import DashboardUI from '@/components/dashboard/DashboardUI';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">PulsePlace Dashboard</h1>
      <p className="text-gray-600 mb-6">Your organization's engagement insights and certification status.</p>
      
      <DashboardUI />
    </div>
  );
};

export default Dashboard;
