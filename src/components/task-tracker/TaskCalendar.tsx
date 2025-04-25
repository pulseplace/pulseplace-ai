
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useTasks } from '@/contexts/TaskContext';
import { Task } from '@/types/task.types';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: Task;
  status: string;
  priority: string;
}

const TaskCalendar = () => {
  const { tasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Format tasks for calendar
  const calendarEvents: CalendarEvent[] = tasks.map(task => ({
    id: task.id,
    title: task.name,
    start: task.deadline ? new Date(task.deadline) : new Date(),
    end: task.deadline ? new Date(task.deadline) : new Date(),
    allDay: true,
    resource: task,
    status: task.status,
    priority: task.priority
  }));
  
  // Event styling based on priority and status
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3490dc'; // Default blue
    
    // Color based on priority
    if (event.priority === 'High') {
      backgroundColor = '#e53e3e'; // Red for high priority
    } else if (event.priority === 'Medium') {
      backgroundColor = '#ed8936'; // Orange for medium priority
    } else if (event.priority === 'Low') {
      backgroundColor = '#38a169'; // Green for low priority
    }
    
    // If the task is done, make it slightly transparent
    const opacity = event.status === 'Done' ? 0.6 : 1;
    
    return {
      style: {
        backgroundColor,
        opacity,
        borderRadius: '4px',
        border: 'none',
        color: 'white',
      }
    };
  };
  
  // Handle event select
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedTask(event.resource);
  };
  
  return (
    <Card className="p-4 h-[600px] flex flex-col">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
      />
    </Card>
  );
};

export default TaskCalendar;
