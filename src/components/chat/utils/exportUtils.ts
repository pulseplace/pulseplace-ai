
import { Message } from '../types';

export const exportChatAsText = (messages: Message[]): string => {
  return messages
    .map(msg => {
      const role = msg.role === 'assistant' ? 'Assistant' : 'You';
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time';
      return `${role} (${timestamp}):\n${msg.content}\n\n`;
    })
    .join('');
};

export const exportChatAsJson = (messages: Message[]): string => {
  const exportData = {
    messages,
    exportedAt: new Date().toISOString(),
    metadata: {
      messageCount: messages.length,
    }
  };
  return JSON.stringify(exportData, null, 2);
};

export const exportChatAsCsv = (messages: Message[]): string => {
  const headers = 'Role,Content,Timestamp\n';
  const rows = messages
    .map(msg => {
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown';
      return `"${msg.role}","${msg.content.replace(/"/g, '""')}","${timestamp}"`;
    })
    .join('\n');
  
  return headers + rows;
};

export const downloadChat = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};
