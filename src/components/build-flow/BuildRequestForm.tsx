
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useBuildRequests } from '@/contexts/BuildRequestsContext';
import { BuildRequest, TaskModule } from '@/types/task.types';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const BuildRequestForm: React.FC = () => {
  const { addBuildRequest } = useBuildRequests();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const modules: TaskModule[] = [
    'core',
    'dashboard',
    'certification',
    'pulsebot',
    'survey',
    'integration'
  ];

  const onSubmit = (data: any) => {
    addBuildRequest({
      title: data.title,
      description: data.description || '',
      status: 'backlog',
      priority: data.priority,
      module: data.module,
      assignedTo: data.assignedTo || undefined
    });

    toast.success('Build request added successfully');
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Build Request</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Feature or component name"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe what needs to be built"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              onValueChange={(value) => setValue('priority', value)}
              defaultValue="medium"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register('priority', { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="module">Module</Label>
            <Select
              onValueChange={(value) => setValue('module', value)}
              defaultValue="core"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module} value={module}>
                    {module.charAt(0).toUpperCase() + module.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register('module', { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign To (Optional)</Label>
            <Input
              id="assignedTo"
              {...register('assignedTo')}
              placeholder="Assignee name"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Build Request</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BuildRequestForm;
