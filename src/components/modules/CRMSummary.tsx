// @ts-nocheck
/*
  Status: SKELETON
  Reason: CRMSummary is a compositional UI that uses mock data and placeholder tabs; not connected to persistence.
  Allowed actions: authoring-only (UI improvements and mock updates allowed; avoid production wiring)
*/

import React from 'react';
import { Card } from '../ui/card';
import { UserPlus, Target, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface CRMSummaryProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CRMSummary({ activeTab, onTabChange }: CRMSummaryProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('crm.stats.totalLeads'), value: toPersianNumber('۸۷'), sub: `${toPersianNumber('۱۲')} مورد جدید این هفته`, icon: UserPlus, color: 'text-gold' },
          { label: 'مشتریان فعال', value: toPersianNumber('۱۵۶'), sub: `${toPersianNumber('۸')} مورد جدید این ماه`, icon: Target, color: 'text-gold' },
          { label: t('crm.stats.totalValue'), value: '۴۸۶ م.ت', sub: `${toPersianNumber('۱۵')}٪+ نسبت به ماه قبل`, icon: DollarSign, color: 'text-green-400' },
          { label: t('crm.stats.conversionRate'), value: '۳۴.۵٪', sub: `${toPersianNumber('۲.۳')}٪ بهبود`, icon: TrendingUp, color: 'text-gold' },
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

      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="leads" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('crm.stats.newLeads')}</TabsTrigger>
          <TabsTrigger value="customers" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">مشتریان</TabsTrigger>
          <TabsTrigger value="opportunities" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">فرصت‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Target className="h-20 w-20 text-rosary/10 mx-auto mb-6" />
            <p className="text-rosary/30 text-xl font-medium">فرصت‌های فروش</p>
            <p className="text-rosary/20 text-sm mt-3">این بخش به زودی فعال خواهد شد</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
