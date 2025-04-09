import React, { useState, useEffect } from 'react';
import MetaTags from '@/components/MetaTags';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Trash2, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ImportTasksDialog from '@/components/task-admin/ImportTasksDialog';

// Define task type
interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assigned_to?: string;
  created_at?: string;
  updated_at?: string;
  error_message?: string;
  execution_log?: string;
}

// Define task form state
interface TaskFormState {
  title: string;
  description: string;
  priority: string;
  status: string;
  assigned_to?: string;
}

const TaskAdmin: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    assigned_to: ''
  });

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lovable_tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setTasks(data || []);
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks. " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      if (!taskForm.title) {
        toast({
          title: "Validation Error",
          description: "Task title is required",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('lovable_tasks')
        .insert([{
          title: taskForm.title,
          description: taskForm.description,
          priority: taskForm.priority,
          status: taskForm.status,
          assigned_to: taskForm.assigned_to || null
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Task created successfully"
      });
      
      // Reset form and close dialog
      setTaskForm({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        assigned_to: ''
      });
      setIsAddDialogOpen(false);
      
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task. " + error.message,
        variant: "destructive"
      });
    }
  };

  // Update task status
  const updateTaskStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('lovable_tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Task marked as ${status}`
      });
      
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. " + error.message,
        variant: "destructive"
      });
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lovable_tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
      
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. " + error.message,
        variant: "destructive"
      });
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form changes
  const handleFormChange = (field: keyof TaskFormState, value: string) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
  };

  // Get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'completed': return 'success';
      case 'failed': return 'destructive';
      case 'pending': return 'default';
      case 'in-progress': return 'secondary';
      default: return 'outline';
    }
  };

  // Get badge variant based on priority
  const getPriorityBadgeVariant = (priority: string) => {
    switch(priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <MetaTags
        title="Task Admin | PulsePlace.ai"
        description="Manage and track tasks in the PulsePlace platform."
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Admin</h1>
          <p className="text-gray-600">Manage and track tasks in the PulsePlace platform</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchTasks}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <ImportTasksDialog onImportComplete={fetchTasks} />
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-pulse-gradient">
                <PlusCircle className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={taskForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="Task title"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    value={taskForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="priority">Priority</label>
                    <Select
                      value={taskForm.priority}
                      onValueChange={(value) => handleFormChange('priority', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="status">Status</label>
                    <Select
                      value={taskForm.status}
                      onValueChange={(value) => handleFormChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="assigned_to">Assigned To</label>
                  <Input
                    id="assigned_to"
                    value={taskForm.assigned_to || ''}
                    onChange={(e) => handleFormChange('assigned_to', e.target.value)}
                    placeholder="Assigned person or team (optional)"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createTask}>
                  Save Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all tasks in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                      <span>Loading tasks...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No tasks found. Click "Add Task" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate">{task.title}</div>
                      {task.description && (
                        <div className="text-sm text-gray-500 truncate">
                          {task.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadgeVariant(task.priority) as any}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(task.status) as any}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.assigned_to || '-'}</TableCell>
                    <TableCell>
                      {task.created_at 
                        ? new Date(task.created_at).toLocaleDateString() 
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          title="Mark as completed"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          title="Mark as in progress"
                        >
                          <Clock className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskAdmin;
