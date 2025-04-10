
export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  language?: MessageLanguage;
  liked?: boolean;
  disliked?: boolean;
}

export type MessageLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'other';

export type BotAvatarStateValue = 'neutral' | 'happy' | 'thinking' | 'excited' | 'confused' | 'sad';

export interface SessionInfo {
  startTime: Date;
  language: MessageLanguage;
  messageCount: number;
  userMessageCount: number;
  botMessageCount: number;
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
