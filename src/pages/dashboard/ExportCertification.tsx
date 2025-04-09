
import React from 'react';
import MetaTags from '@/components/MetaTags';
import ExportCertificationReport from '@/components/dashboard/export/ExportCertificationReport';
import TeamDataExport from '@/components/dashboard/admin/TeamDataExport';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

const ExportCertification: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <MetaTags 
        title="Export Certification | PulsePlace.ai" 
        description="Export your PulsePlace certification reports and data." 
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Export Certification</h1>
          <p className="text-gray-600">Generate professional reports for presentations and analysis</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            PulseScore: 86/100
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            Pulse Certified™
          </Badge>
        </div>
      </div>
      
      <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          All reports are branded with your organization's details and prepared for professional presentation.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="standard" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="standard">Standard Export</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          <TabsTrigger value="team">Team Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certification PDF</CardTitle>
                <CardDescription>
                  Official certification document with scores and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  The PDF certification includes your organization's PulseScore™, category breakdown, 
                  and official certification status with digital verification.
                </p>
                <TeamDataExport 
                  teamMembersCount={24} 
                  onExportPDF={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Certification Data</CardTitle>
                <CardDescription>
                  Raw data export for analysis and integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  The CSV data export includes detailed scores, team responses, and historical trends 
                  for further analysis or integration with other systems.
                </p>
                <TeamDataExport 
                  teamMembersCount={24} 
                  onExportCSV={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
          <ExportCertificationReport />
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Data Export</CardTitle>
              <CardDescription>
                Export detailed team engagement data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This export provides detailed data about your team's participation and engagement metrics. 
                It includes individual response rates, completion status, and department breakdowns.
              </p>
              <div className="flex justify-end">
                <TeamDataExport teamMembersCount={24} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportCertification;
