import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Beaker, Plus, FlaskConical, TrendingUp, Search, Activity, Package, FlaskRound, MoreVertical, Edit, Copy, PlusSquare, Trash2, Microscope } from 'lucide-react';
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

interface Formula {
  id: string;
  name: string;
  code: string;
  category: string;
  version: string;
  status: 'active' | 'testing' | 'archived';
  ingredients: { name: string; percentage: number; role: string }[];
  totalPercentage: number;
  batchSize: number;
  yield: number;
  qualityScore: number;
  cost: number;
  createdBy: string;
  lastModified: string;
}

const mockFormulas: Formula[] = [
  {
    id: '1',
    name: 'فرمول سس گوجه فرنگی ممتاز',
    code: 'FORM-001',
    category: 'Sauces',
    version: 'v3.2',
    status: 'active',
    ingredients: [
      { name: 'پوره گوجه فرنگی ارگانیک', percentage: 75, role: 'Base' },
      { name: 'روغن زیتون فرابکر', percentage: 8, role: 'Fat' },
      { name: 'پودر پیاز', percentage: 3, role: 'Flavor' },
      { name: 'پودر سیر', percentage: 2, role: 'Flavor' },
      { name: 'نمک دریا', percentage: 1.5, role: 'Seasoning' },
      { name: 'فلفل سیاه', percentage: 0.5, role: 'Spice' },
      { name: 'ریحان', percentage: 2, role: 'Herb' },
      { name: 'شکر', percentage: 1, role: 'Sweetener' },
      { name: 'اسید سیتریک', percentage: 0.3, role: 'Preservative' },
      { name: 'آب', percentage: 6.7, role: 'Solvent' },
    ],
    totalPercentage: 100,
    batchSize: 100,
    yield: 98,
    qualityScore: 9.2,
    cost: 34500,
    createdBy: 'سارا چن',
    lastModified: '2025-10-15',
  },
  {
    id: '2',
    name: 'مخلوط نان غلات کامل',
    code: 'FORM-002',
    category: 'Bakery',
    version: 'v2.0',
    status: 'active',
    ingredients: [
      { name: 'آرد گندم کامل', percentage: 70, role: 'Base' },
      { name: 'آرد سفید', percentage: 15, role: 'Structure' },
      { name: 'آب', percentage: 10, role: 'Hydration' },
      { name: 'خمیر مایه', percentage: 2, role: 'Leavening' },
      { name: 'نمک', percentage: 1.5, role: 'Flavor' },
      { name: 'شکر', percentage: 1, role: 'Food for yeast' },
      { name: 'روغن گیاهی', percentage: 0.5, role: 'Softness' },
    ],
    totalPercentage: 100,
    batchSize: 50,
    yield: 49,
    qualityScore: 8.8,
    cost: 21500,
    createdBy: 'مایک جانسون',
    lastModified: '2025-09-20',
  },
];

