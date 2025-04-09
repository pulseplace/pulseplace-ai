
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  BarChart4, 
  ChevronRight, 
  Code, 
  LineChart, 
  LucideIcon, 
  MessageSquare, 
  Shield, 
  Shuffle, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  interface TabInfo {
    id: string;
    label: string;
    icon: LucideIcon;
    image: string;
    title: string;
    description: string;
  }

  const tabs: TabInfo[] = [
    {
      id: 'overview',
      label: 'Overview Dashboard',
      icon: BarChart4,
      image: '/dashboard-overview.png',
      title: 'Comprehensive Trust Analytics',
      description: 'Get a bird\'s eye view of your organization\'s trust metrics with our intuitive dashboard.'
    },
    {
      id: 'insights',
      label: 'AI Insights',
      icon: MessageSquare,
      image: '/dashboard-insights.png',
      title: 'AI-Powered Trust Insights',
      description: 'Our AI engine analyzes patterns and provides actionable insights to improve trust metrics.'
    },
    {
      id: 'trends',
      label: 'Trend Analysis',
      icon: LineChart,
      image: '/dashboard-trends.png',
      title: 'Track Progress Over Time',
      description: 'Monitor how trust metrics evolve over time and identify improvement opportunities.'
    },
    {
      id: 'certification',
      label: 'Certification',
      icon: Shield,
      image: '/dashboard-certification.png',
      title: 'Showcase Your Commitment',
      description: 'Earn and showcase your PulseScore™ certification to attract and retain top talent.'
    }
  ];

  // Find the active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualize, analyze, and improve your organization's trust metrics
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Explore Features</h3>
              
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-pulse-50 text-pulse-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${
                        activeTab === tab.id ? 'text-pulse-600' : 'text-gray-500'
                      }`} />
                      <span className="text-left font-medium">{tab.label}</span>
                      {activeTab === tab.id && (
                        <ChevronRight className="h-4 w-4 ml-auto text-pulse-600" />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8">
                <Button className="w-full bg-pulse-gradient">
                  Request Demo
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="ml-4 text-sm text-gray-500 font-mono">pulse-dashboard/{activeTabData.id}</div>
                </div>
              </div>
              <div className="relative aspect-video bg-gray-100">
                {/* Placeholder for actual dashboard screenshot */}
                {/* In a real implementation, we would use actual dashboard screenshots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="mb-4 inline-block p-4 bg-pulse-100 rounded-full">
                      <activeTabData.icon className="h-8 w-8 text-pulse-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{activeTabData.title}</h3>
                    <p className="text-gray-600 max-w-lg mx-auto">
                      {activeTabData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" size="sm">
                <Shuffle className="mr-2 h-4 w-4" />
                View Sample Data
              </Button>
              <Button variant="outline" size="sm">
                <Code className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Use Cases
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
