import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, ClockIcon } from 'lucide-react';
import AddTaskDialog from './AddTaskDialog';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const { tasks } = useTasks();
  const navigate = useNavigate();
  
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-amber-500" />;
    }
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 4;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 4;
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return 0;
  });
  
  const topTasks = sortedTasks.slice(0, 5);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Priority Tasks</CardTitle>
          <div className="flex gap-2">
            <AddTaskDialog>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </AddTaskDialog>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/task-tracker')} 
              className="h-8"
            >
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topTasks.length > 0 ? (
            topTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-start justify-between p-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} mt-2`} />
                  <div>
                    <div className="font-medium text-sm">{task.title}</div>
                    {task.description && (
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {task.description}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                        {task.module}
                      </Badge>
                      {task.owner && <span>{task.owner}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="text-xs text-gray-600 ml-1">
                      {task.status === 'completed' ? 'Done' : 'In Progress'}
                    </span>
                  </div>
                  
                  {task.dueDate && (
                    <Badge variant="outline" className="text-[10px]">
                      {formatDate(task.dueDate)}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-sm text-gray-500">
              No tasks found. Add a new task to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
