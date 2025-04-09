
export type Role = 'user' | 'bot' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp?: Date;
  language?: string;
  liked?: boolean;
  disliked?: boolean;
  isError?: boolean;
}

export type MessageType = Message;

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  avatarState?: BotAvatarState;
  context?: any;
  liked?: boolean;
  disliked?: boolean;
  isError?: boolean;
}

// BotAvatarState can be either a string status or an object with avatar URL
export type BotAvatarStateValue = 'idle' | 'thinking' | 'typing' | 'happy';
export type BotAvatarState = BotAvatarStateValue | { 
  status: BotAvatarStateValue,
  avatar: string 
};

export type MessageLanguage = string;

export interface SessionInfo {
  id: string;
  createdAt: Date;
}

export interface ConfettiState {
  run: boolean;
  config: object;
  isActive?: boolean;
}

export interface FeedbackData {
  messageId: string;
  content: string;
  feedbackType: 'up' | 'down';
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[] | string[];
}

export interface AnalyticsFilters {
  dateFrom?: Date;
  dateTo?: Date;
  language?: string;
  feedbackType?: string;
}

export interface PulseBotLog {
  id: string;
  session_id: string;
  user_message: string;
  bot_reply: string;
  language: string;
  avatar_state: string;
  created_at: string;
}

export interface PulseBotAnalytics {
  totalInteractions: number;
  uniqueUsers: number;
  languageBreakdown: {
    language: string;
    count: number;
    percentage: number;
  }[];
  feedbackRatio: {
    positive: number;
    negative: number;
    ratio: number;
  };
  avatarStateUsage: {
    state: string;
    count: number;
    percentage: number;
  }[];
  topQueries: {
    query: string;
    count: number;
  }[];
  topDownvotedResponses: {
    id: string;
    userMessage: string;
    botResponse: string;
    timestamp: string;
    downvotes: number;
  }[];
}
