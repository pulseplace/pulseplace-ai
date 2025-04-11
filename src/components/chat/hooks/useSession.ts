
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SessionInfo, MessageLanguage } from '../types';

export const useSession = () => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
    id: `session_${uuidv4()}`,
    startTime: new Date(),
    language: 'en' as MessageLanguage,
    messageCount: 0,
    userMessageCount: 0,
    botMessageCount: 0,
    createdAt: new Date()
  });

  return {
    sessionInfo,
    setSessionInfo
  };
};
