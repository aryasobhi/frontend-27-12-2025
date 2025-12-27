// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShoppingBag, TrendingDown, Clock, CheckCircle, AlertCircle, Plus, Search, MoreVertical, FileText, Activity, Eye, Edit, Trash2 } from 'lucide-react';
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

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: string;
  quantity: number;
  amount: number;
  orderDate: string;
  expectedDate: string;
  status: 'draft' | 'pending' | 'approved' | 'received' | 'cancelled';
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-5001',
    supplier: 'تامین‌کنندگان مزرعه تازه',
    items: 'آرد گندم ارگانیک',
    quantity: 2000,
    amount: 8500000,
    orderDate: '2025-10-28',
    expectedDate: '2025-11-03',
    status: 'approved',
  },
  {
    id: '2',
    poNumber: 'PO-2024-5002',
    supplier: 'واردات مدیترانه‌ای',
    items: 'روغن زیتون ممتاز',
    quantity: 500,
    amount: 12000000,
    orderDate: '2025-10-30',
    expectedDate: '2025-11-05',
    status: 'pending',
  },
  {
    id: '3',
    poNumber: 'PO-2024-5003',
    supplier: 'صنایع پک‌پرو',
    items: 'جار شیشه‌ای ۵۰۰ میلی‌لیتر',
    quantity: 5000,
    amount: 6800000,
    orderDate: '2025-10-25',
    expectedDate: '2025-11-01',
    status: 'received',
  },
  {
    id: '4',
    poNumber: 'PO-2024-5004',
    supplier: 'مزارع دره سبز',
    items: 'گوجه فرنگی تازه',
    quantity: 1500,
    amount: 3200000,
    orderDate: '2025-11-01',
    expectedDate: '2025-11-04',
    status: 'draft',
  },
];

export function Procurement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'approved': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'received': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'cancelled': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('purchasing.procurementManagement')}
        subtitle={t('purchasing.managePO')}
        action={{
          label: t('purchasing.newPO'),
          icon: ShoppingBag,
          onClick: () => console.log('New PO clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('purchasing.totalPOs'), value: toPersianNumber('۶۷'), sub: `${toPersianNumber('۲۴۵')} م.ت`, icon: ShoppingBag, color: 'text-gold' },
          { label: t('purchasing.pendingApprovals'), value: toPersianNumber('۱۲'), sub: 'در انتظار بررسی', icon: Clock, color: 'text-gold' },
          { label: t('purchasing.completedPOs'), value: toPersianNumber('۵۲'), sub: 'این ماه', icon: CheckCircle, color: 'text-green-400' },
          { label: t('purchasing.costSavings'), value: '۱۲.۵ م.ت', sub: 'نسبت به ماه قبل', icon: TrendingDown, color: 'text-green-400' },
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

      <Card title={t('purchasing.title')} collapsible>
        <FilterBar 
          onSearch={setSearchTerm} 
          searchPlaceholder={t('common.search')}
          className="mb-6 !p-0 border-none bg-transparent"
        />

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('purchasing.orderNumber')}</TableHead>
              <TableHead>{t('purchasing.supplier')}</TableHead>
              <TableHead>{t('table.category')}</TableHead>
              <TableHead>{t('table.quantity')}</TableHead>
              <TableHead>{t('purchasing.totalAmount')}</TableHead>
              <TableHead>{t('purchasing.status')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPurchaseOrders.filter(po => po.poNumber.includes(searchTerm) || po.supplier.includes(searchTerm)).map((po) => (
              <TableRow key={po.id}>
                <TableCell>
                  <span className="font-mono text-xs font-black text-rosary group-hover:text-gold transition-colors tracking-widest uppercase">
                    {toPersianNumber(po.poNumber)}
                  </span>
                </TableCell>
                <TableCell className="font-bold">{po.supplier}</TableCell>
                <TableCell className="text-[10px] font-bold text-rosary/40 uppercase tracking-tighter">{po.items}</TableCell>
                <TableCell className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(po.quantity.toLocaleString())}</TableCell>
                <TableCell className="font-mono text-xs font-black text-gold/60">
                  {toPersianNumber(po.amount.toLocaleString())} <span className="text-[10px] text-rosary/30 font-vazir mr-1">{t('units.toman')}</span>
                </TableCell>
                <TableCell>
                  <Badge className={cn(getStatusColor(po.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                    {t(`status.${po.status}`)}
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
                        <DropdownMenuItem onClick={() => console.log('View PO', po.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Eye className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('common.view')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit PO', po.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Edit className="ml-2 h-4 w-4 text-gold" />
                          <span className="font-bold text-xs">{t('common.edit')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete PO', po.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
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
      </Card>

      <Card title={t('purchasing.recentQuotes')} collapsible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[
            { name: 'تامین‌کنندگان مزرعه تازه', status: 'quoteRequested', desc: 'سفارش عمده سبزیجات ارگانیک - ۳۰۰۰ کیلوگرم', icon: FileText },
            { name: 'صنایع پک‌پرو', status: 'quoteReceived', desc: 'مواد بسته‌بندی - ۱۰,۰۰۰ واحد', icon: CheckCircle },
            { name: 'واردات مدیترانه‌ای', status: 'underReview', desc: 'ادویه‌ها و چاشنی‌های خاص - ۵۰۰ کیلوگرم', icon: Activity }
          ].map((quote, idx) => (
            <div key={idx} className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-300">
                  <quote.icon className="h-5 w-5 text-gold/40 group-hover:text-gold" />
                </div>
                <Badge variant="outline" className="border-gold/20 text-gold/60 text-[10px] font-bold uppercase tracking-widest h-6">
                  {quote.status === 'quoteRequested' ? 'استعلام شده' : quote.status === 'quoteReceived' ? 'دریافت شده' : 'در حال بررسی'}
                </Badge>
              </div>
              <h4 className="font-bold text-rosary mb-1 group-hover:text-gold transition-colors">{quote.name}</h4>
              <p className="text-[10px] text-rosary/40 leading-relaxed font-vazir">{quote.desc}</p>
              <div className="flex justify-end mt-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-gold/10 text-rosary hover:text-gold border-none text-[10px] font-black uppercase tracking-widest h-9 w-full">
                      {t('purchasing.review')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                    <DropdownMenuItem onClick={() => console.log('Review quote', quote.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                      <FileText className="ml-2 h-4 w-4 text-gold/40" />
                      <span className="font-bold text-xs">{t('purchasing.review')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Approve quote', quote.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                      <CheckCircle className="ml-2 h-4 w-4 text-green-400/40" />
                      <span className="font-bold text-xs">{t('common.approve')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
