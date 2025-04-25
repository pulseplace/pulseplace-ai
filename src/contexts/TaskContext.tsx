
import React from 'react';
import { TasksProvider } from './TasksContext';
import { DebugLogsProvider } from './DebugLogsContext';
import { BuildRequestsProvider } from './BuildRequestsContext';

export function TaskProvider({ children }: { children: React.ReactNode }) {
  return (
    <TasksProvider>
      <DebugLogsProvider>
        <BuildRequestsProvider>
          {children}
        </BuildRequestsProvider>
      </DebugLogsProvider>
    </TasksProvider>
  );
}

// Re-export hooks from individual contexts
export { useTasks } from './TasksContext';
export { useDebugLogs } from './DebugLogsContext';
export { useBuildRequests } from './BuildRequestsContext';
