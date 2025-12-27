import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Settings, Plus, Activity, AlertTriangle, CheckCircle, Search, MapPin, Wrench, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { cn } from './ui/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Machine {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  uptime: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  currentJob?: string;
  manufacturer: string;
  installDate: string;
}

const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'خط تولید الف - نوار نقاله اصلی',
    code: 'MCH-001',
    type: 'سیستم نقاله',
    location: 'سالن تولید الف',
    status: 'operational',
    uptime: 98.5,
    efficiency: 96.2,
    lastMaintenance: '2025-10-15',
    nextMaintenance: '2025-12-15',
    currentJob: 'PRD-1001 - سس گوجه‌فرنگی ارگانیک',
    manufacturer: 'TechFlow Industries',
    installDate: '2022-03-10',
  },
  {
    id: '2',
    name: 'دستگاه بسته‌بندی الف',
    code: 'MCH-002',
    type: 'تجهیزات بسته‌بندی',
    location: 'بخش بسته‌بندی',
    status: 'operational',
    uptime: 99.1,
    efficiency: 98.5,
    lastMaintenance: '2025-10-25',
    nextMaintenance: '2026-01-25',
    currentJob: 'PRD-1002 - نان گندم کامل',
    manufacturer: 'PackTech Solutions',
    installDate: '2021-06-15',
  },
  {
    id: '3',
    name: 'واحد فر صنعتی ۱',
    code: 'MCH-003',
    type: 'تجهیزات حرارتی',
    location: 'سالن تولید ب',
    status: 'maintenance',
    uptime: 85.0,
    efficiency: 88.0,
    lastMaintenance: '2025-11-02',
    nextMaintenance: '2025-11-05',
    manufacturer: 'HeatMaster Co.',
    installDate: '2020-09-20',
  },
  {
    id: '4',
    name: 'اسکنر کنترل کیفیت',
    code: 'MCH-004',
    type: 'تجهیزات بازرسی',
    location: 'بخش کنترل کیفیت',
    status: 'error',
    uptime: 78.5,
    efficiency: 82.0,
    lastMaintenance: '2025-09-15',
    nextMaintenance: '2025-11-15',
    manufacturer: 'VisionTech Systems',
    installDate: '2023-02-05',
  },
  {
    id: '5',
    name: 'واحد سیستم سرمایش ۲',
    code: 'MCH-005',
    type: 'سیستم تهویه',
    location: 'بخش انبار',
    status: 'idle',
    uptime: 95.0,
    efficiency: 92.0,
    lastMaintenance: '2025-10-10',
    nextMaintenance: '2026-01-10',
    manufacturer: 'CoolTech Industries',
    installDate: '2022-11-30',
  },
  {
    id: '6',
    name: 'دستگاه پرکن ب',
    code: 'MCH-006',
    type: 'تجهیزات پرکن',
    location: 'سالن تولید الف',
    status: 'operational',
    uptime: 97.2,
    efficiency: 95.8,
    lastMaintenance: '2025-10-20',
    nextMaintenance: '2025-12-20',
    currentJob: 'PRD-1004 - روغن زیتون ممتاز',
    manufacturer: 'FlowMatic Corp',
    installDate: '2021-08-12',
  },
];

