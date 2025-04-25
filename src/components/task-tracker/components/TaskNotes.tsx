
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormValues } from '../types/form.types';

interface TaskNotesProps {
  form: UseFormReturn<TaskFormValues>;
}

export function TaskNotes({ form }: TaskNotesProps) {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea 
              {...field} 
              placeholder="Add any details or context about this task" 
              className="min-h-[100px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
