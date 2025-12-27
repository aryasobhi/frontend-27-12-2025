// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Warehouse } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface WarehouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (warehouse: any) => void;
  warehouse?: Warehouse | null;
  mode: 'add' | 'edit';
}

export function WarehouseDialog({ open, onOpenChange, onSave, warehouse, mode }: WarehouseDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    type: '',
    capacity: 0,
    currentUtilization: 0,
    status: 'active' as 'active' | 'inactive',
    manager: '',
  });

  useEffect(() => {
    if (warehouse && mode === 'edit') {
      setFormData({
        name: warehouse.name,
        code: warehouse.code,
        location: warehouse.location,
        type: warehouse.type,
        capacity: warehouse.capacity,
        currentUtilization: warehouse.currentUtilization,
        status: warehouse.status,
        manager: warehouse.manager,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `WH-${Date.now()}`,
        location: '',
        type: '',
        capacity: 0,
        currentUtilization: 0,
        status: 'active',
        manager: '',
      });
    }
  }, [warehouse, mode, open]);

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
            {mode === 'add' ? t('warehouses.addWarehouse') : t('warehouses.editWarehouse')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('warehouses.subtitle') : t('warehouses.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('warehouses.name')}</Label>
                <Input
                  id="name"
                  placeholder="انبار مرکزی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-rosary/80">{t('warehouses.code')}</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-rosary/80">{t('warehouses.location')}</Label>
              <Input
                id="location"
                placeholder="خیابان صنعتی ۱۲۳، شهر، استان"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-rosary/80">{t('warehouses.type')}</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="Raw Materials" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">مواد اولیه</SelectItem>
                    <SelectItem value="Finished Goods" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">کالای نهایی</SelectItem>
                    <SelectItem value="Packaging" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بسته‌بندی</SelectItem>
                    <SelectItem value="Cold Storage" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">سردخانه</SelectItem>
                    <SelectItem value="General" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">عمومی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager" className="text-rosary/80">{t('warehouses.manager')}</Label>
                <Input
                  id="manager"
                  placeholder="نام مدیر انبار"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-rosary/80">{t('warehouses.capacity')} (m³)</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('10000')}
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData({ ...formData, capacity: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentUtilization" className="text-rosary/80">بهره‌برداری فعلی (m³)</Label>
                <Input
                  id="currentUtilization"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('7500')}
                  value={formData.currentUtilization || ''}
                  onChange={(e) => setFormData({ ...formData, currentUtilization: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-rosary/80">{t('warehouses.status')}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="active" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.active')}</SelectItem>
                  <SelectItem value="inactive" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('warehouses.addWarehouse') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
