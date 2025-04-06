import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SmilePlus, RefreshCw, Users, AlertTriangle, BarChart3, Brain, Shield, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Methodology = () => {
  const [activeTab, setActiveTab] = useState('framework');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* 1. Page Title */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How PulseScore™ Measures What Matters</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our AI-driven methodology blends employee sentiment, behavioral signals, and culture trust indicators to rank the world's most loved workplaces.
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="w-full py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="framework" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
                <TabsTrigger value="framework">Framework</TabsTrigger>
                <TabsTrigger value="certification">Certification</TabsTrigger>
                <TabsTrigger value="ai">AI Process</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>
            
              {/* 2. The PulseScore Framework */}
              <TabsContent value="framework">
                <section className="w-full py-16 bg-white">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">The PulseScore™ Framework</h2>
                      <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
                      <p className="text-xl text-gray-700 mb-12">3 Core Signals Power the PulseScore</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <SmilePlus className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Emotion Index</h3>
                        <p className="text-gray-600">
                          From anonymous employee sentiment via pulse surveys
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Weekly micro-surveys</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Sentiment analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Theme extraction</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <RefreshCw className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Engagement Stability</h3>
                        <p className="text-gray-600">
                          Retention trends, absenteeism, internal movement
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Turnover analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Absence patterns</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Internal promotions</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <Users className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Culture Trust Score</h3>
                        <p className="text-gray-600">
                          DEI data, flexibility, onboarding feedback
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Inclusion metrics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Work arrangement flexibility</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>New hire experience</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-16 max-w-3xl mx-auto">
                      <Card className="bg-pulse-50 hover:shadow-md transition-all">
                        <CardContent className="p-6 text-center">
                          <p className="text-xl font-medium text-gray-800">
                            PulseScore = 0.4 × Emotion Index + 0.3 × Engagement Index + 0.3 × Culture Trust Score
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              {/* 3. Certification Levels */}
              <TabsContent value="certification">
                <section className="w-full py-16 bg-gray-50">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">Certification Levels</h2>
                      <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
                      <p className="text-xl text-gray-700 mb-12">Where does your company stand?</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <SmilePlus className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">85–100</h3>
                        <h4 className="text-lg font-semibold mb-3 text-pulse-600">Pulse Certified</h4>
                        <p className="text-gray-600">
                          "Lovable Workplace"
                        </p>
                        <div className="mt-4 w-full h-1 bg-pulse-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="bg-teal-100 p-4 rounded-full mb-6">
                          <BarChart3 className="h-10 w-10 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">70–84</h3>
                        <h4 className="text-lg font-semibold mb-3 text-teal-600">Growth Culture</h4>
                        <p className="text-gray-600">
                          "On the Rise"
                        </p>
                        <div className="mt-4 w-full h-1 bg-teal-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="bg-orange-100 p-4 rounded-full mb-6">
                          <AlertTriangle className="h-10 w-10 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">50–69</h3>
                        <h4 className="text-lg font-semibold mb-3 text-orange-500">Developing</h4>
                        <p className="text-gray-600">
                          "Needs Attention"
                        </p>
                        <div className="mt-4 w-full h-1 bg-orange-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="bg-red-100 p-4 rounded-full mb-6">
                          <AlertTriangle className="h-10 w-10 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Below 50</h3>
                        <h4 className="text-lg font-semibold mb-3 text-red-500">At Risk</h4>
                        <p className="text-gray-600">
                          "Critical Culture Risk"
                        </p>
                        <div className="mt-4 w-full h-1 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="mt-16 max-w-4xl mx-auto">
                      <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/4">Score Range</TableHead>
                              <TableHead className="w-1/4">Certification Level</TableHead>
                              <TableHead className="w-2/4">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">85-100</TableCell>
                              <TableCell className="text-pulse-600 font-semibold">Pulse Certified</TableCell>
                              <TableCell>Top-tier with exceptional employee trust</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">70-84</TableCell>
                              <TableCell className="text-teal-600 font-semibold">Growth Culture</TableCell>
                              <TableCell>Strong momentum with improvement trajectory</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">50-69</TableCell>
                              <TableCell className="text-orange-500 font-semibold">Developing</TableCell>
                              <TableCell>Inconsistent metrics needing focused attention</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Below 50</TableCell>
                              <TableCell className="text-red-500 font-semibold">At Risk</TableCell>
                              <TableCell>Critical workplace culture challenges</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              {/* 4. How Our AI Works */}
              <TabsContent value="ai">
                <section className="w-full py-16 bg-white">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">How Our AI Works</h2>
                      <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
                      <p className="text-xl text-gray-700 mb-12">Built With Integrity, Backed by Data</p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto my-8">
                      <div className="bg-[#F1F0FB] rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                          <div className="flex flex-col items-center text-center p-4 rounded-md bg-white shadow-sm hover:shadow transition-all">
                            <h3 className="font-semibold mb-2">1. Data Collection</h3>
                            <p className="text-sm text-gray-600">Sentiment analysis from pulse surveys</p>
                            <div className="mt-4 text-pulse-600">
                              <ArrowRight className="h-5 w-5 mx-auto" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center text-center p-4 rounded-md bg-white shadow-sm hover:shadow transition-all">
                            <h3 className="font-semibold mb-2">2. LLM Processing</h3>
                            <p className="text-sm text-gray-600">AI synthesizes feedback into themes</p>
                            <div className="mt-4 text-pulse-600">
                              <ArrowRight className="h-5 w-5 mx-auto" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center text-center p-4 rounded-md bg-white shadow-sm hover:shadow transition-all">
                            <h3 className="font-semibold mb-2">3. Benchmarking</h3>
                            <p className="text-sm text-gray-600">Compared against industry standards</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <Brain className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sentiment Engine</h3>
                        <p className="text-gray-600">
                          Processes pulse survey text with advanced NLP models
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Text sentiment analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Emotion detection</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <RefreshCw className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">LLM Analysis</h3>
                        <p className="text-gray-600">
                          Summarizes feedback into actionable themes and insights
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Pattern detection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Theme extraction</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-pulse-100 p-4 rounded-full mb-6">
                          <BarChart3 className="h-10 w-10 text-pulse-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Benchmarking</h3>
                        <p className="text-gray-600">
                          Compares results against industry and historical trends
                        </p>
                        <ul className="mt-4 text-sm text-left space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Industry comparison</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Historical trajectory</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              {/* 5. Privacy & Data Ethics */}
              <TabsContent value="privacy">
                <section className="w-full py-16 bg-gray-50">
                  <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                      <div className="flex justify-center mb-6">
                        <div className="bg-pulse-100 p-4 rounded-full">
                          <Shield className="h-10 w-10 text-pulse-600" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold mb-6">Privacy & Data Ethics</h2>
                      <p className="text-lg text-gray-700">
                        All responses are anonymous, encrypted, and used only in aggregate form. 
                        We believe workplace culture is too important to be gamed or guessed.
                      </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Shield className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">End-to-end encryption of all survey responses</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Shield className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">No individual response tracking or identification</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Shield className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">SOC 2 compliant infrastructure</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Shield className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">Regular security audits and penetration testing</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4">Ethical AI Principles</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Brain className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">Fair and unbiased model training</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Brain className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">Transparent methodology and scoring</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Brain className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">Human oversight of AI recommendations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                <Brain className="h-3 w-3 text-pulse-600" />
                              </div>
                              <span className="text-gray-700">Continuous model improvement through feedback</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* 6. CTA Section */}
        <section className="w-full py-20 bg-gradient-to-r from-pulse-600 to-pulse-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Pulse Certified?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              We're onboarding forward-thinking companies into our certification beta.
            </p>
            <a href="mailto:certify@pulseplace.ai">
              <Button className="bg-white text-pulse-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-full transition-all hover:shadow-lg group">
                Get Pulse Certified
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Methodology;
