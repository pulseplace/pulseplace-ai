
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';

interface QueriesTableProps {
  queries: {
    query: string;
    count: number;
  }[];
  isLoading: boolean;
}

const QueriesTable: React.FC<QueriesTableProps> = ({ 
  queries, 
  isLoading 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common User Queries</CardTitle>
        <CardDescription>Top 10 most frequently asked questions</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-80 w-full" />
        ) : queries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead className="w-[100px] text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queries.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.query.length > 100 
                      ? `${item.query.substring(0, 100)}...` 
                      : item.query}
                  </TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No queries found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QueriesTable;
