import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useQualityControl } from '../data/useMockData';
import { StatusBadge } from '../widgets/StatusBadge';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface QualityControlDetailPageProps {
  recordId: string;
  onBack: () => void;
}

export function QualityControlDetailPage({ recordId, onBack }: QualityControlDetailPageProps) {
  const { t } = useTranslation();
  const { records } = useQualityControl();
  const record = records.find(r => r.id === recordId);

  if (!record) {
    return (
      <div className="p-8 text-rosary font-vazir" dir="rtl">
        <p className="text-xl mb-4">گزارش بازرسی یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{toPersianNumber(record.inspectionId)} • {record.productName}</h1>
            <p className="text-rosary/60 font-medium tracking-wide">سری ساخت: {toPersianNumber(record.batchNumber)} • بازرس: {record.inspector}</p>
          </div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">اندازه نمونه</div>
          <div className="mt-1 font-bold text-gold text-xl">{toPersianNumber(record.sampleSize)}</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">موارد نقص</div>
          <div className={`mt-1 font-bold text-xl ${record.defectsFound > 0 ? 'text-blood' : 'text-green-400'}`}>{toPersianNumber(record.defectsFound)}</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">نرخ نقص</div>
          <div className={`mt-1 font-bold text-xl ${record.defectRate > 5 ? 'text-blood' : 'text-green-400'}`}>{toPersianNumber(record.defectRate)}٪</div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60">تاریخ بازرسی</div>
          <div className="mt-1 font-bold text-rosary dir-ltr text-right">{toPersianNumber(record.inspectionDate)}</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('employees.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">نتایج</TabsTrigger>
          <TabsTrigger value="nonconformance" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">عدم انطباق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-2 text-gold font-semibold">خلاصه</h3>
            <p className="text-sm text-rosary/80 leading-relaxed">{record.notes}</p>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-3 text-gold font-semibold">معیارهای بازرسی</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold text-right">معیار</TableHead>
                    <TableHead className="text-gold text-right">استاندارد</TableHead>
                    <TableHead className="text-gold text-right">نتیجه</TableHead>
                    <TableHead className="text-gold text-right">وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.criteria.map((c, idx) => (
                    <TableRow key={idx} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary font-medium">{c.name}</TableCell>
                      <TableCell className="text-rosary/80">{c.standard}</TableCell>
                      <TableCell className="text-rosary/80">{c.result}</TableCell>
                      <TableCell className={c.passed ? 'text-green-400 font-bold' : 'text-blood font-bold'}>{c.passed ? 'قبول' : 'رد'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="nonconformance">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-3 text-gold font-semibold">جزئیات نقص</h3>
            {record.defects.length === 0 ? (
              <p className="text-sm text-rosary/60">هیچ نقصی ثبت نشده است</p>
            ) : (
              <div className="space-y-3">
                {record.defects.map((d, idx) => (
                  <div key={idx} className="p-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-rosary">{d.type}</div>
                        <div className={`text-xs ${
                          d.severity === 'critical' ? 'text-blood' :
                          d.severity === 'major' ? 'text-orange-400' :
                          'text-gold'
                        }`}>شدت: {d.severity === 'critical' ? 'بحرانی' : d.severity === 'major' ? 'بالا' : 'متوسط'}</div>
                      </div>
                      <div className="text-sm text-rosary/80">تعداد: <span className="text-blood font-bold">{toPersianNumber(d.count)}</span></div>
                    </div>
                    <p className="text-sm text-rosary/60 mt-2 italic">{d.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
