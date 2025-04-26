
export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed' | 'Won\'t Fix';
export type DebugLogSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface DebugLog {
  id: string;
  description: string;
  status: DebugLogStatus;
  severity: DebugLogSeverity;
  component: string;
  loggedBy: string;
  dateLogged: string;
  dateFixed?: string;
  assignedTo?: string;
  notes?: string;
  fixLink?: string;
}

// Add missing task types for build-flow
export interface BuildRequest {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  assignedTo?: string;
  module: TaskModule;
}

export type BuildFlowLane = 'backlog' | 'in_progress' | 'review' | 'done';

export type TaskModule = 
  | 'core'
  | 'dashboard'
  | 'certification'
  | 'pulsebot'
  | 'survey'
  | 'integration';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked';
export type TaskOwner = string;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  module: TaskModule;
  owner?: TaskOwner;
}
