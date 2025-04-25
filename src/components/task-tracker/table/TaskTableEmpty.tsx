
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

export function TaskTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8">
        No tasks found. Click "Add Task" to create one.
      </TableCell>
    </TableRow>
  );
}
