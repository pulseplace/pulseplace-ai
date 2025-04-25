export type TaskModule = 
  | 'PulseScore Engine' 
  | 'AI Summary' 
  | 'Certification' 
  | 'Dashboard' 
  | 'Slack Bot' 
  | 'Lite Survey' 
  | 'Backend Infra' 
  | 'Frontend UI' 
  | 'Other';

export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Stuck' | 'Done';

export type TaskOwner = 'Lovable' | 'Founder' | 'External';

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
  timeSpent?: number; // Time spent in minutes
  feedback?: {
    upvotes: number;
    downvotes: number;
  };
  changelog?: string;
}

export type DebugLogSeverity = 'Critical' | 'Major' | 'Minor';

export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed';

export interface DebugLog {
  id: string;
  dateLogged: Date;
  component: TaskModule;
  description: string;
  severity: DebugLogSeverity;
  status: DebugLogStatus;
  fixLink?: string;
  loggedBy: string;
}

export type BuildFlowLane = 'BACKLOG' | 'CURRENT SPRINT' | 'SHIPPED';

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
