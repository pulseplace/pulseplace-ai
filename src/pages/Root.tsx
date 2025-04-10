
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation';
import Footer from '@/components/Footer';
import StickyCta from '@/components/sticky-cta';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
};

export default Root;
