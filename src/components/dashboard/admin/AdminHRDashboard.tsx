import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Calendar, CheckCircle2, Clock, Download, FileText, Filter, Mail, RefreshCw, Search, User, UserCheck, Users } from 'lucide-react';

const AdminHRDashboard = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const handleExportClick = () => {
    toast({
      title: "Report Exported",
      description: "Dashboard data has been exported to Excel",
    });
  };
  
  const handleSendReminderClick = () => {
    toast({
      title: "Reminders Sent",
      description: "Survey completion reminders have been sent to 32 employees",
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Admin HR Dashboard</CardTitle>
            <CardDescription>Manage certification process and employee insights</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportClick}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" className="bg-pulse-gradient">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Overall PulseScore™</p>
                        <div className="text-2xl font-bold text-green-600">86/100</div>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="text-green-600">▲ 4%</span> from last quarter
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Active Surveys</p>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>2 closing in next 7 days</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Response Rate</p>
                        <div className="text-2xl font-bold text-purple-600">78%</div>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="text-purple-600">▲ 12%</span> from last survey
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Insights Generated</p>
                        <div className="text-2xl font-bold text-teal-600">42</div>
                      </div>
                      <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <Search className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>12 new this month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2" onClick={handleSendReminderClick}>
                      <Mail className="h-5 w-5 mb-2" />
                      <span className="text-xs">Send Reminders</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
                      <Calendar className="h-5 w-5 mb-2" />
                      <span className="text-xs">Schedule Survey</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
                      <Users className="h-5 w-5 mb-2" />
                      <span className="text-xs">Invite Employees</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
                      <CheckCircle2 className="h-5 w-5 mb-2" />
                      <span className="text-xs">Verify Certification</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Aug 15, 2025</TableCell>
                        <TableCell>Engineering</TableCell>
                        <TableCell>88/100</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Pulse Certified™</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jul 22, 2025</TableCell>
                        <TableCell>Marketing</TableCell>
                        <TableCell>82/100</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Emerging Culture</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jul 10, 2025</TableCell>
                        <TableCell>Customer Support</TableCell>
                        <TableCell>91/100</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Pulse Certified™</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Department Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Department PulseScore™ Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Engineering</span>
                        <span className="text-sm text-gray-500">88/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Marketing</span>
                        <span className="text-sm text-gray-500">82/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Customer Support</span>
                        <span className="text-sm text-gray-500">91/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Sales</span>
                        <span className="text-sm text-gray-500">76/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">HR</span>
                        <span className="text-sm text-gray-500">86/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '86%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Other tabs would have their own content */}
          <TabsContent value="surveys">
            <div className="text-gray-500 text-center py-6">
              Surveys tab content would go here with active and scheduled surveys
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="text-gray-500 text-center py-6">
              Insights tab would contain AI-generated insights and trend analysis
            </div>
          </TabsContent>
          
          <TabsContent value="certifications">
            <div className="text-gray-500 text-center py-6">
              Certifications tab would show all past and current certifications
            </div>
          </TabsContent>
          
          <TabsContent value="employees">
            <div className="text-gray-500 text-center py-6">
              Employees tab would contain employee participation and individual insights
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminHRDashboard;
