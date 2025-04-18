
import React from 'react';
import { QATask } from './types';
import TaskRow from './TaskRow';

interface TaskListProps {
  tasks: QATask[];
  onUpdateTask: (taskId: string, newStatus: QATask['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted/50">
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Category</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Description</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Priority</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Status</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onUpdateTask={onUpdateTask}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
