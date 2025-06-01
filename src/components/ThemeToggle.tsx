
import React from 'react';
import { Moon, Sun, Github } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <a
        href="https://github.com/jacobxny/Chord-Learner"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors"
      >
        <Github className="h-5 w-5" />
        <span className="hidden sm:inline">GitHub</span>
      </a>
      
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-white" />
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-slate-600"
        />
        <Moon className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default ThemeToggle;
