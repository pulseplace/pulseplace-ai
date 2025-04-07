
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';
import { Tables } from '@/types/database.types';

interface SurveyDetailProps {
  surveyId: string;
}

interface ResponseWithUser {
  id: string;
  user_id: string;
  responses: any;
  sentiment_score: number | null;
  created_at: string;
  user: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const SurveyDetail = ({ surveyId }: SurveyDetailProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Tables<'pulse_surveys'> | null>(null);
  const [responses, setResponses] = useState<ResponseWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      if (!user) return;

      try {
        // Fetch the survey
        const { data: surveyData, error: surveyError } = await supabase
          .from('pulse_surveys')
          .select('*')
          .eq('id', surveyId)
          .single();

        if (surveyError) throw surveyError;
        setSurvey(surveyData);

        // Fetch responses with user profiles
        const { data: responsesData, error: responsesError } = await supabase
          .from('survey_responses')
          .select(`
            id,
            user_id,
            responses,
            sentiment_score,
            created_at,
            profiles:profiles(
              first_name,
              last_name
            )
          `)
          .eq('survey_id', surveyId)
          .order('created_at', { ascending: false });

        if (responsesError) throw responsesError;

        // Format the responses data
        const formattedResponses: ResponseWithUser[] = responsesData.map(response => {
          return {
            id: response.id,
            user_id: response.user_id || "",
            responses: response.responses,
            sentiment_score: response.sentiment_score,
            created_at: response.created_at,
            user: response.profiles && response.profiles.length > 0 ? {
              first_name: response.profiles[0].first_name,
              last_name: response.profiles[0].last_name
            } : null
          };
        });

        setResponses(formattedResponses);
      } catch (error) {
        console.error('Error fetching survey details:', error);
        toast.error('Failed to load survey details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyDetails();
  }, [surveyId, user]);

  const toggleSurveyStatus = async () => {
    if (!survey) return;

    try {
      const { error } = await supabase
        .from('pulse_surveys')
        .update({ is_active: !survey.is_active })
        .eq('id', survey.id);

      if (error) throw error;

      setSurvey({ ...survey, is_active: !survey.is_active });
      toast.success(`Survey ${survey.is_active ? 'closed' : 'activated'} successfully`);
    } catch (error: any) {
      console.error('Error updating survey status:', error);
      toast.error('Failed to update survey status');
    }
  };

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
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/surveys')}
        >
          Back to Surveys
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant={survey.is_active ? "destructive" : "outline"} 
            onClick={toggleSurveyStatus}
          >
            {survey.is_active ? "Close Survey" : "Activate Survey"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{survey.title}</CardTitle>
              <CardDescription>{survey.description || 'No description provided'}</CardDescription>
            </div>
            <Badge className={survey.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {survey.is_active ? 'Active' : 'Closed'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="mt-1 font-medium">{survey.department || 'All'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 font-medium">
                {formatDistanceToNow(new Date(survey.created_at), { addSuffix: true })}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-500">Responses</h3>
              <p className="mt-1 font-medium">{responses.length}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Survey Responses</h3>
          
          {responses.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">No responses yet</h4>
              <p className="text-gray-500">Share your survey to start collecting responses</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Respondent</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell>
                      {response.user ? 
                        `${response.user.first_name} ${response.user.last_name}` : 
                        'Anonymous'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(response.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {response.sentiment_score !== null ? (
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            response.sentiment_score > 0.5 ? 'bg-green-500' : 
                            response.sentiment_score < 0 ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          {response.sentiment_score > 0.5 ? 'Positive' : 
                           response.sentiment_score < 0 ? 'Negative' : 'Neutral'}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDetail;
