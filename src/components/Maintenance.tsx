// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Settings, Wrench, AlertTriangle, CheckCircle, Calendar, TrendingUp, Search, Plus, Activity, Package, Clock, MoreVertical, Eye, Edit, Trash2, CheckSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from './ui/utils';
import { UniversalModuleTemplate } from './layout/UniversalModuleTemplate';
import { ModuleConfig } from '../types/module';
import { useModuleController } from '../hooks/useModuleController';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface MaintenanceTask {
  id: string;
  taskNumber: string;
  equipment: string;
  type: 'preventive' | 'corrective' | 'predictive' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  cost: number;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    taskNumber: 'MNT-2024-1001',
    equipment: 'خط تولید A - تسمه نقاله',
    type: 'preventive',
    priority: 'medium',
    status: 'scheduled',
    scheduledDate: '2025-11-03',
    technician: 'جان مارتینز',
    cost: 850000,
  },
  {
    id: '2',
    taskNumber: 'MNT-2024-1002',
    equipment: 'سیستم سرمایش - واحد ۳',
    type: 'emergency',
    priority: 'critical',
    status: 'in-progress',
    scheduledDate: '2025-11-02',
    technician: 'سارا چن',
    cost: 2500000,
  },
  {
    id: '3',
    taskNumber: 'MNT-2024-1003',
    equipment: 'دستگاه بسته‌بندی B',
    type: 'corrective',
    priority: 'high',
    status: 'completed',
    scheduledDate: '2025-10-30',
    completedDate: '2025-10-31',
    technician: 'مایک دیویس',
    cost: 1200000,
  },
  {
    id: '4',
    taskNumber: 'MNT-2024-1004',
    equipment: 'اسکنر کنترل کیفیت',
    type: 'preventive',
    priority: 'low',
    status: 'overdue',
    scheduledDate: '2025-10-28',
    technician: 'امیلی ویلسون',
    cost: 450000,
  },
];

const equipment = [
  { name: 'خط تولید A', status: 'operational', uptime: 98.5, lastMaintenance: '2025-10-15' },
  { name: 'خط تولید B', status: 'operational', uptime: 96.2, lastMaintenance: '2025-10-20' },
  { name: 'سیستم سرمایش', status: 'maintenance', uptime: 85.0, lastMaintenance: '2025-11-02' },
  { name: 'دستگاه بسته‌بندی A', status: 'operational', uptime: 99.1, lastMaintenance: '2025-10-25' },
  { name: 'دستگاه بسته‌بندی B', status: 'operational', uptime: 94.8, lastMaintenance: '2025-10-31' },
  { name: 'اسکنر کنترل کیفیت', status: 'warning', uptime: 88.5, lastMaintenance: '2025-09-15' },
];

export function Maintenance() {
  const { t } = useTranslation();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preventive': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'corrective': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'predictive': return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      case 'emergency': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-blood/20 text-blood border border-blood/30 font-black';
      case 'high': return 'bg-orange-400/20 text-orange-400 border border-orange-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'low': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'in-progress': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'completed': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'overdue': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'maintenance': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'warning': return 'bg-orange-400/20 text-orange-400 border border-orange-400/30';
      case 'down': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const maintenanceConfig: ModuleConfig = {
    id: 'maintenance',
    title: t('maintenance.title'),
    subtitle: t('maintenance.subtitle'),
    iconName: 'Wrench',
    primaryAction: { label: t('maintenance.scheduleJob'), iconName: 'Calendar' },
    filters: [
      { id: 'status', type: 'select', label: t('table.status'), options: [
        { label: 'زمان‌بندی شده', value: 'scheduled' },
        { label: 'در حال انجام', value: 'in-progress' },
        { label: 'تکمیل شده', value: 'completed' },
        { label: 'معوق', value: 'overdue' },
      ]},
      { id: 'priority', type: 'select', label: t('maintenance.priority'), options: [
        { label: 'بحرانی', value: 'critical' },
        { label: 'بالا', value: 'high' },
        { label: 'متوسط', value: 'medium' },
        { label: 'پایین', value: 'low' },
      ]}
    ],
    columns: [
      { key: 'taskNumber', label: t('maintenance.taskNumber'), type: 'text' },
      { key: 'equipment', label: t('maintenance.equipment'), type: 'text' },
      { key: 'type', label: t('maintenance.type'), type: 'badge' },
      { key: 'priority', label: t('maintenance.priority'), type: 'badge' },
      { key: 'status', label: t('maintenance.status'), type: 'badge' },
      { key: 'cost', label: t('maintenance.cost'), type: 'currency' },
    ],
    formFields: [
      { id: 'equipment', label: t('maintenance.equipment'), type: 'text', colSpan: 1 },
      { id: 'type', label: t('maintenance.type'), type: 'select', colSpan: 1 },
      { id: 'priority', label: t('maintenance.priority'), type: 'select', colSpan: 1 },
      { id: 'technician', label: t('maintenance.technician'), type: 'text', colSpan: 1 },
      { id: 'details', label: 'جزئیات', type: 'textarea', colSpan: 2 },
    ]
  };

  return (
    <UniversalModuleTemplate
      config={maintenanceConfig}
      data={mockTasks}
      renderExtraContent={() => (
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

          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
              <TabsTrigger value="tasks" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('maintenance.tabs.tasks')}</TabsTrigger>
              <TabsTrigger value="equipment" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('maintenance.tabs.equipment')}</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="hidden" />

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
      )}
    />
  );
}
