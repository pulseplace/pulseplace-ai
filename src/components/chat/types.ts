
// Message types
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko';
export type MessageFeedback = 'positive' | 'negative';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  feedback?: MessageFeedback;
  avatarState?: BotAvatarStateValue;
  language?: MessageLanguage;
}

// Bot avatar state
export type BotAvatarStateValue = 'idle' | 'thinking' | 'happy' | 'neutral' | 'confused' | 'excited' | 'typing';

export type BotAvatarState = BotAvatarStateValue | { 
  status: BotAvatarStateValue;
  details?: string;
  animated?: boolean;
};

// Bot response
export interface BotResponse {
  content: string;
  avatarState: BotAvatarStateValue;
}

// PulseBot Analytics
export interface PulseBotAnalytics {
  totalInteractions: number;
  uniqueUsers: number;
  positiveRating: number;
  averageResponseTime: number;
  topLanguages: string[];
  feedbackDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  feedbackRatio: {
    positive: number;
    negative: number;
  };
  topQueries: {
    query: string;
    count: number;
  }[];
  popularQueries: string[];
  mostDownvotedResponses: {
    query: string;
    response: string;
    count: number;
  }[];
  topDownvotedResponses: DownvotedResponse[];
  avatarStateUsage: {
    state: string;
    count: number;
    percentage: number;
  }[];
  languageBreakdown: {
    language: string;
    count: number;
    percentage: number;
  }[];
  logs: PulseBotLog[];
}

export interface DownvotedResponse {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  downvotes: number;
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

export interface AnalyticsFilters {
  dateFrom?: Date;
  dateTo?: Date;
  language?: string;
  feedbackType?: 'positive' | 'negative' | 'all';
}

// Confetti configuration
export interface ConfettiConfig {
  particleCount: number;
  spread: number;
  origin: { y: number };
  colors?: string[];
}

// Search state
export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[] | string[];
}

// Session info
export interface SessionInfo {
  id: string;
  startTime: Date;
  userAgent: string;
  createdAt: Date;
}
