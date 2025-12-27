// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, UserPlus, Calendar, TrendingUp, Clock, DollarSign, Search, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from './ui/utils';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'on-leave' | 'terminated';
  hireDate: string;
  salary: number;
  manager: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'سارا جانسون',
    email: 'sarah.j@foodpro.com',
    department: 'Production',
    position: 'مدیر تولید',
    status: 'active',
    hireDate: '2022-03-15',
    salary: 75000,
    manager: 'جان اسمیت',
  },
  {
    id: '2',
    name: 'مایک دیویس',
    email: 'mike.d@foodpro.com',
    department: 'Quality Control',
    position: 'بازرس کنترل کیفیت',
    status: 'active',
    hireDate: '2023-01-10',
    salary: 55000,
    manager: 'سارا جانسون',
  },
  {
    id: '3',
    name: 'امیلی چن',
    email: 'emily.c@foodpro.com',
    department: 'Sales',
    position: 'نماینده فروش',
    status: 'on-leave',
    hireDate: '2021-09-20',
    salary: 62000,
    manager: 'رابرت تیلور',
  },
];

const attendanceData = [
  { employee: 'سارا جانسون', present: 22, absent: 0, late: 1 },
  { employee: 'مایک دیویس', present: 21, absent: 1, late: 2 },
  { employee: 'امیلی چن', present: 15, absent: 5, late: 0 },
  { employee: 'جان مارتینز', present: 23, absent: 0, late: 0 },
];

const departments = [
  { name: 'Production', employees: 45, budget: 2250000 },
  { name: 'Quality Control', employees: 12, budget: 540000 },
  { name: 'Sales & Marketing', employees: 18, budget: 990000 },
  { name: 'Logistics', employees: 22, budget: 1100000 },
  { name: 'Administration', employees: 8, budget: 480000 },
];

export function HumanResources() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'on-leave': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'terminated': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-white/10 text-rosary/60 border border-white/20';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('employees.title')}
        subtitle={t('employees.subtitle')}
        action={{
          label: t('employees.addEmployee'),
          icon: UserPlus,
          onClick: () => console.log('Add Employee clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('employees.stats.totalEmployees'), value: 105, sub: t('employees.stats.newThisQuarter', { count: toPersianNumber(8) }), icon: Users, color: 'text-gold' },
          { label: t('employees.stats.attendanceRate'), value: '96.8٪', sub: t('employees.stats.aboveTarget'), icon: Calendar, color: 'text-green-400' },
          { label: t('employees.stats.avgWorkingHours'), value: toPersianNumber(42.5), unit: t('units.hour'), sub: t('employees.stats.perWeek'), icon: Clock, color: 'text-gold' },
          { label: t('employees.stats.payroll'), value: toPersianNumber(458), unit: `میلیون ${t('units.toman')}`, sub: t('employees.stats.totalExpenses'), icon: DollarSign, color: 'text-gold' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {typeof kpi.value === 'number' ? toPersianNumber(kpi.value) : kpi.value}
                  {kpi.unit && <span className="text-xs font-vazir text-rosary/40 mr-1">{kpi.unit}</span>}
                </div>
                <p className="text-xs text-green-400 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="employees" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('nav.employees')}</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('employees.tabs.attendance')}</TabsTrigger>
          <TabsTrigger value="departments" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('employees.departments.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('common.search')}
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-rosary/40 mr-1">بخش</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg">
                  <SelectValue placeholder="همه بخش‌ها" />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="all">همه بخش‌ها</SelectItem>
                  <SelectItem value="production">تولید</SelectItem>
                  <SelectItem value="qc">کنترل کیفیت</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FilterBar>

          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.name')}</TableHead>
                <TableHead>{t('employees.department')}</TableHead>
                <TableHead>{t('employees.position')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead>{t('employees.hireDate')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmployees.filter(e => e.name.includes(searchTerm)).map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold/10 rounded-full border border-gold/20 flex items-center justify-center text-gold font-black shadow-inner">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-rosary group-hover:text-gold transition-colors">{employee.name}</div>
                        <div className="text-[10px] text-rosary/30 font-mono tracking-tighter">{employee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/10 text-rosary/60 bg-white/5">
                      {t(`nav.${employee.department.toLowerCase().replace(/\s/g, '')}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-rosary/60">{employee.position}</TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusColor(employee.status), "rounded-full px-4")}>
                      {t(`status.${employee.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-rosary/40">
                    {toPersianNumber(new Date(employee.hireDate).toLocaleDateString('fa-IR'))}
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
                          <DropdownMenuItem onClick={() => console.log('View employee', employee.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Eye className="ml-2 h-4 w-4 text-gold/40" />
                            <span className="font-bold text-xs">{t('common.details')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Edit employee', employee.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Edit className="ml-2 h-4 w-4 text-gold" />
                            <span className="font-bold text-xs">{t('common.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Delete employee', employee.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                            <Trash2 className="ml-2 h-4 w-4" />
                            <span className="font-bold text-xs">{t('common.delete')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card 
            title={t('employees.attendance.summary')} 
            collapsible 
            className="animate-in slide-in-from-bottom-4 duration-500"
          >
            <TableContainer className="border-none bg-transparent shadow-none rounded-none">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.name')}</TableHead>
                  <TableHead>{t('employees.attendance.present')}</TableHead>
                  <TableHead>{t('employees.attendance.absent')}</TableHead>
                  <TableHead>{t('employees.attendance.late')}</TableHead>
                  <TableHead className="text-left">{t('employees.attendance.rate')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => {
                  const totalDays = record.present + record.absent;
                  const rate = ((record.present / totalDays) * 100).toFixed(1);
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-bold">{record.employee}</TableCell>
                      <TableCell className="font-mono text-green-400">{toPersianNumber(record.present)}</TableCell>
                      <TableCell className="font-mono text-blood/60">{toPersianNumber(record.absent)}</TableCell>
                      <TableCell className="font-mono text-yellow-400/60">{toPersianNumber(record.late)}</TableCell>
                      <TableCell className="text-left font-black font-mono">
                        <span className={cn(
                          parseFloat(rate) >= 95 ? 'text-green-400' : parseFloat(rate) >= 85 ? 'text-yellow-400' : 'text-blood'
                        )}>
                          {toPersianNumber(rate)}٪
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableContainer>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card 
                key={index} 
                title={t(`nav.${dept.name.toLowerCase().replace(/\s/g, '')}`)}
                className="group hover:border-gold/20"
              >
                <div className="flex items-center justify-between mb-6">
                   <p className="text-xs text-rosary/40 font-bold uppercase">{toPersianNumber(dept.employees)} {t('employees.departments.employees')}</p>
                   <div className="w-10 h-10 bg-gold/5 rounded-lg border border-white/5 flex items-center justify-center text-gold/30 group-hover:text-gold transition-colors">
                     <Users className="h-5 w-5" />
                   </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-rosary/40">{t('employees.departments.annualBudget')}</span>
                    <span className="font-mono text-gold text-lg">{toPersianNumber((dept.budget / 1000).toFixed(0))}K <span className="text-[10px] font-vazir mr-1 opacity-50">{t('units.toman')}</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-rosary/40">{t('employees.departments.costPerEmployee')}</span>
                    <span className="font-mono text-rosary/60">{toPersianNumber(Math.round(dept.budget / dept.employees / 1000))}K</span>
                  </div>
                  <div className="mt-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full border-white/5 group-hover:border-gold/30">
                          {t('common.details')}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                        <DropdownMenuItem onClick={() => console.log('View department', dept.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Eye className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('common.details')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('View members', dept.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Users className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">مشاهده اعضاء</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
