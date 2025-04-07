
import React from 'react';
import CertificationSharing from '@/components/certification/CertificationSharing';

// Standalone page for certification sharing
const ShareCertification = () => {
  // Demo data for certification badge
  const certificationData = {
    companyName: 'Acme Corporation',
    tier: 'pulse_certified' as const,
    score: 88,
    issueDate: 'April 7, 2025',
    validUntil: 'April 7, 2026'
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Share Your Certification</h1>
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
