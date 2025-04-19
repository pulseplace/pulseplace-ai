
import React from 'react';
import { Card } from "@/components/ui/card";
import PulseSurveyForm from '@/components/survey/PulseSurveyForm';

const PulseScoreLite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pulse-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Measure Your Workplace Culture
          </h1>
          <p className="text-lg text-gray-600">
            Take our 5-minute assessment to get your PulseScore™ and discover how your workplace culture compares.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6">
          <PulseSurveyForm />
        </Card>
      </div>
    </div>
  );
};

export default PulseScoreLite;
