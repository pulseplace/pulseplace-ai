
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Survey {
  id: string;
  title: string;
  description: string | null;
  department: string | null;
  created_at: string;
  is_active: boolean;
  response_count?: number;
}

const SurveyList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      if (!user) return;

      try {
        // Fetch surveys
        const { data: surveysData, error: surveysError } = await supabase
          .from('pulse_surveys')
          .select('*')
          .order('created_at', { ascending: false });

        if (surveysError) throw surveysError;

        // Get response counts for each survey
        const surveysWithCounts = await Promise.all(
          surveysData.map(async (survey) => {
            const { count, error: countError } = await supabase
              .from('survey_responses')
              .select('*', { count: 'exact', head: true })
              .eq('survey_id', survey.id);

            if (countError) throw countError;

            return {
              ...survey,
              response_count: count || 0
            };
          })
        );

        setSurveys(surveysWithCounts);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pulse-600"></div>
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
                  <TableCell>{survey.response_count || 0}</TableCell>
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
