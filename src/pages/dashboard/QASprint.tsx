
import React from 'react';
import QASprintChecklist from '@/components/sprint/QASprintChecklist';
import DemoDayCountdown from '@/components/sprint/DemoDayCountdown';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QASprint = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>QA Sprint Checklist | PulsePlace.ai</title>
        <meta name="description" content="Final QA Sprint Checklist for Demo Day" />
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">QA Sprint Checklist</h1>
        <p className="text-gray-500">Tracking our progress towards Demo Day readiness</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DemoDayCountdown />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="checklist">
            <TabsList>
              <TabsTrigger value="checklist">QA Checklist</TabsTrigger>
              <TabsTrigger value="instructions">Testing Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="checklist" className="mt-4">
              <QASprintChecklist />
            </TabsContent>
            
            <TabsContent value="instructions" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h2 className="text-lg font-medium mb-4">Testing Instructions</h2>
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    <strong>HeroStats:</strong> Try disabling your internet connection while on the homepage to test fallback states
                  </li>
                  <li>
                    <strong>Mobile View:</strong> Test on different devices or using Chrome's responsive design mode
                  </li>
                  <li>
                    <strong>PulseBot:</strong> Test the chat interface in different browsers and screen sizes
                  </li>
                  <li>
                    <strong>Insight Cards:</strong> Verify loading states and error handling
                  </li>
                </ul>
                
                <h2 className="text-lg font-medium mt-6 mb-4">Demo Day Goals</h2>
                <p className="mb-4">
                  Our April 28th Beta Demo Day marks the start of onboarding our first beta users. 
                  All core functionality must be working flawlessly, with proper error handling 
                  and responsive design.
                </p>
                
                <h3 className="text-md font-medium mt-4 mb-2">Success Criteria:</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>All checkboxes in the QA Sprint complete</li>
                  <li>Zero console errors during demo walkthrough</li>
                  <li>Mobile-responsive on standard devices</li>
                  <li>PulseBot demo flow working end-to-end</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QASprint;
