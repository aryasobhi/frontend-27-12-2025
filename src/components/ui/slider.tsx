import React from 'react';
import { cn } from './utils';

interface SliderProps {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ id, min = 0, max = 100, step = 1, value, onValueChange, className }) => {
  return (
    <div className={cn('relative flex w-full touch-none select-none items-center', className)}>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([parseFloat(e.target.value)])}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
};

export default Slider;
