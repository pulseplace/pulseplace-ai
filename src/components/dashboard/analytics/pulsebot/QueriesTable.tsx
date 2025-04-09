
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsiveDataTable from './ResponsiveDataTable';

interface Query {
  query: string;
  count: number;
}

interface QueriesTableProps {
  queries: Query[];
  isLoading: boolean;
}

const QueriesTable: React.FC<QueriesTableProps> = ({ queries, isLoading }) => {
  const columns = [
    {
      key: 'query',
      header: 'User Query',
      cell: (item: Query) => item.query,
      className: 'w-3/4'
    },
    {
      key: 'count',
      header: 'Count',
      cell: (item: Query) => item.count,
      className: 'text-right'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top User Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveDataTable
          data={queries}
          columns={columns}
          isLoading={isLoading}
          keyExtractor={(item) => item.query}
          noDataMessage="No queries recorded yet"
        />
      </CardContent>
    </Card>
  );
};

export default QueriesTable;
