
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDebugLogs } from '@/contexts/DebugLogsContext';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const DebugLogTable = () => {
  const { debugLogs, updateDebugLog } = useDebugLogs();

  const handleStatusChange = (id: string, newStatus: string) => {
    updateDebugLog(id, { status: newStatus });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'Major':
        return <Badge variant="warning">Major</Badge>;
      case 'Minor':
        return <Badge variant="default">Minor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="destructive" className="bg-red-500">Open</Badge>;
      case 'In Progress':
        return <Badge variant="warning" className="bg-amber-500">In Progress</Badge>;
      case 'Fixed':
        return <Badge variant="success" className="bg-green-500">Fixed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Component</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debugLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.component}</TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{getSeverityBadge(log.severity)}</TableCell>
              <TableCell>{getStatusBadge(log.status)}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(log.dateLogged), { addSuffix: true })}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {log.status === 'Open' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(log.id, 'In Progress')}
                    >
                      Start Working
                    </Button>
                  )}
                  {log.status === 'In Progress' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleStatusChange(log.id, 'Fixed')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Fixed
                    </Button>
                  )}
                  {log.fixLink && (
                    <a 
                      href={log.fixLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Fix
                    </a>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {debugLogs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mb-2" />
                  <p>No debug logs found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DebugLogTable;
