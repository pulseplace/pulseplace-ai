
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

interface DataColumn<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

interface ResponsiveDataTableProps<T> {
  data: T[];
  columns: DataColumn<T>[];
  isLoading?: boolean;
  skeletonRows?: number;
  noDataMessage?: string;
  keyExtractor: (item: T) => string | number;
}

function ResponsiveDataTable<T>({
  data,
  columns,
  isLoading = false,
  skeletonRows = 5,
  noDataMessage = "No data available",
  keyExtractor
}: ResponsiveDataTableProps<T>) {
  return (
    <div className="overflow-auto rounded-md border">
      {/* Regular Table for larger screens */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.key} 
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(skeletonRows).fill(0).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {columns.map((column) => (
                    <TableCell key={`skeleton-${idx}-${column.key}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((item) => (
                <TableRow key={keyExtractor(item)}>
                  {columns.map((column) => (
                    <TableCell 
                      key={`${keyExtractor(item)}-${column.key}`}
                      className={column.className}
                    >
                      {column.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Card-style layout for mobile screens */}
      <div className="sm:hidden">
        {isLoading ? (
          Array(skeletonRows).fill(0).map((_, idx) => (
            <div key={`mobile-skeleton-${idx}`} className="p-4 border-b last:border-b-0 space-y-2">
              {columns.map((column) => (
                <div key={`mobile-skeleton-${idx}-${column.key}`} className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{column.header}</span>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={`mobile-${keyExtractor(item)}`} className="p-4 border-b last:border-b-0 space-y-2">
              {columns.map((column) => (
                <div key={`mobile-${keyExtractor(item)}-${column.key}`} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">{column.header}</span>
                  <div className="text-sm text-right">{column.cell(item)}</div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            {noDataMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsiveDataTable;
