
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMailchimpWelcomeHtml } from '@/utils/mailchimpTemplates';
import { Copy, Download, Eye, Code } from 'lucide-react';
import HtmlCodePreview from './components/HtmlCodePreview';

/**
 * Component for previewing and exporting Mailchimp email templates
 */
const MailchimpEmailPreview: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("preview");
  
  const htmlContent = getMailchimpWelcomeHtml();

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    toast({
      title: "HTML Copied",
      description: "Email template HTML has been copied to clipboard",
    });
  };

  const handleDownloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "mailchimp-welcome-template.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: "Mailchimp email template HTML is downloading",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Mailchimp Welcome Email Template</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyHtml}
          >
            <Copy className="h-4 w-4 mr-1" /> Copy HTML
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadHtml}
          >
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-1" /> Preview
            </TabsTrigger>
            <TabsTrigger value="html">
              <Code className="h-4 w-4 mr-1" /> HTML
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="border rounded-md overflow-auto max-h-[600px] bg-white p-4">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </TabsContent>
          
          <TabsContent value="html">
            <HtmlCodePreview htmlContent={htmlContent} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 bg-slate-50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Merge Tags Reference:</h3>
          <ul className="text-sm space-y-1 text-slate-700">
            <li><code>*|FNAME|*</code> - First name</li>
            <li><code>*|LNAME|*</code> - Last name</li>
            <li><code>*|EMAIL|*</code> - Email address</li>
            <li><code>*|CURRENT_YEAR|*</code> - Current year</li>
            <li><code>*|UNSUB|*</code> - Unsubscribe link</li>
          </ul>
          <p className="text-xs text-slate-500 mt-2">
            Tip: Add this template to your Mailchimp account and use it in an Automation Journey triggered by the "Subscribed" event.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailchimpEmailPreview;
