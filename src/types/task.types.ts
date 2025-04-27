
export type TaskStatus = 'not_started' | 'in_progress' | 'in_review' | 'completed' | 'todo' | 'review' | 'blocked';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  dueDate?: Date | string;
  module?: TaskModule;
  owner?: string;
  createdAt?: string;
  sprint?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskModule = 'core' | 'dashboard' | 'certification' | 'survey' | 'pulsebot' | 'integration';

export type BuildFlowLane = 'backlog' | 'current_sprint' | 'shipped';

export interface BuildRequest {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  module: string;
  lane?: BuildFlowLane;
  assignedTo?: string;
}
