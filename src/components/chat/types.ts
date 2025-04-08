
// This file contains the shared types for the chat components
// Let's assume this is the existing content and add our new types

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
