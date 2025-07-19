
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, BarChart3, Award, Users, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      id: 'surveys',
      icon: <Users className="h-8 w-8 text-pulse-600" />,
      title: "Pulse Surveys",
      description: "Collect real-time employee feedback with our intelligent survey system.",
      link: "/dashboard"
    },
    {
      id: 'ai-analytics',
      icon: <Brain className="h-8 w-8 text-pulse-600" />,
      title: "AI Analytics",
      description: "Transform data into actionable insights with advanced AI analysis.",
      link: "/ai-dashboard"
    },
    {
      id: 'pulsebot',
      icon: <Bot className="h-8 w-8 text-pulse-600" />,
      title: "PulseBot Assistant",
      description: "Get instant answers about your workplace culture with our AI assistant.",
      link: "/pulsebot"
    },
    {
      id: 'certification',
      icon: <Award className="h-8 w-8 text-pulse-600" />,
      title: "Culture Certification",
      description: "Earn recognition for your commitment to workplace excellence.",
      link: "/certification"
    },
    {
      id: 'insights',
      icon: <BarChart3 className="h-8 w-8 text-pulse-600" />,
      title: "Real-time Insights",
      description: "Monitor culture metrics and trends in real-time dashboards.",
      link: "/insights"
    },
    {
      id: 'llm-insights',
      icon: <MessageSquare className="h-8 w-8 text-pulse-600" />,
      title: "LLM Insights",
      description: "Deep language analysis for understanding employee sentiment.",
      link: "/dashboard/llm-insights"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features | PulsePlace.ai</title>
        <meta name="description" content="Explore PulsePlace.ai's comprehensive features for measuring and improving workplace culture." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Culture Excellence
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to measure, understand, and improve your workplace culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} id={feature.id} className="bg-white rounded-lg p-8 shadow-sm border hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="bg-pulse-50 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/demo">
              <Button className="bg-pulse-gradient text-white px-8 py-3">
                Try All Features
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
