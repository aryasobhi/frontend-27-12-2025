import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useMaintenance } from '../data/useMockData';
import { StatusBadge } from '../widgets/StatusBadge';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface MaintenanceDetailPageProps {
  recordId: string;
  onBack: () => void;
}

export function MaintenanceDetailPage({ recordId, onBack }: MaintenanceDetailPageProps) {
  const { t } = useTranslation();
  const { records } = useMaintenance();
  const record = records.find(r => r.id === recordId);

  if (!record) {
    return (
  <div className="p-8 text-rosary type-body" dir="rtl">
        <p className="text-xl mb-4">رکورد نگهداری یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
        </Button>
      </div>
    );
  }

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{toPersianNumber(record.recordNumber)}</h1>
            <p className="text-rosary/60 font-medium">{record.machineName} • {record.technician}</p>
          </div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">{t('machines.type')}</div>
          <div className="mt-1 font-bold text-rosary">{record.type === 'preventive' ? 'پیشگیرانه' : record.type === 'corrective' ? 'اصلاحی' : record.type}</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">{t('production.priority')}</div>
          <div className={`mt-1 font-bold ${
            record.priority === 'critical' ? 'text-blood' : 
            record.priority === 'high' ? 'text-orange-400' : 
            record.priority === 'medium' ? 'text-gold' : 'text-rosary'
          }`}>{record.priority === 'critical' ? 'بحرانی' : record.priority === 'high' ? 'بالا' : record.priority === 'medium' ? 'متوسط' : 'کم'}</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">زمان‌بندی شده</div>
          <div className="mt-1 font-bold text-rosary dir-ltr text-right">{toPersianNumber(record.scheduledDate)}</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">زمان خرابی</div>
          <div className="mt-1 font-bold text-blood">{toPersianNumber(record.downtime)} ساعت</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('machines.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">سابقه</TabsTrigger>
          <TabsTrigger value="parts" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">قطعات استفاده شده</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-3 text-gold font-semibold">{t('products.description')}</h3>
            <p className="text-sm text-rosary/80 leading-relaxed">{record.description}</p>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-3 text-gold font-semibold">کارهای انجام شده</h3>
            <p className="text-sm text-rosary/80 leading-relaxed">{record.workPerformed ?? 'جزییاتی ثبت نشده است'}</p>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-3 text-gold font-semibold">قطعات تعویض شده</h3>
            {record.partsReplaced.length === 0 ? (
              <p className="text-sm text-rosary/60">قطعه‌ای ثبت نشده است</p>
            ) : (
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-gold text-right">قطعه</TableHead>
                      <TableHead className="text-gold text-right">شماره قطعه</TableHead>
                      <TableHead className="text-gold text-right">تعداد</TableHead>
                      <TableHead className="text-right text-gold">هزینه</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {record.partsReplaced.map((p) => (
                      <TableRow key={p.partNumber} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-rosary">{p.partName}</TableCell>
                        <TableCell className="font-mono text-sm text-rosary/60 dir-ltr text-right">{toPersianNumber(p.partNumber)}</TableCell>
                        <TableCell className="text-rosary">{toPersianNumber(p.quantity)}</TableCell>
                        <TableCell className="text-right text-rosary font-mono">{formatPersianCurrency(p.cost)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
