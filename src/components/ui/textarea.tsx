import React from 'react';
import { cn } from './utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...rest }) => {
  return (
    <textarea
      className={cn(
        'w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-rosary placeholder:text-rosary/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-colors',
        className || ''
      )}
      {...rest}
    />
  );
};

export default Textarea;
