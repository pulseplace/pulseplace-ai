
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

  // Enhanced Supabase connection test on app load
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        
        // Get the Supabase URL safely (without using getUrl which doesn't exist)
        const baseUrl = supabase.supabaseUrl || 'https://hamqupvdhlfznwnuohsh.supabase.co';
        console.log('Supabase base URL:', baseUrl);
        
        // First test: Simple ping to check if Supabase is reachable
        console.log('1. Testing basic Supabase connectivity...');
        const { data: pingData, error: pingError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        
        if (pingError) {
          console.error('Supabase connection error (profiles table):', pingError);
          
          // Try another table as fallback
          console.log('2. Trying alternate table connection...');
          const { error: fallbackError } = await supabase.from('pulsebot_logs').select('count', { count: 'exact', head: true });
          
          if (fallbackError) {
            console.error('Alternate table connection also failed:', fallbackError);
            toast.error('Database connection failed. Network or configuration issue detected.');
            return false;
          }
        }
        
        // Test health endpoint
        console.log('3. Testing Supabase health endpoint...');
        try {
          const response = await fetch(`${baseUrl}/health`);
          const healthData = await response.json();
          console.log('Supabase health check:', healthData);
        } catch (healthErr) {
          console.error('Supabase health endpoint error:', healthErr);
        }
        
        console.log('Supabase connection tests completed');
        toast.success('Database connection successful');
        return true;
      } catch (err) {
        console.error('Critical failure connecting to Supabase:', err);
        toast.error('Unable to reach database. Please check network connection and DNS configuration.');
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
