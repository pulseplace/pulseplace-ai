
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority, TaskModule } from '@/types/task.types';

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
  getTasksByModule: (module: TaskModule) => Task[];
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Sample tasks for demonstration
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Implement PulseBot response handling',
    description: 'Create logic to handle PulseBot responses and store them in the database',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    module: 'pulsebot',
    owner: 'Alex'
  },
  {
    id: uuidv4(),
    title: 'Design certification badge',
    description: 'Create visual designs for certification badges at different tiers',
    status: 'completed',
    priority: 'medium',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    module: 'certification',
    owner: 'Jordan'
  },
  {
    id: uuidv4(),
    title: 'Fix dashboard loading state',
    description: 'Add proper loading indicators to the dashboard components',
    status: 'todo',
    priority: 'low',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    module: 'dashboard',
    owner: 'Sam'
  },
];

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Get tasks by status
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  // Get tasks by priority
  const getTasksByPriority = (priority: TaskPriority) => {
    return tasks.filter(task => task.priority === priority);
  };

  // Get tasks by module
  const getTasksByModule = (module: TaskModule) => {
    return tasks.filter(task => task.module === module);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByModule
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
