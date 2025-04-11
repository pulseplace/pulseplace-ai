
import React from 'react';
import { Activity, CheckCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TaskTrackerProps {
  mode?: 'inline' | 'full';
  progress?: number;
}

export const TaskTracker: React.FC<TaskTrackerProps> = ({
  mode = 'inline',
  progress = 70
}) => {
  if (mode === 'inline') {
    return (
      <div className="bg-gray-50 rounded-md p-2">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-pulse-600" />
          <span className="text-sm font-medium">Active Tasks</span>
        </div>
        <Progress value={progress} className="h-2 mb-1" />
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Q2 Certification</span>
          <span>{progress}%</span>
        </div>
      </div>
    );
  }
  
  // Full mode with more details
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-medium mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-pulse-600" />
        Task Tracker
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Q2 Certification</span>
            <span className="text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>Due in 5 days</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Survey Responses</span>
            <span className="text-gray-500">100%</span>
          </div>
          <Progress value={100} className="h-2" />
          <div className="flex items-center text-xs text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span>Completed</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Team Training</span>
            <span className="text-gray-500">35%</span>
          </div>
          <Progress value={35} className="h-2" />
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>Due in 12 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
