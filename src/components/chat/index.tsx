
import React from 'react';
import PulseBotChat from './PulseBotChat';
import { ErrorBoundary } from './components/ErrorBoundary';
import TaskProgressIndicator from './components/TaskProgressIndicator';

export default function ChatWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <PulseBotChat />
    </ErrorBoundary>
  );
}

// Export named components for reuse
export { PulseBotChat };
export { TaskProgressIndicator };
export { ErrorBoundary } from './components/ErrorBoundary';
export { useConfetti } from './hooks/useConfetti';
export { useMessageHandler } from './hooks/useMessageHandler';
export { useSearch } from './hooks/useSearch';
export { useSession } from './hooks/useSession';
export { useLanguageManager } from './hooks/useLanguageManager';
