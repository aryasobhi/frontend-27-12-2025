// @ts-nocheck
import { Card } from '../ui/card';
import { Users, Calendar, Clock, DollarSign } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';

/*
  Status: SKELETON
  Reason: HR summary UI uses mock data and DataContext; not a runtime module implementation.
  Allowed actions: authoring-only
*/

export function HRSummary() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('employees.stats.totalEmployees'), value: 105, sub: '+۸ در این فصل', icon: Users, color: 'text-gold' },
          { label: t('employees.stats.attendanceRate'), value: '96.8٪', sub: 'بیش از هدف', icon: Calendar, color: 'text-green-400' },
          { label: t('employees.stats.avgWorkingHours'), value: toPersianNumber(42.5), unit: t('units.hour'), sub: 'در هفته', icon: Clock, color: 'text-gold' },
          { label: t('employees.stats.payroll'), value: toPersianNumber(458), unit: `م.ت`, sub: 'هزینه کل', icon: DollarSign, color: 'text-gold' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {typeof kpi.value === 'number' ? toPersianNumber(kpi.value.toString()) : kpi.value}
                  {kpi.unit && <span className="text-xs font-vazir text-rosary/40 mr-1">{kpi.unit}</span>}
                </div>
                <p className="text-xs text-green-400 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
