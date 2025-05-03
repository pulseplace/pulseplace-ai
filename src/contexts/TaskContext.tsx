
import React, { createContext, useContext, useState, useEffect } from 'react';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: TaskPriority;
}

export interface TaskContextType {
  dailyTasks: Task[];
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyTasks, setDailyTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete PulseScore implementation',
      description: 'Finish integrating the scoring algorithm with the frontend',
      completed: false,
      dueDate: new Date().toISOString(),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Draft quarterly insights report',
      description: 'Prepare the Q1 culture insights report for the leadership team',
      completed: false,
      dueDate: new Date().toISOString(),
      priority: 'medium'
    }
  ]);

  const completeTask = (id: string) => {
    setDailyTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setDailyTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9)
    };
    setDailyTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setDailyTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const value = {
    dailyTasks,
    completeTask,
    deleteTask,
    addTask,
    updateTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskManager = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskManager must be used within a TaskProvider');
  }
  return context;
};
