
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Users, CheckCircle2 } from 'lucide-react';

interface QuickActionsProps {
  onSendRemindersClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onSendRemindersClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2"
            onClick={onSendRemindersClick}
          >
            <Mail className="h-5 w-5 mb-2" />
            <span className="text-xs">Send Reminders</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
            <Calendar className="h-5 w-5 mb-2" />
            <span className="text-xs">Schedule Survey</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
            <Users className="h-5 w-5 mb-2" />
            <span className="text-xs">Invite Employees</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
            <CheckCircle2 className="h-5 w-5 mb-2" />
            <span className="text-xs">Verify Certification</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
