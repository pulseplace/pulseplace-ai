
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsiveDataTable from './ResponsiveDataTable';

interface DownvotedResponse {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
}

interface DownvotedResponsesTableProps {
  responses: DownvotedResponse[];
  isLoading: boolean;
}

const DownvotedResponsesTable: React.FC<DownvotedResponsesTableProps> = ({ 
  responses, 
  isLoading 
}) => {
  const columns = [
    {
      key: 'userMessage',
      header: 'User Message',
      cell: (item: DownvotedResponse) => (
        <div className="max-w-sm truncate" title={item.userMessage}>
          {item.userMessage}
        </div>
      ),
      className: 'w-1/3'
    },
    {
      key: 'botResponse',
      header: 'Bot Response',
      cell: (item: DownvotedResponse) => (
        <div className="max-w-sm truncate" title={item.botResponse}>
          {item.botResponse}
        </div>
      ),
      className: 'w-1/3'
    },
    {
      key: 'timestamp',
      header: 'Date',
      cell: (item: DownvotedResponse) => new Date(item.timestamp).toLocaleString(),
      className: 'text-right'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Downvoted Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveDataTable
          data={responses}
          columns={columns}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          noDataMessage="No downvoted responses recorded yet"
        />
      </CardContent>
    </Card>
  );
};

export default DownvotedResponsesTable;
