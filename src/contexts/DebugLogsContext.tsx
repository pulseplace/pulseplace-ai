import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DebugLog } from '@/types/task.types';

interface DebugLogsContextType {
  debugLogs: DebugLog[];
  addDebugLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateDebugLog: (id: string, updates: Partial<Omit<DebugLog, 'id' | 'dateLogged'>>) => void;
  deleteDebugLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
}

const DebugLogsContext = createContext<DebugLogsContextType | undefined>(undefined);

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

export function DebugLogsProvider({ children }: { children: React.ReactNode }) {
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>(() => {
    const savedLogs = localStorage.getItem('pulseplace-debug-logs');
    return savedLogs ? JSON.parse(savedLogs) : initialDebugLogs;
  });

  useEffect(() => {
    localStorage.setItem('pulseplace-debug-logs', JSON.stringify(debugLogs));
  }, [debugLogs]);

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

  return (
    <DebugLogsContext.Provider value={{
      debugLogs,
      addDebugLog,
      updateDebugLog,
      deleteDebugLog,
      getCriticalOpenLogs,
      getRecentlyFixedLogs
    }}>
      {children}
    </DebugLogsContext.Provider>
  );
}

export function useDebugLogs() {
  const context = useContext(DebugLogsContext);
  if (context === undefined) {
    throw new Error('useDebugLogs must be used within a DebugLogsProvider');
  }
  return context;
}
