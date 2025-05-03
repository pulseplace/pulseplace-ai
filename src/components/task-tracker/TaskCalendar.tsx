import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay } from 'date-fns';
import { useTaskManager } from '@/contexts/task';
import { Task } from '@/types/task.types';

interface TaskCalendarProps {
  onEditTask: (task: Task) => void;
}

export default function TaskCalendar({ onEditTask }: TaskCalendarProps) {
  const { tasks } = useTaskManager();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get tasks due on the selected date
  const tasksOnSelectedDate = selectedDate ? 
    tasks.filter(task => task.deadline && isSameDay(new Date(task.deadline), selectedDate)) : 
    [];

  // Generate a mapping of dates to task counts for the calendar
  const tasksByDate = tasks.reduce<Record<string, number>>((acc, task) => {
    if (task.deadline) {
      const dateKey = format(new Date(task.deadline), 'yyyy-MM-dd');
      acc[dateKey] = (acc[dateKey] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
              modifiers={{
                hasTasks: (date) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  return !!tasksByDate[dateKey];
                }
              }}
              modifiersStyles={{
                hasTasks: {
                  fontWeight: 'bold',
                  backgroundColor: '#f3f4f6',
                  color: 'black'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">
              {selectedDate ? (
                <span>Tasks due on {format(selectedDate, 'MMM d, yyyy')}</span>
              ) : (
                <span>No date selected</span>
              )}
            </h3>
            
            {tasksOnSelectedDate.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No tasks due on this date
              </div>
            ) : (
              <div className="space-y-3">
                {tasksOnSelectedDate.map(task => (
                  <Card 
                    key={task.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onEditTask(task)}
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <div className="text-sm text-gray-500">
                          {task.module} • {task.owner}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper functions for styling
function getPriorityColor(priority: string) {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Not Started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Stuck':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Done':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}
