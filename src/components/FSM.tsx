import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Wrench, MapPin, User, Clock, CheckCircle, Calendar, Filter, Search, Plus, MoreVertical, Activity, Phone, Mail, Eye, Edit, Trash2, CheckSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';

interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customer: string;
  location: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  technician: string;
  scheduledDate: string;
  description: string;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'on-job' | 'off-duty';
  activeJobs: number;
  completedToday: number;
  location: string;
}

const mockTickets: ServiceTicket[] = [
  {
    id: '1',
    ticketNumber: 'FSM-2001',
    customer: 'توزیع‌کنندگان دره سبز',
    location: 'تهران، ایران',
    type: 'نصب تجهیزات',
    priority: 'high',
    status: 'in-progress',
    technician: 'جان مارتینز',
    scheduledDate: '2025-11-02',
    description: 'نصب واحد تبرید جدید',
  },
  {
    id: '2',
    ticketNumber: 'FSM-2002',
    customer: 'شرکت بازار تازه',
    location: 'اصفهان، ایران',
    type: 'نگهداری پیشگیرانه',
    priority: 'medium',
    status: 'scheduled',
    technician: 'سارا چن',
    scheduledDate: '2025-11-03',
    description: 'بازرسی دوره‌ای تجهیزات',
  },
  {
    id: '3',
    ticketNumber: 'FSM-2003',
    customer: 'غذاهای ارگانیک با مسئولیت محدود',
    location: 'شیراز، ایران',
    type: 'سرویس تعمیرات',
    priority: 'urgent',
    status: 'scheduled',
    technician: 'مایک دیویس',
    scheduledDate: '2025-11-02',
    description: 'تعمیر اضطراری سیستم خنک‌کننده',
  },
];

const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'جان مارتینز',
    email: 'john.m@foodpro.com',
    phone: '+98 912 111 2222',
    status: 'on-job',
    activeJobs: 1,
    completedToday: 2,
    location: 'تهران، ایران',
  },
  {
    id: '2',
    name: 'سارا چن',
    email: 'sarah.c@foodpro.com',
    phone: '+98 912 222 3333',
    status: 'available',
    activeJobs: 0,
    completedToday: 3,
    location: 'اصفهان، ایران',
  },
  {
    id: '3',
    name: 'مایک دیویس',
    email: 'mike.d@foodpro.com',
    phone: '+98 912 333 4444',
    status: 'on-job',
    activeJobs: 1,
    completedToday: 1,
    location: 'شیراز، ایران',
  },
];

