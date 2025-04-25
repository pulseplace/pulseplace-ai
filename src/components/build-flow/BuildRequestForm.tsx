
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { BuildRequest, TaskModule } from '@/types/task.types';

const buildRequestSchema = z.object({
  name: z.string().min(3, 'Request name must be at least 3 characters'),
  context: z.string().min(10, 'Please provide more context'),
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
  deadline: z.date().nullable(),
  notes: z.string().optional(),
});

type BuildRequestFormValues = z.infer<typeof buildRequestSchema>;

interface BuildRequestFormProps {
  request?: BuildRequest;
  onSubmit: (data: BuildRequestFormValues) => void;
  onCancel: () => void;
}

export default function BuildRequestForm({ request, onSubmit, onCancel }: BuildRequestFormProps) {
  const form = useForm<BuildRequestFormValues>({
    resolver: zodResolver(buildRequestSchema),
    defaultValues: request ? {
      name: request.name,
      context: request.context,
      module: request.module,
      deadline: request.deadline ? new Date(request.deadline) : null,
      notes: request.notes || '',
    } : {
      name: '',
      context: '',
      module: 'Other',
      deadline: null,
      notes: '',
    },
  });

  const handleSubmit = (data: BuildRequestFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter build request name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="module"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Module</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PulseScore Engine">PulseScore Engine</SelectItem>
                    <SelectItem value="AI Summary">AI Summary</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Dashboard">Dashboard</SelectItem>
                    <SelectItem value="Slack Bot">Slack Bot</SelectItem>
                    <SelectItem value="Lite Survey">Lite Survey</SelectItem>
                    <SelectItem value="Backend Infra">Backend Infra</SelectItem>
                    <SelectItem value="Frontend UI">Frontend UI</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>No deadline</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Context</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Provide context about why this feature is needed"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Any additional details or requirements"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {request ? 'Update Request' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
