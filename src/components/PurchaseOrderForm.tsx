import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PurchaseOrder } from '../context/DataContext';
import { Plus, Trash2, X } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface PurchaseOrderFormProps {
  onSave: (po: any) => void;
  onCancel: () => void;
  purchaseOrder?: PurchaseOrder | null;
  mode: 'add' | 'edit';
}

export function PurchaseOrderForm({ onSave, onCancel, purchaseOrder, mode }: PurchaseOrderFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    poNumber: '',
    supplier: '',
    items: [{ name: '', quantity: 0, unitPrice: 0 }],
    totalAmount: 0,
    orderDate: new Date().toISOString().split('T')[0],
    expectedDate: '',
    status: 'draft' as 'draft' | 'approved' | 'ordered' | 'received' | 'invoiced',
    receiptDate: '',
    invoiceNumber: '',
  });

  useEffect(() => {
    if (purchaseOrder && mode === 'edit') {
      setFormData({
        poNumber: purchaseOrder.poNumber,
        supplier: purchaseOrder.supplier,
        items: purchaseOrder.items,
        totalAmount: purchaseOrder.totalAmount,
        orderDate: purchaseOrder.orderDate,
        expectedDate: purchaseOrder.expectedDate,
        status: purchaseOrder.status || 'draft',
        receiptDate: purchaseOrder.receiptDate || '',
        invoiceNumber: purchaseOrder.invoiceNumber || '',
      });
    } else if (mode === 'add') {
      setFormData({
        poNumber: `PO-${Date.now()}`,
        supplier: '',
        items: [{ name: '', quantity: 0, unitPrice: 0 }],
        totalAmount: 0,
        orderDate: new Date().toISOString().split('T')[0],
        expectedDate: '',
        status: 'draft',
        receiptDate: '',
        invoiceNumber: '',
      });
    }
  }, [purchaseOrder, mode]);

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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 text-right">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="poNumber" className="text-rosary/80">{t('purchasing.orderNumber')}</Label>
            <Input
              id="poNumber"
              value={formData.poNumber}
              onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
              className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr h-10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier" className="text-rosary/80">{t('purchasing.supplier')}</Label>
            <Input
              id="supplier"
              placeholder="نام تامین‌کننده"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 h-10"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orderDate" className="text-rosary/80">{t('purchasing.orderDate')}</Label>
            <Input
              id="orderDate"
              type="date"
              value={formData.orderDate}
              onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
              className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr h-10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedDate" className="text-rosary/80">{t('purchasing.expectedDate')}</Label>
            <Input
              id="expectedDate"
              type="date"
              value={formData.expectedDate}
              onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
              className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr h-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-rosary/80">{t('common.status')}</Label>
          <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-damask border-white/10 text-rosary">
              <SelectItem value="draft">{t('status.draft')}</SelectItem>
              <SelectItem value="approved">{t('status.approved')}</SelectItem>
              <SelectItem value="ordered">{t('status.ordered')}</SelectItem>
              <SelectItem value="received">{t('status.received')}</SelectItem>
              <SelectItem value="invoiced">{t('status.invoiced')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg text-gold font-black">{t('purchasing.orderItems')}</Label>
            <Button type="button" size="sm" variant="outline" onClick={addItem} className="bg-gold/10 border-gold/20 text-gold hover:bg-gold/20 h-8">
              <Plus className="h-4 w-4 ml-1" />
              {t('common.add')}
            </Button>
          </div>

          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end p-4 bg-white/5 rounded-xl border border-white/10 group">
                <div className="col-span-5 space-y-2">
                  <Label className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest">{t('inventory.itemName')}</Label>
                  <Input
                    placeholder="نام کالا"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    className="bg-white/5 border-white/10 text-rosary h-9"
                    required
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest">{t('inventory.quantity')}</Label>
                  <Input
                    type="number"
                    min="1"
                    placeholder={toPersianNumber('0')}
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="bg-white/5 border-white/10 text-rosary h-9 font-mono"
                    required
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest">{t('common.unitPrice')}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder={toPersianNumber('0')}
                    value={item.unitPrice || ''}
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="bg-white/5 border-white/10 text-rosary h-9 font-mono"
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
                      className="text-rosary/40 hover:text-blood h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex justify-between items-center px-2">
            <span className="text-lg text-gold font-black">{t('purchasing.totalAmount')}:</span>
            <div className="text-2xl font-black text-gold font-mono">
              {toPersianNumber(formData.totalAmount.toLocaleString())} <span className="text-xs font-vazir text-rosary/40">{t('units.toman')}</span>
            </div>
          </div>
        </div>

        {mode === 'edit' && (
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div className="space-y-2">
              <Label htmlFor="receiptDate" className="text-rosary/80">{t('purchasing.receiptDate')}</Label>
              <Input
                id="receiptDate"
                type="date"
                value={formData.receiptDate}
                onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-rosary/80">{t('purchasing.invoiceNumber')}</Label>
              <Input
                id="invoiceNumber"
                placeholder="INV-001"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr h-10"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-8 border-t border-white/5">
        <Button type="button" variant="ghost" onClick={onCancel} className="text-rosary/60 hover:text-rosary hover:bg-white/5">
          {t('common.cancel')}
        </Button>
        <Button 
          type="submit" 
          className="bg-blood hover:bg-blood/80 text-rosary shadow-glow-blood border border-white/10 rounded-xl px-10 h-10 font-bold"
        >
          {mode === 'add' ? t('purchasing.createOrder') : t('common.save')}
        </Button>
      </div>
    </form>
  );
}
