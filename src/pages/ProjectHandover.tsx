
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectHandover = () => {
  return (
    <>
      <Helmet>
        <title>Project Handover | PulsePlace.ai</title>
        <meta name="description" content="Project handover documentation and reports for PulsePlace.ai development." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Project Handover
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive documentation and reports for project transition and continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-6">
                <div className="bg-pulse-50 p-4 rounded-full w-fit">
                  <FileText className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Technical Documentation</h3>
              <p className="text-gray-600 mb-6">
                Complete technical specifications, API documentation, and system architecture.
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Docs
              </Button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-6">
                <div className="bg-pulse-50 p-4 rounded-full w-fit">
                  <Users className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Team Reports</h3>
              <p className="text-gray-600 mb-6">
                Development team structure, roles, and responsibilities documentation.
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Reports
              </Button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-6">
                <div className="bg-pulse-50 p-4 rounded-full w-fit">
                  <Calendar className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Project Timeline</h3>
              <p className="text-gray-600 mb-6">
                Complete project timeline with milestones and deliverables.
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Timeline
              </Button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-6">
                <div className="bg-pulse-50 p-4 rounded-full w-fit">
                  <FileText className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Deployment Guide</h3>
              <p className="text-gray-600 mb-6">
                Step-by-step deployment and maintenance procedures.
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectHandover;
