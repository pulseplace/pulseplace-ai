
// Add the missing generateBotAnalyticsSummary function
// This would be implemented to call an API endpoint for generating analytics summaries

export const pulseBotAPI = {
  sendMessage: async (sessionId: string, message: string) => {
    console.log(`Sending message to OpenAI via Edge Function for session ${sessionId}`);
    
    try {
      // Get the language from local storage or default to English
      const language = localStorage.getItem('pulsebot_language') || 'en';
      console.log('Using language:', language);
      
      // Call the Supabase Edge Function with the message
      console.log('Attempting to call Edge Function with message:', message);
      const response = await fetch('https://hamqupvdhlfznwnuohsh.supabase.co/functions/v1/ask-pulsebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          language
        }),
      });
      
      console.log('Edge Function response status:', response.status);
      
      // If the response itself is not OK, try fallback mechanism
      if (!response.ok) {
        return handleApiFallback(response, message, language);
      }
      
      const data = await response.json();
      console.log('Received data from Edge Function:', data);
      
      // Check if the response contains an error message from the Edge Function
      if (data.error) {
        console.error('Error in response data:', data.error);
        return handleApiError(data.error);
      }
      
      // Check if the expected message structure exists
      if (!data.message || !data.message.content) {
        console.warn('Unexpected response format from OpenAI:', data);
        return handleMalformedResponse(data);
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
      return handleApiException(error);
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
      // Get the language from local storage or default to English
      const language = localStorage.getItem('pulsebot_language') || 'en';
      
      // Call the Supabase Edge Function with the analytics request
      const response = await fetch('https://hamqupvdhlfznwnuohsh.supabase.co/functions/v1/ask-pulsebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `Generate a ${summaryType} summary of PulseBot analytics for the last ${timeRange} days.`,
          language,
          systemPrompt: `You are a PulseBot analytics assistant for PulsePlace.ai. Provide a detailed analysis of bot performance in the requested format for the specified time period. Include metrics like user satisfaction, common queries, and areas for improvement.`
        }),
      });
      
      if (!response.ok) {
        // Try to get error text if available
        const errorText = await response.text();
        console.error('Analytics summary request failed:', response.status, errorText);
        return `Unable to generate analytics summary. Server returned error: ${response.status}`;
      }
      
      const data = await response.json();
      
      // Check if we got a valid response
      if (!data.message || !data.message.content) {
        console.warn('Unexpected response format for analytics summary:', data);
        return 'Unable to generate analytics summary. Received invalid response format from server.';
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
  // Enhanced algorithm to determine avatar state based on message sentiment analysis
  if (content.includes('error') || content.includes('trouble') || content.includes('sorry')) {
    return 'idle';
  } else if (
    content.includes('!') || 
    content.includes('😊') || 
    content.includes('great') ||
    content.includes('congratulations') ||
    content.includes('excellent')
  ) {
    return 'happy';
  } else if (
    content.includes('thinking') ||
    content.includes('consider') ||
    content.includes('analyzing')
  ) {
    return 'thinking';
  } else {
    return 'happy'; // Default to happy for most responses
  }
}

// Fallback handler when main API fails
async function handleApiFallback(response: Response, message: string, language: string): Promise<any> {
  const errorText = await response.text();
  console.error('Response not OK:', response.status, errorText);
  
  // Attempt to use a fallback method (could be a different API endpoint or local processing)
  console.log('Attempting fallback mechanism...');
  
  // For now, we'll return a graceful error message
  return {
    message: getLocalizedErrorMessage(language, 'connection'),
    avatarState: 'idle' as const,
    context: {
      intent: 'error',
      confidence: 1.0,
      error: `HTTP error ${response.status}: ${errorText}`
    }
  };
}

// Error handler for API errors
function handleApiError(error: string): any {
  console.error('API returned error:', error);
  
  // Get current language or default to English
  const language = localStorage.getItem('pulsebot_language') || 'en';
  
  return {
    message: getLocalizedErrorMessage(language, 'api'),
    avatarState: 'idle' as const,
    context: {
      intent: 'error',
      confidence: 1.0,
      error
    }
  };
}

// Error handler for malformed responses
function handleMalformedResponse(data: any): any {
  console.error('Malformed response:', data);
  
  // Get current language or default to English
  const language = localStorage.getItem('pulsebot_language') || 'en';
  
  return {
    message: getLocalizedErrorMessage(language, 'format'),
    avatarState: 'idle' as const,
    context: {
      intent: 'error',
      confidence: 1.0,
      error: 'Invalid response format'
    }
  };
}

// Error handler for exceptions
function handleApiException(error: any): any {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('Exception occurred:', errorMessage);
  
  // Get current language or default to English
  const language = localStorage.getItem('pulsebot_language') || 'en';
  
  return {
    message: getLocalizedErrorMessage(language, 'exception', errorMessage),
    avatarState: 'idle' as const,
    context: {
      intent: 'error',
      confidence: 1.0,
      error: errorMessage
    }
  };
}

