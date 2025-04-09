
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThumbsDown } from 'lucide-react';

export interface DownvotedResponse {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  downvotes: number;
}

interface DownvotedResponsesTableProps {
  responses: DownvotedResponse[];
  isLoading?: boolean;
}

const DownvotedResponsesTable: React.FC<DownvotedResponsesTableProps> = ({ 
  responses, 
  isLoading = false 
}) => {
  const mockResponses: DownvotedResponse[] = [
    {
      id: '1',
      userMessage: 'How do I implement a culture survey?',
      botResponse: 'That\'s a complex topic that requires consideration of multiple factors.',
      timestamp: '2023-04-02',
      downvotes: 12
    },
    {
      id: '2',
      userMessage: 'What\'s the difference between engagement and satisfaction?',
      botResponse: 'They are related concepts in employee experience measurement.',
      timestamp: '2023-04-05',
      downvotes: 8
    }
  ];

  const displayResponses = responses.length > 0 ? responses : mockResponses;
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableCaption>Most downvoted responses that may need improvement</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">User Query</TableHead>
            <TableHead className="w-[300px]">Bot Response</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Downvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">Loading responses...</TableCell>
            </TableRow>
          ) : displayResponses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">No downvoted responses found</TableCell>
            </TableRow>
          ) : (
            displayResponses.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="font-medium truncate max-w-[200px]" title={response.userMessage}>
                  {response.userMessage}
                </TableCell>
                <TableCell className="truncate max-w-[300px]" title={response.botResponse}>
                  {response.botResponse}
                </TableCell>
                <TableCell>{response.timestamp}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                    {response.downvotes}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DownvotedResponsesTable;
