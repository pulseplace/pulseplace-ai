
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/contexts/TaskContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Task } from '@/types/task.types';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS
  }
});

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: Task;
}

const TaskCalendar = () => {
  const { tasks } = useTasks();
  
  // Convert tasks to calendar events
  const events: CalendarEvent[] = tasks
    .filter(task => task.deadline) // Only include tasks with deadlines
    .map(task => {
      const deadline = new Date(task.deadline!);
      
      return {
        id: task.id,
        title: task.name,
        start: deadline,
        end: deadline,
        allDay: true,
        resource: task
      };
    });
    
  const eventStyleGetter = (event: CalendarEvent) => {
    const task = event.resource;
    let backgroundColor = '#3B82F6'; // Default blue
    
    // Color based on priority
    if (task.priority === 'High') {
      backgroundColor = '#EF4444'; // Red for high priority
    } else if (task.priority === 'Medium') {
      backgroundColor = '#F59E0B'; // Amber for medium priority
    } else if (task.priority === 'Low') {
      backgroundColor = '#10B981'; // Green for low priority
    }
    
    // Fade color if task is completed
    const opacity = task.status === 'Done' ? 0.5 : 1;
    
    return {
      style: {
        backgroundColor,
        opacity,
        borderRadius: '4px',
        border: '0',
        display: 'block',
        color: 'white'
      }
    };
  };
  
  const eventPropGetter = (event: CalendarEvent) => {
    return eventStyleGetter(event);
  };
  
  const formats = {
    eventTimeRangeFormat: () => '', // Hide time range in event
    dayFormat: 'dd'
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>Task Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventPropGetter as any}
            // @ts-ignore - Type mismatch in library definition
            formats={formats}
            views={['month']}
            defaultView='month'
            popup
            selectable
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCalendar;
