
import React from 'react';
import { useDebugLogs } from '@/contexts/DebugLogsContext';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, AlertTriangle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export const DebugLogTable = () => {
  const { logs } = useDebugLogs();
  
  const getLevelIcon = (level: 'info' | 'warning' | 'error') => {
    switch (level) {
      case 'info':
        return <InfoIcon className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };
  
  const getLevelBadge = (level: 'info' | 'warning' | 'error') => {
    switch (level) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">{level}</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">{level}</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">{level}</Badge>;
    }
  };
  
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No logs to display
      </div>
    );
  }
  
  return (
    <Table>
      <TableCaption>Debug logs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Timestamp</TableHead>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map(log => (
          <TableRow key={log.id}>
            <TableCell className="font-mono text-sm">
              {format(log.timestamp, 'yyyy-MM-dd HH:mm:ss')}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getLevelIcon(log.level)}
                {getLevelBadge(log.level)}
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>{log.message}</p>
                {log.details && (
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{log.details}</p>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
