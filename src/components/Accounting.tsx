// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileText, TrendingUp, DollarSign, BookOpen, Search, Activity, Scale, Briefcase } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  reference: string;
  type: 'purchase' | 'sales' | 'manual';
  debit: number;
  credit: number;
  status: 'posted' | 'draft';
}

const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    entryNumber: 'JE-2024-8001',
    date: '2025-11-02',
    description: 'خرید - رسید کالا PO-2024-6002',
    reference: 'PO-2024-6002',
    type: 'purchase',
    debit: 7500000,
    credit: 7500000,
    status: 'posted',
  },
  {
    id: '2',
    entryNumber: 'JE-2024-8002',
    date: '2025-11-01',
    description: 'فروش - فاکتور SO-2024-7001',
    reference: 'SO-2024-7001',
    type: 'sales',
    debit: 5825000,
    credit: 5825000,
    status: 'posted',
  },
];

const mockAccounts = [
  { code: '۱۱۰۰', name: 'موجودی نقد', type: 'Asset', balance: 125000000 },
  { code: '۱۲۰۰', name: 'حساب‌های دریافتنی', type: 'Asset', balance: 87000000 },
  { code: '۱۳۰۰', name: 'موجودی - مواد اولیه', type: 'Asset', balance: 185000000 },
  { code: '۱۳۱۰', name: 'موجودی - کالای ساخته شده', type: 'Asset', balance: 156000000 },
  { code: '۲۰۰۰', name: 'حساب‌های پرداختنی', type: 'Liability', balance: 65000000 },
  { code: '۴۰۰۰', name: 'درآمد فروش', type: 'Revenue', balance: 1020000000 },
  { code: '۵۰۰۰', name: 'بهای تمام شده کالای فروش رفته', type: 'Expense', balance: 655000000 },
];

export function Accounting() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('accounting.title')}
        subtitle={t('accounting.automatedAccounting')}
        action={{
          label: t('accounting.manualJE'),
          icon: FileText,
          onClick: () => console.log('Manual JE clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('accounting.totalAssets'), value: '۵۵۳ م.ت', sub: '۱۲٪+ نسبت به ماه قبل', icon: Scale, color: 'text-gold' },
          { label: t('accounting.totalLiabilities'), value: '۶۵ م.ت', sub: t('accounting.accountsPayable'), icon: DollarSign, color: 'text-blood' },
          { label: t('accounting.equity'), value: '۴۸۸ م.ت', sub: t('accounting.strongPosition'), icon: Briefcase, color: 'text-green-400' },
          { label: t('accounting.postedEntries'), value: toPersianNumber('۲۸۷'), sub: t('common.thisMonth'), icon: BookOpen, color: 'text-gold' },
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

      <Tabs defaultValue="journal" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="journal" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('accounting.journalEntries')}</TabsTrigger>
          <TabsTrigger value="accounts" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('accounting.chartOfAccounts')}</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('accounting.financialReports')}</TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-6">
          <Card className="!p-0 border-none bg-transparent">
             <div className="mb-6 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gold uppercase tracking-widest mb-1">{t('accounting.automaticPostingSystem')}</h4>
                  <p className="text-xs text-rosary/60 leading-relaxed">{t('accounting.automaticPostingDesc')}</p>
                </div>
             </div>

             <FilterBar 
              onSearch={setSearchTerm} 
              searchPlaceholder={t('common.search')}
              className="mb-6"
            />

            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('accounting.entryNumber')}</TableHead>
                  <TableHead>{t('common.date')}</TableHead>
                  <TableHead>{t('common.description')}</TableHead>
                  <TableHead>{t('accounting.reference')}</TableHead>
                  <TableHead>{t('accounting.debit')}</TableHead>
                  <TableHead>{t('accounting.credit')}</TableHead>
                  <TableHead>{t('status.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJournalEntries.filter(e => e.entryNumber.includes(searchTerm) || e.description.includes(searchTerm)).map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-rosary group-hover:text-gold transition-colors tracking-widest">
                        {toPersianNumber(entry.entryNumber)}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-rosary/60 font-medium">
                      {toPersianNumber(new Date(entry.date).toLocaleDateString('fa-IR'))}
                    </TableCell>
                    <TableCell className="text-sm font-bold">{entry.description}</TableCell>
                    <TableCell>
                      <code className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gold/60 font-mono">
                        {entry.reference}
                      </code>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-black text-gold/60">{toPersianNumber(entry.debit.toLocaleString())}</TableCell>
                    <TableCell className="font-mono text-xs font-black text-gold/60">{toPersianNumber(entry.credit.toLocaleString())}</TableCell>
                    <TableCell>
                      <Badge className={cn(entry.status === 'posted' ? 'bg-green-400/20 text-green-400' : 'bg-rosary/20 text-rosary', "rounded-full px-4 border-none text-[10px] font-bold")}>
                        {t(`status.${entry.status}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card title={t('accounting.chartOfAccounts')} collapsible>
            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('accounting.accountCode')}</TableHead>
                  <TableHead>{t('accounting.accountName')}</TableHead>
                  <TableHead>{t('common.type')}</TableHead>
                  <TableHead>{t('accounting.balance')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs font-black text-gold/60">{toPersianNumber(account.code)}</TableCell>
                    <TableCell className="font-bold">{account.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/10 text-rosary/50 bg-white/5 text-[10px] uppercase font-bold px-3">
                        {account.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-black text-gold">
                      {toPersianNumber(account.balance.toLocaleString())} <span className="text-[10px] text-rosary/30 font-vazir mr-1">{t('units.toman')}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title={t('accounting.balanceSheet')} collapsible>
              <div className="space-y-4 pt-4">
                {[
                  { label: t('accounting.assets'), value: '۵۵۳,۰۰۰,۰۰۰', color: 'text-gold' },
                  { label: t('accounting.liabilities'), value: '۶۵,۰۰۰,۰۰۰', color: 'text-blood' },
                  { label: t('accounting.equity'), value: '۴۸۸,۰۰۰,۰۰۰', color: 'text-green-400', isTotal: true },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border transition-all duration-500",
                    item.isTotal ? "bg-gold/10 border-gold/30" : "bg-white/5 border-white/5 hover:border-gold/20"
                  )}>
                    <span className={cn("text-xs font-bold uppercase tracking-widest", item.isTotal ? "text-gold" : "text-rosary/60")}>{item.label}</span>
                    <span className={cn("font-mono text-sm font-black", item.color)}>{toPersianNumber(item.value)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title={t('accounting.incomeStatement')} collapsible>
              <div className="space-y-4 pt-4">
                {[
                  { label: t('accounting.revenue'), value: '۱,۰۲۰,۰۰۰,۰۰۰', color: 'text-green-400' },
                  { label: t('accounting.cogs'), value: '۶۵۵,۰۰۰,۰۰۰', color: 'text-blood', isNegative: true },
                  { label: t('accounting.netProfit'), value: '۳۶۵,۰۰۰,۰۰۰', color: 'text-gold', isTotal: true },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border transition-all duration-500",
                    item.isTotal ? "bg-gold/10 border-gold/30" : "bg-white/5 border-white/5 hover:border-gold/20"
                  )}>
                    <span className={cn("text-xs font-bold uppercase tracking-widest", item.isTotal ? "text-gold" : "text-rosary/60")}>{item.label}</span>
                    <span className={cn("font-mono text-sm font-black", item.color)}>
                      {item.isNegative ? `(${toPersianNumber(item.value)})` : toPersianNumber(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
