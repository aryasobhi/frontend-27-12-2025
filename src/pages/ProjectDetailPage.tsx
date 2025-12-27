import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useProjects } from '../data/useMockData';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';
import { StatusBadge } from '../widgets/StatusBadge';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectDetailPage({ projectId, onBack }: ProjectDetailPageProps) {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
  <div className="p-8 text-rosary type-body" dir="rtl">
        <p className="text-xl mb-4">پروژه یافت نشد</p>
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
            <h1 className="text-3xl font-bold text-gold tracking-wide">{project.name}</h1>
            <p className="text-rosary/60 font-medium tracking-wide">{toPersianNumber(project.code)} • {project.manager}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60 mb-2 font-medium">{t('table.status')}</div>
          <div className="inline-block mt-1">
            <StatusBadge status={project.status} />
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60 mb-2 font-medium">پیشرفت</div>
          <div className="mt-1 font-bold text-gold text-xl font-mono">{toPersianNumber(project.progress)}٪</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60 mb-2 font-medium">بودجه</div>
          <div className="mt-1 font-bold text-rosary text-xl font-mono">{formatPersianCurrency(project.budget)}</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('employees.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">وظایف</TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">بودجه</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">{t('products.description')}</h3>
            <p className="text-sm text-rosary/80 leading-relaxed mb-6">{project.description}</p>
            <h4 className="mb-3 text-sm text-rosary/60 font-medium uppercase tracking-wider">تیم پروژه</h4>
            <div className="flex gap-2 flex-wrap">
              {project.team.map((m) => (
                <div key={m.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-rosary">
                  <span className="font-bold">{m.name}</span> • <span className="opacity-60">{m.role}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-4 text-gold font-semibold">وظایف</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold text-right">وظیفه</TableHead>
                    <TableHead className="text-gold text-right">مسئول</TableHead>
                    <TableHead className="text-gold text-right">وضعیت</TableHead>
                    <TableHead className="text-gold text-right">سررسید</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.tasks.map((t) => (
                    <TableRow key={t.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary font-medium">{t.name}</TableCell>
                      <TableCell className="text-rosary">{t.assignedTo}</TableCell>
                      <TableCell>
                        <StatusBadge status={t.status} />
                      </TableCell>
                      <TableCell className="text-sm text-rosary/60 dir-ltr text-right font-mono">{toPersianNumber(t.dueDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-4 text-gold font-semibold">تفکیک بودجه</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold text-right">دسته‌بندی</TableHead>
                    <TableHead className="text-gold text-right">تخصیص یافته</TableHead>
                    <TableHead className="text-gold text-right">هزینه شده</TableHead>
                    <TableHead className="text-gold text-right">باقی‌مانده</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.budgetBreakdown.map((b) => (
                    <TableRow key={b.category} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-rosary font-medium">{b.category}</TableCell>
                      <TableCell className="text-rosary font-mono">{formatPersianCurrency(b.allocated)}</TableCell>
                      <TableCell className="text-blood font-mono">{formatPersianCurrency(b.spent)}</TableCell>
                      <TableCell className="text-green-400 font-mono">{formatPersianCurrency(b.remaining)}</TableCell>
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
