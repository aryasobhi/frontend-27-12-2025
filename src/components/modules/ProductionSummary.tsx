// @ts-nocheck
/*
  Status: SKELETON
  Reason: Production summary view is a frontend-only dashboard that consumes mock DataContext; not a runtime production module.
  Allowed actions: authoring-only
*/
import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, Box, Activity, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Factory } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function ProductionSummary() {
  const { t } = useTranslation();

  const productionData = [
    { date: 'شنبه', output: 4200, target: 5000, efficiency: 84 },
    { date: 'یکشنبه', output: 4800, target: 5000, efficiency: 96 },
    { date: 'دوشنبه', output: 5100, target: 5000, efficiency: 102 },
    { date: 'سه‌شنبه', output: 4600, target: 5000, efficiency: 92 },
    { date: 'چهارشنبه', output: 5300, target: 5000, efficiency: 106 },
    { date: 'پنجشنبه', output: 3200, target: 4000, efficiency: 80 },
    { date: 'جمعه', output: 2800, target: 3000, efficiency: 93 },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('production.stats.todayOutput'), value: '۴,۸۵۰', unit: t('units.piece'), sub: `${toPersianNumber('۹۷')}٪ از هدف`, icon: Box, color: 'text-gold' },
          { label: t('production.stats.activeOrders'), value: toPersianNumber('۱۲'), sub: 'در حال تولید', icon: Activity, color: 'text-gold' },
          { label: t('production.stats.efficiencyRate'), value: '۹۴.۵٪', sub: `${toPersianNumber('۲.۳')}٪ بیشتر از هفته قبل`, icon: TrendingUp, color: 'text-green-400' },
          { label: t('production.stats.downtime'), value: `۲.۳ ${t('units.hour')}`, sub: 'امروز', icon: Clock, color: 'text-blood' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {kpi.value}
                  {kpi.unit && <span className="text-xs font-vazir text-rosary/40 mr-1">{kpi.unit}</span>}
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

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="performance" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('production.tabs.performance')}</TabsTrigger>
          <TabsTrigger value="lines" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('production.lines')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="خروجی تولید هفتگی" collapsible>
              <div className="h-[300px] w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                    <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f0a0a', border: '1px solid #ffffff10', borderRadius: '12px', color: '#e6d5c5' }} />
                    <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
                    <Bar dataKey="output" fill="#c59d5f" name="خروجی واقعی" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="target" fill="#ffffff05" name="هدف" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="روند بهره‌وری" collapsible>
              <div className="h-[300px] w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                    <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f0a0a', border: '1px solid #ffffff10', borderRadius: '12px', color: '#e6d5c5' }} />
                    <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
                    <Line type="monotone" dataKey="efficiency" stroke="#c59d5f" strokeWidth={3} name="درصد بهره‌وری" dot={{ fill: '#c59d5f', stroke: '#0f0a0a', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lines" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['خط تولید الف', 'خط تولید ب', 'خط تولید ج'].map((line, index) => (
            <Card key={index} className="group hover:border-gold/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-gold tracking-tight mb-2">{line}</h3>
                  <Badge className="bg-green-400/20 text-green-400 border-none rounded-full px-4 font-bold text-[10px] uppercase">عملیاتی</Badge>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                  <Factory className="h-6 w-6 text-gold/40" />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rosary/40 font-bold uppercase tracking-widest">خروجی فعلی</span>
                  <span className="font-mono font-black text-rosary">{toPersianNumber('۱۴۵')} عدد/ساعت</span>
                </div>
                <Button variant="outline" className="w-full mt-4 border-white/5 hover:border-gold/30 text-[10px] font-black uppercase tracking-widest">مشاهده جزئیات</Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
