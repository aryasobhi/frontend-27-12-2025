import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Employee } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (employee: any) => void;
  employee?: Employee | null;
  mode: 'add' | 'edit';
}

export function EmployeeDialog({ open, onOpenChange, onSave, employee, mode }: EmployeeDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    status: 'active' as 'active' | 'on-leave' | 'inactive',
    joinDate: '',
    salary: 0,
  });

  useEffect(() => {
    if (employee && mode === 'edit') {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        status: employee.status,
        joinDate: employee.joinDate,
        salary: employee.salary,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        salary: 0,
      });
    }
  }, [employee, mode, open]);

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
            {mode === 'add' ? t('employees.addEmployee') : t('employees.editEmployee')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('employees.subtitle') : t('employees.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('employees.name')}</Label>
                <Input
                  id="name"
                  placeholder="نام و نام خانوادگی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-rosary/80">{t('employees.position')}</Label>
                <Input
                  id="position"
                  placeholder="عنوان شغلی"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-rosary/80">{t('employees.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-rosary/80">{t('employees.phone')}</Label>
                <Input
                  id="phone"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-rosary/80">{t('employees.department')}</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="Production" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">تولید</SelectItem>
                    <SelectItem value="Quality Control" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">کنترل کیفیت</SelectItem>
                    <SelectItem value="Warehouse" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">انبار</SelectItem>
                    <SelectItem value="Sales" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">فروش</SelectItem>
                    <SelectItem value="Purchasing" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">خرید</SelectItem>
                    <SelectItem value="HR" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">منابع انسانی</SelectItem>
                    <SelectItem value="Finance" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">مالی</SelectItem>
                    <SelectItem value="IT" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">فناوری اطلاعات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-rosary/80">{t('employees.status')}</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="active" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.active')}</SelectItem>
                    <SelectItem value="on-leave" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">در مرخصی</SelectItem>
                    <SelectItem value="inactive" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.inactive')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joinDate" className="text-rosary/80">{t('employees.joinDate')}</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-rosary/80">{t('employees.salary')}</Label>
                <Input
                  id="salary"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="۵۰۰۰۰"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 font-mono"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('employees.addEmployee') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
