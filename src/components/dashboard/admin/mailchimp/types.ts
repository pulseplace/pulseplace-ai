
export interface MailchimpEvent {
  id: string;
  event_type: string;
  email: string | null;
  timestamp: string;
  list_id: string | null;
  raw_data: string | null;
  processed_at: string;
  confirmed_at: string | null;
}

export interface EventDetailDialogProps {
  selectedEvent: MailchimpEvent | null;
  onOpenChange: (open: boolean) => void;
  viewRawData: boolean;
  setViewRawData: (value: boolean) => void;
}

export interface EventListProps {
  events: MailchimpEvent[];
  isLoading: boolean;
  handleViewDetails: (event: MailchimpEvent) => void;
}

export interface NoEventsProps {
  message?: string;
}

export const getEventTypeBadge = (eventType: string): string => {
  const typeColors: Record<string, string> = {
    subscribe: "bg-green-100 text-green-800",
    unsubscribe: "bg-red-100 text-red-800",
    profile: "bg-blue-100 text-blue-800",
    upemail: "bg-yellow-100 text-yellow-800",
    cleaned: "bg-purple-100 text-purple-800",
    campaign: "bg-indigo-100 text-indigo-800",
    confirm: "bg-teal-100 text-teal-800",
  };

  return typeColors[eventType.toLowerCase()] || "bg-gray-100 text-gray-800";
};
