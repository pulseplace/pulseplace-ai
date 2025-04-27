
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DebugLog, DebugLogSeverity } from '@/types/task.types';

// Sample debug logs data
const initialLogs: DebugLog[] = [
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

interface DebugLogsContextType {
  debugLogs: DebugLog[];
  addLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateLog: (id: string, log: Partial<DebugLog>) => void;
  deleteLog: (id: string) => void;
  getCriticalOpenLogs: () => DebugLog[];
  getRecentlyFixedLogs: (days: number) => DebugLog[];
}

const DebugLogsContext = createContext<DebugLogsContextType>({
  debugLogs: [],
  addLog: () => {},
  updateLog: () => {},
  deleteLog: () => {},
  getCriticalOpenLogs: () => [],
  getRecentlyFixedLogs: () => []
});

export const DebugLogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>(initialLogs);

  const addLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...log,
      id: uuidv4(),
      dateLogged: new Date().toISOString().split('T')[0]
    };
    setDebugLogs([...debugLogs, newLog]);
  };

  const updateLog = (id: string, updatedLog: Partial<DebugLog>) => {
    setDebugLogs(debugLogs.map(log => 
      log.id === id ? { ...log, ...updatedLog } : log
    ));
  };

  const deleteLog = (id: string) => {
    setDebugLogs(debugLogs.filter(log => log.id !== id));
  };

  const getCriticalOpenLogs = () => {
    return debugLogs.filter(log => log.severity === 'critical' && log.status === 'Open');
  };

  const getRecentlyFixedLogs = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return debugLogs.filter(log => {
      if (log.status !== 'Fixed' || !log.dateFixed) return false;
      
      const fixedDate = new Date(log.dateFixed);
      return fixedDate >= cutoffDate;
    });
  };

  return (
    <DebugLogsContext.Provider 
      value={{ 
        debugLogs, 
        addLog, 
        updateLog, 
        deleteLog, 
        getCriticalOpenLogs, 
        getRecentlyFixedLogs 
      }}
    >
      {children}
    </DebugLogsContext.Provider>
  );
};

export const useDebugLogs = () => useContext(DebugLogsContext);
