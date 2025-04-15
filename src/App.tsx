
import React from 'react';
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
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
