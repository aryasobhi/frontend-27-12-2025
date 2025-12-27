// @ts-nocheck
/*
  Status: SKELETON
  Reason: Finance summary UI uses mock financials and is not connected to accounting backend or ledger contracts.
  Allowed actions: authoring-only
*/

import { Card } from '../ui/card';
import { DollarSign, CreditCard, TrendingUp, AlertCircle, Activity, Briefcase } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const revenueData = [
  { month: 'بهمن', revenue: 1450000, expenses: 980000, profit: 470000 },
  { month: 'اسفند', revenue: 1620000, expenses: 1050000, profit: 570000 },
  { month: 'فروردین', revenue: 1580000, expenses: 1020000, profit: 560000 },
  { month: 'اردیبهشت', revenue: 1810000, expenses: 1150000, profit: 660000 },
  { month: 'خرداد', revenue: 1750000, expenses: 1100000, profit: 650000 },
  { month: 'تیر', revenue: 1980000, expenses: 1250000, profit: 730000 },
];

export function FinanceSummary() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('finance.totalRevenue'), value: '۱.۰۲ م.ت', sub: t('finance.stats.revenueGrowth'), icon: DollarSign, color: 'text-gold' },
          { label: t('finance.totalExpenses'), value: '۶۵۵ ک.ت', sub: t('finance.stats.expenseTrend'), icon: CreditCard, color: 'text-blood' },
          { label: t('finance.netProfit'), value: '۳۶۴ ک.ت', sub: t('finance.stats.profitGrowth'), icon: TrendingUp, color: 'text-green-400' },
          { label: t('finance.overdueInvoices'), value: '۴۲.۵ ک.ت', sub: `${toPersianNumber('۸')} فاکتور`, icon: AlertCircle, color: 'text-blood' },
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

      <Card title={t('finance.charts.revenueVsExpense')}>
        <div className="h-[300px] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10 }} />
              <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f0a0a', border: 'none', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#c59d5f" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="#9a2a2a" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
