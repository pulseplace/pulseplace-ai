
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for the function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request payload
    const payload = await req.json();
    console.log("Received Calendly webhook payload:", JSON.stringify(payload));

    // Extract booking details from the payload
    const booking = {
      email: payload.payload?.email || payload.invitee?.email,
      name: payload.payload?.name || payload.invitee?.name,
      event_type: payload.event_type?.name || payload.event?.name,
      scheduled_time: payload.payload?.scheduled_event_time || payload.scheduled_time,
      created_at: new Date(),
    };

    console.log("Inserting booking data:", JSON.stringify(booking));

    // Insert the booking into the demo_bookings table
    const { data, error } = await supabase
      .from('demo_bookings')
      .insert(booking);

    if (error) {
      console.error("Error inserting booking:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ status: 'ok', data }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
