
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarClock } from 'lucide-react';

const TaskAudit = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Audit</h1>
          <p className="text-gray-600 mt-2">
            Review and audit project tasks, track progress, and identify bottlenecks.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/task-summary?tab=beta-plan">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <CalendarClock className="h-4 w-4" />
              Review Beta Launch Plan
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-700">
          Task audit functionality will be displayed here. You can view detailed task analytics, progress reports, and audit logs.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-100">
          <p className="text-blue-700 font-medium">
            Need to review the Beta Launch Plan? Click the "Review Beta Launch Plan" button above to access the detailed timeline and planning information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskAudit;
