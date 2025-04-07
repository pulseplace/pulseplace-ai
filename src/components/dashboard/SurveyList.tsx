
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { getSurveys, getSurveyResponses } from '@/services/surveyService';
import { Tables } from '@/types/database.types';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SurveyWithCount extends Tables<'pulse_surveys'> {
  response_count: number;
}

const SurveyList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch surveys
        const surveysData = await getSurveys();
        
        // Get response counts for each survey
        const surveysWithCounts = await Promise.all(
          surveysData.map(async (survey) => {
            try {
              const responses = await getSurveyResponses(survey.id);
              return {
                ...survey,
                response_count: responses.length
              };
            } catch (err) {
              console.error(`Error fetching responses for survey ${survey.id}:`, err);
              return {
                ...survey,
                response_count: 0
              };
            }
          })
        );

        setSurveys(surveysWithCounts);
      } catch (err: any) {
        console.error('Error fetching surveys:', err);
        setError(err.message || 'Failed to load surveys');
        toast.error('Failed to load surveys');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
          <span className="mt-2 text-gray-600">Loading surveys...</span>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pulse Surveys</CardTitle>
          <CardDescription>Manage and track your organization's pulse surveys</CardDescription>
        </div>
        <Button className="bg-pulse-gradient" onClick={() => navigate('/dashboard/surveys/new')}>
          Create Survey
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {surveys.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys yet</h3>
            <p className="text-gray-500 mb-4">Create your first pulse survey to start gathering feedback</p>
            <Button className="bg-pulse-gradient" onClick={() => navigate('/dashboard/surveys/new')}>
              Create Your First Survey
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell className="font-medium">
                    <Link to={`/dashboard/surveys/${survey.id}`} className="hover:text-pulse-600">
                      {survey.title}
                    </Link>
                  </TableCell>
                  <TableCell>{survey.department || 'All'}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(survey.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>{survey.response_count}</TableCell>
                  <TableCell>
                    <Badge className={survey.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {survey.is_active ? 'Active' : 'Closed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/dashboard/surveys/${survey.id}`)}
                    >
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
  );
};

export default SurveyList;
