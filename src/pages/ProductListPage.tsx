// @ts-nocheck
import { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { mockProducts } from '../data/mockProducts';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface ProductListPageProps {
  onViewProduct: (productId: string) => void;
}

export function ProductListPage({ onViewProduct }: ProductListPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  // Category translations
  const categoryTranslations: Record<string, string> = {
    'all': t('common.all'),
    'Ingredients': 'مواد اولیه',
    'Packaging': 'بسته‌بندی',
    'Finished Goods': 'کالای نهایی',
    'Equipment': 'تجهیزات',
  };

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('products.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('products.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 ml-2" />
            {t('common.import')}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            {t('products.addProduct')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rosary/40 w-4 h-4" />
            <Input
              placeholder={t('common.search')}
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('products.category')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {categoryTranslations[category] || category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            {t('common.filters')}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">کل محصولات</p>
          <p className="text-3xl mt-2 font-bold text-gold">{toPersianNumber(mockProducts.length)}</p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">محصولات فعال</p>
          <p className="text-3xl mt-2 font-bold text-gold">
            {toPersianNumber(mockProducts.filter(p => p.status === 'active').length)}
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">ارزش کل موجودی</p>
          <p className="text-3xl mt-2 font-bold text-gold">
            {toPersianNumber(mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString())} تومان
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">{t('status.lowStock')}</p>
          <p className="text-3xl mt-2 font-bold text-blood">
            {toPersianNumber(mockProducts.filter(p => p.stock < p.reorderPoint).length)}
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('empty.noProducts')}
            description={t('empty.noResults')}
          />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('products.productName')}</TableHead>
                <TableHead>{t('products.sku')}</TableHead>
                <TableHead>{t('products.category')}</TableHead>
                <TableHead>{t('products.price')}</TableHead>
                <TableHead>{t('products.stock')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell>
                    <div>
                      <p className="font-medium text-rosary group-hover:text-gold transition-colors">{product.name}</p>
                      <p className="text-sm text-rosary/50">{product.description?.substring(0, 50)}...</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{product.sku}</TableCell>
                  <TableCell className="text-rosary/80">{categoryTranslations[product.category] || product.category}</TableCell>
                  <TableCell className="text-rosary">{toPersianNumber(product.price.toFixed(2))} تومان</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-rosary">{toPersianNumber(product.stock)}</span>
                      {product.stock < product.reorderPoint && (
                        <StatusBadge status={t('status.lowStock')} className="bg-error/20 text-error border-error/30" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status === 'active' ? t('status.active') : t('status.inactive')} />
                  </TableCell>
                  <TableCell className="text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('table.actions')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewProduct(product.id)}>
                          <Eye className="w-4 h-4 ml-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-error hover:bg-error/20">
                          <Trash2 className="w-4 h-4 ml-2" />
                          {t('common.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
