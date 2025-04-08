
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { Shield } from 'lucide-react';

interface SurveyResponsesTableProps {
  responses: any[];
  isAnonymous?: boolean;
}

const SurveyResponsesTable: React.FC<SurveyResponsesTableProps> = ({ 
  responses,
  isAnonymous = false
}) => {
  if (responses.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-gray-50">
        <p className="text-gray-500">No responses yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {!isAnonymous && <TableHead>Respondent</TableHead>}
            <TableHead>Submitted</TableHead>
            <TableHead>Sentiment Score</TableHead>
            <TableHead>Question Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response) => {
            const questionCount = Object.keys(response.responses || {}).length;
            const formattedDate = response.created_at 
              ? format(new Date(response.created_at), 'MMM d, yyyy h:mm a')
              : 'Unknown';
              
            return (
              <TableRow key={response.id}>
                {!isAnonymous && (
                  <TableCell>
                    {response.user && response.user?.first_name 
                      ? `${response.user.first_name} ${response.user.last_name || ''}`
                      : 'Unknown User'}
                  </TableCell>
                )}
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  {response.sentiment_score !== null 
                    ? `${Math.round(response.sentiment_score * 100) / 100}` 
                    : 'N/A'}
                </TableCell>
                <TableCell>{questionCount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyResponsesTable;
