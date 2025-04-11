
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TaskProgressIndicator from './TaskProgressIndicator';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  progress: number;
}

interface TaskProgressListProps {
  tasks: Task[];
  title?: string;
}

export const TaskProgressList: React.FC<TaskProgressListProps> = ({ tasks, title = "Tasks" }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-500 py-4">No tasks available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskProgressIndicator
              key={task.id}
              title={task.title}
              description={task.description || ''}
              status={task.status}
              progress={task.progress}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
