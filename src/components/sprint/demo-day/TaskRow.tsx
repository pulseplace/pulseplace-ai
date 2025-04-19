
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  PlayCircle, 
  AlertCircle, 
  Clock 
} from 'lucide-react';
import { QATask } from './types';
import { getStatusColor, getPriorityColor } from './utils/statusColors';

interface TaskRowProps {
  task: QATask;
  onUpdateTask: (taskId: string, newStatus: QATask['status']) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onUpdateTask }) => {
  // Determine the next status when clicked
  const getNextStatus = (currentStatus: QATask['status']): QATask['status'] => {
    switch (currentStatus) {
      case 'Not Started': return 'In Progress';
      case 'In Progress': return 'Completed';
      case 'Completed': return 'Not Started'; // Cycle back to beginning
      case 'Planned': return 'Not Started';
      default: return 'Not Started';
    }
  };
  
  const handleStatusUpdate = () => {
    onUpdateTask(task.id, getNextStatus(task.status));
  };
  
  const getStatusIcon = (status: QATask['status']) => {
    switch (status) {
      case 'Completed': return <Check className="h-4 w-4" />;
      case 'In Progress': return <PlayCircle className="h-4 w-4" />;
      case 'Not Started': return <AlertCircle className="h-4 w-4" />;
      case 'Planned': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };
  
  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          {task.icon}
          <span>{task.category}</span>
        </div>
      </td>
      <td className="px-4 py-2 text-sm">{task.description}</td>
      <td className="px-4 py-2 text-sm">
        <Badge className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </td>
      <td className="px-4 py-2 text-sm">
        <Badge className={getStatusColor(task.status)}>
          <span className="flex items-center gap-1">
            {getStatusIcon(task.status)}
            {task.status}
          </span>
        </Badge>
      </td>
      <td className="px-4 py-2 text-sm">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleStatusUpdate}
          className="h-8 px-2"
        >
          Update
        </Button>
      </td>
    </tr>
  );
};

export default TaskRow;
