
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskTableLoadingProps {
  columns: number;
  rows?: number;
}

export const TaskTableLoading = ({ columns, rows = 5 }: TaskTableLoadingProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-6 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
