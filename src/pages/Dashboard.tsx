
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '@/components/dashboard/DashboardNavigation';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <DashboardNavigation />
        </aside>
        
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate('/dashboard/pulse-score-admin')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">PulseScore Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Manage PulseScore settings and view certification data
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate('/teams')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  View and manage team PulseScore insights
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate('/certification-engine')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Certification Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Manage your workplace culture certification
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate('/debug-log')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Debug Log</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Track and manage issues across the application
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
