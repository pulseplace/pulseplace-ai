
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Plus, Edit, Trash2, Check, AlertCircle, Clock } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetaTags from '@/components/MetaTags';

// Task type definition
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'done' | 'error';
  priority: string;
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  error_message?: string;
  execution_log?: string;
}

const TaskAdmin: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assigned_to: ''
  });

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lovable_tasks')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle task creation/update
  const handleSaveTask = async () => {
    try {
      if (!formData.title.trim()) {
        toast.error('Task title is required');
        return;
      }

      if (editMode && currentTask) {
        // Update existing task
        const { error } = await supabase
          .from('lovable_tasks')
          .update({
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            assigned_to: formData.assigned_to,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentTask.id);

        if (error) throw error;
        toast.success('Task updated successfully');
      } else {
        // Create new task
        const { error } = await supabase
          .from('lovable_tasks')
          .insert([{
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            assigned_to: formData.assigned_to,
            status: 'pending'
          }]);

        if (error) throw error;
        toast.success('Task created successfully');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task');
    }
  };

  // Delete task
  const handleDeleteTask = async () => {
    if (!currentTask) return;

    try {
      const { error } = await supabase
        .from('lovable_tasks')
        .delete()
        .eq('id', currentTask.id);

      if (error) throw error;
      toast.success('Task deleted successfully');
      setIsDeleteDialogOpen(false);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Update task status
  const handleUpdateStatus = async (id: string, status: Task['status']) => {
    try {
      const { error } = await supabase
        .from('lovable_tasks')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Task marked as ${status}`);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
    }
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      assigned_to: task.assigned_to || ''
    });
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (task: Task) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (task: Task) => {
    setCurrentTask(task);
    setDetailsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      assigned_to: ''
    });
    setCurrentTask(null);
    setEditMode(false);
  };

  // Helper function for status badge
  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <Badge className="bg-green-500">Done</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  // Helper function for priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-500 text-red-500">High</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">Low</Badge>;
      default:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <MetaTags 
        title="Task Admin | PulsePlace.ai" 
        description="Manage system tasks and background jobs"
      />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Admin</h1>
          <p className="text-gray-600 mt-1">Manage system tasks and background jobs</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchTasks}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.length === 0 && !loading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">No tasks found</p>
              <Button onClick={() => setIsDialogOpen(true)}>Create your first task</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Priority</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Assigned To</th>
                      <th className="px-4 py-2 text-left">Updated</th>
                      <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {tasks.map(task => (
                      <tr key={task.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 text-left">
                          <div className="font-medium">{task.title}</div>
                          {task.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {task.description}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-left">
                          {getPriorityBadge(task.priority)}
                        </td>
                        <td className="px-4 py-3 text-left">
                          {getStatusBadge(task.status)}
                        </td>
                        <td className="px-4 py-3 text-left">
                          {task.assigned_to || '-'}
                        </td>
                        <td className="px-4 py-3 text-left">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-sm">
                              {new Date(task.updated_at).toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewDetails(task)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(task)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(task)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Task Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Task" : "Create New Task"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the details of this task" 
                : "Fill out the details to create a new task"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter task title" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Enter task description" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={value => setFormData({...formData, priority: value})}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input 
                id="assigned_to" 
                value={formData.assigned_to} 
                onChange={e => setFormData({...formData, assigned_to: e.target.value})}
                placeholder="Enter assignee" 
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveTask}>
              {editMode ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentTask && (
              <div className="border p-4 rounded-md bg-muted/30">
                <p className="font-medium">{currentTask.title}</p>
                <p className="text-sm text-gray-500">{currentTask.description}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">{getStatusBadge(currentTask.status)}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 font-medium">{currentTask.title}</p>
              </div>
              {currentTask.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{currentTask.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                  <p className="mt-1">{getPriorityBadge(currentTask.priority)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                  <p className="mt-1">{currentTask.assigned_to || '-'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="mt-1 text-sm">
                    {new Date(currentTask.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Updated</h3>
                  <p className="mt-1 text-sm">
                    {new Date(currentTask.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {currentTask.error_message && (
                <div className="border border-red-200 bg-red-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-red-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Error Message
                  </h3>
                  <p className="mt-1 text-sm text-red-600">{currentTask.error_message}</p>
                </div>
              )}
              
              {currentTask.execution_log && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Execution Log</h3>
                  <pre className="mt-1 text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
                    {currentTask.execution_log}
                  </pre>
                </div>
              )}
              
              {currentTask.status !== 'done' && (
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Actions</h3>
                  <div className="flex gap-2">
                    {currentTask.status !== 'in_progress' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateStatus(currentTask.id, 'in_progress')}
                        variant="outline"
                      >
                        Mark as In Progress
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      onClick={() => handleUpdateStatus(currentTask.id, 'done')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskAdmin;
