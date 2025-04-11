import React from 'react';
import { X, Settings, FileDown, FileJson, ChevronDown, Trash2 } from 'lucide-react';
import { BotAvatarState, MessageLanguage } from '../types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BotEmoji } from '../BotEmoji';
import { cn } from '@/lib/utils';
import { ClearHistoryDialog } from './ClearHistoryDialog';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  handleLanguageChange: (language: MessageLanguage) => void;
  toggleChat: () => void;
  onClearHistory: () => void;
  onExportChat?: () => void;
  exportFormat?: 'json' | 'pdf';
  onExportFormatChange?: (format: 'json' | 'pdf') => void;
  isMobile?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botAvatarState,
  language,
  languages,
  handleLanguageChange,
  toggleChat,
  onClearHistory,
  onExportChat,
  exportFormat = 'json',
  onExportFormatChange,
  isMobile
}) => {
  const [openClearHistory, setOpenClearHistory] = React.useState(false);

  // Get bot avatar state
  const getBotEmoji = () => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState;
    } else if (botAvatarState && 'status' in botAvatarState) {
      return botAvatarState.status;
    }
    return 'idle';
  };

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center space-x-3">
        <BotEmoji state={getBotEmoji()} />
        <h3 className="text-lg font-semibold">PulseBot</h3>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5 rotate-0 transition-transform" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <div className="grid gap-2">
                <label htmlFor="language" className="text-sm font-medium leading-none">
                  Language
                </label>
                <select 
                  id="language" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as MessageLanguage)}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </DropdownMenuItem>
            
            {onExportChat && onExportFormatChange && (
              <>
                <DropdownMenuItem>
                  <label className="text-sm font-medium leading-none">Export As:</label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button 
                    variant={exportFormat === 'json' ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => onExportFormatChange('json')}
                  >
                    <FileJson className="h-4 w-4" />
                    JSON
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button 
                    variant={exportFormat === 'pdf' ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => onExportFormatChange('pdf')}
                  >
                    <FileDown className="h-4 w-4" />
                    PDF
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button 
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={onExportChat}
                  >
                    <FileDown className="h-4 w-4" />
                    Export Chat
                  </Button>
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuItem>
              <Button 
                variant="destructive"
                className="w-full justify-center gap-2"
                onClick={() => setOpenClearHistory(true)}
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" onClick={toggleChat}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <ClearHistoryDialog 
        open={openClearHistory} 
        onClose={() => setOpenClearHistory(false)} 
        onClearHistory={onClearHistory} 
      />
    </div>
  );
};
