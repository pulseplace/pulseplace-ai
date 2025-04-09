
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventDetailDialogProps } from './types';
import { getEventTypeBadge } from './types';

const EventDetailDialog: React.FC<EventDetailDialogProps> = ({ 
  selectedEvent, 
  onOpenChange,
  viewRawData,
  setViewRawData
}) => {
  if (!selectedEvent) return null;
  
  return (
    <Dialog open={!!selectedEvent} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Webhook Event Details</DialogTitle>
          <DialogDescription>
            {selectedEvent && (
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${getEventTypeBadge(selectedEvent.event_type)} capitalize`}>
                  {selectedEvent.event_type}
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date(selectedEvent.timestamp).toLocaleString()}
                </span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {selectedEvent && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Email</h4>
                <p className="text-sm text-gray-700">{selectedEvent.email || "—"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">List ID</h4>
                <p className="text-sm text-gray-700">{selectedEvent.list_id || "—"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Processed At</h4>
                <p className="text-sm text-gray-700">
                  {new Date(selectedEvent.processed_at).toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Confirmed At</h4>
                <p className="text-sm text-gray-700">
                  {selectedEvent.confirmed_at ? 
                    new Date(selectedEvent.confirmed_at).toLocaleString() : 
                    "Not confirmed yet"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Event ID</h4>
                <p className="text-sm text-gray-700">{selectedEvent.id}</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Raw Payload</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewRawData(!viewRawData)}
                >
                  {viewRawData ? "View Formatted" : "View Raw"}
                </Button>
              </div>
              
              {selectedEvent.raw_data ? (
                <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px]">
                  {viewRawData ? (
                    <pre className="text-xs">{selectedEvent.raw_data}</pre>
                  ) : (
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(JSON.parse(selectedEvent.raw_data), null, 2)}
                    </pre>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No raw data available</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
