// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { InventoryItem } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface InventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: any) => void;
  item?: InventoryItem | null;
  mode: 'add' | 'edit';
}

export function InventoryDialog({ open, onOpenChange, onSave, item, mode }: InventoryDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    unit: '',
    location: '',
    reorderLevel: 0,
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (item && mode === 'edit') {
      setFormData({
        name: item.name,
        sku: item.sku,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        location: item.location,
        reorderLevel: item.reorderLevel,
        lastUpdated: item.lastUpdated,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        sku: '',
        category: '',
        quantity: 0,
        unit: '',
        location: '',
        reorderLevel: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    }
  }, [item, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="sm:max-w-[600px] bg-damask border-white/20 text-rosary type-body" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('inventory.addItem') : t('inventory.editItem')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('inventory.subtitle') : t('inventory.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('inventory.itemName')}</Label>
                <Input
                  id="name"
                  placeholder="نام کالا را وارد کنید"
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
                  placeholder="RAW-001"
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
                  <SelectValue placeholder={t('inventory.category')} />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="Raw Materials" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">مواد اولیه</SelectItem>
                  <SelectItem value="Packaging" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بسته‌بندی</SelectItem>
                  <SelectItem value="Finished Goods" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">کالای نهایی</SelectItem>
                  <SelectItem value="Supplies" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">ملزومات</SelectItem>
                  <SelectItem value="Equipment" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">تجهیزات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-rosary/80">{t('inventory.quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit" className="text-rosary/80">{t('inventory.unit')}</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="kg" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">کیلوگرم (kg)</SelectItem>
                    <SelectItem value="L" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">لیتر (L)</SelectItem>
                    <SelectItem value="units" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">عدد (units)</SelectItem>
                    <SelectItem value="boxes" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">جعبه (boxes)</SelectItem>
                    <SelectItem value="pallets" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">پالت (pallets)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-rosary/80">{t('inventory.location')}</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="Warehouse A" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">انبار آ</SelectItem>
                    <SelectItem value="Warehouse B" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">انبار ب</SelectItem>
                    <SelectItem value="Cold Storage" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">سردخانه</SelectItem>
                    <SelectItem value="Main Storage" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">انبار اصلی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reorderLevel" className="text-rosary/80">{t('inventory.reorderLevel')}</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('0')}
                  value={formData.reorderLevel || ''}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('inventory.addItem') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
