
import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaskCalendar = () => {
  const { tasks } = useTasks();
  
  return (
    <Card className="p-4">
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Calendar View</h3>
        <p className="text-gray-500">
          Calendar view is coming soon. This will display tasks by due date in a monthly calendar format.
        </p>
      </div>
    </Card>
  );
};

export default TaskCalendar;
