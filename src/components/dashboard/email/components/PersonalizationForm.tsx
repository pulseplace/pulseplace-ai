
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface EmailPersonalization {
  recipient_name: string;
  pulse_score: string;
  certification_level: string;
  trust_score: string;
  engagement_score: string;
  culture_score: string;
  ai_summary: string;
  badge_download_link: string;
}

interface PersonalizationFormProps {
  personalization: EmailPersonalization;
  handleInputChange: (field: keyof EmailPersonalization, value: string) => void;
}

const PersonalizationForm: React.FC<PersonalizationFormProps> = ({
  personalization,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personalization Fields</h3>
      
      <div>
        <Label htmlFor="recipient_name">Recipient Name</Label>
        <Input 
          id="recipient_name" 
          value={personalization.recipient_name} 
          onChange={(e) => handleInputChange('recipient_name', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="pulse_score">Pulse Score (0-100)</Label>
        <Input 
          id="pulse_score" 
          value={personalization.pulse_score} 
          onChange={(e) => handleInputChange('pulse_score', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="certification_level">Certification Level</Label>
        <Input 
          id="certification_level" 
          value={personalization.certification_level} 
          onChange={(e) => handleInputChange('certification_level', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor="trust_score">Trust Score</Label>
          <Input 
            id="trust_score" 
            value={personalization.trust_score} 
            onChange={(e) => handleInputChange('trust_score', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="engagement_score">Engagement</Label>
          <Input 
            id="engagement_score" 
            value={personalization.engagement_score} 
            onChange={(e) => handleInputChange('engagement_score', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="culture_score">Culture</Label>
          <Input 
            id="culture_score" 
            value={personalization.culture_score} 
            onChange={(e) => handleInputChange('culture_score', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="ai_summary">AI Insight Summary</Label>
        <Input 
          id="ai_summary" 
          value={personalization.ai_summary} 
          onChange={(e) => handleInputChange('ai_summary', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="badge_download_link">Badge Download Link</Label>
        <Input 
          id="badge_download_link" 
          value={personalization.badge_download_link} 
          onChange={(e) => handleInputChange('badge_download_link', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalizationForm;
