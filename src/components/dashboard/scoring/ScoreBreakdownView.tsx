
import React from 'react';
import { Card } from '@/components/ui/card';
import { getSampleSurveyQuestions } from '@/utils/scoring';

const ScoreBreakdownView = () => {
  const questions = getSampleSurveyQuestions();
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Score Weighting by Theme</h3>
        <p className="text-gray-600">
          PulseScore™ uses weighted scoring across six key themes to measure workplace culture quality.
        </p>
      </div>

      <div className="grid gap-4">
        {questions.map(question => (
          <Card key={question.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{question.text}</div>
              <div className="text-sm text-gray-500">Weight: {question.weight}x</div>
            </div>
            <div className="text-sm text-gray-600">
              Theme: {question.theme.replace(/_/g, ' ')}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdownView;
