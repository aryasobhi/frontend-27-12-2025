// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Ship, Package, MapPin, Truck, Clock, Search, Activity, Box, Anchor, MoreVertical, Edit, Trash2 } from 'lucide-react';
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
  shipmentNumber: string;
  customer: string;
  destination: string;
  items: number;
  weight: number;
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  estimatedDelivery: string;
  status: 'preparing' | 'shipped' | 'in-transit' | 'delivered';
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    shipmentNumber: 'SHP-2024-3001',
    customer: 'توزیع کنندگان دره سبز',
    destination: 'لس آنجلس، کالیفرنیا',
    items: 245,
    weight: 1200,
    carrier: 'فدکس فریت',
    trackingNumber: 'FX-789456123',
    shipDate: '2025-11-01',
    estimatedDelivery: '2025-11-04',
    status: 'in-transit',
  },
  {
    id: '2',
    shipmentNumber: 'SHP-2024-3002',
    customer: 'شرکت بازار تازه',
    destination: 'نیویورک، نیویورک',
    items: 189,
    weight: 950,
    carrier: 'یو‌پی‌اس فریت',
    trackingNumber: 'UPS-456789012',
    shipDate: '2025-11-02',
    estimatedDelivery: '2025-11-05',
    status: 'preparing',
  },
  {
    id: '3',
    shipmentNumber: 'SHP-2024-3003',
    customer: 'غذاهای ارگانیک لیمیتد',
    destination: 'شیکاگو، ایلینوی',
    items: 312,
    weight: 1580,
    carrier: 'دی‌اچ‌ال اکسپرس',
    trackingNumber: 'DHL-321654987',
    shipDate: '2025-10-30',
    estimatedDelivery: '2025-11-02',
    status: 'delivered',
  },
];

export function Shipping() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'shipped': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'in-transit': return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      case 'delivered': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('shipping.title')}
        subtitle={t('shipping.subtitle')}
        action={{
          label: t('shipping.createShipment'),
          icon: Ship,
          onClick: () => console.log('Create Shipment clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('shipping.activeShipments'), value: toPersianNumber('۴۵'), sub: 'در حال پردازش', icon: Truck, color: 'text-gold' },
          { label: t('shipping.preparing'), value: toPersianNumber('۱۸'), sub: 'آماده ارسال', icon: Box, color: 'text-gold' },
          { label: t('shipping.deliveredWeek'), value: toPersianNumber('۱۲۸'), sub: `${toPersianNumber('۹۸')}٪ به‌موقع`, icon: Ship, color: 'text-green-400' },
          { label: t('shipping.avgDeliveryTime'), value: `۳.۲ ${t('units.day')}`, sub: `${toPersianNumber('۰.۵')} روز بهبود`, icon: Clock, color: 'text-gold' },
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

      <Card title={t('shipping.activeShipments')} collapsible>
        <FilterBar 
          onSearch={setSearchTerm} 
          searchPlaceholder={t('common.search')}
          className="mb-6 !p-0 border-none bg-transparent"
        />

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('shipping.shipmentNumber')}</TableHead>
              <TableHead>{t('crm.customer')}</TableHead>
              <TableHead>{t('shipping.destination')}</TableHead>
              <TableHead>{t('shipping.itemsWeight')}</TableHead>
              <TableHead>{t('shipping.carrier')}</TableHead>
              <TableHead>{t('status.status')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShipments.filter(s => s.shipmentNumber.includes(searchTerm) || s.customer.includes(searchTerm)).map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>
                  <span className="font-mono text-xs font-black text-rosary group-hover:text-gold transition-colors tracking-widest uppercase">
                    {toPersianNumber(shipment.shipmentNumber)}
                  </span>
                </TableCell>
                <TableCell className="font-bold">{shipment.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs text-rosary/60 font-medium">{shipment.destination}</span>
                    <MapPin className="h-3 w-3 text-gold/40" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-[10px] font-bold">
                    <div className="text-rosary">{toPersianNumber(shipment.items)} قلم</div>
                    <div className="text-rosary/30 font-mono tracking-tighter">{toPersianNumber(shipment.weight)} کیلوگرم</div>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="space-y-1">
                      <div className="text-xs font-bold">{shipment.carrier}</div>
                      <code className="text-[9px] bg-white/5 px-2 py-0.5 rounded font-mono text-gold/60 border border-white/5">
                        {shipment.trackingNumber}
                      </code>
                   </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(getStatusColor(shipment.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                    {t(`status.${shipment.status.replace('-', '')}`)}
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
                        <DropdownMenuItem onClick={() => console.log('Track shipment', shipment.shipmentNumber)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Truck className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('shipping.track')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit shipment', shipment.shipmentNumber)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Edit className="ml-2 h-4 w-4 text-gold" />
                          <span className="font-bold text-xs">{t('common.edit')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete shipment', shipment.shipmentNumber)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
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

      <Card title={t('shipping.carrierPerformance')} collapsible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'فدکس فریت', shipments: 45, onTime: 98, cost: 150 },
            { name: 'یو‌پی‌اس فریت', shipments: 55, onTime: 97, cost: 170 },
            { name: 'دی‌اچ‌ال اکسپرس', shipments: 65, onTime: 96, cost: 190 },
          ].map((carrier, index) => (
            <div key={index} className="group border border-white/5 rounded-2xl p-6 bg-white/5 hover:bg-white/10 hover:border-gold/20 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                  <Truck className="h-6 w-6 text-gold/40 group-hover:text-gold" />
                </div>
                <h4 className="text-md font-black text-rosary group-hover:text-gold transition-colors">{carrier.name}</h4>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5 text-right font-vazir">
                {[
                  { label: 'کل محموله‌ها', value: toPersianNumber(carrier.shipments), isMono: true },
                  { label: 'تحویل به‌موقع', value: `${toPersianNumber(carrier.onTime)}٪`, isMono: true, color: 'text-green-400' },
                  { label: 'میانگین هزینه', value: `${toPersianNumber(carrier.cost)} ${t('units.toman')}`, isMono: true },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <span className="text-rosary/40 font-bold uppercase tracking-widest">{stat.label}</span>
                    <span className={cn("font-black", stat.isMono ? "font-mono" : "font-vazir", stat.color || "text-rosary")}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
