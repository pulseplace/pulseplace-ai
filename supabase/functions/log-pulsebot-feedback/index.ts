
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
    const { message, feedback_type, user_identifier } = await req.json();
    
    if (!message || !feedback_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: message and feedback_type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate feedback type
    if (feedback_type !== 'up' && feedback_type !== 'down') {
      return new Response(
        JSON.stringify({ error: "feedback_type must be 'up' or 'down'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Insert feedback directly into the database
    const { data, error } = await supabase
      .from('pulsebot_feedback')
      .insert({
        message,
        feedback_type,
        user_identifier: user_identifier || null
      });
    
    if (error) throw error;
    
    console.log('Feedback logged successfully:', { message, feedback_type, user_identifier });
    
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
