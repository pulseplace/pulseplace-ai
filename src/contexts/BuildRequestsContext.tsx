
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest, BuildFlowLane } from '@/types/task.types';

interface BuildRequestsContextType {
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'createdAt'>) => void;
  updateBuildRequest: (id: string, updates: Partial<BuildRequest>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, newStatus: BuildFlowLane) => void;
}

const BuildRequestsContext = createContext<BuildRequestsContextType | undefined>(undefined);

const initialBuildRequests: BuildRequest[] = [
  {
    id: '1',
    title: 'Implement Certification Badge',
    description: 'Create an embeddable certification badge component with customizable styles',
    status: 'in_progress',
    priority: 'high',
    module: 'certification',
    createdAt: new Date(2025, 3, 20).toISOString(),
    assignedTo: 'Sarah Chen'
  },
  {
    id: '2',
    title: 'PulseScore Tier Display Fix',
    description: 'Fix color coding and labels for PulseScore tiers in dashboard summary',
    status: 'review',
    priority: 'medium',
    module: 'dashboard',
    createdAt: new Date(2025, 3, 22).toISOString(),
    assignedTo: 'James Wilson'
  },
  {
    id: '3',
    title: 'Add Email Template Preview',
    description: 'Create preview functionality for certification email templates',
    status: 'backlog',
    priority: 'low',
    module: 'core',
    createdAt: new Date(2025, 3, 23).toISOString()
  }
];

export const BuildRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>(initialBuildRequests);

  const addBuildRequest = (request: Omit<BuildRequest, 'id' | 'createdAt'>) => {
    const newRequest: BuildRequest = {
      ...request,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    setBuildRequests(prev => [...prev, newRequest]);
  };

  const updateBuildRequest = (id: string, updates: Partial<BuildRequest>) => {
    setBuildRequests(prev => 
      prev.map(request => request.id === id ? { ...request, ...updates } : request)
    );
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prev => prev.filter(request => request.id !== id));
  };

  const moveBuildRequest = (id: string, newStatus: BuildFlowLane) => {
    setBuildRequests(prev => 
      prev.map(request => request.id === id ? { ...request, status: newStatus } : request)
    );
  };

  return (
    <BuildRequestsContext.Provider value={{ 
      buildRequests, 
      addBuildRequest, 
      updateBuildRequest, 
      deleteBuildRequest,
      moveBuildRequest
    }}>
      {children}
    </BuildRequestsContext.Provider>
  );
};

export const useBuildRequests = () => {
  const context = useContext(BuildRequestsContext);
  if (context === undefined) {
    throw new Error('useBuildRequests must be used within a BuildRequestsProvider');
  }
  return context;
};
