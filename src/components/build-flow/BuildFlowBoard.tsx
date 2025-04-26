
import React from 'react';
import { useBuildRequests } from '@/contexts/BuildRequestsContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BuildFlowBoard = () => {
  const { buildRequests } = useBuildRequests();
  
  const requestsByLane = {
    backlog: buildRequests.filter(req => req.lane === 'backlog'),
    current_sprint: buildRequests.filter(req => req.lane === 'current_sprint'),
    shipped: buildRequests.filter(req => req.lane === 'shipped')
  };
  
  const getModuleBadge = (module: string) => {
    switch (module) {
      case 'dashboard': return <Badge className="bg-blue-100 text-blue-800">Dashboard</Badge>;
      case 'pulsebot': return <Badge className="bg-green-100 text-green-800">PulseBot</Badge>;
      case 'certification': return <Badge className="bg-purple-100 text-purple-800">Certification</Badge>;
      case 'analytics': return <Badge className="bg-amber-100 text-amber-800">Analytics</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">{module}</Badge>;
    }
  };
  
  const getLaneTitle = (lane: string) => {
    switch (lane) {
      case 'backlog': return 'Backlog';
      case 'current_sprint': return 'Current Sprint';
      case 'shipped': return 'Shipped';
      default: return lane;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(requestsByLane).map(([lane, requests]) => (
        <Card key={lane} className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {getLaneTitle(lane)} ({requests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto space-y-4">
            {requests.map(request => (
              <div key={request.id} className="border rounded p-3">
                <h4 className="font-medium mb-2">{request.title}</h4>
                {request.description && (
                  <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                )}
                <div className="flex justify-between items-center">
                  {getModuleBadge(request.module)}
                  <span className="text-xs text-gray-500">
                    {request.assignedTo ? `Assigned to: ${request.assignedTo}` : 'Unassigned'}
                  </span>
                </div>
              </div>
            ))}
            
            {requests.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500">
                No requests in this lane
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuildFlowBoard;
