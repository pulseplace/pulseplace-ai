
import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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

interface SurveyResponsesTableProps {
  responses: ResponseWithUser[];
}

const SurveyResponsesTable: React.FC<SurveyResponsesTableProps> = ({ responses }) => {
  if (responses.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <h4 className="text-lg font-medium text-gray-700 mb-2">No responses yet</h4>
        <p className="text-gray-500">Share your survey to start collecting responses</p>
      </div>
    );
  }

  return (
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
  );
};

export default SurveyResponsesTable;
