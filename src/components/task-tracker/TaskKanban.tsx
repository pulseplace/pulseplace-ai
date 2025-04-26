
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '@/contexts/TasksContext';
import { TaskStatus, Task } from '@/types/task.types';

const TaskKanban: React.FC = () => {
  const { tasks, moveTask } = useTasks();

  const columns: TaskStatus[] = ['todo', 'in_progress', 'review', 'completed', 'blocked'];
  
  const columnHeaders: Record<TaskStatus, string> = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'review': 'In Review',
    'completed': 'Completed',
    'blocked': 'Blocked'
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, columnStatus);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-6">
      {columns.map(column => (
        <div 
          key={column} 
          className="min-w-[300px] bg-gray-50 rounded-md"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
        >
          <div className="p-4 border-b bg-gray-100 rounded-t-md">
            <h3 className="font-medium">{columnHeaders[column]}</h3>
          </div>
          <div className="p-2 min-h-[200px]">
            {tasks
              .filter(task => task.status === column)
              .map(task => (
                <Card 
                  key={task.id} 
                  className="mb-2 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 my-1">{task.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      {getPriorityBadge(task.priority)}
                      <span className="text-xs text-gray-500">{task.owner || 'Unassigned'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {tasks.filter(task => task.status === column).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No tasks
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskKanban;
