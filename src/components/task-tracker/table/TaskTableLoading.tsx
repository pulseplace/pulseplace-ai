
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { RefreshCw } from 'lucide-react';

export function TaskTableLoading() {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8">
        <div className="flex justify-center items-center">
          <RefreshCw className="h-5 w-5 animate-spin mr-2" />
          <span>Loading tasks...</span>
        </div>
      </TableCell>
    </TableRow>
  );
}
