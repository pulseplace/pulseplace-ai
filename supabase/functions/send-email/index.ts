
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY") || "";

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
  templateId?: string;
  variables?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if API key is configured
    if (!MAILERSEND_API_KEY) {
      console.error("MailerSend API key is not configured");
      throw new Error("MailerSend API key is not configured in Supabase secrets. Please set the MAILERSEND_API_KEY secret.");
    }

    // Parse request body
    const { to, subject, html, text, fromName, fromEmail, replyTo, templateId, variables }: EmailRequest = await req.json();
    
    // Validate required fields
    if (!to || !subject || (!html && !templateId)) {
      console.error("Missing required fields:", { to, subject, hasHtml: !!html, hasTemplateId: !!templateId });
      return new Response(
        JSON.stringify({ error: "Missing required fields", details: { to: !!to, subject: !!subject, content: !!(html || templateId) } }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Log information about the email being sent (for debugging)
    console.log(`Email request received: TO: ${Array.isArray(to) ? to.join(', ') : to}, SUBJECT: ${subject}`);
    console.log(`Using API key: ${MAILERSEND_API_KEY ? "Configured (starts with " + MAILERSEND_API_KEY.substring(0, 3) + "...)" : "NOT CONFIGURED"}`);

    // Prepare recipients
    const recipients = Array.isArray(to) 
      ? to.map(email => ({ email })) 
      : [{ email: to }];

    // Prepare email data
    const emailData: any = {
      to: recipients,
      subject: subject,
    };

    // Handle template or direct HTML content
    if (templateId) {
      emailData.template_id = templateId;
      if (variables) {
        emailData.variables = variables;
      }
    } else {
      emailData.html = html;
      if (text) {
        emailData.text = text;
      }
    }

    // Set sender info
    emailData.from = {
      email: fromEmail || "no-reply@pulseplace.ai",
      name: fromName || "PulsePlace"
    };

    // Set reply-to if provided
    if (replyTo) {
      emailData.reply_to = { email: replyTo };
    }

    console.log("Sending email via MailerSend:", JSON.stringify({
      ...emailData,
      html: emailData.html ? "HTML content (truncated)" : undefined
    }));

    // Send email using MailerSend API
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(emailData)
    });

    // Get response as text first for logging
    const responseText = await response.text();
    console.log("MailerSend API raw response:", responseText);
    
    // Parse JSON response (if possible)
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { text: responseText };
      console.error("Error parsing response JSON:", e);
    }
    
    // Log response status for debugging
    console.log("MailerSend API response status:", response.status);
    
    if (!response.ok) {
      console.error("MailerSend API error:", responseData);
      return new Response(
        JSON.stringify({ 
          error: "MailerSend API error", 
          status: response.status, 
          details: responseData 
        }),
        { 
          status: response.status, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log("Email sent successfully to:", Array.isArray(to) ? to.join(', ') : to);
    return new Response(
      JSON.stringify({ success: true, data: responseData }),
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
