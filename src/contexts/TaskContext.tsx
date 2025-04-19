
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Task, 
  TaskModule, 
  TaskPriority, 
  TaskStatus, 
  TaskOwner,
  DebugLog,
  DebugLogSeverity,
  DebugLogStatus,
  BuildRequest,
  BuildFlowLane
} from '@/types/task.types';

interface TaskContextType {
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTask: (id: string) => void;
  filterTasksBySprint: (sprint: string) => Task[];
  
  // Debug Logs
  debugLogs: DebugLog[];
  addDebugLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateDebugLog: (id: string, updates: Partial<Omit<DebugLog, 'id' | 'dateLogged'>>) => void;
  deleteDebugLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
  
  // Build Flow
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'lane' | 'createdAt'>) => void;
  updateBuildRequest: (id: string, updates: Partial<Omit<BuildRequest, 'id' | 'createdAt'>>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, lane: BuildFlowLane) => void;
  getBuildRequestsByLane: (lane: BuildFlowLane) => BuildRequest[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock data for tasks
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

// Mock data for debug logs
const initialDebugLogs: DebugLog[] = [
  {
    id: '1',
    dateLogged: new Date('2025-04-20'),
    component: 'Dashboard',
    description: 'Chart rendering incorrectly on mobile devices',
    severity: 'Major',
    status: 'Open',
    loggedBy: 'Sarah'
  },
  {
    id: '2',
    dateLogged: new Date('2025-04-19'),
    component: 'Backend Infra',
    description: 'API rate limiting not working properly',
    severity: 'Critical',
    status: 'In Progress',
    fixLink: 'https://github.com/org/repo/pull/123',
    loggedBy: 'Michael'
  }
];

// Mock data for build requests
const initialBuildRequests: BuildRequest[] = [
  {
    id: '1',
    name: 'Team Comparison View',
    context: 'Allow managers to compare team performance metrics side-by-side',
    module: 'Dashboard',
    deadline: new Date('2025-05-10'),
    notes: 'Requested by VP of HR',
    lane: 'BACKLOG',
    createdAt: new Date('2025-04-18')
  },
  {
    id: '2',
    name: 'Slack Integration',
    context: 'Send pulse survey reminders via Slack',
    module: 'Slack Bot',
    deadline: new Date('2025-04-28'),
    notes: 'Requires Slack API approval',
    lane: 'CURRENT SPRINT',
    createdAt: new Date('2025-04-15')
  }
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initialization
    const savedTasks = localStorage.getItem('pulseplace-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>(() => {
    const savedLogs = localStorage.getItem('pulseplace-debug-logs');
    return savedLogs ? JSON.parse(savedLogs) : initialDebugLogs;
  });
  
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>(() => {
    const savedRequests = localStorage.getItem('pulseplace-build-requests');
    return savedRequests ? JSON.parse(savedRequests) : initialBuildRequests;
  });

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pulseplace-tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('pulseplace-debug-logs', JSON.stringify(debugLogs));
  }, [debugLogs]);
  
  useEffect(() => {
    localStorage.setItem('pulseplace-build-requests', JSON.stringify(buildRequests));
  }, [buildRequests]);

  // Task functions
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
  
  // Debug Log functions
  const addDebugLog = (logData: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...logData,
      id: uuidv4(),
      dateLogged: new Date()
    };
    setDebugLogs(prevLogs => [...prevLogs, newLog]);
  };
  
  const updateDebugLog = (id: string, updates: Partial<Omit<DebugLog, 'id' | 'dateLogged'>>) => {
    setDebugLogs(prevLogs =>
      prevLogs.map(log => log.id === id ? { ...log, ...updates } : log)
    );
  };
  
  const deleteDebugLog = (id: string) => {
    setDebugLogs(prevLogs => prevLogs.filter(log => log.id !== id));
  };
  
  const getCriticalOpenLogs = () => {
    return debugLogs
      .filter(log => log.severity === 'Critical' && log.status === 'Open')
      .sort((a, b) => b.dateLogged.getTime() - a.dateLogged.getTime());
  };
  
  const getRecentlyFixedLogs = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return debugLogs
      .filter(log => 
        log.status === 'Fixed' && 
        new Date(log.dateLogged).getTime() >= cutoffDate.getTime()
      )
      .sort((a, b) => b.dateLogged.getTime() - a.dateLogged.getTime());
  };
  
  // Build Flow functions
  const addBuildRequest = (requestData: Omit<BuildRequest, 'id' | 'lane' | 'createdAt'>) => {
    const newRequest: BuildRequest = {
      ...requestData,
      id: uuidv4(),
      lane: 'BACKLOG', // New requests always go to backlog
      createdAt: new Date()
    };
    setBuildRequests(prevRequests => [...prevRequests, newRequest]);
  };
  
  const updateBuildRequest = (id: string, updates: Partial<Omit<BuildRequest, 'id' | 'createdAt'>>) => {
    setBuildRequests(prevRequests =>
      prevRequests.map(request => request.id === id ? { ...request, ...updates } : request)
    );
  };
  
  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };
  
  const moveBuildRequest = (id: string, lane: BuildFlowLane) => {
    setBuildRequests(prevRequests =>
      prevRequests.map(request => 
        request.id === id ? { ...request, lane } : request
      )
    );
  };
  
  const getBuildRequestsByLane = (lane: BuildFlowLane) => {
    return buildRequests.filter(request => request.lane === lane);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask,
      filterTasksBySprint,
      
      debugLogs,
      addDebugLog,
      updateDebugLog,
      deleteDebugLog,
      getCriticalOpenLogs,
      getRecentlyFixedLogs,
      
      buildRequests,
      addBuildRequest,
      updateBuildRequest,
      deleteBuildRequest,
      moveBuildRequest,
      getBuildRequestsByLane
    }}>
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
