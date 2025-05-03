
import React from 'react';
import { PulseScoreData } from '@/types/scoring.types';
import { Progress } from '@/components/ui/progress';

interface EmailPreviewContentProps {
  pulseScore: PulseScoreData & { companyName: string };
}

const EmailPreviewContent: React.FC<EmailPreviewContentProps> = ({ pulseScore }) => {
  const {
    companyName,
    overallScore,
    tier,
    themesScores = [],
    categoryScores = [],
    insights = [] // Using optional chaining since insights is now optional
  } = pulseScore;
  
  const getTierDescription = (tier: string): string => {
    switch (tier) {
      case 'pulse_certified':
        return 'Pulse Certified™ (Excellent)';
      case 'emerging_culture':
        return 'Emerging Culture (Good)';
      case 'at_risk':
        return 'At Risk (Needs Improvement)';
      case 'intervention_advised':
        return 'Intervention Advised (Critical)';
      default:
        return 'Pending Review';
    }
  };
  
  const getTierColor = (tier: string): { textColor: string; bgColor: string } => {
    switch (tier) {
      case 'pulse_certified':
        return { textColor: 'text-green-600', bgColor: 'bg-green-100' };
      case 'emerging_culture':
        return { textColor: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 'at_risk':
        return { textColor: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'intervention_advised':
        return { textColor: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { textColor: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };
  
  const tierDescription = getTierDescription(tier);
  const { textColor, bgColor } = getTierColor(tier);
  
  // Date formatting
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="email-preview">
      {/* Header with logo */}
      <div className="text-center py-4 bg-gray-50 rounded-t-lg">
        <img 
          src="https://storage.googleapis.com/pulseplace/logo.png" 
          alt="PulsePlace Logo"
          className="h-8 mx-auto"
        />
      </div>
      
      {/* Certificate content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-center">PulseScore™ Certification</h2>
        <p className="text-center text-gray-600 mt-2">
          This is to certify that <strong>{companyName}</strong> has achieved the following PulseScore™ 
          based on our comprehensive workplace culture assessment.
        </p>
        
        {/* Score display */}
        <div className="flex flex-col items-center my-8">
          <div className={`text-6xl font-bold ${textColor}`}>{overallScore}</div>
          <div className={`${bgColor} ${textColor} px-4 py-1 rounded-full text-sm font-medium mt-3`}>
            {tierDescription}
          </div>
          <div className="text-sm text-gray-500 mt-3">Issued on {currentDate}</div>
        </div>
        
        {/* Category Results */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Category Results</h3>
          <div className="space-y-4">
            {categoryScores.map(category => (
              <div key={category.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{category.category.replace(/_/g, ' ')}</span>
                  <span>{category.score}%</span>
                </div>
                <Progress value={category.score} className="h-2" />
                <div className="text-xs text-gray-500">
                  Weight in final score: {Math.round(category.weight * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Theme Breakdown */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Theme Breakdown</h3>
          <div className="space-y-3">
            {themesScores.map(theme => (
              <div key={theme.theme} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{theme.theme.replace(/_/g, ' ')}</span>
                  <span>{theme.score}%</span>
                </div>
                <Progress value={theme.score} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Key Insights */}
        {insights && insights.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-3">Key Insights</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              {insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="border-l-2 border-pulse-600 pl-3 py-1">
                  <h4 className="text-sm font-medium">{insight.title}</h4>
                  <p className="text-xs text-gray-600">{insight.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-600 mt-6">
          The PulseScore™ certification is valid for 12 months from the issue date. 
          We commend your organization's commitment to fostering a positive workplace culture.
        </p>
      </div>
      
      {/* Footer */}
      <div className="text-center border-t pt-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} PulsePlace. All rights reserved.</p>
        <p>This certification is based on employee feedback collected through the PulsePlace platform.</p>
      </div>
    </div>
  );
};

export default EmailPreviewContent;
