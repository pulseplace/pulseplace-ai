
// This file contains the shared types for the chat components

export type BotAvatarState = 'idle' | 'typing' | 'thinking' | 'happy';

export interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface SessionInfo {
  id: string;
  createdAt: Date;
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[];
}

export interface ConfettiState {
  isActive: boolean;
  config: {
    particleCount: number;
    spread: number;
    startVelocity: number;
    decay: number;
    gravity: number;
    drift: number;
    scalar: number;
    ticks: number;
  };
}

// Types for feedback
export interface FeedbackData {
  message: string;
  feedback_type: 'up' | 'down';
  user_identifier?: string;
}

// Types for analytics
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

export interface AnalyticsFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  language: string;
  feedbackType: string;
}
