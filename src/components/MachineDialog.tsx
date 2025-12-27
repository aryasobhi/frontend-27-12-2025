import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Machine } from '../context/DataContext';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface MachineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (machine: any) => void;
  machine?: Machine | null;
  mode: 'add' | 'edit';
}

export function MachineDialog({ open, onOpenChange, onSave, machine, mode }: MachineDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    location: '',
    status: 'operational' as 'operational' | 'maintenance' | 'idle' | 'error',
    uptime: 0,
    efficiency: 0,
    lastMaintenance: '',
    nextMaintenance: '',
    currentJob: '',
    manufacturer: '',
    installDate: '',
  });

  useEffect(() => {
    if (machine && mode === 'edit') {
      setFormData({
        name: machine.name,
        code: machine.code,
        type: machine.type,
        location: machine.location,
        status: machine.status,
        uptime: machine.uptime,
        efficiency: machine.efficiency,
        lastMaintenance: machine.lastMaintenance,
        nextMaintenance: machine.nextMaintenance,
        currentJob: machine.currentJob || '',
        manufacturer: machine.manufacturer,
        installDate: machine.installDate,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: '',
        type: '',
        location: '',
        status: 'operational',
        uptime: 0,
        efficiency: 0,
        lastMaintenance: '',
        nextMaintenance: '',
        currentJob: '',
        manufacturer: '',
        installDate: '',
      });
    }
  }, [machine, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-damask border-white/20 text-rosary font-vazir" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-gold text-right">
            {mode === 'add' ? t('machines.addMachine') : t('machines.editMachine')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('machines.subtitle') : t('machines.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('machines.name')}</Label>
                <Input
                  id="name"
                  placeholder="خط تولید ۱"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-rosary/80">{t('machines.code')}</Label>
                <Input
                  id="code"
                  placeholder="MCH-001"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-rosary/80">{t('machines.type')}</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                    <SelectValue placeholder={t('common.filter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-damask border-white/10 text-rosary">
                    <SelectItem value="Packaging" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بسته‌بندی</SelectItem>
                    <SelectItem value="Mixing" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">میکسر</SelectItem>
                    <SelectItem value="Processing" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">پردازش</SelectItem>
                    <SelectItem value="Bottling" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">بطری‌سازی</SelectItem>
                    <SelectItem value="Labeling" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">لیبل‌زنی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-rosary/80">{t('machines.location')}</Label>
                <Input
                  id="location"
                  placeholder="سالن تولید الف"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-rosary/80">{t('machines.status')}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="operational" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.running')}</SelectItem>
                  <SelectItem value="maintenance" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.maintenance')}</SelectItem>
                  <SelectItem value="idle" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.idle')}</SelectItem>
                  <SelectItem value="error" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.error')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uptime" className="text-rosary/80">{t('machines.uptime')} (%)</Label>
                <Input
                  id="uptime"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="۹۵"
                  value={formData.uptime || ''}
                  onChange={(e) => setFormData({ ...formData, uptime: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency" className="text-rosary/80">{t('machines.efficiency')} (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="۹۲"
                  value={formData.efficiency || ''}
                  onChange={(e) => setFormData({ ...formData, efficiency: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturer" className="text-rosary/80">تولیدکننده</Label>
                <Input
                  id="manufacturer"
                  placeholder="نام شرکت سازنده"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installDate" className="text-rosary/80">تاریخ نصب</Label>
                <Input
                  id="installDate"
                  type="date"
                  value={formData.installDate}
                  onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastMaintenance" className="text-rosary/80">{t('machines.lastMaintenance')}</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextMaintenance" className="text-rosary/80">{t('machines.nextMaintenance')}</Label>
                <Input
                  id="nextMaintenance"
                  type="date"
                  value={formData.nextMaintenance}
                  onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentJob" className="text-rosary/80">{t('machines.currentJob')}</Label>
              <Input
                id="currentJob"
                placeholder="PO-2025-001"
                value={formData.currentJob}
                onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('machines.addMachine') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
