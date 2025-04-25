
import React from 'react';
import { IntegrationTile } from './IntegrationTile';
import { Sheet, Slack, Link, ExternalLink } from 'lucide-react';

// Mock data for integrations
// In a real app, this would come from an API or state management
const integrations = [
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Connect to Google Sheets to import/export data seamlessly.',
    icon: Sheet,
    isConnected: false
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Integrate with Notion to sync documents and databases.',
    icon: () => <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="h-6 w-6" />
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Connect your CRM to sync contacts, deals and companies.',
    icon: () => <img src="https://cdn2.hubspot.net/hubfs/53/image8.png" alt="HubSpot" className="h-6 w-6" />
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and send updates to your Slack channels.',
    icon: Slack,
    isConnected: true
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 3,000+ apps with custom automation workflows.',
    icon: () => <img src="https://cdn.zapier.com/zapier/images/logos/zapier-logo.png" alt="Zapier" className="h-6 w-6" />,
    isWebhook: true
  }
];

export function IntegrationsGrid() {
  const handleConnect = async (integrationId: string) => {
    console.log(`Connecting to ${integrationId}`);
    // In a real app, this would call an API to initiate OAuth
    return new Promise<void>(resolve => setTimeout(resolve, 1000));
  };
  
  const handleDisconnect = async (integrationId: string) => {
    console.log(`Disconnecting from ${integrationId}`);
    // In a real app, this would call an API to revoke access
    return new Promise<void>(resolve => setTimeout(resolve, 1000));
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <IntegrationTile
          key={integration.id}
          name={integration.name}
          description={integration.description}
          icon={integration.icon}
          isConnected={integration.isConnected || false}
          connectHandler={() => handleConnect(integration.id)}
          disconnectHandler={() => handleDisconnect(integration.id)}
        />
      ))}
    </div>
  );
}
