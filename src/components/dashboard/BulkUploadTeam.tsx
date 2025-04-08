
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, Loader2, AlertCircle, Download } from 'lucide-react';
import { teamAdminService } from '@/services/teamAdminService';

interface UploadedMember {
  name: string;
  email: string;
  department: string;
  surveyStatus: 'completed' | 'pending' | 'not_sent';
}

const BulkUploadTeam = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [preview, setPreview] = useState<UploadedMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUploadComplete(false);
    
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Check if the file is a CSV
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const content = e.target.result as string;
          const lines = content.split('\n');
          
          // Get headers (first line)
          const headers = lines[0].split(',').map(header => header.trim());
          
          // Check for required columns
          const requiredColumns = ['name', 'email', 'department'];
          const missingColumns = requiredColumns.filter(
            col => !headers.some(header => header.toLowerCase() === col)
          );
          
          if (missingColumns.length > 0) {
            setError(`Missing required columns: ${missingColumns.join(', ')}`);
            return;
          }
          
          // Parse data rows
          const previewData: UploadedMember[] = [];
          for (let i = 1; i < Math.min(lines.length, 6); i++) {
            if (lines[i].trim() === '') continue;
            
            const values = lines[i].split(',').map(value => value.trim());
            const row: any = {};
            
            headers.forEach((header, index) => {
              const normalizedHeader = header.toLowerCase();
              if (normalizedHeader === 'name' || normalizedHeader === 'email' || normalizedHeader === 'department') {
                row[normalizedHeader] = values[index] || '';
              }
            });
            
            // Add default survey status
            row.surveyStatus = 'not_sent';
            
            previewData.push(row as UploadedMember);
          }
          
          setPreview(previewData);
        } catch (err) {
          console.error('Error parsing CSV:', err);
          setError('Failed to parse CSV file. Please check the format.');
        }
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const content = await file.text();
      const lines = content.split('\n');
      
      // Get headers (first line)
      const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
      
      // Find column indexes
      const nameIndex = headers.findIndex(h => h === 'name');
      const emailIndex = headers.findIndex(h => h === 'email');
      const departmentIndex = headers.findIndex(h => h === 'department');
      
      if (nameIndex === -1 || emailIndex === -1 || departmentIndex === -1) {
        throw new Error('Missing required columns: name, email, or department');
      }
      
      // Parse all data rows
      const teamMembers: UploadedMember[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',').map(value => value.trim());
        
        if (values.length >= Math.max(nameIndex, emailIndex, departmentIndex) + 1) {
          teamMembers.push({
            name: values[nameIndex],
            email: values[emailIndex],
            department: values[departmentIndex],
            surveyStatus: 'not_sent'
          });
        }
      }
      
      // Upload to Supabase using service
      const result = await teamAdminService.uploadTeamMembers(teamMembers);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to upload team members');
      }
      
      setUploadComplete(true);
      toast({
        title: "Upload Successful",
        description: `${result.count} team members have been uploaded`,
      });
      
      // Reset file after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFile(null);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload team members');
      toast({
        title: "Upload Failed",
        description: err.message || "Failed to upload team members. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "name,email,department\nJohn Doe,john.doe@example.com,Engineering\nJane Smith,jane.smith@example.com,Marketing";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'team-upload-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Bulk Upload Team</CardTitle>
        <CardDescription>
          Upload your team members to quickly set up your PulsePlace account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-slate-50 p-4 rounded-md">
            <h3 className="font-medium text-lg mb-2">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Download the CSV template or prepare your own CSV with the required columns</li>
              <li>Fill in your team members' information</li>
              <li>Upload the completed CSV file</li>
              <li>Review the preview and confirm the upload</li>
            </ol>
            <Button variant="ghost" className="mt-4" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
          
          {/* Upload box */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${error ? 'border-red-400 bg-red-50' : 'border-slate-300'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
            />
            
            {error ? (
              <div className="flex flex-col items-center text-red-600">
                <AlertCircle className="h-10 w-10 mb-4" />
                <p className="font-medium mb-1">Error</p>
                <p className="text-sm">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => setError(null)}>
                  Try Again
                </Button>
              </div>
            ) : uploadComplete ? (
              <div className="flex flex-col items-center text-green-600">
                <Check className="h-10 w-10 mb-4" />
                <p className="font-medium mb-1">Upload Complete</p>
                <p className="text-sm">Your team members have been added successfully</p>
                <Button variant="outline" className="mt-4" onClick={() => setUploadComplete(false)}>
                  Upload Another File
                </Button>
              </div>
            ) : file ? (
              <div className="flex flex-col items-center">
                <p className="font-medium mb-1">{file.name}</p>
                <p className="text-sm text-gray-500 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                <Button variant="outline" onClick={() => setFile(null)}>
                  Choose Different File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-slate-400 mb-4" />
                <p className="font-medium mb-1">Upload Team CSV</p>
                <p className="text-sm text-gray-500">Click to browse or drag and drop</p>
              </div>
            )}
          </div>
          
          {/* Preview */}
          {preview.length > 0 && !uploadComplete && (
            <div>
              <h3 className="font-medium text-lg mb-2">Preview</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((member, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 5 && (
                  <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500">
                    Showing 5 of {file ? 'many' : preview.length} records
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 border-t pt-6">
        <Button variant="outline" onClick={() => setFile(null)}>
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading || uploadComplete}
          className="bg-pulse-gradient"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Team Members
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BulkUploadTeam;
