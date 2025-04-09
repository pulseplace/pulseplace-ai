
export type MailchimpEventType = 
  | 'subscribe' 
  | 'unsubscribe' 
  | 'profile' 
  | 'upemail' 
  | 'cleaned' 
  | 'campaign'
  | 'confirm';  // Added confirm event type for double opt-in

export interface MailchimpTag {
  id: number;
  name: string;
}

export interface MailchimpEventData {
  email: string;
  list_id: string;
  tags?: MailchimpTag[];
  interests?: Record<string, boolean>;
  merges?: Record<string, string>; // MERGE fields like FNAME, LNAME
}

export interface EventData {
  event_type: string;
  email: string | null;
  timestamp: string;
  list_id: string | null;
  raw_data: string;
  tags?: MailchimpTag[];
  interests?: Record<string, boolean>;
  merges?: Record<string, string>;
}
