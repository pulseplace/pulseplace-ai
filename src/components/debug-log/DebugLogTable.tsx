
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebugLogs } from '@/contexts/TaskContext';
import { format } from "date-fns";
import { ExternalLink, Check, AlertCircle } from 'lucide-react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { DebugLog, DebugLogSeverity, DebugLogStatus } from '@/types/task.types';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper functions for styling
const getSeverityBadgeVariant = (severity: DebugLogSeverity) => {
  switch (severity) {
    case 'Critical': return 'destructive';
    case 'Major': return 'default';
    case 'Minor': return 'secondary';
    default: return 'outline';
  }
};

const getStatusBadgeVariant = (status: DebugLogStatus) => {
  switch (status) {
    case 'Fixed': return 'success';
    case 'In Progress': return 'warning';
    case 'Open': return 'default';
    default: return 'outline';
  }
};

function StatusBadge({ status }: { status: DebugLogStatus }) {
  const variants = {
    'Fixed': { variant: 'outline', className: 'border-green-200 bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700' },
    'In Progress': { variant: 'outline', className: 'border-yellow-200 bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700' },
    'Open': { variant: 'outline', className: 'border-red-200 bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700' },
  } as const;

  const { variant, className } = variants[status] || { variant: 'outline', className: '' };
  
  return (
    <Badge variant="outline" className={className}>
      {status === 'Fixed' && <Check className="h-3 w-3 mr-1" />}
      {status === 'In Progress' && <Pencil2Icon className="h-3 w-3 mr-1" />}
      {status === 'Open' && <AlertCircle className="h-3 w-3 mr-1" />}
      {status}
    </Badge>
  );
}

const DebugLogTable = () => {
  const { debugLogs, updateDebugLog } = useDebugLogs();
  const [filteredLogs, setFilteredLogs] = useState<DebugLog[]>(debugLogs);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  useEffect(() => {
    let logs = [...debugLogs];

    // Apply status filter
    if (statusFilter !== "all") {
      logs = logs.filter(log => log.status === statusFilter);
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      logs = logs.filter(log => log.severity === severityFilter);
    }

    // Sort by date (most recent first)
    logs.sort((a, b) => {
      return new Date(b.dateLogged).getTime() - new Date(a.dateLogged).getTime();
    });

    setFilteredLogs(logs);
  }, [debugLogs, statusFilter, severityFilter]);

  const handleStatusChange = (logId: string, newStatus: DebugLogStatus) => {
    updateDebugLog(logId, { status: newStatus });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Debug Logs</h2>
          <p className="text-gray-500 text-sm">
            Track and manage issues across the application
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Fixed">Fixed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="Major">Major</SelectItem>
              <SelectItem value="Minor">Minor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[150px]">Component</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Severity</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px]">By</TableHead>
              <TableHead className="w-[80px]">Fix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {format(new Date(log.dateLogged), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{log.component}</TableCell>
                  <TableCell className="font-medium">{log.description}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(log.severity)}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={log.status} 
                      onValueChange={(value) => handleStatusChange(log.id, value as DebugLogStatus)}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <StatusBadge status={log.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm">{log.loggedBy}</TableCell>
                  <TableCell>
                    {log.fixLink && (
                      <a 
                        href={log.fixLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700"
                      >
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No logs found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DebugLogTable;
