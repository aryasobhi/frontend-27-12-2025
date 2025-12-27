import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Customer } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: any) => void;
  customer?: Customer | null;
  mode: 'add' | 'edit';
}

export function CustomerDialog({ open, onOpenChange, onSave, customer, mode }: CustomerDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    if (customer && mode === 'edit') {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        status: customer.status,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        country: '',
        status: 'active',
      });
    }
  }, [customer, mode, open]);

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
            {mode === 'add' ? t('partners.addCustomer') : t('partners.editCustomer')}
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
                  placeholder="علی محمدی"
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
                  placeholder="شرکت پیشرو"
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
                  placeholder="customer@email.com"
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
                placeholder="تهران، خیابان ولیعصر"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-rosary/80">شهر</Label>
                <Input
                  id="city"
                  placeholder="تهران"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-rosary/80">کشور</Label>
                <Input
                  id="country"
                  placeholder="ایران"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
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
              {mode === 'add' ? t('partners.addCustomer') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
