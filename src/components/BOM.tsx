import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BookOpen, Plus, Factory, Calendar, TrendingUp, Search, Activity, Package, Layers, FlaskConical, MoreVertical, Edit, Copy, PlusSquare, Eye, Trash2 } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface BOMItem {
  id: string;
  productName: string;
  productCode: string;
  version: string;
  status: 'active' | 'draft' | 'obsolete';
  materials: { name: string; quantity: number; unit: string; cost: number }[];
  totalCost: number;
  yield: number;
  lastUpdated: string;
}

interface ProductionPlan {
  id: string;
  planNumber: string;
  product: string;
  plannedQuantity: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed';
  progress: number;
}

const mockBOMs: BOMItem[] = [
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
  },
  {
    id: '2',
    productName: 'نان گندم کامل',
    productCode: 'PRD-002',
    version: 'v1.5',
    status: 'active',
    materials: [
      { name: 'آرد گندم ارگانیک', quantity: 10, unit: 'kg', cost: 425000 },
      { name: 'خمیر مایه', quantity: 0.2, unit: 'kg', cost: 35000 },
      { name: 'آب', quantity: 6, unit: 'L', cost: 0 },
      { name: 'نمک', quantity: 0.15, unit: 'kg', cost: 3000 },
    ],
    totalCost: 463000,
    yield: 20,
    lastUpdated: '2025-09-20',
  },
];

const mockProductionPlans: ProductionPlan[] = [
  {
    id: '1',
    planNumber: 'PLAN-2024-001',
    product: 'سس گوجه فرنگی ارگانیک',
    plannedQuantity: 5000,
    startDate: '2025-11-05',
    endDate: '2025-11-10',
    status: 'planned',
    progress: 0,
  },
  {
    id: '2',
    planNumber: 'PLAN-2024-002',
    product: 'نان گندم کامل',
    plannedQuantity: 3000,
    startDate: '2025-11-03',
    endDate: '2025-11-06',
    status: 'in-progress',
    progress: 45,
  },
];

export function BOM() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'draft': return 'bg-rosary/20 text-rosary border border-rosary/30';
      case 'obsolete': return 'bg-blood/20 text-blood border border-blood/30';
      case 'planned': return 'bg-blue-400/20 text-blue-400 border border-blue-400/30';
      case 'in-progress': return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      case 'completed': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('bom.title')}
        subtitle={t('bom.manageBOM')}
        action={{
          label: t('bom.createBOM'),
          icon: Plus,
          onClick: () => console.log('Create BOM clicked'),
        }}
      />

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
          <TabsTrigger value="bom" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('bom.billOfMaterials')}</TabsTrigger>
          <TabsTrigger value="planning" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('bom.productionPlanning')}</TabsTrigger>
          <TabsTrigger value="costing" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('bom.costAnalysis')}</TabsTrigger>
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
                       <span>{t('bom.yield')}: <span className="text-rosary/60 font-mono text-xs">{toPersianNumber(bom.yield.toString())}</span> {t('units.units')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-right min-w-[200px]">
                    <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{t('accounting.totalCost')}</p>
                    <div className="text-2xl font-black text-gold font-mono leading-none">
                      {toPersianNumber(bom.totalCost.toLocaleString())} <span className="text-xs font-vazir text-gold/60">{t('units.toman')}</span>
                    </div>
                    <p className="text-[10px] text-rosary/30 mt-2 font-bold uppercase tracking-tighter">
                      {toPersianNumber((bom.totalCost / bom.yield).toLocaleString())} {t('common.perUnit')}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-white/5 h-10 w-10">
                        <MoreVertical className="h-5 w-5 text-rosary/30" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                      <DropdownMenuItem onClick={() => console.log('Edit BOM', bom.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Edit className="ml-2 h-4 w-4 text-gold" />
                        <span className="font-bold text-xs">{t('common.edit')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Copy BOM', bom.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Copy className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">{t('common.copy')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('New version', bom.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <PlusSquare className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">{t('bom.newVersion')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Delete BOM', bom.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                        <Trash2 className="ml-2 h-4 w-4" />
                        <span className="font-bold text-xs">{t('common.delete')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                      <TableRow key={index}>
                        <TableCell className="font-bold text-rosary group-hover:text-gold transition-colors">{material.name}</TableCell>
                        <TableCell className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(material.quantity.toString())}</TableCell>
                        <TableCell className="text-[10px] font-bold text-rosary/40 uppercase">{t(`units.${material.unit.toLowerCase()}`)}</TableCell>
                        <TableCell className="text-left font-mono text-xs font-black text-gold/60">{toPersianNumber(material.cost.toLocaleString())}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </div>

            </Card>
          ))}
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <Card title={t('bom.productionPlanning')} collapsible>
            <TableContainer>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('bom.planNumber')}</TableHead>
                  <TableHead>{t('nav.products')}</TableHead>
                  <TableHead>{t('common.quantity')}</TableHead>
                  <TableHead>{t('common.startDate')}</TableHead>
                  <TableHead>{t('common.progress')}</TableHead>
                  <TableHead>{t('status.status')}</TableHead>
                  <TableHead className="text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProductionPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-black text-gold/60">{toPersianNumber(plan.planNumber)}</span>
                    </TableCell>
                    <TableCell className="font-bold">{plan.product}</TableCell>
                    <TableCell className="font-mono text-xs font-black text-rosary/60">{toPersianNumber(plan.plannedQuantity.toString())}</TableCell>
                    <TableCell className="text-xs text-rosary/60 font-medium">
                      {toPersianNumber(new Date(plan.startDate).toLocaleDateString('fa-IR'))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className="h-full bg-gold shadow-glow-gold transition-all duration-1000"
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black font-mono text-gold/60">{toPersianNumber(plan.progress.toString())}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(plan.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                        {t(`status.${plan.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:text-gold hover:bg-white/5 h-8 w-8 text-gold">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                          <DropdownMenuItem onClick={() => console.log('View plan', plan.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Eye className="ml-2 h-4 w-4 text-gold/40" />
                            <span className="font-bold text-xs">{t('common.view')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Edit plan', plan.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                            <Edit className="ml-2 h-4 w-4 text-gold" />
                            <span className="font-bold text-xs">{t('common.edit')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>

          <Card title={t('bom.mrpTitle')} collapsible>
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

        <TabsContent value="costing" className="space-y-6">
          <Card title={t('bom.costAnalysis')} collapsible>
             <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <Factory className="h-10 w-10 text-gold/20" />
                </div>
                <p className="text-rosary/30 text-lg font-bold tracking-tight">{t('bom.costAnalysisDesc')}</p>
                <p className="text-rosary/20 text-xs mt-3">این بخش در بروزرسانی بعدی در دسترس قرار خواهد گرفت</p>
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
