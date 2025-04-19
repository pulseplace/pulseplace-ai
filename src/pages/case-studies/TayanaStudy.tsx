
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TayanaStudy = () => {
  const scoreData = [
    { month: 'Jan', before: 65, after: 65 },
    { month: 'Feb', before: 63, after: 68 },
    { month: 'Mar', before: 64, after: 72 },
    { month: 'Apr', before: 62, after: 78 },
    { month: 'May', before: 65, after: 82 },
    { month: 'Jun', before: 64, after: 85 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pulse-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              How Tayana Transformed Their Culture with PulsePlace.ai
            </h1>
            <p className="text-xl text-gray-600">
              From Struggling Engagement to Award-Winning Workplace
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-pulse-600 mb-2">+31%</div>
              <div className="text-gray-600">PulseScore Improvement</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-pulse-600 mb-2">85</div>
              <div className="text-gray-600">Current PulseScore</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-pulse-600 mb-2">+42</div>
              <div className="text-gray-600">eNPS Increase</div>
            </Card>
          </div>

          {/* PulseScore Chart */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">PulseScore™ Journey</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 90]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="before" 
                    stroke="#94a3b8" 
                    name="Before PulsePlace" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="after" 
                    stroke="#32D27E" 
                    name="After PulsePlace" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Team Quote */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-pulse-50 to-white">
            <Quote className="h-12 w-12 text-pulse-600 mb-4" />
            <blockquote className="text-xl italic mb-4">
              "PulsePlace.ai transformed how we understand and improve our culture. 
              The real-time insights and actionable recommendations helped us build 
              a workplace our team loves."
            </blockquote>
            <div className="font-semibold">
              Sarah Chen
              <span className="text-gray-600 font-normal"> • Chief People Officer at Tayana</span>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Workplace Culture?
            </h2>
            <p className="text-gray-600 mb-6">
              Join innovative companies like Tayana that use PulsePlace.ai to build 
              exceptional workplace cultures.
            </p>
            <Link to="/book-demo">
              <Button size="lg" className="bg-pulse-gradient hover:opacity-90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TayanaStudy;
