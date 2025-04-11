
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  BarChart3, 
  ChevronRight, 
  Code, 
  LineChart, 
  LucideIcon, 
  MessageSquare, 
  Shield, 
  Shuffle, 
  Users,
  TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

// Sample dashboard data for animation
const sampleTrustScores = [
  { month: 'Jan', score: 67 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 79 },
  { month: 'Jun', score: 85 }
];

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Animation states
  const [isChartActive, setIsChartActive] = useState(false);
  const [currentScoreIndex, setCurrentScoreIndex] = useState(0);
  
  // Start animation when component is in view
  useEffect(() => {
    if (inView) {
      setIsChartActive(true);
      
      // Animate through score data points
      const interval = setInterval(() => {
        setCurrentScoreIndex(prev => (prev < sampleTrustScores.length - 1 ? prev + 1 : 0));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [inView]);

  interface TabInfo {
    id: string;
    label: string;
    icon: LucideIcon;
    title: string;
    description: string;
  }

  const tabs: TabInfo[] = [
    {
      id: 'overview',
      label: 'Overview Dashboard',
      icon: BarChart3,
      title: 'Comprehensive Trust Analytics',
      description: 'Get a bird\'s eye view of your organization\'s trust metrics with our intuitive dashboard.'
    },
    {
      id: 'insights',
      label: 'AI Insights',
      icon: MessageSquare,
      title: 'AI-Powered Trust Insights',
      description: 'Our AI engine analyzes patterns and provides actionable insights to improve trust metrics.'
    },
    {
      id: 'trends',
      label: 'Trend Analysis',
      icon: LineChart,
      title: 'Track Progress Over Time',
      description: 'Monitor how trust metrics evolve over time and identify improvement opportunities.'
    },
    {
      id: 'certification',
      label: 'Certification',
      icon: Shield,
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
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                </div>
                <div className="ml-4 text-sm text-gray-500 font-mono flex-1">pulse-dashboard/{activeTabData.id}</div>
              </div>
              
              <div className="relative p-6 bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{activeTabData.title}</h3>
                    <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {isChartActive ? 'Live Data' : 'Loading...'}
                    </div>
                  </div>
                  
                  <div className="h-64 relative">
                    {activeTab === 'overview' && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm mb-1">Current Pulse Score</div>
                          <div className="text-3xl font-bold text-pulse-600">
                            {isChartActive ? sampleTrustScores[currentScoreIndex].score : '—'}
                          </div>
                          <div className="flex items-center text-green-600 text-sm mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +8% from last month
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm mb-1">Engagement Rate</div>
                          <div className="text-3xl font-bold text-success-600">78%</div>
                          <div className="flex items-center text-green-600 text-sm mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% from last quarter
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Dynamic chart visualization */}
                    <div className="h-full w-full relative">
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-[180px]">
                        {sampleTrustScores.map((item, index) => (
                          <div key={index} className="flex flex-col items-center w-1/6">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: isChartActive ? `${item.score}%` : '0%' }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={`w-10 rounded-t-md ${
                                currentScoreIndex === index 
                                  ? 'bg-pulse-600' 
                                  : 'bg-pulse-300'
                              }`}
                            />
                            <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-400">
                        <div>100</div>
                        <div>75</div>
                        <div>50</div>
                        <div>25</div>
                        <div>0</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-4">
                    {activeTabData.description}
                  </p>
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
