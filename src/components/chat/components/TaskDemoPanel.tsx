
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTaskProgress } from '../hooks/useTaskProgress';
import { PlayCircle, Plus, ListTodo, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { TaskTracker } from './TaskTracker';

interface TaskDemoPanelProps {
  className?: string;
}

export const TaskDemoPanel: React.FC<TaskDemoPanelProps> = ({ className }) => {
  const { toast } = useToast();
  const [taskTitle, setTaskTitle] = useState('');
  const { createTask, updateTaskStatus, activeTasks, refreshTasks } = useTaskProgress();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) {
      toast({
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    try {
      const taskId = await createTask({
        title: taskTitle,
        description: "Demonstration task for real-time progress tracking",
      });
      
      toast({
        title: "Task created",
        description: "The task has been added to the queue"
      });
      
      setTaskTitle('');
      
      // Simulate task progression
      if (taskId) {
        simulateTaskProgress(taskId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const simulateTaskProgress = async (taskId: string) => {
    // Set task to in-progress with 0% progress
    await updateTaskStatus(taskId, 'in-progress', 0);
    
    // Simulate progress updates
    const progressIntervals = [10, 30, 50, 70, 90];
    
    for (const progress of progressIntervals) {
      // Wait between progress updates
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update progress
      await updateTaskStatus(taskId, 'in-progress', progress);
    }
    
    // Random chance of success or failure
    const success = Math.random() > 0.2;
    
    // Wait for final update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete the task (success or failure)
    await updateTaskStatus(taskId, success ? 'completed' : 'failed', 100);
    
    toast({
      title: success ? "Task completed" : "Task failed",
      description: success 
        ? "The demonstration task has completed successfully" 
        : "The demonstration task has failed",
      variant: success ? "default" : "destructive"
    });
  };

  return (
    <Card className={className}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Real-Time Task Demonstration</h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              disabled={isCreating}
            />
            <Button 
              onClick={handleCreateTask} 
              disabled={isCreating || !taskTitle.trim()}
            >
              {isCreating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create Task
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                createTask({
                  title: "Quick data processing",
                  description: "Process data in the background"
                }).then(taskId => {
                  if (taskId) simulateTaskProgress(taskId);
                });
              }}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Run Quick Task
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => refreshTasks()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Task Status",
                  description: `${activeTasks.length} active tasks running`
                });
              }}
            >
              <ListTodo className="h-4 w-4 mr-2" />
              Check Status
            </Button>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <TaskTracker mode="inline" />
          </div>
        </div>
      </div>
    </Card>
  );
};
