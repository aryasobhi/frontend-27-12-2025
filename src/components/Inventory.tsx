// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Package, TrendingDown, AlertTriangle, Warehouse, Trash2, Edit, MoreVertical } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { UniversalModuleTemplate } from './layout/UniversalModuleTemplate';
import { ModuleConfig } from '../types/module';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
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

export function Inventory() {
  const { t } = useTranslation();
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useData();
  const [activeTab, setActiveTab] = useState('all');
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const inventoryConfig: ModuleConfig = {
    id: 'inventory',
    title: t('inventory.title'),
    subtitle: t('inventory.subtitle'),
    iconName: 'Package',
    primaryAction: { label: t('inventory.addItem'), iconName: 'Plus' },
    filters: [
      {
        id: 'category',
        type: 'select',
        label: t('inventory.category'),
        options: [
          { label: 'مواد اولیه', value: 'Raw Materials' },
          { label: 'بسته‌بندی', value: 'Packaging' },
          { label: 'کالای نهایی', value: 'Finished Goods' },
        ]
      }
    ],
    columns: [
      { key: 'name', label: t('inventory.itemName'), type: 'text' },
      { key: 'sku', label: t('inventory.itemCode'), type: 'text' },
      { key: 'category', label: t('inventory.category'), type: 'badge' },
      { key: 'location', label: t('inventory.location'), type: 'text' },
      { key: 'quantity', label: t('inventory.quantity'), type: 'text' },
      { key: 'status', label: t('table.status'), type: 'badge' },
    ],
    formFields: [
      { id: 'sku', label: t('inventory.itemCode'), type: 'text', colSpan: 1 },
      { id: 'name', label: t('inventory.itemName'), type: 'text', colSpan: 1 },
      { id: 'category', label: t('inventory.category'), type: 'select', colSpan: 1 },
      { id: 'unit', label: 'واحد شمارش', type: 'text', colSpan: 1 },
      { id: 'quantity', label: t('inventory.quantity'), type: 'number', colSpan: 1 },
      { id: 'reorderLevel', label: 'نقطه سفارش', type: 'number', colSpan: 1 },
      { id: 'description', label: 'توضیحات تکمیلی', type: 'textarea', colSpan: 2 },
    ]
  };

  const getItemStatus = (item: any): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const enrichedData = inventory.map(item => ({
    ...item,
    status: t(`status.${getItemStatus(item).replace('-', '')}`),
    quantity: `${toPersianNumber(item.quantity.toLocaleString())} ${item.unit}`
  }));

  const lowStockCount = inventory.filter(item => getItemStatus(item) === 'low-stock').length;
  const outOfStockCount = inventory.filter(item => getItemStatus(item) === 'out-of-stock').length;

  const handleDelete = (id: string) => {
    deleteInventoryItem(id);
    setDeletingItemId(null);
  };

  return (
    <UniversalModuleTemplate
      config={inventoryConfig}
      data={enrichedData}
      renderMainContent={(controller) => (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'کل اقلام', value: toPersianNumber(inventory.length), sub: 'کد کالا های ردیابی شده', icon: Package, color: 'text-gold' },
              { label: 'اقلام با موجودی کم', value: toPersianNumber(lowStockCount), sub: 'نیاز به سفارش مجدد', icon: TrendingDown, color: 'text-yellow-400' },
              { label: 'اتمام موجودی', value: toPersianNumber(outOfStockCount), sub: 'اقدام فوری', icon: AlertTriangle, color: 'text-blood' },
              { label: 'انبارها', value: toPersianNumber(new Set(inventory.map(i => i.location)).size), sub: 'محل های فعال', icon: Warehouse, color: 'text-green-400' },
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
            <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex-wrap h-auto">
              <TabsTrigger value="all" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="Raw Materials" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">مواد اولیه</TabsTrigger>
              <TabsTrigger value="Packaging" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">بسته‌بندی</TabsTrigger>
              <TabsTrigger value="Finished Goods" className="rounded-xl px-6 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">کالای نهایی</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
               {/* The template's auto-rendering logic will handle the table filtering by search query */}
               {/* But here we have custom tab filtering, so we might need to handle it in enrichedData */}
            </TabsContent>
          </Tabs>

          <AlertDialog open={deletingItemId !== null} onOpenChange={() => setDeletingItemId(null)}>
            <AlertDialogContent className="bg-damask border-white/10 text-rosary type-body" dir="rtl">
              <AlertDialogHeader className="text-right">
                <AlertDialogTitle className="text-gold tracking-tight font-black">آیا مطمئن هستید؟</AlertDialogTitle>
                <AlertDialogDescription className="text-rosary/60">
                  این عملیات غیرقابل بازگشت است و کالا برای همیشه از سیستم حذف خواهد شد.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row-reverse gap-3 mt-6">
                <AlertDialogAction
                  onClick={() => deletingItemId && handleDelete(deletingItemId)}
                  className="bg-blood hover:bg-blood/80 text-rosary border-none rounded-xl px-8"
                >
                  حذف کالا
                </AlertDialogAction>
                <AlertDialogCancel className="bg-white/5 border-white/10 text-rosary hover:bg-white/10 rounded-xl px-8">لغو</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    />
  );
}
