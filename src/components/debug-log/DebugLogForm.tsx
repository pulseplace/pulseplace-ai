import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  TaskModule, 
  DebugLogSeverity, 
  DebugLogStatus,
  DebugLog
} from '@/types/task.types';
import { useAuth } from '@/contexts/AuthContext';

const logSchema = z.object({
  component: z.string().min(1, { message: "Component is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  severity: z.enum(['Critical', 'Major', 'Minor', 'Improvement']),
  status: z.enum(['Open', 'In Progress', 'Fixed']),
  fixLink: z.string().optional(),
  loggedBy: z.string().min(1, { message: "Logged By is required" }),
});

interface DebugLogFormProps {
  log?: DebugLog;
  onSubmit: (values: z.infer<typeof logSchema>) => void;
  onCancel: () => void;
}

const DebugLogForm: React.FC<DebugLogFormProps> = ({ log, onSubmit, onCancel }) => {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof logSchema>>({
    resolver: zodResolver(logSchema),
    defaultValues: log ? {
      component: log.component,
      description: log.description,
      severity: log.severity,
      status: log.status,
      fixLink: log.fixLink || '',
      loggedBy: log.loggedBy
    } : {
      component: 'Frontend UI' as TaskModule, // Use a valid value from the updated TaskModule type
      description: '',
      severity: 'Major' as DebugLogSeverity,
      status: 'Open' as DebugLogStatus,
      fixLink: '',
      loggedBy: user ? `${user.displayName || user.email}` : 'Anonymous'
    },
  });

  const handleSubmit = (values: z.infer<typeof logSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="component"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Component</FormLabel>
              <FormControl>
                <Input placeholder="e.g., User Authentication" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed description of the issue" {...field} className="min-h-[80px]" />
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
                  <SelectItem value="Improvement">Improvement</SelectItem>
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
        <FormField
          control={form.control}
          name="fixLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fix Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Link to the fix or commit" {...field} />
              </FormControl>
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
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-pulse-gradient">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DebugLogForm;
