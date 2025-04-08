
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

interface DownvotedResponsesTableProps {
  responses: {
    response: string;
    downvotes: number;
  }[];
  isLoading: boolean;
}

const DownvotedResponsesTable: React.FC<DownvotedResponsesTableProps> = ({ 
  responses, 
  isLoading 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Downvoted Responses</CardTitle>
        <CardDescription>Bot responses with the most negative feedback</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-80 w-full" />
        ) : responses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Response</TableHead>
                <TableHead className="w-[100px] text-right">Downvotes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.response.length > 100 
                      ? `${item.response.substring(0, 100)}...` 
                      : item.response}
                  </TableCell>
                  <TableCell className="text-right">{item.downvotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No downvoted responses found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DownvotedResponsesTable;
