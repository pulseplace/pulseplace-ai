
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, ArrowUp } from 'lucide-react';
import CountdownTimer from './demo-day/CountdownTimer';
import ProgressSection from './demo-day/ProgressSection';
import TaskList from './demo-day/TaskList';
import MilestoneTracker from './demo-day/MilestoneTracker';
import QuickAccessButtons from './demo-day/QuickAccessButtons';
import { useDemoDay } from './demo-day/useDemoDay';

const DemoDayCountdown: React.FC = () => {
  const {
    timeRemaining,
    tasks,
    phasesProgress,
    milestones,
    lastUpdated,
    completedTasks,
    overallReadiness,
    toggleTaskCompletion,
    formatLastUpdated
  } = useDemoDay();

  return (
    <Card className="shadow-lg border-t-4 border-t-purple-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            Beta Demo Day Countdown
          </CardTitle>
          <Badge 
            variant={completedTasks === tasks.length ? "default" : "outline"}
            className={`${completedTasks === tasks.length ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}
          >
            {completedTasks === tasks.length ? 
              <CheckCircle2 className="h-3 w-3 mr-1" /> : 
              <Clock className="h-3 w-3 mr-1 animate-pulse" />
            }
            {completedTasks === tasks.length ? 
              'Ready for demo!' : 
              `${completedTasks}/${tasks.length} completed`
            }
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Countdown timer */}
        <CountdownTimer timeRemaining={timeRemaining} />

        {/* Overall Progress */}
        <ProgressSection 
          overallReadiness={overallReadiness} 
          phasesProgress={phasesProgress} 
        />
        
        {/* Today's Focus */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <ArrowUp className="h-3 w-3 mr-1 text-red-500" />
            Today's Focus
          </h3>
          
          <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} />
        </div>
        
        {/* Milestone Tracker */}
        <MilestoneTracker milestones={milestones} />
        
        {/* Quick Access Buttons */}
        <QuickAccessButtons />

        {/* Last updated timestamp */}
        <div className="flex justify-end text-xs text-gray-500 pt-2 border-t mt-4">
          Last updated: {formatLastUpdated(lastUpdated)}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoDayCountdown;
