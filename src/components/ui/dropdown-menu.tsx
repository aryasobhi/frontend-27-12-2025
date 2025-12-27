import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from './utils';

// ============================================================================
// Context for managing dropdown state
// ============================================================================
interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within DropdownMenu');
  return ctx;
};

// ============================================================================
// DropdownMenu - Root container with state management
// ============================================================================
interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

// ============================================================================
// DropdownMenuTrigger - Clickable trigger element
// ============================================================================
interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  asChild, 
  children, 
  onClick,
  ...rest 
}) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <div ref={triggerRef} onClick={handleClick} {...rest}>
      {children}
    </div>
  );
};

// ============================================================================
// DropdownMenuContent - Portal-rendered content with solid background
// ============================================================================
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end' | 'center';
  children: React.ReactNode;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  align = 'end',
  className,
  ...rest 
}) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position based on trigger element
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const contentWidth = 200; // Approximate width
      
      setPosition({
        top: rect.bottom + window.scrollY + 8,
            left: (() => {
              if (align === 'end') return rect.right + window.scrollX - contentWidth;
              if (align === 'center') return rect.left + window.scrollX + rect.width / 2 - contentWidth / 2;
              return rect.left + window.scrollX;
            })(),
      });
    }
  }, [isOpen, align, triggerRef]);

  // Close on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      contentRef.current && 
      !contentRef.current.contains(e.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, [setIsOpen, triggerRef]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClickOutside, handleKeyDown]);

  if (!isOpen) return null;

  // Portal renders to document.body, escaping stacking context
  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        // CRITICAL: Solid background, NO backdrop-blur, high z-index
        'fixed min-w-[200px] py-1 rounded-lg shadow-2xl',
        'bg-neutral-900 border border-neutral-700',
        'z-[9999]',
        // Animation
        'animate-in fade-in-0 zoom-in-95 duration-100',
        className
      )}
      style={{
        top: position.top,
        left: position.left,
        // Ensure no inherited opacity/blur
        opacity: 1,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
      {...rest}
    >
      {children}
    </div>,
    document.body
  );
};

// ============================================================================
// DropdownMenuItem - Clickable menu item
// ============================================================================
interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className,
  onClick,
  ...rest 
}) => {
  const { setIsOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    setIsOpen(false); // Close dropdown after selecting item
  };

  return (
    <div 
      className={cn(
        'px-3 py-2 text-sm text-neutral-200 cursor-pointer',
        'hover:bg-neutral-800 hover:text-gold',
        'transition-colors',
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
};

// ============================================================================
// DropdownMenuLabel - Non-clickable label/header
// ============================================================================
interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ 
  children, 
  className,
  ...rest 
}) => (
  <div 
    className={cn(
      'px-3 py-2 text-xs font-semibold text-gold uppercase tracking-wider',
      className
    )} 
    {...rest}
  >
    {children}
  </div>
);

// ============================================================================
// DropdownMenuSeparator - Divider line
// ============================================================================
interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({ 
  className,
  ...rest 
}) => (
  <div 
    className={cn('border-t border-neutral-700 my-1', className)} 
    {...rest}
  />
);

export default DropdownMenu;
