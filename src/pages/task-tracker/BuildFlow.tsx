
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBuildRequests } from '@/contexts/TaskContext';
import BuildFlowBoard from '@/components/build-flow/BuildFlowBoard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BuildFlowLane } from '@/types/task.types';

const BuildFlow = () => {
  const { buildRequests } = useBuildRequests();
  
  const countByLane = (lane: BuildFlowLane) => {
    return buildRequests.filter(req => req.lane === lane).length;
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Build Flow</h1>
          <p className="text-gray-600">
            Manage build requests and track their progress through the pipeline
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-pulse-gradient hover:opacity-90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Build Request
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Backlog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByLane('BACKLOG')}</div>
            <p className="text-sm text-gray-500">Build requests waiting to be started</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Sprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByLane('CURRENT SPRINT')}</div>
            <p className="text-sm text-gray-500">Build requests in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByLane('SHIPPED')}</div>
            <p className="text-sm text-gray-500">Build requests completed</p>
          </CardContent>
        </Card>
      </div>
      
      <BuildFlowBoard />
    </div>
  );
};

export default BuildFlow;
