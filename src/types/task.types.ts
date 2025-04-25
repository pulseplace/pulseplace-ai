
// Define task status options
export type TaskStatus = 'Not Started' | 'In Progress' | 'Done' | 'Blocked' | 'Backlog' | 'Stuck';

// Define task priority options
export type TaskPriority = 'High' | 'Medium' | 'Low';

// Define task module options
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

// Define task owner options
export type TaskOwner = 'Lovable' | 'Founder' | 'External';

// Define allowed lanes for build flow
export type BuildFlowLane = 'BACKLOG' | 'CURRENT SPRINT' | 'SHIPPED';

// Define debug log severity
export type DebugLogSeverity = 'Critical' | 'Major' | 'Minor';

// Define debug log status
export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed';

// Task object type
export interface Task {
  id: string;
  name: string;
  module: TaskModule;
  priority: TaskPriority;
  status: TaskStatus;
  owner: TaskOwner;
  deadline?: Date;
  notes?: string;
  sprint?: string;
  createdAt: Date;
  updatedAt: Date;
  timeSpent?: number;
  feedback?: {
    upvotes: number;
    downvotes: number;
  };
}

// Debug log type
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

// Build request type
export interface BuildRequest {
  id: string;
  name: string;
  context: string;
  module: TaskModule;
  deadline: Date;
  notes?: string;
  lane: BuildFlowLane;
  createdAt: Date;
}

// Integration token type
export interface IntegrationToken {
  id: string;
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  webhookUrl?: string;
  createdAt: Date;
}
