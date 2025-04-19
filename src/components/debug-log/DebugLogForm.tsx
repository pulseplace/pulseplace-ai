
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { DebugLog, TaskModule } from '@/types/task.types';

const debugLogSchema = z.object({
  component: z.enum([
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
  description: z.string().min(5, 'Description must be at least 5 characters'),
  severity: z.enum(['Critical', 'Major', 'Minor'] as const),
  status: z.enum(['Open', 'In Progress', 'Fixed'] as const),
  fixLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  loggedBy: z.string().min(2, 'Name must be at least 2 characters'),
});

type DebugLogFormValues = z.infer<typeof debugLogSchema>;

interface DebugLogFormProps {
  log?: DebugLog;
  onSubmit: (data: DebugLogFormValues) => void;
  onCancel: () => void;
}

export default function DebugLogForm({ log, onSubmit, onCancel }: DebugLogFormProps) {
  const form = useForm<DebugLogFormValues>({
    resolver: zodResolver(debugLogSchema),
    defaultValues: log ? {
      component: log.component as TaskModule,
      description: log.description,
      severity: log.severity,
      status: log.status,
      fixLink: log.fixLink || '',
      loggedBy: log.loggedBy,
    } : {
      component: 'Other',
      description: '',
      severity: 'Minor',
      status: 'Open',
      fixLink: '',
      loggedBy: '',
    },
  });

  const handleSubmit = (data: DebugLogFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="component"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Component/Module</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select component" />
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
            name="loggedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logged By</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Major">Major</SelectItem>
                    <SelectItem value="Minor">Minor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Error Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Describe the error or issue in detail" 
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fixLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to Fix (optional)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="https://github.com/org/repo/pull/123" 
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
            {log ? 'Update Log' : 'Log Issue'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
