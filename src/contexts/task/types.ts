
import { 
  Task, 
  TaskPriority, 
  TaskStatus,
  BuildFlowLane,
  DebugLogSeverity,
  DebugLogStatus,
  BuildRequest,
  DebugLog
} from '@/types/task.types';

export interface TaskContextType {
  // Task management
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
