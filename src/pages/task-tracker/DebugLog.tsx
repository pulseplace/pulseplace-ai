
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebugLogs } from '@/contexts/TaskContext';
import DebugLogTable from '@/components/debug-log/DebugLogTable';
import DebugLogForm from '@/components/debug-log/DebugLogForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DebugLog = () => {
  const { debugLogs, getCriticalOpenLogs, getRecentlyFixedLogs } = useDebugLogs();
  
  // Count logs by status
  const openLogs = debugLogs.filter(log => log.status === 'Open').length;
  const inProgressLogs = debugLogs.filter(log => log.status === 'In Progress').length;
  const fixedLogs = debugLogs.filter(log => log.status === 'Fixed').length;
  
  // Get critical open logs
  const criticalLogs = getCriticalOpenLogs();
  
  // Get recently fixed logs (last 7 days)
  const recentlyFixedLogs = getRecentlyFixedLogs(7);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Debug Log</h1>
          <p className="text-gray-600">
            Track and manage issues across the application
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <DebugLogForm />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openLogs}</div>
            <p className="text-sm text-gray-500">Issues needing attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgressLogs}</div>
            <p className="text-sm text-gray-500">Issues being worked on</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fixed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fixedLogs}</div>
            <p className="text-sm text-gray-500">Issues resolved</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="critical">Critical Issues</TabsTrigger>
          <TabsTrigger value="recent">Recently Fixed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <DebugLogTable />
        </TabsContent>
        
        <TabsContent value="critical" className="space-y-4">
          {criticalLogs.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Critical Open Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {criticalLogs.map(log => (
                    <li key={log.id} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="font-medium">{log.description}</div>
                      <div className="text-sm text-gray-500">
                        {log.component} • Logged by {log.loggedBy}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200">
              🎉 No critical open issues at the moment!
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          {recentlyFixedLogs.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Recently Fixed Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentlyFixedLogs.map(log => (
                    <li key={log.id} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="font-medium">{log.description}</div>
                      <div className="text-sm text-gray-500">
                        {log.component} • Fixed on {new Date(log.dateLogged).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md border border-yellow-200">
              No issues have been fixed in the last 7 days.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DebugLog;
