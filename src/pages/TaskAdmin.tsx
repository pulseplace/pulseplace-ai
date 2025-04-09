
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
import { PlusCircle, Trash2, RefreshCw, CheckCircle, XCircle, Clock, ArrowUp, ArrowDown, PlayCircle, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
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

// Define sort configuration
interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Define filter state
interface FilterState {
  status: string;
  priority: string;
  assignee: string;
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
  
  // State for sorting and filtering
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'updated_at', direction: 'desc' });
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });
  
  // For task duplication
  const [duplicateTask, setDuplicateTask] = useState<Task | null>(null);

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
      
      // Show toast notification for completed tasks
      if (status === 'completed') {
        toast({
          title: "Task Completed",
          description: `Task has been marked as completed successfully!`,
          variant: "success"
        });
      } else {
        toast({
          title: "Success",
          description: `Task marked as ${status}`
        });
      }
      
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
  
  // Duplicate a task
  const handleDuplicateTask = async (task: Task) => {
    try {
      const newTask = {
        title: `${task.title} (Copy)`,
        description: task.description,
        priority: task.priority,
        status: 'pending', // Always set as pending for duplicated tasks
        assigned_to: task.assigned_to || null
      };
      
      const { data, error } = await supabase
        .from('lovable_tasks')
        .insert([newTask])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Task duplicated successfully"
      });
      
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      console.error('Error duplicating task:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate task. " + error.message,
        variant: "destructive"
      });
    }
  };
  
  // Run a task manually
  const runTask = async (task: Task) => {
    try {
      toast({
        title: "Task Started",
        description: `Task "${task.title}" has been triggered to run.`
      });
      
      // In a real implementation, this would call a function to execute the task
      // For now, we'll just mark it as in-progress
      await supabase
        .from('lovable_tasks')
        .update({ 
          status: 'in-progress', 
          updated_at: new Date().toISOString(),
          execution_log: `Manual execution started at ${new Date().toISOString()}`
        })
        .eq('id', task.id);
      
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      console.error('Error running task:', error);
      toast({
        title: "Error",
        description: "Failed to run task. " + error.message,
        variant: "destructive"
      });
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
    
    // Set up real-time subscription if needed
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'lovable_tasks' }, 
        (payload) => {
          console.log('Change received!', payload);
          fetchTasks();
        }
      )
      .subscribe();
      
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle form changes
  const handleFormChange = (field: keyof TaskFormState, value: string) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
  };
  
  // Preset form with duplicated task data
  useEffect(() => {
    if (duplicateTask) {
      setTaskForm({
        title: `${duplicateTask.title} (Copy)`,
        description: duplicateTask.description,
        priority: duplicateTask.priority,
        status: 'pending',
        assigned_to: duplicateTask.assigned_to || ''
      });
      setIsAddDialogOpen(true);
      setDuplicateTask(null);
    }
  }, [duplicateTask]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  
  // Apply sorting and filtering
  const sortedAndFilteredTasks = React.useMemo(() => {
    return [...tasks]
      // Apply filters
      .filter(task => {
        return (
          (filters.status === 'all' || task.status === filters.status) &&
          (filters.priority === 'all' || task.priority === filters.priority) &&
          (filters.assignee === 'all' || task.assigned_to === filters.assignee || 
            (!task.assigned_to && filters.assignee === 'unassigned'))
        );
      })
      // Apply sorting
      .sort((a, b) => {
        const key = sortConfig.key as keyof Task;
        if (!a[key] || !b[key]) return 0;
        
        let comparison = 0;
        if (key === 'created_at' || key === 'updated_at') {
          comparison = new Date(a[key] as string).getTime() - new Date(b[key] as string).getTime();
        } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          comparison = (a[key] as string).localeCompare(b[key] as string);
        }
        
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
  }, [tasks, sortConfig, filters]);
  
  // Get unique assignees for filter dropdown
  const uniqueAssignees = React.useMemo(() => {
    const assignees = tasks
      .map(task => task.assigned_to)
      .filter((assignee, index, self) => 
        assignee && self.indexOf(assignee) === index
      ) as string[];
    
    return ['all', 'unassigned', ...assignees];
  }, [tasks]);

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
          <h1 className="text-3xl font-bold text-gradient-primary">Task Admin</h1>
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createTask}>
                  Save Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Filtering and sorting controls */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div>
          <Select 
            value={filters.status} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filters.priority} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filters.assignee} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, assignee: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {uniqueAssignees
                .filter(a => a !== 'all' && a !== 'unassigned')
                .map(assignee => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
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
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  Title {sortConfig.key === 'title' && (
                    sortConfig.direction === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  Priority {sortConfig.key === 'priority' && (
                    sortConfig.direction === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('assigned_to')}
                >
                  Assigned To {sortConfig.key === 'assigned_to' && (
                    sortConfig.direction === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('updated_at')}
                >
                  Updated {sortConfig.key === 'updated_at' && (
                    sortConfig.direction === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />
                  )}
                </TableHead>
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
              ) : sortedAndFilteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No tasks found. Click "Add Task" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                sortedAndFilteredTasks.map((task) => (
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
                    <TableCell>{task.assigned_to || 'Unassigned'}</TableCell>
                    <TableCell>
                      {task.updated_at 
                        ? new Date(task.updated_at).toLocaleDateString() + ' ' + 
                          new Date(task.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          title="Mark as completed"
                          disabled={task.status === 'completed'}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          title="Mark as in progress"
                          disabled={task.status === 'in-progress'}
                        >
                          <Clock className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => runTask(task)}
                          title="Run task now"
                          disabled={task.status === 'in-progress' || task.status === 'completed'}
                        >
                          <PlayCircle className="h-4 w-4 text-purple-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDuplicateTask(task)}
                          title="Duplicate task"
                        >
                          <Copy className="h-4 w-4 text-gray-500" />
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
