
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskFormValues } from '../types/form.types';

interface TaskBasicInfoProps {
  form: UseFormReturn<TaskFormValues>;
}

export function TaskBasicInfo({ form }: TaskBasicInfoProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Task Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter task name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
