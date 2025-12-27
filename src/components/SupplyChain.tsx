// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Truck, Package, MapPin, Clock, CheckCircle, AlertCircle, Search, Activity, Globe, ShieldCheck, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Shipment {
  id: string;
  trackingNumber: string;
  supplier: string;
  destination: string;
  items: string;
  quantity: number;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  estimatedArrival: string;
  currentLocation: string;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TRK-45678',
    supplier: 'تامین کنندگان مزارع تازه',
    destination: 'انبار الف',
    items: 'مواد اولیه',
    quantity: 2400,
    status: 'in-transit',
    estimatedArrival: '2025-11-03',
    currentLocation: 'مرکز توزیع - شیکاگو',
  },
  {
    id: '2',
    trackingNumber: 'TRK-45679',
    supplier: 'صنایع پک‌پرو',
    destination: 'انبار ب',
    items: 'مواد بسته‌بندی',
    quantity: 5000,
    status: 'delivered',
    estimatedArrival: '2025-11-02',
    currentLocation: 'انبار ب',
  },
  {
    id: '3',
    trackingNumber: 'TRK-45680',
    supplier: 'واردات مدیترانه‌ای',
    destination: 'انبار ج',
    items: 'ترکیبات خاص',
    quantity: 850,
    status: 'delayed',
    estimatedArrival: '2025-11-05',
    currentLocation: 'بندر ورودی - گمرک',
  },
];

const suppliers = [
  { name: 'تامین کنندگان مزارع تازه', status: 'active', deliveries: 45, onTime: 96, rating: 4.8 },
  { name: 'صنایع پک‌پرو', status: 'active', deliveries: 38, onTime: 92, rating: 4.6 },
  { name: 'واردات مدیترانه‌ای', status: 'active', deliveries: 28, onTime: 88, rating: 4.4 },
  { name: 'مزارع دره سبز', status: 'active', deliveries: 52, onTime: 98, rating: 4.9 },
];

export function SupplyChain() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'delivered': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'delayed': return 'bg-blood/20 text-blood border border-blood/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary font-vazir" dir="rtl">
      <PageHeader 
        title={t('supplyChain.title')}
        subtitle={t('supplyChain.subtitle')}
        action={{
          label: t('supplyChain.newShipment'),
          icon: Truck,
          onClick: () => console.log('New Shipment clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('supplyChain.stats.activeShipments'), value: toPersianNumber('۲۸'), sub: 'در حال حمل', icon: Truck, color: 'text-gold' },
          { label: t('supplyChain.stats.onTimeDelivery'), value: '۹۴.۵٪', sub: 'بالاتر از هدف', icon: ShieldCheck, color: 'text-green-400' },
          { label: t('supplyChain.stats.delayedShipments'), value: toPersianNumber('۳'), sub: 'نیاز به توجه', icon: AlertCircle, color: 'text-blood' },
          { label: t('supplyChain.stats.activeSuppliers'), value: toPersianNumber('۴۵'), sub: 'شرکای تایید شده', icon: Globe, color: 'text-gold' },
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

      <div className="grid grid-cols-1 gap-8">
        <Card title={t('supplyChain.activeShipments')} collapsible>
          <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('common.search')}
            className="mb-6 !p-0 border-none bg-transparent"
          />
          
          <div className="space-y-4">
            {mockShipments.filter(s => s.trackingNumber.includes(searchTerm) || s.supplier.includes(searchTerm)).map((shipment) => (
              <div key={shipment.id} className="group border border-white/5 rounded-2xl p-6 bg-white/5 hover:bg-white/10 hover:border-gold/20 transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                      <Truck className="h-7 w-7 text-gold/40 group-hover:text-gold" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-lg font-black text-gold tracking-widest uppercase">{toPersianNumber(shipment.trackingNumber)}</span>
                        <Badge className={cn(getStatusColor(shipment.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                          {t(`status.${shipment.status.replace('-', '')}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-rosary/50 font-bold tracking-tight">{shipment.items}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-white/5 h-9 w-9 text-gold">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                      <DropdownMenuItem onClick={() => console.log('Track shipment', shipment.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Truck className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">{t('supplyChain.track')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Edit shipment', shipment.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Edit className="ml-2 h-4 w-4 text-gold" />
                        <span className="font-bold text-xs">{t('common.edit')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-white/5">
                  {[
                    { label: t('supplyChain.supplier'), value: shipment.supplier },
                    { label: t('supplyChain.destination'), value: shipment.destination, icon: MapPin },
                    { label: t('supplyChain.currentLocation'), value: shipment.currentLocation },
                    { label: t('supplyChain.estArrival'), value: toPersianNumber(new Date(shipment.estimatedArrival).toLocaleDateString('fa-IR')), icon: Clock, isMono: true },
                  ].map((info, i) => (
                    <div key={i} className="text-right">
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-2">{info.label}</p>
                      <div className="flex items-center gap-2 justify-end">
                        <span className={cn("text-xs font-bold", info.isMono ? "font-mono" : "font-vazir")}>{info.value}</span>
                        {info.icon && <info.icon className="h-3.5 w-3.5 text-gold/40" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('supplyChain.supplierPerformance')} collapsible>
          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableHead>{t('supplyChain.supplier')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead>{t('supplyChain.totalDeliveries')}</TableHead>
                <TableHead>{t('supplyChain.onTimeRate')}</TableHead>
                <TableHead>{t('supplyChain.rating')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier, index) => (
                <TableRow key={index}>
                  <TableCell className="font-bold text-rosary group-hover:text-gold transition-colors">{supplier.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-400/20 text-green-400 border-none rounded-full px-4 font-bold text-[10px] uppercase">
                      {t(`status.${supplier.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(supplier.deliveries)}</span>
                  </TableCell>
                  <TableCell>
                    <span className={cn("font-mono text-xs font-black", supplier.onTime >= 95 ? 'text-green-400' : supplier.onTime >= 90 ? 'text-yellow-400' : 'text-blood')}>
                      {toPersianNumber(supplier.onTime)}٪
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-black">
                      <span className="text-gold">★</span>
                      <span className="text-rosary">{toPersianNumber(supplier.rating)}</span>
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
                          <DropdownMenuItem onClick={() => console.log('Supplier details', supplier.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Eye className="ml-2 h-4 w-4 text-gold/40" />
                            <span className="font-bold text-xs">{t('common.details')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Edit supplier', supplier.name)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
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
    </div>
  );
}
