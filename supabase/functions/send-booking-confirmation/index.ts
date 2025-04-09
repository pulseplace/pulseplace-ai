
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
    
    // Format the date if provided
    const formattedDate = scheduledTime ? 
      new Date(scheduledTime).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      }) : null;
    
    // Send email using the verified domain with improved branding
    const emailData = {
      from: "PulsePlace <hello@pulseplace.ai>",
      to: email,
      subject: "Your PulsePlace Booking is Confirmed",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #1A1A2E; 
              margin: 0; 
              padding: 0; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
            }
            .logo { 
              max-width: 180px; 
              margin-bottom: 20px; 
            }
            h2 { 
              color: #3F8CFF; 
              margin-bottom: 20px; 
            }
            .content { 
              background-color: #F7F9FB; 
              border-radius: 8px; 
              padding: 25px; 
              margin-bottom: 20px; 
            }
            .schedule-box {
              background-color: #E5DEFF;
              border-left: 4px solid #8B5CF6;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .signature { 
              margin-top: 30px; 
            }
            .footer { 
              text-align: center; 
              font-size: 12px; 
              color: #8A888A; 
              margin-top: 30px; 
              padding-top: 15px; 
              border-top: 1px solid #E5DEFF; 
            }
            .footer a { 
              color: #3F8CFF; 
              text-decoration: none; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hamqupvdhlfznwnuohsh.supabase.co/storage/v1/object/public/pulse-assets/pulseplace-logo.png" alt="PulsePlace Logo" class="logo">
              <h2>You're Booked!</h2>
            </div>
            
            <div class="content">
              <p>Hi ${name || 'there'},</p>
              
              <p>Thank you for booking a session with PulsePlace. We're excited to connect with you!</p>
              
              ${formattedDate ? `
              <div class="schedule-box">
                <strong>Your session is scheduled for:</strong><br>
                ${formattedDate}
              </div>
              ` : ''}
              
              <p>During our session, we'll walk you through:</p>
              <ul>
                <li>PulseScore™ overview and methodology</li>
                <li>Our culture certification process</li>
                <li>How your organization can benefit from our platform</li>
              </ul>
              
              <p>If you need to reschedule, please <a href="https://calendly.com/vishal-pulseplace/30min" style="color: #3F8CFF;">click here</a> to select a new time.</p>
              
              <div class="signature">
                <p>Looking forward to our conversation,<br>Team PulsePlace</p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 PulsePlace.ai | <a href="https://pulseplace.ai/terms">Terms</a> | <a href="https://pulseplace.ai/privacy">Privacy</a></p>
              <p>Questions? Email us at <a href="mailto:hello@pulseplace.ai">hello@pulseplace.ai</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      categories: ["booking-confirmation"]
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
