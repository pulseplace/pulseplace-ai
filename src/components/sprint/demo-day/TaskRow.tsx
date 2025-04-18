
import React from 'react';
import { QATask } from './types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor, getPriorityColor } from './utils/statusColors';

interface TaskRowProps {
  task: QATask;
  onUpdateTask: (taskId: string, newStatus: QATask['status']) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onUpdateTask }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-muted/30">
      <td className="px-4 py-3 align-top">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-md bg-muted">
            {task.icon}
          </div>
          <span>{task.category}</span>
        </div>
      </td>
      <td className="px-4 py-3">{task.description}</td>
      <td className="px-4 py-3">
        <Badge variant="secondary" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <span className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${getStatusColor(task.status)}`}>
          <span>{task.status}</span>
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex space-x-1">
          {task.status !== 'Completed' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => onUpdateTask(task.id, 'Completed')}
            >
              Complete
            </Button>
          )}
          {task.status === 'Not Started' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => onUpdateTask(task.id, 'In Progress')}
            >
              Start
            </Button>
          )}
          {task.status === 'Completed' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => onUpdateTask(task.id, 'In Progress')}
            >
              Reopen
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
