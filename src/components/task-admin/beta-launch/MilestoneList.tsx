
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Milestone from './Milestone';
import { MilestoneItem } from './types';

interface MilestoneListProps {
  milestones: MilestoneItem[];
}

const MilestoneList: React.FC<MilestoneListProps> = ({ milestones }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        {milestones.map((milestone, index) => (
          <Milestone key={index} milestone={milestone} />
        ))}
      </CardContent>
    </Card>
  );
};

export default MilestoneList;
