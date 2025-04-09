
import { serve } from "https://deno.land/std@0.192.0/http/server.ts"

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Allow both GET (for verification) and POST (for actual webhook data)
  if (req.method === "GET") {
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
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    console.log("Mailchimp webhook received:", payload)

    // Optional: Store in Supabase
    // You can uncomment this code if you want to store the data
    // const supabaseUrl = Deno.env.get("SUPABASE_URL");
    // const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    // const supabase = createClient(supabaseUrl, supabaseKey);
    //
    // const { data, error } = await supabase
    //   .from("mailchimp_signups")
    //   .insert([{ email: payload.data.email }])
    //
    // if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    )
  }
})
