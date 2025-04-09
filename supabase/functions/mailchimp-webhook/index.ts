
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

// Define a type for supported Mailchimp event types
type MailchimpEventType = 
  | 'subscribe' 
  | 'unsubscribe' 
  | 'profile' 
  | 'upemail' 
  | 'cleaned' 
  | 'campaign'
  | 'confirm';  // Added confirm event type for double opt-in

// Define a type for the mailchimp tags
interface MailchimpTag {
  id: number;
  name: string;
}

// Define a type for the mailchimp event data
interface MailchimpEventData {
  email: string;
  list_id: string;
  tags?: MailchimpTag[];
  interests?: Record<string, boolean>;
  merges?: Record<string, string>; // MERGE fields like FNAME, LNAME
}

// Define a type for the processed event data
interface EventData {
  event_type: string;
  email: string | null;
  timestamp: string;
  list_id: string | null;
  raw_data: string;
  tags?: MailchimpTag[];
  interests?: Record<string, boolean>;
  merges?: Record<string, string>;
}

// Helper function to extract tags, interests, and merge fields
function extractMailchimpData(rawPayload: string): EventData | null {
  try {
    // Parse the payload
    const payload = JSON.parse(rawPayload);
    
    if (!payload || !payload.type) {
      console.error("Malformed webhook payload - missing required fields");
      return null;
    }

    // Initialize the event data with standard fields
    const eventData: EventData = {
      event_type: payload.type,
      email: payload.data?.email || null,
      timestamp: new Date().toISOString(),
      list_id: payload.data?.list_id || null,
      raw_data: rawPayload
    };

    // Extract tags from the payload (if available)
    if (payload.data?.tags && Array.isArray(payload.data.tags)) {
      eventData.tags = payload.data.tags;
    }

    // Extract interest groups (if available)
    if (payload.data?.interests && typeof payload.data.interests === 'object') {
      eventData.interests = payload.data.interests;
    }

    // Extract merge fields like FNAME, LNAME (if available)
    if (payload.data?.merges && typeof payload.data.merges === 'object') {
      eventData.merges = payload.data.merges;
    }

    return eventData;
  } catch (error) {
    console.error("Error extracting Mailchimp data:", error);
    return null;
  }
}

// Helper function to process subscription events
async function processSubscriberOptIn(email: string, isConfirmed: boolean): Promise<void> {
  if (!email) {
    return;
  }

  try {
    console.log(`Processing ${isConfirmed ? 'confirmed' : 'unconfirmed'} opt-in for subscriber: ${email}`);

    // Check if we have a profiles table with this user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (profileError) {
      console.error("Error finding user profile:", profileError);
      return;
    }

    if (profileData) {
      // Update the user's profile with the opt-in status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          confirmed_opt_in: isConfirmed,
          updated_at: new Date().toISOString() 
        })
        .eq('id', profileData.id);

      if (updateError) {
        console.error("Error updating user profile with opt-in status:", updateError);
      } else {
        console.log(`Successfully updated profile with opt-in status (${isConfirmed}) for user: ${email}`);
      }
    } else {
      console.log(`No profile found for email: ${email}, opt-in status won't be stored`);
    }
  } catch (error) {
    console.error("Error processing subscriber opt-in:", error);
  }
}

// Helper function to process tags for a subscriber
async function processSubscriberTags(email: string, tags?: MailchimpTag[]): Promise<void> {
  if (!tags || tags.length === 0 || !email) {
    return;
  }

  try {
    console.log(`Processing ${tags.length} tags for subscriber: ${email}`);

    // Check if we have a profiles table with this user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (profileError) {
      console.error("Error finding user profile:", profileError);
      return;
    }

    if (profileData) {
      // Update the user's profile with the new tags
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          mailchimp_tags: tags.map(tag => tag.name),
          updated_at: new Date().toISOString() 
        })
        .eq('id', profileData.id);

      if (updateError) {
        console.error("Error updating user profile with tags:", updateError);
      } else {
        console.log(`Successfully updated profile with tags for user: ${email}`);
      }
    } else {
      console.log(`No profile found for email: ${email}, tags won't be stored`);
    }
  } catch (error) {
    console.error("Error processing subscriber tags:", error);
  }
}

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
    
    // Extract and process the Mailchimp data
    const eventData = extractMailchimpData(rawBody);
    
    if (!eventData) {
      return new Response(
        JSON.stringify({ error: "Failed to extract data from payload" }), 
        { 
          status: 400, 
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    console.log(`Received Mailchimp ${eventData.event_type} event for ${eventData.email}`);

    // Check if this is a confirmation event
    const isConfirmEvent = eventData.event_type === 'confirm';
    const currentTime = new Date().toISOString();

    // Store in Supabase with confirmation timestamp if applicable
    const { data, error } = await supabase
      .from("mailchimp_events")
      .insert([{
        event_type: eventData.event_type,
        email: eventData.email,
        timestamp: eventData.timestamp,
        list_id: eventData.list_id,
        raw_data: rawBody,
        confirmed_at: isConfirmEvent ? currentTime : null
      }]);

    if (error) {
      console.error("Error storing webhook data in Supabase:", error);
      // Continue execution - don't fail the webhook just because storage failed
    } else {
      console.log("Successfully stored webhook data in Supabase");
    }

    // Process subscriber opt-in status if this is a subscription or confirmation event
    if (eventData.email) {
      if (isConfirmEvent) {
        // For confirmation events, mark the user as confirmed
        await processSubscriberOptIn(eventData.email, true);
      } else if (eventData.event_type === 'subscribe') {
        // For subscribe events without confirmation, we still process but don't mark as confirmed
        // If using double opt-in, this would be the initial subscription
        await processSubscriberOptIn(eventData.email, false);
      }
    }

    // Process subscriber tags if this is a subscribe, confirm, or profile update event
    if ((eventData.event_type === 'subscribe' || eventData.event_type === 'confirm' || eventData.event_type === 'profile') && eventData.email) {
      await processSubscriberTags(eventData.email, eventData.tags);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error: any) {
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
