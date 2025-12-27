// @ts-nocheck
/*
  Status: SKELETON
  Reason: Supply chain summary is a UI mock/demo with static sample shipments and not wired to real adapter data.
  Allowed actions: authoring-only (safe to edit visuals or sample data; do not integrate into production flows)
*/

import { Card } from '../ui/card';
import { Truck, ShieldCheck, AlertCircle, Globe, MoreVertical, Eye, Edit, MapPin, Clock } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const mockShipments = [
  {
    id: '1',
    trackingNumber: 'TRK-45678',
    supplier: 'تامین کنندگان مزارع تازه',
    destination: 'انبار الف',
    items: 'مواد اولیه',
    quantity: 2400,
    status: 'in-transit',
    estimatedArrival: '2025-11-03',
    currentLocation: 'مرکز توزیع - تهران',
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
  }
];

export function SupplyChainSummary() {
  const { t } = useTranslation();

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
    <div className="p-0 space-y-8 mb-8" dir="rtl">
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

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-4 px-2">محموله‌های فعال</h3>
        {mockShipments.map((shipment) => (
          <Card key={shipment.id} className="group hover:border-gold/20 overflow-visible">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 text-right">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                    <Truck className="h-5 w-5 text-gold/40 group-hover:text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-black text-gold tracking-widest uppercase font-mono">{toPersianNumber(shipment.trackingNumber)}</h4>
                      <Badge className={cn(getStatusColor(shipment.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                        {t(`status.${shipment.status.replace('-', '')}`)}
                      </Badge>
                    </div>
                    <p className="text-xs text-rosary/40 font-bold">{shipment.items} - {toPersianNumber(shipment.quantity.toString())} واحد</p>
                  </div>
                </div>
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
                  <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{info.label}</p>
                  <div className="flex items-center gap-2 justify-end">
                    <span className={cn("text-[10px] font-bold", info.isMono ? "font-mono" : "font-vazir")}>{info.value}</span>
                    {info.icon && <info.icon className="h-3 w-3 text-gold/40" />}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
