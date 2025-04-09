
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Twitter, Linkedin, FileText } from 'lucide-react';

interface SharingTabsProps {
  activeTab: string;
}

const SharingTabs: React.FC<SharingTabsProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger value="html" className="flex items-center">
        <Globe className="h-4 w-4 mr-2" />
        HTML
      </TabsTrigger>
      <TabsTrigger value="linkedin" className="flex items-center">
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </TabsTrigger>
      <TabsTrigger value="twitter" className="flex items-center">
        <Twitter className="h-4 w-4 mr-2" />
        X/Twitter
      </TabsTrigger>
      <TabsTrigger value="notion" className="flex items-center">
        <FileText className="h-4 w-4 mr-2" />
        Notion
      </TabsTrigger>
    </TabsList>
  );
};

export default SharingTabs;
