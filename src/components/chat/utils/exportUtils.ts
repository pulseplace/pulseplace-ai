
import { Message } from '../types';
import { jsPDF } from 'jspdf';

export const exportUtils = {
  exportToJson: (messages: Message[], filename: string) => {
    if (!messages || messages.length === 0) {
      throw new Error('No messages to export');
    }

    try {
      // Filter out system messages if needed
      const exportMessages = messages.filter(msg => msg.role !== 'system');
      
      // Format data for export
      const data = JSON.stringify(exportMessages, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create and trigger download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('JSON export error:', error);
      throw new Error(`Failed to export as JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  exportToPdf: (messages: Message[], title: string) => {
    if (!messages || messages.length === 0) {
      throw new Error('No messages to export');
    }

    try {
      const pdf = new jsPDF();
      let y = 10;
      
      // Add title with timestamp
      const timestamp = new Date().toLocaleString();
      pdf.setFontSize(16);
      pdf.text(title, 10, y);
      y += 10;
      
      // Add timestamp
      pdf.setFontSize(10);
      pdf.text(`Generated: ${timestamp}`, 10, y);
      y += 10;
      
      pdf.setFontSize(10);
      
      // Filter out system messages
      const visibleMessages = messages.filter(msg => msg.role !== 'system');
      
      visibleMessages.forEach((message, index) => {
        // Add some space between messages
        if (index > 0) y += 5;
        
        // Add role label
        pdf.setFont('helvetica', 'bold');
        const roleLabel = message.role === 'user' ? 'You' : 'PulseBot';
        pdf.text(`${roleLabel}:`, 10, y);
        y += 5;
        
        // Add message content
        pdf.setFont('helvetica', 'normal');
        
        // Split long text into multiple lines
        const contentLines = pdf.splitTextToSize(message.content, 180);
        
        // Check if we need a new page
        if (y + contentLines.length * 5 > 280) {
          pdf.addPage();
          y = 10;
        }
        
        pdf.text(contentLines, 10, y);
        y += contentLines.length * 5;
        
        // Add timestamp for message if available
        if (message.timestamp) {
          const msgTime = new Date(message.timestamp).toLocaleTimeString();
          pdf.setFontSize(8);
          pdf.setTextColor(100, 100, 100);
          pdf.text(msgTime, 180, y, { align: 'right' });
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          y += 3;
        }
      });
      
      pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      return true;
    } catch (error) {
      console.error('PDF export error:', error);
      throw new Error(`Failed to export as PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};

export default exportUtils;
