import React, { useState } from 'react';
import { 
  Calendar, 
  Check, 
  Plus, 
  Trash2,
  AlertCircle,
  ArrowUp,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTaskManager, Task } from '@/contexts/TaskContext';
import { AddTaskDialog } from './AddTaskDialog';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export interface TaskListProps {
  tasks?: Task[];
}

const TaskList = ({ tasks }: TaskListProps = {}) => {
  const { toast } = useToast();
  const { dailyTasks, completeTask, deleteTask } = useTaskManager();
  const [showAddTask, setShowAddTask] = useState(false);
  
  // Use either passed tasks or dailyTasks from context
  const displayTasks = tasks || dailyTasks;

  const handleCompleteTask = (id: string) => {
    completeTask(id);
    toast({ description: "Task marked as completed" });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({ description: "Task removed" });
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="ml-2 bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="ml-2">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold">Today's Tasks</CardTitle>
        <Button 
          onClick={() => setShowAddTask(true)} 
          size="sm" 
          className="bg-pulse-gradient"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {displayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
            <Clock className="h-12 w-12 mb-2 text-gray-400" />
            <p>No tasks scheduled for today</p>
            <Button 
              variant="link" 
              onClick={() => setShowAddTask(true)}
              className="mt-2 text-pulse-600"
            >
              Add your first task
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {displayTasks.map((task) => (
              <li 
                key={task.id} 
                className={`flex items-start p-3 rounded-md border ${
                  task.completed 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-gray-200 hover:border-pulse-200 transition-colors'
                }`}
              >
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleCompleteTask(task.id)}
                  className="mt-1 mr-3"
                />
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center">
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`font-medium cursor-pointer ${
                        task.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {task.title}
                    </label>
                    {getPriorityBadge(task.priority)}
                  </div>
                  
                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  
                  {task.dueDate && (
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(task.dueDate), 'h:mm a')}
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-red-500" 
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        
        {/* Task summary */}
        {displayTasks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
            <span>
              {displayTasks.filter(t => t.completed).length} of {displayTasks.length} tasks completed
            </span>
            {displayTasks.some(t => t.priority === 'high' && !t.completed) && (
              <span className="flex items-center text-amber-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                High priority tasks pending
              </span>
            )}
          </div>
        )}
      </CardContent>
      <AddTaskDialog open={showAddTask} onOpenChange={setShowAddTask} />
    </Card>
  );
};

export default TaskList;
