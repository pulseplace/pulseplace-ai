
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HandoverStats from './handover/HandoverStats';
import CriticalPathTab from './handover/CriticalPathTab';
import CompletionStatusTab from './handover/CompletionStatusTab';
import AIIntegrationTab from './handover/AIIntegrationTab';
import RisksTab from './handover/RisksTab';
import HandoverFooter from './handover/HandoverFooter';

const ProjectHandoverReport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Project Handover Report</h1>
          <p className="text-gray-600">PulsePlace.ai Beta Launch Preparation</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Report
          </button>
          <button className="bg-blue-100 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-200">
            Validate
          </button>
        </div>
      </div>
      
      <HandoverStats />
      
      <Tabs defaultValue="critical-path">
        <TabsList className="mb-4">
          <TabsTrigger value="critical-path">Critical Path</TabsTrigger>
          <TabsTrigger value="completion">Completion Status</TabsTrigger>
          <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="critical-path">
          <CriticalPathTab />
        </TabsContent>
        
        <TabsContent value="completion">
          <CompletionStatusTab />
        </TabsContent>
        
        <TabsContent value="ai-integration">
          <AIIntegrationTab />
        </TabsContent>
        
        <TabsContent value="risks">
          <RisksTab />
        </TabsContent>
      </Tabs>
      
      <HandoverFooter />
    </div>
  );
};

export default ProjectHandoverReport;
