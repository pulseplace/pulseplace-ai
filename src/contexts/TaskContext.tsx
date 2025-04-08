
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  dailyTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initialization
    const savedTasks = localStorage.getItem('pulseplace-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Calculate tasks due today
  const dailyTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pulseplace-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, completed: true } : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, completeTask, dailyTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskManager() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskManager must be used within a TaskProvider');
  }
  return context;
}
