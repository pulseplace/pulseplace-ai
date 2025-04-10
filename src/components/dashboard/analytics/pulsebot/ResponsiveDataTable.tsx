
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

interface ResponsiveDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  keyExtractor: (item: T) => string | number;
  noDataMessage?: string;
}

function ResponsiveDataTable<T>({
  data,
  columns,
  isLoading = false,
  keyExtractor,
  noDataMessage = "No data available"
}: ResponsiveDataTableProps<T>) {
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {noDataMessage}
      </div>
    );
  }
  
  // For mobile screens, we'll show a card-like layout
  const renderMobileView = () => (
    <div className="space-y-4 md:hidden">
      {data.map(item => (
        <div key={keyExtractor(item)} className="border rounded-md p-4 space-y-2 bg-white">
          {columns.map(column => (
            <div key={column.key} className="flex justify-between items-start">
              <span className="font-medium text-sm text-gray-500">{column.header}:</span>
              <span className={`text-right ${column.className || ''}`}>{column.cell(item)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
  // For desktop screens, we'll show a regular table
  const renderDesktopView = () => (
    <div className="hidden md:block overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={keyExtractor(item)}>
              {columns.map(column => (
                <TableCell key={column.key} className={column.className}>
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  
  return (
    <>
      {renderMobileView()}
      {renderDesktopView()}
    </>
  );
}

export default ResponsiveDataTable;
