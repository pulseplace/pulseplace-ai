
import React from 'react';
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface EmailPreviewContentProps {
  recipientName: string;
  companyName?: string;
  pulseScoreData: PulseScoreData;
  certificationLevel: string;
}

const EmailPreviewContent: React.FC<EmailPreviewContentProps> = ({
  recipientName,
  companyName,
  pulseScoreData,
  certificationLevel
}) => {
  const tierInfo = getTierDisplay(pulseScoreData.tier);
  
  return (
    <div className="p-8">
      <div className="mb-6 text-center">
        <img 
          src="/lovable-uploads/da2df9b1-afa2-4019-be42-cbfdedf8740b.png" 
          alt="PulsePlace" 
          width="180" 
          className="mx-auto mb-4"
        />
      </div>
      
      <div className="mb-6">
        <p className="mb-4">Dear {recipientName},</p>
        <p className="mb-4">
          Congratulations! {companyName || 'Your organization'} has officially achieved 
          <strong className="text-pulse-700"> {certificationLevel}</strong> status with PulsePlace.
        </p>
        <p className="mb-4">
          This certification reflects your organization's commitment to creating a healthy, 
          engaging workplace culture based on real employee feedback.
        </p>
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h2 className="text-xl font-bold mb-3 text-center">Your PulseScore™ Results</h2>
        
        <div className="mb-4 text-center">
          <span className="text-4xl font-bold text-pulse-600">{pulseScoreData.overallScore}</span>
          <span className="text-gray-500">/100</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {pulseScoreData.categoryScores.map((category) => (
            <div key={category.category} className="text-center p-3 bg-white rounded-md shadow-sm">
              <div className="text-sm text-gray-500 mb-1">
                {category.category.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </div>
              <div className="text-lg font-semibold">
                {category.score}
                <span className="text-xs text-gray-400">/100</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-white rounded-md shadow-sm mb-4">
          <h3 className="text-sm font-medium mb-2">Key Insights:</h3>
          <ul className="text-sm space-y-2 pl-4 list-disc">
            {pulseScoreData.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <span 
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tierInfo.color}`}>
            {certificationLevel}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-bold mb-2">Next Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Download your certification badge to display on your careers page and recruitment materials</li>
          <li>Share your certification status on LinkedIn and other social channels</li>
          <li>Schedule a feedback session with your team to discuss the insights</li>
        </ol>
      </div>
      
      <div className="text-center mb-6">
        <a href="#" className="inline-block bg-pulse-600 text-white px-6 py-3 rounded-md font-medium text-sm">
          View Your Full Certification Dashboard
        </a>
      </div>
      
      <div className="text-sm text-gray-500 border-t pt-4">
        <p>Thank you for being part of the PulsePlace community.</p>
        <p className="mt-2">
          The PulsePlace Team<br />
          <a href="mailto:support@pulseplace.ai" className="text-pulse-600">support@pulseplace.ai</a>
        </p>
      </div>
    </div>
  );
};

export default EmailPreviewContent;
