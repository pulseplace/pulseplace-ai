
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Task } from '@/types/task.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Clock, Copy, Pencil, Trash2 } from 'lucide-react';

export interface TaskTableRowProps {
  task: Task;
  showSprint?: boolean;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onVote?: (taskId: string, isUpvote: boolean) => void;
  onTimeUpdate?: (taskId: string, timeSpent: number) => void;
  onDuplicate?: (taskId: string) => void;
}

export const TaskTableRow = ({
  task,
  showSprint = false,
  onEdit = () => {},
  onDelete = () => {},
  onVote = () => {},
  onTimeUpdate = () => {},
  onDuplicate = () => {}
}: TaskTableRowProps) => {
  // Format date to show only date part
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Done': 'bg-green-100 text-green-800',
      'Blocked': 'bg-red-100 text-red-800',
      'Backlog': 'bg-purple-100 text-purple-800'
    };
    
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };
  
  // Get priority color
  const getPriorityColor = (priority: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-amber-100 text-amber-800',
      'Low': 'bg-green-100 text-green-800'
    };
    
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{task.name}</TableCell>
      <TableCell>{task.module}</TableCell>
      <TableCell>
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusColor(task.status)}>
          {task.status}
        </Badge>
      </TableCell>
      <TableCell>{task.owner}</TableCell>
      <TableCell>{formatDate(task.deadline)}</TableCell>
      {showSprint && <TableCell>{task.sprint}</TableCell>}
      <TableCell>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(task.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDuplicate(task.id)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onTimeUpdate(task.id, 15)}>
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onVote(task.id, true)}>
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onVote(task.id, false)}>
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
