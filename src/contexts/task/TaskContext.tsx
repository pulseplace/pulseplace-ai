
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { 
  Task, 
  BuildFlowLane,
  BuildRequest,
  DebugLog
} from '@/types/task.types';
import { TaskContextType } from './types';
import { createDailyTasksQuery, mapFirestoreDocToTask } from './firestore-utils';
import * as TaskOperations from './task-operations';
import * as BuildRequestOperations from './build-request-operations';
import * as DebugLogOperations from './debug-log-operations';
import { getMockTasks, getMockBuildRequests, getMockDebugLogs } from './mock-data';

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
    const tasksQuery = createDailyTasksQuery(user.id);
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const taskList: Task[] = snapshot.docs.map(doc => mapFirestoreDocToTask(doc));
      setDailyTasks(taskList);
    });

    // Mock data for build requests and debug logs
    setBuildRequests(getMockBuildRequests());
    setDebugLogs(getMockDebugLogs());
    setTasks(getMockTasks());

    return () => unsubscribe();
  }, [user]);

  // Task CRUD operations
  const completeTask = (id: string) => {
    TaskOperations.completeTask(id, user?.id);
  };

  const deleteTask = (id: string) => {
    TaskOperations.deleteTask(id, user?.id);
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    TaskOperations.addTask(task, user?.id);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    TaskOperations.updateTask(id, updatedTask, user?.id);
  };

  // Build Request operations
  const addBuildRequest = (request: Omit<BuildRequest, 'id' | 'createdAt' | 'lane'>) => {
    setBuildRequests(prev => BuildRequestOperations.addBuildRequest(request, prev));
  };

  const updateBuildRequest = (id: string, updates: Partial<BuildRequest>) => {
    setBuildRequests(prev => BuildRequestOperations.updateBuildRequest(id, updates, prev));
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prev => BuildRequestOperations.deleteBuildRequest(id, prev));
  };

  const moveBuildRequest = (id: string, newLane: BuildFlowLane) => {
    setBuildRequests(prev => BuildRequestOperations.moveBuildRequest(id, newLane, prev));
  };

  const getBuildRequestsByLane = (lane: BuildFlowLane) => {
    return BuildRequestOperations.getBuildRequestsByLane(lane, buildRequests);
  };

  // Debug Log operations
  const addDebugLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    setDebugLogs(prev => DebugLogOperations.addDebugLog(log, prev));
  };

  const updateDebugLog = (id: string, updates: Partial<DebugLog>) => {
    setDebugLogs(prev => DebugLogOperations.updateDebugLog(id, updates, prev));
  };

  const deleteDebugLog = (id: string) => {
    setDebugLogs(prev => DebugLogOperations.deleteDebugLog(id, prev));
  };

  const getCriticalOpenLogs = () => {
    return DebugLogOperations.getCriticalOpenLogs(debugLogs);
  };

  const getRecentlyFixedLogs = (days: number) => {
    return DebugLogOperations.getRecentlyFixedLogs(days, debugLogs);
  };

  const value: TaskContextType = {
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
