// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Partner } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface EditPartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, partner: Partial<Partner>) => void;
  partner: Partner | null;
}

export function EditPartnerDialog({ open, onOpenChange, onUpdate, partner }: EditPartnerDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    contact: '',
    email: '',
    location: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        type: partner.type,
        contact: partner.contact,
        email: partner.email,
        location: partner.location,
        status: partner.status,
      });
    }
  }, [partner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partner) {
      onUpdate(partner.id, formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">{t('partners.editPartner')}</DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {t('partners.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-rosary/80">{t('partners.name')}</Label>
              <Input
                id="edit-name"
                placeholder={t('partners.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type" className="text-rosary/80">{t('partners.type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue placeholder={t('common.filter')} />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="Distributor" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">توزیع‌کننده</SelectItem>
                  <SelectItem value="Retailer" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">خرده‌فروش</SelectItem>
                  <SelectItem value="Wholesaler" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">عمده‌فروش</SelectItem>
                  <SelectItem value="Restaurant" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">رستوران</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-rosary/80">{t('partners.email')}</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="partner@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-contact" className="text-rosary/80">{t('partners.contact')}</Label>
              <Input
                id="edit-contact"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location" className="text-rosary/80">{t('partners.location')}</Label>
              <Input
                id="edit-location"
                placeholder={t('partners.location')}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-rosary/80">{t('partners.status')}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="active" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.active')}</SelectItem>
                  <SelectItem value="pending" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.pending')}</SelectItem>
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
              {t('common.edit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
