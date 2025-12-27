import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import { toPersianNumber } from '../lib/i18n';

interface StatItem {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 5;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4`} dir="rtl">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
          <p className="text-sm text-rosary/60 font-vazir">{stat.label}</p>
          <div className="flex items-center justify-between mt-1">
            <p className={`text-2xl font-bold font-mono ${stat.color || 'text-gold'}`}>
              {typeof stat.value === 'number' ? toPersianNumber(stat.value.toLocaleString()) : toPersianNumber(stat.value)}
            </p>
            {stat.icon && (
              <stat.icon className={`w-5 h-5 ${stat.color || 'text-gold/50'}`} />
            )}
          </div>
          {stat.trend && (
            <p className={`text-xs mt-2 flex items-center gap-1 font-vazir ${stat.trend.isPositive ? 'text-green-400' : 'text-blood'}`}>
              <span className="text-[10px]">{stat.trend.isPositive ? '▲' : '▼'}</span>
              <span>{toPersianNumber(Math.abs(stat.trend.value))}%</span>
              <span className="text-rosary/40">نسبت به دوره قبل</span>
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
