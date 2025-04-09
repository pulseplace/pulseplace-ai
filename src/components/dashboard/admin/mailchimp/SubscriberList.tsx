
import React from 'react';
import {
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from 'lucide-react';
import { SubscriberListProps, NoSubscribersProps } from './SubscriberTypes';

// Component for showing when no subscribers are found
export const NoSubscribers: React.FC<NoSubscribersProps> = ({ 
  message = "No subscribers found matching your criteria" 
}) => (
  <TableRow>
    <TableCell colSpan={5} className="h-24 text-center">
      {message}
    </TableCell>
  </TableRow>
);

// Component for showing loading state
export const LoadingSubscribers: React.FC = () => (
  <TableRow>
    <TableCell colSpan={5} className="h-24 text-center">
      Loading subscribers...
    </TableCell>
  </TableRow>
);

const SubscriberList: React.FC<SubscriberListProps> = ({ 
  subscribers, 
  isLoading 
}) => {
  if (isLoading) {
    return <LoadingSubscribers />;
  }

  if (subscribers.length === 0) {
    return <NoSubscribers />;
  }

  return (
    <>
      {subscribers.map((subscriber) => (
        <TableRow key={subscriber.id}>
          <TableCell>{subscriber.email || "—"}</TableCell>
          <TableCell>
            {subscriber.first_name || subscriber.last_name ? 
              `${subscriber.first_name || ''} ${subscriber.last_name || ''}`.trim() : 
              "—"}
          </TableCell>
          <TableCell>
            {subscriber.confirmed_opt_in ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Confirmed</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <XCircle className="h-4 w-4 mr-1" />
                <span>Pending</span>
              </div>
            )}
          </TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              {subscriber.mailchimp_tags && subscriber.mailchimp_tags.length > 0 ? (
                subscriber.mailchimp_tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="whitespace-nowrap">
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No tags</span>
              )}
            </div>
          </TableCell>
          <TableCell>
            {subscriber.created_at ? 
              new Date(subscriber.created_at).toLocaleDateString() : 
              "—"}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SubscriberList;
