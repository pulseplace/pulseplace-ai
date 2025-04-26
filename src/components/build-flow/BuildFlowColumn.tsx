
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BuildFlowLane, BuildRequest } from '@/types/task.types';

interface BuildFlowColumnProps {
  lane: BuildFlowLane;
  requests: BuildRequest[];
}

const BuildFlowColumn: React.FC<BuildFlowColumnProps> = ({ lane, requests }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, requestId: string) => {
    e.dataTransfer.setData('requestId', requestId);
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleColor = (module: string): string => {
    switch (module) {
      case 'core': return 'bg-purple-100 text-purple-800';
      case 'certification': return 'bg-green-100 text-green-800';
      case 'dashboard': return 'bg-blue-100 text-blue-800';
      case 'pulsebot': return 'bg-pink-100 text-pink-800';
      case 'survey': return 'bg-yellow-100 text-yellow-800';
      case 'integration': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 border border-dashed rounded-md">
        No items
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {requests.map(request => (
        <Card
          key={request.id}
          draggable
          onDragStart={(e) => handleDragStart(e, request.id)}
          className="cursor-move hover:shadow-md transition-shadow"
        >
          <CardContent className="p-3">
            <h4 className="font-medium mb-1">{request.title}</h4>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={getPriorityColor(request.priority)}>
                {request.priority}
              </Badge>
              <Badge variant="secondary" className={getModuleColor(request.module)}>
                {request.module}
              </Badge>
            </div>
            {request.assignedTo && (
              <div className="mt-2 text-xs text-gray-500">
                Assigned to: {request.assignedTo}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuildFlowColumn;
