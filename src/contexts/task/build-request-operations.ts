
import { v4 as uuidv4 } from 'uuid';
import { BuildRequest, BuildFlowLane } from '@/types/task.types';

export const addBuildRequest = (
  request: Omit<BuildRequest, 'id' | 'createdAt' | 'lane'>,
  currentRequests: BuildRequest[]
): BuildRequest[] => {
  const newRequest: BuildRequest = {
    ...request,
    id: uuidv4(),
    lane: 'BACKLOG',
    createdAt: new Date()
  };
  return [...currentRequests, newRequest];
};

export const updateBuildRequest = (
  id: string,
  updates: Partial<BuildRequest>,
  currentRequests: BuildRequest[]
): BuildRequest[] => {
  return currentRequests.map(req => 
    req.id === id ? { ...req, ...updates } : req
  );
};

export const deleteBuildRequest = (
  id: string,
  currentRequests: BuildRequest[]
): BuildRequest[] => {
  return currentRequests.filter(req => req.id !== id);
};

export const moveBuildRequest = (
  id: string,
  newLane: BuildFlowLane,
  currentRequests: BuildRequest[]
): BuildRequest[] => {
  return currentRequests.map(req => 
    req.id === id ? { ...req, lane: newLane } : req
  );
};

export const getBuildRequestsByLane = (
  lane: BuildFlowLane,
  requests: BuildRequest[]
): BuildRequest[] => {
  return requests.filter(req => req.lane === lane);
};
