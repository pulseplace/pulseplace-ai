
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  meetingType: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Booking confirmation function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, date, time, meetingType }: BookingConfirmationRequest = await req.json();
    console.log(`Processing booking for ${name}, email: ${email}, date: ${date}, time: ${time}`);

    // Save to database if needed
    // const { data, error } = await supabaseAdmin.from('bookings').insert([{ name, email, date, time, meeting_type: meetingType }]);
    
    // Send email confirmation
    const emailResponse = await resend.emails.send({
      from: "PulsePlace <support@pulseplace.ai>",
      to: [email],
      subject: "Your PulsePlace Demo Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <img src="https://pulseplace.ai/logo.png" alt="PulsePlace Logo" style="display: block; width: 180px; margin-bottom: 20px;" />
          
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Booking Confirmation</h1>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Hi ${name},</p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Thank you for scheduling a ${meetingType} with us. We're looking forward to speaking with you!</p>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h2 style="color: #333; font-size: 18px; margin-top: 0;">Booking Details:</h2>
            <p style="color: #555; margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="color: #555; margin: 5px 0;"><strong>Time:</strong> ${time}</p>
            <p style="color: #555; margin: 5px 0;"><strong>Meeting Type:</strong> ${meetingType}</p>
          </div>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">You will receive a calendar invitation with meeting details shortly. If you need to reschedule, please contact us at support@pulseplace.ai.</p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Best regards,<br>The PulsePlace Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Booking confirmation sent successfully", 
      data: emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Start the server
console.log("Starting booking confirmation edge function");
serve(handler);
