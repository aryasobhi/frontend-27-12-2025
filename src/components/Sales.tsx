// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ShoppingCart, Plus, Truck, FileText, DollarSign, CheckCircle, MoreVertical, Edit, Trash2, Search, Activity, Package, ArrowRight } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { SalesOrderDialog } from '../components/SalesOrderDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export function Sales() {
  const { t } = useTranslation();
  const { salesOrders, addSalesOrder, updateSalesOrder, deleteSalesOrder } = useData();
  const [activeTab, setActiveTab] = useState('sales-orders');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingSalesOrder, setEditingSalesOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const handleAddNew = () => {
    setDialogMode('add');
    setEditingSalesOrder(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (order: any) => {
    setDialogMode('edit');
    setEditingSalesOrder(order);
    setIsDialogOpen(true);
  };

  const handleSave = (data: any) => {
    if (dialogMode === 'add') {
      addSalesOrder(data);
    } else if (editingSalesOrder) {
      updateSalesOrder(editingSalesOrder.id, data);
    }
  };

  const handleDelete = (id: string) => {
    deleteSalesOrder(id);
    setDeletingOrderId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'confirmed': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'picked': return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      case 'delivered': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'invoiced': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  // Calculate KPIs
  const openOrders = salesOrders.filter(so => so.status !== 'invoiced' && so.status !== 'delivered').length;
  const totalValue = salesOrders.reduce((sum, so) => sum + so.totalAmount, 0);
  const deliveredOrders = salesOrders.filter(so => so.status === 'delivered').length;

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('sales.title')}
        subtitle={t('sales.salesFlow')}
        action={{
          label: t('sales.newSO'),
          icon: Plus,
          onClick: handleAddNew,
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('sales.openOrders'), value: toPersianNumber(openOrders.toString()), sub: `مبلغ ${toPersianNumber(totalValue.toLocaleString())} ${t('units.toman')}`, icon: ShoppingCart, color: 'text-gold' },
          { label: t('sales.pendingDeliveries'), value: toPersianNumber('۱۵'), sub: 'آماده ارسال', icon: Truck, color: 'text-gold' },
          { label: t('sales.deliveredMonth'), value: toPersianNumber(deliveredOrders.toString()), sub: `${toPersianNumber('۹۶')}٪ به موقع`, icon: CheckCircle, color: 'text-green-400' },
          { label: t('sales.revenueMonth'), value: '۱۹۸ م.ت', sub: '۱۵٪+ نسبت به ماه قبل', icon: DollarSign, color: 'text-gold' },
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="sales-orders" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('nav.sales')}</TabsTrigger>
          <TabsTrigger value="deliveries" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('sales.deliveries')}</TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('sales.customerInvoices')}</TabsTrigger>
        </TabsList>

        <TabsContent value="sales-orders" className="space-y-8">
          <Card title={t('nav.sales')} collapsible>
            <FilterBar 
              onSearch={setSearchTerm} 
              searchPlaceholder={t('common.search')}
              className="mb-6 !p-0 border-none bg-transparent"
            />

            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('sales.orderNumber')}</TableHead>
                  <TableHead>{t('sales.customer')}</TableHead>
                  <TableHead>{t('sales.orderItems')}</TableHead>
                  <TableHead>{t('sales.totalAmount')}</TableHead>
                  <TableHead>{t('sales.orderDate')}</TableHead>
                  <TableHead>{t('status.status')}</TableHead>
                  <TableHead className="text-left">{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.filter(so => so.soNumber.includes(searchTerm) || so.customer.includes(searchTerm)).map((so) => (
                  <TableRow key={so.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-rosary group-hover:text-gold transition-colors tracking-widest">
                        {toPersianNumber(so.soNumber)}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold">{so.customer}</TableCell>
                    <TableCell>
                      <div className="text-[10px] font-bold text-rosary/60">
                        {toPersianNumber(so.items.length.toString())} قلم کالا
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-black text-gold/60">
                      {toPersianNumber(so.totalAmount.toLocaleString())} <span className="text-[10px] text-rosary/30 font-vazir mr-1">{t('units.toman')}</span>
                    </TableCell>
                    <TableCell className="text-xs text-rosary/60 font-medium">
                      {toPersianNumber(new Date(so.orderDate).toLocaleDateString('fa-IR'))}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(so.status), "rounded-full px-4 border-none text-[10px] font-bold")}>
                        {t(`status.${so.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:text-gold hover:bg-white/5">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir">
                          <DropdownMenuItem onClick={() => handleEdit(so)} className="hover:bg-white/5 cursor-pointer">
                            <Edit className="ml-2 h-4 w-4 text-gold" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingOrderId(so.id)} className="hover:bg-blood/10 text-blood cursor-pointer">
                            <Trash2 className="ml-2 h-4 w-4" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>

          {/* Transaction Flow */}
          <Card title={t('sales.transactionFlow')} collapsible>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8">
                {[
                  { step: '۱', title: t('sales.createOrder'), icon: ShoppingCart },
                  { step: '۲', title: t('sales.pickDeliver'), icon: Truck },
                  { step: '۳', title: t('sales.createInvoice'), icon: FileText },
                  { step: '۴', title: t('accounting.automaticPosting'), icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500 mb-4 relative z-10">
                        <item.icon className="h-8 w-8 text-gold/40 group-hover:text-gold" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-damask rounded-full text-[10px] font-black flex items-center justify-center shadow-lg">
                          {toPersianNumber(item.step)}
                        </div>
                      </div>
                      <h4 className="text-xs font-black text-gold/60 uppercase tracking-widest group-hover:text-gold transition-colors">{item.title}</h4>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-8 left-[-10px] w-full h-[2px] bg-gradient-to-l from-transparent via-gold/10 to-transparent">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <ArrowRight className="h-3 w-3 text-gold/20" />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
             <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-dashed border-white/10 text-center">
                <p className="text-gold/60 text-xs font-bold font-vazir tracking-tight leading-relaxed">
                  ✓ کاهش خودکار موجودی کالا • ✓ شناسایی هوشمند درآمد • ✓ محاسبه در لحظه سود و زیان
                </p>
             </div>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Truck className="h-20 w-20 text-rosary/10 mx-auto mb-6" />
            <p className="text-rosary/30 text-xl font-medium">{t('sales.deliveries')}</p>
            <p className="text-rosary/20 text-sm mt-3">این بخش به زودی فعال خواهد شد</p>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FileText className="h-20 w-20 text-rosary/10 mx-auto mb-6" />
            <p className="text-rosary/30 text-xl font-medium">{t('sales.customerInvoices')}</p>
            <p className="text-rosary/20 text-sm mt-3">این بخش به زودی فعال خواهد شد</p>
          </div>
        </TabsContent>
      </Tabs>

      <SalesOrderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        salesOrder={editingSalesOrder}
        onSave={handleSave}
      />

      <AlertDialog open={deletingOrderId !== null} onOpenChange={() => setDeletingOrderId(null)}>
        <AlertDialogContent className="bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold text-xl font-black">{t('common.confirm')}</AlertDialogTitle>
            <AlertDialogDescription className="text-rosary/60 font-medium">
              {t('messages.confirmDelete')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="bg-white/5 border-white/10 text-rosary hover:bg-white/10 rounded-xl px-8 h-12">{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingOrderId && handleDelete(deletingOrderId)}
              className="bg-blood hover:bg-blood/80 text-rosary shadow-glow-blood border border-white/10 rounded-xl px-8 h-12"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
