
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation';
import Footer from '@/components/Footer';
import StickyCta from '@/components/sticky-cta';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';

const Root = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <StickyCta />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default Root;
