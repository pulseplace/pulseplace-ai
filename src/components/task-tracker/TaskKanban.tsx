
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useTaskManager } from '@/contexts/TaskContext';
import { Task, TaskStatus } from '@/types/task.types';

const TASK_STATUSES: TaskStatus[] = ['Not Started', 'In Progress', 'Stuck', 'Done'];

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

const getPriorityColor = (priority: string) => {
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

interface TaskKanbanProps {
  onEditTask: (task: Task) => void;
}

export default function TaskKanban({ onEditTask }: TaskKanbanProps) {
  const { tasks, updateTask } = useTaskManager();

  // Group tasks by status
  const tasksByStatus = TASK_STATUSES.reduce<Record<TaskStatus, Task[]>>((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {
    'Not Started': [],
    'In Progress': [],
    'Stuck': [],
    'Done': []
  });

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTask(taskId, { status: targetStatus });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {TASK_STATUSES.map(status => (
        <div key={status} className="flex flex-col space-y-2">
          <div 
            className={`p-2 rounded-md mb-2 text-center font-medium ${getStatusColor(status)}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            {status} ({tasksByStatus[status].length})
          </div>
          <div 
            className="space-y-2 min-h-[200px] p-2 rounded-md bg-gray-50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            {tasksByStatus[status].map(task => (
              <Card 
                key={task.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onClick={() => onEditTask(task)}
              >
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm font-medium">{task.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>
                      {task.priority}
                    </Badge>
                    <span>{task.module}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>{task.owner}</span>
                    {task.deadline && (
                      <span>{format(new Date(task.deadline), 'MMM d')}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
