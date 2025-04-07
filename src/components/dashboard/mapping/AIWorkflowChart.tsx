
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideArrowRight, FileCheck, CheckCircle2, BarChart, Brain, Zap } from 'lucide-react';

const AIWorkflowChart = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">How Our AI Works: Certification Process</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative py-10">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Step 1: Data Collection */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="order-1 md:order-1 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 shadow-md">
                <FileCheck className="h-8 w-8" />
              </div>
              
              <div className="order-2 md:order-2 w-full md:w-[calc(50%-3rem)] md:text-right">
                <h3 className="text-lg font-semibold mb-2">1. Data Collection</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-700 mb-2">Our system collects responses from multiple sources:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Employee pulse surveys</li>
                    <li>Leadership assessments</li>
                    <li>Open-ended feedback</li>
                    <li>Engagement metrics</li>
                  </ul>
                </div>
              </div>
              
              <div className="hidden md:block order-3 w-[calc(50%-3rem)]"></div>
            </div>
            
            {/* Step 2: AI Processing */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="hidden md:block order-1 w-[calc(50%-3rem)]"></div>
              
              <div className="order-3 md:order-2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 shadow-md">
                <Brain className="h-8 w-8" />
              </div>
              
              <div className="order-2 md:order-3 w-full md:w-[calc(50%-3rem)] md:text-left">
                <h3 className="text-lg font-semibold mb-2">2. AI Processing</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-700 mb-2">Our AI engine processes the collected data:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Response normalization (0-100 scale)</li>
                    <li>Sentiment analysis of text responses</li>
                    <li>Theme mapping and categorization</li>
                    <li>Weighted score calculation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 3: Theme Scoring */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="order-1 md:order-1 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 shadow-md">
                <BarChart className="h-8 w-8" />
              </div>
              
              <div className="order-2 md:order-2 w-full md:w-[calc(50%-3rem)] md:text-right">
                <h3 className="text-lg font-semibold mb-2">3. Theme Scoring</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-700 mb-2">Questions are organized into 6 primary thematic buckets:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded">Trust in Leadership</div>
                    <div className="bg-green-50 p-2 rounded">Psychological Safety</div>
                    <div className="bg-purple-50 p-2 rounded">Inclusion & Belonging</div>
                    <div className="bg-amber-50 p-2 rounded">Motivation & Fulfillment</div>
                    <div className="bg-teal-50 p-2 rounded">Mission Alignment</div>
                    <div className="bg-rose-50 p-2 rounded">Engagement Continuity</div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block order-3 w-[calc(50%-3rem)]"></div>
            </div>
            
            {/* Step 4: Category Aggregation */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="hidden md:block order-1 w-[calc(50%-3rem)]"></div>
              
              <div className="order-3 md:order-2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 shadow-md">
                <Zap className="h-8 w-8" />
              </div>
              
              <div className="order-2 md:order-3 w-full md:w-[calc(50%-3rem)] md:text-left">
                <h3 className="text-lg font-semibold mb-2">4. Category Aggregation</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-700 mb-2">Theme scores are aggregated into 3 primary categories:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-blue-100 p-2 rounded">
                      <span>Emotion Index</span>
                      <span className="font-semibold">40% weight</span>
                    </div>
                    <div className="flex items-center justify-between bg-purple-100 p-2 rounded">
                      <span>Engagement Stability</span>
                      <span className="font-semibold">30% weight</span>
                    </div>
                    <div className="flex items-center justify-between bg-teal-100 p-2 rounded">
                      <span>Culture Trust Score</span>
                      <span className="font-semibold">30% weight</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 5: Certification */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="order-1 md:order-1 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 shadow-md">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              
              <div className="order-2 md:order-2 w-full md:w-[calc(50%-3rem)] md:text-right">
                <h3 className="text-lg font-semibold mb-2">5. Certification Determination</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-700 mb-3">The final PulseScore™ determines certification level:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-green-100 p-2 rounded">
                      <span className="font-semibold">Pulse Certified™</span>
                      <span>85-100</span>
                    </div>
                    <div className="flex items-center justify-between bg-blue-100 p-2 rounded">
                      <span className="font-semibold">Emerging Culture</span>
                      <span>70-84</span>
                    </div>
                    <div className="flex items-center justify-between bg-yellow-100 p-2 rounded">
                      <span className="font-semibold">At Risk</span>
                      <span>50-69</span>
                    </div>
                    <div className="flex items-center justify-between bg-red-100 p-2 rounded">
                      <span className="font-semibold">Intervention Advised</span>
                      <span>&lt; 50</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block order-3 w-[calc(50%-3rem)]"></div>
            </div>
          </div>
          
          {/* Final arrow pointing to result */}
          <div className="flex justify-center mt-8">
            <LucideArrowRight className="h-8 w-8 text-gray-400" />
          </div>
          
          {/* Final result */}
          <div className="mt-8 max-w-lg mx-auto p-4 bg-gradient-to-r from-pulse-50 to-white border border-pulse-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center mb-3">AI-Generated Results</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-1">PulseScore™ Certification</h4>
                <p className="text-gray-600">Official certification level with shareable badge</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-1">Custom Insights</h4>
                <p className="text-gray-600">AI-generated observations on workplace culture</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-1">Actionable Recommendations</h4>
                <p className="text-gray-600">Targeted strategies for improvement</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-1">Benchmark Comparisons</h4>
                <p className="text-gray-600">How you compare to industry standards</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkflowChart;
