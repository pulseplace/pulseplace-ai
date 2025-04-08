
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';

interface LanguageDistributionChartProps {
  languageBreakdown: {
    language: string;
    count: number;
    percentage: number;
  }[];
  isLoading: boolean;
  fullSize?: boolean; // Added optional fullSize prop
}

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];

const LanguageDistributionChart: React.FC<LanguageDistributionChartProps> = ({ 
  languageBreakdown, 
  isLoading,
  fullSize = false // Default to false if not provided
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
        <CardDescription>Usage breakdown by language</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <Skeleton className="h-80 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={fullSize ? 400 : 300}>
              <PieChart>
                <Pie
                  data={languageBreakdown}
                  dataKey="count"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  outerRadius={fullSize ? 120 : 80}
                  label={({ language, percentage }) => `${language}: ${percentage.toFixed(1)}%`}
                >
                  {languageBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} uses`, props.payload.language]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languageBreakdown.map((lang, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{lang.language}</TableCell>
                      <TableCell>{lang.count}</TableCell>
                      <TableCell>{lang.percentage.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageDistributionChart;
