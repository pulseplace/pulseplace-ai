
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CertificationTabContentProps {
  averageScore: number;
  onSendCertificate: () => void;
  onExportPDF: () => void;
}

const CertificationTabContent: React.FC<CertificationTabContentProps> = ({ 
  averageScore, 
  onSendCertificate, 
  onExportPDF 
}) => {
  return (
    <div className="text-center py-8">
      <div className="mb-8 mx-auto max-w-md p-6 border rounded-lg shadow-sm bg-white">
        <h3 className="text-xl font-bold mb-4">PulseScore™ Certification</h3>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8 mb-4">
          <div className="text-3xl font-bold mb-1">{averageScore}/100</div>
          <div className="font-medium">
            {averageScore >= 80 ? 'Pulse Certified™' : 'In Progress'}
          </div>
        </div>
        <p className="text-gray-500 mb-2">Tayana Solutions</p>
        <p className="text-gray-500 text-sm">Valid until April 8, 2026</p>
      </div>
      
      <div className="space-x-2">
        <Button onClick={onSendCertificate}>
          <Download className="h-4 w-4 mr-2" />
          Send Certificate
        </Button>
        <Button variant="outline" onClick={onExportPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default CertificationTabContent;
