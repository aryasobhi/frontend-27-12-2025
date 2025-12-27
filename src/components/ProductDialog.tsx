// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Product } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: any) => void;
  product?: Product | null;
  mode: 'add' | 'edit';
}

export function ProductDialog({ open, onOpenChange, onSave, product, mode }: ProductDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: 0,
    cost: 0,
    stock: 0,
    reorderPoint: 0,
    status: 'active' as 'active' | 'discontinued',
    description: '',
  });

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        reorderPoint: product.reorderPoint,
        status: product.status,
        description: product.description || '',
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: 0,
        cost: 0,
        stock: 0,
        reorderPoint: 0,
        status: 'active',
        description: '',
      });
    }
  }, [product, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="sm:max-w-[600px] bg-damask border-white/20 text-rosary type-body" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('products.addProduct') : t('products.editProduct')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('products.subtitle') : t('products.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('common.name')}</Label>
                <Input
                  id="name"
                  placeholder="نام محصول را وارد کنید"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-rosary/80">{t('inventory.sku')}</Label>
                <Input
                  id="sku"
                  placeholder="PRD-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-rosary/80">{t('inventory.category')}</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="Sauces" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">سس‌ها</SelectItem>
                  <SelectItem value="Bakery" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">نانوایی</SelectItem>
                  <SelectItem value="Dairy" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">لبنیات</SelectItem>
                  <SelectItem value="Beverages" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">نوشیدنی‌ها</SelectItem>
                  <SelectItem value="Snacks" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">تنقلات</SelectItem>
                  <SelectItem value="Condiments" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">چاشنی‌ها</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-rosary/80">{t('common.price')} (تومان)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost" className="text-rosary/80">هزینه تمام شده (تومان)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.cost || ''}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-rosary/80">{t('inventory.quantity')}</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reorderPoint" className="text-rosary/80">{t('inventory.reorderLevel')}</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.reorderPoint || ''}
                  onChange={(e) => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-rosary/80">{t('common.status')}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="active" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.active')}</SelectItem>
                  <SelectItem value="discontinued" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">توقف تولید</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-rosary/80">توضیحات</Label>
              <Textarea
                id="description"
                placeholder="توضیحات محصول..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 min-h-[100px]"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('products.addProduct') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