// Function to get localized error messages
function getLocalizedErrorMessage(language: string, errorType: 'connection' | 'api' | 'format' | 'exception', details?: string): string {
  // Default to English if language is not supported
  if (!['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko'].includes(language)) {
    language = 'en';
  }
  
  const errorMessages: Record<string, Record<string, string>> = {
    en: {
      connection: "I'm having trouble connecting to my AI services right now. Please try again in a moment.",
      api: "I encountered an error while processing your request. Please try again or ask a different question.",
      format: "I received an unexpected response from the server. Please try again with a simpler question.",
      exception: `An error occurred: ${details || 'Unknown error'}. Please try again later.`
    },
    es: {
      connection: "Estoy teniendo problemas para conectarme a mis servicios de IA en este momento. Por favor, inténtalo de nuevo en un momento.",
      api: "Encontré un error al procesar tu solicitud. Por favor, inténtalo de nuevo o haz una pregunta diferente.",
      format: "Recibí una respuesta inesperada del servidor. Por favor, inténtalo de nuevo con una pregunta más simple.",
      exception: `Ocurrió un error: ${details || 'Error desconocido'}. Por favor, inténtalo más tarde.`
    },
    fr: {
      connection: "J'ai du mal à me connecter à mes services d'IA en ce moment. Veuillez réessayer dans un instant.",
      api: "J'ai rencontré une erreur lors du traitement de votre demande. Veuillez réessayer ou poser une question différente.",
      format: "J'ai reçu une réponse inattendue du serveur. Veuillez réessayer avec une question plus simple.",
      exception: `Une erreur s'est produite: ${details || 'Erreur inconnue'}. Veuillez réessayer plus tard.`
    },
    // Add other languages as needed
    de: {
      connection: "Ich habe derzeit Probleme, mich mit meinen KI-Diensten zu verbinden. Bitte versuchen Sie es in einem Moment erneut.",
      api: "Beim Verarbeiten Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder stellen Sie eine andere Frage.",
      format: "Ich habe eine unerwartete Antwort vom Server erhalten. Bitte versuchen Sie es mit einer einfacheren Frage erneut.",
      exception: `Ein Fehler ist aufgetreten: ${details || 'Unbekannter Fehler'}. Bitte versuchen Sie es später erneut.`
    },
    // Add more languages
    it: {
      connection: "Sto avendo problemi a connettermi ai miei servizi AI al momento. Riprova tra poco.",
      api: "Ho riscontrato un errore durante l'elaborazione della tua richiesta. Riprova o fai una domanda diversa.",
      format: "Ho ricevuto una risposta inaspettata dal server. Riprova con una domanda più semplice.",
      exception: `Si è verificato un errore: ${details || 'Errore sconosciuto'}. Riprova più tardi.`
    },
    pt: {
      connection: "Estou tendo problemas para me conectar aos meus serviços de IA agora. Por favor, tente novamente em breve.",
      api: "Encontrei um erro ao processar sua solicitação. Por favor, tente novamente ou faça uma pergunta diferente.",
      format: "Recebi uma resposta inesperada do servidor. Por favor, tente novamente com uma pergunta mais simples.",
      exception: `Ocorreu um erro: ${details || 'Erro desconhecido'}. Por favor, tente novamente mais tarde.`
    },
    zh: {
      connection: "我现在无法连接到我的人工智能服务。请稍后再试。",
      api: "处理您的请求时遇到错误。请重试或提出不同的问题。",
      format: "我从服务器收到了意外的响应。请尝试使用更简单的问题。",
      exception: `发生错误：${details || '未知错误'}。请稍后再试。`
    },
    ja: {
      connection: "現在、AI サービスに接続できません。しばらくしてからもう一度お試しください。",
      api: "リクエストの処理中にエラーが発生しました。もう一度試すか、別の質問をしてください。",
      format: "サーバーから予期しない応答を受け取りました。より簡単な質問でもう一度お試しください。",
      exception: `エラーが発生しました：${details || '不明なエラー'}。後でもう一度お試しください。`
    },
    ko: {
      connection: "지금 AI 서비스에 연결하는 데 문제가 있습니다. 잠시 후 다시 시도해 주세요.",
      api: "요청을 처리하는 동안 오류가 발생했습니다. 다시 시도하거나 다른 질문을 해주세요.",
      format: "서버에서 예상치 못한 응답을 받았습니다. 더 간단한 질문으로 다시 시도해주세요.",
      exception: `오류가 발생했습니다: ${details || '알 수 없는 오류'}. 나중에 다시 시도해주세요.`
    }
  };
  
  return errorMessages[language][errorType];
}
