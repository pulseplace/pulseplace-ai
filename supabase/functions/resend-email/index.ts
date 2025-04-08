
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
  replyTo?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if API key is configured
    if (!Deno.env.get("RESEND_API_KEY")) {
      console.error("Resend API key is not configured");
      throw new Error("Resend API key is not configured in Supabase secrets. Please set the RESEND_API_KEY secret.");
    }

    // Parse request body
    const { to, subject, html, text, fromName, fromEmail, replyTo }: EmailRequest = await req.json();
    
    // Validate required fields
    if (!to || !subject || !html) {
      console.error("Missing required fields:", { to, subject, hasHtml: !!html });
      return new Response(
        JSON.stringify({ error: "Missing required fields", details: { to: !!to, subject: !!subject, html: !!html } }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Log information about the email being sent (for debugging)
    console.log(`Email request received: TO: ${Array.isArray(to) ? to.join(', ') : to}, SUBJECT: ${subject}`);
    
    // Prepare recipients
    const recipients = Array.isArray(to) ? to : [to];

    // Prepare email data
    const emailData: any = {
      from: `${fromName || "PulsePlace"} <${fromEmail || "notifications@pulseplace.ai"}>`,
      to: recipients,
      subject: subject,
      html: html,
    };

    // Add text version if provided
    if (text) {
      emailData.text = text;
    }

    // Add reply-to if provided
    if (replyTo) {
      emailData.reply_to = replyTo;
    }

    console.log("Sending email via Resend:", JSON.stringify({
      ...emailData,
      html: emailData.html ? "HTML content (truncated)" : undefined
    }));

    // Send email using Resend API
    const response = await resend.emails.send(emailData);

    console.log("Resend API response:", response);
    
    if (response.error) {
      throw new Error(`Resend API error: ${response.error.message || JSON.stringify(response.error)}`);
    }

    console.log("Email sent successfully to:", Array.isArray(to) ? to.join(', ') : to);
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
