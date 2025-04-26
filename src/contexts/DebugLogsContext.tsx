
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
  logs: DebugLog[];
  addLog: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  updateLog: (id: string, log: Partial<DebugLog>) => void;
  deleteLog: (id: string) => void;
  filteredLogs: (status?: DebugLog['status'], severity?: DebugLogSeverity) => DebugLog[];
}

const DebugLogsContext = createContext<DebugLogsContextType>({
  logs: [],
  addLog: () => {},
  updateLog: () => {},
  deleteLog: () => {},
  filteredLogs: () => []
});

export const DebugLogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<DebugLog[]>(initialLogs);

  const addLog = (log: Omit<DebugLog, 'id' | 'dateLogged'>) => {
    const newLog: DebugLog = {
      ...log,
      id: uuidv4(),
      dateLogged: new Date().toISOString().split('T')[0]
    };
    setLogs([...logs, newLog]);
  };

  const updateLog = (id: string, updatedLog: Partial<DebugLog>) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, ...updatedLog } : log
    ));
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const filteredLogs = (status?: DebugLog['status'], severity?: DebugLogSeverity) => {
    return logs.filter(log => {
      let match = true;
      if (status) {
        match = match && log.status === status;
      }
      if (severity) {
        match = match && log.severity === severity;
      }
      return match;
    });
  };

  return (
    <DebugLogsContext.Provider value={{ logs, addLog, updateLog, deleteLog, filteredLogs }}>
      {children}
    </DebugLogsContext.Provider>
  );
};

export const useDebugLogs = () => useContext(DebugLogsContext);
