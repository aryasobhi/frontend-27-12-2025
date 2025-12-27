// @ts-nocheck
/*
  Status: SKELETON
  Reason: BOM summary component is a UI view reliant on mock/formulation data, not a runtime module.
  Allowed actions: authoring-only
*/

import { Card } from '../ui/card';
import { Layers, BookOpen, Calendar, TrendingUp, Factory, MoreVertical, Edit, Copy, PlusSquare, Trash2, FlaskConical, Eye, Activity, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/TableContainer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const mockBOMs = [
  {
    id: '1',
    productName: 'سس گوجه فرنگی ارگانیک',
    productCode: 'PRD-001',
    version: 'v2.1',
    status: 'active',
    materials: [
      { name: 'گوجه فرنگی ارگانیک', quantity: 5, unit: 'kg', cost: 125000 },
      { name: 'روغن زیتون', quantity: 0.5, unit: 'L', cost: 80000 },
      { name: 'نمک', quantity: 0.05, unit: 'kg', cost: 1000 },
      { name: 'جار شیشه‌ای ۵۰۰ میلی‌لیتر', quantity: 10, unit: 'units', cost: 135000 },
    ],
    totalCost: 341000,
    yield: 10,
    lastUpdated: '2025-10-15',
  }
];

const mockProductionPlans = [
  {
    id: '1',
    planNumber: 'PLAN-2024-001',
    product: 'سس گوجه فرنگی ارگانیک',
    plannedQuantity: 5000,
    startDate: '2025-11-05',
    endDate: '2025-11-10',
    status: 'planned',
    progress: 0,
  }
];

export function BOMSummary() {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'draft': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'planned': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('bom.activeBOMs'), value: toPersianNumber('۴۵'), sub: t('nav.products'), icon: BookOpen, color: 'text-gold' },
          { label: t('bom.productionPlans'), value: toPersianNumber('۱۲'), sub: `${toPersianNumber('۸')} ${t('status.inprogress')}`, icon: Calendar, color: 'text-gold' },
          { label: t('bom.materialEfficiency'), value: '۹۶.۸٪', sub: t('bom.aboveTarget'), icon: TrendingUp, color: 'text-green-400' },
          { label: t('bom.avgUnitCost'), value: '۴.۸۵ م.ت', sub: t('common.perUnit'), icon: Factory, color: 'text-blood' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {kpi.value}
                </div>
                <p className="text-xs text-rosary/40 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="bom" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
        // @ts-nocheck
          <TabsTrigger value="bom" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('bom.billOfMaterials')}</TabsTrigger>
          <TabsTrigger value="planning" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('bom.productionPlanning')}</TabsTrigger>
        </TabsList>

        <TabsContent value="bom" className="space-y-8">
          {mockBOMs.map((bom) => (
            <Card key={bom.id} className="group">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-5 text-right flex-1">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                    <Layers className="h-8 w-8 text-gold/40 group-hover:text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <h3 className="text-xl font-black text-gold tracking-tight">{bom.productName}</h3>
                       <Badge className={cn(getStatusColor(bom.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                        {t(`status.${bom.status}`)}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-rosary/40 uppercase tracking-widest">
                       <span>{t('common.version')}: <span className="text-rosary/60 font-mono text-xs">{bom.version}</span></span>
                       <span>{t('bom.productCode')}: <span className="text-rosary/60 font-mono text-xs">{bom.productCode}</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-right">
                  <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{t('accounting.totalCost')}</p>
                  <div className="text-xl font-black text-gold font-mono leading-none">
                    {toPersianNumber(bom.totalCost.toLocaleString())} <span className="text-xs font-vazir text-gold/60">{t('units.toman')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gold/60 uppercase tracking-widest flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  {t('bom.requiredMaterials')}
                </h4>
                
                <TableContainer>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('bom.material')}</TableHead>
                      <TableHead>{t('common.quantity')}</TableHead>
                      <TableHead>{t('common.unit')}</TableHead>
                      <TableHead className="text-left">{t('accounting.totalCost')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bom.materials.map((material, index) => (
                      <TableRow key={index} className="group/row">
                        <TableCell className="font-bold">
                          <div className="flex items-center gap-2">
                             <div className="w-4 h-4 text-gold/30 flex items-center justify-center">
                                {index === 0 ? <ChevronDown className="h-3 w-3" /> : index === 3 ? <ChevronRight className="h-3 w-3" /> : null}
                             </div>
                             {material.name}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{toPersianNumber(material.quantity.toString())}</TableCell>
                        <TableCell className="text-[10px]">{t(`units.${material.unit.toLowerCase()}`)}</TableCell>
                        <TableCell className="text-left font-mono">{toPersianNumber(material.cost.toLocaleString())}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
           <Card title={t('bom.mrpTitle')}>
             <div className="bg-white/5 rounded-2xl border border-white/10 p-8 flex items-start gap-5">
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                   <Activity className="h-7 w-7" />
                </div>
                <div className="flex-1">
                   <h4 className="text-sm font-black text-gold uppercase tracking-widest mb-3">{t('bom.mrpTitle')}</h4>
                   <p className="text-xs text-rosary/60 leading-relaxed max-w-2xl">{t('bom.mrpDesc')}</p>
                   <Button className="mt-6 bg-blood hover:bg-blood/80 text-rosary text-[10px] font-black uppercase tracking-widest px-8">اجرای محاسبات MRP</Button>
                </div>
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
