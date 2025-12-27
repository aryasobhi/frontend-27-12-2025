// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ProductionOrder } from '../context/DataContext';
import { Slider } from '../ui/slider';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface ProductionOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (order: any) => void;
  order?: ProductionOrder | null;
  mode: 'add' | 'edit';
}

export function ProductionOrderDialog({ open, onOpenChange, onSave, order, mode }: ProductionOrderDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    orderNumber: '',
    product: '',
    quantity: 0,
    status: 'planned' as 'planned' | 'in-progress' | 'completed' | 'cancelled',
    startDate: '',
    endDate: '',
    machine: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    progress: 0,
  });

  useEffect(() => {
    if (order && mode === 'edit') {
      setFormData({
        orderNumber: order.orderNumber,
        product: order.product,
        quantity: order.quantity,
        status: order.status,
        startDate: order.startDate,
        endDate: order.endDate,
        machine: order.machine,
        priority: order.priority,
        progress: order.progress,
      });
    } else if (mode === 'add') {
      setFormData({
        orderNumber: `PROD-${Date.now()}`,
        product: '',
        quantity: 0,
        status: 'planned',
        startDate: '',
        endDate: '',
        machine: '',
        priority: 'medium',
        progress: 0,
      });
    }
  }, [order, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('production.newOrder') : t('production.editOrder')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('production.subtitle') : t('production.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber" className="text-rosary/80">{t('production.orderNumber')}</Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product" className="text-rosary/80">{t('production.product')}</Label>
                <Input
                  id="product"
                  placeholder={t('production.productPlaceholder')}
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-rosary/80">{t('production.quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder={toPersianNumber('0')}
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="machine" className="text-rosary/80">{t('production.machine')}</Label>
                <Input
                  id="machine"
                  placeholder={t('production.machinePlaceholder')}
                  value={formData.machine}
                  onChange={(e) => setFormData({ ...formData, machine: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-rosary/80">{t('production.startDate')}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-rosary/80">{t('production.endDate')}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-rosary/80">{t('common.status')}</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="planned" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.planned')}</SelectItem>
                    <SelectItem value="in-progress" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.inProgress')}</SelectItem>
                    <SelectItem value="completed" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.completed')}</SelectItem>
                    <SelectItem value="cancelled" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-rosary/80">{t('production.priority')}</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="low" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('common.priority.low')}</SelectItem>
                    <SelectItem value="medium" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('common.priority.medium')}</SelectItem>
                    <SelectItem value="high" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('common.priority.high')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="progress" className="text-rosary/80">{t('production.progress')}</Label>
                <span className="text-sm text-gold font-mono">{toPersianNumber(formData.progress)}%</span>
              </div>
              <Slider
                id="progress"
                min={0}
                max={100}
                step={5}
                value={[formData.progress]}
                onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                className="py-4"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('production.newOrder') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
