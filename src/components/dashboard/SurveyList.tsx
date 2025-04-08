
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
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const SurveyList = () => {
  const navigate = useNavigate();
  const { surveys, responses, isLoading, error, refreshData } = useDashboard();
  const [surveysWithCounts, setSurveysWithCounts] = useState<any[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  // Process surveys to add response counts
  useEffect(() => {
    if (surveys && responses) {
      const processedSurveys = surveys.map(survey => {
        const responseCount = responses.filter(r => r.survey_id === survey.id).length;
        return {
          ...survey,
          response_count: responseCount
        };
      });
      setSurveysWithCounts(processedSurveys);
    }
  }, [surveys, responses]);

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
        
        {surveysWithCounts.length === 0 ? (
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
              {surveysWithCounts.map((survey) => (
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