export function FSM() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-blood/20 text-blood border border-blood/30 font-black';
      case 'high': return 'bg-orange-400/20 text-orange-400 border border-orange-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'low': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'in-progress': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'scheduled': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'cancelled': return 'bg-rosary/10 text-rosary/40 border border-rosary/10';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const getTechStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'on-job': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'off-duty': return 'bg-rosary/10 text-rosary/40 border border-rosary/10';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('fsm.title')}
        subtitle={t('fsm.subtitle')}
        action={{
          label: t('fsm.scheduleService'),
          icon: Calendar,
          onClick: () => console.log('Schedule Service clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('fsm.openTickets'), value: toPersianNumber('۳۴'), sub: `${toPersianNumber('۵')} مورد فوری`, icon: Wrench, color: 'text-gold' },
          { label: t('fsm.activeTechnicians'), value: `${toPersianNumber('۱۲')}/${toPersianNumber('۱۸')}`, sub: 'در حال عملیات', icon: User, color: 'text-gold' },
          { label: t('fsm.avgResponseTime'), value: `${toPersianNumber('۲.۳')} ساعت`, sub: `${toPersianNumber('۱۵')} دقیقه بهبود`, icon: Clock, color: 'text-green-400' },
          { label: t('fsm.completionRate'), value: '۹۶.۵٪', sub: 'فیکس در اولین مراجعه', icon: CheckCircle, color: 'text-gold' },
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

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="tickets" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('fsm.tabs.tickets')}</TabsTrigger>
          <TabsTrigger value="technicians" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('fsm.tabs.technicians')}</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('fsm.tabs.schedule')}</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-8">
          <Card title={t('fsm.tabs.tickets')} collapsible>
            <FilterBar 
              onSearch={setSearchTerm} 
              searchPlaceholder={t('common.search')}
              className="mb-6 !p-0 border-none bg-transparent"
            />

            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('fsm.ticketNumber')}</TableHead>
                  <TableHead>{t('fsm.customer')}</TableHead>
                  <TableHead>{t('fsm.location')}</TableHead>
                  <TableHead>{t('fsm.priority')}</TableHead>
                  <TableHead>{t('fsm.status')}</TableHead>
                  <TableHead>{t('fsm.technician')}</TableHead>
                  <TableHead className="text-left">{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.filter(t => t.ticketNumber.includes(searchTerm) || t.customer.includes(searchTerm)).map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(ticket.ticketNumber)}</span>
                    </TableCell>
                    <TableCell>
                       <div className="font-bold">{ticket.customer}</div>
                       <div className="text-[10px] text-rosary/30">{ticket.type}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-[10px] text-rosary/40">
                         <MapPin className="h-3 w-3" />
                         {ticket.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getPriorityColor(ticket.priority), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                        {t(`priority.${ticket.priority}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(ticket.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                        {t(`status.${ticket.status.replace('-', '')}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold text-[10px] font-black group-hover:shadow-glow-gold transition-all duration-300">
                             {ticket.technician.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs font-bold">{ticket.technician}</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-white/5 h-8 w-8 text-gold">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                            <DropdownMenuItem onClick={() => console.log('View ticket', ticket.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                              <Eye className="ml-2 h-4 w-4 text-gold/40" />
                              <span className="font-bold text-xs">{t('common.view')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Edit ticket', ticket.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                              <Edit className="ml-2 h-4 w-4 text-gold" />
                              <span className="font-bold text-xs">{t('common.edit')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Complete ticket', ticket.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                              <CheckSquare className="ml-2 h-4 w-4 text-green-400/40" />
                              <span className="font-bold text-xs">{t('status.completed')}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTechnicians.map((tech) => (
              <Card key={tech.id} className="group">
                <div className="flex items-start justify-between mb-8">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                      <User className="h-8 w-8 text-gold/40 group-hover:text-gold" />
                   </div>
                   <Badge className={cn(getTechStatusColor(tech.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                      {t(`status.${tech.status.replace('-', '')}`)}
                   </Badge>
                </div>
                
                <h3 className="text-xl font-black text-gold tracking-tight mb-2">{tech.name}</h3>
                
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 text-xs text-rosary/60">
                      <MapPin className="h-4 w-4 text-gold/40" />
                      {tech.location}
                   </div>
                   <div className="flex items-center gap-3 text-xs text-rosary/40 font-mono tracking-tighter">
                      <Mail className="h-4 w-4 text-gold/20" />
                      {tech.email}
                   </div>
                   <div className="flex items-center gap-3 text-xs text-rosary/40 font-mono tracking-tighter">
                      <Phone className="h-4 w-4 text-gold/20" />
                      {toPersianNumber(tech.phone)}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                   <div>
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">کارهای فعال</p>
                      <p className="text-lg font-black font-mono text-gold">{toPersianNumber(tech.activeJobs)}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">تکمیل شده امروز</p>
                      <p className="text-lg font-black font-mono text-green-400">{toPersianNumber(tech.completedToday)}</p>
                   </div>
                </div>

                <div className="mt-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full bg-white/5 hover:bg-gold/10 text-rosary hover:text-gold border-none text-[10px] font-black uppercase tracking-widest h-10">
                        مشاهده برنامه زمان‌بندی
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                      <DropdownMenuItem onClick={() => console.log('View schedule', tech.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Calendar className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">مشاهده تقویم</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Assign job', tech.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Plus className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">تخصیص کار جدید</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card title={t('fsm.tabs.schedule')} collapsible>
             <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <Calendar className="h-10 w-10 text-gold/20" />
                </div>
                <p className="text-rosary/30 text-lg font-bold tracking-tight">تقویم زمان‌بندی تکنسین‌ها</p>
                <p className="text-rosary/20 text-sm mt-3">سیستم هوشمند دیسپاچینگ در حال همگام‌سازی است</p>
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
