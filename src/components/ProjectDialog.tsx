import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Project } from '../context/DataContext';
import { Slider } from '../ui/slider';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: any) => void;
  project?: Project | null;
  mode: 'add' | 'edit';
}

export function ProjectDialog({ open, onOpenChange, onSave, project, mode }: ProjectDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'planning' as 'planning' | 'active' | 'on-hold' | 'completed',
    startDate: '',
    endDate: '',
    budget: 0,
    spent: 0,
    manager: '',
    progress: 0,
  });

  useEffect(() => {
    if (project && mode === 'edit') {
      setFormData({
        name: project.name,
        code: project.code,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget,
        spent: project.spent,
        manager: project.manager,
        progress: project.progress,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `PRJ-${Date.now()}`,
        description: '',
        status: 'planning',
        startDate: '',
        endDate: '',
        budget: 0,
        spent: 0,
        manager: '',
        progress: 0,
      });
    }
  }, [project, mode, open]);

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
            {mode === 'add' ? t('projects.addProject') : t('projects.editProject')}
          </DialogTitle>
          <DialogDescription className="text-rosary/60 text-right">
            {mode === 'add' ? t('projects.subtitle') : t('projects.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rosary/80">{t('projects.name')}</Label>
                <Input
                  id="name"
                  placeholder="پروژه جدید"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-rosary/80">{t('projects.code')}</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 text-left dir-ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-rosary/80">{t('common.details')}</Label>
              <Textarea
                id="description"
                placeholder="توضیحات پروژه..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager" className="text-rosary/80">{t('projects.manager')}</Label>
              <Input
                id="manager"
                placeholder="نام مدیر پروژه"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-rosary/80">{t('projects.startDate')}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-rosary/80">{t('projects.endDate')}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-rosary focus:border-gold/50 dir-ltr text-right"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-rosary/80">{t('projects.budget')}</Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="۰"
                  value={formData.budget || ''}
                  onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spent" className="text-rosary/80">{t('projects.spent')}</Label>
                <Input
                  id="spent"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="۰"
                  value={formData.spent || ''}
                  onChange={(e) => setFormData({ ...formData, spent: parseFloat(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-rosary placeholder:text-rosary/30 focus:border-gold/50 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-rosary/80">{t('projects.status')}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary hover:border-gold/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  <SelectItem value="planning" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.pending')}</SelectItem>
                  <SelectItem value="active" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.running')}</SelectItem>
                  <SelectItem value="on-hold" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.idle')}</SelectItem>
                  <SelectItem value="completed" className="hover:bg-white/10 focus:bg-white/10 focus:text-gold cursor-pointer">{t('status.completed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="progress" className="text-rosary/80">{t('projects.progress')}</Label>
                <span className="text-sm text-rosary/60 font-mono">{toPersianNumber(formData.progress)}%</span>
              </div>
              <Slider
                id="progress"
                min={0}
                max={100}
                step={5}
                value={[formData.progress]}
                onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                className="py-4"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/10 text-rosary hover:bg-white/5">
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="bg-gold text-damask hover:bg-gold/80 hover:shadow-glow-gold rounded-xl transition-all duration-300">
              {mode === 'add' ? t('projects.addProject') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
