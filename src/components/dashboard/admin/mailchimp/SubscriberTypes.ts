
export interface SubscriberProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  confirmed_opt_in: boolean | null;
  mailchimp_tags: string[] | null;
  created_at: string | null;
}

export interface SubscriberListProps {
  subscribers: SubscriberProfile[];
  isLoading: boolean;
}

export interface SubscriberSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface NoSubscribersProps {
  message?: string;
}
