
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/types/database.types';

interface SurveyHeaderProps {
  survey: Tables<'pulse_surveys'>;
  setSurvey: React.Dispatch<React.SetStateAction<Tables<'pulse_surveys'> | null>>;
}

const SurveyHeader: React.FC<SurveyHeaderProps> = ({ survey, setSurvey }) => {
  const navigate = useNavigate();

  const toggleSurveyStatus = async () => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
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
      </Card>
    </>
  );
};

export default SurveyHeader;
