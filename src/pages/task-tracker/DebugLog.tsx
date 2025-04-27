
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebugLogs } from '@/contexts/DebugLogsContext';
import { DebugLogForm } from '@/components/debug-log/DebugLogForm';
import { DebugLogTable } from '@/components/debug-log/DebugLogTable';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const DebugLog = () => {
  const { clearLogs } = useDebugLogs();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Debug Logs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add Log Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <DebugLogForm />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Log History</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearLogs}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Clear Logs
            </Button>
          </CardHeader>
          <CardContent>
            <DebugLogTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebugLog;
