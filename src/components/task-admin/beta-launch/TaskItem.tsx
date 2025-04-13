
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { PhaseItem } from './types';

interface TaskItemProps {
  task: PhaseItem['tasks'][0];
  phaseStatus: PhaseItem['status'];
}

const TaskItem: React.FC<TaskItemProps> = ({ task, phaseStatus }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-3 ${
          task.status === 'completed' ? 'bg-green-500' : 
          task.status === 'in-progress' ? 'bg-blue-500' : 
          task.status === 'at-risk' ? 'bg-red-500' : 'bg-gray-300'
        }`} />
        <span className={phaseStatus === 'upcoming' ? 'text-gray-400' : ''}>{task.name}</span>
      </div>
      <Badge className={`
        ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
        task.status === 'at-risk' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
        ${task.priority === 'high' ? 'border border-red-200' : ''}
      `}>
        {task.status === 'at-risk' ? 'At Risk' : task.status}
        {task.priority === 'high' && ' (High)'}
      </Badge>
    </div>
  );
};

export default TaskItem;
