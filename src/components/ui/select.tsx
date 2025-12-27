import React, { createContext, useContext } from 'react';

type SelectContextType = { value?: string; onChange?: (v: string) => void };
const SelectContext = createContext<SelectContextType>({});

export const Select: React.FC<{ value?: string; onValueChange?: (v: string) => void } & React.HTMLAttributes<HTMLDivElement>> = ({ value, onValueChange, children }) => {
  return <SelectContext.Provider value={{ value, onChange: onValueChange }}>{children}</SelectContext.Provider>;
};

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={`bg-white/5 border border-white/10 rounded-md px-3 py-2 text-rosary cursor-pointer hover:border-gold/50 transition-colors ${className || ''}`}>{children}</div>
);

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const ctx = useContext(SelectContext);
  return <div className="text-rosary">{ctx.value && ctx.value !== 'all' ? ctx.value : <span className="text-rosary/40">{placeholder}</span>}</div>;
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={`mt-2 bg-damask border border-white/20 rounded-md shadow-xl ${className || ''}`}>{children}</div>
);

export const SelectItem: React.FC<{ value: string } & React.HTMLAttributes<HTMLDivElement>> = ({ value, children, className, ...rest }) => {
  const ctx = useContext(SelectContext);
  return (
    <div onClick={() => ctx.onChange?.(value)} className={`px-3 py-2 text-rosary hover:bg-white/10 hover:text-gold cursor-pointer transition-colors ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default Select;

