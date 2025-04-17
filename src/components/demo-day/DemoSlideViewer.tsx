
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, PresentationScreen, FileDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SlideMetadata {
  title: string;
  type: 'readiness' | 'checklist' | 'summary' | 'roadmap';
  progress: number;
  lastUpdated: Date;
}

const DemoSlideViewer: React.FC = () => {
  const { toast } = useToast();
  
  const slides: SlideMetadata[] = [
    {
      title: "Demo Day Readiness",
      type: "readiness",
      progress: 95,
      lastUpdated: new Date()
    },
    {
      title: "QA Checklist Status",
      type: "checklist",
      progress: 87,
      lastUpdated: new Date()
    },
    {
      title: "Stakeholder Summary",
      type: "summary",
      progress: 100,
      lastUpdated: new Date()
    },
    {
      title: "Product Roadmap",
      type: "roadmap",
      progress: 100,
      lastUpdated: new Date()
    }
  ];

  const handleExport = (format: 'pdf' | 'png') => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your slides will download shortly"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Demo Day Slides</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('png')}>
            <PresentationScreen className="h-4 w-4 mr-2" />
            Export PNG
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide) => (
          <Card key={slide.title}>
            <CardHeader>
              <CardTitle className="text-lg">{slide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={slide.progress} />
                <p className="text-sm text-muted-foreground">
                  Last updated: {slide.lastUpdated.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoSlideViewer;
