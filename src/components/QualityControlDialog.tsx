// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { QualityControl } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface QualityControlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (qc: any) => void;
  qualityControl?: QualityControl | null;
  mode: 'add' | 'edit';
}

export function QualityControlDialog({ open, onOpenChange, onSave, qualityControl, mode }: QualityControlDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    inspectionId: '',
    productionOrder: '',
    product: '',
    inspector: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    status: 'pending' as 'passed' | 'failed' | 'pending',
    defectRate: 0,
    notes: '',
  });

  useEffect(() => {
    if (qualityControl && mode === 'edit') {
      setFormData({
        inspectionId: qualityControl.inspectionId,
        productionOrder: qualityControl.productionOrder,
        product: qualityControl.product,
        inspector: qualityControl.inspector,
        inspectionDate: qualityControl.inspectionDate,
        status: qualityControl.status,
        defectRate: qualityControl.defectRate,
        notes: qualityControl.notes,
      });
    } else if (mode === 'add') {
      setFormData({
        inspectionId: `QC-${Date.now()}`,
        productionOrder: '',
        product: '',
        inspector: '',
        inspectionDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        defectRate: 0,
        notes: '',
      });
    }
  }, [qualityControl, mode, open]);

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
            {mode === 'add' ? t('qc.createInspection') : t('qc.editInspection')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('qc.addSubtitle') : t('qc.editSubtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionId" className="text-rosary/80">شناسه بازرسی</Label>
                <Input
                  id="inspectionId"
                  value={formData.inspectionId}
                  onChange={(e) => setFormData({ ...formData, inspectionId: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productionOrder" className="text-rosary/80">{t('production.productionOrder')}</Label>
                <Input
                  id="productionOrder"
                  placeholder="PROD-001"
                  value={formData.productionOrder}
                  onChange={(e) => setFormData({ ...formData, productionOrder: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product" className="text-rosary/80">{t('common.product')}</Label>
                <Input
                  id="product"
                  placeholder={t('common.product')}
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspector" className="text-rosary/80">{t('qc.inspector')}</Label>
                <Input
                  id="inspector"
                  placeholder={t('qc.inspector')}
                  value={formData.inspector}
                  onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionDate" className="text-rosary/80">تاریخ بازرسی</Label>
                <Input
                  id="inspectionDate"
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defectRate" className="text-rosary/80">نرخ نقص (%)</Label>
                <Input
                  id="defectRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder={toPersianNumber('0.0')}
                  value={formData.defectRate || ''}
                  onChange={(e) => setFormData({ ...formData, defectRate: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
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
                  <SelectItem value="pending" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.pending')}</SelectItem>
                  <SelectItem value="passed" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.passed')}</SelectItem>
                  <SelectItem value="failed" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.failed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-rosary/80">{t('common.details')}</Label>
              <Textarea
                id="notes"
                placeholder="یادداشت‌ها و مشاهدات بازرسی..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('qc.createInspection') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
