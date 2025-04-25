
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BuildRequest } from '@/types/task.types';
import { Draggable } from 'react-beautiful-dnd';

interface BuildFlowColumnProps {
  title: string;
  items: BuildRequest[];
  droppableProvided: any;
}

const BuildFlowColumn = ({ title, items, droppableProvided }: BuildFlowColumnProps) => {
  return (
    <div className="flex flex-col h-full">
      <Card className="h-full border-t-4 border-t-pulse-600">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="secondary">{items.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="space-y-3 min-h-full"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-3 rounded-md border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.module}</p>
                    {item.deadline && (
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-600">
                          Due: {new Date(item.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildFlowColumn;
