
import React from 'react';
import { TrendingUp, Layers, BarChart3, BrainCircuit, Brain } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
      <TabsTrigger value="trends" className="text-xs">
        <TrendingUp className="h-3.5 w-3.5 mr-1" />
        Time Trends
      </TabsTrigger>
      <TabsTrigger value="themes" className="text-xs">
        <Layers className="h-3.5 w-3.5 mr-1" />
        Theme Analysis
      </TabsTrigger>
      <TabsTrigger value="benchmarks" className="text-xs">
        <BarChart3 className="h-3.5 w-3.5 mr-1" />
        Benchmarks
      </TabsTrigger>
      <TabsTrigger value="attrition" className="text-xs">
        <BrainCircuit className="h-3.5 w-3.5 mr-1" />
        Attrition Prediction
      </TabsTrigger>
      <TabsTrigger value="aiInsights" className="text-xs">
        <Brain className="h-3.5 w-3.5 mr-1" />
        AI Insights
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNav;
