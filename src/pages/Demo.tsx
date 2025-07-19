
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, BarChart3, Bot, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Demo = () => {
  const demoSections = [
    {
      id: 'pulse-score',
      icon: <BarChart3 className="h-8 w-8 text-pulse-600" />,
      title: "Pulse Score Dashboard",
      description: "See how we calculate and visualize your organization's culture metrics.",
      link: "/dashboard"
    },
    {
      id: 'ai-insights',
      icon: <Bot className="h-8 w-8 text-pulse-600" />,
      title: "AI-Powered Insights",
      description: "Experience our advanced AI analysis and PulseBot assistant.",
      link: "/ai-dashboard"
    },
    {
      id: 'certification',
      icon: <Award className="h-8 w-8 text-pulse-600" />,
      title: "Certification Process",
      description: "Explore how organizations earn culture excellence certifications.",
      link: "/certification"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Interactive Demo | PulsePlace.ai</title>
        <meta name="description" content="Experience PulsePlace.ai's workplace culture platform through our interactive demo." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interactive Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore PulsePlace.ai's features with real data and see how we can transform your workplace culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {demoSections.map((section, index) => (
              <div key={index} id={section.id} className="bg-white rounded-lg p-8 shadow-sm border text-center">
                <div className="mb-6 flex justify-center">
                  <div className="bg-pulse-50 p-4 rounded-full">
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                <p className="text-gray-600 mb-6">{section.description}</p>
                <Link to={section.link}>
                  <Button className="bg-pulse-gradient text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Try Demo
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/book-demo">
              <Button variant="outline" className="px-8 py-3">
                Schedule Personal Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
