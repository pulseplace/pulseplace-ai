
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
}

export type BotAvatarStateValue = 'idle' | 'thinking' | 'typing' | 'happy' | 'confused';

export type BotAvatarState = BotAvatarStateValue | { 
  status: BotAvatarStateValue;
  message?: string;
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
