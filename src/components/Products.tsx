// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Plus, Edit, Trash2, Package, TrendingUp, AlertTriangle, CheckCircle, Boxes, MoreVertical } from 'lucide-react';
import { ProductDialog } from '../components/ProductDialog';
import { useData, Product } from '../context/DataContext';
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

export function Products() {
  const { t } = useTranslation();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAdd = () => {
    setDialogMode('add');
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setDialogMode('edit');
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSave = (productData: any) => {
    if (dialogMode === 'add') {
      addProduct(productData);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeletingProductId(null);
  };

  const getStockStatus = (product: Product): 'available' | 'low-stock' | 'out-of-stock' => {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= product.reorderPoint) return 'low-stock';
    return 'available';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'low-stock': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'out-of-stock': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('products.title')}
        subtitle={t('products.manageProducts')}
        action={{
          label: t('products.addProduct'),
          icon: Plus,
          onClick: handleAdd,
        }}
      />

      <Card title={t('products.title')} collapsible>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('products.searchPlaceholder')}
            className="flex-1 !p-0 border-none bg-transparent"
          />
          <div className="flex gap-2 flex-wrap bg-white/5 p-1 rounded-xl h-10 border border-white/10 overflow-x-auto">
            {categories.map(category => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-lg transition-all duration-300 text-[10px] font-black uppercase tracking-widest px-6",
                  categoryFilter === category ? 'bg-gold text-damask shadow-glow-gold' : 'text-rosary hover:bg-white/10'
                )}
                onClick={() => setCategoryFilter(category)}
              >
                {category === 'all' ? t('common.all') : category}
              </Button>
            ))}
          </div>
        </div>

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.product')}</TableHead>
              <TableHead>{t('table.sku')}</TableHead>
              <TableHead>{t('table.category')}</TableHead>
              <TableHead>{t('table.price')}</TableHead>
              <TableHead>{t('table.stock')}</TableHead>
              <TableHead>{t('table.status')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const status = getStockStatus(product);
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-4 text-right">
                      <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                        <Boxes className="h-5 w-5 text-gold/40" />
                      </div>
                      <div>
                        <div className="font-black text-rose-50/90 group-hover:text-gold transition-colors">{product.name}</div>
                        {product.description && (
                          <div className="text-[10px] text-rosary/30 mt-1 max-w-[200px] truncate">{product.description}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(product.sku)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/10 text-rosary/40 bg-white/5 text-[10px] uppercase font-bold tracking-widest px-3">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-black text-rosary/80">{toPersianNumber(product.price.toLocaleString())} <span className="text-[10px] font-vazir text-rosary/30">{t('units.toman')}</span></TableCell>
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(product.stock.toString())}</span>
                      <span className="text-[8px] font-bold text-rosary/20 uppercase tracking-tighter">حداقل: {toPersianNumber(product.reorderPoint.toString())}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusColor(status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                      {t(`status.${status.replace('-', '')}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:text-gold hover:bg-white/5 h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                          <DropdownMenuItem onClick={() => handleEdit(product)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Edit className="ml-2 h-4 w-4 text-gold" />
                            <span className="font-bold text-xs">{t('common.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingProductId(product.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                            <Trash2 className="ml-2 h-4 w-4" />
                            <span className="font-bold text-xs">{t('common.delete')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-6">
            <Package className="h-16 w-16 text-white/5 mx-auto mb-4" />
            <p className="text-rosary/20 text-lg font-bold tracking-tight uppercase">{t('common.noResults')}</p>
          </div>
        )}
      </Card>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        product={editingProduct}
        mode={dialogMode}
      />

      <AlertDialog open={deletingProductId !== null} onOpenChange={() => setDeletingProductId(null)}>
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
              onClick={() => deletingProductId && handleDelete(deletingProductId)}
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
