
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { TaskBasicInfo } from './components/TaskBasicInfo';
import { TaskMetadata } from './components/TaskMetadata';
import { TaskScheduling } from './components/TaskScheduling';
import { TaskNotes } from './components/TaskNotes';
import { z } from 'zod';

// Define schema for task form
const taskSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  module: z.string(),
  dueDate: z.string().optional(),
  owner: z.string().optional(),
  notes: z.string().optional(),
  sprint: z.string().optional(),
  deadline: z.date().optional().nullable(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export interface TaskFormProps {
  taskData?: {
    id?: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    module: string;
    owner?: string;
    dueDate?: string;
    deadline?: Date | null;
    notes?: string;
    sprint?: string;
  };
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
}

export default function TaskForm({ taskData, onSubmit, onCancel }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskData ? {
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status,
      priority: taskData.priority,
      module: taskData.module,
      owner: taskData.owner || '',
      dueDate: taskData.dueDate || '',
      deadline: taskData.deadline || null,
      notes: taskData.notes || '',
      sprint: taskData.sprint || '',
    } : {
      title: '',
      description: '',
      status: 'Not Started',
      priority: 'Medium',
      module: 'Other',
      owner: 'Lovable',
      dueDate: '',
      deadline: null,
      notes: '',
      sprint: 'Sprint April 22–26',
    },
  });

  const handleSubmit = (data: TaskFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TaskBasicInfo form={form} />
        <TaskMetadata form={form} />
        <TaskScheduling form={form} />
        <TaskNotes form={form} />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {taskData ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
