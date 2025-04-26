
import React from 'react';
import { useBuildRequests } from '@/contexts/BuildRequestsContext';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BuildFlowBoard = () => {
  const { buildRequests, updateBuildRequest } = useBuildRequests();
  
  const lanes = [
    { id: 'backlog', name: 'Backlog' },
    { id: 'current_sprint', name: 'Current Sprint' },
    { id: 'shipped', name: 'Shipped' }
  ];
  
  const handleDragStart = (e: React.DragEvent, requestId: string) => {
    e.dataTransfer.setData('requestId', requestId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, lane: string) => {
    e.preventDefault();
    const requestId = e.dataTransfer.getData('requestId');
    updateBuildRequest(requestId, { lane: lane as any });
  };
  
  const getRequestsByLane = (lane: string) => {
    return buildRequests.filter(req => req.lane === lane);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getModuleBadge = (module: string) => {
    switch (module) {
      case 'dashboard':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Dashboard</Badge>;
      case 'pulsebot':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">PulseBot</Badge>;
      case 'certification':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Certification</Badge>;
      case 'analytics':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Analytics</Badge>;
      default:
        return <Badge variant="outline">{module}</Badge>;
    }
  };
  
  return (
    <div className="flex overflow-x-auto pb-4 space-x-4">
      {lanes.map(lane => (
        <div 
          key={lane.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, lane.id)}
        >
          <div className="bg-gray-100 rounded-md p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{lane.name}</h3>
              <Badge variant="outline">{getRequestsByLane(lane.id).length}</Badge>
            </div>
            
            <div className="space-y-3">
              {getRequestsByLane(lane.id).map(request => (
                <Card 
                  key={request.id}
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, request.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(request.priority)} mt-1.5`} />
                      <div>
                        <h4 className="font-medium text-sm">{request.title}</h4>
                        {request.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{request.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      {getModuleBadge(request.module)}
                      
                      {request.assignedTo && (
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                          {request.assignedTo}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {getRequestsByLane(lane.id).length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500">
                  No requests in this lane
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuildFlowBoard;
