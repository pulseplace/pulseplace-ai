
import React from 'react';
import MetaTags from '@/components/MetaTags';
import ProjectHandoverReport from '@/components/task-admin/ProjectHandoverReport';
import { Card, CardContent } from '@/components/ui/card';

const ProjectHandover: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags 
        title="Project Handover Report | PulsePlace.ai" 
        description="Comprehensive project status and handover report for the PulsePlace.ai beta launch."
      />
      
      <Card className="mt-4">
        <CardContent className="pt-6">
          <ProjectHandoverReport />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectHandover;
