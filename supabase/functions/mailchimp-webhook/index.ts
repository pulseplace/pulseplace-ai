
import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Allow both GET (for verification) and POST (for actual webhook data)
  if (req.method === "GET") {
    console.log("Mailchimp webhook verification request received");
    // Return a simple success response for GET requests (used by Mailchimp for verification)
    return new Response(JSON.stringify({ status: "success", message: "Webhook endpoint ready" }), { 
      status: 200, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }

  // Only allow POST and GET requests
  if (req.method !== "POST") {
    console.error(`Invalid method: ${req.method}`);
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders })
  }

  try {
    // Read and log the raw payload for debugging
    const rawBody = await req.text();
    console.log("Raw Mailchimp webhook payload:", rawBody);
    
    // Parse the payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
      console.log("Parsed Mailchimp webhook payload:", payload);
    } catch (parseError) {
      console.error("Invalid JSON payload received:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }), 
        { 
          status: 400, 
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Validate payload has required fields
    if (!payload || !payload.type) {
      console.error("Malformed webhook payload - missing required fields");
      return new Response(
        JSON.stringify({ error: "Malformed webhook payload - missing required fields" }), 
        { 
          status: 400, 
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Log the webhook event type
    console.log(`Received Mailchimp ${payload.type} event`);

    // Extract relevant data based on event type
    let eventData = {
      event_type: payload.type,
      email: payload.data?.email || 'unknown',
      timestamp: new Date().toISOString(),
      list_id: payload.data?.list_id || 'unknown',
      raw_data: rawBody
    };

    // Store in Supabase
    const { data, error } = await supabase
      .from("mailchimp_events")
      .insert([eventData]);

    if (error) {
      console.error("Error storing webhook data in Supabase:", error);
      // Continue execution - don't fail the webhook just because storage failed
    } else {
      console.log("Successfully stored webhook data in Supabase");
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
})
