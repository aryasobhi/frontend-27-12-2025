// @ts-nocheck
/*
  Status: SKELETON
  Reason: EmptyState is a small UI helper used in demos and placeholders; modifications are safe for authoring but should not change runtime contracts.
  Allowed actions: authoring-only (update visuals and example usage only)
*/

import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  action?: React.ReactNode; // Added to support the new 'action' prop
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
        <Icon className="w-8 h-8 text-gold/50" />
      </div>
      <h3 className="text-xl font-semibold text-rosary mb-2">{title}</h3>
      <p className="text-rosary/60 max-w-sm mx-auto mb-8">{description}</p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}
