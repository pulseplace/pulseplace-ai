
import React from 'react';
import { Activity, BarChart3, Award, TrendingUp, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Activity className="h-10 w-10 text-pulse-500" />,
    title: "PulseScore™",
    description: "Real-time workplace score derived from employee feedback, sentiment analysis, and retention signals."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-teal-500" />,
    title: "Culture Compass™",
    description: "Interactive dashboard benchmarking organizations against industry peers across culture, inclusion, growth, and flexibility."
  },
  {
    icon: <Award className="h-10 w-10 text-pulse-600" />,
    title: "Certification Tiers",
    description: "Earn digital badges like 'Pulse Certified', 'Remote Ready', 'Women-Led', 'Inclusive Culture', and 'Mentor Workplace'."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-teal-600" />,
    title: "AI Insights",
    description: "Leverage cutting-edge AI to gain actionable insights and improvement recommendations for your workplace culture."
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-pulse-500" />,
    title: "Sentiment Analysis",
    description: "Advanced NLP technology to analyze employee sentiment and identify trends in real-time."
  },
  {
    icon: <Users className="h-10 w-10 text-teal-500" />,
    title: "Employee Engagement",
    description: "Gamified surveys and feedback loops to increase participation and collect honest feedback."
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Redefining what it means to be a 'Best Place to Work' through AI-powered tools and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden group">
              <CardContent className="p-6">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pulse-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
