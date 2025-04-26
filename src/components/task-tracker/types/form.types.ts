
import { z } from "zod";
import { TaskModule, TaskPriority, TaskStatus } from '@/types/task.types';

export const taskSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  module: z.string(),
  dueDate: z.string().optional(),
  owner: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export interface TaskFormProps {
  defaultValues?: TaskFormValues;
  onSubmit: (data: TaskFormValues) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}
