
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

// Define the request body formats
interface FullRequestFormat {
  messages: Message[];
  systemPrompt?: string;
  maxTokens?: number;
  userIdentifier?: string;
}

interface SimpleRequestFormat {
  message: string;
  language?: string;
}

type RequestBody = FullRequestFormat | SimpleRequestFormat;

// Default system prompt as fallback
const DEFAULT_SYSTEM_PROMPT = `You are PulseBot, the helpful AI assistant for PulsePlace.ai, a platform that helps organizations assess and improve their workplace culture through surveys and certification.

Your role is to assist users with understanding workplace culture assessment, navigating the PulseScore certification process, and using the platform effectively.`;

// Language-specific system prompts
const LANGUAGE_PROMPTS: Record<string, string> = {
  en: DEFAULT_SYSTEM_PROMPT,
  es: `Eres PulseBot, el asistente de IA de PulsePlace.ai, una plataforma que ayuda a las organizaciones a evaluar y mejorar su cultura laboral a través de encuestas y certificación.`,
  fr: `Vous êtes PulseBot, l'assistant IA de PulsePlace.ai, une plateforme qui aide les organisations à évaluer et à améliorer leur culture de travail par le biais d'enquêtes et de certification.`,
  de: `Sie sind PulseBot, der KI-Assistent von PulsePlace.ai, einer Plattform, die Organisationen dabei hilft, ihre Arbeitsplatzkultur durch Umfragen und Zertifizierungen zu bewerten und zu verbessern.`
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const requestData = await req.json();
    
    // Determine if the request is using the simple format or the full format
    const isSimpleFormat = "message" in requestData;
    
    let messages: Message[] = [];
    let systemPrompt = DEFAULT_SYSTEM_PROMPT;
    let maxTokens = 500;
    let userIdentifier = undefined;
    
    if (isSimpleFormat) {
      // Handle simple format (for testing)
      const { message, language = "en" } = requestData as SimpleRequestFormat;
      
      // Use language-specific system prompt if available
      systemPrompt = LANGUAGE_PROMPTS[language] || DEFAULT_SYSTEM_PROMPT;
      
      // Create a single user message
      messages = [{ role: "user", content: message }];
      
      console.log(`Processing simple request format with message: "${message.substring(0, 50)}..."`);
    } else {
      // Handle full format (for production use)
      const { 
        messages: requestMessages, 
        systemPrompt: requestSystemPrompt, 
        maxTokens: requestMaxTokens,
        userIdentifier: requestUserIdentifier
      } = requestData as FullRequestFormat;
      
      messages = requestMessages;
      systemPrompt = requestSystemPrompt || DEFAULT_SYSTEM_PROMPT;
      maxTokens = requestMaxTokens || 500;
      userIdentifier = requestUserIdentifier;
      
      console.log(`Processing full request format with ${messages.length} messages`);
    }

    // Ensure we don't exceed reasonable token limits
    const safeMaxTokens = Math.min(maxTokens, 1500);
    
    // Add system message if not present
    if (!messages.some(msg => msg.role === "system")) {
      messages = [{ role: "system", content: systemPrompt }, ...messages];
    }

    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "OPENAI_API_KEY") {
      console.log("OpenAI API key is missing or not properly configured");
      return new Response(
        JSON.stringify({
          message: {
            role: "assistant",
            content: "I'm currently experiencing technical difficulties connecting to my knowledge base. Please try again later or contact support if this persists."
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    try {
      // Determine if this is an analytics request
      const isAnalyticsRequest = systemPrompt.includes('analytics assistant');
      
      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: isAnalyticsRequest ? "gpt-4o-mini" : "gpt-4o-mini",
          messages,
          max_tokens: safeMaxTokens,
          temperature: isAnalyticsRequest ? 0.3 : 0.7,
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
      
      // Log request completion
      if (isSimpleFormat) {
        console.log(`Simple request processed successfully. Response: "${assistantMessage.content.substring(0, 50)}..."`);
      } else {
        console.log(`Full request processed successfully. User ID: ${userIdentifier || 'anonymous'}`);
      }
      
      return new Response(
        JSON.stringify({ message: assistantMessage }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // Provide fallback response
      return new Response(
        JSON.stringify({
          message: {
            role: "assistant",
            content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment."
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in ask-pulsebot function:", error);
    
    return new Response(
      JSON.stringify({ 
        message: {
          role: "assistant",
          content: "I'm sorry, I encountered an unexpected error. Please try again with a different question or contact support if the issue persists."
        }
      }),
      { 
        status: 200, // Return 200 to prevent UI from breaking
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
