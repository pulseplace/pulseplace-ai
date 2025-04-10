
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string | Date;
  avatarState?: BotAvatarStateValue;
  feedback?: 'positive' | 'negative';
  language?: MessageLanguage;
  liked?: boolean;
  disliked?: boolean;
}

export type MessageLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'other';

export type MessageFeedback = 'positive' | 'negative' | null;

export type BotAvatarStateValue = 'idle' | 'thinking' | 'typing' | 'happy' | 'excited' | 'confused' | 'sad' | 'neutral';

// Can be either a string representing the state or an object with additional properties
export type BotAvatarState = BotAvatarStateValue | { 
  status: BotAvatarStateValue; 
  animated?: boolean;
  duration?: number;
};

export interface SessionInfo {
  id?: string;
  startTime: Date;
  language: MessageLanguage;
  messageCount: number;
  userMessageCount: number;
  botMessageCount: number;
  userAgent?: string;
  createdAt?: Date;
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[];
}

export interface ConfettiConfig {
  particleCount: number;
  spread: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  scalar?: number;
  origin?: {
    x?: number;
    y?: number;
  };
}

export interface PulseBotAnalytics {
  totalInteractions: number;
  uniqueUsers: number;
  averageResponseTime: number;
  positiveRating: number;
  responseRate: number;
  feedbackRatio: {
    positive: number;
    negative: number;
  };
  topQueries: {
    query: string;
    count: number;
  }[];
  topDownvotedResponses?: {
    id: string;
    userMessage: string;
    botResponse: string;
    timestamp: string;
    downvotes: number;
  }[];
  mostDownvotedResponses: {
    query: string;
    response: string;
    count: number;
  }[];
  languageBreakdown: {
    language: string;
    count: number;
    percentage: number;
  }[];
  avatarStateUsage: {
    state: string;
    count: number;
    percentage: number;
  }[];
  topLanguages?: {
    language: string;
    count: number;
    percentage: number;
  }[];
}

export interface PulseBotConfig {
  initialMessage: string;
  placeholder: string;
  initialBotState: BotAvatarStateValue;
  availableLanguages: MessageLanguage[];
  defaultLanguage: MessageLanguage;
  feedbackEnabled: boolean;
  styleOptions: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    botMessageColor: string;
    userMessageColor: string;
    fontFamily: string;
  };
}

export interface PulseBotLog {
  id: string;
  sessionId: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  language: string;
  avatarState: BotAvatarStateValue;
}

export interface AnalyticsFilters {
  dateFrom?: Date;
  dateTo?: Date;
  language?: string;
  feedbackType?: 'positive' | 'negative' | 'all';
  avatarState?: BotAvatarStateValue;
}

export type DateRangeFilter = {
  from: Date;
  to: Date;
};
