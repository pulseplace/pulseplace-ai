
import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<number>(100);
  const [avgSalary, setAvgSalary] = useState<number>(75000);
  const [turnoverRate, setTurnoverRate] = useState<number>(20);
  const [improvementRate, setImprovementRate] = useState<number>(30);
  const [calculatedROI, setCalculatedROI] = useState<number | null>(null);
  const [annualSavings, setAnnualSavings] = useState<number | null>(null);
  const [costOfTurnover, setCostOfTurnover] = useState<number | null>(null);
  const [subscriptionCost, setSubscriptionCost] = useState<number>(999);
  const [paybackMonths, setPaybackMonths] = useState<number | null>(null);

  // Calculate ROI
  useEffect(() => {
    // Cost of turnover is typically 1.5-2x annual salary
    const turnoverCostMultiplier = 1.75;
    const employeesLostPerYear = employees * (turnoverRate / 100);
    const totalTurnoverCost = employeesLostPerYear * avgSalary * turnoverCostMultiplier;
    
    // Projected savings from improvement
    const projectedImprovement = employeesLostPerYear * (improvementRate / 100);
    const yearlySavings = projectedImprovement * avgSalary * turnoverCostMultiplier;
    
    // Annual subscription cost
    const annualCost = subscriptionCost * 12;
    
    // ROI calculation: (Gain from investment - Cost of investment) / Cost of investment
    const roi = (yearlySavings - annualCost) / annualCost * 100;
    
    // Payback period in months
    const monthlyPayback = annualCost / yearlySavings * 12;
    
    setCostOfTurnover(totalTurnoverCost);
    setAnnualSavings(yearlySavings);
    setCalculatedROI(roi);
    setPaybackMonths(monthlyPayback);
  }, [employees, avgSalary, turnoverRate, improvementRate, subscriptionCost]);

  const resetCalculator = () => {
    setEmployees(100);
    setAvgSalary(75000);
    setTurnoverRate(20);
    setImprovementRate(30);
    
    toast({
      title: "Calculator Reset",
      description: "All values have been reset to default.",
    });
  };

  const saveResults = () => {
    toast({
      title: "Results Saved",
      description: "Your ROI calculation has been saved. We'll email you a detailed report.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-pulse-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculate Your Culture ROI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how investing in workplace culture impacts your bottom line through reduced turnover and increased productivity.
            </p>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="calculator" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
                  <TabsTrigger value="methodology">Methodology</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calculator">
                  <Card>
                    <CardHeader>
                      <CardTitle>Culture ROI Calculator</CardTitle>
                      <CardDescription>Estimate your return on investment from improving workplace culture</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Your Organization</h3>
                          
                          <div className="space-y-6">
                            {/* Number of Employees */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="employees">Number of Employees</Label>
                                <span className="text-sm text-gray-500">{employees}</span>
                              </div>
                              <Slider
                                id="employees"
                                min={10}
                                max={1000}
                                step={10}
                                value={[employees]}
                                onValueChange={(value) => setEmployees(value[0])}
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>10</span>
                                <span>1000</span>
                              </div>
                            </div>
                            
                            {/* Average Salary */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="salary">Average Annual Salary</Label>
                                <span className="text-sm text-gray-500">{formatCurrency(avgSalary)}</span>
                              </div>
                              <Slider
                                id="salary"
                                min={30000}
                                max={200000}
                                step={5000}
                                value={[avgSalary]}
                                onValueChange={(value) => setAvgSalary(value[0])}
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>$30k</span>
                                <span>$200k</span>
                              </div>
                            </div>
                            
                            {/* Current Turnover Rate */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="turnover">Current Annual Turnover Rate</Label>
                                <span className="text-sm text-gray-500">{turnoverRate}%</span>
                              </div>
                              <Slider
                                id="turnover"
                                min={5}
                                max={50}
                                step={1}
                                value={[turnoverRate]}
                                onValueChange={(value) => setTurnoverRate(value[0])}
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>5%</span>
                                <span>50%</span>
                              </div>
                            </div>
                            
                            {/* Expected Improvement */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="improvement">Expected Turnover Improvement</Label>
                                <span className="text-sm text-gray-500">{improvementRate}%</span>
                              </div>
                              <Slider
                                id="improvement"
                                min={10}
                                max={60}
                                step={5}
                                value={[improvementRate]}
                                onValueChange={(value) => setImprovementRate(value[0])}
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>10%</span>
                                <span>60%</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button variant="outline" onClick={resetCalculator}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Results Section */}
                        <div className="bg-pulse-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-6">Your ROI Results</h3>
                          
                          {calculatedROI !== null && (
                            <div className="space-y-8">
                              {/* ROI Percentage */}
                              <div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">First Year ROI</span>
                                  <span className="text-2xl font-bold text-pulse-700">
                                    {calculatedROI.toFixed(0)}%
                                  </span>
                                </div>
                                <Progress value={Math.min(calculatedROI, 500) / 5} className="h-2 bg-pulse-200" />
                              </div>
                              
                              {/* Annual Savings */}
                              <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex items-start">
                                  <div className="bg-pulse-100 p-2 rounded-full mr-3">
                                    <DollarSign className="h-5 w-5 text-pulse-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-700">Annual Savings</h4>
                                    <p className="text-2xl font-bold text-pulse-600">
                                      {annualSavings ? formatCurrency(annualSavings) : '$0'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Based on reduced turnover costs
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Current Turnover Cost */}
                              <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex items-start">
                                  <div className="bg-red-100 p-2 rounded-full mr-3">
                                    <Users className="h-5 w-5 text-red-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-700">Current Turnover Cost</h4>
                                    <p className="text-2xl font-bold text-red-600">
                                      {costOfTurnover ? formatCurrency(costOfTurnover) : '$0'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Annual cost of employee turnover
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Payback Period */}
                              <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex items-start">
                                  <div className="bg-green-100 p-2 rounded-full mr-3">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-700">Payback Period</h4>
                                    <p className="text-2xl font-bold text-green-600">
                                      {paybackMonths ? `${paybackMonths.toFixed(1)} months` : '0 months'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Time to recover your investment
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-3 pt-4">
                                <Button onClick={saveResults} className="bg-pulse-gradient">
                                  Email Me These Results
                                </Button>
                                <Link to="/pricing" className="w-full">
                                  <Button variant="outline" className="w-full">
                                    View Pricing Plans
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="methodology">
                  <Card>
                    <CardHeader>
                      <CardTitle>ROI Calculation Methodology</CardTitle>
                      <CardDescription>How we calculate your potential return on investment</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Turnover Cost Calculation</h3>
                        <p className="text-gray-600">
                          We use industry-standard research showing that the cost of replacing an employee ranges from 1.5 to 2 times their annual salary. This includes:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                          <li>Recruiting and hiring costs</li>
                          <li>Onboarding and training expenses</li>
                          <li>Lost productivity during vacancy and ramp-up</li>
                          <li>Impact on team morale and productivity</li>
                          <li>Knowledge loss</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Culture Improvement Impact</h3>
                        <p className="text-gray-600">
                          PulsePlace's methodology has been shown to reduce employee turnover by 20-40% in the first year through:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                          <li>Early identification of engagement issues</li>
                          <li>AI-powered action recommendations</li>
                          <li>Increased transparency and communication</li>
                          <li>Improved manager effectiveness</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">ROI Formula</h3>
                        <p className="text-gray-600 mb-2">
                          The ROI calculation uses the following formula:
                        </p>
                        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                          ROI = (Annual Savings - Annual Cost) / Annual Cost × 100%
                        </div>
                        <p className="text-gray-600 mt-4">
                          Where:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                          <li>Annual Savings = Number of retained employees × Average salary × Turnover cost multiplier</li>
                          <li>Number of retained employees = Total employees × Current turnover rate × Expected improvement</li>
                          <li>Annual Cost = Monthly subscription × 12</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Calculator className="h-5 w-5 mr-2 text-yellow-600" />
                          Important Notes
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-600">
                          <li>This calculator provides estimates based on industry averages and research</li>
                          <li>Actual results will vary based on your specific organization</li>
                          <li>The calculator does not include additional benefits such as increased productivity, better hiring success, and improved company reputation</li>
                          <li>For a customized ROI analysis, please contact our team</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-pulse-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Transform Your Workplace Culture?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join forward-thinking organizations that are using data-driven insights to build better workplaces.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-pulse-gradient hover:opacity-90">
                  See Pricing Options
                </Button>
              </Link>
              <Link to="/join-beta">
                <Button size="lg" variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50">
                  Join Beta Program
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ROICalculator;
