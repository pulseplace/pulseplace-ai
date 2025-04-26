
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Basic task types
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate?: string;
  assignedTo?: string;
  module: 'Dashboard' | 'PulseBot' | 'Certification' | 'Analytics';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {}
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement dashboard analytics',
      description: 'Create visualization for survey results',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2023-08-15',
      assignedTo: 'Alex Kim',
      module: 'Dashboard'
    },
    {
      id: '2',
      title: 'Fix PulseBot response time',
      description: 'Optimize response generation for faster results',
      status: 'Not Started',
      priority: 'Medium',
      dueDate: '2023-08-20',
      assignedTo: 'Jamie Wong',
      module: 'PulseBot'
    }
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: uuidv4()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
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

export const useTask = () => useContext(TaskContext);
