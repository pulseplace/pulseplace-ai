
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Task {
  id: string;
  task_title: string;
  task_description: string | null;
  status: 'pending' | 'in_progress' | 'done' | 'error';
  priority: number;
  log: string | null;
  created_at: string;
  updated_at: string;
}

export const useTaskRunner = (enabled = true) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  // Get the next pending task with highest priority (lowest number)
  const getNextTask = async (): Promise<Task | null> => {
    try {
      const { data, error } = await supabase
        .from('lovable_tasks')
        .select('*')
        .eq('status', 'pending')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching next task:', error);
        return null;
      }

      return data as Task;
    } catch (error) {
      console.error('Error in getNextTask:', error);
      return null;
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId: string, status: Task['status'], log?: string) => {
    try {
      const updates = {
        status,
        updated_at: new Date().toISOString(),
        log: log || null
      };

      const { error } = await supabase
        .from('lovable_tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) {
        console.error('Error updating task status:', error);
      }
    } catch (error) {
      console.error('Error in updateTaskStatus:', error);
    }
  };

  // Execute a task
  const executeTask = async (task: Task) => {
    try {
      console.log(`Executing task: ${task.task_title}`);
      
      // Update task status to in_progress
      await updateTaskStatus(task.id, 'in_progress');
      
      // Here you would implement the actual task execution logic
      // For demonstration, we'll just simulate success or failure
      const success = Math.random() > 0.2; // 80% chance of success
      
      if (success) {
        await updateTaskStatus(task.id, 'done', 'Task completed successfully');
        setCompletedTasks(prev => [...prev, {...task, status: 'done'}]);
        console.log(`Task ${task.task_title} completed successfully`);
      } else {
        const errorMsg = `Failed to execute task: ${task.task_title}`;
        await updateTaskStatus(task.id, 'error', errorMsg);
        setLastError(errorMsg);
        console.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = `Exception executing task: ${error}`;
      await updateTaskStatus(task.id, 'error', errorMsg);
      setLastError(errorMsg);
      console.error('Error in executeTask:', error);
    } finally {
      setCurrentTask(null);
    }
  };

  // Main task runner loop
  const runTaskLoop = async () => {
    if (!enabled || isRunning) return;

    try {
      setIsRunning(true);
      
      const nextTask = await getNextTask();
      
      if (nextTask) {
        setCurrentTask(nextTask);
        await executeTask(nextTask);
      } else {
        console.log('No pending tasks found');
        // Wait a bit before checking again
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('Error in runTaskLoop:', error);
      setLastError(`Task runner error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Start the task loop when enabled
  useEffect(() => {
    if (enabled) {
      const intervalId = setInterval(() => {
        if (!isRunning) {
          runTaskLoop();
        }
      }, 5000); // Check for new tasks every 5 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [enabled, isRunning]);

  return {
    currentTask,
    isRunning,
    lastError,
    completedTasks,
    runTaskLoop
  };
};
