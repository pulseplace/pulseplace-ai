
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Upload, Users, CheckCircle, XCircle, FileUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import MetaTags from '@/components/MetaTags';
import { Badge } from '@/components/ui/badge';

const PitchDeckAdmin: React.FC = () => {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pitchDecks, setPitchDecks] = useState<any[]>([]);

  useEffect(() => {
    if (profile) {
      // Check if user is admin
      if (profile.role === 'admin') {
        setIsAdmin(true);
        fetchRequests();
        fetchPitchDecks();
      }
    }
    setIsLoading(false);
  }, [profile]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('pitch_deck_requests')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            email,
            company
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load access requests');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPitchDecks = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('pitch_decks')
        .list();

      if (error) throw error;
      setPitchDecks(data || []);
    } catch (error: any) {
      console.error('Error fetching pitch decks:', error);
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('pitch_deck_requests')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          approved_by: newStatus === 'approved' ? user?.id : null,
          approved_at: newStatus === 'approved' ? new Date().toISOString() : null
        })
        .eq('id', requestId);

      if (error) throw error;

      // If approved, send email confirmation
      if (newStatus === 'approved') {
        const request = requests.find(req => req.id === requestId);
        if (request && request.profiles?.email) {
          await sendApprovalEmail(request);
        }
      }

      toast.success(`Request ${newStatus} successfully`);
      fetchRequests();
    } catch (error: any) {
      console.error('Error updating request status:', error);
      toast.error(error.message || 'Failed to update request status');
    }
  };

  const sendApprovalEmail = async (request: any) => {
    try {
      const { error } = await supabase.functions.invoke('resend-email', {
        body: {
          to: request.profiles.email,
          subject: "You're approved to access the PulsePlace.ai Pitch Deck",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Pitch Deck Access</h1>
              
              <p style="font-size: 16px;">Hi ${request.profiles.first_name || 'there'},</p>
              
              <p style="font-size: 16px;">Thanks for your interest in PulsePlace.ai.</p>
              
              <p style="font-size: 16px;">We're excited to share our latest Investor Pitch Deck (v1) with you.</p>
              
              <div style="margin: 30px 0; text-align: center;">
                <a href="${window.location.origin}/pitch-deck-view" style="background-color: #4338ca; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Access Pitch Deck
                </a>
              </div>
              
              <p style="font-size: 16px; padding: 15px; background-color: #f3f4f6; border-radius: 4px;">
                <strong>Please Note:</strong><br>
                This document is confidential and intended only for your review. It is not to be shared, distributed, or published publicly.
              </p>
              
              <p style="font-size: 16px;">We look forward to hearing your thoughts.</p>
              
              <p style="font-size: 16px;">
                Warm regards,<br>
                Vishal & the PulsePlace.ai team<br>
                <a href="mailto:hello@pulseplace.ai" style="color: #4338ca;">hello@pulseplace.ai</a>
              </p>
            </div>
          `,
          fromName: "PulsePlace.ai",
          fromEmail: "notifications@pulseplace.ai"
        }
      });

      if (error) throw error;
      console.log('Approval email sent successfully');
    } catch (error: any) {
      console.error('Error sending approval email:', error);
      toast.error('Approval status updated, but failed to send email notification');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadPitchDeck = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Check if file is PDF
      if (!file.type.includes('pdf')) {
        throw new Error('Only PDF files are allowed');
      }

      const fileName = `pitch_deck_v1_${Date.now()}.pdf`;
      
      const { error } = await supabase
        .storage
        .from('pitch_decks')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      toast.success('Pitch deck uploaded successfully');
      setUploadDialogOpen(false);
      setFile(null);
      fetchPitchDecks();
    } catch (error: any) {
      console.error('Error uploading pitch deck:', error);
      toast.error(error.message || 'Failed to upload pitch deck');
    } finally {
      setUploading(false);
    }
  };

  const deletePitchDeck = async (fileName: string) => {
    if (!confirm('Are you sure you want to delete this pitch deck?')) {
      return;
    }

    try {
      const { error } = await supabase
        .storage
        .from('pitch_decks')
        .remove([fileName]);

      if (error) throw error;

      toast.success('Pitch deck deleted successfully');
      fetchPitchDecks();
    } catch (error: any) {
      console.error('Error deleting pitch deck:', error);
      toast.error(error.message || 'Failed to delete pitch deck');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is only available to administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags
        title="Pitch Deck Admin | PulsePlace.ai"
        description="Admin panel for managing pitch deck access requests."
      />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pitch Deck Administration</h1>
            <p className="text-gray-600">Manage pitch deck files and access requests</p>
          </div>
          <Button onClick={() => setUploadDialogOpen(true)} className="bg-pulse-gradient">
            <Upload className="h-4 w-4 mr-2" />
            Upload Pitch Deck
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Pitch Decks</CardTitle>
            <CardDescription>Manage uploaded pitch deck files</CardDescription>
          </CardHeader>
          <CardContent>
            {pitchDecks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileUp className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No pitch decks have been uploaded yet.</p>
                <p className="text-sm mt-1">Click the Upload button to add a pitch deck.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pitchDecks.map((deck) => (
                    <TableRow key={deck.id}>
                      <TableCell>{deck.name}</TableCell>
                      <TableCell>{Math.round(deck.metadata.size / 1024)} KB</TableCell>
                      <TableCell>{new Date(deck.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={() => deletePitchDeck(deck.name)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Requests</CardTitle>
            <CardDescription>Manage user requests to access the pitch deck</CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No access requests have been submitted yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requester</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        {request.profiles?.first_name} {request.profiles?.last_name}
                        <div className="text-xs text-gray-500">{request.profiles?.email}</div>
                      </TableCell>
                      <TableCell>{request.company_name}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            request.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            request.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                            'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          }
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleStatusChange(request.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleStatusChange(request.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pitch Deck</DialogTitle>
            <DialogDescription>
              Upload a PDF file of your investor pitch deck
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>
            {file && (
              <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-sm font-medium text-blue-900">{file.name}</p>
                <p className="text-xs text-blue-700">{Math.round(file.size / 1024)} KB</p>
              </div>
            )}
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" disabled={uploading}>Cancel</Button>
              </DialogClose>
              <Button 
                onClick={uploadPitchDeck} 
                disabled={uploading || !file}
                className="bg-pulse-gradient"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Request Details</DialogTitle>
            <DialogDescription>
              Review details of the access request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <Badge 
                  className={
                    selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                    selectedRequest.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                    'bg-blue-100 text-blue-800 hover:bg-blue-100'
                  }
                >
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Requester</h3>
                <p>
                  {selectedRequest.profiles?.first_name} {selectedRequest.profiles?.last_name} ({selectedRequest.profiles?.email})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p>{selectedRequest.company_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Request Date</h3>
                <p>{new Date(selectedRequest.created_at).toLocaleString()}</p>
              </div>
              {selectedRequest.status === 'pending' && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'rejected');
                      setSelectedRequest(null);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'approved');
                      setSelectedRequest(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PitchDeckAdmin;
