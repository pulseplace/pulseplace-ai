
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoreFeaturesTab from './CoreFeaturesTab';
import AIFeaturesTab from './AIFeaturesTab';
import IntegrationsTab from './IntegrationsTab';

interface FeaturesTabsProps {
  activeTab: string;
  handleTabChange: (value: string) => void;
}

const FeaturesTabs: React.FC<FeaturesTabsProps> = ({
  activeTab,
  handleTabChange
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Advanced Technology Platform</h2>
        
        <Tabs defaultValue="core" value={activeTab} onValueChange={handleTabChange} className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="core" className="px-6">Core Features</TabsTrigger>
              <TabsTrigger value="ai" className="px-6">AI & LLM Technology</TabsTrigger>
              <TabsTrigger value="integrations" className="px-6">Integrations</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="core">
            <CoreFeaturesTab />
          </TabsContent>
          
          <TabsContent value="ai">
            <AIFeaturesTab />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesTabs;
