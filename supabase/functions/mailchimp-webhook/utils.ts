
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { EventData, MailchimpTag } from './types.ts';

// Define CORS headers
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to extract tags, interests, and merge fields
export function extractMailchimpData(rawPayload: string): EventData | null {
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
