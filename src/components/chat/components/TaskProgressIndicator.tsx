
import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TaskProgressIndicatorProps {
  mode?: 'inline' | 'full';
  progress?: number;
  totalTasks?: number;
  completedTasks?: number;
}

export const TaskProgressIndicator: React.FC<TaskProgressIndicatorProps> = ({
  mode = 'inline',
  progress = 65,
  totalTasks = 5,
  completedTasks = 3
}) => {
  if (mode === 'inline') {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <Progress value={progress} className="h-2 flex-grow" />
        <span className="text-gray-600 whitespace-nowrap">{completedTasks}/{totalTasks} tasks</span>
      </div>
    );
  }
  
  // Full mode with more details
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="text-sm font-medium mb-3">Task Progress</h3>
      
      <div className="mb-3">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{progress}% complete</span>
          <span>{completedTasks}/{totalTasks} tasks</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          <span>Completed</span>
          <span className="ml-auto">{completedTasks}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 text-amber-500 mr-2" />
          <span>In Progress</span>
          <span className="ml-auto">1</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Circle className="h-4 w-4 text-gray-300 mr-2" />
          <span>Not Started</span>
          <span className="ml-auto">{totalTasks - completedTasks - 1}</span>
        </div>
      </div>
    </div>
  );
};
