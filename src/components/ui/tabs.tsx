import React, { createContext, useContext, useState } from 'react';
import { cn } from './utils';

interface TabsContextValue {
  value: string | null;
  setValue: (v: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const Tabs: React.FC<{ defaultValue?: string; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ defaultValue, children, className }) => {
  const [value, setValue] = useState<string>(defaultValue || '');
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={cn('flex bg-white/5 border border-white/10 p-1 rounded-xl', className || '')}>{children}</div>
);

export const TabsTrigger: React.FC<{ value: string } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext)!;
  const active = ctx.value === value || (!ctx.value && value === 'overview');
  return (
    <button 
      onClick={() => ctx.setValue(value)} 
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        active ? 'bg-gold text-damask' : 'text-rosary hover:bg-white/10',
        className || ''
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string } & React.HTMLAttributes<HTMLDivElement>> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext)!;
  if (ctx.value !== value && !(ctx.value === '' && value === 'overview')) return null;
  return <div className={className}>{children}</div>;
};

export default Tabs;

