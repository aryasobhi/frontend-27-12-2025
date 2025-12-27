// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, AlertCircle, Search, Activity, Briefcase, MoreVertical, Eye, Edit } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-1001',
    customer: 'توزیع‌کنندگان دره سبز',
    amount: 12450000,
    date: '2025-10-15',
    dueDate: '2025-11-15',
    status: 'paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-1002',
    customer: 'شرکت بازار تازه',
    amount: 8900000,
    date: '2025-10-20',
    dueDate: '2025-11-20',
    status: 'pending',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-1003',
    customer: 'غذاهای ارگانیک لیمیتد',
    amount: 18600000,
    date: '2025-09-25',
    dueDate: '2025-10-25',
    status: 'overdue',
  },
];

interface FinanceProps {
  onViewInvoice?: (invoiceId: string) => void;
}

export function Finance({ onViewInvoice }: FinanceProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const revenueData = [
    { month: 'بهمن', revenue: 1450000, expenses: 980000, profit: 470000 },
    { month: 'اسفند', revenue: 1620000, expenses: 1050000, profit: 570000 },
    { month: 'فروردین', revenue: 1580000, expenses: 1020000, profit: 560000 },
    { month: 'اردیبهشت', revenue: 1810000, expenses: 1150000, profit: 660000 },
    { month: 'خرداد', revenue: 1750000, expenses: 1100000, profit: 650000 },
    { month: 'تیر', revenue: 1980000, expenses: 1250000, profit: 730000 },
  ];

  const expenseCategories = [
    { category: 'مواد اولیه', amount: 850000 },
    { category: 'نیروی کار', amount: 650000 },
    { category: 'تاسیسات', amount: 220000 },
    { category: 'حمل و نقل', amount: 180000 },
    { category: 'بازاریابی', amount: 150000 },
    { category: 'سایر', amount: 120000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'overdue': return 'bg-blood/20 text-blood border border-blood/30';
      case 'cancelled': return 'bg-rosary/20 text-rosary border border-rosary/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('finance.title')}
        subtitle={t('finance.subtitle')}
        action={{
          label: t('finance.generateReport'),
          icon: FileText,
          onClick: () => console.log('Generate Report clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('finance.totalRevenue'), value: '۱.۰۲ م.ت', sub: t('finance.stats.revenueGrowth'), icon: DollarSign, color: 'text-gold' },
          { label: t('finance.totalExpenses'), value: '۶۵۵ ک.ت', sub: t('finance.stats.expenseTrend'), icon: CreditCard, color: 'text-blood' },
          { label: t('finance.netProfit'), value: '۳۶۴ ک.ت', sub: t('finance.stats.profitGrowth'), icon: TrendingUp, color: 'text-green-400' },
          { label: t('finance.overdueInvoices'), value: '۴۲.۵ ک.ت', sub: `${toPersianNumber('۸')} فاکتور`, icon: AlertCircle, color: 'text-blood' },
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="overview" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('finance.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('finance.tabs.invoices')}</TabsTrigger>
          <TabsTrigger value="expenses" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('finance.tabs.expenses')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <Card title={t('finance.charts.revenueVsExpense')} collapsible>
            <div className="h-[350px] w-full pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                  <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f0a0a', border: '1px solid #ffffff10', borderRadius: '12px', color: '#e6d5c5' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#c59d5f" strokeWidth={3} name="درآمد" dot={{ fill: '#c59d5f', stroke: '#0f0a0a', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#9a2a2a" strokeWidth={3} name="هزینه" dot={{ fill: '#9a2a2a', stroke: '#0f0a0a', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} name="سود" dot={{ fill: '#3b82f6', stroke: '#0f0a0a', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title={t('finance.charts.expenseBreakdown')} collapsible>
               <div className="h-[300px] w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseCategories}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="category" stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 9, fontWeight: 700 }} />
                    <YAxis stroke="#ffffff20" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f0a0a', border: '1px solid #ffffff10', borderRadius: '12px', color: '#e6d5c5' }}
                    />
                    <Bar dataKey="amount" fill="#9a2a2a" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title={t('finance.summary.title')} collapsible>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: t('finance.summary.grossMargin'), value: '۳۵.۸٪', icon: Activity, color: 'text-green-400' },
                  { label: t('finance.summary.operatingMargin'), value: '۲۸.۲٪', icon: TrendingUp, color: 'text-green-400' },
                  { label: t('finance.summary.cashFlow'), value: '۱۵۶ ک.ت', icon: DollarSign, color: 'text-blue-400' },
                  { label: t('finance.summary.accountsReceivable'), value: '۸۷ ک.ت', icon: Briefcase, color: 'text-orange-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/20 transition-all duration-500 group">
                    <div className="text-right">
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                      <div className="font-mono text-gold font-black">{toPersianNumber(item.value)}</div>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <item.icon className={cn("h-5 w-5 opacity-40 group-hover:opacity-100 transition-all duration-500", item.color)} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('common.search')}
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-rosary/40 mr-1">{t('finance.status')}</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg">
                  <SelectValue placeholder="همه وضعیت‌ها" />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="paid">پرداخت شده</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                  <SelectItem value="overdue">معوقه</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FilterBar>

          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableHead>{t('finance.invoiceNumber')}</TableHead>
                <TableHead>{t('finance.customer')}</TableHead>
                <TableHead>{t('finance.amount')}</TableHead>
                <TableHead>{t('finance.date')}</TableHead>
                <TableHead>{t('finance.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.filter(i => i.invoiceNumber.includes(searchTerm) || i.customer.includes(searchTerm)).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <span className="font-mono text-xs font-black text-rosary group-hover:text-gold transition-colors tracking-widest uppercase">
                      {toPersianNumber(invoice.invoiceNumber)}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">{invoice.customer}</TableCell>
                  <TableCell className="font-mono text-xs font-black text-gold/60">
                    {toPersianNumber(invoice.amount.toLocaleString())} <span className="text-[10px] text-rosary/30 font-vazir mr-1">{t('units.toman')}</span>
                  </TableCell>
                  <TableCell className="text-xs text-rosary/60 font-medium">
                    {toPersianNumber(new Date(invoice.date).toLocaleDateString('fa-IR'))}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusColor(invoice.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                      {t(`status.${invoice.status}`)}
                    </Badge>
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
                          <DropdownMenuItem onClick={() => onViewInvoice?.(invoice.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Eye className="ml-2 h-4 w-4 text-gold/40" />
                            <span className="font-bold text-xs">{t('common.view')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Edit invoice', invoice.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Edit className="ml-2 h-4 w-4 text-gold" />
                            <span className="font-bold text-xs">{t('common.edit')}</span>
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

        <TabsContent value="expenses" className="space-y-6">
          <Card title={t('finance.expenseCategories')} collapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {expenseCategories.map((expense, index) => (
                <div key={index} className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/20 transition-all duration-500 group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rosary/80 uppercase tracking-tight">{expense.category}</span>
                    <span className="font-mono text-sm font-black text-gold">{toPersianNumber(expense.amount.toLocaleString())} {t('units.toman')}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-blood shadow-glow-blood transition-all duration-1000"
                      style={{ width: `${(expense.amount / 850000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
