
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Route, AlertCircle } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">PulsePlace Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-3">
            <Route className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Culture Insights</h3>
          </div>
          <p className="text-gray-600 mb-4">View your workplace culture analytics and certification progress.</p>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard/insights">View Insights</Link>
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-medium">Certification Status</h3>
          </div>
          <p className="text-gray-600 mb-4">Track your progress towards PulsePlace certification.</p>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard/certification">View Status</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
