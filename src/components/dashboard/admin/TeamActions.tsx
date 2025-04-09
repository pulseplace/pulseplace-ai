
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { TeamMember } from '@/services/teamAdminService';

interface TeamActionsProps {
  teamMembers: TeamMember[];
  onSendReminders: () => Promise<void>;
  onBulkInvite: () => void;
  isRefreshing: boolean;
}

const TeamActions: React.FC<TeamActionsProps> = ({
  teamMembers,
  onSendReminders,
  onBulkInvite,
  isRefreshing
}) => {
  const { toast } = useToast();
  
  const handleSendReminders = async () => {
    const pendingMembers = teamMembers.filter(member => member.surveyStatus === 'pending');
    
    if (pendingMembers.length === 0) {
      toast({
        title: "No Reminders Sent",
        description: "All team members have already completed the survey.",
      });
      return;
    }
    
    await onSendReminders();
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSendReminders}
        disabled={isRefreshing}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Send Reminders
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onBulkInvite}
        disabled={isRefreshing}
      >
        Bulk Invite
      </Button>
    </div>
  );
};

export default TeamActions;
