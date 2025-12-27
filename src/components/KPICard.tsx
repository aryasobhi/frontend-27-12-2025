import { LucideIcon } from 'lucide-react';
import { toPersianNumber } from '../lib/i18n';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function KPICard({ title, value, change, icon: Icon, iconColor = 'text-gold' }: KPICardProps) {
  // Format change with Persian numbers
  const formattedChange = change !== undefined ? toPersianNumber(Math.abs(change).toFixed(1)) : null;
  
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-glow-gold transition-all duration-300" dir="rtl">
      {/* RTL: Icon on left (which is start in RTL), content on right */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="bg-white/10 p-3 rounded-xl border border-gold/30 flex-shrink-0">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <p className="text-rosary/70 uppercase tracking-wider text-xs font-medium mb-2 font-vazir">
            {title}
          </p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gold via-rosary to-gold bg-clip-text text-transparent font-vazir">
            {value}
          </p>
          {change !== undefined && (
            <p className={`text-sm font-medium mt-1 flex items-center gap-1 ${change >= 0 ? 'text-green-400' : 'text-blood'}`}>
              <span>{change >= 0 ? '▲' : '▼'}</span>
              <span className="font-vazir">{formattedChange}٪</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

