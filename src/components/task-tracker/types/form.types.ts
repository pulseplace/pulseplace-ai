
import { Task } from '@/types/task.types';

export interface TaskFormValues extends Omit<Task, 'id' | 'createdAt'> {
  dueDate?: string;
}
