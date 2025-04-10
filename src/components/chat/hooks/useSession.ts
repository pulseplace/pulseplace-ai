
import { useEffect, useState } from 'react';
import { SessionInfo, MessageLanguage } from '../types';

export const useSession = () => {
  const [sessionInfo] = useState<SessionInfo>(() => {
    // Generate a unique session ID
    const sessionId = `session_${Math.random().toString(36).substring(2, 11)}`;
    
    return {
      id: sessionId,
      startTime: new Date(),
      language: 'en' as MessageLanguage,
      messageCount: 0,
      userMessageCount: 0,
      botMessageCount: 0,
      userAgent: navigator.userAgent,
      createdAt: new Date()
    };
  });

  useEffect(() => {
    // Log session start for debugging
    console.log(`PulseBot session started: ${sessionInfo.id}`);
    
    return () => {
      // Log session end for debugging
      console.log(`PulseBot session ended: ${sessionInfo.id}`);
    };
  }, [sessionInfo.id]);

  return { sessionInfo };
};
