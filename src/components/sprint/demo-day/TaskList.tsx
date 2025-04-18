
import React from 'react';
import { QATask } from './types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TaskListProps {
  tasks: QATask[];
  onUpdateTask: (taskId: string, newStatus: QATask['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Planned': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Post-Demo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted/50">
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Category</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Description</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Priority</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Status</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-b border-gray-100 hover:bg-muted/30">
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
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
