
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY");

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificationData {
  companyName: string;
  departmentName?: string;
  recipientEmail: string;
  pulseScore: number;
  categories: {
    name: string;
    score: number;
  }[];
  certificateId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log("Certification request received");
    
    if (!MAILERSEND_API_KEY) {
      console.error("MAILERSEND_API_KEY not configured");
      throw new Error("Email service not configured correctly");
    }

    // Parse the request body
    const data: CertificationData = await req.json();
    console.log(`Processing certification for ${data.companyName}, score: ${data.pulseScore}`);
    
    // Validate required fields
    if (!data.recipientEmail || !data.companyName || !data.pulseScore || !data.categories) {
      throw new Error("Missing required certification data");
    }
    
    // Determine certification level based on score
    const certificationLevel = getCertificationLevel(data.pulseScore);
    
    // Prepare email content
    const emailContent = generateCertificationEmail(data, certificationLevel);
    
    // Send email using MailerSend
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        to: [{ email: data.recipientEmail }],
        from: {
          email: "certification@pulseplace.ai",
          name: "PulsePlace Certification"
        },
        subject: `${data.companyName} has achieved ${certificationLevel} certification!`,
        html: emailContent
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("MailerSend API error:", errorText);
      throw new Error(`Email service error: ${response.status}`);
    }
    
    const responseData = await response.json();
    console.log("Certification email sent:", responseData);
    
    // Log the certification in the database
    // This would typically insert a record into a certifications table
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Certification email sent successfully",
        certificateLevel: certificationLevel,
        certificateId: data.certificateId
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
    console.error("Error processing certification:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to process certification"
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

// Generate HTML email template for certification
function generateCertificationEmail(data: CertificationData, certificationLevel: string): string {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  const expiryDateFormatted = expiryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Group categories by performance level
  const strongCategories = data.categories.filter(c => c.score >= 80).map(c => c.name);
  const averageCategories = data.categories.filter(c => c.score >= 60 && c.score < 80).map(c => c.name);
  const improvementCategories = data.categories.filter(c => c.score < 60).map(c => c.name);
  
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
          Certification valid until: ${expiryDateFormatted}
        </p>
      </div>
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; font-size: 18px;">
        Performance Categories
      </h2>
      
      ${strongCategories.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #22c55e; margin-bottom: 5px;">Strengths</h3>
        <ul style="margin-top: 5px;">
          ${strongCategories.map(cat => `<li>${cat}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${averageCategories.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #eab308; margin-bottom: 5px;">Performing Well</h3>
        <ul style="margin-top: 5px;">
          ${averageCategories.map(cat => `<li>${cat}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${improvementCategories.length > 0 ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 16px; color: #ef4444; margin-bottom: 5px;">Improvement Areas</h3>
        <ul style="margin-top: 5px;">
          ${improvementCategories.map(cat => `<li>${cat}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 30px; font-size: 18px;">
        Next Steps
      </h2>
      <ul style="line-height: 1.6; margin-bottom: 30px;">
        <li>Share this achievement with your team</li>
        <li>Display your certification badge on your website</li>
        <li>Continue monitoring your PulseScore™ to maintain certification</li>
        <li>Schedule a debrief session with your team</li>
      </ul>
      
      <div style="background-color: #f0f7ff; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="margin-bottom: 15px;">
          Download your certification badge for your website and marketing materials:
        </p>
        <a href="https://app.pulseplace.ai/certification/${data.certificateId}" style="background-color: #4338ca; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
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
