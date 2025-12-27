import React from 'react';
import { cn } from './utils';

type Variant = 'default' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success' | 'warning' | 'blood' | 'gold' | 'glass';
type Size = 'sm' | 'default' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className, 
  children, 
  disabled,
  ...rest 
}) => {
  const base = cn(
    'inline-flex items-center justify-center rounded-xl font-medium',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-damask',
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none grayscale'
  );
  
  const variants: Record<Variant, string> = {
    default: 'bg-white/5 text-rosary border border-white/10 hover:bg-white/10 active:bg-white/15',
    secondary: 'bg-rosary/10 text-rosary hover:bg-rosary/20 active:bg-rosary/25',
    ghost: 'bg-transparent text-rosary hover:bg-white/5 hover:text-gold active:bg-white/10',
    outline: 'bg-transparent border border-white/20 text-rosary hover:bg-white/5 hover:text-gold active:bg-white/10',
    danger: 'bg-blood/20 text-blood border border-blood/30 hover:bg-blood/30 hover:shadow-glow-red',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:shadow-glow-success',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 hover:shadow-glow-warning',
    blood: 'bg-blood text-rosary shadow-glow-red hover:bg-blood/80 active:scale-95',
    gold: 'bg-gold text-damask font-bold hover:shadow-glow-gold hover:opacity-90 active:scale-95',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-rosary/80 hover:text-rosary',
  };
  
  const sizes: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    default: 'h-10 px-4 py-2 text-sm gap-2',
    lg: 'h-12 px-6 text-base font-bold gap-3',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <button 
      className={cn(base, variants[variant], sizes[size], className)} 
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;


