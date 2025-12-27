/*
  Status: SKELETON
  Reason: Project summary UI exists but relies on frontend-only mocks and is not registered as a runtime module.
  Allowed actions: authoring-only
*/

import { Card } from '../ui/card';
import { Briefcase, TrendingUp, Activity, Calendar, MoreVertical, Eye, Edit, Trash2, Clock, Users } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const mockProjects = [
  {
    id: '1',
    name: 'توسعه خط تولید نان پزی',
    code: 'PROJ-2024-001',
    type: 'Infrastructure',
    status: 'active',
    priority: 'high',
    progress: 65,
    budget: 500000,
    spent: 325000,
    startDate: '2024-09-01',
    endDate: '2025-02-28',
    team: ['جان اسمیت', 'سارا چن', 'مایک دیویس', 'امیلی ویلسون'],
    tasks: 45,
    completedTasks: 29,
    description: 'گسترش ظرفیت تولید با خط اتوماتیک جدید',
  },
  {
    id: '2',
    name: 'مدرن سازی خط بسته‌بندی',
    code: 'PROJ-2024-002',
    type: 'Product Development',
    status: 'active',
    priority: 'medium',
    progress: 40,
    budget: 250000,
    spent: 95000,
    startDate: '2024-10-15',
    endDate: '2025-04-30',
    team: ['رابرت تیلور', 'اما براون', 'دیوید لی'],
    tasks: 32,
    completedTasks: 13,
    description: 'مدرن سازی بسته‌بندی موجود و فرمولاسیون‌ها',
  }
];

export function ProjectSummary() {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'on-hold': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'completed': return 'bg-rosary/10 text-rosary/40 border border-rosary/10';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('projects.totalProjects'), value: toPersianNumber('۵'), sub: `۳ ${t('status.active')}`, icon: Briefcase, color: 'text-gold' },
          { label: t('projects.totalBudget'), value: toPersianNumber('۸۲۵ ک'), unit: t('units.toman'), sub: t('projects.allocated'), icon: TrendingUp, color: 'text-gold' },
          { label: t('projects.totalSpent'), value: toPersianNumber('۴۲۰ ک'), sub: `۵۱٪ ${t('projects.used')}`, icon: Activity, color: 'text-blood' },
          { label: t('projects.completionRate'), value: '۶۸٪', sub: t('projects.onTrack'), icon: Calendar, color: 'text-green-400' },
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

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="active" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('projects.activeProjects')}</TabsTrigger>
          <TabsTrigger value="timeline" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('projects.timeline')}</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="group hover:border-gold/20 overflow-visible">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-black text-gold tracking-tighter">{project.name}</h3>
                    <Badge variant="outline" className="border-white/10 text-rosary/35 font-mono text-[10px] uppercase tracking-widest">{project.code}</Badge>
                    <Badge className={cn(getStatusColor(project.status), "rounded-full px-4 border-none font-bold text-[10px]")}>
                      {t(`status.${project.status}`)}
                    </Badge>
                  </div>
                  <p className="text-sm text-rosary/60 font-medium leading-relaxed max-w-2xl">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-white/5 h-8 w-8">
                      <MoreVertical className="h-5 w-5 text-rosary/30" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                    <DropdownMenuItem className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                      <Eye className="ml-2 h-4 w-4 text-gold/40" />
                      <span className="font-bold text-xs">{t('common.details')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                       <Edit className="ml-2 h-4 w-4 text-gold" />
                       <span className="font-bold text-xs">{t('common.edit')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-rosary/40">
                    <span>{t('projects.progress')}</span>
                    <span className="font-mono text-gold text-sm">{toPersianNumber(project.progress)}٪</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gold shadow-glow-gold transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-rosary/30 font-bold text-right">
                    {toPersianNumber(project.completedTasks)} / {toPersianNumber(project.tasks)} {t('projects.tasksCompleted')}
                  </p>
                </div>

                <div className="space-y-4 border-r border-white/5 pr-8">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-rosary/40">
                    <span>{t('projects.budget')}</span>
                    <span className="font-mono text-blood text-sm">{toPersianNumber(((project.spent / project.budget) * 100).toFixed(0))}٪</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-blood shadow-glow-blood transition-all duration-1000"
                      style={{ width: `${(project.spent / project.budget) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-rosary/30 font-bold text-right">
                    {toPersianNumber(project.spent.toLocaleString())} / {toPersianNumber(project.budget.toLocaleString())} {t('units.toman')}
                  </p>
                </div>

                <div className="border-r border-white/5 pr-8 flex flex-col justify-end pb-1">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-rosary/40">{t('projects.team')}</span>
                     <div className="flex -space-x-2 space-x-reverse">
                        {project.team.map((m, i) => (
                           <div key={i} className="w-7 h-7 rounded-full border-2 border-damask bg-gold/10 flex items-center justify-center text-[9px] font-black text-gold">
                             {m.split(' ').map(n=>n[0]).join('')}
                           </div>
                        ))}
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px] border-white/5 hover:border-gold/30">
                       {t('projects.tasks')}
                     </Button>
                     <Button className="flex-1 h-8 text-[10px] bg-blood hover:bg-blood/80">
                       {t('common.details')}
                     </Button>
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="timeline">
            <Card title={t('projects.timeline')} className="min-h-[300px] flex items-center justify-center border-dashed border-white/10">
               <div className="text-center">
                  <Calendar className="h-12 w-12 text-rosary/10 mx-auto mb-4" />
                  <p className="text-rosary/30 text-sm font-medium">{t('projects.timelineDesc')}</p>
                  <Button variant="outline" size="sm" className="mt-6 border-white/5 text-rosary/40">مشاهده نمودار گانت</Button>
               </div>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
