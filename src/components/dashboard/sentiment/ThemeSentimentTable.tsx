
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define the sentiment score ranges and their corresponding status
const SENTIMENT_RANGES = {
  strong: { min: 90, max: 100, color: 'bg-green-100 text-green-800 border-green-200' },
  healthy: { min: 80, max: 89, color: 'bg-lime-100 text-lime-800 border-lime-200' },
  needsFocus: { min: 70, max: 79, color: 'bg-amber-100 text-amber-800 border-amber-200' },
  criticalAttention: { min: 0, max: 69, color: 'bg-red-100 text-red-800 border-red-200' }
};

// Theme names and descriptions
const THEME_INFO = {
  trust_in_leadership: { 
    name: 'Trust in Leadership',
    description: 'Measures confidence in leadership decisions and transparency'
  },
  psychological_safety: { 
    name: 'Psychological Safety',
    description: 'Assesses if employees feel safe to speak up and take risks'
  },
  inclusion_belonging: { 
    name: 'Inclusion & Belonging',
    description: 'Evaluates feeling of acceptance and value within the organization'
  },
  motivation_fulfillment: { 
    name: 'Motivation & Fulfillment',
    description: 'Measures engagement, purpose and satisfaction at work'
  },
  mission_alignment: { 
    name: 'Mission Alignment',
    description: 'Assesses connection between personal values and company mission'
  },
  engagement_continuity: { 
    name: 'Engagement Continuity',
    description: 'Evaluates likelihood to remain with the organization'
  }
};

export interface ThemeSentimentData {
  department: string;
  themes: {
    [key: string]: number;
  };
}

interface ThemeSentimentTableProps {
  data: ThemeSentimentData[];
  selectedTheme?: string | null;
}

// Helper function to determine sentiment status from score
const getSentimentStatus = (score: number) => {
  if (score >= SENTIMENT_RANGES.strong.min) return { status: 'Strong', ...SENTIMENT_RANGES.strong };
  if (score >= SENTIMENT_RANGES.healthy.min) return { status: 'Healthy', ...SENTIMENT_RANGES.healthy };
  if (score >= SENTIMENT_RANGES.needsFocus.min) return { status: 'Needs Focus', ...SENTIMENT_RANGES.needsFocus };
  return { status: 'Critical Attention', ...SENTIMENT_RANGES.criticalAttention };
};

// Helper function to get background color based on score
const getScoreBackgroundColor = (score: number): string => {
  const { color } = getSentimentStatus(score);
  return color;
};

const ThemeSentimentTable: React.FC<ThemeSentimentTableProps> = ({ data, selectedTheme }) => {
  // Get all unique themes from the data
  const allThemes = Object.keys(THEME_INFO);
  
  // If a theme is selected, filter to only show that theme
  const themesToShow = selectedTheme ? [selectedTheme] : allThemes;
  
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border rounded-lg">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="py-3 px-4 text-left font-medium text-gray-600 w-40">Department</TableHead>
            {themesToShow.map(theme => (
              <TableHead key={theme} className="py-3 px-4 text-left font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  <span>{THEME_INFO[theme as keyof typeof THEME_INFO]?.name || theme}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{THEME_INFO[theme as keyof typeof THEME_INFO]?.description || 'Theme description'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
            ))}
            <TableHead className="py-3 px-4 text-left font-medium text-gray-600 w-32">Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            // Calculate department average across shown themes
            const themeValues = themesToShow.map(theme => row.themes[theme] || 0);
            const departmentAverage = themeValues.reduce((sum, score) => sum + score, 0) / themesToShow.length;
            
            return (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <TableCell className="py-3 px-4 font-medium border-r">{row.department}</TableCell>
                
                {themesToShow.map(theme => {
                  const score = row.themes[theme] || 0;
                  const { status } = getSentimentStatus(score);
                  
                  return (
                    <TableCell key={theme} className="py-3 px-4 border-r">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">{score}</span>
                        <Badge className={`${getScoreBackgroundColor(score)} mt-1 w-fit`}>
                          {status}
                        </Badge>
                      </div>
                    </TableCell>
                  );
                })}
                
                <TableCell className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{Math.round(departmentAverage)}</span>
                    <Badge className={`${getScoreBackgroundColor(departmentAverage)} mt-1 w-fit`}>
                      {getSentimentStatus(departmentAverage).status}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ThemeSentimentTable;
