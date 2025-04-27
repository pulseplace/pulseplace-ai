
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '@/types/task.types';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Sample tasks for development
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      title: 'Complete landing page design',
      description: 'Finalize the hero section and call-to-action components',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'Alex Chen',
    },
    {
      id: uuidv4(),
      title: 'Implement authentication flow',
      description: 'Create sign-in and sign-up pages with Supabase integration',
      status: 'not_started',
      priority: 'high',
      assignedTo: 'Taylor Kim',
    },
    {
      id: uuidv4(),
      title: 'Set up survey data model',
      description: 'Create database schema for storing survey responses',
      status: 'in_review',
      priority: 'medium',
      assignedTo: 'Jordan Lee',
    },
    {
      id: uuidv4(),
      title: 'Design certification badge templates',
      description: 'Create bronze, silver, and gold badge designs for the certification system',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Casey Morgan',
    }
  ]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
    };
    
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
