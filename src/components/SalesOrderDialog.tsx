// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SalesOrder } from '../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface SalesOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (so: any) => void;
  salesOrder?: SalesOrder | null;
  mode: 'add' | 'edit';
}

export function SalesOrderDialog({ open, onOpenChange, onSave, salesOrder, mode }: SalesOrderDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    soNumber: '',
    customer: '',
    items: [{ name: '', quantity: 0, unitPrice: 0 }],
    totalAmount: 0,
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    status: 'draft' as 'draft' | 'confirmed' | 'picked' | 'delivered' | 'invoiced',
    deliveryNumber: '',
    invoiceNumber: '',
  });

  useEffect(() => {
    if (salesOrder && mode === 'edit') {
      setFormData({
        soNumber: salesOrder.soNumber,
        customer: salesOrder.customer,
        items: salesOrder.items,
        totalAmount: salesOrder.totalAmount,
        orderDate: salesOrder.orderDate,
        deliveryDate: salesOrder.deliveryDate,
        status: salesOrder.status,
        deliveryNumber: salesOrder.deliveryNumber || '',
        invoiceNumber: salesOrder.invoiceNumber || '',
      });
    } else if (mode === 'add') {
      setFormData({
        soNumber: `SO-${Date.now()}`,
        customer: '',
        items: [{ name: '', quantity: 0, unitPrice: 0 }],
        totalAmount: 0,
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        status: 'draft',
        deliveryNumber: '',
        invoiceNumber: '',
      });
    }
  }, [salesOrder, mode, open]);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 0, unitPrice: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
    calculateTotal(newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
    calculateTotal(newItems);
  };

  const calculateTotal = (items: any[]) => {
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('sales.createOrder') : t('sales.editOrder')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('sales.subtitle') : t('sales.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soNumber" className="text-rosary/80">{t('sales.soNumber')}</Label>
                <Input
                  id="soNumber"
                  value={formData.soNumber}
                  onChange={(e) => setFormData({ ...formData, soNumber: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer" className="text-rosary/80">{t('sales.customer')}</Label>
                <Input
                  id="customer"
                  placeholder={t('sales.customer')}
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderDate" className="text-rosary/80">{t('sales.orderDate')}</Label>
                <Input
                  id="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="text-rosary/80">{t('sales.deliveryDate')}</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
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
                  <SelectItem value="draft" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.draft')}</SelectItem>
                  <SelectItem value="confirmed" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.confirmed')}</SelectItem>
                  <SelectItem value="picked" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.picked')}</SelectItem>
                  <SelectItem value="delivered" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.delivered')}</SelectItem>
                  <SelectItem value="invoiced" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.invoiced')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg text-gold">{t('sales.orderItems')}</Label>
                <Button type="button" size="sm" variant="outline" onClick={addItem} className="bg-gold/10 border-gold/20 text-gold hover:bg-gold/20">
                  <Plus className="h-4 w-4 ml-1" />
                  {t('common.add')}
                </Button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="col-span-5 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('production.product')}</Label>
                    <Input
                      placeholder="نام محصول"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="bg-white/5 border-white/10 text-rosary h-8"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('inventory.quantity')}</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder={toPersianNumber('0')}
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-rosary h-8 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('common.price')} واحد</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={toPersianNumber('0')}
                      value={item.unitPrice || ''}
                      onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-rosary h-8 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(index)}
                        className="text-rosary/40 hover:text-red-400 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-left">
              <div className="flex justify-between items-center">
                <Label className="text-lg text-gold">{t('sales.totalAmount')}:</Label>
                <div className="text-2xl font-bold text-gold font-mono">{toPersianNumber(formData.totalAmount.toLocaleString())} تومان</div>
              </div>
            </div>

            {mode === 'edit' && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <Label htmlFor="deliveryNumber" className="text-rosary/80">شماره حواله (اختیاری)</Label>
                  <Input
                    id="deliveryNumber"
                    placeholder="DEL-001"
                    value={formData.deliveryNumber}
                    onChange={(e) => setFormData({ ...formData, deliveryNumber: e.target.value })}
                    className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-rosary/80">شماره فاکتور (اختیاری)</Label>
                  <Input
                    id="invoiceNumber"
                    placeholder="INV-001"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('sales.createOrder') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