export function Machines() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'maintenance': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'idle': return 'bg-white/10 text-rosary/60 border border-white/20';
      case 'error': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-white/10 text-rosary/60 border border-white/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-5 w-5" />;
      case 'maintenance': return <Settings className="h-5 w-5" />;
      case 'idle': return <Activity className="h-5 w-5" />;
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  const operationalMachines = mockMachines.filter(m => m.status === 'operational').length;
  const avgUptime = (mockMachines.reduce((acc, m) => acc + m.uptime, 0) / mockMachines.length).toFixed(1);
  const avgEfficiency = (mockMachines.reduce((acc, m) => acc + m.efficiency, 0) / mockMachines.length).toFixed(1);

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('machines.title')}
        subtitle={t('machines.subtitle')}
        action={{
          label: t('machines.addMachine'),
          icon: Plus,
          onClick: () => console.log('Add Machine clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('machines.title'), value: mockMachines.length, sub: `${toPersianNumber(operationalMachines)} ${t('machines.status.operational')}`, icon: Settings, color: 'text-gold' },
          { label: t('machines.stats.avgUptime'), value: `${toPersianNumber(avgUptime)}٪`, sub: t('machines.stats.excellent'), icon: Activity, color: 'text-green-400' },
          { label: t('machines.stats.avgEfficiency'), value: `${toPersianNumber(avgEfficiency)}٪`, sub: t('machines.stats.aboveTarget'), icon: CheckCircle, color: 'text-gold' },
          { label: t('machines.stats.needsAttention'), value: 2, sub: t('machines.stats.issuesFound'), icon: AlertTriangle, color: 'text-blood' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
             <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {typeof kpi.value === 'number' ? toPersianNumber(kpi.value) : kpi.value}
                </div>
                <p className="text-xs text-rosary/40 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500",
                idx === 3 ? "bg-blood/10 border-blood/20 text-blood group-hover:shadow-glow-red" : "bg-white/5 border-white/10 text-gold/40 group-hover:text-gold group-hover:shadow-glow-gold"
              )}>
                <kpi.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <FilterBar 
        onSearch={setSearchTerm} 
        searchPlaceholder={t('common.search')}
      >
        <div className="space-y-2">
          <label className="text-xs font-bold text-rosary/40 mr-1">نوع دستگاه</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg">
              <SelectValue placeholder="همه انواع" />
            </SelectTrigger>
            <SelectContent className="bg-damask border-white/10 text-rosary">
              <SelectItem value="all">همه انواع</SelectItem>
              <SelectItem value="conveyor">سیستم نقاله</SelectItem>
              <SelectItem value="packaging">تجهیزات بسته‌بندی</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-rosary/40 mr-1">وضعیت</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg">
              <SelectValue placeholder="همه وضعیت‌ها" />
            </SelectTrigger>
            <SelectContent className="bg-damask border-white/10 text-rosary">
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="operational">فعال</SelectItem>
              <SelectItem value="maintenance">درحال تعمیر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FilterBar>

      {/* Machine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMachines.filter(m => m.name.includes(searchTerm)).map((machine) => (
          <Card key={machine.id} className="group hover:border-gold/30">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                  machine.status === 'operational' ? 'bg-green-400/10 text-green-400' : 
                  machine.status === 'error' ? 'bg-blood/10 text-blood' : 'bg-gold/10 text-gold'
                )}>
                  {getStatusIcon(machine.status)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-rosary group-hover:text-gold transition-colors">{machine.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="border-white/10 text-rosary/40 font-mono text-[10px] tracking-widest">{machine.code}</Badge>
                    <Badge className={cn(getStatusColor(machine.status), "rounded-full px-3 text-[10px] border-none font-bold")}>
                      {t(`machines.status.${machine.status}`)}
                    </Badge>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-white/5 h-8 w-8">
                    <MoreVertical className="h-4 w-4 text-rosary/30" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                  <DropdownMenuItem onClick={() => console.log('Edit machine', machine.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                    <Edit className="ml-2 h-4 w-4 text-gold" />
                    <span className="font-bold text-xs">{t('common.edit')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Delete machine', machine.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                    <Trash2 className="ml-2 h-4 w-4" />
                    <span className="font-bold text-xs">{t('common.delete')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-rosary/40 font-bold uppercase mb-1 flex items-center gap-1">
                    <Settings className="h-3 w-3" /> {t('machines.type')}
                  </p>
                  <p className="text-xs font-bold text-rosary/80">{machine.type}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-rosary/40 font-bold uppercase mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {t('machines.location')}
                  </p>
                  <p className="text-xs font-bold text-rosary/80">{machine.location}</p>
                </div>
              </div>
              
              {machine.currentJob && (
                <div className="p-3 bg-gold/5 rounded-xl border border-gold/10">
                  <p className="text-[10px] text-gold/60 font-black uppercase mb-1">{t('production.notes')}</p>
                  <p className="text-[11px] font-bold text-rosary leading-relaxed truncate">{machine.currentJob}</p>
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-2 font-black uppercase tracking-widest">
                    <span className="text-rosary/40">{t('machines.efficiency')}</span>
                    <span className={cn(
                      "font-mono",
                      machine.uptime >= 95 ? 'text-green-400' : 'text-gold'
                    )}>{toPersianNumber(machine.uptime)}٪</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        machine.uptime >= 95 ? 'bg-green-500 shadow-glow-success' : 'bg-gold shadow-glow-gold'
                      )}
                      style={{ width: `${machine.uptime}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] mb-2 font-black uppercase tracking-widest">
                    <span className="text-rosary/40">{t('machines.efficiency')}</span>
                    <span className={cn(
                      "font-mono",
                      machine.efficiency >= 95 ? 'text-green-400' : 'text-gold'
                    )}>{toPersianNumber(machine.efficiency)}٪</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        machine.efficiency >= 95 ? 'bg-green-500 shadow-glow-success' : 'bg-gold shadow-glow-gold'
                      )}
                      style={{ width: `${machine.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-rosary/40 uppercase mb-1 flex items-center gap-1"><Wrench className="h-3 w-3" /> {t('machines.lastMaintenance')}</p>
                  <p className="text-[11px] font-mono text-rosary/60">{toPersianNumber(new Date(machine.lastMaintenance).toLocaleDateString('fa-IR'))}</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-rosary/40 uppercase mb-1">{t('machines.nextMaintenance')}</p>
                  <p className="text-[11px] font-mono text-gold">{toPersianNumber(new Date(machine.nextMaintenance).toLocaleDateString('fa-IR'))}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" size="sm" className="flex-1 rounded-lg border-white/5 group-hover:border-gold/30">
                {t('common.details')}
              </Button>
              <Button variant="blood" size="sm" className="flex-1 rounded-lg">
                {t('machines.tabs.maintenance')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
