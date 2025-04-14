
import { Message } from '../types';

export const exportUtils = {
  exportToJson: (messages: Message[], filename: string): void => {
    try {
      // Filter out system messages
      const filteredMessages = messages.filter(m => m.role !== 'system');
      
      // Convert messages to a more readable format
      const formattedMessages = filteredMessages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
      }));
      
      // Create a JSON blob
      const json = JSON.stringify({ messages: formattedMessages }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      
      // Create a download link and trigger a click
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      throw new Error('Failed to export chat as JSON');
    }
  },
  
  exportToPdf: (messages: Message[], title: string): void => {
    try {
      // This is a placeholder - in a real implementation, would use jsPDF or similar
      console.log('Exporting to PDF:', title, messages.length, 'messages');
      alert('PDF export would be implemented here with jsPDF or similar library');
      
      // In real implementation:
      // 1. Create PDF document with jsPDF
      // 2. Add title and date to the PDF
      // 3. Iterate through messages and add them to the PDF
      // 4. Save and download the PDF
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      throw new Error('Failed to export chat as PDF');
    }
  }
};
