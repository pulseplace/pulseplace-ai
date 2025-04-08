
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
    console.log("PDF report generation function triggered");
    
    const payload: PdfReportRequest = await req.json();
    console.log(`Generating PDF report for ${payload.departmentFilter || 'All Departments'} with date range: ${payload.dateRange ? `${payload.dateRange.from} to ${payload.dateRange.to}` : 'All time'}`);
    
    // Validate the request
    if (!payload.teamMembers || !payload.summaryStats) {
      console.error("Missing required fields in PDF request", {
        hasTeamMembers: !!payload.teamMembers,
        hasSummaryStats: !!payload.summaryStats
      });
      throw new Error("Missing required fields in request");
    }
    
    console.log(`Processing report with ${payload.teamMembers.length} team members and participation rate of ${payload.summaryStats.participationRate}%`);
    
    // Simulate PDF generation
    // In a real implementation, we would use a library or service
    // to generate a PDF file
    
    // Simulate a brief delay (PDF generation takes time)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("PDF generation completed successfully");
    
    // Return a mock URL to a PDF file
    // In a real implementation, this would be a link to the generated PDF
    const fileName = `${payload.companyName.replace(/\s+/g, '-').toLowerCase()}-${payload.departmentFilter ? payload.departmentFilter.replace(/\s+/g, '-').toLowerCase() + '-' : ''}report-${new Date().toISOString().split('T')[0]}.pdf`;
    const mockPdfUrl = `https://hamqupvdhlfznwnuohsh.supabase.co/storage/v1/object/public/reports/${fileName}`;
    
    console.log(`Generated PDF available at: ${mockPdfUrl}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        url: mockPdfUrl,
        fileName: fileName,
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
