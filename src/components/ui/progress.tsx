import React from 'react';
import { cn } from './utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // percent
  indicatorClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className, indicatorClassName }) => {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full h-2 bg-white/10 rounded-full overflow-hidden', className || '')}>
      <div className={cn('h-full bg-gold transition-all', indicatorClassName || '')} style={{ width: `${pct}%` }} />
    </div>
  );
};

export default Progress;

