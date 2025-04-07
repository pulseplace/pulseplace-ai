
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Download, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EmailTemplateActionsProps {
  showHtml: boolean;
  onToggleView: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onSendTestEmail: () => void;
}

const EmailTemplateActions: React.FC<EmailTemplateActionsProps> = ({
  showHtml,
  onToggleView,
  onCopyHtml,
  onDownloadHtml,
  onSendTestEmail
}) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onToggleView}>
        {showHtml ? "Preview" : "Show HTML"}
      </Button>
      <Button variant="outline" size="sm" onClick={onCopyHtml}>
        <Copy className="h-4 w-4 mr-2" />
        Copy HTML
      </Button>
      <Button variant="outline" size="sm" onClick={onDownloadHtml}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      <Button size="sm" onClick={onSendTestEmail}>
        <Mail className="h-4 w-4 mr-2" />
        Send Test
      </Button>
    </div>
  );
};

export default EmailTemplateActions;
