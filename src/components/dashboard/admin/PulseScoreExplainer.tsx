
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const PulseScoreExplainer: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const pdfUrl = "/assets/docs/How_PulseScore_Works_Explainer.pdf";
  
  const downloadPdf = () => {
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'PulseScore_Explainer.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                PulseScore™ Explainer
              </CardTitle>
              <CardDescription>
                Learn how the PulseScore™ certification system works
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadPdf}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="h-4 w-4 mr-1" />
                View Full
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] bg-gray-100 rounded border">
            <iframe
              src={pdfUrl}
              title="PulseScore Explainer"
              className="w-full h-full rounded"
              style={{ minHeight: '400px' }}
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Overview:</strong> The PulseScore™ is our proprietary certification metric for workplace culture health.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Organizations scoring over 75 qualify for PulsePlace Certification</li>
              <li>Scores are calculated from 8 key dimensions of workplace culture</li>
              <li>Certification is valid for one year from issue date</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Fullscreen dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-6xl w-[95vw] h-[95vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>PulseScore™ Explainer Document</DialogTitle>
              <DialogDescription>
                How the PulseScore™ certification system works
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={downloadPdf}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in New Tab
                </a>
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="flex-grow overflow-hidden bg-gray-100 rounded border">
            <iframe
              src={pdfUrl}
              title="PulseScore Explainer"
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PulseScoreExplainer;
