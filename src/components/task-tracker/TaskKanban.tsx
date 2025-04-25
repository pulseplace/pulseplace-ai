
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/contexts/TaskContext';
import { TaskStatus, Task } from '@/types/task.types';
import { AlertCircle, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

const TaskKanban = () => {
  const { tasks, updateTask } = useTasks();

  const columns: TaskStatus[] = ['Not Started', 'In Progress', 'Stuck', 'Done'];
  
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };
  
  const handleTaskStatusChange = (task: Task, newStatus: TaskStatus) => {
    updateTask(task.id, { status: newStatus });
  };
  
  // Get the next status in the workflow
  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    const statusIndex = columns.indexOf(currentStatus);
    // If not the last status, move to next, otherwise stay on current
    return statusIndex < columns.length - 1 ? columns[statusIndex + 1] : currentStatus;
  };
  
  // Get the previous status in the workflow
  const getPreviousStatus = (currentStatus: TaskStatus): TaskStatus => {
    const statusIndex = columns.indexOf(currentStatus);
    // If not the first status, move to previous, otherwise stay on current
    return statusIndex > 0 ? columns[statusIndex - 1] : currentStatus;
  };
  
  // Get color for priority badges
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-amber-500';
      case 'Low':
        return 'text-green-500';
      default:
        return '';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'High':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'Medium':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Low':
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((status) => (
        <div key={status} className="flex flex-col h-full">
          <h3 className="font-medium text-sm mb-2 px-1">{status}</h3>
          <div className="bg-gray-50 p-3 rounded-lg flex-grow min-h-[500px]">
            {getTasksByStatus(status).map((task) => (
              <Card key={task.id} className="mb-3 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{task.name}</h4>
                    {getPriorityIcon(task.priority)}
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {task.notes}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <Badge variant="outline" className="text-xs bg-gray-50">
                      {task.module}
                    </Badge>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.timeSpent || 0} min
                    </span>
                  </div>
                  
                  {task.deadline && (
                    <div className="flex items-center justify-end text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(task.deadline), 'MMM d')}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    {status !== columns[0] && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs py-0 h-7 flex-1"
                        onClick={() => handleTaskStatusChange(task, getPreviousStatus(status))}
                      >
                        ← Move Back
                      </Button>
                    )}
                    {status !== columns[columns.length - 1] && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs py-0 h-7 flex-1"
                        onClick={() => handleTaskStatusChange(task, getNextStatus(status))}
                      >
                        Move Forward →
                      </Button>
                    )}
                    {status !== 'Done' && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs py-0 h-7 w-7 p-0"
                        onClick={() => handleTaskStatusChange(task, 'Done')}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                </CardContent>
              </Card>
            ))}
            
            {getTasksByStatus(status).length === 0 && (
              <div className="text-center py-4 text-sm text-gray-400">
                No tasks in this column
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskKanban;
