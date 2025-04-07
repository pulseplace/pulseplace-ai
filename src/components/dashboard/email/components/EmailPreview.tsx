
import React from 'react';
import { EmailPersonalization } from './PersonalizationForm';

interface EmailPreviewProps {
  personalization: EmailPersonalization;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ personalization }) => {
  return (
    <div className="border rounded-md p-4 overflow-auto max-h-[560px]">
      <h3 className="text-lg font-semibold mb-4">Email Preview</h3>
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-blue-600">PulsePlace</div>
          <div className="text-sm text-gray-500">Certification Summary</div>
        </div>
        
        <p className="mb-3">Hello <strong>{personalization.recipient_name}</strong>,</p>
        
        <p className="mb-3">We're thrilled to share your latest certification summary from <strong>PulsePlace.ai</strong>.</p>
        
        <div className="mb-4">
          <p className="text-xl font-bold text-blue-600">PulseScore™: {personalization.pulse_score} / 100</p>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block font-medium mt-1">
            {personalization.certification_level}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="font-medium mb-2">Category Breakdown:</p>
          <div className="bg-white p-2 rounded-md mb-1">Trust & Psychological Safety: <strong>{personalization.trust_score}</strong></div>
          <div className="bg-white p-2 rounded-md mb-1">Engagement & Retention: <strong>{personalization.engagement_score}</strong></div>
          <div className="bg-white p-2 rounded-md mb-1">Mission & Belonging: <strong>{personalization.culture_score}</strong></div>
        </div>
        
        <div className="mb-4">
          <p className="font-medium mb-1">AI Insight Summary:</p>
          <p className="text-sm italic">"{personalization.ai_summary}"</p>
        </div>
        
        <div className="mb-4">
          <p className="mb-2">You're now eligible to use the official <strong>Pulse Certified™</strong> badge on your website, LinkedIn, and careers page.</p>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block font-medium">
            Download Badge
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-6">
          PulsePlace.ai — Redefining workplace trust through data & AI<br />
          This is an automated summary. For support, contact hello@pulseplace.ai
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
