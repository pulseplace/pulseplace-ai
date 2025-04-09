
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { exportService } from '@/services/team/exportService';

interface ExportOptions {
  format: 'pdf' | 'csv';
  includeDetails: boolean;
  includeTrends: boolean;
  departmentFilter: string;
}

const ExportCertificationReport: React.FC = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeDetails: true,
    includeTrends: true,
    departmentFilter: 'All Departments'
  });
  
  const handleOptionChange = (field: keyof ExportOptions, value: any) => {
    setOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (options.format === 'pdf') {
        const result = await exportService.exportToPDF(
          options.departmentFilter === 'All Departments' ? undefined : options.departmentFilter
        );
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to export PDF');
        }
        
        toast({
          title: "PDF Export Complete",
          description: "Your PDF certification report has been generated and downloaded.",
        });
      } else {
        const result = await exportService.exportTeamDataCSV(
          options.departmentFilter === 'All Departments' ? undefined : options.departmentFilter
        );
        
        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to export CSV');
        }
        
        // Create and download the CSV file
        const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `pulseplace-certification-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export Completed",
          description: "Your CSV export has been downloaded.",
        });
      }
    } catch (error: any) {
      console.error(`Error exporting ${options.format.toUpperCase()}:`, error);
      toast({
        title: "Export Failed",
        description: error.message || `Failed to export ${options.format.toUpperCase()}`,
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const departments = [
    'All Departments',
    'Engineering',
    'Marketing',
    'Sales',
    'Customer Support',
    'Operations',
    'Executive'
  ];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Export Certification Report</CardTitle>
        <CardDescription>
          Generate a detailed report of your organization's certification status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="format">Export Format</Label>
            <div className="flex gap-2 mt-1.5">
              <Button 
                variant={options.format === 'pdf' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleOptionChange('format', 'pdf')}
                className="flex items-center gap-1.5"
              >
                <FileText className="h-4 w-4" />
                PDF Report
              </Button>
              <Button 
                variant={options.format === 'csv' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleOptionChange('format', 'csv')}
                className="flex items-center gap-1.5"
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV Data
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="department">Department Filter</Label>
            <Select 
              value={options.departmentFilter} 
              onValueChange={(value) => handleOptionChange('departmentFilter', value)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="block mb-1.5">Include in Report</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails" 
                checked={options.includeDetails}
                onCheckedChange={(checked) => 
                  handleOptionChange('includeDetails', checked === true)
                }
              />
              <label
                htmlFor="includeDetails"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Detailed Certification Breakdown
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeTrends" 
                checked={options.includeTrends}
                onCheckedChange={(checked) => 
                  handleOptionChange('includeTrends', checked === true)
                }
              />
              <label
                htmlFor="includeTrends"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Historical Trends & Comparisons
              </label>
            </div>
          </div>
          
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-pulse-gradient hover:opacity-90 mt-2"
          >
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {options.format.toUpperCase()} Report
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 mt-2">
            {options.format === 'pdf' ? 
              "PDF exports include branded certification details, score breakdown, and historical trends in a presentation-ready format." :
              "CSV exports provide raw data for custom analysis, CRM integration, or record keeping purposes."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportCertificationReport;
