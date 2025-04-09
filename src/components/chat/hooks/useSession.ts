
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SessionInfo } from '../types';

export function useSession() {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>(() => {
    // Try to retrieve existing session from localStorage
    const storedSession = localStorage.getItem('pulsebot_session');
    if (storedSession) {
      try {
        return JSON.parse(storedSession);
      } catch (e) {
        console.error('Failed to parse stored session:', e);
      }
    }
    
    // Create new session if none exists
    return {
      id: uuidv4(),
      startTime: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined
    };
  });

  // Store session in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pulsebot_session', JSON.stringify(sessionInfo));
  }, [sessionInfo]);

  return { sessionInfo };
}
