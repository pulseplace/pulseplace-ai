
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
    
    // Generate the styled email HTML
    const htmlContent = `
    <table style="font-family:sans-serif;width:100%;max-width:600px;margin:auto;background:#ffffff;padding:30px;border-radius:10px;border:1px solid #e5e7eb;">
      <tr>
        <td>
          <h2 style="color:#000000;font-weight:600;">You're Booked!</h2>
          <p style="color:#444;">Hi ${name},</p>
          <p style="color:#444;">Thank you for booking a session with PulsePlace.</p>
          <p style="color:#444;">
            We'll guide you through the certification process, show how PulseScore works, and answer any questions you have.
          </p>
          ${scheduledTime ? `<p style="color:#444;">Your session is scheduled for: <strong>${new Date(scheduledTime).toLocaleString()}</strong></p>` : ''}
          ${eventType ? `<p style="color:#444;">Session type: <strong>${eventType}</strong></p>` : ''}
          <div style="margin:24px 0;">
            <a href="https://pulseplace.ai" style="display:inline-block;background:#8E3BFF;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">Visit PulsePlace</a>
          </div>
          <p style="color:#888;font-size:13px;">Need help? Email us anytime at <a href="mailto:hello@pulseplace.ai">hello@pulseplace.ai</a></p>
        </td>
      </tr>
    </table>
    `;

    // Send email using Resend API with the default sender domain
    const emailData = {
      from: "PulsePlace <onboarding@resend.dev>",
      to: email,
      subject: "Your PulsePlace Demo is Confirmed!",
      html: htmlContent,
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
