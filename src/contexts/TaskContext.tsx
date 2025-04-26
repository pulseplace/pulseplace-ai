
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskPriority, TaskStatus, TaskModule, DebugLog, DebugLogSeverity } from '@/types/task.types';

// Basic task types
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  debugLogs: DebugLog[];
  addDebugLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateDebugLog: (id: string, log: Partial<DebugLog>) => void;
  deleteDebugLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  debugLogs: [],
  addDebugLog: () => {},
  updateDebugLog: () => {},
  deleteDebugLog: () => {},
  getCriticalOpenLogs: () => [],
  getRecentlyFixedLogs: () => []
});

// Sample debug logs data
const initialDebugLogs: DebugLog[] = [
  {
    id: '1',
    description: 'Error loading certification data',
    status: 'Open',
    severity: 'high',
    component: 'CertificationEngine',
    loggedBy: 'Alex Chen',
    dateLogged: '2025-04-17',
    assignedTo: 'Jamie Wong',
    notes: 'API returns 500 when trying to fetch certification data'
  },
  {
    id: '2',
    description: 'PulseBot not responding to certain prompts',
    status: 'In Progress',
    severity: 'medium',
    component: 'PulseBot',
    loggedBy: 'Riley Smith',
    dateLogged: '2025-04-19',
    assignedTo: 'Sam Johnson',
    notes: 'Specific keywords related to engagement are triggering timeout'
  },
  {
    id: '3',
    description: 'Dashboard crashes when filtering by date range',
    status: 'Fixed',
    severity: 'critical',
    component: 'Dashboard',
    loggedBy: 'Jamie Wong',
    dateLogged: '2025-04-15',
    dateFixed: '2025-04-16',
    assignedTo: 'Alex Chen',
    notes: 'Issue was caused by invalid date format in filter params',
    fixLink: 'https://github.com/example/repo/pull/123'
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement dashboard analytics',
      description: 'Create visualization for survey results',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2023-08-15',
      createdAt: '2023-07-01',
      assignedTo: 'Alex Kim',
      module: 'dashboard'
    },
    {
      id: '2',
      title: 'Fix PulseBot response time',
      description: 'Optimize response generation for faster results',
      status: 'todo',
      priority: 'medium',
      dueDate: '2023-08-20',
      createdAt: '2023-07-05',
      assignedTo: 'Jamie Wong',
      module: 'pulsebot'
    }
  ]);

  const [debugLogs, setDebugLogs] = useState<DebugLog[]>(initialDebugLogs);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addDebugLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...log,
      id: uuidv4(),
      dateLogged: new Date().toISOString().split('T')[0]
    };
    setDebugLogs([...debugLogs, newLog]);
  };

  const updateDebugLog = (id: string, updatedLog: Partial<DebugLog>) => {
    setDebugLogs(debugLogs.map(log => 
      log.id === id ? { ...log, ...updatedLog } : log
    ));
  };

  const deleteDebugLog = (id: string) => {
    setDebugLogs(debugLogs.filter(log => log.id !== id));
  };

  const getCriticalOpenLogs = () => {
    return debugLogs.filter(log => 
      log.severity === 'critical' && log.status !== 'Fixed'
    );
  };

  const getRecentlyFixedLogs = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffString = cutoffDate.toISOString().split('T')[0];
    
    return debugLogs.filter(log => 
      log.status === 'Fixed' && 
      log.dateFixed && 
      log.dateFixed >= cutoffString
    );
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask,
      debugLogs,
      addDebugLog,
      updateDebugLog,
      deleteDebugLog,
      getCriticalOpenLogs,
      getRecentlyFixedLogs
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
export const useDebugLogs = () => {
  const context = useContext(TaskContext);
  return {
    debugLogs: context.debugLogs,
    addDebugLog: context.addDebugLog,
    updateDebugLog: context.updateDebugLog,
    deleteDebugLog: context.deleteDebugLog,
    getCriticalOpenLogs: context.getCriticalOpenLogs,
    getRecentlyFixedLogs: context.getRecentlyFixedLogs,
  };
};
