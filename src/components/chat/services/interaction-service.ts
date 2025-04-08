
import { supabase } from '@/integrations/supabase/client';
import { BotAvatarState } from '../types';

/**
 * Logs an interaction between the user and bot
 */
export const logInteraction = async (
  sessionId: string,
  userMessage: string, 
  botReply: string, 
  language: string, 
  avatarState: BotAvatarState
) => {
  try {
    const { data, error } = await supabase
      .from('pulsebot_logs')
      .insert({
        session_id: sessionId,
        user_message: userMessage,
        bot_reply: botReply,
        language,
        avatar_state: avatarState,
        created_at: new Date().toISOString()
      });
    
    if (error) throw new Error(error.message || 'Failed to log interaction');
    console.log('Interaction logged successfully');
    return true;
  } catch (err) {
    console.error('Error logging interaction:', err);
    // Silent fail - we don't want to bother the user if interaction logging fails
    return false;
  }
};
