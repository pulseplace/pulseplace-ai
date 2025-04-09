
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

interface ResponsiveDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  keyExtractor: (item: T) => string;
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
      <div className="w-full overflow-hidden">
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full border rounded-md p-6 text-center text-gray-500">
        {noDataMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={keyExtractor(item)}>
              {columns.map((column) => (
                <TableCell key={`${keyExtractor(item)}-${column.key}`} className={column.className}>
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ResponsiveDataTable;
