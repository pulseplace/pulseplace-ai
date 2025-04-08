
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { teamAdminService } from '@/services/teamAdminService';
import { Loader2, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const BulkUploadTeam = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    count: number;
    message: string;
  } | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      // Preview the CSV
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        const rows = csvData.split('\n');
        const headers = rows[0].split(',').map(h => h.trim());
        
        const preview = [];
        for (let i = 1; i < Math.min(rows.length, 6); i++) {
          if (!rows[i].trim()) continue;
          
          const cells = rows[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
          const rowData: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            rowData[header.toLowerCase()] = cells[index] || '';
          });
          
          preview.push(rowData);
        }
        
        setPreviewData(preview);
      };
      reader.readAsText(selectedFile);
    } else {
      setPreviewData([]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadResult(null);
    
    try {
      const csvData = await readFileAsText(file);
      const rows = csvData.split('\n');
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
      
      // Validate headers
      const requiredFields = ['name', 'email'];
      const missingFields = requiredFields.filter(field => !headers.includes(field));
      
      if (missingFields.length > 0) {
        throw new Error(`CSV is missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Parse rows
      const teamMembers = [];
      
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        
        const cells = rows[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
        
        // Skip rows with empty name or email
        if (!cells[headers.indexOf('name')] || !cells[headers.indexOf('email')]) {
          continue;
        }
        
        teamMembers.push({
          name: cells[headers.indexOf('name')],
          email: cells[headers.indexOf('email')],
          department: headers.includes('department') ? cells[headers.indexOf('department')] : 'Unassigned',
          surveyStatus: headers.includes('status') ? 
            formatStatus(cells[headers.indexOf('status')]) : 
            'not_sent'
        });
      }
      
      if (teamMembers.length === 0) {
        throw new Error('No valid team members found in the CSV');
      }
      
      // Upload to database
      const result = await teamAdminService.uploadTeamMembers(teamMembers);
      
      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }
      
      setUploadResult({
        success: true,
        count: result.count,
        message: `Successfully uploaded ${result.count} team members`
      });
      
      toast({
        title: "Upload Successful",
        description: `Uploaded ${result.count} team members`,
      });
    } catch (error: any) {
      console.error('Error uploading team members:', error);
      
      setUploadResult({
        success: false,
        count: 0,
        message: error.message || 'An error occurred during upload'
      });
      
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload team members",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  
  const formatStatus = (status: string): 'completed' | 'pending' | 'not_sent' => {
    const normalized = status.toLowerCase();
    
    if (['complete', 'completed', 'done', 'finished'].includes(normalized)) {
      return 'completed';
    } else if (['pending', 'in progress', 'started'].includes(normalized)) {
      return 'pending';
    } else {
      return 'not_sent';
    }
  };
  
  const renderPreview = () => {
    if (previewData.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Preview (first 5 rows):</h3>
        <div className="bg-slate-50 p-3 rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2">{row.department || 'Unassigned'}</td>
                  <td className="p-2">{row.status || 'Not sent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Upload Team Members</CardTitle>
        <CardDescription>
          Upload a CSV file with team member details to add them in bulk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-1">
                {file ? file.name : 'Click to upload a CSV file'}
              </p>
              <p className="text-xs text-gray-500">
                CSV with headers: name, email, department, status (optional)
              </p>
            </label>
          </div>
          
          {renderPreview()}
          
          {uploadResult && (
            <Alert variant={uploadResult.success ? "default" : "destructive"}>
              <div className="flex items-center">
                {uploadResult.success ? (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                <AlertTitle>
                  {uploadResult.success ? "Upload Successful" : "Upload Failed"}
                </AlertTitle>
              </div>
              <AlertDescription>{uploadResult.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setFile(null);
          setPreviewData([]);
          setUploadResult(null);
        }}>
          Reset
        </Button>
        <Button 
          className="bg-pulse-gradient" 
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload Team Members'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BulkUploadTeam;
