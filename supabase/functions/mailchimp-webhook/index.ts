
import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
import { corsHeaders, extractMailchimpData, supabase } from './utils.ts';
import { processSubscriberOptIn, processSubscriberTags } from './subscriberProcessor.ts';

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
