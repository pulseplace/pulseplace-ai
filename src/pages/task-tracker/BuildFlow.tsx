
import React, { useState } from 'react';
import { useTaskManager } from '@/contexts/TaskContext';
import { BuildRequest } from '@/types/task.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import BuildFlowBoard from '@/components/build-flow/BuildFlowBoard';
import BuildRequestForm from '@/components/build-flow/BuildRequestForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function BuildFlow() {
  const { buildRequests, addBuildRequest, updateBuildRequest, deleteBuildRequest, getBuildRequestsByLane } = useTaskManager();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<BuildRequest | undefined>(undefined);

  const backlogCount = getBuildRequestsByLane('BACKLOG').length;
  const sprintCount = getBuildRequestsByLane('CURRENT SPRINT').length;
  const shippedCount = getBuildRequestsByLane('SHIPPED').length;

  const handleAddRequest = () => {
    setCurrentRequest(undefined);
    setIsFormOpen(true);
  };

  const handleEditRequest = (request: BuildRequest) => {
    setCurrentRequest(request);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    deleteBuildRequest(id);
    toast({
      title: "Request deleted",
      description: "The build request has been deleted."
    });
  };

  const handleFormSubmit = (data: any) => {
    if (currentRequest) {
      updateBuildRequest(currentRequest.id, data);
      toast({
        title: "Request updated",
        description: "The build request has been updated successfully."
      });
    } else {
      addBuildRequest(data);
      toast({
        title: "Request submitted",
        description: "Your build request has been added to the backlog."
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Build Flow</h1>
          <p className="text-gray-500 mt-1">Manage and track build requests and development workflow</p>
        </div>
        <Button onClick={handleAddRequest} className="mt-4 md:mt-0 bg-pulse-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Submit New Build Request
        </Button>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Build Process Rule</AlertTitle>
        <AlertDescription>
          Only tasks in the CURRENT SPRINT lane are eligible for development time. To add new tasks, submit a build request to the BACKLOG first.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Build Flow Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 rounded-md text-center">
              <div className="text-lg font-semibold">{backlogCount}</div>
              <div className="text-sm text-gray-500">Backlog Items</div>
            </div>
            <div className="p-4 bg-blue-100 rounded-md text-center">
              <div className="text-lg font-semibold">{sprintCount}</div>
              <div className="text-sm text-gray-500">Current Sprint</div>
            </div>
            <div className="p-4 bg-green-100 rounded-md text-center">
              <div className="text-lg font-semibold">{shippedCount}</div>
              <div className="text-sm text-gray-500">Shipped</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BuildFlowBoard onEditRequest={handleEditRequest} onDeleteRequest={handleDeleteRequest} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentRequest ? 'Edit Request' : 'Submit New Build Request'}</DialogTitle>
          </DialogHeader>
          <BuildRequestForm 
            request={currentRequest} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
