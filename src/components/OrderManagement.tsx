// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Filter, Download, Eye, Package, TrendingUp, Clock, CheckCircle, AlertCircle, MoreVertical, Edit, Trash2, Printer } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Order {
  id: string;
  orderNumber: string;
  partner: string;
  date: string;
  products: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDate: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2845',
    partner: 'توزیع‌کنندگان دره سبز',
    date: '2025-11-01',
    products: 'گوجه فرنگی ارگانیک، کاهو تازه',
    quantity: 500,
    amount: 12450000,
    status: 'shipped',
    deliveryDate: '2025-11-05',
  },
  {
    id: '2',
    orderNumber: 'ORD-2844',
    partner: 'شرکت بازار تازه',
    date: '2025-11-01',
    products: 'بسته سبزیجات مخلوط',
    quantity: 350,
    amount: 8900000,
    status: 'processing',
    deliveryDate: '2025-11-04',
  },
  {
    id: '3',
    orderNumber: 'ORD-2843',
    partner: 'غذاهای ارگانیک با مسئولیت محدود',
    date: '2025-10-31',
    products: 'گلچین میوه‌های ممتاز',
    quantity: 750,
    amount: 18600000,
    status: 'delivered',
    deliveryDate: '2025-11-02',
  },
  {
    id: '4',
    orderNumber: 'ORD-2842',
    partner: 'گروه خرده‌فروشان شهر',
    date: '2025-10-31',
    products: 'بسته محصولات لبنی',
    quantity: 200,
    amount: 5400000,
    status: 'pending',
    deliveryDate: '2025-11-06',
  },
  {
    id: '5',
    orderNumber: 'ORD-2841',
    partner: 'عمده‌فروشان برداشت',
    date: '2025-10-30',
    products: 'مجموعه غذاهای منجمد',
    quantity: 450,
    amount: 11200000,
    status: 'shipped',
    deliveryDate: '2025-11-03',
  },
  {
    id: '6',
    orderNumber: 'ORD-2840',
    partner: 'شرکت غذاهای ممتاز',
    date: '2025-10-30',
    products: 'مجموعه غلات ارگانیک',
    quantity: 600,
    amount: 15800000,
    status: 'cancelled',
    deliveryDate: '-',
  },
];

interface OrderManagementProps {
  onViewOrder?: (id: string) => void;
}

export function OrderManagement({ onViewOrder }: OrderManagementProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'shipped': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'processing': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'pending': return 'bg-orange-400/20 text-orange-400 border border-orange-400/30';
      case 'cancelled': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary font-vazir" dir="rtl">
      <PageHeader 
        title={t('orders.title')}
        subtitle={t('orders.subtitle')}
        action={{
          label: t('common.export'),
          icon: Download,
          onClick: () => console.log('Export clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('dashboard.kpi.activeOrders'), value: toPersianNumber('۱۸۲'), icon: Package, color: 'text-gold' },
          { label: t('status.pending'), value: toPersianNumber('۲۴'), icon: Clock, color: 'text-orange-400' },
          { label: t('status.inprogress'), value: toPersianNumber('۵۸'), icon: TrendingUp, color: 'text-blue-400' },
          { label: t('status.completed'), value: toPersianNumber('۹۶'), icon: CheckCircle, color: 'text-green-400' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {kpi.value}
                </div>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title={t('orders.title')} collapsible>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('common.search')}
            className="flex-1 !p-0 border-none bg-transparent"
          />
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-rosary hover:border-gold/30 rounded-xl h-10">
                <Filter className="h-4 w-4 ml-2 text-gold/60" />
                <SelectValue placeholder={t('common.filter')} />
              </SelectTrigger>
              <SelectContent className="bg-damask border-white/10 text-rosary">
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="pending">{t('status.pending')}</SelectItem>
                <SelectItem value="processing">{t('status.inprogress')}</SelectItem>
                <SelectItem value="shipped">در حال ارسال</SelectItem>
                <SelectItem value="delivered">{t('status.completed')}</SelectItem>
                <SelectItem value="cancelled">{t('status.cancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orders.orderNumber')}</TableHead>
              <TableHead>{t('orders.partner')}</TableHead>
              <TableHead>{t('orders.products')}</TableHead>
              <TableHead>{t('orders.quantity')}</TableHead>
              <TableHead>{t('orders.amount')}</TableHead>
              <TableHead>{t('orders.status')}</TableHead>
              <TableHead className="text-left">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.filter(order => 
              (order.orderNumber.includes(searchTerm) || order.partner.includes(searchTerm)) &&
              (statusFilter === 'all' || order.status === statusFilter)
            ).map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(order.orderNumber)}</span>
                </TableCell>
                <TableCell className="font-bold">{order.partner}</TableCell>
                <TableCell>
                  <div className="text-[10px] text-rosary/40 max-w-xs truncate uppercase tracking-widest">{order.products}</div>
                </TableCell>
                <TableCell className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(order.quantity)} {t('units.piece')}</TableCell>
                <TableCell className="font-mono text-xs font-black text-gold/60">{formatPersianCurrency(order.amount)}</TableCell>
                <TableCell>
                  <Badge className={cn(getStatusColor(order.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                    {t(`status.${order.status === 'processing' ? 'inprogress' : order.status}`)}
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
                        <DropdownMenuItem onClick={() => onViewOrder?.(order.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Eye className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('common.view')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit order', order.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Edit className="ml-2 h-4 w-4 text-gold" />
                          <span className="font-bold text-xs">{t('common.edit')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Print invoice', order.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Printer className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('common.print')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete order', order.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
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

        {mockOrders.filter(order => 
          (order.orderNumber.includes(searchTerm) || order.partner.includes(searchTerm)) &&
          (statusFilter === 'all' || order.status === statusFilter)
        ).length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-6">
            <Package className="h-16 w-16 text-white/5 mx-auto mb-4" />
            <p className="text-rosary/20 text-lg font-bold tracking-tight uppercase">{t('common.noResults')}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
