
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy, Download, Loader, Mail, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EmailActionsProps {
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onSendTestEmail: () => Promise<void>;
  onRandomize: () => void;
}

const EmailActions: React.FC<EmailActionsProps> = ({
  onCopyHtml,
  onDownloadHtml,
  onSendTestEmail,
  onRandomize
}) => {
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleCopyHtml = async () => {
    setIsCopying(true);
    try {
      await onCopyHtml();
      toast({
        title: "Copied!",
        description: "HTML has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy HTML to clipboard",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
      // Show the copied icon for 1.5 seconds
      setTimeout(() => {
        setIsCopying(false);
      }, 1500);
    }
  };

  const handleSendTestEmail = async () => {
    setIsSending(true);
    try {
      await onSendTestEmail();
      // The parent component will handle showing toast notifications
    } catch (error) {
      toast({
        title: "Sending failed",
        description: "Could not send test email",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onRandomize}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Randomize
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

export default EmailActions;
