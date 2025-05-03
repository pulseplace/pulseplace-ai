import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  DebugLog, 
  DebugLogSeverity, 
  DebugLogStatus 
} from '@/types/task.types';
import { useTaskManager } from '@/contexts/task';

const getSeverityColor = (severity: DebugLogSeverity) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Major':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Minor':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: DebugLogStatus) => {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Fixed':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

interface DebugLogTableProps {
  showCriticalOnly?: boolean;
  showRecentlyClosed?: boolean;
  daysForRecent?: number;
  onEditLog: (log: DebugLog) => void;
}

export default function DebugLogTable({ 
  showCriticalOnly = false, 
  showRecentlyClosed = false,
  daysForRecent = 7,
  onEditLog 
}: DebugLogTableProps) {
  const { debugLogs, deleteDebugLog, getCriticalOpenLogs, getRecentlyFixedLogs } = useTaskManager();
  const [sortField, setSortField] = useState<keyof DebugLog>('dateLogged');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter logs based on props
  let filteredLogs = debugLogs;
  if (showCriticalOnly) {
    filteredLogs = getCriticalOpenLogs();
  } else if (showRecentlyClosed) {
    filteredLogs = getRecentlyFixedLogs(daysForRecent);
  }

  const handleSort = (field: keyof DebugLog) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    // Handle date sorting special case
    if (sortField === 'dateLogged') {
      const dateA = new Date(a.dateLogged).getTime();
      const dateB = new Date(b.dateLogged).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    // Generic string/date sort
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('dateLogged')}
            >
              Date Logged
              {sortField === 'dateLogged' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('component')}
            >
              Component/Module
              {sortField === 'component' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead>
              Error Description
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('severity')}
            >
              Severity
              {sortField === 'severity' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
              {sortField === 'status' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead>
              Fix Link
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('loggedBy')}
            >
              Logged By
              {sortField === 'loggedBy' && (
                <ChevronDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {format(new Date(log.dateLogged), 'MMM d, yyyy h:mm a')}
              </TableCell>
              <TableCell>{log.component}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {log.description}
              </TableCell>
              <TableCell>
                <Badge className={`${getSeverityColor(log.severity)} border`}>
                  {log.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(log.status)} border`}>
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell>
                {log.fixLink ? (
                  <a 
                    href={log.fixLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    Link <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>{log.loggedBy}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditLog(log)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteDebugLog(log.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
