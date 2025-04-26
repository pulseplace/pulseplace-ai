
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DebugLog, DebugLogStatus, DebugLogSeverity } from '@/types/task.types';

interface DebugLogsContextType {
  debugLogs: DebugLog[];
  addDebugLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateDebugLog: (log: DebugLog) => void;
  deleteDebugLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
}

const TaskContext = createContext<DebugLogsContextType | undefined>(undefined);

// Sample debug logs for demonstration
const initialDebugLogs: DebugLog[] = [
  {
    id: uuidv4(),
    description: 'PulseBot not showing response on mobile',
    status: 'Open',
    severity: 'high',
    component: 'PulseBot',
    loggedBy: 'Alex',
    dateLogged: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  },
  {
    id: uuidv4(),
    description: 'Dashboard loading slow on Firefox',
    status: 'In Progress',
    severity: 'medium',
    component: 'Dashboard',
    loggedBy: 'Sam',
    dateLogged: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
  },
  {
    id: uuidv4(),
    description: 'Survey form not submitting on Safari',
    status: 'Fixed',
    severity: 'critical',
    component: 'PulseScoreLite',
    loggedBy: 'Jordan',
    dateLogged: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    dateFixed: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>(initialDebugLogs);

  // Add a new debug log
  const addDebugLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...log,
      id: uuidv4(),
      dateLogged: new Date().toISOString(),
    };
    
    setDebugLogs(prev => [newLog, ...prev]);
  };

  // Update an existing debug log
  const updateDebugLog = (updatedLog: DebugLog) => {
    setDebugLogs(prev => 
      prev.map(log => log.id === updatedLog.id ? updatedLog : log)
    );
  };

  // Delete a debug log
  const deleteDebugLog = (id: string) => {
    setDebugLogs(prev => prev.filter(log => log.id !== id));
  };

  // Get critical open logs
  const getCriticalOpenLogs = () => {
    return debugLogs.filter(
      log => log.status === 'Open' && (log.severity === 'critical' || log.severity === 'high')
    );
  };

  // Get recently fixed logs
  const getRecentlyFixedLogs = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return debugLogs.filter(log => {
      if (log.status === 'Fixed' && log.dateFixed) {
        const fixedDate = new Date(log.dateFixed);
        return fixedDate >= cutoffDate;
      }
      return false;
    });
  };

  const value = {
    debugLogs,
    addDebugLog,
    updateDebugLog,
    deleteDebugLog,
    getCriticalOpenLogs,
    getRecentlyFixedLogs
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useDebugLogs = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useDebugLogs must be used within a TaskProvider');
  }
  return context;
};
