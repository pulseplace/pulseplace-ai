
import React from 'react';
import { CheckCircle, Clock, AlertCircle, RotateCcw } from 'lucide-react';

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'retrying';

export interface TaskProgressIndicatorProps {
  status: string; // Add status property
  progress: number;
  title: string;
  description: string;
}

const TaskProgressIndicator: React.FC<TaskProgressIndicatorProps> = ({
  status,
  progress,
  title,
  description
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running':
        return <RotateCcw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'retrying':
        return <RotateCcw className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start space-x-4 mb-4 p-3 rounded-lg border border-gray-200 bg-white">
      <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <h4 className="font-medium text-sm text-gray-900">{title}</h4>
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${
              status === 'failed' 
                ? 'bg-red-500' 
                : status === 'completed' 
                  ? 'bg-green-500' 
                  : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TaskProgressIndicator;
