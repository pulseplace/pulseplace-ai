
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy, Download, Loader, Mail } from 'lucide-react';
import { useState } from 'react';

interface EmailTemplateActionsProps {
  showHtml: boolean;
  onToggleView: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onSendTestEmail: () => Promise<void>;
  isSending?: boolean;
}

const EmailTemplateActions: React.FC<EmailTemplateActionsProps> = ({
  showHtml,
  onToggleView,
  onCopyHtml,
  onDownloadHtml,
  onSendTestEmail,
  isSending = false
}) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyHtml = () => {
    setIsCopying(true);
    onCopyHtml();
    
    // Show the copied icon for 1.5 seconds
    setTimeout(() => {
      setIsCopying(false);
    }, 1500);
  };

  const handleSendTestEmail = async () => {
    try {
      await onSendTestEmail();
    } catch (error) {
      console.error("Error in handleSendTestEmail:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onToggleView}>
        {showHtml ? "Preview" : "Show HTML"}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleCopyHtml}
        disabled={isCopying}
      >
        {isCopying ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy HTML
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={onDownloadHtml}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      <Button 
        size="sm" 
        onClick={handleSendTestEmail}
        disabled={isSending}
      >
        {isSending ? (
          <>
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" />
            Send Test
          </>
        )}
      </Button>
    </div>
  );
};

export default EmailTemplateActions;
