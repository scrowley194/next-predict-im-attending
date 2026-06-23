import React from 'react';
import { cn } from '@/src/lib/utils';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
}

export function Slider({ label, value, min, max, step = 1, onChange, icon }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-[#888] flex items-center gap-2">
          {icon && <span className="text-[#666]">{icon}</span>}
          {label}
        </label>
        <span className="text-xs font-mono text-[#888] bg-[#222] px-2 py-0.5 rounded">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={cn(
          "w-full h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer",
          "accent-yellow-400 hover:accent-yellow-300 transition-colors"
        )}
      />
    </div>
  );
}
