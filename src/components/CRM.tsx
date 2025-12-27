// @ts-nocheck
/*
  Status: SKELETON
  Reason: CRM UI is present as placeholder/authoring surfaces but many features are disconnected from persistence and rely on mocks.
  Allowed actions: authoring-only (UI-visible but not for production runtime)
*/

import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, UserPlus, Target, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { UniversalModuleTemplate } from './layout/UniversalModuleTemplate';
import { ModuleConfig } from '../types/module';
import { cn } from './ui/utils';

export function CRM() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('leads');

  const leadsConfig: ModuleConfig = {
    id: 'leads',
    title: t('crm.title'),
    subtitle: t('crm.subtitle'),
    iconName: 'UserPlus',
    primaryAction: { label: t('crm.addLead'), iconName: 'Plus' },
    filters: [
      { id: 'status', type: 'select', label: 'وضعیت', options: [
        { label: 'جدید', value: 'new' },
        { label: 'تماس گرفته شده', value: 'contacted' },
        { label: 'واجد شرایط', value: 'qualified' },
      ]},
      { id: 'source', type: 'select', label: 'منبع', options: [
        { label: 'وب‌سایت', value: 'Website' },
        { label: 'معرفی', value: 'Referral' },
      ]}
    ],
    columns: [
      { key: 'name', label: t('crm.leadName'), type: 'text' },
      { key: 'company', label: t('crm.company'), type: 'text' },
      { key: 'value', label: t('crm.value'), type: 'currency' },
      { key: 'displayStatus', label: 'مرحله', type: 'badge' },
      { key: 'date', label: 'تاریخ', type: 'text' },
    ],
    formFields: [
      { id: 'name', label: t('crm.leadName'), type: 'text', colSpan: 1 },
      { id: 'company', label: t('crm.company'), type: 'text', colSpan: 1 },
      { id: 'email', label: 'ایمیل', type: 'text', colSpan: 1 },
      { id: 'phone', label: 'تلفن', type: 'text', colSpan: 1 },
      { id: 'value', label: t('crm.value'), type: 'number', colSpan: 1 },
      { id: 'source', label: 'منبع', type: 'select', colSpan: 1 },
      { id: 'notes', label: 'یادداشت‌ها', type: 'textarea', colSpan: 2 },
    ]
  };

  const customersConfig: ModuleConfig = {
    id: 'customers',
    title: 'بانک مشتریان',
    iconName: 'Target',
    primaryAction: { label: 'مشتری جدید', iconName: 'Plus' },
    filters: [
      { id: 'segment', type: 'select', label: 'بخش', options: [
        { label: 'سازمانی', value: 'enterprise' },
        { label: 'متوسط', value: 'mid-market' },
      ]}
    ],
    columns: [
      { key: 'name', label: 'نام مشتری', type: 'text' },
      { key: 'totalOrders', label: 'سفارشات', type: 'text' },
      { key: 'totalRevenue', label: 'درآمد کل', type: 'currency' },
      { key: 'displayStatus', label: 'وضعیت', type: 'badge' },
    ],
    formFields: [
      { id: 'name', label: 'نام مشتری', type: 'text', colSpan: 2 },
      { id: 'segment', label: 'بخش بازار', type: 'select', colSpan: 1 },
      { id: 'status', label: 'وضعیت', type: 'select', colSpan: 1 },
      { id: 'address', label: 'آدرس دفتر مرکزی', type: 'textarea', colSpan: 2 },
    ]
  };

  const mockLeads = [
    { id: '1', name: 'جان اسمیت', company: 'بازارهای مواد غذایی مترو', value: 45000000, status: 'qualified', displayStatus: 'واجد شرایط', date: '2025-11-01' },
    { id: '2', name: 'امیلی چن', company: 'بنیاد خواربارفروشی تازه', value: 67000000, status: 'proposal', displayStatus: 'پیشنهاد', date: '2025-10-28' },
  ];

  const mockCustomers = [
    { id: '1', name: 'توزیع‌کنندگان دره سبز', totalOrders: 245, totalRevenue: 125000000, status: 'active', displayStatus: 'فعال' },
    { id: '2', name: 'شرکت بازار تازه', totalOrders: 189, totalRevenue: 98500000, status: 'active', displayStatus: 'فعال' },
  ];

  return (
    <UniversalModuleTemplate
      config={activeTab === 'leads' ? leadsConfig : customersConfig}
      data={activeTab === 'leads' ? mockLeads : mockCustomers}
      renderMainContent={(controller) => (
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
      )}
    />
  );
}
