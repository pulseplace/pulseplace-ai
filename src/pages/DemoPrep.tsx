
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DemoSlideViewer from '@/components/demo-day/DemoSlideViewer';
import RoadmapVisual from '@/components/demo-day/RoadmapVisual';
import QASprintChecklist from '@/components/sprint/QASprintChecklist';

const DemoPrep: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Demo Day Preparation | PulsePlace.ai</title>
        <meta name="description" content="Demo day preparation and slide management" />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Demo Day Preparation</h1>
          <p className="text-muted-foreground">
            Manage presentation materials and track readiness status
          </p>
        </div>

        <DemoSlideViewer />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RoadmapVisual />
          <QASprintChecklist />
        </div>
      </div>
    </div>
  );
};

export default DemoPrep;
