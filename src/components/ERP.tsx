import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DollarSign, TrendingUp, Package, Users, AlertCircle, CheckCircle, FileText, BarChart3, PieChartIcon, Activity } from 'lucide-react';
import { Progress } from '../ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { cn } from './ui/utils';

const resourceAllocation = [
  { resource: 'مواد اولیه', allocated: 85, available: 15, budget: 125000000, spent: 106250000 },
  { resource: 'نیروی انسانی', allocated: 92, available: 8, budget: 180000000, spent: 165600000 },
  { resource: 'تجهیزات', allocated: 78, available: 22, budget: 95000000, spent: 74100000 },
  { resource: 'انرژی', allocated: 88, available: 12, budget: 45000000, spent: 39600000 },
];

const financialData = [
  { month: 'فروردین', revenue: 450000000, costs: 320000000, profit: 130000000 },
  { month: 'اردیبهشت', revenue: 520000000, costs: 365000000, profit: 155000000 },
  { month: 'خرداد', revenue: 480000000, costs: 340000000, profit: 140000000 },
  { month: 'تیر', revenue: 610000000, costs: 425000000, profit: 185000000 },
  { month: 'مرداد', revenue: 580000000, costs: 405000000, profit: 175000000 },
  { month: 'شهریور', revenue: 670000000, costs: 465000000, profit: 205000000 },
];

const planningData = [
  { week: 'هفته ۱', planned: 12500, actual: 12200 },
  { week: 'هفته ۲', planned: 13000, actual: 13400 },
  { week: 'هفته ۳', planned: 12800, actual: 12600 },
  { week: 'هفته ۴', planned: 14000, actual: 13800 },
];

const projects = [
  { id: '1', name: 'راه‌اندازی خط تولید جدید', status: 'in-progress', progress: 65, budget: 250000000, spent: 162500000, deadline: '2025-12-15' },
  { id: '2', name: 'ارتقا سیستم کیفیت', status: 'in-progress', progress: 42, budget: 85000000, spent: 35700000, deadline: '2025-11-30' },
  { id: '3', name: 'توسعه انبارداری', status: 'planning', progress: 15, budget: 420000000, spent: 63000000, deadline: '2026-03-01' },
  { id: '4', name: 'فاز دوم یکپارچه‌سازی ERP', status: 'completed', progress: 100, budget: 120000000, spent: 118500000, deadline: '2025-10-31' },
];

export function ERP() {
  const { t } = useTranslation();

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('erp.title')}
        subtitle={t('erp.subtitle')}
        action={{
          label: t('erp.generateReport'),
          icon: FileText,
          onClick: () => console.log('Generate Report clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('erp.stats.totalRevenue'), value: '۳.۳۱ میلیارد', sub: '+۱۸.۵٪ نسبت به سال قبل', icon: DollarSign, color: 'text-green-400' },
          { label: t('erp.stats.operatingMargin'), value: '۳۰.۶٪', sub: '+۲.۳٪ بهبود', icon: TrendingUp, color: 'text-gold' },
          { label: t('erp.stats.resourceUtilization'), value: '۸۵.۸٪', sub: 'بازه بهینه', icon: Activity, color: 'text-gold' },
          { label: t('erp.stats.activeProjects'), value: toPersianNumber('۴'), sub: `${toPersianNumber('۲')} مورد نیاز به توجه`, icon: Users, color: 'text-blood' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title={t('erp.charts.financialOverview')} className="lg:col-span-2" collapsible>
          <div className="h-[400px] w-full mt-6">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b0000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tick={{ fill: '#e2d1b7' }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => toPersianNumber((v/1000000).toString()) + 'M'} tick={{ fill: '#e2d1b7' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2d1b7' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="درآمد" />
                  <Area type="monotone" dataKey="costs" stroke="#8b0000" fillOpacity={1} fill="url(#colorCosts)" name="هزینه‌ها" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
          <div className="flex gap-8 mt-8 border-t border-white/5 pt-6">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs font-bold text-rosary/60 font-mono tracking-tighter">درآمد کل: {toPersianNumber('۳.۳۲ میلیارد')}</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blood" />
                <span className="text-xs font-bold text-rosary/60 font-mono tracking-tighter">هزینه کل: {toPersianNumber('۲.۳۱ میلیارد')}</span>
             </div>
          </div>
        </Card>

        <Card title={t('erp.charts.resourceAllocation')} collapsible>
          <div className="space-y-8 mt-6">
            {resourceAllocation.map((resource, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-3">
                   <span className="text-sm font-black text-rose-50/80 tracking-tight">{resource.resource}</span>
                   <span className="text-xs font-black font-mono text-gold">{toPersianNumber(resource.allocated.toString())}٪</span>
                </div>
                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <div 
                     className={cn(
                       "h-full transition-all duration-1000",
                       resource.allocated >= 90 ? 'bg-blood shadow-glow-blood' : resource.allocated >= 80 ? 'bg-gold shadow-glow-gold' : 'bg-green-400 shadow-glow-green'
                     )}
                     style={{ width: `${resource.allocated}%` }}
                   />
                </div>
                <div className="flex justify-between text-[10px] text-rosary/30 font-bold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span>بودجه: {toPersianNumber((resource.budget/1000000).toString())} م.ت</span>
                   <span>هزینه: {toPersianNumber((resource.spent/1000000).toString())} م.ت</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-12 border-t border-white/5 rounded-none text-[10px] font-black uppercase tracking-widest text-gold/40 hover:text-gold hover:bg-white/5 h-12">
             مشاهده جزئیات منابع
          </Button>
        </Card>
      </div>

      <Card title={t('erp.projects.activeProjects')} collapsible>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {projects.map((project) => (
            <Card key={project.id} className="group bg-white/2 border-white/5 hover:bg-white/5 transition-all">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <Badge className={cn(
                    "rounded-full px-4 border-none text-[8px] font-black uppercase tracking-tighter",
                    project.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                    project.status === 'in-progress' ? 'bg-blue-400/20 text-blue-400' :
                    'bg-rosary/10 text-rosary/40'
                  )}>
                    {t(`status.${project.status === 'in-progress' ? 'inprogress' : project.status}`)}
                  </Badge>
                  <div className="text-[10px] font-mono font-black text-rosary/30">
                     {toPersianNumber(new Date(project.deadline).toLocaleDateString('fa-IR'))}
                  </div>
                </div>

                <h4 className="text-sm font-black text-gold tracking-tight mb-6 leading-relaxed h-10 overflow-hidden">{project.name}</h4>

                <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-rosary/40">
                    <span>پیشرفت</span>
                    <span className="font-mono text-rosary/80">{toPersianNumber(project.progress.toString())}٪</span>
                  </div>
                  <Progress value={project.progress} className="h-1 bg-white/5" />
                  <div className="flex justify-between text-[8px] text-rosary/20 font-bold uppercase tracking-tighter">
                    <span>{toPersianNumber(formatPersianCurrency(project.budget))}</span>
                    <span className="text-rosary/40">{Math.round((project.spent / project.budget) * 100)}٪ مصرف شده</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
