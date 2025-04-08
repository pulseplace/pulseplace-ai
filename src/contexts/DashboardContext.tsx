
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardContextType } from '@/types/dashboard.types';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useLoadingTimeout } from '@/hooks/useLoadingTimeout';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { user } = useAuth();
  
  // Use the custom hook to handle dashboard data
  const {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData,
    forceRefresh
  } = useDashboardData(user?.id);
  
  // Handle timeout fallback
  useLoadingTimeout({
    isLoading,
    surveys,
    setSurveys: (s) => {},  // Empty function as we're using useDashboardData
    setResponses: (r) => {}, // Empty function as we're using useDashboardData
    setStats: (s) => {}, // Empty function as we're using useDashboardData
    setIsLoading: (l) => {}, // Empty function as we're using useDashboardData
    userId: user?.id
  });

  const value = {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData,
    forceRefresh
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
