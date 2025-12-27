import React from 'react';
import { Button } from './button';
import { LucideIcon } from 'lucide-react';
import { cn } from './utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action, className }) => {
  return (
    <div className={cn('flex items-center justify-between mb-8', className)} dir="rtl">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gold tracking-tight mb-2">{title}</h1>
        {subtitle && <p className="text-rosary/60 font-medium">{subtitle}</p>}
      </div>
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-blood hover:bg-blood/80 text-rosary border border-white/10 shadow-glow-gold transition-all"
        >
          {action.icon && <action.icon className="h-4 w-4 ml-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
};
