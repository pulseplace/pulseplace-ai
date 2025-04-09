
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PulseProvider } from '@/contexts/PulseContext';
import { ChatProvider } from '@/contexts/ChatbotContext';
import PulseBotChat from '@/components/chat/PulseBotChat';
import { Toaster } from '@/components/ui/toaster';
import MetaTags from '@/components/MetaTags';

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
          <MetaTags />
          <div className="min-h-screen">
            <Outlet />
            {/* Global PulseBot integration - available on all pages */}
            <div id="pulsebot-container" className="z-50">
              <PulseBotChat />
            </div>
            <Toaster />
          </div>
        </ChatProvider>
      </PulseProvider>
    </AuthProvider>
  );
};

export default Root;
