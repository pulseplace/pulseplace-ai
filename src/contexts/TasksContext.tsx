
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority, TaskModule } from '@/types/task.types';

// Sample tasks data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'PulseBot Integration',
    description: 'Integrate PulseBot with Slack for real-time feedback',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date('2025-05-10'),
    createdAt: '2025-04-15',
    module: 'pulsebot',
    owner: 'Alex Chen'
  },
  {
    id: '2',
    title: 'Dashboard UX Improvements',
    description: 'Enhance dashboard UX based on user feedback',
    status: 'todo',
    priority: 'medium',
    createdAt: '2025-04-18',
    module: 'dashboard'
  },
  {
    id: '3',
    title: 'Survey Response Analysis',
    description: 'Develop algorithm for sentiment analysis of open-ended responses',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2025-04-20'),
    createdAt: '2025-04-01',
    module: 'survey',
    owner: 'Jamie Wong'
  },
  {
    id: '4',
    title: 'API Documentation',
    description: 'Update API docs for the certification endpoints',
    status: 'review',
    priority: 'low',
    dueDate: new Date('2025-05-01'),
    createdAt: '2025-04-10',
    module: 'certification',
    owner: 'Riley Smith'
  },
  {
    id: '5',
    title: 'Certification Badge Design',
    description: 'Create new badge designs for different certification levels',
    status: 'blocked',
    priority: 'high',
    dueDate: new Date('2025-04-30'),
    createdAt: '2025-04-05',
    module: 'certification',
    owner: 'Sam Johnson'
  }
];

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  moveTask: () => {}
});

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
