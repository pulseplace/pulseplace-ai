
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  name: string;
  email: string;
  eventType?: string;
  scheduledTime?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { name, email, eventType, scheduledTime }: BookingConfirmationRequest = await req.json();
    
    // Validate required fields
    if (!name || !email) {
      console.error("Missing required fields:", { name, email });
      return new Response(
        JSON.stringify({ error: "Missing required fields", details: { name: !!name, email: !!email } }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Log information about the email being sent
    console.log(`Sending booking confirmation email to: ${email}, name: ${name}`);
    
    // Send email using the verified domain
    const emailData = {
      from: "PulsePlace <hello@pulseplace.ai>",
      to: email,
      subject: "Your PulsePlace Booking is Confirmed",
      html: `
        <h2>You're Booked!</h2>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for booking a session with PulsePlace.</p>
        ${scheduledTime ? `<p>Your session is scheduled for <strong>${new Date(scheduledTime).toLocaleString()}</strong>.</p>` : ''}
        <p>We'll walk you through PulseScore and our culture certification process.</p>
        <br>
        <p>Team PulsePlace</p>
      `
    };

    console.log("Sending email via Resend");
    const response = await resend.emails.send(emailData);

    if (response.error) {
      console.error("Resend API error:", response.error);
      throw new Error(`Resend API error: ${response.error.message || JSON.stringify(response.error)}`);
    }

    console.log("Email sent successfully to:", email);
    return new Response(
      JSON.stringify({ success: true, data: response }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
