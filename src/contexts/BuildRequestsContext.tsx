
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest, TaskModule } from '@/types/task.types';

interface BuildRequestsContextType {
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, "id" | "lane">) => void;
  updateBuildRequest: (id: string, updates: Partial<BuildRequest>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, lane: 'backlog' | 'current_sprint' | 'shipped') => void;
}

const BuildRequestsContext = createContext<BuildRequestsContextType | undefined>(undefined);

export const BuildRequestsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Sample build requests
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>([
    {
      id: uuidv4(),
      title: 'Enhanced Survey Analytics',
      description: 'Add advanced filtering and visualization options to survey results',
      status: 'planned',
      priority: 'high',
      module: 'dashboard',
      lane: 'backlog',
    },
    {
      id: uuidv4(),
      title: 'Team Comparison Feature',
      description: 'Allow users to compare PulseScores across multiple teams',
      status: 'in-progress',
      priority: 'medium',
      module: 'dashboard',
      lane: 'current_sprint',
      assignedTo: 'Casey Morgan'
    },
    {
      id: uuidv4(),
      title: 'Badge Embedding API',
      description: 'Create API endpoints for embedding certification badges on external sites',
      status: 'completed',
      priority: 'medium',
      module: 'certification',
      lane: 'shipped',
      assignedTo: 'Alex Chen'
    }
  ]);

  const addBuildRequest = (request: Omit<BuildRequest, "id" | "lane">) => {
    setBuildRequests([...buildRequests, {
      ...request,
      id: uuidv4(),
      lane: 'backlog'
    }]);
  };

  const updateBuildRequest = (id: string, updates: Partial<BuildRequest>) => {
    setBuildRequests(buildRequests.map(request => 
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(buildRequests.filter(request => request.id !== id));
  };

  const moveBuildRequest = (id: string, lane: 'backlog' | 'current_sprint' | 'shipped') => {
    setBuildRequests(buildRequests.map(request => 
      request.id === id ? { ...request, lane } : request
    ));
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
