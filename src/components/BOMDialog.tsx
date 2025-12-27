// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BOM } from '../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface BOMDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bom: any) => void;
  bom?: BOM | null;
  mode: 'add' | 'edit';
}

export function BOMDialog({ open, onOpenChange, onSave, bom, mode }: BOMDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    product: '',
    version: '',
    status: 'active' as 'active' | 'obsolete',
    components: [{ name: '', quantity: 0, unit: 'units', cost: 0 }],
    totalCost: 0,
  });

  useEffect(() => {
    if (bom && mode === 'edit') {
      setFormData({
        name: bom.name,
        code: bom.code,
        product: bom.product,
        version: bom.version,
        status: bom.status,
        components: bom.components,
        totalCost: bom.totalCost,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `BOM-${Date.now()}`,
        product: '',
        version: '1.0',
        status: 'active',
        components: [{ name: '', quantity: 0, unit: 'units', cost: 0 }],
        totalCost: 0,
      });
    }
  }, [bom, mode, open]);

  const addComponent = () => {
    setFormData({
      ...formData,
      components: [...formData.components, { name: '', quantity: 0, unit: 'units', cost: 0 }],
    });
  };

  const removeComponent = (index: number) => {
    const newComponents = formData.components.filter((_, i) => i !== index);
    setFormData({ ...formData, components: newComponents });
    calculateTotal(newComponents);
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const newComponents = [...formData.components];
    newComponents[index] = { ...newComponents[index], [field]: value };
    setFormData({ ...formData, components: newComponents });
    calculateTotal(newComponents);
  };

  const calculateTotal = (components: any[]) => {
    const total = components.reduce((sum, comp) => sum + (comp.quantity * comp.cost), 0);
    setFormData(prev => ({ ...prev, totalCost: total }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('production.createBOM') : t('production.editBOM')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('production.subtitle') : t('production.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('production.bomName')}</Label>
                <Input
                  id="name"
                  placeholder="ساختار محصول الف"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-rosary/80">{t('production.bomCode')}</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product" className="text-rosary/80">{t('production.product')}</Label>
                <Input
                  id="product"
                  placeholder="نام محصول نهایی"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version" className="text-rosary/80">{t('production.version')}</Label>
                <Input
                  id="version"
                  placeholder={toPersianNumber('1.0')}
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
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
                  <SelectItem value="obsolete" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">منسوخ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg text-gold">{t('production.components')}</Label>
                <Button type="button" size="sm" variant="outline" onClick={addComponent} className="bg-gold/10 border-gold/20 text-gold hover:bg-gold/20">
                  <Plus className="h-4 w-4 ml-1" />
                  {t('common.add')}
                </Button>
              </div>

              {formData.components.map((component, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="col-span-4 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('production.component')}</Label>
                    <Input
                      placeholder="نام قطعه"
                      value={component.name}
                      onChange={(e) => updateComponent(index, 'name', e.target.value)}
                      className="bg-white/5 border-white/10 text-rosary h-8"
                      required
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('production.quantity')}</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={toPersianNumber('0')}
                      value={component.quantity || ''}
                      onChange={(e) => updateComponent(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-rosary h-8 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('inventory.unit')}</Label>
                    <Select value={component.unit} onValueChange={(value) => updateComponent(index, 'unit', value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-damask border-white/10 text-rosary">
                        <SelectItem value="units" className="hover:bg-white/10 focus:bg-white/10">عدد</SelectItem>
                        <SelectItem value="kg" className="hover:bg-white/10 focus:bg-white/10">کیلوگرم</SelectItem>
                        <SelectItem value="g" className="hover:bg-white/10 focus:bg-white/10">گرم</SelectItem>
                        <SelectItem value="L" className="hover:bg-white/10 focus:bg-white/10">لیتر</SelectItem>
                        <SelectItem value="mL" className="hover:bg-white/10 focus:bg-white/10">میلی‌لیتر</SelectItem>
                        <SelectItem value="m" className="hover:bg-white/10 focus:bg-white/10">متر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs text-rosary/60">هزینه واحد (تومان)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={toPersianNumber('0')}
                      value={component.cost || ''}
                      onChange={(e) => updateComponent(index, 'cost', parseFloat(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-rosary h-8 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    {formData.components.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeComponent(index)}
                        className="text-rosary/40 hover:text-red-400 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <Label className="text-lg text-gold">هزینه کل BOM:</Label>
                <div className="text-2xl font-bold text-gold font-mono">{toPersianNumber(formData.totalCost.toLocaleString())} تومان</div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('production.createBOM') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
