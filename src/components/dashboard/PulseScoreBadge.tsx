
import React from 'react';
import { 
  getScoreBand, 
  getScoreBandColor, 
  getScoreBandDescription,
  type ScoreBand
} from '@/utils/scoreBanding';
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

interface PulseScoreBadgeProps {
  score: number;
  previousScore?: number;
  className?: string;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PulseScoreBadge: React.FC<PulseScoreBadgeProps> = ({ 
  score, 
  previousScore, 
  className = '',
  showDescription = true,
  size = 'md'
}) => {
  const band = getScoreBand(score);
  const colorClass = getScoreBandColor(band);
  const description = getScoreBandDescription(band);
  
  // Calculate trend
  const scoreDiff = previousScore !== undefined ? score - previousScore : 0;
  const trendDirection = scoreDiff > 0 ? 'up' : scoreDiff < 0 ? 'down' : 'same';
  
  const getBandIcon = (band: ScoreBand) => {
    switch (band) {
      case 'thriving': return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'stable': return <CheckCircle className="h-5 w-5 text-amber-600" />;
      case 'at-risk': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'critical': return <ShieldAlert className="h-5 w-5 text-red-600" />;
    }
  };

  const getTrendIcon = () => {
    if (previousScore === undefined) return null;
    
    switch (trendDirection) {
      case 'up': 
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down': 
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: 
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const sizeClasses = {
    sm: {
      card: 'p-2',
      score: 'text-2xl',
      label: 'text-xs'
    },
    md: {
      card: 'p-4',
      score: 'text-3xl',
      label: 'text-sm'
    },
    lg: {
      card: 'p-5',
      score: 'text-4xl',
      label: 'text-base'
    }
  };

  return (
    <Card className={`${className}`}>
      <CardContent className={`flex flex-col items-center ${sizeClasses[size].card}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-600">PulseScore™</span>
          {getBandIcon(band)}
        </div>
        
        <div className={`flex items-center gap-1 ${sizeClasses[size].score} font-bold`}>
          {score}
          {getTrendIcon()}
        </div>
        
        {previousScore !== undefined && (
          <div className="text-xs text-gray-500 mb-1">
            {trendDirection === 'same' ? 'No change' : (
              <>
                {Math.abs(scoreDiff).toFixed(1)} points 
                {trendDirection === 'up' ? ' higher' : ' lower'}
              </>
            )}
          </div>
        )}
        
        <span className={`px-2 py-1 rounded-full ${colorClass} ${sizeClasses[size].label} font-medium mt-1`}>
          {band.charAt(0).toUpperCase() + band.slice(1)}
        </span>
        
        {showDescription && (
          <p className="text-gray-600 text-xs mt-2 text-center">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PulseScoreBadge;
