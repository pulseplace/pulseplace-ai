
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Copy,
  Bot
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AISummary {
  id: string;
  teamId: string;
  teamName: string;
  summaryText: string;
  generatedAt: Date;
  score: number;
  feedbackRating?: 'positive' | 'negative' | null;
}

interface AISummaryWithFeedbackProps {
  summary?: AISummary;
  isLoading?: boolean;
  onRegenerateSummary?: (teamId: string) => void;
  onProvideFeedback?: (summaryId: string, rating: 'positive' | 'negative') => void;
}

const AISummaryWithFeedback: React.FC<AISummaryWithFeedbackProps> = ({
  summary,
  isLoading = false,
  onRegenerateSummary,
  onProvideFeedback
}) => {
  const { toast } = useToast();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  
  // Sample data if no summary is provided
  const defaultSummary: AISummary = {
    id: 'sample-1',
    teamId: 'team-1',
    teamName: 'Engineering Team',
    summaryText: 
      "The Engineering team shows strong collaboration and technical excellence with a PulseScore of 82. " +
      "Team members highlight positive experiences around code reviews and knowledge sharing. " +
      "Areas for improvement include work-life balance and clearer project prioritization. " +
      "Recommend implementing structured sprint planning and creating more opportunities for skill development.",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    score: 82
  };
  
  const activeSummary = summary || defaultSummary;
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Handle feedback submission
  const handleFeedback = (rating: 'positive' | 'negative') => {
    if (onProvideFeedback) {
      onProvideFeedback(activeSummary.id, rating);
    }
    
    setFeedbackSubmitted(true);
    
    toast({
      title: "Feedback Submitted",
      description: `Thank you for your ${rating} feedback on this AI summary.`,
    });
  };
  
  // Handle regenerate request
  const handleRegenerate = () => {
    if (onRegenerateSummary) {
      onRegenerateSummary(activeSummary.teamId);
    } else {
      toast({
        title: "Regenerating Summary",
        description: "A new summary will be generated for this team.",
      });
    }
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeSummary.summaryText)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Summary text copied to clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually",
          variant: "destructive",
        });
      });
  };
  
  return (
    <Card className="relative">
      {/* AI Badge */}
      <Badge 
        variant="outline" 
        className="absolute top-3 right-3 bg-purple-50 text-purple-800 border-purple-200"
      >
        <Bot className="h-3 w-3 mr-1" />
        AI-Generated
      </Badge>
      
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          PulseBot™ AI Summary: {activeSummary.teamName}
        </CardTitle>
        <CardDescription>
          Generated at {formatDate(activeSummary.generatedAt)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : (
          <>
            <div className="p-4 bg-gray-50 rounded-lg text-sm relative">
              <p className="whitespace-pre-line">{activeSummary.summaryText}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={copyToClipboard}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  Was this summary helpful?
                </div>
                
                {!feedbackSubmitted && !activeSummary.feedbackRating ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleFeedback('positive')}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                      Yes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleFeedback('negative')}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                      No
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center text-sm">
                    {activeSummary.feedbackRating === 'positive' || feedbackSubmitted ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Feedback received
                      </span>
                    ) : (
                      <span className="text-amber-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Marked as not helpful
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
                onClick={handleRegenerate}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AISummaryWithFeedback;
