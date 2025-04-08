export type Role = 'user' | 'bot';

export interface Message {
  id: string;
  role: Role;
  content: string;
  liked?: boolean;
  disliked?: boolean;
}

export type BotAvatarState = 'idle' | 'thinking' | 'happy';

export interface SessionInfo {
  id: string;
  createdAt: Date;
}

export interface ConfettiState {
  run: boolean;
  config: object;
}

export interface FeedbackData {
  messageId: string;
  content: string;
  feedbackType: 'up' | 'down';
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
    response: string;
    downvotes: number;
  }[];
}
