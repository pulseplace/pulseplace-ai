
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import DemoReadyLayout from '@/components/layout/DemoReadyLayout';
import routes from '@/config/routes';

const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: <DemoReadyLayout>{route.element}</DemoReadyLayout>
  }))
);

function App() {
  useEffect(() => {
    console.log('App component mounted');
    console.log('Current routes:', routes);
    
    // Check for any error listeners
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', event.error);
    });
    
    return () => {
      window.removeEventListener('error', () => {});
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
