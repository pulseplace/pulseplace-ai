
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { TaskBasicInfo } from './components/TaskBasicInfo';
import { TaskMetadata } from './components/TaskMetadata';
import { TaskScheduling } from './components/TaskScheduling';
import { TaskNotes } from './components/TaskNotes';
import { TaskFormProps, TaskFormValues, taskSchema } from './types/form.types';

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ? {
      name: task.name,
      module: task.module,
      priority: task.priority,
      status: task.status,
      owner: task.owner,
      deadline: task.deadline ? new Date(task.deadline) : null,
      notes: task.notes || '',
      sprint: task.sprint || '',
    } : {
      name: '',
      module: 'Other',
      priority: 'Medium',
      status: 'Not Started',
      owner: 'Lovable',
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
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
