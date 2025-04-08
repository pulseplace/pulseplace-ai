
import { supabase } from '@/integrations/supabase/client';

/**
 * Logs user feedback for a bot message
 */
export const logFeedback = async (messageId: string, content: string, feedback_type: 'up' | 'down', sessionId: string) => {
  try {
    // Insert feedback directly into the pulsebot_feedback table
    const { data, error } = await supabase
      .from('pulsebot_feedback')
      .insert({
        message: content,
        feedback_type,
        user_identifier: sessionId
      });
    
    if (error) throw new Error(error.message || 'Failed to log feedback');
    console.log('Feedback logged successfully');
    return true;
  } catch (err) {
    console.error('Error logging feedback:', err);
    // Silent fail - we don't want to bother the user if feedback logging fails
    return false;
  }
};
