
import React, { useState } from 'react';
import { useTaskProgress } from '../hooks/useTaskProgress';
import { TaskProgressList } from './TaskProgressList';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskTrackerProps {
  mode?: 'inline' | 'dialog';
  className?: string;
}

export const TaskTracker: React.FC<TaskTrackerProps> = ({
  mode = 'inline',
  className
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    activeTasks,
    recentlyCompletedTasks,
    isLoading,
    error,
    refreshTasks
  } = useTaskProgress({ autoRefresh: true, refreshInterval: 5000 });

  const handleRefresh = () => {
    refreshTasks();
    toast({
      description: "Task list refreshed",
    });
  };

  // For dialog mode
  if (mode === 'dialog') {
    const totalActiveTasks = activeTasks.length;
    const hasActiveTasks = totalActiveTasks > 0;

    return (
      <>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant={hasActiveTasks ? "default" : "outline"} 
              size="sm" 
              className={className}
            >
              {hasActiveTasks ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-pulse" />
                  {totalActiveTasks} {totalActiveTasks === 1 ? 'Task' : 'Tasks'} Running
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  No Active Tasks
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Task Status</DialogTitle>
              <DialogDescription>
                View the status of your current and recently completed tasks.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <TaskProgressList 
                tasks={activeTasks}
                isLoading={isLoading}
                showTitle={true}
                onRefresh={handleRefresh}
                maxItems={5}
              />
              
              {recentlyCompletedTasks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Recently Completed</h3>
                  <TaskProgressList 
                    tasks={recentlyCompletedTasks}
                    showTitle={false}
                    maxItems={3}
                  />
                </div>
              )}
              
              {error && (
                <div className="text-sm text-red-500 mt-2">{error}</div>
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // For inline mode
  return (
    <TaskProgressList 
      tasks={activeTasks}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      className={className}
    />
  );
};
