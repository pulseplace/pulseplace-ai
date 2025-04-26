
import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from '@/types/task.types';

const TaskKanban = () => {
  const { tasks, moveTask } = useTasks();
  
  // Group tasks by status
  const tasksByStatus: Record<string, any[]> = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    review: tasks.filter(task => task.status === 'review'),
    blocked: tasks.filter(task => task.status === 'blocked'),
    completed: tasks.filter(task => task.status === 'completed'),
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in_progress': return 'In Progress';
      case 'review': return 'Review';
      case 'blocked': return 'Blocked';
      case 'completed': return 'Completed';
      default: return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
        <div key={status} className="flex flex-col h-full">
          <Card className="h-full flex flex-col overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Badge className={`${getStatusColor(status)} mr-2`}>
                  {statusTasks.length}
                </Badge>
                {getStatusLabel(status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto space-y-2 pb-6">
              {statusTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-white p-3 rounded border shadow-sm"
                >
                  <h4 className="font-medium line-clamp-2">{task.title}</h4>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}
                    </span>
                  </div>
                  
                  {task.owner && (
                    <div className="mt-2 text-xs text-gray-600">
                      {task.owner}
                    </div>
                  )}
                </div>
              ))}
              
              {statusTasks.length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  No tasks
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TaskKanban;
