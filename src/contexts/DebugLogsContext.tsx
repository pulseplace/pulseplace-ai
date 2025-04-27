
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebugLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
}

interface DebugLogsContextType {
  logs: DebugLog[];
  addLog: (log: Omit<DebugLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

const DebugLogsContext = createContext<DebugLogsContextType | undefined>(undefined);

export const useDebugLogs = (): DebugLogsContextType => {
  const context = useContext(DebugLogsContext);
  if (!context) {
    throw new Error('useDebugLogs must be used within a DebugLogsProvider');
  }
  return context;
};

interface DebugLogsProviderProps {
  children: ReactNode;
}

export const DebugLogsProvider: React.FC<DebugLogsProviderProps> = ({ children }) => {
  const [logs, setLogs] = useState<DebugLog[]>([]);

  const addLog = (log: Omit<DebugLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setLogs(prev => [...prev, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <DebugLogsContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </DebugLogsContext.Provider>
  );
};
