
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import DemoReadyLayout from '@/components/layout/DemoReadyLayout';
import routes from '@/config/routes';
import Root from '@/pages/Root';
import { TaskProvider } from './contexts/task';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Create router with proper configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routes.map(route => ({
      path: route.path === '/' ? '' : route.path, // Fix root path mapping
      element: <DemoReadyLayout>{route.element}</DemoReadyLayout>
    }))
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TaskProvider>
          <RouterProvider router={router} />
          <Toaster />
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
