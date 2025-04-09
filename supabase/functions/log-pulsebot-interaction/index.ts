
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Get Supabase credentials from environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    const { 
      session_id, 
      user_message, 
      bot_reply, 
      language, 
      avatar_state,
      user_agent,
      platform,
      response_time_ms,
      message_tokens,
      conversation_id
    } = await req.json();
    
    if (!session_id || !user_message || !bot_reply) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: session_id, user_message, and bot_reply" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Insert interaction log into the database
    const { data, error } = await supabase
      .from('pulsebot_logs')
      .insert({
        session_id,
        user_message,
        bot_reply,
        language: language || 'en',
        avatar_state: avatar_state || 'idle',
        user_agent: user_agent || req.headers.get('user-agent') || '',
        platform: platform || 'web',
        response_time_ms: response_time_ms || null,
        message_tokens: message_tokens || null,
        conversation_id: conversation_id || session_id,
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    console.log('Interaction logged successfully:', { session_id, language, avatar_state });
    
    return new Response(
      JSON.stringify({ success: true, message: "Interaction logged successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error logging interaction:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
