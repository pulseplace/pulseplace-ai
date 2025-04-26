
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task.types';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/contexts/TasksContext';
import { format, isValid } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';

interface TaskTableRowProps {
  task: Task;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge className="bg-amber-100 text-amber-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'review':
        return <Badge className="bg-purple-100 text-purple-800">Review</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">To Do</Badge>;
    }
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    const parsedDate = new Date(date);
    return isValid(parsedDate) ? format(parsedDate, 'MMM d, yyyy') : 'Invalid date';
  };

  const handleEdit = () => {
    // Implementation would be added when creating the edit dialog
    console.log('Edit task:', task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="font-medium">
        {task.title}
      </TableCell>
      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
      <TableCell>{getStatusBadge(task.status)}</TableCell>
      <TableCell>{task.module}</TableCell>
      <TableCell>{formatDate(task.dueDate)}</TableCell>
      <TableCell>{task.owner || 'Unassigned'}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TaskTableRow;
