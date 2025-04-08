
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import MetaTags from '@/components/MetaTags';

const ROICalculator = () => {
  const [employees, setEmployees] = useState(100);
  const [avgSalary, setAvgSalary] = useState(75000);
  const [turnoverRate, setTurnoverRate] = useState(15);
  const [engagementImprovement, setEngagementImprovement] = useState(20);
  
  // Calculated ROI metrics
  const calculateROI = () => {
    // Cost of turnover per employee (industry standard is approximately 1.5x salary)
    const costPerTurnover = avgSalary * 1.5;
    
    // Current annual turnover cost
    const currentAnnualTurnover = employees * (turnoverRate / 100);
    const currentTurnoverCost = currentAnnualTurnover * costPerTurnover;
    
    // Improved turnover rate after using PulsePlace (conservative estimate of 30% reduction)
    const improvedTurnoverRate = turnoverRate * (1 - (engagementImprovement / 100));
    const improvedAnnualTurnover = employees * (improvedTurnoverRate / 100);
    const improvedTurnoverCost = improvedAnnualTurnover * costPerTurnover;
    
    // Annual savings
    const annualSavings = currentTurnoverCost - improvedTurnoverCost;
    
    // Productivity improvement value (conservative 5% of total salary costs)
    const productivityImprovement = (employees * avgSalary) * 0.05 * (engagementImprovement / 100);
    
    // Total ROI
    const totalAnnualValue = annualSavings + productivityImprovement;
    
    // 3-year ROI
    const threeYearROI = totalAnnualValue * 3;
    
    return {
      annualSavings: Math.round(annualSavings),
      productivityImprovement: Math.round(productivityImprovement),
      totalAnnualValue: Math.round(totalAnnualValue),
      threeYearROI: Math.round(threeYearROI),
      roi: Math.round((totalAnnualValue / 25000) * 100) // Assuming $25,000 annual cost
    };
  };
  
  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pulse-50 to-white">
      <MetaTags 
        title="ROI Calculator | PulsePlace.ai"
        description="Calculate the potential return on investment from implementing PulsePlace.ai in your organization"
      />
      <Navbar />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculate Your ROI with PulsePlace.ai
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how much your organization could save and grow by improving workplace culture and employee engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Input Your Organization's Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="employees">Number of Employees</Label>
                      <span className="text-sm font-medium">{employees}</span>
                    </div>
                    <Slider 
                      id="employees"
                      min={10} 
                      max={5000} 
                      step={10} 
                      value={[employees]} 
                      onValueChange={(value) => setEmployees(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>10</span>
                      <span>2,500</span>
                      <span>5,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="avgSalary" className="mb-2 block">Average Annual Salary ($)</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-500">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <Input
                        id="avgSalary"
                        type="number"
                        value={avgSalary}
                        onChange={(e) => setAvgSalary(Number(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="turnoverRate">Current Annual Turnover Rate (%)</Label>
                      <span className="text-sm font-medium">{turnoverRate}%</span>
                    </div>
                    <Slider 
                      id="turnoverRate"
                      min={1} 
                      max={50} 
                      step={1} 
                      value={[turnoverRate]} 
                      onValueChange={(value) => setTurnoverRate(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="engagementImprovement">Expected Engagement Improvement (%)</Label>
                      <span className="text-sm font-medium">{engagementImprovement}%</span>
                    </div>
                    <Slider 
                      id="engagementImprovement"
                      min={5} 
                      max={40} 
                      step={1} 
                      value={[engagementImprovement]} 
                      onValueChange={(value) => setEngagementImprovement(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5%</span>
                      <span>20%</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Your Estimated ROI</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pulse-50 to-white p-4 rounded-lg border border-pulse-100">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-pulse-600 mr-2" />
                      <h3 className="font-medium">3-Year Return on Investment</h3>
                    </div>
                    <p className="text-3xl font-bold text-pulse-600">
                      ${roi.threeYearROI.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated ROI: {roi.roi}%
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Annual Turnover Savings</h4>
                      <p className="text-xl font-bold">${roi.annualSavings.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Productivity Gains</h4>
                      <p className="text-xl font-bold">${roi.productivityImprovement.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-pulse-50 p-4 rounded-lg border border-pulse-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Total Annual Value</h4>
                    <p className="text-2xl font-bold text-pulse-700">${roi.totalAnnualValue.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-pulse-600 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Reduced Employee Turnover</h4>
                        <p className="text-sm text-gray-600">Lower recruitment and training costs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-pulse-600 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Increased Productivity</h4>
                        <p className="text-sm text-gray-600">More engaged employees perform better</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-pulse-600 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Faster Culture Improvement</h4>
                        <p className="text-sm text-gray-600">AI-powered insights lead to quicker changes</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-pulse-gradient">
                    Get Started with PulsePlace.ai
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This calculator provides an estimate based on industry averages and conservative projections. 
              Your actual results may vary based on your specific organization and implementation.
            </p>
            <Button variant="outline" className="border-pulse-300 text-pulse-700">
              Schedule a Consultation for Detailed Analysis
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ROICalculator;
