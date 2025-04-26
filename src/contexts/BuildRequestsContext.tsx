
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest } from '@/types/task.types';

// Sample build requests data
const initialBuildRequests: BuildRequest[] = [
  {
    id: '1',
    title: 'Implement Certification Validation API',
    description: 'Create API endpoint to validate certification codes',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-04-17',
    assignedTo: 'Alex Chen',
    module: 'certification',
    lane: 'backlog'
  },
  {
    id: '2',
    title: 'Dashboard Performance Optimization',
    description: 'Improve loading time of the analytics dashboard',
    status: 'backlog',
    priority: 'medium',
    createdAt: '2025-04-19',
    module: 'dashboard',
    lane: 'backlog'
  },
  {
    id: '3',
    title: 'PulseBot NLP Engine Upgrade',
    description: 'Upgrade the NLP engine to enhance sentiment analysis',
    status: 'review',
    priority: 'critical',
    createdAt: '2025-04-10',
    assignedTo: 'Jamie Wong',
    module: 'pulsebot',
    lane: 'current_sprint'
  }
];

interface BuildRequestsContextType {
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'createdAt'>) => void;
  updateBuildRequest: (id: string, request: Partial<BuildRequest>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, status: BuildRequest['status']) => void;
}

const BuildRequestsContext = createContext<BuildRequestsContextType>({
  buildRequests: [],
  addBuildRequest: () => {},
  updateBuildRequest: () => {},
  deleteBuildRequest: () => {},
  moveBuildRequest: () => {}
});

export const BuildRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>(initialBuildRequests);

  const addBuildRequest = (request: Omit<BuildRequest, 'id' | 'createdAt'>) => {
    const newRequest: BuildRequest = {
      ...request,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBuildRequests([...buildRequests, newRequest]);
  };

  const updateBuildRequest = (id: string, updatedRequest: Partial<BuildRequest>) => {
    setBuildRequests(buildRequests.map(request => 
      request.id === id ? { ...request, ...updatedRequest } : request
    ));
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(buildRequests.filter(request => request.id !== id));
  };

  const moveBuildRequest = (id: string, status: BuildRequest['status']) => {
    setBuildRequests(buildRequests.map(request => 
      request.id === id ? { ...request, status } : request
    ));
  };

  return (
    <BuildRequestsContext.Provider 
      value={{ 
        buildRequests, 
        addBuildRequest, 
        updateBuildRequest, 
        deleteBuildRequest,
        moveBuildRequest
      }}
    >
      {children}
    </BuildRequestsContext.Provider>
  );
};

export const useBuildRequests = () => useContext(BuildRequestsContext);
