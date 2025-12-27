// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, AlertCircle, ClipboardCheck, TrendingUp, Search, Plus, Activity, Package, Layers, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';

interface Inspection {
  id: string;
  batch: string;
  product: string;
  date: string;
  inspector: string;
  result: 'passed' | 'failed' | 'pending';
  score: number;
  issues: number;
}

const mockInspections: Inspection[] = [
  {
    id: '1',
    batch: 'BATCH-2024-1001',
    product: 'سس گوجه فرنگی ارگانیک',
    date: '2025-11-02',
    inspector: 'جین اسمیت',
    result: 'passed',
    score: 98,
    issues: 0,
  },
  {
    id: '2',
    batch: 'BATCH-2024-1002',
    product: 'نان گندم کامل',
    date: '2025-11-02',
    inspector: 'مایک جانسون',
    result: 'passed',
    score: 95,
    issues: 1,
  },
  {
    id: '3',
    batch: 'BATCH-2024-1003',
    product: 'بسته سبزیجات مخلوط',
    date: '2025-11-01',
    inspector: 'سارا ویلسون',
    result: 'pending',
    score: 0,
    issues: 0,
  },
  {
    id: '4',
    batch: 'BATCH-2024-1004',
    product: 'روغن زیتون ممتاز',
    date: '2025-11-01',
    inspector: 'جین اسمیت',
    result: 'failed',
    score: 72,
    issues: 5,
  },
];

const qualityMetrics = [
  { name: 'پاس شده', value: 156, color: '#10b981' },
  { name: 'رد شده', value: 8, color: '#ef4444' },
  { name: 'در انتظار', value: 12, color: '#f59e0b' },
];

const defectTypes = [
  { type: 'بسته‌بندی', count: 15 },
  { type: 'اختلاف وزن', count: 8 },
  { type: 'آلودگی', count: 3 },
  { type: 'رنگ/بافت', count: 12 },
  { type: 'برچسب‌گذاری', count: 6 },
];

export function QualityControl() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getResultColor = (result: string) => {
    switch (result) {
      case 'passed': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'failed': return 'bg-blood/20 text-blood border border-blood/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('qc.title')}
        subtitle={t('qc.manageInspections')}
        action={{
          label: t('qc.newInspection'),
          icon: ClipboardCheck,
          onClick: () => console.log('New Inspection clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('qc.passRate'), value: '۹۵.۲٪', sub: '+۱.۲٪ نسبت به ماه قبل', icon: CheckCircle, color: 'text-green-400' },
          { label: t('qc.failedBatches'), value: toPersianNumber('۸'), sub: 'این ماه', icon: XCircle, color: 'text-blood' },
          { label: t('qc.pendingInspections'), value: toPersianNumber('۱۲'), sub: 'در انتظار بررسی', icon: AlertCircle, color: 'text-gold' },
          { label: t('qc.avgQualityScore'), value: toPersianNumber('۹۴.۷'), sub: 'عالی', icon: TrendingUp, color: 'text-green-400' },
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={t('qc.inspectionResults')} collapsible>
          <div className="h-[300px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityMetrics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {qualityMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2d1b7' }}
                  />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {qualityMetrics.map((item, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                <div className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest">{item.name}</div>
                <div className="text-lg font-black font-mono text-rosary">{toPersianNumber(item.value.toString())}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('qc.defectDistribution')} collapsible>
          <div className="h-[400px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={defectTypes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => toPersianNumber(v.toString())} />
                  <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.3)" fontSize={10} width={100} tick={{ fill: '#e2d1b7' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="count" fill="#8b0000" radius={[0, 4, 4, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title={t('qc.recentInspections')} collapsible>
        <FilterBar 
          onSearch={setSearchTerm} 
          searchPlaceholder={t('common.search')}
          className="mb-6 !p-0 border-none bg-transparent"
        />

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('qc.batchID')}</TableHead>
              <TableHead>{t('nav.products')}</TableHead>
              <TableHead>{t('common.date')}</TableHead>
              <TableHead>{t('qc.inspector')}</TableHead>
              <TableHead>{t('qc.qualityScore')}</TableHead>
              <TableHead>{t('qc.issuesFound')}</TableHead>
              <TableHead>{t('status.status')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInspections.filter(i => i.batch.includes(searchTerm) || i.product.includes(searchTerm)).map((inspection) => (
              <TableRow key={inspection.id}>
                <TableCell>
                  <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(inspection.batch)}</span>
                </TableCell>
                <TableCell className="font-bold">{inspection.product}</TableCell>
                <TableCell className="text-xs text-rosary/60 font-medium">
                  {toPersianNumber(new Date(inspection.date).toLocaleDateString('fa-IR'))}
                </TableCell>
                <TableCell className="text-xs">{inspection.inspector}</TableCell>
                <TableCell>
                  {inspection.score > 0 ? (
                    <span className={cn(
                      "font-black font-mono text-xs",
                      inspection.score >= 90 ? 'text-green-400' : inspection.score >= 70 ? 'text-yellow-400' : 'text-blood'
                    )}>
                      {toPersianNumber(inspection.score.toString())}/۱۰۰
                    </span>
                  ) : <span className="text-rosary/20">---</span>}
                </TableCell>
                <TableCell>
                  {inspection.issues > 0 ? (
                    <span className="text-blood font-black font-mono">{toPersianNumber(inspection.issues.toString())}</span>
                  ) : (
                    <span className="text-green-400 font-black font-mono">{toPersianNumber('0')}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={cn(getResultColor(inspection.result), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                    {t(`status.${inspection.result}`)}
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
                        <DropdownMenuItem onClick={() => console.log('View report', inspection.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Eye className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('qc.viewReport')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit inspection', inspection.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
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
      </Card>
    </div>
  );
}
