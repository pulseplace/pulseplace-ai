
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

Your role is to assist users with understanding workplace culture assessment, navigating the PulseScore certification process, and using the platform effectively.

Be friendly, helpful, and concise in your responses. Use emoji in your responses occasionally to maintain a friendly tone.`;

// Language-specific system prompts
const LANGUAGE_PROMPTS: Record<string, string> = {
  en: DEFAULT_SYSTEM_PROMPT,
  es: `Eres PulseBot, el asistente de IA de PulsePlace.ai, una plataforma que ayuda a las organizaciones a evaluar y mejorar su cultura laboral a través de encuestas y certificación. Mantén un tono amable y utiliza emojis ocasionalmente.`,
  fr: `Vous êtes PulseBot, l'assistant IA de PulsePlace.ai, une plateforme qui aide les organisations à évaluer et à améliorer leur culture de travail par le biais d'enquêtes et de certification. Soyez amical et utilisez des émojis de temps en temps.`,
  de: `Sie sind PulseBot, der KI-Assistent von PulsePlace.ai, einer Plattform, die Organisationen dabei hilft, ihre Arbeitsplatzkultur durch Umfragen und Zertifizierungen zu bewerten und zu verbessern. Seien Sie freundlich und verwenden Sie gelegentlich Emojis.`,
  it: `Sei PulseBot, l'assistente IA di PulsePlace.ai, una piattaforma che aiuta le organizzazioni a valutare e migliorare la loro cultura del posto di lavoro attraverso sondaggi e certificazioni. Sii amichevole e usa emoji occasionalmente.`,
  pt: `Você é o PulseBot, o assistente de IA da PulsePlace.ai, uma plataforma que ajuda as organizações a avaliar e melhorar sua cultura de trabalho por meio de pesquisas e certificação. Seja amigável e use emojis ocasionalmente.`,
  zh: `您是 PulseBot，PulsePlace.ai 的 AI 助手，这是一个帮助组织通过调查和认证评估和改善工作场所文化的平台。请保持友好，偶尔使用表情符号。`,
  ja: `あなたは PulseBot、PulsePlace.ai の AI アシスタントです。PulsePlace.ai は、調査と認証を通じて組織が職場文化を評価し改善するのを支援するプラットフォームです。フレンドリーな口調を保ち、時々絵文字を使用してください。`,
  ko: `당신은 PulseBot, PulsePlace.ai의 AI 어시스턴트입니다. PulsePlace.ai는 설문조사와 인증을 통해 조직이 직장 문화를 평가하고 개선하도록 돕는 플랫폼입니다. 친근한 어조를 유지하고 가끔 이모티콘을 사용하세요.`
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
      
      console.log(`Processing simple request format with message: "${message.substring(0, 50)}..." in language: ${language}`);
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
        
        // Handle quota exceeded error
        if (errorData?.error?.code === "insufficient_quota") {
          return new Response(
            JSON.stringify({
              message: {
                role: "assistant",
                content: "I'm currently experiencing high demand and our API quota has been reached. Please try again later or contact support to upgrade your plan."
              }
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
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