export function Formulation() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'testing': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'archived': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('formulation.title')}
        subtitle={t('formulation.manageFormulas')}
        action={{
          label: t('formulation.createFormula'),
          icon: Plus,
          onClick: () => console.log('Create Formula clicked'),
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('formulation.activeFormulas'), value: toPersianNumber('۶۸'), sub: t('formulation.acrossCategories'), icon: Beaker, color: 'text-gold' },
          { label: t('formulation.inTesting'), value: toPersianNumber('۱۲'), sub: t('formulation.underEvaluation'), icon: FlaskConical, color: 'text-gold' },
          { label: t('formulation.avgQualityScore'), value: `${toPersianNumber('۸.۷')}/۱۰`, sub: t('common.excellent'), icon: TrendingUp, color: 'text-green-400' },
          { label: t('formulation.costOptimization'), value: '-۸.۵٪', sub: t('common.vsLastQuarter'), icon: TrendingUp, color: 'text-gold' },
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

      <Tabs defaultValue="formulas" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <TabsTrigger value="formulas" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('formulation.formulas')}</TabsTrigger>
          <TabsTrigger value="ingredients" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('formulation.ingredientLibrary')}</TabsTrigger>
          <TabsTrigger value="testing" className="rounded-xl px-8 data-[state=active]:bg-gold data-[state=active]:text-damask transition-all">{t('formulation.testingDev')}</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas" className="space-y-8">
          {mockFormulas.filter(f => f.name.includes(searchTerm) || f.code.includes(searchTerm)).map((formula) => (
            <Card key={formula.id} className="group">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-5 text-right flex-1">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                    <FlaskRound className="h-8 w-8 text-gold/40 group-hover:text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <h3 className="text-xl font-black text-gold tracking-tight">{formula.name}</h3>
                       <Badge className={cn(getStatusColor(formula.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                        {t(`status.${formula.status}`)}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-rosary/40 uppercase tracking-widest">
                       <span>{t('common.category')}: <span className="text-rosary/60">{t(`common.${formula.category.toLowerCase()}`)}</span></span>
                       <span>{t('common.version')}: <span className="text-rosary/60 font-mono text-xs">{formula.version}</span></span>
                       <span>{t('common.createdBy')}: <span className="text-rosary/60">{formula.createdBy}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-right min-w-[200px] flex items-center justify-between gap-8">
                    <div>
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{t('formulation.qualityScore')}</p>
                      <div className="text-3xl font-black text-gold font-mono leading-none">
                        {toPersianNumber(formula.qualityScore.toString())}
                        <span className="text-xs text-rosary/20 font-vazir block mt-1">از ۱۰</span>
                      </div>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div>
                      <p className="text-[10px] text-rosary/40 font-bold uppercase tracking-widest mb-1">{t('formulation.costPerKg')}</p>
                      <div className="text-xl font-black text-rosary font-mono leading-none pt-1">
                        {toPersianNumber(formula.cost.toLocaleString())}
                        <span className="text-[10px] text-rosary/20 font-vazir block mt-1">{t('units.toman')}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-white/5 h-10 w-10">
                        <MoreVertical className="h-5 w-5 text-rosary/30" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                      <DropdownMenuItem onClick={() => console.log('Edit formula', formula.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Edit className="ml-2 h-4 w-4 text-gold" />
                        <span className="font-bold text-xs">{t('common.edit')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Clone formula', formula.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Copy className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">{t('common.clone')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Test batch', formula.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                        <Microscope className="ml-2 h-4 w-4 text-gold/40" />
                        <span className="font-bold text-xs">{t('formulation.testBatch')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Delete formula', formula.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                        <Trash2 className="ml-2 h-4 w-4" />
                        <span className="font-bold text-xs">{t('common.delete')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1 space-y-6">
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/5 group-hover:border-gold/10 transition-colors duration-500">
                      <h4 className="text-xs font-black text-gold/60 uppercase tracking-widest flex items-center gap-2 mb-6">
                        <Activity className="h-4 w-4" />
                        {t('formulation.formulaDetails')}
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rosary/40 uppercase tracking-wider">{t('formulation.batchSize')}</span>
                          <span className="text-xs font-black font-mono text-rosary/60">{toPersianNumber(formula.batchSize.toString())} {t('units.kg')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rosary/40 uppercase tracking-wider">{t('bom.yield')}</span>
                          <span className="text-xs font-black font-mono text-rosary/60">{toPersianNumber(formula.yield.toString())}%</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-[10px] font-bold text-rosary/40 uppercase tracking-wider">{t('common.modified')}</span>
                          <span className="text-[10px] font-black font-mono text-rosary/40 uppercase">{toPersianNumber(new Date(formula.lastModified).toLocaleDateString('fa-IR'))}</span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-2">
                  <h4 className="text-xs font-black text-gold/60 uppercase tracking-widest flex items-center gap-2 mb-6">
                    <Beaker className="h-4 w-4" />
                    {t('formulation.ingredientComposition')}
                  </h4>
                  
                  <TableContainer>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('formulation.ingredient')}</TableHead>
                        <TableHead>{t('formulation.role')}</TableHead>
                        <TableHead className="text-left">{t('common.percentage')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formula.ingredients.map((ing, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold text-rosary group-hover:text-gold transition-colors">{ing.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-white/10 text-rosary/40 bg-white/5 text-[10px] uppercase font-bold px-3">
                              {t(`formulation.roles.${ing.role.toLowerCase().replace(' ', '_')}`)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-left font-mono text-xs font-black text-gold/60">{toPersianNumber(ing.percentage.toString())}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <tfoot>
                      <TableRow className="border-t border-gold/20 bg-gold/5">
                        <TableCell className="font-black text-gold text-xs uppercase pt-4 pb-4" colSpan={2}>
                          {t('common.total')}
                        </TableCell>
                        <TableCell className="font-mono text-gold text-sm font-black pt-4 pb-4 text-left">
                          {toPersianNumber(formula.totalPercentage.toString())}%
                        </TableCell>
                      </TableRow>
                    </tfoot>
                  </TableContainer>
                </div>
              </div>

            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ingredients" className="space-y-6">
          <Card title={t('formulation.ingredientLibrary')} collapsible>
             <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <Beaker className="h-10 w-10 text-gold/20" />
                </div>
                <p className="text-rosary/30 text-lg font-bold tracking-tight">{t('formulation.ingredientLibDesc')}</p>
                <p className="text-rosary/20 text-xs mt-3">بانک اطلاعاتی مواد اولیه در حال تکمیل شدن است</p>
             </div>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card title={t('formulation.testingDev')} collapsible>
             <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <FlaskConical className="h-10 w-10 text-gold/20" />
                </div>
                <p className="text-rosary/30 text-lg font-bold tracking-tight">{t('formulation.testingDevDesc')}</p>
                <p className="text-rosary/20 text-xs mt-3">سیستم مدیریت آزمایش‌های کیفی به زودی فعال خواهد شد</p>
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
