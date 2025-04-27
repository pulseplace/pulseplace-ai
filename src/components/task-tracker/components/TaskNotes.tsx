
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../TaskForm';

interface TaskNotesProps {
  form: UseFormReturn<TaskFormValues>;
}

export const TaskNotes: React.FC<TaskNotesProps> = ({ form }) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Additional notes for this task"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include any additional context, requirements, or observations for this task.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
