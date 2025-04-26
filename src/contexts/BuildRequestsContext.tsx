
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest, BuildFlowLane } from '@/types/task.types';

interface BuildRequestsContextType {
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'createdAt'>) => void;
  updateBuildRequest: (request: BuildRequest) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, newStatus: BuildFlowLane) => void;
}

const BuildRequestsContext = createContext<BuildRequestsContextType | undefined>(undefined);

// Sample build requests for demonstration
const initialBuildRequests: BuildRequest[] = [
  {
    id: uuidv4(),
    title: 'Implement AI insights dashboard',
    description: 'Create a dashboard to show AI-generated insights from PulseBot conversations',
    status: 'backlog',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    module: 'dashboard'
  },
  {
    id: uuidv4(),
    title: 'PulseBot Slack integration',
    description: 'Integrate PulseBot with Slack to enable survey collection via Slack',
    status: 'in_progress',
    priority: 'critical',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    module: 'pulsebot',
    assignedTo: 'Alex'
  },
  {
    id: uuidv4(),
    title: 'Certificate sharing via email',
    description: 'Add functionality to share certificates via email',
    status: 'review',
    priority: 'medium',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    module: 'certification',
    assignedTo: 'Jordan'
  },
  {
    id: uuidv4(),
    title: 'Fix mobile responsive issues',
    description: 'Address various mobile responsive issues in the dashboard',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    module: 'core',
    assignedTo: 'Sam'
  },
];

export const BuildRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>(initialBuildRequests);

  // Add a new build request
  const addBuildRequest = (request: Omit<BuildRequest, 'id' | 'createdAt'>) => {
    const newRequest: BuildRequest = {
      ...request,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    setBuildRequests(prev => [newRequest, ...prev]);
  };

  // Update an existing build request
  const updateBuildRequest = (updatedRequest: BuildRequest) => {
    setBuildRequests(prev => 
      prev.map(request => request.id === updatedRequest.id ? updatedRequest : request)
    );
  };

  // Delete a build request
  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prev => prev.filter(request => request.id !== id));
  };

  // Move a build request to a different status lane
  const moveBuildRequest = (id: string, newStatus: BuildFlowLane) => {
    setBuildRequests(prev => 
      prev.map(request => request.id === id ? { ...request, status: newStatus } : request)
    );
  };

  const value = {
    buildRequests,
    addBuildRequest,
    updateBuildRequest,
    deleteBuildRequest,
    moveBuildRequest
  };

  return <BuildRequestsContext.Provider value={value}>{children}</BuildRequestsContext.Provider>;
};

export const useBuildRequests = () => {
  const context = useContext(BuildRequestsContext);
  if (context === undefined) {
    throw new Error('useBuildRequests must be used within a BuildRequestsProvider');
  }
  return context;
};
