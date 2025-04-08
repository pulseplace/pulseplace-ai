
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SurveyHeader from './survey/SurveyHeader';
import SurveyStats from './survey/SurveyStats';
import SurveyResponsesTable from './survey/SurveyResponsesTable';
import { useSurveyData } from './survey/useSurveyData';
import { Badge } from "@/components/ui/badge";

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
      <div className="flex justify-between items-center">
        <SurveyHeader survey={survey} setSurvey={setSurvey} />
        
        <Badge 
          className={`flex items-center gap-1 ${
            survey.is_anonymous 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {survey.is_anonymous ? (
            <>
              <Shield className="h-3 w-3" />
              <span>Anonymous</span>
            </>
          ) : (
            <>
              <Eye className="h-3 w-3" />
              <span>Identified</span>
            </>
          )}
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <SurveyStats survey={survey} responsesCount={responses.length} />

          <h3 className="text-lg font-semibold mb-4">Survey Responses</h3>
          
          {survey.is_anonymous && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm text-gray-600">
                <Shield className="h-4 w-4 inline-block mr-1 text-green-600" />
                This is an anonymous survey. Individual respondent identities are not recorded.
              </p>
            </div>
          )}
          
          <SurveyResponsesTable responses={responses} isAnonymous={survey.is_anonymous} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDetail;
