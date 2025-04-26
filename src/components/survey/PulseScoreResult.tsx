
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CategoryScore } from '@/types/scoring.types';

interface PulseScoreResultProps {
  score: number;
  categoryScores: CategoryScore[];
}

const PulseScoreResult: React.FC<PulseScoreResultProps> = ({ score, categoryScores }) => {
  // Helper function to get color based on score
  const getScoreColor = (value: number) => {
    if (value >= 85) return "text-green-600";
    if (value >= 70) return "text-blue-600";
    if (value >= 50) return "text-amber-600";
    return "text-red-600";
  };
  
  // Helper function to get progress color based on score
  const getProgressColor = (value: number) => {
    if (value >= 85) return "bg-green-600";
    if (value >= 70) return "bg-blue-600";
    if (value >= 50) return "bg-amber-600";
    return "bg-red-600";
  };
  
  // Get the tier based on score
  const getTier = (value: number) => {
    if (value >= 85) return "Thriving";
    if (value >= 70) return "Stable";
    if (value >= 50) return "At Risk";
    return "Critical";
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="text-center py-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Your PulseScore™</h2>
        <div className="flex justify-center items-center">
          <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="block text-sm text-gray-500">out of 100</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(score)} bg-opacity-10 bg-${getScoreColor(score).split('-')[1]}-100`}>
            {getTier(score)}
          </span>
        </div>
        
        <p className="mt-4 text-gray-600">
          {score >= 75 
            ? "Great news! Your organization may qualify for Pulse Certified™ status."
            : "Your organization has opportunities to improve workplace culture."}
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        
        {categoryScores.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{formatCategoryName(category.category)}</span>
              <span className={getScoreColor(Math.round(category.score))}>
                {Math.round(category.score)}%
              </span>
            </div>
            <Progress value={category.score} className={getProgressColor(Math.round(category.score))} />
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t">
        <p className="text-gray-600">
          Processing your results... you'll be redirected to your detailed analysis shortly.
        </p>
      </div>
    </div>
  );
};

export default PulseScoreResult;
