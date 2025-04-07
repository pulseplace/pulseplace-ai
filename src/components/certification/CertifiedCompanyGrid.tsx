
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Building2 } from 'lucide-react';
import { getTierDisplay } from '@/utils/scoring';
import CertificationBadge from './CertificationBadge';

// Mock data for certified companies
const MOCK_CERTIFIED_COMPANIES = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'tech',
    logo: '/placeholder.svg',
    tier: 'pulse_certified',
    score: 92,
    region: 'na',
    description: 'Leading technology solutions provider with a focus on employee well-being and continuous growth.',
    website: 'https://example.com'
  },
  {
    id: 2,
    name: 'Global Finance Partners',
    industry: 'finance',
    logo: '/placeholder.svg',
    tier: 'pulse_certified',
    score: 88,
    region: 'eu',
    description: 'International financial services firm known for innovative work culture and employee development programs.',
    website: 'https://example.com'
  },
  {
    id: 3,
    name: 'MediCare Systems',
    industry: 'healthcare',
    logo: '/placeholder.svg',
    tier: 'pulse_certified',
    score: 90,
    region: 'na',
    description: 'Healthcare technology company building solutions that improve patient outcomes while prioritizing employee satisfaction.',
    website: 'https://example.com'
  },
  {
    id: 4,
    name: 'EduTech Innovations',
    industry: 'education',
    logo: '/placeholder.svg',
    tier: 'emerging_culture',
    score: 82,
    region: 'asia',
    description: 'Educational technology firm transforming learning experiences with a supportive team environment.',
    website: 'https://example.com'
  },
  {
    id: 5,
    name: 'RetailPlus',
    industry: 'retail',
    logo: '/placeholder.svg',
    tier: 'pulse_certified',
    score: 87,
    region: 'latam',
    description: 'Modern retail solutions provider creating exceptional employee and customer experiences.',
    website: 'https://example.com'
  },
  {
    id: 6,
    name: 'TechNova',
    industry: 'tech',
    logo: '/placeholder.svg', 
    tier: 'pulse_certified',
    score: 91,
    region: 'na',
    description: 'Innovative software development company with a focus on work-life balance and professional growth.',
    website: 'https://example.com'
  },
  {
    id: 7,
    name: 'EcoSustain',
    industry: 'tech',
    logo: '/placeholder.svg',
    tier: 'emerging_culture',
    score: 79,
    region: 'eu',
    description: 'Sustainable technology solutions with a growing culture of environmental and employee care.',
    website: 'https://example.com'
  },
  {
    id: 8,
    name: 'HealthFirst',
    industry: 'healthcare',
    logo: '/placeholder.svg',
    tier: 'pulse_certified',
    score: 89,
    region: 'na',
    description: 'Patient-centered healthcare provider with exceptional employee satisfaction ratings.',
    website: 'https://example.com'
  }
];

interface CertifiedCompanyGridProps {
  searchQuery: string;
  industryFilter: string;
  tierFilter: string;
  regionFilter: string;
}

const CertifiedCompanyGrid: React.FC<CertifiedCompanyGridProps> = ({
  searchQuery,
  industryFilter,
  tierFilter,
  regionFilter
}) => {
  // Filter companies based on search and filters
  const filteredCompanies = MOCK_CERTIFIED_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    const matchesTier = tierFilter === 'all' || company.tier === tierFilter;
    const matchesRegion = regionFilter === 'all' || company.region === regionFilter;
    
    return matchesSearch && matchesIndustry && matchesTier && matchesRegion;
  });
  
  if (filteredCompanies.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold mb-4">No companies match your filters</h3>
        <p className="text-gray-600 mb-6">Try adjusting your search criteria or view all certified companies</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Certified Companies
          <span className="text-gray-500 text-xl ml-2">({filteredCompanies.length})</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => {
          const tierInfo = getTierDisplay(company.tier as any);
          
          return (
            <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold">{company.name}</h3>
                        <Badge 
                          className={`ml-2 ${
                            company.tier === 'pulse_certified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {tierInfo.label}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span className="capitalize">{company.industry}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{company.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-pulse-600 mr-2" />
                      <span className="font-semibold">PulseScore™: </span>
                      <span className="ml-1">{company.score}/100</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Visit
                    </Button>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <CertificationBadge 
                    companyName={company.name}
                    tier={company.tier as any}
                    score={company.score}
                    size="compact"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CertifiedCompanyGrid;
