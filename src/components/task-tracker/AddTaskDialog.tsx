
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTasks } from '@/contexts/TaskContext';

interface AddTaskDialogProps {
  children: React.ReactNode;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ children }) => {
  const { addTask } = useTasks();
  
  const handleAddSampleTask = () => {
    addTask({
      title: 'New Task',
      description: 'Task description goes here',
      status: 'todo',
      priority: 'medium',
      module: 'dashboard'
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task to track your work.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={handleAddSampleTask}>
            Add Sample Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
