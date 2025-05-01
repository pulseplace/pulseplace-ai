import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  Task, 
  TaskModule, 
  TaskPriority, 
  TaskStatus 
} from '@/types/task.types';
import { useTaskManager } from '@/contexts/TaskContext';

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'Not Started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Stuck':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Done':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

interface TaskTableProps {
  showSprint?: boolean;
  onEditTask: (task: Task) => void;
}

export default function TaskTable({ showSprint = false, onEditTask }: TaskTableProps) {
  const { tasks, deleteTask } = useTaskManager();
  const [sortField, setSortField] = useState<keyof Task>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Handle priority special case
    if (sortField === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const valA = priorityOrder[a.priority as TaskPriority] || 0;
      const valB = priorityOrder[b.priority as TaskPriority] || 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }
    
    // Handle deadline special case
    if (sortField === 'deadline') {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : 0;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : 0;
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    // Generic string/date sort
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Helper function to safely format dates (strings or Date objects)
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '-';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Task Name
              {sortField === 'name' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('module')}
            >
              Module
              {sortField === 'module' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('priority')}
            >
              Priority
              {sortField === 'priority' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
              {sortField === 'status' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('owner')}
            >
              Owner
              {sortField === 'owner' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('deadline')}
            >
              Deadline
              {sortField === 'deadline' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            {showSprint && (
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('sprint')}
              >
                Sprint
                {sortField === 'sprint' && (
                  <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell>{task.module}</TableCell>
              <TableCell>
                <Badge className={`${getPriorityColor(task.priority)} border`}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(task.status)} border`}>
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.owner}</TableCell>
              <TableCell>{formatDate(task.deadline)}</TableCell>
              {showSprint && (
                <TableCell>{task.sprint || '-'}</TableCell>
              )}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditTask(task)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
