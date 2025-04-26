
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'blocked' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskModule = 'dashboard' | 'pulsebot' | 'certification' | 'analytics' | 'survey';
export type BuildFlowLane = 'backlog' | 'current_sprint' | 'shipped';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  deadline?: string;
  createdAt: string;
  module: TaskModule;
  owner?: string;
  assignedTo?: string;
  sprint?: string;
}

export interface BuildRequest {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'in_progress' | 'review' | 'blocked' | 'completed' | 'shipped';
  priority: TaskPriority;
  createdAt: string;
  module: TaskModule;
  assignedTo?: string;
  lane?: BuildFlowLane;
}

export interface DebugLog {
  id: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Fixed';
  severity: DebugLogSeverity;
  component: string;
  loggedBy?: string;
  dateLogged: string;
  dateFixed?: string;
  assignedTo?: string;
  notes?: string;
  fixLink?: string;
}

export type DebugLogSeverity = 'low' | 'medium' | 'high' | 'critical';
