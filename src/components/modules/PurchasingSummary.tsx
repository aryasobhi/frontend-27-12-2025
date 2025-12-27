// @ts-nocheck
/*
  Status: SKELETON
  Reason: Summary UI present but relies on local DataContext/mock data rather than a pluggable module contract.
  Allowed actions: authoring-only
*/

import React from 'react';
import { Card } from '../ui/card';
import { ShoppingBag, Clock, CheckCircle, FileText, MoreVertical, Eye } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/TableContainer';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface PurchasingSummaryProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PurchasingSummary({ activeTab, onTabChange }: PurchasingSummaryProps) {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  const mockReceipts = [
    {
      id: '1',
      receiptNumber: 'RCP-2024-1001',
      poNumber: 'PO-2024-6002',
      supplier: 'صنایع پک‌پرو',
      receivedDate: '2025-11-02',
      receivedBy: 'جان مارتینز',
      status: 'verified',
    },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('purchasing.openPOs'), value: toPersianNumber('۲۴'), sub: `۱۸۶ هزار ${t('units.toman')}`, icon: ShoppingBag, color: 'text-gold' },
          { label: t('purchasing.pendingReceipts'), value: toPersianNumber('۸'), sub: 'نیاز به تایید', icon: Clock, color: 'text-gold' },
          { label: t('purchasing.receivedMonth'), value: toPersianNumber('۴۵'), sub: `${toPersianNumber('۹۸')}٪ دقت`, icon: CheckCircle, color: 'text-green-400' },
          { label: t('purchasing.pendingInvoices'), value: '۳۲ م.ت', sub: `${toPersianNumber('۱۲')} فاکتور`, icon: FileText, color: 'text-blood' },
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

      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="purchase-orders" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('nav.purchasing')}</TabsTrigger>
          <TabsTrigger value="receipts" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('purchasing.goodsReceipt')}</TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('purchasing.supplierInvoices')}</TabsTrigger>
        </TabsList>

        <TabsContent value="purchase-orders" className="p-12 text-center text-rosary/20">
           <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-10" />
           <p>لیست سفارشات خرید در جدول زیر نمایش داده می‌شود.</p>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-6">
          <Card title={t('purchasing.goodsReceipt')} collapsible>
            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>شماره رسید</TableHead>
                  <TableHead>{t('purchasing.orderNumber')}</TableHead>
                  <TableHead>{t('purchasing.supplier')}</TableHead>
                  <TableHead>تاریخ دریافت</TableHead>
                  <TableHead>{t('status.status')}</TableHead>
                  <TableHead className="text-left">{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(receipt.receiptNumber)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-rosary/60 tracking-widest uppercase">{toPersianNumber(receipt.poNumber)}</span>
                    </TableCell>
                    <TableCell className="font-bold">{receipt.supplier}</TableCell>
                    <TableCell className="text-xs text-rosary/60 font-medium">
                      {toPersianNumber(new Date(receipt.receivedDate).toLocaleDateString('fa-IR'))}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(receipt.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                        {t(`status.${receipt.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:text-gold hover:bg-white/5 h-8 w-8 text-gold">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                          <DropdownMenuItem onClick={() => console.log('View receipt', receipt.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Eye className="ml-2 h-4 w-4 text-gold/40" />
                            <span className="font-bold text-xs">{t('common.view')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FileText className="h-20 w-20 text-rosary/10 mx-auto mb-6" />
            <p className="text-rosary/30 text-xl font-medium">{t('purchasing.supplierInvoices')}</p>
            <p className="text-rosary/20 text-sm mt-3">{t('common.comingSoon')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
