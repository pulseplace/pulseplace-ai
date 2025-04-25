
// Define task status options
export type TaskStatus = 'Not Started' | 'In Progress' | 'Done' | 'Blocked' | 'Backlog';

// Define task priority options
export type TaskPriority = 'High' | 'Medium' | 'Low';

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
  module: string;
  priority: TaskPriority;
  status: TaskStatus;
  owner: string;
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
  module: string;
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
