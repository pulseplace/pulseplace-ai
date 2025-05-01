
import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from 'lucide-react';
import CertificationSharing from '@/components/certification/CertificationSharing';

const ShareCertification = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <h3 className="font-semibold mb-1">Share Your PulsePlace Certification</h3>
          <p className="text-sm text-gray-600">
            Showcase your workplace culture certification across various platforms. Choose from different styles and formats below.
          </p>
        </div>
      </div>
      
      <CertificationSharing
        companyName="Acme Corporation"
        tier="pulse_certified"
        score={88}
        issueDate="April 7, 2025"
        validUntil="April 7, 2026"
      />
    </div>
  );
};

export default ShareCertification;
