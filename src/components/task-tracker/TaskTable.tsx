
import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task.types';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskTableProps {
  showSprint?: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({ showSprint = false }) => {
  const { tasks, updateTask, deleteTask } = useTask();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-200 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Get priority indicator
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'critical':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Critical Priority</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'high':
        return (
          <div className="w-3 h-3 rounded-full bg-red-500" />
        );
      case 'medium':
        return (
          <div className="w-3 h-3 rounded-full bg-amber-500" />
        );
      case 'low':
        return (
          <div className="w-3 h-3 rounded-full bg-green-500" />
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Priority</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            {showSprint && <TableHead>Sprint</TableHead>}
            <TableHead>Owner</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  {getPriorityIndicator(task.priority)}
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <div className="text-sm font-medium">{task.title}</div>
                    {task.description && (
                      <div className="text-xs text-gray-500 mt-0.5">{task.description}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                {showSprint && (
                  <TableCell>
                    {task.sprint || '-'}
                  </TableCell>
                )}
                <TableCell>
                  {task.owner || '-'}
                </TableCell>
                <TableCell>
                  {formatDate(task.dueDate)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditingId(task.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={showSprint ? 7 : 6} className="h-24 text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
