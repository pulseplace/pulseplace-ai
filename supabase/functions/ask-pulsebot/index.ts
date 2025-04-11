
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openaiKey = Deno.env.get("OPENAI_API_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ChatMessage = {
  role: string;
  content: string;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openaiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    
    const reqData = await req.json();
    const messages = reqData.messages || [];
    
    // Add the system prompt to guide PulseBot's responses
    const systemPrompt = {
      role: "system",
      content: `You are PulseBot, the friendly AI assistant for PulsePlace.ai. 
Your primary goal is to help people understand how PulsePlace's platform helps organizations measure, improve and showcase workplace culture.

Key talking points about PulsePlace:
- PulsePlace uses AI to help organizations quantify their workplace culture
- Our PulseScore certification showcases authentic culture to attract talent
- We offer tools to track culture metrics, run pulse surveys, and analyze results
- Our dashboard provides actionable insights to improve workplace culture

When answering questions:
- Be friendly, helpful and concise
- Aim to provide useful information about workplace culture and employee engagement
- If you don't know something specific about PulsePlace features, be honest and suggest contacting the team
- Keep responses professional but conversational

Avoid:
- Don't make up specific product features or pricing that you're not certain about
- Don't share sensitive information about the company or its clients

For demo purposes, you can share that PulsePlace is currently in private beta with select companies, with plans to launch publicly in Q3 2025.`
    };

    // Prepare messages for the API call
    const apiMessages = [systemPrompt, ...messages.slice(-10)]; // Include last 10 messages only

    console.log(`Processing chat request with ${messages.length} messages`);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error}`);
    }

    const result = await response.json();
    const botReply = result.choices[0].message;

    // Log response from OpenAI
    console.log("OpenAI response processed successfully");

    return new Response(
      JSON.stringify({
        message: botReply
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Error in ask-pulsebot function:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred"
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
