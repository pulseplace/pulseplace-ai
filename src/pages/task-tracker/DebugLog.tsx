
import React, { useState } from 'react';
import { useTaskManager } from '@/contexts/TaskContext';
import { DebugLog } from '@/types/task.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, Clock } from 'lucide-react';
import DebugLogTable from '@/components/debug-log/DebugLogTable';
import DebugLogForm from '@/components/debug-log/DebugLogForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function DebugLogPage() {
  const { debugLogs, addDebugLog, updateDebugLog, getCriticalOpenLogs } = useTaskManager();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'all' | 'critical' | 'recent'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState<DebugLog | undefined>(undefined);

  const criticalLogs = getCriticalOpenLogs();

  const handleAddLog = () => {
    setCurrentLog(undefined);
    setIsFormOpen(true);
  };

  const handleEditLog = (log: DebugLog) => {
    setCurrentLog(log);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (currentLog) {
      updateDebugLog(currentLog.id, data);
      toast({
        title: "Log updated",
        description: "The debug log has been updated successfully."
      });
    } else {
      addDebugLog(data);
      toast({
        title: "Log added",
        description: "A new debug log has been added successfully."
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">PulsePlace Debug Log</h1>
          <p className="text-gray-500 mt-1">Track and manage bugs, issues, and system errors</p>
        </div>
        <Button onClick={handleAddLog} className="mt-4 md:mt-0 bg-pulse-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Log New Issue
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Debug & Error Tracking</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-gray-500">
                Total Issues: <span className="font-semibold">{debugLogs.length}</span>
              </div>
              <div className="text-red-500">
                Critical Open: <span className="font-semibold">{criticalLogs.length}</span>
              </div>
            </div>
            <Tabs 
              defaultValue="all" 
              className="w-[400px]"
              onValueChange={(value) => setViewMode(value as any)}
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">
                  All Issues
                </TabsTrigger>
                <TabsTrigger value="critical" className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Critical & Open
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recently Fixed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'all' && <DebugLogTable onEditLog={handleEditLog} />}
      {viewMode === 'critical' && <DebugLogTable showCriticalOnly onEditLog={handleEditLog} />}
      {viewMode === 'recent' && <DebugLogTable showRecentlyClosed daysForRecent={7} onEditLog={handleEditLog} />}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentLog ? 'Edit Issue' : 'Log New Issue'}</DialogTitle>
          </DialogHeader>
          <DebugLogForm 
            log={currentLog} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
