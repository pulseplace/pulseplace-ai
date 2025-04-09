
import React, { useState } from 'react';
import BadgeCustomizer from '@/components/certification/BadgeCustomizer';
import CertificationSharing from '@/components/certification/CertificationSharing';
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';

const BadgeCustomization = () => {
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('standard');
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>('default');
  
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
      <h1 className="text-2xl font-bold mb-6">Badge Customization</h1>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Customize your PulseScore™ Certification Badge to match your brand and context.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <BadgeCustomizer
          companyName={certificationData.companyName}
          tier={certificationData.tier}
          score={certificationData.score}
          issueDate={certificationData.issueDate}
          validUntil={certificationData.validUntil}
          onStyleSelect={setBadgeStyle}
          onVariantSelect={setBadgeVariant}
        />
        
        <div className="bg-gradient-to-r from-background-light to-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">How to Use Your Badge</h2>
          <p className="mb-4">Your customized badge can be used in various ways:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Embed it on your company website</li>
            <li>Include it in LinkedIn posts</li>
            <li>Add it to your Twitter communications</li>
            <li>Place it in Notion or other documentation</li>
            <li>Include it in marketing materials</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Note: After selecting your preferred badge style, use the sharing options below to get the appropriate code or image.
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Share Your Badge</h2>
        <CertificationSharing
          companyName={certificationData.companyName}
          tier={certificationData.tier}
          score={certificationData.score}
          issueDate={certificationData.issueDate}
          validUntil={certificationData.validUntil}
        />
      </div>
    </div>
  );
};

export default BadgeCustomization;
