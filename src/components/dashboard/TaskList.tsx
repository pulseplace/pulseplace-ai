import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTaskDialog from './AddTaskDialog';
import { useTasks } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle,
  ArrowUpRight,
  Calendar,
  BarChart
} from "lucide-react";
import { Task } from '@/types/task.types';

const TaskList = () => {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const { tasks } = useTasks();
  
  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'Not Started');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const inReviewTasks = tasks.filter(task => task.status === 'In Review');
  const completedTasks = tasks.filter(task => task.status === 'Completed');
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Not Started':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'In Progress':
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case 'In Review':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };
  
  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Low':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Low</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
      case 'High':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">High</Badge>;
      case 'Critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Render task item
  const renderTaskItem = (task: Task) => (
    <div key={task.id} className="p-3 border rounded-md mb-2 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium flex items-center gap-2">
            {getStatusIcon(task.status)}
            {task.title}
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {getPriorityBadge(task.priority)}
          <span className="text-xs text-gray-500">{task.module}</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          Sprint Tasks
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs flex items-center gap-1"
          >
            <BarChart className="h-3.5 w-3.5" />
            View Stats
          </Button>
          <Button 
            size="sm"
            onClick={() => setIsAddTaskDialogOpen(true)}
            className="text-xs flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="todo" className="text-xs">
              To Do ({todoTasks.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs">
              In Progress ({inProgressTasks.length})
            </TabsTrigger>
            <TabsTrigger value="in-review" className="text-xs">
              In Review ({inReviewTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="todo" className="mt-0">
            <div className="max-h-[300px] overflow-y-auto pr-2">
              {todoTasks.length > 0 ? (
                todoTasks.map(renderTaskItem)
              ) : (
                <p className="text-center text-gray-500 py-4">No tasks to do</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-0">
            <div className="max-h-[300px] overflow-y-auto pr-2">
              {inProgressTasks.length > 0 ? (
                inProgressTasks.map(renderTaskItem)
              ) : (
                <p className="text-center text-gray-500 py-4">No tasks in progress</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="in-review" className="mt-0">
            <div className="max-h-[300px] overflow-y-auto pr-2">
              {inReviewTasks.length > 0 ? (
                inReviewTasks.map(renderTaskItem)
              ) : (
                <p className="text-center text-gray-500 py-4">No tasks in review</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="max-h-[300px] overflow-y-auto pr-2">
              {completedTasks.length > 0 ? (
                completedTasks.map(renderTaskItem)
              ) : (
                <p className="text-center text-gray-500 py-4">No completed tasks</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <AddTaskDialog 
        isOpen={isAddTaskDialogOpen} 
        onClose={() => setIsAddTaskDialogOpen(false)} 
      />
    </Card>
  );
};

export default TaskList;
