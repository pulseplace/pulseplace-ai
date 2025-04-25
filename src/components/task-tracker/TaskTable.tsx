
import React, { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { useTasks } from '@/contexts/TaskContext';
import { Task } from '@/types/task.types';
import { TaskTableHeader } from './table/TaskTableHeader';
import { TaskTableRow } from './table/TaskTableRow';
import { TaskTableEmpty } from './table/TaskTableEmpty';
import { TaskTableLoading } from './table/TaskTableLoading';

interface TaskTableProps {
  showSprint?: boolean;
}

const TaskTable = ({ showSprint = false }: TaskTableProps) => {
  const { tasks } = useTasks();
  const [sortConfig, setSortConfig] = useState({
    key: 'deadline',
    direction: 'asc' as 'asc' | 'desc'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (field: string) => {
    setSortConfig(prevConfig => ({
      key: field,
      direction: prevConfig.key === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    if (sortConfig.key === 'module') {
      return sortConfig.direction === 'asc' 
        ? a.module.localeCompare(b.module)
        : b.module.localeCompare(a.module);
    }
    
    if (sortConfig.key === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const priorityA = priorityOrder[a.priority] || 0;
      const priorityB = priorityOrder[b.priority] || 0;
      
      return sortConfig.direction === 'asc'
        ? priorityA - priorityB
        : priorityB - priorityA;
    }
    
    if (sortConfig.key === 'status') {
      return sortConfig.direction === 'asc' 
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    
    if (sortConfig.key === 'owner') {
      return sortConfig.direction === 'asc' 
        ? a.owner.localeCompare(b.owner)
        : b.owner.localeCompare(a.owner);
    }
    
    if (sortConfig.key === 'deadline') {
      // Handle null deadlines
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return sortConfig.direction === 'asc' ? 1 : -1;
      if (!b.deadline) return sortConfig.direction === 'asc' ? -1 : 1;
      
      // Compare dates
      const dateA = new Date(a.deadline).getTime();
      const dateB = new Date(b.deadline).getTime();
      return sortConfig.direction === 'asc' 
        ? dateA - dateB
        : dateB - dateA;
    }
    
    if (sortConfig.key === 'sprint' && a.sprint && b.sprint) {
      return sortConfig.direction === 'asc' 
        ? a.sprint.localeCompare(b.sprint)
        : b.sprint.localeCompare(a.sprint);
    }
    
    return 0;
  });

  if (isLoading) {
    return <TaskTableLoading columns={showSprint ? 8 : 7} />;
  }

  if (tasks.length === 0) {
    return <TaskTableEmpty />;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TaskTableHeader 
          sortConfig={sortConfig} 
          onSort={handleSort} 
          showSprint={showSprint} 
        />
        <TableBody>
          {sortedTasks.map(task => (
            <TaskTableRow 
              key={task.id} 
              task={task} 
              showSprint={showSprint} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
