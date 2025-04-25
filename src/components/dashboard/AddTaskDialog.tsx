
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskModule, TaskPriority, TaskStatus, TaskOwner } from '@/types/task.types';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTasks } from '@/contexts/TaskContext';

interface AddTaskDialogProps {
  children?: React.ReactNode;
  buttonText?: string;
  sprint?: string;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ 
  children, 
  buttonText = "Add New Task",
  sprint
}) => {
  const { addTask } = useTasks();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const [taskName, setTaskName] = useState('');
  const [taskModule, setTaskModule] = useState<TaskModule>('Dashboard');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('Medium');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('Not Started');
  const [taskOwner, setTaskOwner] = useState<TaskOwner>('Lovable');
  const [taskDeadline, setTaskDeadline] = useState<Date | null>(null);
  const [taskNotes, setTaskNotes] = useState('');
  
  const resetForm = () => {
    setTaskName('');
    setTaskModule('Dashboard');
    setTaskPriority('Medium');
    setTaskStatus('Not Started');
    setTaskOwner('Lovable');
    setTaskDeadline(null);
    setTaskNotes('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast({
        title: "Error",
        description: "Task name is required",
        variant: "destructive"
      });
      return;
    }
    
    addTask({
      name: taskName,
      module: taskModule,
      priority: taskPriority,
      status: taskStatus,
      owner: taskOwner,
      deadline: taskDeadline,
      notes: taskNotes,
      sprint
    });
    
    toast({
      title: "Success",
      description: "Task created successfully"
    });
    
    resetForm();
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>{buttonText}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task for tracking and management.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input 
              id="taskName" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="module">Module</Label>
              <Select 
                value={taskModule} 
                onValueChange={(value) => setTaskModule(value as TaskModule)}
              >
                <SelectTrigger id="module">
                  <SelectValue placeholder="Select Module" />
                </SelectTrigger>
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
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={taskPriority} 
                onValueChange={(value) => setTaskPriority(value as TaskPriority)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={taskStatus} 
                onValueChange={(value) => setTaskStatus(value as TaskStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Stuck">Stuck</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="owner">Owner</Label>
              <Select 
                value={taskOwner} 
                onValueChange={(value) => setTaskOwner(value as TaskOwner)}
              >
                <SelectTrigger id="owner">
                  <SelectValue placeholder="Select Owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lovable">Lovable</SelectItem>
                  <SelectItem value="Founder">Founder</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !taskDeadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {taskDeadline ? format(taskDeadline, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={taskDeadline || undefined}
                  onSelect={setTaskDeadline}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              value={taskNotes}
              onChange={(e) => setTaskNotes(e.target.value)}
              placeholder="Add any additional details"
              className="h-20"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
