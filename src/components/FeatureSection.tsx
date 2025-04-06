
import React from 'react';
import { Activity, ChartBar, Award, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const features = [
  {
    icon: <Activity className="h-10 w-10 text-pulse-500" />,
    title: "PulseScore™",
    description: "Real-time workplace culture rating powered by sentiment + retention analytics.",
    link: "/demo#pulse-score",
    buttonText: "Try Demo"
  },
  {
    icon: <ChartBar className="h-10 w-10 text-teal-500" />,
    title: "Culture Compass™",
    description: "Benchmark your organization against your industry in areas like growth, flexibility, and inclusion.",
    link: "/demo#culture-compass",
    buttonText: "See Benchmarks"
  },
  {
    icon: <Award className="h-10 w-10 text-pulse-600" />,
    title: "Pulse Certified",
    description: "Earn digital badges and global recognition based on transparency, not testimonials.",
    link: "/demo#pulse-certified",
    buttonText: "Get Certified"
  },
  {
    icon: <Brain className="h-10 w-10 text-teal-600" />,
    title: "AI Insights Engine",
    description: "Get personalized action plans from our culture model trained on thousands of data points.",
    link: "/demo#ai-insights",
    buttonText: "View Insights"
  }
];

const FeatureSection = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Redefining what it means to be a 'Best Place to Work' through AI-powered tools and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden group h-full">
              <CardContent className="p-6">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pulse-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Link to={feature.link} className="block">
                  <Button className="w-full bg-pulse-gradient hover:opacity-90 transition-all">
                    {feature.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link to="/methodology">
            <Button variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50">
              Learn About Our Methodology
            </Button>
          </Link>
        </div>
        
        <div className="w-full h-1 bg-gray-200 my-16 max-w-4xl mx-auto"></div>
      </div>
    </section>
  );
};

export default FeatureSection;
