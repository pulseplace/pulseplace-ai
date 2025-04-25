
import { z } from 'zod';
import { Task } from '@/types/task.types';

export const taskSchema = z.object({
  name: z.string().min(3, 'Task name must be at least 3 characters'),
  module: z.enum([
    'PulseScore Engine', 
    'AI Summary', 
    'Certification', 
    'Dashboard', 
    'Slack Bot', 
    'Lite Survey', 
    'Backend Infra', 
    'Frontend UI', 
    'Other'
  ] as const),
  priority: z.enum(['High', 'Medium', 'Low'] as const),
  status: z.enum(['Not Started', 'In Progress', 'Done', 'Blocked', 'Backlog', 'Stuck'] as const),
  owner: z.enum(['Lovable', 'Founder', 'External'] as const),
  deadline: z.date().nullable(),
  notes: z.string().optional(),
  sprint: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
}
