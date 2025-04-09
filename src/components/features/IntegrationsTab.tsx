
import React from 'react';
import { Globe, MessageSquare, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const IntegrationsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Connect PulsePlace with your existing tools and workflows for a seamless experience.
      </p>
      
      <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <Globe className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">HR Platforms</h3>
            <p className="text-gray-600 text-sm mt-2">
              Seamlessly connect with major HR software.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Communication Tools</h3>
            <p className="text-gray-600 text-sm mt-2">
              Integrate with Slack, Teams, and more.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <Calendar className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Calendar Apps</h3>
            <p className="text-gray-600 text-sm mt-2">
              Schedule surveys and reports automatically.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">SSO & Identity</h3>
            <p className="text-gray-600 text-sm mt-2">
              Secure login with your existing provider.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link to="/contact">
          <Button className="bg-pulse-gradient">
            Request Custom Integration
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IntegrationsTab;
