
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PulseProvider } from '@/contexts/PulseContext';
import { ChatProvider } from '@/contexts/ChatbotContext';
import PulseBotChat from '@/components/chat/PulseBotChat';
import { Toaster } from '@/components/ui/toaster';
import MetaTags from '@/components/MetaTags';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  // Test Supabase connection on app load
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error('Supabase connection error:', error);
          toast.error('Database connection error. Please try again later.');
          return false;
        }
        
        console.log('Supabase connection successful!');
        return true;
      } catch (err) {
        console.error('Failed to connect to Supabase:', err);
        toast.error('Database connection error. Please try again later.');
        return false;
      }
    };

    testSupabaseConnection();
  }, []);

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
