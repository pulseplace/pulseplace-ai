
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BuildFlowLane } from '@/types/task.types';
import { useBuildRequests } from '@/contexts/TaskContext';
import BuildFlowColumn from './BuildFlowColumn';

const BuildFlowBoard = () => {
  const { buildRequests, moveBuildRequest, getBuildRequestsByLane } = useBuildRequests();

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside a droppable area
    if (!destination) return;
    
    // Dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Move the request to the new lane
    moveBuildRequest(draggableId, destination.droppableId as BuildFlowLane);
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <Droppable droppableId="BACKLOG">
          {(provided) => (
            <BuildFlowColumn 
              title="Backlog" 
              items={getBuildRequestsByLane('BACKLOG')} 
              droppableProvided={provided} 
            />
          )}
        </Droppable>
        
        <Droppable droppableId="CURRENT SPRINT">
          {(provided) => (
            <BuildFlowColumn 
              title="Current Sprint" 
              items={getBuildRequestsByLane('CURRENT SPRINT')} 
              droppableProvided={provided} 
            />
          )}
        </Droppable>
        
        <Droppable droppableId="SHIPPED">
          {(provided) => (
            <BuildFlowColumn 
              title="Shipped" 
              items={getBuildRequestsByLane('SHIPPED')} 
              droppableProvided={provided} 
            />
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default BuildFlowBoard;
