
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DemoTask } from './types';

interface TaskListProps {
  tasks: DemoTask[];
  onToggleTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  // Group tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && !task.completed);
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium' && !task.completed);
  const completedTasksList = tasks.filter(task => task.completed);

  return (
    <div className="space-y-2">
      {/* High priority tasks */}
      {highPriorityTasks.length > 0 && (
        <ul className="space-y-2">
          {highPriorityTasks.map(task => (
            <li key={task.id} className="flex items-start gap-2 p-2 bg-red-50 rounded-md">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="mt-1"
              />
              <div>
                <label 
                  htmlFor={`task-${task.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {task.description}
                </label>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-white">
                    {task.category}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Medium priority tasks */}
      {mediumPriorityTasks.length > 0 && (
        <ul className="space-y-2">
          {mediumPriorityTasks.map(task => (
            <li key={task.id} className="flex items-start gap-2 p-2 bg-amber-50 rounded-md">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="mt-1"
              />
              <div>
                <label 
                  htmlFor={`task-${task.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {task.description}
                </label>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-white">
                    {task.category}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Completed tasks */}
      {completedTasksList.length > 0 && (
        <details>
          <summary className="text-sm font-medium cursor-pointer">
            Completed Tasks ({completedTasksList.length})
          </summary>
          <ul className="space-y-2 mt-2">
            {completedTasksList.map(task => (
              <li key={task.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-md opacity-70">
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="mt-1"
                />
                <div>
                  <label 
                    htmlFor={`task-${task.id}`}
                    className="text-sm line-through cursor-pointer"
                  >
                    {task.description}
                  </label>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-white">
                      {task.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white ml-1">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};

export default TaskList;
