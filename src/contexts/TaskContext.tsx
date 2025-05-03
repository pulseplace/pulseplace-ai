
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

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
  
  // Build Flow types and functions
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'createdAt' | 'lane'>) => void;
  updateBuildRequest: (id: string, updates: Partial<BuildRequest>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, newLane: BuildFlowLane) => void;
  getBuildRequestsByLane: (lane: BuildFlowLane) => BuildRequest[];
  
  // Debug Logs types and functions
  debugLogs: DebugLog[];
  addDebugLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateDebugLog: (id: string, updates: Partial<DebugLog>) => void;
  deleteDebugLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
  
  // Main Task tracker functions
  tasks: Task[];
}

// Add these from task.types.ts
export type BuildFlowLane = 'BACKLOG' | 'CURRENT SPRINT' | 'SHIPPED';
export type TaskModule = 'PulseScore Engine' | 'AI Summary' | 'Certification' | 'Dashboard' | 'Slack Bot' | 'Lite Survey' | 'Backend Infra' | 'Frontend UI' | 'Other';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Stuck' | 'Done';
export type TaskOwner = 'Lovable' | 'Founder' | 'External';
export type DebugLogSeverity = 'Critical' | 'Major' | 'Minor';
export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed';

export interface BuildRequest {
  id: string;
  name: string;
  context: string;
  module: TaskModule;
  deadline: Date | null;
  notes: string;
  lane: BuildFlowLane;
  createdAt: Date;
}

export interface DebugLog {
  id: string;
  dateLogged: Date;
  component: TaskModule;
  description: string;
  severity: DebugLogSeverity;
  status: DebugLogStatus;
  fixLink?: string;
  loggedBy: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>([]);
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from Firestore when user is authenticated
  useEffect(() => {
    if (!user) {
      // Clear tasks when user logs out
      setDailyTasks([]);
      setBuildRequests([]);
      setDebugLogs([]);
      setTasks([]);
      return;
    }

    // Set up listener for daily tasks
    const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid), where("type", "==", "daily"));
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const taskList: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Task, 'id'>
      }));
      setDailyTasks(taskList);
    });

    // Mock data for build requests and debug logs (in a real app, these would be loaded from Firestore)
    setBuildRequests([
      {
        id: '1',
        name: 'Implement PulseScore calculator',
        context: 'Create a calculator that visualizes scores based on survey responses',
        module: 'PulseScore Engine',
        deadline: new Date('2023-12-15'),
        notes: 'High priority - needed for demo',
        lane: 'CURRENT SPRINT',
        createdAt: new Date('2023-11-28')
      },
      {
        id: '2',
        name: 'Add theme sentiment analysis',
        context: 'Build a component that analyzes sentiment by theme',
        module: 'AI Summary',
        deadline: null,
        notes: '',
        lane: 'BACKLOG',
        createdAt: new Date('2023-11-25')
      }
    ]);

    setDebugLogs([
      {
        id: '1',
        dateLogged: new Date('2023-12-01'),
        component: 'PulseScore Engine',
        description: 'Calculation error in theme score aggregation',
        severity: 'Critical',
        status: 'Open',
        loggedBy: 'Dev Team'
      },
      {
        id: '2',
        dateLogged: new Date('2023-11-29'),
        component: 'Dashboard',
        description: 'Chart rendering issue with large datasets',
        severity: 'Major',
        status: 'In Progress',
        fixLink: 'https://github.com/fix-branch',
        loggedBy: 'QA Team'
      }
    ]);

    // Mock data for regular tasks
    setTasks([
      {
        id: '1',
        name: 'Update documentation',
        module: 'Frontend UI',
        priority: 'Medium',
        status: 'In Progress',
        owner: 'Founder',
        deadline: new Date('2023-12-20'),
        notes: 'Focus on API documentation',
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2023-11-22')
      },
      {
        id: '2',
        name: 'Fix mobile responsiveness',
        module: 'Frontend UI',
        priority: 'High',
        status: 'Not Started',
        owner: 'Lovable',
        deadline: new Date('2023-12-10'),
        notes: '',
        createdAt: new Date('2023-11-15'),
        updatedAt: new Date('2023-11-15')
      }
    ]);

    return () => unsubscribe();
  }, [user]);

  // Task CRUD operations
  const completeTask = (id: string) => {
    if (!user) return;

    const taskRef = doc(db, "tasks", id);
    updateDoc(taskRef, {
      completed: true,
      updatedAt: new Date().toISOString()
    }).catch(error => console.error("Error updating task: ", error));
  };

  const deleteTask = (id: string) => {
    if (!user) return;
    
    const taskRef = doc(db, "tasks", id);
    deleteDoc(taskRef).catch(error => console.error("Error deleting task: ", error));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    if (!user) return;
    
    const taskWithUser = {
      ...task,
      userId: user.uid,
      type: 'daily',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addDoc(collection(db, "tasks"), taskWithUser)
      .catch(error => console.error("Error adding task: ", error));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    if (!user) return;
    
    const taskRef = doc(db, "tasks", id);
    updateDoc(taskRef, {
      ...updatedTask,
      updatedAt: new Date().toISOString()
    }).catch(error => console.error("Error updating task: ", error));
  };

  // Build Request operations
  const addBuildRequest = (request: Omit<BuildRequest, 'id' | 'createdAt' | 'lane'>) => {
    const newRequest: BuildRequest = {
      ...request,
      id: uuidv4(),
      lane: 'BACKLOG',
      createdAt: new Date()
    };
    setBuildRequests(prev => [...prev, newRequest]);
  };

  const updateBuildRequest = (id: string, updates: Partial<BuildRequest>) => {
    setBuildRequests(prev => 
      prev.map(req => req.id === id ? { ...req, ...updates } : req)
    );
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prev => prev.filter(req => req.id !== id));
  };

  const moveBuildRequest = (id: string, newLane: BuildFlowLane) => {
    setBuildRequests(prev => 
      prev.map(req => req.id === id ? { ...req, lane: newLane } : req)
    );
  };

  const getBuildRequestsByLane = (lane: BuildFlowLane) => {
    return buildRequests.filter(req => req.lane === lane);
  };

  // Debug Log operations
  const addDebugLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...log,
      id: uuidv4(),
      dateLogged: new Date()
    };
    setDebugLogs(prev => [...prev, newLog]);
  };

  const updateDebugLog = (id: string, updates: Partial<DebugLog>) => {
    setDebugLogs(prev => 
      prev.map(log => log.id === id ? { ...log, ...updates } : log)
    );
  };

  const deleteDebugLog = (id: string) => {
    setDebugLogs(prev => prev.filter(log => log.id !== id));
  };

  const getCriticalOpenLogs = () => {
    return debugLogs.filter(
      log => log.severity === 'Critical' && log.status !== 'Fixed'
    );
  };

  const getRecentlyFixedLogs = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return debugLogs.filter(
      log => log.status === 'Fixed' && log.dateLogged >= cutoffDate
    );
  };

  const value = {
    dailyTasks,
    completeTask,
    deleteTask,
    addTask,
    updateTask,
    buildRequests,
    addBuildRequest,
    updateBuildRequest,
    deleteBuildRequest,
    moveBuildRequest,
    getBuildRequestsByLane,
    debugLogs,
    addDebugLog,
    updateDebugLog,
    deleteDebugLog,
    getCriticalOpenLogs,
    getRecentlyFixedLogs,
    tasks
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
