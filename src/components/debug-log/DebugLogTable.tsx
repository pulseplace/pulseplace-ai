
import React from 'react';
import { useDebugLogs } from '@/contexts/TaskContext';
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
import { Edit, CheckCircle, ExternalLink } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DebugLogTable = () => {
  const { debugLogs, updateDebugLog } = useDebugLogs();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Fixed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleMarkAsFixed = (id: string) => {
    updateDebugLog(id, { 
      status: 'Fixed',
      dateFixed: new Date().toISOString().split('T')[0]
    });
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Component</TableHead>
            <TableHead>Logged By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debugLogs.length > 0 ? (
            debugLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto text-left font-medium">
                        {log.description}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{log.description}</DialogTitle>
                        <DialogDescription>
                          Component: {log.component}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between">
                          <div>
                            <span className="text-sm font-semibold">Status:</span>
                            <Badge className={`ml-2 ${getStatusColor(log.status)}`}>
                              {log.status}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm font-semibold">Severity:</span>
                            <Badge className={`ml-2 ${getSeverityColor(log.severity)}`}>
                              {log.severity}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Notes:</h4>
                          <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                            {log.notes || 'No notes provided'}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold">Logged by:</p>
                            <p className="text-sm">{log.loggedBy}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Assigned to:</p>
                            <p className="text-sm">{log.assignedTo || 'Unassigned'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Date logged:</p>
                            <p className="text-sm">{new Date(log.dateLogged).toLocaleDateString()}</p>
                          </div>
                          {log.dateFixed && (
                            <div>
                              <p className="text-sm font-semibold">Date fixed:</p>
                              <p className="text-sm">{new Date(log.dateFixed).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                        
                        {log.fixLink && (
                          <div>
                            <a 
                              href={log.fixLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center"
                            >
                              View fix details
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(log.status)}>
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getSeverityColor(log.severity)}>
                    {log.severity}
                  </Badge>
                </TableCell>
                <TableCell>{log.component}</TableCell>
                <TableCell>{log.loggedBy}</TableCell>
                <TableCell>{new Date(log.dateLogged).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {log.status !== 'Fixed' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleMarkAsFixed(log.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No debug logs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DebugLogTable;
