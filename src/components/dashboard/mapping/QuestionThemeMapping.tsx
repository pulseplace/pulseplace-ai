
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSampleSurveyQuestions } from '@/utils/scoring';
import { SurveyQuestion, ScoringTheme } from '@/types/scoring.types';

// Define theme color mapping
const themeColors: Record<ScoringTheme, { bg: string, text: string }> = {
  trust_in_leadership: { bg: 'bg-blue-100', text: 'text-blue-800' },
  psychological_safety: { bg: 'bg-green-100', text: 'text-green-800' },
  inclusion_belonging: { bg: 'bg-purple-100', text: 'text-purple-800' },
  motivation_fulfillment: { bg: 'bg-amber-100', text: 'text-amber-800' },
  mission_alignment: { bg: 'bg-teal-100', text: 'text-teal-800' },
  engagement_continuity: { bg: 'bg-rose-100', text: 'text-rose-800' }
};

// Define category color mapping
const categoryColors = {
  emotion_index: 'bg-blue-600',
  engagement_stability: 'bg-purple-600',
  culture_trust: 'bg-teal-600'
};

const themesToCategories: Record<ScoringTheme, 'emotion_index' | 'engagement_stability' | 'culture_trust'> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'culture_trust',
  motivation_fulfillment: 'engagement_stability',
  mission_alignment: 'emotion_index',
  engagement_continuity: 'engagement_stability'
};

const formatThemeName = (theme: string): string => {
  return theme.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatCategoryName = (category: string): string => {
  return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const QuestionThemeMapping = () => {
  const questions = getSampleSurveyQuestions();
  
  // Group questions by theme
  const groupedByTheme = questions.reduce((acc, question) => {
    if (!acc[question.theme]) {
      acc[question.theme] = [];
    }
    acc[question.theme].push(question);
    return acc;
  }, {} as Record<ScoringTheme, SurveyQuestion[]>);

  // Group questions by category
  const groupedByCategory = questions.reduce((acc, question) => {
    const category = themesToCategories[question.theme];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, SurveyQuestion[]>);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Question to Theme to Category Mapping</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="by-theme">By Theme</TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-[200px]">Theme</TableHead>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-[80px] text-right">Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => {
                  const themeColor = themeColors[question.theme];
                  const category = themesToCategories[question.theme];
                  
                  return (
                    <TableRow key={question.id}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.text}</TableCell>
                      <TableCell>
                        <Badge className={`${themeColor.bg} ${themeColor.text}`}>
                          {formatThemeName(question.theme)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-white ${categoryColors[category]}`}>
                          {formatCategoryName(category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{question.weight}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="by-theme">
            <div className="space-y-6">
              {Object.entries(groupedByTheme).map(([theme, questions]) => {
                const themeColor = themeColors[theme as ScoringTheme];
                const category = themesToCategories[theme as ScoringTheme];
                
                return (
                  <div key={theme} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className={`${themeColor.bg} ${themeColor.text} py-1 px-3`}>
                          {formatThemeName(theme)}
                        </Badge>
                        <span className="text-sm text-gray-500">→</span>
                        <Badge className={`text-white ${categoryColors[category]} py-1 px-3`}>
                          {formatCategoryName(category)}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{questions.length} questions</span>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Question</TableHead>
                          <TableHead className="w-[80px] text-right">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {questions.map((question) => (
                          <TableRow key={question.id}>
                            <TableCell>{question.id}</TableCell>
                            <TableCell>{question.text}</TableCell>
                            <TableCell className="text-right font-medium">{question.weight}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="by-category">
            <div className="space-y-6">
              {Object.entries(groupedByCategory).map(([category, questions]) => {
                return (
                  <div key={category} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`text-white ${categoryColors[category]} py-1 px-3`}>
                        {formatCategoryName(category)}
                      </Badge>
                      <span className="text-sm text-gray-500">{questions.length} questions</span>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Question</TableHead>
                          <TableHead className="w-[200px]">Theme</TableHead>
                          <TableHead className="w-[80px] text-right">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {questions.map((question) => {
                          const themeColor = themeColors[question.theme];
                          
                          return (
                            <TableRow key={question.id}>
                              <TableCell>{question.id}</TableCell>
                              <TableCell>{question.text}</TableCell>
                              <TableCell>
                                <Badge className={`${themeColor.bg} ${themeColor.text}`}>
                                  {formatThemeName(question.theme)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-medium">{question.weight}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuestionThemeMapping;
