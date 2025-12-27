import React, { useState } from 'react';
import { cn } from './utils';
import { ChevronDown } from 'lucide-react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  defaultExpanded?: boolean;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  collapsible = false, 
  defaultExpanded = true,
  title,
  ...rest 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div 
      className={cn(
        'bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-glow-black overflow-hidden transition-all duration-300',
        className
      )} 
      {...rest}
    >
      {title && (
        <div 
          className={cn(
            "p-4 border-b border-white/5 flex items-center justify-between",
            collapsible && "cursor-pointer hover:bg-white/5"
          )}
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
        >
          <h3 className="text-gold font-bold tracking-tight">{title}</h3>
          {collapsible && (
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-rosary/30 transition-transform duration-300",
                isExpanded && "rotate-180"
              )} 
            />
          )}
        </div>
      )}
      <div className={cn(
        "transition-all duration-300 origin-top",
        collapsible && !isExpanded ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100 p-6"
      )}>
        {children}
      </div>
    </div>
  );
};

export default Card;
