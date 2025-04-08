
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SessionInfo } from '../types';

// Get session info from local storage
const getSessionInfo = (): SessionInfo => {
  const storedSession = localStorage.getItem('pulsebot_session');
  if (storedSession) {
    return JSON.parse(storedSession);
  } else {
    const newSession: SessionInfo = {
      id: uuidv4(),
      createdAt: new Date(),
    };
    localStorage.setItem('pulsebot_session', JSON.stringify(newSession));
    return newSession;
  }
};

export const useSession = () => {
  const [sessionInfo] = useState<SessionInfo>(getSessionInfo());
  
  return { sessionInfo };
};
