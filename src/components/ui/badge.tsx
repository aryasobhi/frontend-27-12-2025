import React from 'react';
import { cn } from './utils';

type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'gold';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', ...rest }) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-white/10 text-rosary border-white/20',
    outline: 'bg-transparent text-rosary border-white/30',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    error: 'bg-error/20 text-error border-error/30',
    info: 'bg-info/20 text-info border-info/30',
    gold: 'bg-gold/20 text-gold border-gold/30',
  };
  
  return (
    <span 
      className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant], 
        className || ''
      )} 
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;


