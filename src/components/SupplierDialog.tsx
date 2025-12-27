import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Supplier } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (supplier: any) => void;
  supplier?: Supplier | null;
  mode: 'add' | 'edit';
}

export function SupplierDialog({ open, onOpenChange, onSave, supplier, mode }: SupplierDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    category: '',
    status: 'active' as 'active' | 'inactive',
    rating: 5,
  });

  useEffect(() => {
    if (supplier && mode === 'edit') {
      setFormData({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        company: supplier.company,
        address: supplier.address,
        category: supplier.category,
        status: supplier.status,
        rating: supplier.rating,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        category: '',
        status: 'active',
        rating: 5,
      });
    }
  }, [supplier, mode, open]);

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
            {mode === 'add' ? t('partners.addSupplier') : t('partners.editSupplier')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('partners.subtitle') : t('partners.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('common.name')}</Label>
                <Input
                  id="name"
                  placeholder="محمد علوی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-rosary/80">{t('partners.companyName')}</Label>
                <Input
                  id="company"
                  placeholder="شرکت تامین کالای نوین"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-rosary/80">{t('common.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="supplier@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-rosary/80">{t('common.contact')}</Label>
                <Input
                  id="phone"
                  placeholder="+۹۸ ۹۱۲ ۱۲۳ ۴۵۶۷"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-rosary/80">{t('partners.location')}</Label>
              <Input
                id="address"
                placeholder="تهران، شهرک صنعتی، خیابان دهم"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-rosary/80">{t('inventory.category')}</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="Raw Materials" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">مواد اولیه</SelectItem>
                    <SelectItem value="Packaging" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بسته‌بندی</SelectItem>
                    <SelectItem value="Equipment" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">تجهیزات</SelectItem>
                    <SelectItem value="Services" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">خدمات</SelectItem>
                    <SelectItem value="Logistics" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">لجستیک</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-rosary/80">رتبه (۱-۵)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
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
              {mode === 'add' ? t('partners.addSupplier') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
