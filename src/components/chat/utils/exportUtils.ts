
import { Message } from '../types';
import { jsPDF } from 'jspdf';

export const exportUtils = {
  exportToJson: (messages: Message[], filename: string) => {
    const data = JSON.stringify(messages, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  
  exportToPdf: (messages: Message[], title: string) => {
    const pdf = new jsPDF();
    let y = 10;
    
    // Add title
    pdf.setFontSize(16);
    pdf.text(title, 10, y);
    y += 10;
    
    pdf.setFontSize(10);
    
    messages.forEach((message, index) => {
      if (message.role === 'system') return; // Skip system messages
      
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
    });
    
    pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  }
};

export default exportUtils;
