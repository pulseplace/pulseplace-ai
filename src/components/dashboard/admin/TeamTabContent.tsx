
import React from 'react';
import { Button } from "@/components/ui/button";
import { TeamMember } from '@/services/teamAdminService';

interface TeamTabContentProps {
  teamMembers: TeamMember[];
}

const TeamTabContent: React.FC<TeamTabContentProps> = ({ teamMembers }) => {
  return (
    <div className="rounded-md border">
      <div className="bg-slate-50 p-4 grid grid-cols-6 gap-4 font-medium">
        <div className="col-span-2">Name / Email</div>
        <div>Department</div>
        <div>Status</div>
        <div>Last Active</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member.id} className="p-4 grid grid-cols-6 gap-4 items-center">
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
                <Button variant="ghost" size="sm">
                  View
                </Button>
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
  );
};

export default TeamTabContent;
