
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle } from 'lucide-react';
import { EventListProps, NoEventsProps } from './types';
import { getEventTypeBadge } from './types';

// Component for showing when no events are found
export const NoEvents: React.FC<NoEventsProps> = ({ message = "No events found matching your criteria" }) => (
  <TableRow>
    <TableCell colSpan={6} className="h-24 text-center">
      {message}
    </TableCell>
  </TableRow>
);

// Component for showing loading state
export const LoadingEvents: React.FC = () => (
  <TableRow>
    <TableCell colSpan={6} className="h-24 text-center">
      Loading events...
    </TableCell>
  </TableRow>
);

const EventList: React.FC<EventListProps> = ({ events, isLoading, handleViewDetails }) => {
  if (isLoading) {
    return <LoadingEvents />;
  }

  if (events.length === 0) {
    return <NoEvents />;
  }

  return (
    <>
      {events.map((event) => (
        <TableRow key={event.id}>
          <TableCell>
            <Badge className={`${getEventTypeBadge(event.event_type)} capitalize`}>
              {event.event_type}
            </Badge>
          </TableCell>
          <TableCell>{event.email || "—"}</TableCell>
          <TableCell>
            {new Date(event.timestamp).toLocaleString()}
          </TableCell>
          <TableCell>
            {event.confirmed_at ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">
                  {new Date(event.confirmed_at).toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-xs text-gray-500">No</span>
            )}
          </TableCell>
          <TableCell>{event.list_id || "—"}</TableCell>
          <TableCell>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleViewDetails(event)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EventList;
