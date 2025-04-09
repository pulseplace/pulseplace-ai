
// Add the missing generateBotAnalyticsSummary function
// This would be implemented to call an API endpoint for generating analytics summaries

export const pulseBotAPI = {
  sendMessage: async (sessionId: string, message: string) => {
    console.log(`Sending message to OpenAI via Edge Function for session ${sessionId}`);
    
    try {
      // Call the Supabase Edge Function with the message
      console.log('Attempting to call Edge Function with message:', message);
      const response = await fetch('https://hamqupvdhlfznwnuohsh.supabase.co/functions/v1/ask-pulsebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          language: localStorage.getItem('pulsebot_language') || 'en'
        }),
      });
      
      console.log('Edge Function response status:', response.status);
      
      // If the response itself is not OK, throw immediately
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data from Edge Function:', data);
      
      // Check if the response contains an error message from the Edge Function
      if (data.error) {
        console.error('Error in response data:', data.error);
        throw new Error(data.error || 'Failed to get response from OpenAI');
      }
      
      // Check if the expected message structure exists
      if (!data.message || !data.message.content) {
        console.warn('Unexpected response format from OpenAI:', data);
        throw new Error('Invalid response format from OpenAI');
      }
      
      // Return the response from OpenAI
      return {
        message: data.message.content,
        avatarState: determineAvatarState(data.message.content),
        context: {
          intent: 'openai_response',
          confidence: 0.95
        }
      };
    } catch (error) {
      console.error('Error connecting to OpenAI:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        message: `I'm having trouble connecting to my AI services right now. Please try again in a moment. Technical details: ${errorMessage}`,
        avatarState: 'idle' as const,
        context: {
          intent: 'error',
          confidence: 1.0
        }
      };
    }
  },
  
  createSession: async () => {
    // In a real implementation, this would call an API to create a new chat session
    console.log('Creating new chat session');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a mock session ID
    return {
      sessionId: `session_${Date.now()}`,
      createdAt: new Date()
    };
  },
  
  recordFeedback: async (sessionId: string, messageId: string, feedback: 'up' | 'down') => {
    // In a real implementation, this would call an API to record user feedback
    console.log(`Recording ${feedback} feedback for message ${messageId} in session ${sessionId}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return success
    return { success: true };
  },
  
  /**
   * Generate an AI summary of bot analytics
   * @param summaryType The type of summary to generate (general, problems, dashboard)
   * @param timeRange The time range in days to analyze
   * @returns A text summary of the bot analytics
   */
  generateBotAnalyticsSummary: async (
    summaryType: 'general' | 'problems' | 'dashboard',
    timeRange: number
  ): Promise<string> => {
    console.log(`Generating ${summaryType} analytics summary for last ${timeRange} days`);
    
    try {
      // Call the Supabase Edge Function with the analytics request
      const response = await fetch('https://hamqupvdhlfznwnuohsh.supabase.co/functions/v1/ask-pulsebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `Generate a ${summaryType} summary of PulseBot analytics for the last ${timeRange} days.`,
          language: localStorage.getItem('pulsebot_language') || 'en',
          systemPrompt: `You are a PulseBot analytics assistant for PulsePlace.ai. Provide a detailed analysis of bot performance in the requested format for the specified time period. Include metrics like user satisfaction, common queries, and areas for improvement.`
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Analytics summary request failed:', response.status, errorText);
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      // Check if we got a valid response
      if (!data.message || !data.message.content) {
        console.warn('Unexpected response format for analytics summary:', data);
        throw new Error('Invalid response format from analytics summary request');
      }
      
      return data.message.content;
    } catch (error) {
      console.error('Error generating analytics summary:', error);
      return `Unable to generate analytics summary. Please try again later. Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};

// Helper function to determine avatar state based on message content
function determineAvatarState(content: string): 'idle' | 'happy' | 'thinking' | 'typing' {
  // Simple algorithm to determine avatar state based on message content
  if (content.includes('error') || content.includes('trouble') || content.includes('sorry')) {
    return 'idle';
  } else if (content.includes('!') || content.includes('😊') || content.includes('great')) {
    return 'happy';
  } else {
    return 'happy'; // Default to happy for most responses
  }
}
