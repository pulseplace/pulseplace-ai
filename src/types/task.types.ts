
export type TaskStatus = 'not_started' | 'in_progress' | 'in_review' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: Date;
}
