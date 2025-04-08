
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Get OpenAI API key from environment variable
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define message types
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  maxTokens?: number;
}

// System prompt for the PulseBot assistant
const SYSTEM_PROMPT = `You are PulseBot, the helpful AI assistant for PulsePlace.ai, a platform that helps organizations assess and improve their workplace culture through surveys and certification.

Your role is to assist users with:
- Understanding workplace culture assessment
- Navigating the PulseScore certification process
- Interpreting dashboard data and insights
- Using the platform's features effectively
- Learning about workplace culture best practices

Always be friendly, concise, and helpful. If you don't know something, admit it rather than making up information. When appropriate, suggest relevant features of the platform that might help the user.

Key platform concepts to know:
- PulseScore: A metric that quantifies workplace culture health
- Culture Certification: A recognition program for organizations with healthy cultures
- Pulse Surveys: Short, regular surveys to measure workplace sentiment
- AI Insights: Machine learning-based analysis of survey responses
- Thematic Buckets: Categories for grouping and analyzing feedback

Maintain a positive, encouraging tone and focus on helping organizations improve their workplace culture.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured in environment variables");
    }

    // Parse request body
    const { messages, maxTokens = 500 }: ChatRequest = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request format. 'messages' array is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Ensure we don't exceed reasonable token limits
    const safeMaxTokens = Math.min(maxTokens, 1000);
    
    // Add system message if not present
    let requestMessages = [...messages];
    if (!requestMessages.some(msg => msg.role === "system")) {
      requestMessages.unshift({
        role: "system",
        content: SYSTEM_PROMPT
      });
    }

    // Log request for debugging
    console.log(`Processing chat request with ${requestMessages.length} messages`);
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: requestMessages,
        max_tokens: safeMaxTokens,
        temperature: 0.7
      }),
    });

    // Check for errors in the OpenAI response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    // Parse and return the response
    const data = await response.json();
    const assistantMessage = data.choices[0].message;
    
    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ask-pulsebot function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
