
import React from 'react';
import { PulseScoreData } from '@/types/scoring.types';

interface EmailPreviewContentProps {
  recipientName: string;
  pulseScoreData: PulseScoreData;
  certificationLevel: string;
}

const EmailPreviewContent: React.FC<EmailPreviewContentProps> = ({
  recipientName,
  pulseScoreData,
  certificationLevel
}) => {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-slate-900 mb-4">PulsePlace.ai</div>
      </div>
      
      <div className="text-2xl mb-4">Hello {recipientName},</div>
      
      <div className="text-lg mb-6">
        We're thrilled to share your latest certification summary from PulsePlace.ai.
      </div>
      
      <div className="text-center my-6">
        <div className="text-3xl font-bold text-slate-900 mb-3">
          PulseScore®: {pulseScoreData.overallScore} / 100
        </div>
        <div className="inline-block bg-blue-50 text-slate-800 px-6 py-2 rounded-full font-semibold">
          {certificationLevel}
        </div>
      </div>
      
      <div className="my-6">
        <div className="text-xl font-semibold mb-3">Category Breakdown:</div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between py-2 border-b border-blue-100">
            <div>Trust & Psychological Safety:</div>
            <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'culture_trust')?.score || 0)}</div>
          </div>
          <div className="flex justify-between py-2 border-b border-blue-100">
            <div>Engagement & Retention:</div>
            <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'engagement_stability')?.score || 0)}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>Mission & Belonging:</div>
            <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'emotion_index')?.score || 0)}</div>
          </div>
        </div>
      </div>
      
      <div className="my-6">
        <div className="text-xl font-semibold mb-3">AI Insight Summary:</div>
        <div className="text-slate-700">
          "{pulseScoreData.insights[0]}"
        </div>
      </div>
      
      <div className="my-6">
        <div className="text-lg mb-4">
          You're now eligible to use the official Pulse Certified® badge on your website, LinkedIn, and careers page.
        </div>
        <div className="text-center">
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold no-underline hover:bg-blue-700 transition-colors"
          >
            Download Badge
          </a>
        </div>
      </div>
      
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
        <p className="mt-1">
          This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai" className="text-blue-600">hello@pulseplace.ai</a>
        </p>
      </div>
    </div>
  );
};

export default EmailPreviewContent;
