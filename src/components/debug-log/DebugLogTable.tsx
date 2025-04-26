
import React, { useState } from 'react';
import { useDebugLogs } from '@/contexts/TaskContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DebugLog, DebugLogStatus } from '@/types/task.types';

const statusColors = {
  'Open': 'bg-red-100 text-red-800 border-red-300',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
  'Fixed': 'bg-green-100 text-green-800 border-green-300',
  'Won\'t Fix': 'bg-gray-100 text-gray-800 border-gray-300'
};

const severityVariant = {
  'critical': 'destructive',
  'high': 'destructive',
  'medium': 'secondary',
  'low': 'outline'
};

const DebugLogTable = () => {
  const { debugLogs, updateDebugLog } = useDebugLogs();
  const [filter, setFilter] = useState<string | null>(null);
  
  // Helper function to handle status change
  const handleStatusChange = (log: DebugLog, newStatus: DebugLogStatus) => {
    updateDebugLog({
      ...log,
      status: newStatus,
      dateFixed: newStatus === 'Fixed' ? new Date().toISOString() : log.dateFixed
    });
  };
  
  const filteredLogs = filter 
    ? debugLogs.filter(log => log.status === filter || log.severity === filter)
    : debugLogs;
    
  return (
    <div className="rounded-md border">
      <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilter(null)}
          className={filter === null ? 'bg-gray-200' : ''}
        >
          All
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilter('Open')}
          className={filter === 'Open' ? 'bg-gray-200' : ''}
        >
          Open
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilter('In Progress')}
          className={filter === 'In Progress' ? 'bg-gray-200' : ''}
        >
          In Progress
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilter('Fixed')}
          className={filter === 'Fixed' ? 'bg-gray-200' : ''}
        >
          Fixed
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilter('critical')}
          className={filter === 'critical' ? 'bg-gray-200' : ''}
        >
          Critical
        </Button>
      </div>
      
      <Table>
        <TableCaption>Debug log entries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Component</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.component}</TableCell>
                <TableCell>
                  <Badge variant={severityVariant[log.severity] as any}>
                    {log.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[log.status]}`}>
                    {log.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(log.dateLogged).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {log.status === 'Open' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleStatusChange(log, 'In Progress')}
                    >
                      Start
                    </Button>
                  )}
                  {log.status === 'In Progress' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleStatusChange(log, 'Fixed')}
                    >
                      Mark Fixed
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No debug logs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DebugLogTable;
