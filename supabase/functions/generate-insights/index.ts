
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SentimentData {
  category: string;
  score: number;
  responses: Array<{
    question: string;
    response: string;
    sentiment: "positive" | "neutral" | "negative";
  }>;
}

interface InsightRequest {
  companyName: string;
  departmentName?: string;
  overallScore: number;
  categoryScores: Array<{
    category: string;
    score: number;
    weight: number;
  }>;
  sentimentData: SentimentData[];
  certificationType: string;
  responseCount: number;
  previousScore?: number;
}

interface InsightResponse {
  summary: string;
  strengths: string[];
  opportunities: string[];
  actionItems: string[];
  certificateText: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if API key is configured
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      throw new Error("OpenAI API key is not configured in Supabase secrets. Please set the OPENAI_API_KEY secret.");
    }

    // Parse request body
    const requestData: InsightRequest = await req.json();
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    console.log("Generating insights for:", requestData.companyName);
    
    // Prepare the context for the prompt
    const categoryScoreText = requestData.categoryScores.map(c => 
      `${formatCategoryName(c.category)}: ${c.score}/100`).join(", ");
    
    // Format response data for prompt
    const sentimentSummary = requestData.sentimentData.map(category => {
      const positiveCount = category.responses.filter(r => r.sentiment === "positive").length;
      const neutralCount = category.responses.filter(r => r.sentiment === "neutral").length;
      const negativeCount = category.responses.filter(r => r.sentiment === "negative").length;
      
      // Get example responses for each sentiment
      const positiveExample = category.responses.find(r => r.sentiment === "positive")?.response || "";
      const negativeExample = category.responses.find(r => r.sentiment === "negative")?.response || "";
      
      return `${formatCategoryName(category.category)} (Score: ${category.score}/100):
- Positive responses: ${positiveCount} (e.g. "${positiveExample}")
- Neutral responses: ${neutralCount}
- Negative responses: ${negativeCount} (e.g. "${negativeExample}")`;
    }).join("\n\n");
    
    // Build the prompt
    const prompt = `
You are an expert workplace culture analyst for PulsePlace.ai, which provides AI-powered workplace certification. 
You've analyzed survey data from ${requestData.companyName}${requestData.departmentName ? ` (${requestData.departmentName} department)` : ""} with ${requestData.responseCount} employee responses.

COMPANY SCORE DATA:
- Overall PulseScore: ${requestData.overallScore}/100 ${requestData.previousScore ? `(previous score: ${requestData.previousScore}/100)` : ""}
- Certification level: ${requestData.certificationType}
- Category scores: ${categoryScoreText}

SENTIMENT ANALYSIS:
${sentimentSummary}

Based on this data, provide:
1. A concise executive summary of their workplace culture (3-5 sentences)
2. Three key strengths with specific examples
3. Three opportunities for improvement with specific examples
4. Three actionable recommendations
5. A short official certification text (2 sentences that can be used on their certificate)

Response should be professional, data-driven, and actionable. Focus on patterns in the sentiment data.
`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a workplace culture expert providing data-driven insights." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    // Process the response
    const aiResponse = completion.choices[0].message.content || "";
    console.log("AI response received, processing...");
    
    // Parse the AI response to extract the different sections
    const insights = parseAIResponse(aiResponse);

    return new Response(
      JSON.stringify(insights),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error generating insights:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});

function formatCategoryName(category: string): string {
  // Convert snake_case or camelCase to Title Case with spaces
  return category
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^\w/, c => c.toUpperCase())
    .trim();
}

function parseAIResponse(text: string): InsightResponse {
  const result: InsightResponse = {
    summary: "",
    strengths: [],
    opportunities: [],
    actionItems: [],
    certificateText: ""
  };
  
  // Try to extract each section based on common patterns
  const summaryMatch = text.match(/(?:Executive Summary:|1\.)(.*?)(?=(?:\n\n|\n2\.|$))/s);
  if (summaryMatch) {
    result.summary = summaryMatch[1].trim();
  }
  
  // Extract strengths
  const strengthsSection = text.match(/(?:Key Strengths:|Strengths:|2\.)(.*?)(?=(?:\n\n|\n3\.|$))/s);
  if (strengthsSection) {
    const strengthsList = strengthsSection[1].match(/(?:-|\d+\.)\s+(.*?)(?=\n(?:-|\d+\.)|$)/gs);
    if (strengthsList) {
      result.strengths = strengthsList.map(s => 
        s.replace(/(?:-|\d+\.)\s+/, '').trim()
      ).filter(s => s);
    }
  }
  
  // Extract opportunities
  const opportunitiesSection = text.match(/(?:Opportunities for Improvement:|Opportunities:|3\.)(.*?)(?=(?:\n\n|\n4\.|$))/s);
  if (opportunitiesSection) {
    const opportunitiesList = opportunitiesSection[1].match(/(?:-|\d+\.)\s+(.*?)(?=\n(?:-|\d+\.)|$)/gs);
    if (opportunitiesList) {
      result.opportunities = opportunitiesList.map(s => 
        s.replace(/(?:-|\d+\.)\s+/, '').trim()
      ).filter(s => s);
    }
  }
  
  // Extract action items
  const actionItemsSection = text.match(/(?:Actionable Recommendations:|Recommendations:|4\.)(.*?)(?=(?:\n\n|\n5\.|$))/s);
  if (actionItemsSection) {
    const actionItemsList = actionItemsSection[1].match(/(?:-|\d+\.)\s+(.*?)(?=\n(?:-|\d+\.)|$)/gs);
    if (actionItemsList) {
      result.actionItems = actionItemsList.map(s => 
        s.replace(/(?:-|\d+\.)\s+/, '').trim()
      ).filter(s => s);
    }
  }
  
  // Extract certification text
  const certTextSection = text.match(/(?:Certification Text:|Certificate Text:|5\.)(.*?)(?=$)/s);
  if (certTextSection) {
    result.certificateText = certTextSection[1].trim();
  }
  
  // If parsing failed, use basic fallbacks
  if (!result.summary) {
    const firstParagraph = text.split('\n\n')[0];
    result.summary = firstParagraph;
  }
  
  return result;
}
