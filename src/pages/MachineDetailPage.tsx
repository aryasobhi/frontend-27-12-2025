import { ArrowLeft, Edit, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockMachines, MachineDetail } from '../data/mockMachines';
import { Badge } from '../components/ui/badge';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface MachineDetailPageProps {
  machineId: string;
  onBack: () => void;
}

export function MachineDetailPage({ machineId, onBack }: MachineDetailPageProps) {
  const { t } = useTranslation();
  const machine = mockMachines.find(m => m.id === machineId);
  
  if (!machine) {
    return (
      <div className="p-8 text-rosary font-vazir" dir="rtl">
        <p className="text-xl mb-4">{t('machines.machineDetails')} یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" />
          {t('common.back')}
        </Button>
      </div>
    );
  }

  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-gold';
    return 'text-blood';
  };

  const getHealthBgColor = (value: number) => {
    if (value >= 90) return 'bg-green-500/20 border-green-500/30';
    if (value >= 70) return 'bg-gold/20 border-gold/30';
    return 'bg-blood/20 border-blood/30';
  };

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" />
            {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{machine.name}</h1>
            <p className="text-rosary/60 font-mono text-sm mt-1 dir-ltr text-right">
              {t('machines.machineCode')}: {machine.code} <span className="text-rosary/40">|</span> {t('machines.model')}: {machine.model}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold backdrop-blur-md">
            <Edit className="w-4 h-4 ml-2" />
            {t('common.edit')}
          </Button>
          <Button size="sm" className="bg-blood text-rosary hover:bg-blood/90 shadow-lg hover:shadow-glow-red">
            زمانبندی تعمیرات
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-rosary/60 font-medium">{t('table.status')}</p>
            <StatusBadge status={machine.status} />
          </div>
          <p className="text-sm text-rosary/80">{machine.location}</p>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <p className="text-sm text-rosary/60 mb-2 font-medium">امتیاز سلامت</p>
          <div className="flex items-center gap-3">
            <div className={`p-2 ${getHealthBgColor(machine.health.overall)} rounded-lg border`}>
              {machine.health.overall >= 70 ? (
                <CheckCircle className={`w-5 h-5 ${getHealthColor(machine.health.overall)}`} />
              ) : (
                <AlertCircle className={`w-5 h-5 ${getHealthColor(machine.health.overall)}`} />
              )}
            </div>
            <span className={`text-2xl font-bold ${getHealthColor(machine.health.overall)}`}>
              {toPersianNumber(machine.health.overall)}٪
            </span>
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <p className="text-sm text-rosary/60 mb-2 font-medium">زمان کارکرد مفید</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-rosary">{toPersianNumber(machine.uptime)}٪</span>
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <p className="text-sm text-rosary/60 mb-2 font-medium">{t('machines.efficiency')}</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-2xl font-bold text-rosary">{toPersianNumber(machine.efficiency)}٪</span>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('machines.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">شاخص‌های سلامت</TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('machines.tabs.maintenance')}</TabsTrigger>
          <TabsTrigger value="parts" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">قطعات و اجزاء</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('machines.tabs.production')}</TabsTrigger>
          <TabsTrigger value="operators" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('machines.tabs.operators')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-gold">{t('machines.machineDetails')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('machines.manufacturer')}</p>
                  <p className="text-rosary">{machine.manufacturer}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('machines.serialNumber')}</p>
                  <p className="font-mono text-sm text-rosary dir-ltr">{machine.serialNumber}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('machines.installDate')}</p>
                  <p className="text-rosary dir-ltr">{toPersianNumber(machine.installDate)}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('machines.type')}</p>
                  <p className="text-rosary">{machine.type}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('machines.capacity')}</p>
                  <p className="text-rosary">{toPersianNumber(machine.capacity)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-rosary/60">توان مصرفی</p>
                  <p className="text-rosary dir-ltr">{toPersianNumber(machine.powerRating)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-gold">برنامه تعمیرات</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-rosary/60 mb-1">{t('machines.lastMaintenance')}</p>
                  <p className="text-rosary dir-ltr text-right">{toPersianNumber(machine.lastMaintenance)}</p>
                </div>
                <div>
                  <p className="text-sm text-rosary/60 mb-1">{t('machines.nextMaintenance')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-rosary font-semibold dir-ltr text-right">{toPersianNumber(machine.nextMaintenance)}</p>
                    <Badge variant="outline" className="text-gold border-gold/30">زمانبندی شده</Badge>
                  </div>
                </div>
                {machine.currentJob && (
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-400 mb-1 font-medium">وظیفه فعلی</p>
                    <p className="text-sm text-rosary">{machine.currentJob}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-4 text-lg font-semibold text-gold">روند عملکرد (۵ روز اخیر)</h3>
            <div className="rounded-lg border border-white/10">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">تاریخ</TableHead>
                    <TableHead className="text-gold">زمان کارکرد مفید ٪</TableHead>
                    <TableHead className="text-gold">بازدهی ٪</TableHead>
                    <TableHead className="text-gold">خروجی</TableHead>
                    <TableHead className="text-gold">ضایعات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machine.performance.map((perf) => (
                    <TableRow key={perf.date} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary dir-ltr text-right">{toPersianNumber(perf.date)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={perf.uptime} className="w-20 bg-white/10 [&>div]:bg-green-500" />
                          <span className="text-sm text-rosary">{toPersianNumber(perf.uptime)}٪</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={perf.efficiency} className="w-20 bg-white/10 [&>div]:bg-gold" />
                          <span className="text-sm text-rosary">{toPersianNumber(perf.efficiency)}٪</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(perf.output)}</TableCell>
                      <TableCell>
                        {perf.defects > 15 ? (
                          <span className="text-blood font-bold">{toPersianNumber(perf.defects)}</span>
                        ) : (
                          <span className="text-rosary">{toPersianNumber(perf.defects)}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Health Metrics Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <p className="text-sm text-rosary/60 mb-3 font-medium">سلامت کلی</p>
              <div className="flex items-center gap-4">
                <Progress value={machine.health.overall} className="flex-1 bg-white/10 [&>div]:bg-green-500" />
                <span className={`text-xl font-bold ${getHealthColor(machine.health.overall)}`}>
                  {toPersianNumber(machine.health.overall)}٪
                </span>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <p className="text-sm text-rosary/60 mb-3 font-medium">دما</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-rosary dir-ltr">{toPersianNumber(machine.health.temperature)}°C</span>
                <Badge variant="outline" className="text-green-400 border-green-400/30">عادی</Badge>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <p className="text-sm text-rosary/60 mb-3 font-medium">لرزش</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-rosary dir-ltr">{toPersianNumber(machine.health.vibration)} mm/s</span>
                <Badge variant="outline" className="text-green-400 border-green-400/30">عادی</Badge>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <p className="text-sm text-rosary/60 mb-3 font-medium">فشار</p>
              <div className="flex items-center gap-4">
                <Progress value={machine.health.pressure} className="flex-1 bg-white/10 [&>div]:bg-gold" />
                <span className="text-xl font-bold text-rosary">{toPersianNumber(machine.health.pressure)}٪</span>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <p className="text-sm text-rosary/60 mb-3 font-medium">{t('machines.operatingHours')}</p>
              <span className="text-2xl font-bold text-rosary">{toPersianNumber(machine.health.runtime)}</span>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance History Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">سوابق تعمیر و نگهداری</h3>
            <div className="space-y-4">
              {machine.maintenanceHistory.map((record) => (
                <div
                  key={record.id}
                  className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-rosary font-medium">{record.description}</h4>
                        <StatusBadge status={record.status} />
                      </div>
                      <p className="text-sm text-rosary/60">
                        {toPersianNumber(record.date)} • {record.technician}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        record.type === 'breakdown'
                          ? 'bg-blood/20 text-blood border-blood/30'
                          : record.type === 'corrective'
                          ? 'bg-gold/20 text-gold border-gold/30'
                          : 'bg-green-500/20 text-green-400 border-green-500/30'
                      }
                    >
                      {record.type === 'breakdown' ? 'خرابی' : record.type === 'corrective' ? 'اصلاحی' : 'پیشگیرانه'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <span className="text-rosary/60">هزینه: </span>
                      <span className="text-rosary font-mono">{formatPersianCurrency(record.cost)}</span>
                    </div>
                    <div>
                      <span className="text-rosary/60">زمان توقف: </span>
                      <span className="text-rosary">{toPersianNumber(record.downtime)} ساعت</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Parts Tab */}
        <TabsContent value="parts" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">قطعات و اجزاء</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">نام قطعه</TableHead>
                    <TableHead className="text-gold">شماره فنی</TableHead>
                    <TableHead className="text-gold">تعداد</TableHead>
                    <TableHead className="text-gold">وضعیت</TableHead>
                    <TableHead className="text-gold">آخرین تعویض</TableHead>
                    <TableHead className="text-gold">تأمین‌کننده</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machine.parts.map((part) => (
                    <TableRow key={part.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary">{part.name}</TableCell>
                      <TableCell className="font-mono text-sm text-rosary/80 dir-ltr text-right">{part.partNumber}</TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(part.quantity)}</TableCell>
                      <TableCell>
                        <StatusBadge status={part.condition} />
                      </TableCell>
                      <TableCell className="text-rosary dir-ltr text-right">{toPersianNumber(part.lastReplaced)}</TableCell>
                      <TableCell className="text-rosary">{part.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Linked Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">محصولات تولیدی</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">محصول</TableHead>
                    <TableHead className="text-gold">نقش در تولید</TableHead>
                    <TableHead className="text-gold">میانگین زمان پخت (دقیقه)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machine.linkedProducts.map((product) => (
                    <TableRow key={product.productId} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary font-medium">{product.productName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-rosary border-white/20">{product.role}</Badge>
                      </TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(product.averageRuntime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">اپراتورهای تایید شده</h3>
             <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">اپراتور</TableHead>
                    <TableHead className="text-gold">گواهینامه</TableHead>
                    <TableHead className="text-gold">آخرین آموزش</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machine.operators.map((operator) => (
                    <TableRow key={operator.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary font-medium">{operator.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-gold/20 text-gold border-none">{operator.certification}</Badge>
                      </TableCell>
                      <TableCell className="text-rosary dir-ltr text-right">{toPersianNumber(operator.lastTrained)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
