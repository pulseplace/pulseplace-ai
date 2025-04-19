
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CertificationSharing from '@/components/certification/CertificationSharing';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoCircle } from 'lucide-react';

const ShareCertification = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Demo data for certification badge
  const certificationData = {
    companyName: 'Tayana Solutions',
    tier: 'pulse_certified' as const,
    score: 88,
    issueDate: 'April 19, 2025',
    validUntil: 'April 19, 2026'
  };
  
  return (
    <div className="container mx-auto py-6">
      <Helmet>
        <title>Share Your Certification | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Share your PulsePlace certification badge to showcase your commitment to workplace well-being."
        />
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-6">Share Your Certification</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <InfoCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Congratulations on achieving your PulseScore™ Certification! Use the tools below to share your achievement with stakeholders and promote your commitment to workplace well-being.
        </p>
      </div>
      
      <CertificationSharing
        companyName={certificationData.companyName}
        tier={certificationData.tier}
        score={certificationData.score}
        issueDate={certificationData.issueDate}
        validUntil={certificationData.validUntil}
      />
    </div>
  );
};

export default ShareCertification;
