
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  surveyStatus: string;
  lastActive: string;
}

interface ThemeScore {
  theme: string;
  score: number;
}

interface PdfReportRequest {
  departmentFilter?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  companyName: string;
  teamMembers: TeamMember[];
  summaryStats: {
    participationRate: number;
    averageScore: number;
    completedSurveys: number;
    pendingSurveys: number;
    themeScores: ThemeScore[];
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const payload: PdfReportRequest = await req.json();
    
    // Validate the request
    if (!payload.teamMembers || !payload.summaryStats) {
      throw new Error("Missing required fields in request");
    }
    
    // For now, we'll simulate PDF generation
    // In a real implementation, we would use a library or service
    // to generate a PDF file
    
    console.log(`Generating PDF report for ${payload.departmentFilter || 'All Departments'}`);
    
    // Simulate a brief delay (PDF generation takes time)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a mock URL to a PDF file
    // In a real implementation, this would be a link to the generated PDF
    const mockPdfUrl = "https://hamqupvdhlfznwnuohsh.supabase.co/storage/v1/object/public/reports/mock-report.pdf";
    
    return new Response(
      JSON.stringify({
        success: true,
        url: mockPdfUrl,
        message: "PDF report generated successfully"
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
    console.error("Error generating PDF report:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to generate PDF report"
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
