
import React from 'react';
import { TaskProgressIndicator } from './TaskProgressIndicator';
import { TaskProgress } from '../hooks/useTaskProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskProgressListProps {
  tasks: TaskProgress[];
  isLoading?: boolean;
  showTitle?: boolean;
  onRefresh?: () => void;
  maxItems?: number;
  className?: string;
}

export const TaskProgressList: React.FC<TaskProgressListProps> = ({
  tasks,
  isLoading = false,
  showTitle = true,
  onRefresh,
  maxItems = 3,
  className,
}) => {
  const displayTasks = tasks.slice(0, maxItems);
  
  if (displayTasks.length === 0 && !isLoading) {
    return null;
  }
  
  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Active Tasks</CardTitle>
            {onRefresh && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onRefresh} 
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="space-y-4 pt-2">
        {isLoading && displayTasks.length === 0 ? (
          <div className="flex items-center justify-center p-4">
            <RefreshCw className="h-5 w-5 animate-spin mr-2 text-gray-400" />
            <p className="text-sm text-gray-500">Loading tasks...</p>
          </div>
        ) : (
          <>
            {displayTasks.map((task) => (
              <TaskProgressIndicator
                key={task.id}
                status={task.status}
                progress={task.progress}
                title={task.title}
                description={task.description}
              />
            ))}
            
            {displayTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-sm text-gray-600">No active tasks</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
