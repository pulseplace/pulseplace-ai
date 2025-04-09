
import React from 'react';
import { Button } from "@/components/ui/button";
import { Award, FileText, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { exportService } from '@/services/team/exportService';

interface CertificationTabContentProps {
  averageScore: number;
  onSendCertificate: () => Promise<void>;
  onExportPDF: () => void;
}

const CertificationTabContent: React.FC<CertificationTabContentProps> = ({
  averageScore,
  onSendCertificate,
  onExportPDF
}) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = React.useState(false);
  
  const handleSendCertificate = async () => {
    if (averageScore < 80) {
      toast({
        title: "Certification Failed",
        description: "Team must have a PulseScore of at least 80 to qualify for certification.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    try {
      await onSendCertificate();
      
      toast({
        title: "Certification Sent",
        description: "The certification has been generated and an email has been sent to the team administrator.",
      });
    } catch (error: any) {
      toast({
        title: "Certification Failed",
        description: error.message || "Failed to generate certification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-4 bg-pulse-gradient p-6 rounded-full">
            <Award className="h-16 w-16 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-center mb-2">PulseScore™ Certification</h3>
          
          <p className="text-gray-500 text-center mb-6">
            Teams with a PulseScore™ of 80 or above qualify for certification as a high-performing workplace culture
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto">
            <Button
              className="bg-pulse-gradient"
              size="lg"
              onClick={handleSendCertificate}
              disabled={isSending || averageScore < 80}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-4 w-4" />
                  Generate Certificate
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onExportPDF}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Certification Requirements</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Minimum PulseScore™</p>
              <p className="text-sm text-gray-500">Required score to qualify for certification</p>
            </div>
            <div className="text-right">
              <p className="font-bold">80/100</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Your Current PulseScore™</p>
              <p className="text-sm text-gray-500">Based on most recent surveys</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${averageScore >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{averageScore}/100</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Certification Status</p>
            </div>
            <div className="text-right">
              {averageScore >= 80 ? (
                <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-sm font-medium">
                  Eligible
                </span>
              ) : (
                <span className="bg-orange-100 text-orange-800 py-1 px-2 rounded text-sm font-medium">
                  Not Eligible Yet
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationTabContent;
