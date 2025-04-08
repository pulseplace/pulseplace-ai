
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificationEmailRequest {
  to: string;
  companyName: string;
  score: number;
  insights: any;
  certificationId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { to, companyName, score, insights, certificationId } = await req.json() as CertificationEmailRequest;
    
    console.log(`Sending certification email to ${to} for ${companyName}`);
    
    // In a real implementation, we would use Resend or another email service
    // For now, we'll just log the request and return success
    
    /* Example for implementation with Resend:
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { data, error } = await resend.emails.send({
      from: "PulsePlace.ai <certification@pulseplace.ai>",
      to: [to],
      subject: `${companyName} - PulseScore™ Certification`,
      html: certificateTemplate(companyName, score, insights),
    });
    
    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    */
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        certificateId: certificationId,
        message: "Certification email sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error in send-certification function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send certification email" 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});

// Helper function to generate email HTML template
function certificateTemplate(companyName: string, score: number, insights: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #4338ca; text-align: center;">${companyName} PulseScore™ Certification</h1>
      
      <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
        <p style="font-size: 18px; font-weight: bold; text-align: center;">
          Overall Score: ${score}/100 - Pulse Certified™
        </p>
      </div>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Executive Summary</h2>
      <p>${insights.summary}</p>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Key Strengths</h2>
      <ul>
        ${insights.strengths.map((strength: string) => `<li>${strength}</li>`).join('')}
      </ul>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Opportunities</h2>
      <ul>
        ${insights.opportunities.map((opportunity: string) => `<li>${opportunity}</li>`).join('')}
      </ul>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Recommended Actions</h2>
      <ul>
        ${insights.actionItems.map((action: string) => `<li>${action}</li>`).join('')}
      </ul>
      
      <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0; text-align: center;">
        <p style="font-style: italic; color: #4f46e5;">
          ${insights.certificateText || `${companyName} has demonstrated exceptional commitment to employee wellbeing and organizational health.`}
        </p>
        <p style="margin-top: 15px; font-size: 12px;">
          Issued on ${new Date().toLocaleDateString()} | Valid for 12 months
        </p>
      </div>
      
      <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
        This certification is issued by PulsePlace.ai based on employee feedback data.
      </p>
    </div>
  `;
}
