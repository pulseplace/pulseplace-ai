
import React from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

const TaskKanban = () => {
  const { tasks, updateTask } = useTask();
  
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    updateTask(taskId, { status: status as any });
  };
  
  const columns = [
    { id: 'todo', name: 'To Do' },
    { id: 'in_progress', name: 'In Progress' },
    { id: 'review', name: 'Review' },
    { id: 'blocked', name: 'Blocked' },
    { id: 'completed', name: 'Completed' }
  ];
  
  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex overflow-x-auto pb-4 space-x-4">
      {columns.map(column => (
        <div 
          key={column.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="bg-gray-100 rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-sm">{column.name}</h3>
              <Badge variant="outline">{getTasksByStatus(column.id).length}</Badge>
            </div>
            
            <div className="space-y-3">
              {getTasksByStatus(column.id).map(task => (
                <Card 
                  key={task.id}
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      <span className="text-sm font-medium truncate">{task.title}</span>
                    </div>
                    
                    {task.description && (
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{task.module}</span>
                      {task.owner && <span>{task.owner}</span>}
                    </div>
                    
                    {task.dueDate && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">Due: {new Date(task.dueDate).toLocaleDateString()}</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskKanban;
