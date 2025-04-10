
import { useState } from 'react';
import { Message, MessageFeedback } from '../types';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! Welcome to PulsePlace. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  
  // For editing messages
  const [editingMessageId, setEditingMessageId] = useState<string>('');
  const [editText, setEditText] = useState<string>('');
  
  const addMessage = (message: Omit<Message, 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const updateLastMessage = (content: string) => {
    setMessages(prev => {
      const updatedMessages = [...prev];
      if (updatedMessages.length > 0) {
        const lastMessage = { ...updatedMessages[updatedMessages.length - 1] };
        lastMessage.content = content;
        updatedMessages[updatedMessages.length - 1] = lastMessage;
      }
      return updatedMessages;
    });
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! Welcome to PulsePlace. How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  
  // Start editing a message
  const startEditingMessage = (id: string, initialText: string) => {
    setEditingMessageId(id);
    setEditText(initialText);
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingMessageId('');
    setEditText('');
  };
  
  // Save edited message
  const saveEdit = () => {
    if (!editingMessageId) return;
    
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, content: editText } 
          : msg
      )
    );
    
    cancelEditing();
  };
  
  // Delete a message
  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };
  
  // Provide feedback on a message
  const provideFeedback = (id: string, feedback: MessageFeedback) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id 
          ? { ...msg, feedback } 
          : msg
      )
    );
  };

  return {
    messages,
    setMessages,
    addMessage,
    updateLastMessage,
    clearMessages,
    editingMessageId,
    editText,
    setEditText,
    startEditingMessage,
    cancelEditing,
    saveEdit,
    deleteMessage,
    provideFeedback,
  };
};
