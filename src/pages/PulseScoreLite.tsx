
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import Navbar from '@/components/navigation';
import Footer from '@/components/Footer';
import PulseSurveyForm from '@/components/survey/PulseSurveyForm';
import PulseScoreResult from '@/components/survey/PulseScoreResult';
import { useNavigate } from 'react-router-dom';
import { SurveyResponse } from '@/types/scoring.types';
import { processSurveyResponse } from '@/utils/scoring';

const PulseScoreLite = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pulseScore, setPulseScore] = useState<number | null>(null);
  const [categoryScores, setCategoryScores] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSurveySubmit = (response: SurveyResponse) => {
    // Process the survey response
    const result = processSurveyResponse(response);
    
    // Save scores
    setPulseScore(result.overallScore);
    setCategoryScores(result.categoryScores);
    
    // Mark as submitted
    setIsSubmitted(true);
    
    // If score is high enough, navigate to thank you page after a delay
    if (result.overallScore > 0) {
      setTimeout(() => {
        navigate('/pulse-score-lite/thank-you', { 
          state: { 
            pulseScore: result.overallScore,
            categoryScores: result.categoryScores,
            isCertificationEligible: result.overallScore >= 75
          } 
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pulse-50 to-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Measure Your Workplace Culture
          </h1>
          <p className="text-lg text-gray-600">
            Take our quick assessment to get your PulseScore™ and discover how your workplace culture compares.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6">
          {!isSubmitted ? (
            <PulseSurveyForm onSubmit={handleSurveySubmit} />
          ) : (
            <PulseScoreResult score={pulseScore || 0} categoryScores={categoryScores} />
          )}
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PulseScoreLite;
