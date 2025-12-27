// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ShoppingBag, Plus, CheckCircle, Clock, FileText, MoreVertical, Edit, Trash2, ArrowRight, Eye, CreditCard, Filter, Package, Activity } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { PurchaseOrderForm } from '../components/PurchaseOrderForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
import { UniversalModuleTemplate } from './layout/UniversalModuleTemplate';
import { ModuleConfig } from '../types/module';
import { useModuleController } from '../hooks/useModuleController';

export function Purchasing() {
  const { t } = useTranslation();
  const { purchaseOrders, addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = useData();
  const [activeTab, setActiveTab] = useState('purchase-orders');
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingPO, setEditingPO] = useState<any>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const handleEdit = (po: any, openForm: () => void) => {
    setDialogMode('edit');
    setEditingPO(po);
    openForm();
  };

  const handleAddNew = (openForm: () => void) => {
    setDialogMode('add');
    setEditingPO(null);
    openForm();
  };

  const handleSave = (data: any, closeForm: () => void) => {
    if (dialogMode === 'add') {
      addPurchaseOrder(data);
    } else if (editingPO) {
      updatePurchaseOrder(editingPO.id, data);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    deletePurchaseOrder(id);
    setDeletingOrderId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'approved': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'ordered': return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      case 'received': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'invoiced': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'verified': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'stored': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
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

  const purchasingConfig: ModuleConfig = {
    id: 'purchasing',
    title: t('purchasing.title'),
    subtitle: t('purchasing.purchaseFlow'),
    iconName: 'ShoppingBag',
    primaryAction: { label: t('purchasing.newPO'), iconName: 'Plus' },
    filters: [
      { id: 'supplier', type: 'select', label: t('purchasing.supplier'), options: [
        { label: 'صنایع پک‌پرو', value: 's1' },
        { label: 'فولاد البرز', value: 's2' },
      ]},
      { id: 'status', type: 'select', label: t('status.status'), options: [
        { label: t('status.draft'), value: 'draft' },
        { label: t('status.approved'), value: 'approved' },
        { label: t('status.received'), value: 'received' },
      ]}
    ],
    columns: [
      { key: 'poNumber', label: t('purchasing.orderNumber'), type: 'text' },
      { key: 'supplier', label: t('purchasing.supplier'), type: 'text' },
      { key: 'orderDate', label: t('purchasing.orderDate'), type: 'text' },
      { key: 'totalAmount', label: t('purchasing.totalAmount'), type: 'currency' },
      { key: 'status', label: t('status.status'), type: 'badge' },
    ],
    formFields: [
      { id: 'supplier', label: t('purchasing.supplier'), type: 'select', colSpan: 1 },
      { id: 'orderNumber', label: t('purchasing.orderNumber'), type: 'text', colSpan: 1 },
      { id: 'totalAmount', label: t('purchasing.totalAmount'), type: 'number', colSpan: 1 },
      { id: 'status', label: t('status.status'), type: 'select', colSpan: 1 },
    ]
  };

  return (
    <UniversalModuleTemplate
      config={purchasingConfig}
      data={purchaseOrders}
      renderExtraContent={(controller) => (
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
              <TabsTrigger value="purchase-orders" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('nav.purchasing')}</TabsTrigger>
              <TabsTrigger value="receipts" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('purchasing.goodsReceipt')}</TabsTrigger>
              <TabsTrigger value="invoices" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('purchasing.supplierInvoices')}</TabsTrigger>
            </TabsList>

            <TabsContent value="purchase-orders" className="hidden" />

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

          <AlertDialog open={deletingOrderId !== null} onOpenChange={() => setDeletingOrderId(null)}>
            <AlertDialogContent className="bg-damask border-white/20 text-rosary type-body" dir="rtl">
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
      )}
      entryForm={{
        title: dialogMode === 'add' ? t('purchasing.createOrder') : t('purchasing.editOrder'),
        description: t('purchasing.subtitle'),
        render: (formController) => (
          <PurchaseOrderForm
            mode={dialogMode}
            purchaseOrder={editingPO}
            onSave={(data) => handleSave(data, formController.closeEntryForm)}
            onCancel={formController.closeEntryForm}
          />
        )
      }}
    />
  );
}
