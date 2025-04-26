
import React from 'react';
import { Card } from '@/components/ui/card';
import { BuildFlowLane } from '@/types/task.types';
import { useBuildRequests } from '@/contexts/BuildRequestsContext';
import BuildFlowColumn from './BuildFlowColumn';

const BuildFlowBoard: React.FC = () => {
  const { buildRequests, moveBuildRequest } = useBuildRequests();

  const lanes: BuildFlowLane[] = ['backlog', 'in_progress', 'review', 'done'];

  const getLaneTitle = (lane: BuildFlowLane): string => {
    switch (lane) {
      case 'backlog': return 'Backlog';
      case 'in_progress': return 'In Progress';
      case 'review': return 'Review';
      case 'done': return 'Done';
      default: return lane;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetLane: BuildFlowLane) => {
    e.preventDefault();
    const requestId = e.dataTransfer.getData('requestId');
    moveBuildRequest(requestId, targetLane);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {lanes.map(lane => (
        <Card
          key={lane}
          className="p-4 h-full"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, lane)}
        >
          <h3 className="font-medium mb-3">{getLaneTitle(lane)}</h3>
          <BuildFlowColumn 
            lane={lane} 
            requests={buildRequests.filter(r => r.status === lane)} 
          />
        </Card>
      ))}
    </div>
  );
};

export default BuildFlowBoard;
