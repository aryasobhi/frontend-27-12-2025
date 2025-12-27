// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Formulation } from '../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface FormulationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (formulation: any) => void;
  formulation?: Formulation | null;
  mode: 'add' | 'edit';
}

export function FormulationDialog({ open, onOpenChange, onSave, formulation, mode }: FormulationDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    product: '',
    version: '',
    status: 'draft' as 'draft' | 'approved' | 'archived',
    ingredients: [{ name: '', quantity: 0, unit: 'kg' }],
    yield: 0,
    cost: 0,
  });

  useEffect(() => {
    if (formulation && mode === 'edit') {
      setFormData({
        name: formulation.name,
        code: formulation.code,
        product: formulation.product,
        version: formulation.version,
        status: formulation.status,
        ingredients: formulation.ingredients,
        yield: formulation.yield,
        cost: formulation.cost,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `FORM-${Date.now()}`,
        product: '',
        version: '1.0',
        status: 'draft',
        ingredients: [{ name: '', quantity: 0, unit: 'kg' }],
        yield: 0,
        cost: 0,
      });
    }
  }, [formulation, mode, open]);

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: 0, unit: 'kg' }],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
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
            {mode === 'add' ? t('production.createFormulation') : t('production.editFormulation')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('production.subtitle') : t('production.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('production.formulationName')}</Label>
                <Input
                  id="name"
                  placeholder="دستورالعمل تولید الف"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-rosary/80">{t('production.formulationCode')}</Label>
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
                  <SelectItem value="draft" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.draft')}</SelectItem>
                  <SelectItem value="approved" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.approved')}</SelectItem>
                  <SelectItem value="archived" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بایگانی شده</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg text-gold">{t('production.ingredients')}</Label>
                <Button type="button" size="sm" variant="outline" onClick={addIngredient} className="bg-gold/10 border-gold/20 text-gold hover:bg-gold/20">
                  <Plus className="h-4 w-4 ml-1" />
                  {t('common.add')}
                </Button>
              </div>

              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="col-span-5 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('production.ingredient')}</Label>
                    <Input
                      placeholder="نام ماده اولیه"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="bg-white/5 border-white/10 text-rosary h-8"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('production.quantity')}</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={toPersianNumber('0')}
                      value={ingredient.quantity || ''}
                      onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-rosary h-8 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs text-rosary/60">{t('inventory.unit')}</Label>
                    <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(index, 'unit', value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-damask border-white/10 text-rosary">
                        <SelectItem value="kg" className="hover:bg-white/10 focus:bg-white/10">کیلوگرم</SelectItem>
                        <SelectItem value="g" className="hover:bg-white/10 focus:bg-white/10">گرم</SelectItem>
                        <SelectItem value="L" className="hover:bg-white/10 focus:bg-white/10">لیتر</SelectItem>
                        <SelectItem value="mL" className="hover:bg-white/10 focus:bg-white/10">میلی‌لیتر</SelectItem>
                        <SelectItem value="units" className="hover:bg-white/10 focus:bg-white/10">عدد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    {formData.ingredients.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeIngredient(index)}
                        className="text-rosary/40 hover:text-red-400 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yield" className="text-rosary/80">بازده (واحد)</Label>
                <Input
                  id="yield"
                  type="number"
                  min="0"
                  placeholder={toPersianNumber('100')}
                  value={formData.yield || ''}
                  onChange={(e) => setFormData({ ...formData, yield: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost" className="text-rosary/80">هزینه هر واحد (تومان)</Label>
                <Input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={toPersianNumber('۵۵۰۰')}
                  value={formData.cost || ''}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('production.createFormulation') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
