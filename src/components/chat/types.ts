
export type MessageRole = 'system' | 'user' | 'assistant';

export type MessageLanguage = 
  | 'en'  // English
  | 'es'  // Spanish
  | 'fr'  // French
  | 'de'  // German
  | 'it'  // Italian
  | 'pt'  // Portuguese
  | 'zh'  // Chinese
  | 'ja'  // Japanese
  | 'ko'; // Korean

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp?: Date;
  feedback?: 'positive' | 'negative';
  language?: MessageLanguage;
  liked?: boolean;
  disliked?: boolean;
}

export type BotAvatarStateValue = 'idle' | 'thinking' | 'typing' | 'happy' | 'confused';

export type BotAvatarState = BotAvatarStateValue | { 
  status: BotAvatarStateValue;
  message?: string;
  avatar?: string;
};

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[] | string[];
}

export interface SessionInfo {
  id: string;
  startTime: Date;
  userAgent: string;
  referrer?: string;
  createdAt?: Date;
}

export interface ConfettiState {
  isActive: boolean;
  config: {
    particleCount: number;
    spread: number;
    startVelocity: number;
    gravity: number;
    decay: number;
    colors: string[];
  };
}

// Analytics types
export interface AnalyticsFilters {
  dateFrom?: Date;
  dateTo?: Date;
  language?: string;
  feedbackType?: string;
}

export interface PulseBotLog {
  id: string;
  timestamp: Date;
  user_id?: string;
  session_id: string;
  message_content: string;
  response_content: string;
  language: string;
  feedback?: 'positive' | 'negative';
  metadata?: Record<string, any>;
}

export interface PulseBotAnalytics {
  totalInteractions: number;
  uniqueUsers: number;
  positiveRating: number;
  topLanguages: {
    language: string;
    count: number;
    percentage: number;
  }[];
  feedbackDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  popularQueries: {
    query: string;
    count: number;
  }[];
  mostDownvotedResponses: {
    query: string;
    response: string;
    count: number;
  }[];
  averageResponseTime: number;
  logs: PulseBotLog[];
}
