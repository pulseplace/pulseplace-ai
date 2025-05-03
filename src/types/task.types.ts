
// Task Types
export type TaskModule = 'Frontend UI' | 'Backend API' | 'Database' | 'Authentication' | 'PulseScore Engine' | 'AI Summary' | 'Analytics' | 'Certification' | 'Other';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Done' | 'Blocked';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskOwner = 'Founder' | 'Lovable' | 'Dev Team' | 'QA Team' | 'Product Team';

export interface Task {
  id: string;
  name: string;
  module: TaskModule;
  priority: TaskPriority;
  status: TaskStatus;
  owner: TaskOwner;
  deadline: Date | null;
  notes: string;
  sprint?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Build Flow Types
export type BuildFlowLane = 'BACKLOG' | 'CURRENT SPRINT' | 'IN PROGRESS' | 'DONE';

export interface BuildRequest {
  id: string;
  name: string;
  context: string;
  module: TaskModule;
  deadline: Date | null;
  notes: string;
  lane: BuildFlowLane;
  createdAt: Date;
}

// Debug Log Types
export type DebugLogSeverity = 'Critical' | 'Major' | 'Minor' | 'Improvement';
export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed';

export interface DebugLog {
  id: string;
  dateLogged: Date;
  component: string;
  description: string;
  severity: DebugLogSeverity;
  status: DebugLogStatus;
  fixLink?: string;
  loggedBy: string;
}
