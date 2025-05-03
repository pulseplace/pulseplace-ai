import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTaskManager } from '@/contexts/task';
import { BuildRequest, BuildFlowLane } from '@/types/task.types';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

const LANES: BuildFlowLane[] = ['BACKLOG', 'CURRENT SPRINT', 'SHIPPED'];

const getLaneColor = (lane: BuildFlowLane) => {
  switch (lane) {
    case 'BACKLOG':
      return 'bg-gray-100 border-gray-300';
    case 'CURRENT SPRINT':
      return 'bg-blue-100 border-blue-300';
    case 'SHIPPED':
      return 'bg-green-100 border-green-300';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

interface BuildFlowBoardProps {
  onEditRequest: (request: BuildRequest) => void;
  onDeleteRequest: (id: string) => void;
}

export default function BuildFlowBoard({ onEditRequest, onDeleteRequest }: BuildFlowBoardProps) {
  const { buildRequests, moveBuildRequest, getBuildRequestsByLane } = useTaskManager();

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, requestId: string) => {
    e.dataTransfer.setData('requestId', requestId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetLane: BuildFlowLane) => {
    e.preventDefault();
    const requestId = e.dataTransfer.getData('requestId');
    if (requestId) {
      moveBuildRequest(requestId, targetLane);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {LANES.map(lane => {
        const requests = getBuildRequestsByLane(lane);
        
        return (
          <div key={lane} className="flex flex-col space-y-2">
            <div 
              className={`p-2 rounded-md mb-2 text-center font-medium ${getLaneColor(lane)}`}
            >
              {lane} ({requests.length})
            </div>
            <div 
              className="space-y-3 min-h-[200px] p-2 rounded-md bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, lane)}
            >
              {requests.map(request => (
                <Card 
                  key={request.id} 
                  className="cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, request.id)}
                >
                  <CardHeader className="p-3 pb-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{request.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => onEditRequest(request)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                          onClick={() => onDeleteRequest(request.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                      {request.context}
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <Badge className="bg-gray-100 text-gray-800 border">{request.module}</Badge>
                      {request.deadline && (
                        <span>Due: {format(new Date(request.deadline), 'MMM d')}</span>
                      )}
                    </div>
                    {request.notes && (
                      <div className="text-xs text-gray-500 italic line-clamp-1 mt-1">
                        {request.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {requests.length === 0 && (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No requests in this lane
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
