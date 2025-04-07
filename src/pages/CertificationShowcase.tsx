
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Award, Buildings, ArrowRight } from 'lucide-react';
import CertifiedCompanyGrid from '@/components/certification/CertifiedCompanyGrid';
import CertificationHero from '@/components/certification/CertificationHero';
import { Link } from 'react-router-dom';

const CertificationShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <CertificationHero />
      
      {/* Filter Section */}
      <section className="py-8 px-4 md:px-6 max-w-7xl mx-auto">
        <Card className="shadow-md border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Buildings className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Industry" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Certification Tier" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="pulse_certified">Pulse Certified</SelectItem>
                    <SelectItem value="emerging_culture">Emerging Culture</SelectItem>
                    <SelectItem value="at_risk">At Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Region" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="na">North America</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia-Pacific</SelectItem>
                    <SelectItem value="latam">Latin America</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Badge variant="outline" className="mr-2 bg-gray-100">
                {industryFilter === 'all' ? 'All Industries' : industryFilter}
              </Badge>
              <Badge variant="outline" className="mr-2 bg-gray-100">
                {tierFilter === 'all' ? 'All Tiers' : tierFilter.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="mr-2 bg-gray-100">
                {regionFilter === 'all' ? 'All Regions' : regionFilter}
              </Badge>
              
              {(searchQuery || industryFilter !== 'all' || tierFilter !== 'all' || regionFilter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setIndustryFilter('all');
                    setTierFilter('all');
                    setRegionFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Company Grid Section */}
      <section className="py-8 px-4 md:px-6 max-w-7xl mx-auto">
        <CertifiedCompanyGrid 
          searchQuery={searchQuery}
          industryFilter={industryFilter}
          tierFilter={tierFilter}
          regionFilter={regionFilter}
        />
      </section>
      
      {/* Get Certified CTA */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-pulse-gradient rounded-xl p-8 md:p-12 shadow-lg text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join These Companies and Get Pulse Certified
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Showcase your exceptional workplace culture and attract top talent with an official PulsePlace certification.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg font-semibold">
                  Get Pulse Certified
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/methodology">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificationShowcase;
