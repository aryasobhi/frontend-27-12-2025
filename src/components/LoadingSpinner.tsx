// @ts-nocheck
/*
  Status: SKELETON
  Reason: LoadingSpinner is a UI utility for demos and placeholders; it's safe to iterate on visuals but not a runtime API.
  Allowed actions: authoring-only (styling and animation tweaks allowed)
*/

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-gold/30 border-t-gold ${sizeClasses[size]}`}
      />
    </div>
  );
}
