
import { Message } from '../types';
import { jsPDF } from 'jspdf';

// Simple function to format date objects
const formatDate = (date?: Date) => {
  if (!date) return 'Unknown date';
  return new Date(date).toLocaleString();
};

const formatRole = (role: string) => {
  if (role === 'assistant') return 'PulseBot';
  return role.charAt(0).toUpperCase() + role.slice(1);
};

export const exportUtils = {
  exportToJson: (messages: Message[], filename: string) => {
    // Create a cleaned version of the messages for export
    const exportData = messages.map(message => ({
      id: message.id,
      content: message.content,
      role: message.role,
      timestamp: message.timestamp,
      language: message.language || 'en',
      feedback: message.feedback
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${filename}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },
  
  exportToPdf: (messages: Message[], title: string) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    
    // Add generation timestamp
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    
    let yPosition = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const textWidth = pageWidth - (margin * 2);
    
    // Helper to add a new page if we're close to the bottom
    const checkPageBreak = (y: number, lineHeight = 10) => {
      if (y + lineHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        return margin;
      }
      return y;
    };
    
    // Process each message
    messages.forEach((message, i) => {
      // Skip system messages
      if (message.role === 'system') return;
      
      yPosition = checkPageBreak(yPosition);
      
      // Message header (role & timestamp)
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const headerText = `${formatRole(message.role)} • ${formatDate(message.timestamp)}`;
      doc.text(headerText, margin, yPosition);
      yPosition += 5;
      
      // Message content
      yPosition = checkPageBreak(yPosition);
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      // Split long text into lines
      const lines = doc.splitTextToSize(message.content, textWidth);
      lines.forEach(line => {
        yPosition = checkPageBreak(yPosition, 7);
        doc.text(line, margin, yPosition);
        yPosition += 7;
      });
      
      // Add feedback if present
      if (message.feedback) {
        yPosition = checkPageBreak(yPosition);
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`Feedback: ${message.feedback}`, margin, yPosition);
        yPosition += 5;
      }
      
      // Separator between messages
      yPosition += 8;
    });
    
    // Save the PDF
    doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  }
};
