
import React from 'react';
import { Button } from "@/components/ui/button";
import { CategoryScore, PulseScoreTier, ScoringCategory } from '@/types/scoring.types';

interface ScoreDisplayProps {
  certData: {
    overallScore: number;
    categoryScores: CategoryScore[];
    tier: PulseScoreTier;
  };
  onRandomize: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ certData, onRandomize }) => {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-sm font-medium mb-3 text-blue-800">Certification Parameters</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="block text-sm text-blue-700 mb-1">Overall Score</span>
          <div className="bg-white p-2 rounded border text-xl font-bold text-blue-700">
            {certData.overallScore}/100
          </div>
        </div>
        <div>
          <span className="block text-sm text-blue-700 mb-1">Certification Tier</span>
          <div className="bg-white p-2 rounded border font-medium text-blue-700">
            {certData.tier.replace('_', ' ').toUpperCase()}
          </div>
        </div>
        {certData.categoryScores.map((cat, index) => (
          <div key={index}>
            <span className="block text-sm text-blue-700 mb-1">
              {cat.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <div className="bg-white p-2 rounded border font-medium text-blue-700">
              {cat.score}/100
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onRandomize}
      >
        Randomize Scores
      </Button>
    </div>
  );
};

export default ScoreDisplay;
