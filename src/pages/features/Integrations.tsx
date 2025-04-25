
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link2, MessageSquare, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WebhookSetupModal } from '@/components/integrations/WebhookSetupModal';
import { IntegrationsGrid } from '@/components/integrations/IntegrationsGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState("");
  const { toast } = useToast();

  const handleOpenWebhookModal = (serviceName: string) => {
    setCurrentService(serviceName);
    setIsWebhookModalOpen(true);
  };

  const handleSaveWebhook = async (webhookUrl: string) => {
    console.log(`Saving webhook for ${currentService}: ${webhookUrl}`);
    // In a real app, this would store the webhook URL in the database
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const handleTestAllConnections = () => {
    toast({
      title: "Testing Connections",
      description: "Checking all connected integrations...",
    });
    // In a real app, this would test all active connections
    setTimeout(() => {
      toast({
        title: "All Systems Operational",
        description: "Your connected integrations are working properly.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>Integrations | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Connect PulsePlace with your existing tools to streamline your workflow and enhance productivity."
        />
      </Helmet>
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Integration Hub</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect PulsePlace with your favorite workplace tools to seamlessly share data and automate workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleOpenWebhookModal("Custom Webhook")}
            >
              <Link2 className="h-4 w-4" />
              <span>Add Custom Webhook</span>
            </Button>
            
            <Button 
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleTestAllConnections}
            >
              Test All Connections
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="comms">Communications</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <TabsContent value="all" className="mt-0">
            <IntegrationsGrid />
          </TabsContent>
          
          <TabsContent value="crm" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">CRM Integrations</h3>
              <p className="text-gray-500">
                Coming soon! We're working on additional CRM integrations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="comms" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">Communication Integrations</h3>
              <p className="text-gray-500">
                Coming soon! We're working on additional communication tool integrations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="productivity" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">Productivity Integrations</h3>
              <p className="text-gray-500">
                Coming soon! We're working on additional productivity tool integrations.
              </p>
            </div>
          </TabsContent>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 bg-gray-50 border border-gray-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-3">Need a custom integration?</h3>
          <p className="text-gray-600 mb-4">
            Our team can help you build custom integrations for your specific workflow needs.
          </p>
          <Link to="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </section>
      
      <WebhookSetupModal 
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
        serviceName={currentService}
        onSave={handleSaveWebhook}
      />
    </div>
  );
};

export default Integrations;
