
import { Message } from '../types';
import { jsPDF } from 'jspdf';

export const exportUtils = {
  exportToJson: (messages: Message[], filename: string) => {
    // Prepare messages for export - remove internal props and format dates
    const exportedMessages = messages.map(msg => {
      const { id, role, content, timestamp, language, feedback } = msg;
      return {
        id,
        role,
        content,
        timestamp: timestamp ? timestamp.toISOString() : undefined,
        language: language || 'en',
        feedback
      };
    });
    
    const conversationData = {
      exportTime: new Date().toISOString(),
      messages: exportedMessages
    };
    
    // Create a Blob and download it
    const jsonString = JSON.stringify(conversationData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  },
  
  exportToPdf: (messages: Message[], title: string) => {
    const doc = new jsPDF();
    const textColor = '#333333';
    const accentColor = '#3F8CFF';
    const margin = 20;
    let y = margin;
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(accentColor);
    doc.text(title, margin, y);
    y += 10;
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(`Exported on: ${new Date().toLocaleString()}`, margin, y);
    y += 15;
    
    // Messages
    doc.setFontSize(10);
    
    messages.forEach((msg) => {
      if (msg.role === 'system') return; // Skip system messages
      
      const isUser = msg.role === 'user';
      const name = isUser ? 'You' : 'PulseBot';
      const languageText = msg.language && msg.language !== 'en' ? ` (${msg.language})` : '';
      
      // Speaker name
      doc.setTextColor(isUser ? accentColor : '#32D27E');
      doc.setFont(undefined, 'bold');
      doc.text(`${name}${languageText}:`, margin, y);
      y += 5;
      
      // Message content
      doc.setTextColor(textColor);
      doc.setFont(undefined, 'normal');
      
      // Split long messages to fit page width
      const contentLines = doc.splitTextToSize(msg.content, doc.internal.pageSize.width - (margin * 2));
      
      // Check if we need a new page
      if (y + (contentLines.length * 5) > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(contentLines, margin, y);
      y += (contentLines.length * 5) + 10;
      
      // Add timestamp if available
      if (msg.timestamp) {
        doc.setFontSize(8);
        doc.setTextColor('#999999');
        
        // Check if we need a new page for timestamp
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
        
        doc.text(`${new Date(msg.timestamp).toLocaleString()}`, margin, y);
        y += 10;
        doc.setFontSize(10);
      }
    });
    
    // Save the PDF
    doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  }
};
