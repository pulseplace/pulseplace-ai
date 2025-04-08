
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
    const { message, feedbackType, userIdentifier } = await req.json();
    
    if (!message || !feedbackType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: message and feedbackType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate feedback type
    if (feedbackType !== 'up' && feedbackType !== 'down') {
      return new Response(
        JSON.stringify({ error: "feedbackType must be 'up' or 'down'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Insert feedback into the database
    const { data, error } = await supabase
      .from('pulsebot_feedback')
      .insert([
        { 
          message, 
          feedback_type: feedbackType,
          user_identifier: userIdentifier || null
        }
      ]);
    
    if (error) throw error;
    
    console.log('Feedback logged successfully:', { message, feedbackType, userIdentifier });
    
    return new Response(
      JSON.stringify({ success: true, message: "Feedback logged successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error logging feedback:', error);
    
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
