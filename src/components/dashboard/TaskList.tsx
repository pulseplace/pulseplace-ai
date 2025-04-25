
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import AddTaskDialog from './AddTaskDialog';
import { useTasks } from '@/contexts/TaskContext';
import { format } from 'date-fns';
import { Task, TaskPriority } from '@/types/task.types';
import { useToast } from '@/hooks/use-toast';

const TaskPriorityColors: Record<TaskPriority, string> = {
  "High": "text-red-500",
  "Medium": "text-amber-500",
  "Low": "text-green-500"
};

const TaskList = () => {
  const { tasks, updateTask } = useTasks();
  const { toast } = useToast();
  
  // Sort tasks by status (not done first) then by priority (high first)
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by status - Not Done comes before Done
    if (a.status === 'Done' && b.status !== 'Done') {
      return 1;
    }
    if (a.status !== 'Done' && b.status === 'Done') {
      return -1;
    }
    
    // Then sort by priority (High > Medium > Low)
    if (a.priority === 'High' && b.priority !== 'High') {
      return -1;
    }
    if (a.priority === 'Medium' && b.priority === 'Low') {
      return -1;
    }
    if (a.priority === 'Low' && (b.priority === 'High' || b.priority === 'Medium')) {
      return 1;
    }
    
    // Finally sort by deadline if present
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    
    return 0;
  });
  
  // Only show the latest 3 tasks that aren't done
  const displayTasks = sortedTasks.filter(task => task.status !== 'Done').slice(0, 3);
  
  const toggleTaskStatus = (task: Task) => {
    const newStatus = task.status === 'Done' ? 'Not Started' : 'Done';
    updateTask(task.id, { status: newStatus });
    
    toast({
      title: `Task ${newStatus === 'Done' ? 'Completed' : 'Reopened'}`,
      description: task.name,
    });
  };
  
  const getPriorityIcon = (priority: TaskPriority) => {
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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Active Tasks</h3>
          <AddTaskDialog />
        </div>
        
        {displayTasks.length > 0 ? (
          <div className="space-y-4">
            {displayTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-start">
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className="mt-1 mr-3"
                  >
                    {task.status === 'Done' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                  </button>
                  
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{task.name}</span>
                      <Badge className="ml-2" variant={task.status === 'Stuck' ? 'destructive' : 'outline'}>
                        {task.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-1">
                      {task.notes && task.notes.length > 30 
                        ? `${task.notes.substring(0, 30)}...` 
                        : task.notes}
                    </div>
                    
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      {task.deadline && (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{format(new Date(task.deadline), 'MMM d, yyyy')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {getPriorityIcon(task.priority)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No active tasks. Click "Add New Task" to create one.</p>
          </div>
        )}
        
        {tasks.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="link" asChild>
              <a href="/task-tracker">View All Tasks</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
