
import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TaskCalendar = () => {
  const { tasks } = useTask();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Format date to YYYY-MM-DD
  const formatDateForComparison = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Get tasks for a specific date
  const getTasksForDate = (dateStr: string) => {
    return tasks.filter(task => task.dueDate === dateStr);
  };
  
  // Get all dates that have tasks
  const getDatesWithTasks = () => {
    const dates: { [key: string]: number } = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        dates[task.dueDate] = (dates[task.dueDate] || 0) + 1;
      }
    });
    return dates;
  };
  
  const datesWithTasks = getDatesWithTasks();
  
  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      const formattedDate = formatDateForComparison(date);
      setSelectedDate(formattedDate);
    }
  };
  
  // Style tasks based on status and priority
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-200 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-4 border-red-600';
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-amber-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };
  
  // Custom day render to show task indicators
  const renderDay = (day: Date) => {
    const dateStr = formatDateForComparison(day);
    const taskCount = datesWithTasks[dateStr] || 0;
    
    return (
      <div className="relative">
        {day.getDate()}
        {taskCount > 0 && (
          <div className="absolute -top-1 -right-1">
            <Badge variant="secondary" className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">
              {taskCount}
            </Badge>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 lg:w-2/5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border w-full"
          components={{
            Day: ({ date, ...props }) => (
              <Button {...props} variant="ghost" className="h-9 w-9">
                {renderDay(date)}
              </Button>
            ),
          }}
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium mb-4">
          {selectedDate ? (
            <>Tasks due on {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
          ) : (
            <>Select a date to view tasks</>
          )}
        </h3>
        
        {selectedDate && (
          <div className="space-y-3">
            {getTasksForDate(selectedDate).length > 0 ? (
              getTasksForDate(selectedDate).map(task => (
                <Card key={task.id} className={`${getPriorityBorder(task.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                    )}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Module: {task.module}</span>
                      {task.owner && <span>Owner: {task.owner}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No tasks due on this date</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
