import React, { useState } from 'react';
import { useTaskManager } from '@/contexts/task';
import { Task } from '@/types/task.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Table as TableIcon, Kanban, Calendar } from 'lucide-react';
import TaskTable from '@/components/task-tracker/TaskTable';
import TaskForm from '@/components/task-tracker/TaskForm';
import TaskKanban from '@/components/task-tracker/TaskKanban';
import TaskCalendar from '@/components/task-tracker/TaskCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function TaskTracker() {
  const { tasks, addTask, updateTask } = useTaskManager();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'calendar'>('table');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setCurrentTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (currentTask) {
      updateTask(currentTask.id, data);
      toast({
        title: "Task updated",
        description: "The task has been updated successfully."
      });
    } else {
      addTask(data);
      toast({
        title: "Task added",
        description: "A new task has been added successfully."
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">PulsePlace Task Tracker</h1>
          <p className="text-gray-500 mt-1">Manage and track all project tasks in one place</p>
        </div>
        <Button onClick={handleAddTask} className="mt-4 md:mt-0 bg-pulse-gradient">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Current Sprint: April 22–26</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-gray-500">
                Total Tasks: <span className="font-semibold">{tasks.length}</span>
              </div>
              <div className="text-gray-500">
                Completed: <span className="font-semibold">{tasks.filter(t => t.status === 'Done').length}</span>
              </div>
            </div>
            <Tabs 
              defaultValue="table" 
              className="w-[400px]"
              onValueChange={(value) => setViewMode(value as any)}
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="table" className="flex items-center">
                  <TableIcon className="h-4 w-4 mr-2" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center">
                  <Kanban className="h-4 w-4 mr-2" />
                  Kanban
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'table' && <TaskTable onEditTask={handleEditTask} />}
      {viewMode === 'kanban' && <TaskKanban onEditTask={handleEditTask} />}
      {viewMode === 'calendar' && <TaskCalendar onEditTask={handleEditTask} />}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <TaskForm 
            task={currentTask} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
