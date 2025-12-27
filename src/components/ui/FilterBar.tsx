import React, { useState } from 'react';
import { Button } from './button';
import { ChevronDown, Filter, X } from 'lucide-react';
import { cn } from './utils';

interface FilterBarProps {
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode; // For additional filters like dropdowns
  className?: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearch, 
  searchPlaceholder = 'جستجو...', 
  children, 
  className,
  isExpanded: propIsExpanded,
  onExpandedChange: propOnExpandedChange
}) => {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false);
  
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : isExpandedInternal;
  const toggleExpanded = () => {
    if (propOnExpandedChange) {
      propOnExpandedChange(!isExpanded);
    } else {
      setIsExpandedInternal(!isExpandedInternal);
    }
  };

  return (
    <div className={cn('space-y-4', className)} dir="rtl">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 group">
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-10 text-rosary placeholder:text-rosary/30 focus:outline-none focus:border-gold/50 transition-all group-hover:bg-white/10"
          />
          <Filter className="absolute right-3 top-2.5 h-5 w-5 text-rosary/30 group-focus-within:text-gold transition-colors" />
        </div>
        
        {children && (
          <Button
            variant="outline"
            onClick={toggleExpanded}
            className={cn(
              "border-white/10 text-rosary/60 hover:bg-white/5 hover:text-gold transition-all gap-2",
              isExpanded && "bg-white/10 border-gold/30 text-gold"
            )}
          >
            <Filter className="h-4 w-4" />
            فیلترها
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </Button>
        )}
      </div>

      {isExpanded && children && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};
