
import { Message } from '../types';

// Create a function to export chat as text
export const exportChatAsText = (messages: Message[]): string => {
  return messages
    .map(msg => {
      const role = msg.role === 'assistant' ? 'Assistant' : 'You';
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time';
      return `${role} (${timestamp}):\n${msg.content}\n\n`;
    })
    .join('');
};

// Create a function to export chat as JSON
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

// Create a function to export chat as CSV
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

// Create a function to download chat
export const downloadChat = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};

// Export as a single object for use in components
export const exportUtils = {
  exportToText: (messages: Message[], fileName: string) => {
    const content = exportChatAsText(messages);
    downloadChat(content, `${fileName}.txt`, 'text/plain');
  },
  exportToJson: (messages: Message[], fileName: string) => {
    const content = exportChatAsJson(messages);
    downloadChat(content, `${fileName}.json`, 'application/json');
  },
  exportToCsv: (messages: Message[], fileName: string) => {
    const content = exportChatAsCsv(messages);
    downloadChat(content, `${fileName}.csv`, 'text/csv');
  },
  exportToPdf: (messages: Message[], title: string) => {
    // This would typically involve a PDF library like jsPDF
    // For simplicity, we'll just export as text for now
    const content = exportChatAsText(messages);
    downloadChat(content, `${title}.txt`, 'text/plain');
    console.log('PDF export would be implemented here with a PDF library');
  }
};
