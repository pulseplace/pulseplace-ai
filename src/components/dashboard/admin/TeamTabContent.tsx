import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  MessageSquare,
  FileDown,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { TeamMember, teamAdminService } from '@/services/teamAdminService';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TeamTabContentProps {
  teamMembers: TeamMember[];
  onRefresh?: () => Promise<void>;
}

const TeamTabContent: React.FC<TeamTabContentProps> = ({ teamMembers, onRefresh }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  
  const handleExportCSV = async () => {
    setIsLoading(true);
    try {
      const result = await teamAdminService.exportTeamDataCSV();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to export CSV');
      }
      
      // Create and download the CSV file
      const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `tayana-team-pulse-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Completed",
        description: "Your CSV export has been downloaded.",
      });
    } catch (error: any) {
      console.error('Error exporting CSV:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export data to CSV",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      const result = await teamAdminService.exportToPDF();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to export PDF');
      }
      
      // In a real implementation, this would download or open the PDF
      toast({
        title: "PDF Export Complete",
        description: "Your PDF report has been downloaded.",
      });
    } catch (error: any) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export data to PDF",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId) 
        : [...prev, memberId]
    );
  };
  
  const handleSelectAllMembers = () => {
    if (selectedMembers.length === teamMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(teamMembers.map(member => member.id));
    }
  };
  
  const handleSendReminders = async () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No Members Selected",
        description: "Please select at least one team member to send reminders.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await teamAdminService.sendReminders(selectedMembers);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send reminders');
      }
      
      toast({
        title: "Reminders Sent",
        description: `Sent survey reminders to ${result.count} team members.`,
      });
      
      // Reset selection
      setSelectedMembers([]);
      setIsReminderDialogOpen(false);
      
      // Refresh data if callback is provided
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error: any) {
      console.error('Error sending reminders:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send survey reminders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const pendingMembers = teamMembers.filter(member => member.surveyStatus !== 'completed');
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            disabled={selectedMembers.length === 0 || isLoading}
            onClick={() => setIsReminderDialogOpen(true)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportCSV}>
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {onRefresh && (
            <Button 
              variant="outline" 
              size="sm"
              disabled={isLoading}
              onClick={() => onRefresh()}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
        
        <Button size="sm" className="bg-pulse-gradient" onClick={() => window.location.href = '/dashboard/team-upload'}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Members
        </Button>
      </div>
      
      <div className="rounded-md border">
        <div className="bg-slate-50 p-4 grid grid-cols-7 gap-4 font-medium">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 rounded border-gray-300"
              checked={selectedMembers.length === teamMembers.length && teamMembers.length > 0}
              onChange={handleSelectAllMembers}
            />
            <span>Select</span>
          </div>
          <div className="col-span-2">Name / Email</div>
          <div>Department</div>
          <div>Status</div>
          <div>Last Active</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div key={member.id} className="p-4 grid grid-cols-7 gap-4 items-center">
                <div>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => handleSelectMember(member.id)}
                  />
                </div>
                <div className="col-span-2">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                <div>{member.department}</div>
                <div>
                  {member.surveyStatus === 'completed' && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Completed
                    </span>
                  )}
                  {member.surveyStatus === 'pending' && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  )}
                  {member.surveyStatus === 'not_sent' && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      Not Sent
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{member.lastActive}</div>
                <div className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => {
                          setSelectedMembers([member.id]);
                          setIsReminderDialogOpen(true);
                        }}
                        disabled={member.surveyStatus === 'completed'}
                      >
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No team members found. Try adjusting your filters or adding team members.
            </div>
          )}
        </div>
      </div>
      
      {/* Send Reminder Dialog */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent>
          <DialogTitle>Send Survey Reminders</DialogTitle>
          <DialogDescription>
            {selectedMembers.length === 1 
              ? "Send a reminder to 1 team member to complete their survey." 
              : `Send reminders to ${selectedMembers.length} team members to complete their surveys.`}
          </DialogDescription>
          
          {selectedMembers.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Selected Team Members:</h4>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                <ul className="space-y-1">
                  {teamMembers
                    .filter(member => selectedMembers.includes(member.id))
                    .map(member => (
                      <li key={member.id} className="text-sm">
                        {member.name} ({member.email})
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsReminderDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendReminders}
              disabled={isLoading || selectedMembers.length === 0}
              className="bg-pulse-gradient"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Reminders
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamTabContent;
