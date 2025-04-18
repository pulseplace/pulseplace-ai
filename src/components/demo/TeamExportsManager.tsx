
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import InsightsExportButton from '@/components/dashboard/InsightsExportButton';

interface TeamData {
  name: string;
  status: string;
  lastExported?: Date;
}

const demoTeams: TeamData[] = [
  { name: 'Team Alpha', status: 'Active', lastExported: new Date() },
  { name: 'Team Beta', status: 'Certification Eligible' },
  { name: 'Team Gamma', status: 'Under Review' },
  { name: 'Team Sigma', status: 'Approaching Certification' },
  { name: 'Team Zeta', status: 'Gold Certified' }
];

const TeamExportsManager = () => {
  const { toast } = useToast();

  const handleTeamExport = (team: TeamData, format: string) => {
    toast({
      title: `Exporting ${team.name} Data`,
      description: `Preparing ${format.toUpperCase()} export...`
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Team Exports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {demoTeams.map((team) => (
            <div 
              key={team.name}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5"
            >
              <div>
                <h3 className="font-medium">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTeamExport(team, 'csv')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTeamExport(team, 'pdf')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <InsightsExportButton 
                  exportTitle={`${team.name} Report`}
                  department={team.name}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamExportsManager;
