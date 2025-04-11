
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface TaskProgress {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  estimatedCompletionTime?: number; // in minutes
}

export interface UseTaskProgressProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

export const useTaskProgress = ({ 
  autoRefresh = true, 
  refreshInterval = 3000 
}: UseTaskProgressProps = {}) => {
  const [tasks, setTasks] = useState<TaskProgress[]>([]);
  const [activeTasks, setActiveTasks] = useState<TaskProgress[]>([]);
  const [recentlyCompletedTasks, setRecentlyCompletedTasks] = useState<TaskProgress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the database
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('lovable_tasks')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10);
      
      if (error) throw new Error(error.message);
      
      if (data) {
        // Map the data to our TaskProgress interface
        const mappedTasks: TaskProgress[] = data.map(task => ({
          id: task.id,
          title: task.title || task.task_title,
          description: task.description || task.task_description,
          status: mapTaskStatus(task.status),
          progress: calculateProgress(task),
          createdAt: task.created_at,
          updatedAt: task.updated_at,
          estimatedCompletionTime: estimateCompletionTime(task)
        }));
        
        setTasks(mappedTasks);
        
        // Filter active and recently completed tasks
        setActiveTasks(mappedTasks.filter(task => 
          task.status === 'pending' || task.status === 'in-progress'
        ));
        
        setRecentlyCompletedTasks(mappedTasks.filter(task => 
          (task.status === 'completed' || task.status === 'failed') && 
          // Only show tasks completed in the last 24 hours
          new Date(task.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
        ));
      }
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a subscription to listen for changes
  useEffect(() => {
    fetchTasks();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'lovable_tasks' }, 
        () => {
          fetchTasks();
        }
      )
      .subscribe();
    
    // Set up polling if autoRefresh is enabled
    let intervalId: NodeJS.Timeout | undefined;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchTasks();
      }, refreshInterval);
    }
    
    return () => {
      subscription.unsubscribe();
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchTasks, autoRefresh, refreshInterval]);

  // Create a new task
  const createTask = async (taskData: Omit<TaskProgress, 'id' | 'status' | 'progress' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      
      const { data, error } = await supabase
        .from('lovable_tasks')
        .insert([{
          title: taskData.title,
          description: taskData.description,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw new Error(error.message);
      
      fetchTasks();
      return data?.[0]?.id;
    } catch (err: any) {
      console.error('Error creating task:', err);
      setError(err.message);
      return null;
    }
  };

  // Update task status
  const updateTaskStatus = async (id: string, status: TaskStatus, progress?: number) => {
    try {
      setError(null);
      
      const updates: any = {
        status,
        updated_at: new Date().toISOString()
      };
      
      if (progress !== undefined) {
        updates.progress = progress;
      }
      
      const { error } = await supabase
        .from('lovable_tasks')
        .update(updates)
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      
      fetchTasks();
      return true;
    } catch (err: any) {
      console.error('Error updating task:', err);
      setError(err.message);
      return false;
    }
  };

  // Helper functions
  const mapTaskStatus = (status: string): TaskStatus => {
    if (status === 'in_progress' || status === 'in-progress') return 'in-progress';
    if (status === 'done' || status === 'completed') return 'completed';
    if (status === 'error' || status === 'failed') return 'failed';
    return 'pending';
  };

  const calculateProgress = (task: any): number => {
    if (task.progress !== undefined && task.progress !== null) {
      return task.progress;
    }
    
    // Calculate progress based on status
    switch (mapTaskStatus(task.status)) {
      case 'pending': return 0;
      case 'in-progress': 
        // If no progress value, estimate based on time elapsed since task started
        if (task.updated_at && task.created_at) {
          const createdTime = new Date(task.created_at).getTime();
          const updatedTime = new Date(task.updated_at).getTime();
          const currentTime = Date.now();
          
          // Estimate that a task takes about 5 minutes to complete
          const estimatedTotalTime = 5 * 60 * 1000;
          const elapsedTime = currentTime - createdTime;
          
          // Cap at 95% until actually complete
          return Math.min(Math.floor((elapsedTime / estimatedTotalTime) * 100), 95);
        }
        return 50; // Default to 50% if can't calculate
      case 'completed': return 100;
      case 'failed': return 100;
      default: return 0;
    }
  };

  const estimateCompletionTime = (task: any): number | undefined => {
    if (mapTaskStatus(task.status) !== 'in-progress') return undefined;
    
    const progress = calculateProgress(task);
    if (progress <= 0) return undefined;
    
    // Estimate remaining time based on progress
    const remainingPercentage = 100 - progress;
    
    // Assuming 5 minutes total task time as a baseline
    const estimatedMinutesRemaining = Math.ceil((remainingPercentage / 100) * 5);
    
    return estimatedMinutesRemaining;
  };

  return {
    tasks,
    activeTasks,
    recentlyCompletedTasks,
    isLoading,
    error,
    createTask,
    updateTaskStatus,
    refreshTasks: fetchTasks
  };
};
