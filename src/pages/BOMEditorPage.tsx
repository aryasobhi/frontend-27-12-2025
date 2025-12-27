import { useState } from 'react';
import { ArrowLeft, Plus, Save, Trash2, Search, Package, Box, Calculator } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

export function BOMEditorPage() {
  const { t } = useTranslation();
  const [bomName, setBomName] = useState('فرمول نان گندم ممتاز');
  const [product, setProduct] = useState('prod-001');
  const [version, setVersion] = useState('v2.1');
  const [status, setStatus] = useState('active');

  const [components, setComponents] = useState([
    { id: '1', name: 'آرد گندم ممتاز', quantity: 0.5, unit: 'kg', cost: 80000, supplier: 'صنایع غلات برتر' },
    { id: '2', name: 'مخمر فعال خشک', quantity: 10, unit: 'g', cost: 15000, supplier: 'شرکت مواد پخت' },
    { id: '3', name: 'نمک دریایی', quantity: 10, unit: 'g', cost: 5000, supplier: 'فرآورده‌های نمک' },
    { id: '4', name: 'شکر سفید', quantity: 20, unit: 'g', cost: 10000, supplier: 'صنایع قند' },
    { id: '5', name: 'کره بدون نمک', quantity: 30, unit: 'g', cost: 40000, supplier: 'لبنیات تازه' },
  ]);

  const totalCost = components.reduce((sum, comp) => sum + (comp.quantity * comp.cost), 0);

  const addComponent = () => {
    setComponents([
      ...components,
      { id: Date.now().toString(), name: '', quantity: 0, unit: 'kg', cost: 0, supplier: '' }
    ]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  const updateComponent = (id: string, field: string, value: any) => {
    setComponents(components.map(comp =>
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  // Status translations
  const statusTranslations: Record<string, string> = {
    'active': t('status.active'),
    'draft': t('status.draft'),
    'archived': 'آرشیو شده',
  };

  // Unit translations
  const unitTranslations: Record<string, string> = {
    'kg': t('units.kg'),
    'g': t('units.g'),
    'L': t('units.liter'),
    'ml': t('units.ml'),
    'pcs': t('units.piece'),
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 ml-2" />
            {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{t('bom.title')}</h1>
            <p className="text-rosary/60">{t('bom.subtitle')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{t('common.cancel')}</Button>
          <Button>
            <Save className="w-4 h-4 ml-2" />
            {t('common.save')}
          </Button>
        </div>
      </div>

      {/* BOM Info */}
      <Card className="p-6">
        <h3 className="mb-4 text-gold font-semibold">{t('bom.bomInfo')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bom-name" className="text-rosary/80">{t('bom.bomName')}</Label>
            <Input
              id="bom-name"
              value={bomName}
              onChange={(e) => setBomName(e.target.value)}
              placeholder="نام فرمول را وارد کنید"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="product" className="text-rosary/80">{t('bom.product')}</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger id="product" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prod-001">نان گندم ممتاز</SelectItem>
                <SelectItem value="prod-002">نان تنوری</SelectItem>
                <SelectItem value="prod-003">کلوچه شکلاتی</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="version" className="text-rosary/80">{t('bom.version')}</Label>
            <Input
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="نسخه"
              className="mt-1 dir-ltr text-left"
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-rosary/80">{t('table.status')}</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t('status.active')}</SelectItem>
                <SelectItem value="draft">{t('status.draft')}</SelectItem>
                <SelectItem value="archived">آرشیو شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Components */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gold font-semibold">{t('bom.components')}</h3>
          <Button variant="outline" size="sm" onClick={addComponent}>
            <Plus className="w-4 h-4 ml-2" />
            {t('bom.addComponent')}
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-white/5 border-b border-white/20">
            <TableRow className="hover:bg-transparent border-white/20">
              <TableHead>{t('bom.componentName')}</TableHead>
              <TableHead>{t('bom.quantity')}</TableHead>
              <TableHead>{t('bom.unit')}</TableHead>
              <TableHead>{t('bom.unitCost')}</TableHead>
              <TableHead>{t('bom.totalCost')}</TableHead>
              <TableHead>{t('bom.supplier')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((comp) => (
              <TableRow key={comp.id} className="hover:bg-white/5 border-white/10">
                <TableCell>
                  <Input
                    value={comp.name}
                    onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
                    placeholder="نام ماده"
                    className="text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={comp.quantity}
                    onChange={(e) => updateComponent(comp.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-20 text-sm dir-ltr text-center"
                  />
                </TableCell>
                <TableCell>
                  <Select value={comp.unit} onValueChange={(v) => updateComponent(comp.id, 'unit', v)}>
                    <SelectTrigger className="w-24 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(unitTranslations).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={comp.cost}
                    onChange={(e) => updateComponent(comp.id, 'cost', parseFloat(e.target.value) || 0)}
                    className="w-28 text-sm dir-ltr text-center"
                  />
                </TableCell>
                <TableCell className="font-medium text-gold">
                  {formatPersianCurrency(comp.quantity * comp.cost)}
                </TableCell>
                <TableCell>
                  <Input
                    value={comp.supplier}
                    onChange={(e) => updateComponent(comp.id, 'supplier', e.target.value)}
                    placeholder="تأمین‌کننده"
                    className="w-32 text-sm"
                  />
                </TableCell>
                <TableCell className="text-left">
                  <Button variant="ghost" size="sm" onClick={() => removeComponent(comp.id)} className="text-error hover:bg-error/20">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gold" />
            <span className="text-rosary/60">{t('bom.totalCost')}:</span>
          </div>
          <span className="text-2xl font-bold text-gold">{formatPersianCurrency(totalCost)}</span>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold/20 rounded-lg border border-gold/30">
              <Box className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('bom.components')}</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(components.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <Package className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">تأمین‌کنندگان</p>
              <p className="text-2xl font-bold text-info">{toPersianNumber(new Set(components.map(c => c.supplier).filter(Boolean)).size)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg border border-success/30">
              <Calculator className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('bom.totalCost')}</p>
              <p className="text-2xl font-bold text-success">{formatPersianCurrency(totalCost)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
