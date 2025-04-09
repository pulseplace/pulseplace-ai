
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { ThemeSentimentData } from './ThemeSentimentTable';

// Define the sentiment theme colors from Tailwind config
const DEPARTMENT_COLORS = [
  '#3F8CFF', // pulse-blue
  '#FF566B', // ember-coral
  '#32D27E', // trust-mint
  '#8044FF', // purple
  '#FF9944', // orange
  '#44BBFF', // light blue
  '#FF44AA', // pink
];

// Theme names mapping
const THEME_NAMES = {
  trust_in_leadership: 'Trust in Leadership',
  psychological_safety: 'Psychological Safety',
  inclusion_belonging: 'Inclusion & Belonging',
  motivation_fulfillment: 'Motivation & Fulfillment',
  mission_alignment: 'Mission Alignment',
  engagement_continuity: 'Engagement Continuity'
};

interface ThemeSentimentChartsProps {
  data: ThemeSentimentData[];
  selectedDepartment?: string | null;
  selectedTheme?: string | null;
}

const ThemeSentimentCharts: React.FC<ThemeSentimentChartsProps> = ({ 
  data, 
  selectedDepartment, 
  selectedTheme 
}) => {
  // Get all unique themes and departments
  const allThemes = Object.keys(THEME_NAMES);
  const allDepartments = data.map(item => item.department);
  
  // Format data for radar chart (by department)
  const formatRadarData = () => {
    // If a department is selected, only show that department
    const departmentsToShow = selectedDepartment 
      ? data.filter(d => d.department === selectedDepartment)
      : data.slice(0, 5); // Limit to 5 departments to avoid overcrowding
    
    return allThemes.map(theme => {
      const dataPoint: any = {
        theme: THEME_NAMES[theme as keyof typeof THEME_NAMES] || theme,
      };
      
      departmentsToShow.forEach((dept, index) => {
        dataPoint[dept.department] = dept.themes[theme] || 0;
      });
      
      return dataPoint;
    });
  };
  
  // Format data for bar chart (by theme)
  const formatBarData = () => {
    // If a theme is selected, only show that theme
    const themesToShow = selectedTheme ? [selectedTheme] : allThemes;
    
    return data.map(dept => {
      const dataPoint: any = {
        department: dept.department,
      };
      
      themesToShow.forEach(theme => {
        dataPoint[THEME_NAMES[theme as keyof typeof THEME_NAMES] || theme] = dept.themes[theme] || 0;
      });
      
      return dataPoint;
    });
  };
  
  const radarData = formatRadarData();
  const barData = formatBarData();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Radar View by Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="theme" />
                <PolarRadiusAxis domain={[0, 100]} />
                
                {(selectedDepartment 
                  ? data.filter(d => d.department === selectedDepartment) 
                  : data.slice(0, 5)).map((dept, index) => (
                  <Radar
                    key={dept.department}
                    name={dept.department}
                    dataKey={dept.department}
                    stroke={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                    fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                    fillOpacity={0.2}
                  />
                ))}
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedTheme 
              ? `${THEME_NAMES[selectedTheme as keyof typeof THEME_NAMES] || selectedTheme} by Department` 
              : 'Department Breakdown by Theme'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                
                {(selectedTheme ? [selectedTheme] : allThemes).map((theme, index) => (
                  <Bar
                    key={theme}
                    dataKey={THEME_NAMES[theme as keyof typeof THEME_NAMES] || theme}
                    fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSentimentCharts;
