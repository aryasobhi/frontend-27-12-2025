// @ts-nocheck
/*
  Status: SKELETON
  Reason: QC summary UI is implemented as a frontend view with mock data; not wired to QC sampling/CoA contracts.
  Allowed actions: authoring-only
*/

import { Card } from '../ui/card';
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const qualityMetrics = [
  { name: 'پاس شده', value: 156, color: '#10b981' },
  { name: 'رد شده', value: 8, color: '#ef4444' },
  { name: 'در انتظار', value: 12, color: '#f59e0b' },
];

const defectTypes = [
  { type: 'بسته‌بندی', count: 15 },
  { type: 'اختلاف وزن', count: 8 },
  { type: 'آلودگی', count: 3 },
  { type: 'رنگ/بافت', count: 12 },
  { type: 'برچسب‌گذاری', count: 6 },
];

export function QCSummary() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('qc.passRate'), value: '۹۵.۲٪', sub: '+۱.۲٪ نسبت به ماه قبل', icon: CheckCircle, color: 'text-green-400' },
          { label: t('qc.failedBatches'), value: toPersianNumber('۸'), sub: 'این ماه', icon: XCircle, color: 'text-blood' },
          { label: t('qc.pendingInspections'), value: toPersianNumber('۱۲'), sub: 'در انتظار بررسی', icon: AlertCircle, color: 'text-gold' },
          { label: t('qc.avgQualityScore'), value: toPersianNumber('۹۴.۷'), sub: 'عالی', icon: TrendingUp, color: 'text-green-400' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {kpi.value}
                </div>
                <p className="text-xs text-rosary/40 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={t('qc.inspectionResults')}>
          <div className="h-[250px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={qualityMetrics} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {qualityMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px' }} />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('qc.defectDistribution')}>
          <div className="h-[250px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={defectTypes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b0000" radius={[0, 4, 4, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
