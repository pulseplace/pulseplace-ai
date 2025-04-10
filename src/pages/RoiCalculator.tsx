
import React, { useState } from 'react';
import { Calculator, DollarSign, BarChart, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import MetaTags from '@/components/MetaTags';

const RoiCalculator = () => {
  const [employees, setEmployees] = useState<number>(100);
  const [avgSalary, setAvgSalary] = useState<number>(60000);
  const [turnoverRate, setTurnoverRate] = useState<number>(15);
  const [engagementBoost, setEngagementBoost] = useState<number>(20);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const calculateROI = () => {
    // Current costs
    const hiringCost = avgSalary * 0.3; // Typical cost of hiring is 30% of salary
    const currentTurnover = Math.round(employees * (turnoverRate / 100));
    const currentTurnoverCost = currentTurnover * hiringCost;
    
    // Projected improvements
    const improvedTurnoverRate = turnoverRate * (1 - (engagementBoost / 100));
    const improvedTurnover = Math.round(employees * (improvedTurnoverRate / 100));
    const improvedTurnoverCost = improvedTurnover * hiringCost;
    
    // Savings
    const annualSavings = currentTurnoverCost - improvedTurnoverCost;
    const productivityGain = avgSalary * employees * 0.05 * (engagementBoost / 100);
    
    const totalBenefit = annualSavings + productivityGain;
    const estimatedCost = employees * 60; // $60 per employee per year
    const roi = ((totalBenefit - estimatedCost) / estimatedCost) * 100;
    
    return {
      currentTurnover,
      improvedTurnover,
      annualSavings: Math.round(annualSavings),
      productivityGain: Math.round(productivityGain),
      totalBenefit: Math.round(totalBenefit),
      estimatedCost: Math.round(estimatedCost),
      roi: Math.round(roi)
    };
  };
  
  const roiData = calculateROI();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags 
        title="ROI Calculator | PulsePlace.ai"
        description="Calculate your potential return on investment from improved workplace trust metrics."
      />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">ROI Calculator</h1>
          <p className="text-xl text-gray-600">
            Discover the financial impact of improving workplace trust with PulsePlace
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-pulse-600" />
                <span>Calculate Your ROI</span>
              </CardTitle>
              <CardDescription>
                Adjust the values to match your organization's profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <span className="text-gray-500 text-sm">{employees}</span>
                  </div>
                  <Slider
                    id="employees"
                    min={10}
                    max={5000}
                    step={10}
                    value={[employees]}
                    onValueChange={(value) => setEmployees(value[0])}
                    className="py-4"
                  />
                  <div className="flex text-xs text-gray-500 justify-between">
                    <span>10</span>
                    <span>5,000</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="avgSalary">Average Annual Salary</Label>
                    <span className="text-gray-500 text-sm">${avgSalary.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="avgSalary"
                    min={30000}
                    max={200000}
                    step={5000}
                    value={[avgSalary]}
                    onValueChange={(value) => setAvgSalary(value[0])}
                    className="py-4"
                  />
                  <div className="flex text-xs text-gray-500 justify-between">
                    <span>$30k</span>
                    <span>$200k</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="turnoverRate">Current Annual Turnover Rate (%)</Label>
                    <span className="text-gray-500 text-sm">{turnoverRate}%</span>
                  </div>
                  <Slider
                    id="turnoverRate"
                    min={1}
                    max={40}
                    step={1}
                    value={[turnoverRate]}
                    onValueChange={(value) => setTurnoverRate(value[0])}
                    className="py-4"
                  />
                  <div className="flex text-xs text-gray-500 justify-between">
                    <span>1%</span>
                    <span>40%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="engagementBoost">Projected Engagement Improvement (%)</Label>
                    <span className="text-gray-500 text-sm">{engagementBoost}%</span>
                  </div>
                  <Slider
                    id="engagementBoost"
                    min={5}
                    max={40}
                    step={5}
                    value={[engagementBoost]}
                    onValueChange={(value) => setEngagementBoost(value[0])}
                    className="py-4"
                  />
                  <div className="flex text-xs text-gray-500 justify-between">
                    <span>5%</span>
                    <span>40%</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-pulse-gradient mt-4"
                  onClick={() => setShowResults(true)}
                >
                  Calculate ROI
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`h-full transition-opacity duration-300 ${showResults ? 'opacity-100' : 'opacity-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-pulse-600" />
                <span>Your Projected ROI</span>
              </CardTitle>
              <CardDescription>
                Based on industry-standard improvements from trust-enhancing programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-pulse-600" />
                      <span className="text-sm font-medium">Employee Turnover</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium">{roiData.currentTurnover} employees/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Improved:</span>
                      <span className="font-medium text-green-600">{roiData.improvedTurnover} employees/year</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-pulse-600" />
                      <span className="text-sm font-medium">Annual Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">${roiData.annualSavings.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">From reduced turnover costs</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-pulse-600" />
                      <span className="text-sm font-medium">Total Annual Benefit</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">${roiData.totalBenefit.toLocaleString()}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Turnover Reduction:</span>
                      <span>${roiData.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Productivity Gain:</span>
                      <span>${roiData.productivityGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PulsePlace Cost:</span>
                      <span>-${roiData.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
                      <span>ROI:</span>
                      <span className="text-green-600">{roiData.roi}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Ready to see how PulsePlace can transform your workplace culture?
                  </p>
                  <div className="flex flex-col xs:flex-row gap-3 justify-center">
                    <Button className="bg-pulse-gradient" asChild>
                      <a href="/demo">Book a Demo</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/join-beta">Join Beta Program</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
