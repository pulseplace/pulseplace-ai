
import React from 'react';
import QASprintChecklist from '@/components/sprint/QASprintChecklist';
import { Helmet } from 'react-helmet-async';

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
      
      <div className="space-y-6">
        <QASprintChecklist />
        
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
        </div>
      </div>
    </div>
  );
};

export default QASprint;
