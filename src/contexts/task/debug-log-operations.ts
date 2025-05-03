
import { v4 as uuidv4 } from 'uuid';
import { DebugLog } from '@/types/task.types';

export const addDebugLog = (
  log: Omit<DebugLog, 'id' | 'dateLogged'>,
  currentLogs: DebugLog[]
): DebugLog[] => {
  const newLog: DebugLog = {
    ...log,
    id: uuidv4(),
    dateLogged: new Date()
  };
  return [...currentLogs, newLog];
};

export const updateDebugLog = (
  id: string,
  updates: Partial<DebugLog>,
  currentLogs: DebugLog[]
): DebugLog[] => {
  return currentLogs.map(log => 
    log.id === id ? { ...log, ...updates } : log
  );
};

export const deleteDebugLog = (
  id: string,
  currentLogs: DebugLog[]
): DebugLog[] => {
  return currentLogs.filter(log => log.id !== id);
};

export const getCriticalOpenLogs = (logs: DebugLog[]): DebugLog[] => {
  return logs.filter(
    log => log.severity === 'Critical' && log.status !== 'Fixed'
  );
};

export const getRecentlyFixedLogs = (days: number, logs: DebugLog[]): DebugLog[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return logs.filter(
    log => log.status === 'Fixed' && log.dateLogged >= cutoffDate
  );
};
