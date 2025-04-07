
import React from 'react';
import { BarChart, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Dashboard Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-pulse-600" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track culture metrics in real-time with automatic data collection and visualization.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-pulse-600" />
              </div>
              <CardTitle>Feedback Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Capture and analyze employee feedback from multiple channels in one central location.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-pulse-600" />
              </div>
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receive actionable recommendations based on your specific culture data and industry benchmarks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeatures;
