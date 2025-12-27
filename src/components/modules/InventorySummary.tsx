// @ts-nocheck
/*
  Status: SKELETON
  Reason: Inventory summary view is present but tied to frontend mock data and DataContext rather than an independent module contract.
  Allowed actions: authoring-only
*/
import React from 'react';
import { Card } from '../ui/card';
import { Package, TrendingDown, AlertTriangle, Warehouse } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface InventorySummaryProps {
  inventory: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function InventorySummary({ inventory, activeTab, onTabChange }: InventorySummaryProps) {
  const { t } = useTranslation();

  const getItemStatus = (item: any): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const lowStockCount = inventory.filter(item => getItemStatus(item) === 'low-stock').length;
  const outOfStockCount = inventory.filter(item => getItemStatus(item) === 'out-of-stock').length;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'کل اقلام', value: toPersianNumber(inventory.length), sub: 'کد کالا های ردیابی شده', icon: Package, color: 'text-gold' },
          { label: 'اقلام با موجودی کم', value: toPersianNumber(lowStockCount), sub: 'نیاز به سفارش مجدد', icon: TrendingDown, color: 'text-yellow-400' },
          { label: 'اتمام موجودی', value: toPersianNumber(outOfStockCount), sub: 'اقدام فوری', icon: AlertTriangle, color: 'text-blood' },
          { label: 'انبارها', value: toPersianNumber(new Set(inventory.map(i => i.location)).size), sub: 'محل های فعال', icon: Warehouse, color: 'text-green-400' },
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
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex-wrap h-auto">
          <TabsTrigger value="all" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('common.all')}</TabsTrigger>
          <TabsTrigger value="Raw Materials" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">مواد اولیه</TabsTrigger>
          <TabsTrigger value="Packaging" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">بسته‌بندی</TabsTrigger>
          <TabsTrigger value="Finished Goods" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">کالای نهایی</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
