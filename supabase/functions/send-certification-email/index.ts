
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificationEmailRequest {
  recipientEmail: string;
  companyName: string;
  departmentName: string;
  certificationId: string;
  pulseScore: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
  insights?: {
    summary: string;
    strengths: string[];
    opportunities: string[];
    actionItems: string[];
  };
  expiryDate?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log("Certification email function triggered");
    
    const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY");
    
    if (!MAILERSEND_API_KEY) {
      console.error("MailerSend API key not configured in Supabase secrets");
      throw new Error("MailerSend API key is not configured");
    }

    const payload: CertificationEmailRequest = await req.json();
    console.log(`Processing certification email request for ${payload.departmentName || payload.companyName}`);
    
    // Validate required fields
    if (!payload.recipientEmail || !payload.companyName || !payload.pulseScore) {
      console.error("Missing required fields in certification email request", {
        hasEmail: !!payload.recipientEmail, 
        hasCompany: !!payload.companyName, 
        hasScore: !!payload.pulseScore
      });
      throw new Error("Missing required fields in request");
    }
    
    console.log(`Sending certification email to ${payload.recipientEmail} for ${payload.departmentName || payload.companyName}`);
    
    // Generate certification level based on score
    const certificationLevel = getCertificationLevel(payload.pulseScore);
    console.log(`Certification level determined: ${certificationLevel}`);
    
    // Generate HTML for the email
    const htmlContent = generateCertificationEmail(payload, certificationLevel);
    
    // Send email using MailerSend API
    console.log("Sending email via MailerSend API");
    const mailersendResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        to: [{ email: payload.recipientEmail }],
        from: {
          email: "certification@pulseplace.ai",
          name: "PulsePlace Certification"
        },
        subject: `${payload.departmentName || payload.companyName} has achieved ${certificationLevel} certification!`,
        html: htmlContent
      })
    });
    
    if (!mailersendResponse.ok) {
      const errorText = await mailersendResponse.text();
      console.error("MailerSend API error:", errorText);
      throw new Error(`MailerSend API error: ${mailersendResponse.status} ${errorText}`);
    }
    
    const responseData = await mailersendResponse.json();
    console.log("Email sent successfully:", responseData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Certification email sent successfully",
        data: {
          certificationId: payload.certificationId,
          mailersendResponse: responseData
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Error sending certification email:", error);
    
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

// Helper function to determine certification level based on score
function getCertificationLevel(score: number): string {
  if (score >= 90) return "Pulse Certified™ Gold";
  if (score >= 80) return "Pulse Certified™";
  if (score >= 70) return "Silver Recognition";
  return "Emerging Culture";
}

// Generate HTML email template
function generateCertificationEmail(data: CertificationEmailRequest, certificationLevel: string): string {
  const expiryDateStr = data.expiryDate 
    ? new Date(data.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const insights = data.insights || {
    summary: `${data.departmentName || data.companyName} has demonstrated a strong commitment to workplace culture and employee wellbeing.`,
    strengths: ["Team collaboration", "Leadership communication", "Employee engagement"],
    opportunities: ["Consider additional wellbeing initiatives", "Continue to foster open communication"],
    actionItems: ["Share certification with your team", "Display certification badge on your website"]
  };
  
  // Group theme scores by performance level
  const strongThemes = data.themeScores.filter(t => t.score >= 80).map(t => t.theme);
  const averageThemes = data.themeScores.filter(t => t.score >= 60 && t.score < 80).map(t => t.theme);
  const improvementThemes = data.themeScores.filter(t => t.score < 60).map(t => t.theme);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://hamqupvdhlfznwnuohsh.supabase.co/storage/v1/object/public/pulse-assets/certification-header.png" alt="PulsePlace Certification" style="max-width: 100%; height: auto;">
      </div>
      
      <h1 style="color: #4338ca; text-align: center; font-size: 24px; margin-bottom: 20px;">
        ${data.departmentName || data.companyName} has achieved ${certificationLevel}!
      </h1>
      
      <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; font-weight: bold; margin: 0;">
          Overall PulseScore™: ${data.pulseScore}/100
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 5px;">
          Certification valid until: ${expiryDateStr}
        </p>
      </div>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; font-size: 18px;">
        Executive Summary
      </h2>
      <p style="line-height: 1.6; margin-bottom: 20px;">
        ${insights.summary}
      </p>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; font-size: 18px;">
        Performance Areas
      </h2>
      
      ${strongThemes.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #22c55e; margin-bottom: 5px;">Strengths</h3>
        <ul style="margin-top: 5px;">
          ${strongThemes.map(theme => `<li>${theme}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${averageThemes.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #eab308; margin-bottom: 5px;">Performing Well</h3>
        <ul style="margin-top: 5px;">
          ${averageThemes.map(theme => `<li>${theme}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${improvementThemes.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #ef4444; margin-bottom: 5px;">Improvement Areas</h3>
        <ul style="margin-top: 5px;">
          ${improvementThemes.map(theme => `<li>${theme}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 30px; font-size: 18px;">
        Recommended Actions
      </h2>
      <ul style="line-height: 1.6; margin-bottom: 30px;">
        ${insights.actionItems.map(item => `<li>${item}</li>`).join('')}
      </ul>
      
      <div style="background-color: #f0f7ff; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="margin-bottom: 15px;">
          Download your certification badge to display on your website and marketing materials:
        </p>
        <a href="https://app.pulseplace.ai/certification/${data.certificationId}" style="background-color: #4338ca; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Download Badge
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; margin-top: 30px;">
        This certification is issued by PulsePlace.ai based on employee feedback data.<br>
        © ${new Date().getFullYear()} PulsePlace.ai. All rights reserved.
      </p>
    </div>
  `;
}
