// @ts-nocheck
import { useState } from 'react';
import { Search, Filter, Download, Package, Eye, AlertTriangle, CheckCircle, Box } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { EmptyState } from '../widgets/EmptyState';
import { useProducts } from '../data/useMockData';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface InventoryListPageProps {
  onViewItem?: (productId: string) => void;
}

export function InventoryListPage({ onViewItem }: InventoryListPageProps) {
  const { t } = useTranslation();
  const { products } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => (
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  ));

  const totalItems = products.length;
  const activeItems = products.filter(p => p.status === 'active').length;
  const totalValue = products.reduce((s, p) => s + (p.stock * p.price), 0);
  const lowStockItems = products.filter(p => p.stock < (p.reorderPoint ?? 0)).length;

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('inventory.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('inventory.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            {t('common.filters')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold/20 rounded-lg border border-gold/30">
              <Box className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">کل اقلام</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(totalItems)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg border border-success/30">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">اقلام فعال</p>
              <p className="text-2xl font-bold text-success">{toPersianNumber(activeItems)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <Package className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">ارزش کل موجودی</p>
              <p className="text-2xl font-bold text-rosary">{formatPersianCurrency(totalValue)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-error/20 rounded-lg border border-error/30">
              <AlertTriangle className="w-6 h-6 text-error" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('status.lowStock')}</p>
              <p className="text-2xl font-bold text-error">{toPersianNumber(lowStockItems)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rosary/40 w-4 h-4" />
            <Input 
              placeholder={t('common.search')} 
              className="pr-10"
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
            <Package className="w-5 h-5 text-gold" />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title={t('empty.noRecords')} description={t('empty.noResults')} />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('inventory.itemName')}</TableHead>
                <TableHead>{t('inventory.itemCode')}</TableHead>
                <TableHead>{t('products.category')}</TableHead>
                <TableHead>{t('inventory.quantity')}</TableHead>
                <TableHead>{t('inventory.reorderLevel')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => {
                const isLowStock = product.stock < (product.reorderPoint ?? 0);
                return (
                  <TableRow key={product.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                    <TableCell className="font-medium text-rosary group-hover:text-gold transition-colors">{product.name}</TableCell>
                    <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{product.sku}</TableCell>
                    <TableCell className="text-rosary/80">{product.category}</TableCell>
                    <TableCell>
                      <span className={isLowStock ? 'text-error font-medium' : 'text-rosary'}>
                        {toPersianNumber(product.stock)}
                      </span>
                    </TableCell>
                    <TableCell className="text-rosary/70">{toPersianNumber(product.reorderPoint ?? 0)}</TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge variant="error">{t('status.lowStock')}</Badge>
                      ) : (
                        <Badge variant="success">{t('status.inStock')}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="sm" onClick={() => onViewItem?.(product.id)}>
                        <Eye className="w-4 h-4 ml-1" />
                        {t('common.view')}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
