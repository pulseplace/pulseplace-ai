
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const systemPrompt = `You are PulseBot, a helpful AI assistant specializing in workplace culture improvement. Help users understand and enhance their organizational culture, improve team dynamics, and provide actionable insights for creating a positive work environment.

Focus areas:
- Workplace culture analysis
- Team engagement metrics
- Certification progress tracking
- Communication and trust improvement
- Employee experience optimization

Keep responses focused, actionable, and under 200 words unless more detail is specifically requested.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, sessionId, language = 'en' } = await req.json()
    
    if (!message || !sessionId) {
      throw new Error('Message and sessionId are required')
    }

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    })

    const data = await openAiResponse.json()
    const botReply = data.choices[0].message.content

    // Log the interaction
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabaseClient.from('pulsebot_logs').insert({
      session_id: sessionId,
      user_message: message,
      bot_reply: botReply,
      language,
      avatar_state: 'happy',
      platform: 'web',
      response_time_ms: Date.now() - req.timeStamp,
    })

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
