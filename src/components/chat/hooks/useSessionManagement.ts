
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageLanguage } from '../types';

interface SessionData {
  id: string;
  language: MessageLanguage;
  startTime?: Date;
}

export function useSessionManagement() {
  // Create a session ID when the hook is first called
  const [sessionInfo, setSessionInfo] = useState<SessionData>(() => ({
    id: `session_${uuidv4().slice(0, 10)}`,
    language: 'en',
    startTime: new Date()
  }));
  
  // Log when session starts
  useEffect(() => {
    console.log('PulseBot session started:', sessionInfo.id);
  }, [sessionInfo.id]);

  const updateSessionLanguage = (language: MessageLanguage) => {
    setSessionInfo(prev => ({
      ...prev,
      language
    }));
  };

  return {
    sessionInfo,
    setSessionInfo,
    updateSessionLanguage
  };
}
