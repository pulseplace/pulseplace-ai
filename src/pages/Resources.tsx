
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, FileText, Video, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const resourceCategories = [
    {
      icon: <BookOpen className="h-8 w-8 text-pulse-600" />,
      title: "Guides & Best Practices",
      description: "Comprehensive guides for improving workplace culture",
      items: ["Culture Measurement Guide", "Employee Engagement Playbook", "Leadership Trust Framework"]
    },
    {
      icon: <FileText className="h-8 w-8 text-pulse-600" />,
      title: "Research & Reports",
      description: "Industry insights and research findings",
      items: ["State of Workplace Culture 2024", "Trust in Remote Teams", "AI in HR Analytics"]
    },
    {
      icon: <Video className="h-8 w-8 text-pulse-600" />,
      title: "Webinars & Training",
      description: "Educational content and training materials",
      items: ["Culture Metrics Masterclass", "PulseBot Training Series", "Certification Workshop"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Resources | PulsePlace.ai</title>
        <meta name="description" content="Access guides, research, and training materials to improve your workplace culture." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive library of guides, research, and training materials to enhance your workplace culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border">
                <div className="mb-6">
                  <div className="bg-pulse-50 p-4 rounded-full w-fit">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {item}</li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Access Resources
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-pulse-gradient text-white px-8 py-3">
              View All Resources
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
