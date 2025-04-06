
import React from 'react';
import { BadgeCheck, BadgeDollarSign, BadgePercent, FileCheck, ShieldAlert, ShieldCheck, StarIcon, Trophy, CheckCircle2, Calendar, Zap, LucideArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Certification = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
              Get Pulse Certified
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Stand out as a culture-first organization. PulsePlace certification is awarded to workplaces where trust, wellbeing, and inclusion are measured — not just marketed.
            </p>
            <Link to="/pricing">
              <Button size="lg" className="bg-pulse-gradient hover:opacity-90">
                See Certification Pricing
              </Button>
            </Link>
          </div>
        </section>

        {/* Certification Journey Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Your Certification Journey</h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              From assessment to recognition, our streamlined process helps you showcase your workplace culture excellence.
            </p>
            
            <div className="relative max-w-5xl mx-auto">
              {/* Connector Line */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-1 h-[calc(100%-120px)] bg-pulse-200 hidden md:block"></div>
              
              <div className="grid md:grid-cols-2 gap-16">
                {/* Step 1 */}
                <div className="md:text-right md:pr-12 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-pulse-500 text-white flex items-center justify-center -translate-y-1/4 md:translate-x-6 z-10 hidden md:flex">1</div>
                  <span className="inline-block text-sm font-bold text-pulse-600 mb-2 uppercase tracking-wider md:hidden">Step 1</span>
                  <h3 className="text-2xl font-semibold mb-3">Assessment</h3>
                  <p className="text-gray-600 mb-4">Complete our comprehensive culture assessment to establish your baseline metrics across all key dimensions.</p>
                  <Badge className="bg-pulse-100 text-pulse-700">2-4 Weeks</Badge>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Step 2 */}
                <div className="hidden md:block"></div>
                
                <div className="md:text-left md:pl-12 relative">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-pulse-500 text-white flex items-center justify-center -translate-y-1/4 md:-translate-x-6 z-10 hidden md:flex">2</div>
                  <span className="inline-block text-sm font-bold text-pulse-600 mb-2 uppercase tracking-wider md:hidden">Step 2</span>
                  <h3 className="text-2xl font-semibold mb-3">Analysis & Benchmarking</h3>
                  <p className="text-gray-600 mb-4">Our AI engine analyzes your data and benchmarks it against industry standards, identifying strengths and opportunities.</p>
                  <Badge className="bg-pulse-100 text-pulse-700">1-2 Weeks</Badge>
                </div>
                
                {/* Step 3 */}
                <div className="md:text-right md:pr-12 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-pulse-500 text-white flex items-center justify-center -translate-y-1/4 md:translate-x-6 z-10 hidden md:flex">3</div>
                  <span className="inline-block text-sm font-bold text-pulse-600 mb-2 uppercase tracking-wider md:hidden">Step 3</span>
                  <h3 className="text-2xl font-semibold mb-3">Verification</h3>
                  <p className="text-gray-600 mb-4">Our certification team verifies your assessment data through employee sampling and documentation review.</p>
                  <Badge className="bg-pulse-100 text-pulse-700">2 Weeks</Badge>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Step 4 */}
                <div className="hidden md:block"></div>
                
                <div className="md:text-left md:pl-12 relative">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-pulse-500 text-white flex items-center justify-center -translate-y-1/4 md:-translate-x-6 z-10 hidden md:flex">4</div>
                  <span className="inline-block text-sm font-bold text-pulse-600 mb-2 uppercase tracking-wider md:hidden">Step 4</span>
                  <h3 className="text-2xl font-semibold mb-3">Certification & Recognition</h3>
                  <p className="text-gray-600 mb-4">Receive your official certification level, digital badges, and marketing materials to showcase your achievement.</p>
                  <Badge className="bg-pulse-100 text-pulse-700">1 Week</Badge>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <Button className="bg-pulse-gradient">
                  Start Your Certification Journey
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Get Certified Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Why Get Certified?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Build Trust with Top Talent</h3>
                <p className="text-gray-700 text-center">
                  Show candidates and current employees that you're committed to transparent culture measurement.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <BadgePercent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Benchmark Against the Best</h3>
                <p className="text-gray-700 text-center">
                  Compare your culture metrics with leading organizations in your industry.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Show Real Progress</h3>
                <p className="text-gray-700 text-center">
                  Demonstrate measured improvement on culture, not just policies and intentions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Measure Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">What We Measure</h2>
            <h3 className="text-xl text-center text-gray-700 mb-12">The 3 Core Signals Behind Certification</h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Emotion Index
                </h3>
                <p className="text-gray-700">
                  Measure real-time sentiment through pulse surveys and feedback analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Engagement Stability
                </h3>
                <p className="text-gray-700">
                  Track retention, absenteeism and engagement metrics over time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Culture Trust Score
                </h3>
                <p className="text-gray-700">
                  Evaluate DEI initiatives, flexibility policies, and onboarding effectiveness.
                </p>
              </div>
            </div>
            
            <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Component</TableHead>
                    <TableHead className="w-1/5">Weight</TableHead>
                    <TableHead className="w-3/5">Measures</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Emotion Index</TableCell>
                    <TableCell>40%</TableCell>
                    <TableCell>Employee sentiment, engagement, and satisfaction indicators</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Engagement Stability</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>Retention trends, absenteeism, and internal mobility patterns</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Culture Trust Score</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>DEI metrics, work flexibility, and onboarding effectiveness</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Certification Tiers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Certification Tiers</h2>
            <h3 className="text-xl text-center text-gray-700 mb-12">Where Does Your Organization Rank?</h3>
            
            <div className="flex flex-wrap justify-center gap-5 mb-10">
              <img 
                src="/lovable-uploads/39c4a4a6-826a-4eb5-a2d1-2eada2e61e6f.png" 
                alt="PulsePlace Certification Tiers" 
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
            
            {/* Certification Benefits - NEW */}
            <div className="mt-16 max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-center mb-8">Certification Benefits</h3>
              
              <Tabs defaultValue="bronze" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="bronze">Bronze</TabsTrigger>
                  <TabsTrigger value="silver">Silver</TabsTrigger>
                  <TabsTrigger value="gold">Gold</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bronze" className="p-6 bg-orange-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold flex items-center mb-4">
                        <span className="bg-orange-100 text-orange-700 p-2 rounded-full mr-3">
                          <BadgeCheck className="h-5 w-5" />
                        </span>
                        Bronze Certification
                      </h4>
                      <p className="text-gray-700 mb-6">
                        For organizations taking their first steps toward measuring workplace culture with a focus on transparency.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Digital badge for company website",
                          "Social media recognition kit",
                          "Bronze profile in certification directory",
                          "Basic benchmarking reports"
                        ].map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-xs">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                            <BadgeCheck className="h-12 w-12 text-orange-500" />
                          </div>
                          <h5 className="text-xl font-bold mb-1">Bronze Level</h5>
                          <p className="text-gray-500 mb-4">PulseScore™: 60-69</p>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">View Examples</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="silver" className="p-6 bg-gray-100 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold flex items-center mb-4">
                        <span className="bg-gray-200 text-gray-700 p-2 rounded-full mr-3">
                          <BadgeCheck className="h-5 w-5" />
                        </span>
                        Silver Certification
                      </h4>
                      <p className="text-gray-700 mb-6">
                        For organizations demonstrating consistent culture measurement with strong results across key metrics.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "All Bronze benefits",
                          "Featured in PulsePlace marketing materials",
                          "Detailed industry benchmarking reports",
                          "Quarterly culture consultation sessions",
                          "Employee recruitment badge"
                        ].map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-xs">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <BadgeCheck className="h-12 w-12 text-gray-500" />
                          </div>
                          <h5 className="text-xl font-bold mb-1">Silver Level</h5>
                          <p className="text-gray-500 mb-4">PulseScore™: 70-89</p>
                          <Button className="bg-gray-500 hover:bg-gray-600 text-white w-full">View Examples</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="gold" className="p-6 bg-yellow-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold flex items-center mb-4">
                        <span className="bg-yellow-100 text-yellow-700 p-2 rounded-full mr-3">
                          <BadgeCheck className="h-5 w-5" />
                        </span>
                        Gold Certification
                      </h4>
                      <p className="text-gray-700 mb-6">
                        For organizations with exceptional workplace culture practices and measurable employee satisfaction.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "All Silver benefits",
                          "Gold partner profile with case study",
                          "Speaker opportunities at PulsePlace events",
                          "Advanced AI-powered culture insights",
                          "Exclusive networking with other Gold certified companies",
                          "Annual executive culture workshop"
                        ].map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-xs">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                            <BadgeCheck className="h-12 w-12 text-yellow-500" />
                          </div>
                          <h5 className="text-xl font-bold mb-1">Gold Level</h5>
                          <p className="text-gray-500 mb-4">PulseScore™: 90+</p>
                          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full">View Examples</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-10 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-pulse-600">
                  <StarIcon className="h-12 w-12" />
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-4">
                  "PulsePlace helped us uncover what really mattered to our team. The certification process wasn't just a badge — it gave us actionable insights we've used to transform our workplace culture."
                </blockquote>
                <cite className="text-sm font-semibold">
                  — Sarah Chen, Chief People Officer at FutureTech Solutions
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline - NEW */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Certification Timeline</h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our streamlined process gets you certified in as little as 6 weeks
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative py-8">
                {/* Vertical line */}
                <div className="absolute inset-0 flex justify-center">
                  <div className="w-1 bg-pulse-200"></div>
                </div>
                
                <div className="relative grid gap-8">
                  {[
                    {
                      title: "Application",
                      time: "Week 1",
                      description: "Complete your organization profile and submit initial assessment data",
                      icon: <Calendar className="h-5 w-5" />
                    },
                    {
                      title: "Employee Surveys",
                      time: "Weeks 2-3",
                      description: "Deploy automated pulse surveys to capture real employee sentiment",
                      icon: <FileCheck className="h-5 w-5" />
                    },
                    {
                      title: "Data Analysis",
                      time: "Week 4",
                      description: "Our AI platform processes your data and generates initial scores",
                      icon: <ChartBar className="h-5 w-5" />
                    },
                    {
                      title: "Verification",
                      time: "Week 5",
                      description: "Our team verifies data validity through sampling and documentation",
                      icon: <ShieldCheck className="h-5 w-5" />
                    },
                    {
                      title: "Certification",
                      time: "Week 6",
                      description: "Receive your official certification level and materials",
                      icon: <Trophy className="h-5 w-5" />
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className="flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-pulse-500 flex items-center justify-center text-white z-10">
                          {step.icon}
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <Badge className="bg-pulse-100 text-pulse-700 my-2">{step.time}</Badge>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to See Where You Stand?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join forward-thinking organizations that prioritize culture measurement and continuous improvement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-pulse-gradient hover:opacity-90 text-white px-8 py-6 rounded-md text-lg"
                onClick={() => window.location.href = "mailto:certify@pulseplace.ai"}
              >
                Apply to Get Certified
              </Button>
              <Link to="/pricing">
                <Button 
                  variant="outline"
                  className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 px-8 py-6 rounded-md text-lg"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Certification;
