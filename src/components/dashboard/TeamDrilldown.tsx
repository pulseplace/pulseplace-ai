
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, AlertTriangle, MessageSquare, BarChart, X, Download } from 'lucide-react';
import PulseScoreDisplay from './PulseScoreDisplay';
import LastUpdatedTimestamp from './LastUpdatedTimestamp';
import ExportButton from './ExportButton';

interface TeamRiskSignal {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface TeamFeedbackTheme {
  name: string;
  sentiment: number;
  count: number;
}

interface TeamTrendPoint {
  date: string;
  value: number;
}

interface TeamDrilldownData {
  id: string;
  name: string;
  pulseScore: number;
  riskSignals: TeamRiskSignal[];
  feedbackThemes: TeamFeedbackTheme[];
  trend: TeamTrendPoint[];
  lastUpdated: Date;
  description: string;
  manager: string;
  size: number;
  department: string;
  location: string;
}

const mockTeamData: Record<string, TeamDrilldownData> = {
  'alpha': {
    id: 'alpha',
    name: 'Team Alpha',
    pulseScore: 74,
    riskSignals: [
      { name: 'Workload Imbalance', severity: 'medium', description: 'Deadlines consistently reported as too tight' },
      { name: 'Recognition', severity: 'low', description: 'Some team members feel underappreciated' }
    ],
    feedbackThemes: [
      { name: 'Transparent Leadership', sentiment: 0.82, count: 12 },
      { name: 'Collaboration', sentiment: 0.79, count: 8 },
      { name: 'Role Clarity', sentiment: 0.74, count: 15 },
      { name: 'Workload Balance', sentiment: 0.58, count: 10 }
    ],
    trend: [
      { date: '2025-01-15', value: 68 },
      { date: '2025-02-15', value: 71 },
      { date: '2025-03-15', value: 73 },
      { date: '2025-04-15', value: 74 }
    ],
    lastUpdated: new Date('2025-04-15T09:30:00'),
    description: 'Frontend development team focused on the customer-facing applications.',
    manager: 'Sarah Reynolds',
    size: 8,
    department: 'Engineering',
    location: 'San Francisco, CA'
  },
  'beta': {
    id: 'beta',
    name: 'Team Beta',
    pulseScore: 82,
    riskSignals: [
      { name: 'Career Clarity', severity: 'low', description: 'Growth paths could be better defined' }
    ],
    feedbackThemes: [
      { name: 'Inclusion', sentiment: 0.88, count: 14 },
      { name: 'Peer Trust', sentiment: 0.91, count: 16 },
      { name: 'Feedback Culture', sentiment: 0.85, count: 12 },
      { name: 'Workload Balance', sentiment: 0.70, count: 10 },
      { name: 'Career Clarity', sentiment: 0.72, count: 8 }
    ],
    trend: [
      { date: '2025-01-15', value: 76 },
      { date: '2025-02-15', value: 79 },
      { date: '2025-03-15', value: 80 },
      { date: '2025-04-15', value: 82 }
    ],
    lastUpdated: new Date('2025-04-15T10:15:00'),
    description: 'Backend infrastructure team responsible for API development and server architecture.',
    manager: 'Michael Chen',
    size: 12,
    department: 'Engineering',
    location: 'Austin, TX'
  },
  'gamma': {
    id: 'gamma',
    name: 'Team Gamma',
    pulseScore: 58,
    riskSignals: [
      { name: 'Burnout', severity: 'high', description: 'Engagement dropped 28% in the last 30 days' },
      { name: 'Leadership Disconnect', severity: 'high', description: 'Manager feedback scores down 31%' },
      { name: 'Team Cohesion', severity: 'medium', description: 'Members feel disconnected from decisions' }
    ],
    feedbackThemes: [
      { name: 'Workload', sentiment: 0.42, count: 18 },
      { name: 'Leadership Support', sentiment: 0.38, count: 15 },
      { name: 'Communication', sentiment: 0.45, count: 12 },
      { name: 'Recognition', sentiment: 0.51, count: 8 }
    ],
    trend: [
      { date: '2025-01-15', value: 72 },
      { date: '2025-02-15', value: 68 },
      { date: '2025-03-15', value: 63 },
      { date: '2025-04-15', value: 58 }
    ],
    lastUpdated: new Date('2025-04-15T11:00:00'),
    description: 'Product launch team working on the new mobile application release.',
    manager: 'Jessica Williams',
    size: 10,
    department: 'Product',
    location: 'New York, NY'
  },
  'sigma': {
    id: 'sigma',
    name: 'Team Sigma',
    pulseScore: 78,
    riskSignals: [
      { name: 'Work-Life Balance', severity: 'medium', description: 'Signs of potential burnout are emerging' },
      { name: 'Communication', severity: 'low', description: 'Some clarity issues in cross-team coordination' }
    ],
    feedbackThemes: [
      { name: 'Innovation', sentiment: 0.92, count: 16 },
      { name: 'Collaboration', sentiment: 0.87, count: 14 },
      { name: 'Learning Culture', sentiment: 0.84, count: 12 },
      { name: 'Work-Life Balance', sentiment: 0.64, count: 18 },
      { name: 'Communication', sentiment: 0.69, count: 15 },
      { name: 'Recognition', sentiment: 0.71, count: 10 }
    ],
    trend: [
      { date: '2025-01-15', value: 71 },
      { date: '2025-02-15', value: 74 },
      { date: '2025-03-15', value: 76 },
      { date: '2025-04-15', value: 78 }
    ],
    lastUpdated: new Date('2025-04-15T08:45:00'),
    description: 'Research and innovation team focused on exploring new AI applications.',
    manager: 'David Park',
    size: 7,
    department: 'Research',
    location: 'Boston, MA'
  },
  'zeta': {
    id: 'zeta',
    name: 'Team Zeta',
    pulseScore: 94,
    riskSignals: [],
    feedbackThemes: [
      { name: 'Psychological Safety', sentiment: 0.96, count: 20 },
      { name: 'Leadership Trust', sentiment: 0.95, count: 18 },
      { name: 'Team Cohesion', sentiment: 0.93, count: 16 },
      { name: 'Career Development', sentiment: 0.91, count: 15 },
      { name: 'Work-Life Balance', sentiment: 0.90, count: 17 }
    ],
    trend: [
      { date: '2025-01-15', value: 88 },
      { date: '2025-02-15', value: 90 },
      { date: '2025-03-15', value: 92 },
      { date: '2025-04-15', value: 94 }
    ],
    lastUpdated: new Date('2025-04-15T09:15:00'),
    description: 'Core platform team responsible for the fundamental infrastructure of our services.',
    manager: 'Emma Rodriguez',
    size: 9,
    department: 'Engineering',
    location: 'Seattle, WA'
  }
};

interface TeamBlockProps {
  id: string;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'flat';
  description: string;
  onClick: (teamId: string) => void;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({
  id,
  name,
  score,
  trend,
  description,
  onClick
}) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>
          <PulseScoreDisplay 
            score={score} 
            tooltipContent={
              <div className="text-xs">
                <strong>PulseScore™:</strong> {score}/100
                <br />
                <span className="text-gray-500">Updated April 15, 2025</span>
              </div>
            }
          />
        </div>
        <div className="flex items-center text-sm">
          <span className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
            {trend === 'down' && <TrendingUp className="h-3.5 w-3.5 rotate-180" />}
            {trend === 'flat' && <span className="w-3.5 h-0.5 bg-current inline-block mx-1" />}
            {trend === 'up' ? 'Improving' : 
             trend === 'down' ? 'Declining' : 
             'Stable'}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto text-xs h-7 px-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick(id);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface TeamDrilldownProps {
  teamIds: string[];
}

const TeamDrilldown: React.FC<TeamDrilldownProps> = ({ teamIds }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleTeamClick = (teamId: string) => {
    setSelectedTeam(teamId);
    setIsDialogOpen(true);
  };
  
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  
  // Get trend direction for a team
  const getTeamTrend = (teamId: string): 'up' | 'down' | 'flat' => {
    const team = mockTeamData[teamId];
    if (!team || team.trend.length < 2) return 'flat';
    
    const latestPoints = team.trend.slice(-2);
    const diff = latestPoints[1].value - latestPoints[0].value;
    
    if (diff > 1) return 'up';
    if (diff < -1) return 'down';
    return 'flat';
  };
  
  const selectedTeamData = selectedTeam ? mockTeamData[selectedTeam] : null;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.8) return 'bg-green-100 text-green-800';
    if (sentiment >= 0.7) return 'bg-teal-100 text-teal-800';
    if (sentiment >= 0.6) return 'bg-blue-100 text-blue-800';
    if (sentiment >= 0.5) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamIds.map(teamId => (
          <TeamBlock 
            key={teamId}
            id={teamId}
            name={mockTeamData[teamId]?.name || `Team ${teamId}`}
            score={mockTeamData[teamId]?.pulseScore || 0}
            trend={getTeamTrend(teamId)}
            description={mockTeamData[teamId]?.description || ''}
            onClick={handleTeamClick}
          />
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTeamData && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle>{selectedTeamData.name}</DialogTitle>
                    <DialogDescription>
                      {selectedTeamData.description}
                    </DialogDescription>
                  </div>
                  <PulseScoreDisplay score={selectedTeamData.pulseScore} size="lg" />
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Manager:</span>
                  <p>{selectedTeamData.manager}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <p>{selectedTeamData.department}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Team Size:</span>
                  <p>{selectedTeamData.size} people</p>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="risk">Risk Signals</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback Themes</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Score History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[160px] flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">
                            [Score history chart would appear here]
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Key Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Engagement:</span>
                            <PulseScoreDisplay score={Math.round(selectedTeamData.pulseScore * 0.95)} size="sm" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Leadership Trust:</span>
                            <PulseScoreDisplay 
                              score={Math.round(
                                selectedTeamData.feedbackThemes.find(t => t.name === 'Leadership Trust')?.sentiment * 100 || 
                                selectedTeamData.pulseScore * 0.9
                              )} 
                              size="sm" 
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Team Cohesion:</span>
                            <PulseScoreDisplay 
                              score={Math.round(
                                selectedTeamData.feedbackThemes.find(t => t.name === 'Team Cohesion')?.sentiment * 100 || 
                                selectedTeamData.pulseScore * 0.85
                              )} 
                              size="sm" 
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Work-Life Balance:</span>
                            <PulseScoreDisplay 
                              score={Math.round(
                                selectedTeamData.feedbackThemes.find(t => t.name === 'Work-Life Balance')?.sentiment * 100 || 
                                selectedTeamData.pulseScore * 0.8
                              )} 
                              size="sm" 
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {selectedTeamData.riskSignals.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Risk Signals
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedTeamData.riskSignals.map((risk, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className={`px-2 py-0.5 rounded text-xs ${getSeverityColor(risk.severity)}`}>
                                {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{risk.name}</p>
                                <p className="text-xs text-muted-foreground">{risk.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        Top Feedback Themes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedTeamData.feedbackThemes.slice(0, 4).map((theme, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{theme.name}</span>
                            <div className={`px-2 py-0.5 rounded text-xs ${getSentimentColor(theme.sentiment)}`}>
                              {Math.round(theme.sentiment * 100)}% positive
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="risk" className="space-y-4 mt-4">
                  {selectedTeamData.riskSignals.length > 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {selectedTeamData.riskSignals.map((risk, index) => (
                            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{risk.name}</h3>
                                <div className={`px-2 py-0.5 rounded text-xs ${getSeverityColor(risk.severity)}`}>
                                  {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                              <div className="text-sm">
                                <p><strong>Recommended Action:</strong></p>
                                <p className="text-muted-foreground">
                                  {risk.severity === 'high' 
                                    ? 'Immediate intervention required. Schedule 1:1 check-ins within 72 hours.'
                                    : risk.severity === 'medium'
                                    ? 'Monitor closely and address in next sprint planning.'
                                    : 'Address in upcoming team retrospective.'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="p-6">
                          <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full mb-4">
                            <TrendingUp className="h-8 w-8 text-green-500" />
                          </div>
                          <h3 className="text-xl font-medium mb-2">No Risk Signals Detected</h3>
                          <p className="text-muted-foreground mb-4">
                            This team is performing well and doesn't show any significant risk indicators.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="feedback" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {selectedTeamData.feedbackThemes.map((theme, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                            <div>
                              <h3 className="font-medium">{theme.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {theme.count} mentions in recent feedback
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    theme.sentiment >= 0.8 ? 'bg-green-500' :
                                    theme.sentiment >= 0.7 ? 'bg-teal-500' :
                                    theme.sentiment >= 0.6 ? 'bg-blue-500' :
                                    theme.sentiment >= 0.5 ? 'bg-amber-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${theme.sentiment * 100}%` }}
                                ></div>
                              </div>
                              <div className={`px-2 py-0.5 rounded text-xs ${getSentimentColor(theme.sentiment)}`}>
                                {Math.round(theme.sentiment * 100)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trends" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="h-[300px] flex items-center justify-center mb-4">
                        <p className="text-sm text-muted-foreground">
                          [Detailed trend charts would appear here]
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Score Progression</h3>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          {selectedTeamData.trend.map((point, index) => (
                            <div key={index} className="border rounded p-2 text-center">
                              <p className="text-muted-foreground text-xs">{new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                              <p className="font-medium">{point.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <LastUpdatedTimestamp timestamp={selectedTeamData.lastUpdated} />
                <div className="flex items-center gap-2">
                  <ExportButton
                    filename={`${selectedTeamData.name.toLowerCase().replace(' ', '-')}-report`}
                    formats={['pdf', 'csv']}
                  />
                  <Button variant="ghost" size="sm" onClick={handleClose}>
                    <X className="h-4 w-4 mr-1" />
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamDrilldown;
