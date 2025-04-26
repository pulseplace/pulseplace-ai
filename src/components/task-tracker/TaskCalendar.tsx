
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useTasks } from '@/contexts/TasksContext';
import { Task } from '@/types/task.types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TaskCalendar: React.FC = () => {
  const { tasks } = useTasks();
  const [selectedEvent, setSelectedEvent] = useState<Task | null>(null);

  const events = tasks.map(task => ({
    ...task,
    title: task.title,
    start: task.dueDate ? new Date(task.dueDate) : new Date(),
    end: task.dueDate ? new Date(task.dueDate) : new Date(),
    allDay: true,
  }));

  const handleSelectEvent = (event: any) => {
    const task = tasks.find(t => t.id === event.id);
    if (task) {
      setSelectedEvent(task);
    }
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6'; // Default blue

    switch (event.priority) {
      case 'critical':
        backgroundColor = '#ef4444'; // red
        break;
      case 'high':
        backgroundColor = '#f97316'; // orange
        break;
      case 'medium':
        backgroundColor = '#3b82f6'; // blue
        break;
      case 'low':
        backgroundColor = '#10b981'; // green
        break;
      default:
        backgroundColor = '#3b82f6';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block',
        padding: '2px 8px',
      }
    };
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
      />
      
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
            <div className="mb-4">
              <span className="font-semibold">Priority:</span> {selectedEvent.priority}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Status:</span> {selectedEvent.status}
            </div>
            {selectedEvent.dueDate && (
              <div className="mb-4">
                <span className="font-semibold">Due Date:</span> {format(new Date(selectedEvent.dueDate), 'PPP')}
              </div>
            )}
            {selectedEvent.owner && (
              <div className="mb-4">
                <span className="font-semibold">Owner:</span> {selectedEvent.owner}
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleCloseDetails}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
