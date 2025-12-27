import React from 'react';
import { cn } from './utils';

interface GothicFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const GothicForm: React.FC<GothicFormProps> = ({ children, onSubmit, className }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={cn('space-y-6 text-right', className)}
      dir="rtl"
    >
      {children}
    </form>
  );
};

interface GothicFormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export const GothicFormField: React.FC<GothicFormFieldProps> = ({ label, children, error, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-bold text-rosary/80 tracking-wide block">
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {error && <p className="text-xs text-blood mt-1 animate-pulse">{error}</p>}
    </div>
  );
};

export const GothicFormRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {children}
    </div>
  );
};
