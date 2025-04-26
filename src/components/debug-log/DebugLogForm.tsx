
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebugLogs } from '@/contexts/TaskContext';
import { DebugLogSeverity } from '@/types/task.types';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const DebugLogForm: React.FC = () => {
  const { addDebugLog } = useDebugLogs();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    addDebugLog({
      description: data.description,
      component: data.component,
      severity: data.severity as DebugLogSeverity,
      status: 'Open',
      loggedBy: data.loggedBy || 'Anonymous',
      assignedTo: data.assignedTo || undefined,
      notes: data.notes || undefined,
      fixLink: data.fixLink || undefined
    });

    toast.success('Debug log added successfully');
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log New Issue</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register('description', { required: 'Description is required' })}
              placeholder="Describe the issue..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="component">Component</Label>
            <Input
              id="component"
              {...register('component', { required: 'Component is required' })}
              placeholder="e.g., Dashboard, PulseBot, Survey"
            />
            {errors.component && (
              <p className="text-sm text-red-500">{errors.component.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select
              onValueChange={(value) => setValue('severity', value)}
              defaultValue="medium"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register('severity', { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loggedBy">Logged By</Label>
            <Input
              id="loggedBy"
              {...register('loggedBy')}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign To (Optional)</Label>
            <Input
              id="assignedTo"
              {...register('assignedTo')}
              placeholder="Assignee name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Additional details or steps to reproduce"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Log Issue</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DebugLogForm;
