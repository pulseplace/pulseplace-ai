import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types/task.types';

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTask: (id: string) => void;
  filterTasksBySprint: (sprint: string) => Task[];
  updateTaskTime: (id: string, timeSpent: number) => void;
  voteTask: (id: string, isUpvote: boolean) => void;
  generateChangelog: (taskId: string) => string;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Implement PulseScore Algorithm',
    module: 'PulseScore Engine',
    priority: 'High',
    status: 'In Progress',
    owner: 'Lovable',
    deadline: new Date('2025-04-25'),
    notes: 'Focus on emotion index calculation first',
    sprint: 'Sprint April 22–26',
    createdAt: new Date('2025-04-19'),
    updatedAt: new Date('2025-04-20')
  },
  {
    id: '2',
    name: 'Build Certification Badge Generator',
    module: 'Certification',
    priority: 'Medium',
    status: 'Not Started',
    owner: 'Founder',
    deadline: new Date('2025-04-24'),
    notes: 'Need designs from marketing team',
    sprint: 'Sprint April 22–26',
    createdAt: new Date('2025-04-19'),
    updatedAt: new Date('2025-04-19')
  },
  {
    id: '3',
    name: 'Fix Dashboard Loading State',
    module: 'Dashboard',
    priority: 'Low',
    status: 'Done',
    owner: 'External',
    deadline: new Date('2025-04-22'),
    notes: 'Added loading spinner and error handling',
    sprint: 'Sprint April 22–26',
    createdAt: new Date('2025-04-18'),
    updatedAt: new Date('2025-04-21')
  }
];

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('pulseplace-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('pulseplace-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date() } 
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const filterTasksBySprint = (sprint: string) => {
    return tasks.filter(task => task.sprint === sprint);
  };

  const updateTaskTime = (id: string, timeSpent: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              timeSpent: (task.timeSpent || 0) + timeSpent,
              updatedAt: new Date()
            }
          : task
      )
    );
  };

  const voteTask = (id: string, isUpvote: boolean) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              feedback: {
                upvotes: (task.feedback?.upvotes || 0) + (isUpvote ? 1 : 0),
                downvotes: (task.feedback?.downvotes || 0) + (!isUpvote ? 1 : 0)
              },
              updatedAt: new Date()
            }
          : task
      )
    );
  };

  const generateChangelog = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return '';

    return `[${task.status}] ${task.name}\n` +
           `Module: ${task.module}\n` +
           `Owner: ${task.owner}\n` +
           `Notes: ${task.notes}\n` +
           `Time Spent: ${task.timeSpent || 0} minutes\n` +
           `Feedback: 👍 ${task.feedback?.upvotes || 0} | 👎 ${task.feedback?.downvotes || 0}`;
  };

  return (
    <TasksContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      filterTasksBySprint,
      updateTaskTime,
      voteTask,
      generateChangelog
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
