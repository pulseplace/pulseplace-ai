import React, { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { useTaskManager } from '@/contexts/TaskContext';
import { Task } from '@/types/task.types';
import { TaskTableHeader } from './table/TaskTableHeader';
import { TaskTableRow } from './table/TaskTableRow';
import { TaskTableLoading } from './table/TaskTableLoading';
import { TaskTableEmpty } from './table/TaskTableEmpty';

interface TaskTableProps {
  showSprint?: boolean;
  onEditTask: (task: Task) => void;
}

export default function TaskTable({ showSprint = false, onEditTask }: TaskTableProps) {
  const { tasks, deleteTask, voteTask, updateTaskTime } = useTaskManager();
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'}>({
    key: 'priority',
    direction: 'desc'
  });

  const handleSort = (field: string) => {
    setSortConfig(prev => {
      if (prev.key === field) {
        return { key: field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: field, direction: 'asc' };
    });
  };

  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      const key = sortConfig.key as keyof Task;
      if (!a[key] || !b[key]) return 0;
      
      let comparison = 0;
      if (key === 'deadline') {
        comparison = new Date(a.deadline || '').getTime() - new Date(b.deadline || '').getTime();
      } else {
        comparison = String(a[key]).localeCompare(String(b[key]));
      }
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [tasks, sortConfig]);

  const handleTimeUpdate = (taskId: string) => {
    const timeSpent = prompt('Enter time spent in minutes:');
    if (timeSpent && !isNaN(Number(timeSpent))) {
      updateTaskTime(taskId, Number(timeSpent));
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TaskTableHeader 
          sortConfig={sortConfig}
          onSort={handleSort}
          showSprint={showSprint}
        />
        <TableBody>
          {!tasks ? (
            <TaskTableLoading />
          ) : tasks.length === 0 ? (
            <TaskTableEmpty />
          ) : (
            sortedTasks.map((task) => (
              <TaskTableRow
                key={task.id}
                task={task}
                showSprint={showSprint}
                onEdit={onEditTask}
                onDelete={deleteTask}
                onVote={voteTask}
                onTimeUpdate={handleTimeUpdate}
                onDuplicate={(task) => {
                  console.log('Duplicate task:', task);
                }}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
