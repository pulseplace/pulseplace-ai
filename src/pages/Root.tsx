
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PulseProvider } from '@/contexts/PulseContext';
import { ChatProvider } from '@/contexts/ChatbotContext';
import PulseBotChat from '@/components/chat/PulseBotChat';

const Root: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Effect to handle any navigation issues or redirects
  useEffect(() => {
    // Log route changes for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Current route:', location.pathname);
    }
  }, [location, navigate]);

  return (
    <AuthProvider>
      <PulseProvider>
        <ChatProvider>
          <div className="min-h-screen">
            <Outlet />
            {/* Global PulseBot integration - available on all pages */}
            <PulseBotChat />
          </div>
        </ChatProvider>
      </PulseProvider>
    </AuthProvider>
  );
};

export default Root;
