
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

export type BotAvatarState = 'idle' | 'typing' | 'happy' | 'thinking';

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Message[];
}
