// @ts-nocheck
/*
  Status: SKELETON
  Reason: Module UI present but functions as a summary view tied to in-memory DataContext rather than a pluggable runtime module.
  Allowed actions: authoring-only
*/

import React from 'react';
import { Card } from '../ui/card';
import { Settings, TrendingUp, Wrench, AlertTriangle } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';

export function MaintenanceSummary() {
  const { t } = useTranslation();

  const equipment = [
    { name: 'خط تولید A', status: 'operational', uptime: 98.5, lastMaintenance: '2025-10-15' },
    { name: 'خط تولید B', status: 'operational', uptime: 96.2, lastMaintenance: '2025-10-20' },
    { name: 'سیستم سرمایش', status: 'maintenance', uptime: 85.0, lastMaintenance: '2025-11-02' },
    { name: 'دستگاه بسته‌بندی A', status: 'operational', uptime: 99.1, lastMaintenance: '2025-10-25' },
    { name: 'دستگاه بسته‌بندی B', status: 'operational', uptime: 94.8, lastMaintenance: '2025-10-31' },
    { name: 'اسکنر کنترل کیفیت', status: 'warning', uptime: 88.5, lastMaintenance: '2025-09-15' },
  ];

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'maintenance': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'warning': return 'bg-orange-400/20 text-orange-400 border border-orange-400/30';
      case 'down': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('maintenance.totalEquipment'), value: toPersianNumber('۴۸'), sub: `${toPersianNumber('۴۵')} مورد فعال`, icon: Settings, color: 'text-gold' },
          { label: t('maintenance.avgUptime'), value: '۹۶.۳٪', sub: '+۱.۲٪ بهبود', icon: TrendingUp, color: 'text-green-400' },
          { label: t('maintenance.activeTasks'), value: toPersianNumber('۱۵'), sub: `${toPersianNumber('۳')} مورد معوق`, icon: Wrench, color: 'text-gold' },
          { label: t('maintenance.totalCost'), value: '۱۲.۵ م.ت', sub: 'این ماه', icon: AlertTriangle, color: 'text-blood' },
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

      <Tabs defaultValue="equipment" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="tasks" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('maintenance.tabs.tasks')}</TabsTrigger>
          <TabsTrigger value="equipment" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('maintenance.tabs.equipment')}</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="p-12 text-center text-rosary/20">
           <Wrench className="h-12 w-12 mx-auto mb-4 opacity-10" />
           <p>لیست دستور کارها در جدول زیر نمایش داده می‌شود.</p>
        </TabsContent>

        <TabsContent value="equipment" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((item, index) => (
              <Card key={index} className="group">
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                         <Settings className="h-6 w-6 text-gold/40 group-hover:text-gold" />
                      </div>
                      <div>
                         <h3 className="font-black text-gold tracking-tight">{item.name}</h3>
                         <Badge className={cn(getEquipmentStatusColor(item.status), "rounded-full px-3 border-none text-[10px] font-bold mt-1")}>
                            {t(`status.${item.status}`)}
                         </Badge>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">آپتایم</p>
                      <p className={cn(
                        "text-xl font-black font-mono",
                        item.uptime >= 95 ? 'text-green-400' : item.uptime >= 85 ? 'text-yellow-400' : 'text-blood'
                      )}>
                        {toPersianNumber(item.uptime.toString())}٪
                      </p>
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                         <div 
                           className={cn(
                             "h-full transition-all duration-1000",
                             item.uptime >= 95 ? 'bg-green-400 shadow-glow-green' : item.uptime >= 85 ? 'bg-yellow-400 shadow-glow-gold' : 'bg-blood shadow-glow-blood'
                           )}
                           style={{ width: `${item.uptime}%` }}
                         />
                      </div>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-rosary/40">
                      <span>آخرین سرویس</span>
                      <span className="text-rosary/60 font-mono">{toPersianNumber(new Date(item.lastMaintenance).toLocaleDateString('fa-IR'))}</span>
                   </div>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
