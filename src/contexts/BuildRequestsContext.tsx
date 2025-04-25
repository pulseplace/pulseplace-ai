import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest, BuildFlowLane } from '@/types/task.types';

interface BuildRequestsContextType {
  buildRequests: BuildRequest[];
  addBuildRequest: (request: Omit<BuildRequest, 'id' | 'lane' | 'createdAt'>) => void;
  updateBuildRequest: (id: string, updates: Partial<Omit<BuildRequest, 'id' | 'createdAt'>>) => void;
  deleteBuildRequest: (id: string) => void;
  moveBuildRequest: (id: string, lane: BuildFlowLane) => void;
  getBuildRequestsByLane: (lane: BuildFlowLane) => BuildRequest[];
}

const BuildRequestsContext = createContext<BuildRequestsContextType | undefined>(undefined);

const initialBuildRequests: BuildRequest[] = [
  {
    id: '1',
    name: 'Team Comparison View',
    context: 'Allow managers to compare team performance metrics side-by-side',
    module: 'Dashboard',
    deadline: new Date('2025-05-10'),
    notes: 'Requested by VP of HR',
    lane: 'BACKLOG',
    createdAt: new Date('2025-04-18')
  },
  {
    id: '2',
    name: 'Slack Integration',
    context: 'Send pulse survey reminders via Slack',
    module: 'Slack Bot',
    deadline: new Date('2025-04-28'),
    notes: 'Requires Slack API approval',
    lane: 'CURRENT SPRINT',
    createdAt: new Date('2025-04-15')
  }
];

export function BuildRequestsProvider({ children }: { children: React.ReactNode }) {
  const [buildRequests, setBuildRequests] = useState<BuildRequest[]>(() => {
    const savedRequests = localStorage.getItem('pulseplace-build-requests');
    return savedRequests ? JSON.parse(savedRequests) : initialBuildRequests;
  });

  useEffect(() => {
    localStorage.setItem('pulseplace-build-requests', JSON.stringify(buildRequests));
  }, [buildRequests]);

  const addBuildRequest = (requestData: Omit<BuildRequest, 'id' | 'lane' | 'createdAt'>) => {
    const newRequest: BuildRequest = {
      ...requestData,
      id: uuidv4(),
      lane: 'BACKLOG',
      createdAt: new Date()
    };
    setBuildRequests(prevRequests => [...prevRequests, newRequest]);
  };

  const updateBuildRequest = (id: string, updates: Partial<Omit<BuildRequest, 'id' | 'createdAt'>>) => {
    setBuildRequests(prevRequests =>
      prevRequests.map(request => request.id === id ? { ...request, ...updates } : request)
    );
  };

  const deleteBuildRequest = (id: string) => {
    setBuildRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const moveBuildRequest = (id: string, lane: BuildFlowLane) => {
    setBuildRequests(prevRequests =>
      prevRequests.map(request => 
        request.id === id ? { ...request, lane } : request
      )
    );
  };

  const getBuildRequestsByLane = (lane: BuildFlowLane) => {
    return buildRequests.filter(request => request.lane === lane);
  };

  return (
    <BuildRequestsContext.Provider value={{
      buildRequests,
      addBuildRequest,
      updateBuildRequest,
      deleteBuildRequest,
      moveBuildRequest,
      getBuildRequestsByLane
    }}>
      {children}
    </BuildRequestsContext.Provider>
  );
}

export function useBuildRequests() {
  const context = useContext(BuildRequestsContext);
  if (context === undefined) {
    throw new Error('useBuildRequests must be used within a BuildRequestsProvider');
  }
  return context;
}
