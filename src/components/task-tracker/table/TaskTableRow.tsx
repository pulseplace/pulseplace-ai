
import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types/task.types';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  Clock,
  PlayCircle,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskTableRowProps {
  task: Task;
  showSprint?: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onVote: (id: string, isUpvote: boolean) => void;
  onTimeUpdate: (id: string) => void;
  onDuplicate: (task: Task) => void;
}

export function TaskTableRow({
  task,
  showSprint,
  onEdit,
  onDelete,
  onVote,
  onTimeUpdate,
  onDuplicate,
}: TaskTableRowProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Not Started':
        return 'outline';
      case 'In Progress':
        return 'default';
      case 'Stuck':
        return 'destructive';
      case 'Done':
        return 'success';
      default:
        return 'outline';
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium max-w-[200px]">
        <div className="truncate">{task.name}</div>
        {task.notes && (
          <div className="text-sm text-gray-500 truncate">
            {task.notes}
          </div>
        )}
      </TableCell>
      <TableCell>{task.module}</TableCell>
      <TableCell>
        <Badge variant={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusColor(task.status)}>
          {task.status}
        </Badge>
      </TableCell>
      <TableCell>{task.owner}</TableCell>
      <TableCell>
        {task.deadline ? format(new Date(task.deadline), 'MMM d, yyyy') : '-'}
      </TableCell>
      {showSprint && (
        <TableCell>{task.sprint || '-'}</TableCell>
      )}
      <TableCell className="text-right">
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTimeUpdate(task.id)}
            className="h-8 w-8 p-0"
          >
            <Clock className="h-4 w-4" />
            {task.timeSpent && (
              <span className="ml-1 text-xs">{task.timeSpent}m</span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(task.id, true)}
            className="h-8 w-8 p-0"
          >
            <ThumbsUp className="h-4 w-4" />
            {task.feedback?.upvotes && (
              <span className="ml-1 text-xs">{task.feedback.upvotes}</span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(task.id, false)}
            className="h-8 w-8 p-0"
          >
            <ThumbsDown className="h-4 w-4" />
            {task.feedback?.downvotes && (
              <span className="ml-1 text-xs">{task.feedback.downvotes}</span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(task)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
