
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, AlertCircle, CheckCircle, FileText, Download, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { emailService } from '@/services/emailService';

interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  jobTitle: string;
}

const BulkUploadTeam: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<TeamMember[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null);
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      // Check file type
      if (!selectedFile.name.endsWith('.csv')) {
        setParseError("Please upload a CSV file");
        setFile(null);
        setParsedData([]);
        return;
      }
      
      setFile(selectedFile);
      parseCSVFile(selectedFile);
    } else {
      setFile(null);
      setParsedData([]);
    }
  };
  
  const parseCSVFile = (file: File) => {
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const lines = result.split('\n');
        
        // Check for header row
        const header = lines[0].split(',');
        const requiredColumns = ['firstName', 'lastName', 'email', 'department'];
        const headerNormalized = header.map(col => col.trim().toLowerCase());
        
        // Check if all required columns are present
        const missingColumns = requiredColumns.filter(col => !headerNormalized.includes(col.toLowerCase()));
        if (missingColumns.length > 0) {
          throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
        }
        
        // Parse data rows
        const members: TeamMember[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue; // Skip empty lines
          
          const values = lines[i].split(',');
          
          // Check if row has enough values
          if (values.length < requiredColumns.length) {
            console.warn(`Skipping row ${i}: not enough values`);
            continue;
          }
          
          // Map columns to values
          const member: any = {};
          headerNormalized.forEach((column, index) => {
            member[column] = values[index]?.trim() || '';
          });
          
          // Validate email
          if (!member.email || !/\S+@\S+\.\S+/.test(member.email)) {
            console.warn(`Skipping row ${i}: invalid email "${member.email}"`);
            continue;
          }
          
          members.push(member as TeamMember);
        }
        
        if (members.length === 0) {
          throw new Error("No valid team members found in the file");
        }
        
        setParsedData(members);
        setShowPreview(true);
        
      } catch (error) {
        console.error('Error parsing CSV:', error);
        setParseError(error instanceof Error ? error.message : 'Failed to parse CSV file');
        setParsedData([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setParseError('Error reading file');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check file type
      if (!droppedFile.name.endsWith('.csv')) {
        setParseError("Please upload a CSV file");
        return;
      }
      
      setFile(droppedFile);
      parseCSVFile(droppedFile);
    }
  };
  
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setParsedData([]);
    setShowPreview(false);
    setParseError(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const downloadTemplateCSV = () => {
    const templateCSV = 'firstName,lastName,email,department,jobTitle\nJohn,Doe,john.doe@example.com,Engineering,Software Engineer\nJane,Smith,jane.smith@example.com,Marketing,Marketing Manager';
    const blob = new Blob([templateCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team_upload_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded.",
    });
  };
  
  const handleImportConfirm = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your API to import the team members
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate sending welcome emails
      if (parsedData.length > 0) {
        // Just simulate the first email for demo purposes
        const employee = parsedData[0];
        
        const welcomeEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4338ca; text-align: center;">Welcome to PulsePlace.ai</h1>
            
            <p>Hello ${employee.firstName},</p>
            
            <p>You've been invited to participate in Tayana Solutions' workplace culture assessment using PulsePlace.ai.</p>
            
            <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
              <p><strong>Why your input matters:</strong></p>
              <p>Your feedback helps create a more engaging, supportive workplace. The assessment takes only 5-10 minutes to complete and your responses are confidential.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Start Assessment
              </a>
            </div>
            
            <p>If you have any questions, please contact your HR department.</p>
            
            <p>Thank you for your participation!</p>
            
            <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              Powered by PulsePlace.ai - AI-powered workplace culture certification
            </p>
          </div>
        `;
        
        // Send welcome email
        await emailService.sendEmail({
          to: employee.email,
          subject: "Welcome to PulsePlace.ai - Tayana Solutions Culture Assessment",
          html: welcomeEmailHtml,
          fromName: "Tayana Solutions HR",
          fromEmail: "hr@tayanasolutions.com",
        });
      }
      
      toast({
        title: "Team Imported Successfully",
        description: `${parsedData.length} team members have been imported and invitations sent.`,
      });
      
      setShowConfirmDialog(false);
      handleRemoveFile();
      
    } catch (error) {
      console.error('Error importing team:', error);
      toast({
        title: "Import Failed",
        description: "There was an error importing your team. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Bulk Team Upload</CardTitle>
        <CardDescription>
          Import your team members to get started with the PulsePlace.ai certification process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {parseError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{parseError}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${file ? 'border-green-300 bg-green-50' : 'border-gray-300'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            
            {!file ? (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-lg mb-2">Upload Team CSV</h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop a CSV file or click to browse
                </p>
                <Button 
                  onClick={handleUploadButtonClick}
                  disabled={isLoading}
                >
                  Select CSV File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="font-medium text-lg mb-2">File Selected</h3>
                <div className="flex items-center gap-2 bg-white py-2 px-4 rounded-md border">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={handleRemoveFile}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {parsedData.length > 0 && (
                  <p className="text-green-600 mt-2">
                    {parsedData.length} team members found in file
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
              <li>Prepare a CSV file with team member details</li>
              <li>Required columns: firstName, lastName, email, department</li>
              <li>Optional columns: jobTitle, manager, location</li>
              <li>Upload the file using the drag & drop area or browse button</li>
              <li>Review the preview and confirm to import your team</li>
            </ol>
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={downloadTemplateCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
          
          {showPreview && parsedData.length > 0 && (
            <>
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Preview ({parsedData.length} team members)</h3>
                <div className="rounded-md border overflow-hidden">
                  <div className="bg-slate-50 p-3 grid grid-cols-4 gap-4 text-sm font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Department</div>
                    <div>Job Title</div>
                  </div>
                  <div className="divide-y max-h-64 overflow-auto">
                    {parsedData.slice(0, 10).map((member, index) => (
                      <div key={index} className="p-3 grid grid-cols-4 gap-4 text-sm">
                        <div>{member.firstName} {member.lastName}</div>
                        <div className="text-gray-600">{member.email}</div>
                        <div>{member.department}</div>
                        <div>{member.jobTitle || '-'}</div>
                      </div>
                    ))}
                    {parsedData.length > 10 && (
                      <div className="p-3 text-center text-gray-500 text-sm">
                        ... and {parsedData.length - 10} more team members
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRemoveFile} disabled={!file || isLoading}>
          Cancel
        </Button>
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogTrigger asChild>
            <Button 
              disabled={parsedData.length === 0 || isLoading} 
              onClick={() => parsedData.length > 0 && setShowConfirmDialog(true)}
            >
              {isLoading ? 'Processing...' : 'Import Team'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Team Import</DialogTitle>
              <DialogDescription>
                You are about to import {parsedData.length} team members. This will:
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Create accounts for all team members</li>
                <li>Send invitation emails to all team members</li>
                <li>Assign them to their respective departments</li>
              </ul>
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Team members will receive an email invitation to participate in the PulseScore™ certification process.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleImportConfirm} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm Import'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BulkUploadTeam;
