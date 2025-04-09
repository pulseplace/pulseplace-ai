
import { useState } from 'react';
import { Message, MessageFeedback } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useMessageManagement = (
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  const { toast } = useToast();
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const startEditingMessage = (id: string, initialText: string) => {
    setEditingMessageId(id);
    setEditText(initialText);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (!editingMessageId) return;
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, content: editText } 
          : msg
      )
    );
    
    setEditingMessageId(null);
    setEditText('');
    
    toast({
      title: "Message Updated",
      description: "Your message has been edited",
    });
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    
    toast({
      title: "Message Deleted",
      description: "The message has been removed from the conversation",
    });
  };

  const provideFeedback = (id: string, feedback: MessageFeedback) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id 
          ? { ...msg, feedback } 
          : msg
      )
    );
    
    toast({
      title: feedback === 'positive' ? "Positive Feedback" : "Negative Feedback",
      description: feedback === 'positive' 
        ? "Thank you for the positive feedback!" 
        : "We'll use this feedback to improve our responses",
      variant: feedback === 'positive' ? "default" : "destructive",
    });
  };

  return {
    editingMessageId,
    editText,
    setEditText,
    startEditingMessage,
    cancelEditing,
    saveEdit,
    deleteMessage,
    provideFeedback
  };
};
