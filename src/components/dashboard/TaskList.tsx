
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { useTasks } from '@/contexts/TasksContext';
import { Task, TaskPriority } from '@/types/task.types';

const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  
  const priorityColors: Record<string, string> = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'low': 'bg-blue-100 text-blue-800',
    'critical': 'bg-purple-100 text-purple-800'
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Then sort by priority
    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Current Tasks</span>
          <Badge className="bg-blue-100 text-blue-800">{tasks.length} Tasks</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedTasks.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No tasks found</p>
        ) : (
          <div className="space-y-2">
            {sortedTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center">
                  {getStatusIcon(task.status)}
                  <div className="ml-3">
                    <h4 className="text-sm font-medium">{task.title}</h4>
                    <p className="text-xs text-gray-500">{task.module}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.owner && (
                    <span className="text-xs text-gray-500">{task.owner}</span>
                  )}
                  <Badge className={priorityColors[task.priority.toLowerCase()]}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
