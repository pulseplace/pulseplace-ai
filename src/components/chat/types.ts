
export type Role = 'user' | 'bot' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
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

export type BotAvatarState = 'idle' | 'thinking' | 'typing' | 'happy';

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
  results: Message[];
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
  avatar_state: BotAvatarState;
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
    state: BotAvatarState;
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
