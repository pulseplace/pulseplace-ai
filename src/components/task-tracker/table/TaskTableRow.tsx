
import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { Task } from '@/types/task.types';
import { format } from 'date-fns';

interface TaskTableRowProps {
  task: Task;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'todo':
        return <Badge variant="outline">To Do</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'review':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">In Review</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Blocked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
      <TableCell>{getStatusBadge(task.status)}</TableCell>
      <TableCell>
        <Badge variant="outline">{task.module}</Badge>
      </TableCell>
      <TableCell>{formatDate(task.dueDate)}</TableCell>
      <TableCell>{task.owner || 'Unassigned'}</TableCell>
      <TableCell className="text-right">
        <div className="relative">
          <Button variant="ghost" size="sm" onClick={() => setMenuOpen(!menuOpen)}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button 
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    // Edit action
                  }}
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Edit
                </button>
                <button 
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    // Delete action
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TaskTableRow;
