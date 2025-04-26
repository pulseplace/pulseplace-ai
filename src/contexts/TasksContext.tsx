
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority } from '@/types/task.types';

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByModule: (module: string) => Task[];
  getTasksDueThisWeek: () => Task[];
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete PulseScore algorithm',
    description: 'Finalize the calculation logic for PulseScore weighted average',
    status: 'in_progress',
    priority: 'high',
    module: 'dashboard',
    createdAt: new Date(2025, 3, 18).toISOString(),
    dueDate: new Date(2025, 4, 1).toISOString(),
    owner: 'Alex Johnson'
  },
  {
    id: '2',
    title: 'Fix mobile responsive design',
    description: 'Address layout issues on mobile devices for the certification page',
    status: 'todo',
    priority: 'medium',
    module: 'certification',
    createdAt: new Date(2025, 3, 20).toISOString(),
    dueDate: new Date(2025, 4, 3).toISOString(),
    owner: 'Morgan Smith'
  }
];

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => task.id === id ? { ...task, ...updates } : task)
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => task.id === id ? { ...task, status: newStatus } : task)
    );
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByModule = (module: string) => {
    return tasks.filter(task => task.module === module);
  };

  const getTasksDueThisWeek = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate <= nextWeek;
    });
  };

  return (
    <TasksContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask,
      moveTask,
      getTasksByStatus,
      getTasksByModule,
      getTasksDueThisWeek
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
