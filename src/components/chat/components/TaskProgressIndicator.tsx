
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, AlertTriangle, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TaskProgressProps {
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress?: number;
  title: string;
  description?: string;
  className?: string;
}

export const TaskProgressIndicator: React.FC<TaskProgressProps> = ({
  status,
  progress = 0,
  title,
  description,
  className,
}) => {
  // Status icon mapping
  const statusIcons = {
    'pending': <Clock className="h-5 w-5 text-gray-400" />,
    'in-progress': <Loader className="h-5 w-5 text-blue-500 animate-spin" />,
    'completed': <Check className="h-5 w-5 text-green-500" />,
    'failed': <AlertTriangle className="h-5 w-5 text-red-500" />,
  };
  
  // Status color mapping for the border and progress bar
  const statusColors = {
    'pending': 'border-gray-200',
    'in-progress': 'border-blue-200',
    'completed': 'border-green-200',
    'failed': 'border-red-200',
  };
  
  const progressColors = {
    'pending': 'bg-gray-400',
    'in-progress': 'bg-blue-500',
    'completed': 'bg-green-500',
    'failed': 'bg-red-500',
  };

  return (
    <div className={cn(
      'rounded-lg border p-4 shadow-sm',
      statusColors[status],
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {statusIcons[status]}
        </div>
        
        <div className="flex-grow">
          <h4 className="text-sm font-medium mb-1">{title}</h4>
          {description && (
            <p className="text-xs text-gray-500 mb-2">{description}</p>
          )}
          
          <div className="space-y-2">
            <Progress 
              value={status === 'completed' ? 100 : progress} 
              className={cn("h-2", progressColors[status])}
            />
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                {status === 'completed' ? 'Completed' : 
                 status === 'in-progress' ? `${Math.round(progress)}% complete` :
                 status === 'failed' ? 'Failed' : 'Pending'}
              </span>
              {status === 'in-progress' && (
                <span>ETA: ~{Math.round((100 - progress) / 10)} min</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
