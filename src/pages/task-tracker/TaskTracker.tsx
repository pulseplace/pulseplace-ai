
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/contexts/TaskContext';
import TaskTable from '@/components/task-tracker/TaskTable';
import TaskKanban from '@/components/task-tracker/TaskKanban';
import TaskCalendar from '@/components/task-tracker/TaskCalendar';
import AddTaskDialog from '@/components/dashboard/AddTaskDialog';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';
import { TaskStatus, Task } from '@/types/task.types';

// TaskStats component to show statistics
const TaskStats = () => {
  const { tasks } = useTasks();
  
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status).length;
  };
  
  const getHighPriorityCount = () => {
    return tasks.filter(task => task.priority === 'High').length;
  };
  
  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.deadline) return false;
      if (task.status === 'Done') return false;
      
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      
      return deadline < today;
    }).length;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasks.length}</div>
          <p className="text-xs text-gray-500">Total number of tasks</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTasksByStatus('In Progress')}</div>
          <p className="text-xs text-gray-500">Tasks currently in progress</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getHighPriorityCount()}</div>
          <p className="text-xs text-gray-500">Tasks needing immediate attention</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getOverdueTasks()}</div>
          <p className="text-xs text-gray-500">Tasks past their deadline</p>
        </CardContent>
      </Card>
    </div>
  );
};

const TaskTracker = () => {
  const [view, setView] = useState('table');
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Task Tracker</h1>
          <p className="text-gray-600">
            Manage tasks, track progress, and stay organized
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <AddTaskDialog>
            <Button className="bg-pulse-gradient hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </AddTaskDialog>
        </div>
      </div>
      
      <TaskStats />
      
      <div className="mb-6">
        <Tabs defaultValue={view} onValueChange={setView} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="table">List</TabsTrigger>
              <TabsTrigger value="kanban">Board</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="table" className="mt-0">
            <TaskTable showSprint={true} />
          </TabsContent>
          
          <TabsContent value="kanban" className="mt-0">
            <TaskKanban />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <TaskCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskTracker;
