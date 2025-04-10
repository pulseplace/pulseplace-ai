
import { useState } from 'react';
import { SessionInfo, MessageLanguage } from '../types';

export const useSession = () => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
    id: `session_${Math.random().toString(36).substring(2, 11)}`,
    startTime: new Date(),
    language: 'en' as MessageLanguage,
    messageCount: 0,
    userMessageCount: 0,
    botMessageCount: 0,
    userAgent: navigator.userAgent,
    createdAt: new Date()
  });

  return { 
    sessionInfo,
    setSessionInfo 
  };
};
