
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SurveyHeader from './survey/SurveyHeader';
import SurveyStats from './survey/SurveyStats';
import SurveyResponsesTable from './survey/SurveyResponsesTable';
import { useSurveyData } from './survey/useSurveyData';

interface SurveyDetailProps {
  surveyId: string;
}

const SurveyDetail = ({ surveyId }: SurveyDetailProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { survey, setSurvey, responses, isLoading, error } = useSurveyData(surveyId, user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pulse-600"></div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Survey not found</h2>
        <p className="text-gray-500 mb-4">The survey you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={() => navigate('/dashboard/surveys')}>
          Back to Surveys
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SurveyHeader survey={survey} setSurvey={setSurvey} />

      <Card>
        <CardContent className="pt-6">
          <SurveyStats survey={survey} responsesCount={responses.length} />

          <h3 className="text-lg font-semibold mb-4">Survey Responses</h3>
          
          <SurveyResponsesTable responses={responses} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDetail;
