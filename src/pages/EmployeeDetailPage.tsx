import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Award, Wrench, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
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
import { mockEmployees } from '../data/mockEmployees';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface EmployeeDetailPageProps {
  employeeId: string;
  onBack: () => void;
}

export function EmployeeDetailPage({ employeeId, onBack }: EmployeeDetailPageProps) {
  const { t } = useTranslation();
  const employee = mockEmployees.find(e => e.id === employeeId);
  
  if (!employee) {
    return (
  <div className="p-8 text-rosary type-body" dir="rtl">
        <p className="text-xl mb-4">{t('employees.employeeDetails')} یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" />
          {t('common.back')}
        </Button>
      </div>
    );
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-gold/20 text-gold border-gold/30';
      case 'advanced': return 'bg-blood/20 text-blood border-blood/30';
      case 'intermediate': return 'bg-rosary/20 text-rosary border-rosary/30';
      case 'beginner': return 'bg-white/10 text-white/60 border-white/20';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" />
            {t('common.back')}
          </Button>
          <div className="w-16 h-16 bg-gradient-to-br from-blood to-damask rounded-full flex items-center justify-center text-rosary text-2xl font-bold shadow-lg border border-gold/20">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{employee.name}</h1>
            <p className="text-rosary/60 font-medium">{employee.position} • {employee.department}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold backdrop-blur-md">
            <Edit className="w-4 h-4 ml-2" />
            {t('employees.editEmployee')}
          </Button>
          <Button size="sm" className="bg-blood text-rosary hover:bg-blood/90 shadow-lg hover:shadow-glow-red">
            زمانبندی آموزش
          </Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-4 h-4 text-gold" />
            <p className="text-sm text-rosary/60 font-medium">{t('employees.email')}</p>
          </div>
          <p className="text-sm text-rosary font-mono dir-ltr text-right">{employee.email}</p>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-4 h-4 text-gold" />
            <p className="text-sm text-rosary/60 font-medium">{t('employees.phone')}</p>
          </div>
          <p className="text-sm text-rosary dir-ltr text-right">{toPersianNumber(employee.phone)}</p>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-4 h-4 text-gold" />
            <p className="text-sm text-rosary/60 font-medium">{t('employees.hireDate')}</p>
          </div>
          <p className="text-sm text-rosary dir-ltr text-right">{toPersianNumber(employee.joinDate)}</p>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            <p className="text-sm text-rosary/60 font-medium">{t('table.status')}</p>
          </div>
          <StatusBadge status={employee.status} />
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('employees.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">مهارت‌ها و مدارک</TabsTrigger>
          <TabsTrigger value="machines" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">ماشین‌آلات تخصصی</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('employees.tabs.performance')}</TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('employees.tabs.attendance')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-gold">اطلاعات فردی</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">{t('employees.employeeId')}</p>
                  <p className="font-mono text-sm text-rosary dir-ltr">{toPersianNumber(employee.employeeNumber)}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">تاریخ تولد</p>
                  <p className="text-rosary dir-ltr">{toPersianNumber(employee.dateOfBirth)}</p>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60">آدرس</p>
                  <p className="text-rosary text-right">{employee.address}، {employee.city}، {employee.country}</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60 mb-1">تماس اضطراری</p>
                  <div className="flex justify-between">
                    <p className="text-rosary">{employee.emergencyContact.name} <span className="text-rosary/60 text-xs">({employee.emergencyContact.relationship})</span></p>
                    <p className="text-sm text-gold font-mono dir-ltr">{toPersianNumber(employee.emergencyContact.phone)}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-gold">خلاصه حرفه‌ای</h3>
              <p className="text-sm text-rosary/80 mb-6 leading-relaxed italic text-right">{employee.bio.summary}</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-sm text-rosary/60">سابقه کار</span>
                  <span className="text-rosary font-bold">{toPersianNumber(employee.bio.experience)} سال</span>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-sm text-rosary/60 mb-1">تحصیلات</p>
                  <p className="text-sm text-rosary">{employee.bio.education}</p>
                </div>
                <div>
                  <p className="text-sm text-rosary/60 mb-2">شرکت‌های قبلی</p>
                  <div className="flex flex-wrap gap-2">
                    {employee.bio.previousCompanies.map((company, idx) => (
                      <Badge key={idx} variant="outline" className="text-rosary border-white/20 bg-white/5">{company}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Skills & Certificates Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">مهارت‌ها</h3>
            <div className="space-y-4">
              {employee.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-rosary font-medium">{skill.name}</span>
                      <Badge variant="outline" className={getSkillColor(skill.level)}>
                        {skill.level === 'expert' ? 'خبره' : skill.level === 'advanced' ? 'پیشرفته' : skill.level === 'intermediate' ? 'متوسط' : 'مبتدی'}
                      </Badge>
                    </div>
                    <span className="text-sm text-rosary/60">{toPersianNumber(skill.yearsOfExperience)} سال</span>
                  </div>
                  <Progress 
                    value={skill.level === 'expert' ? 100 : skill.level === 'advanced' ? 75 : skill.level === 'intermediate' ? 50 : 25} 
                    className="h-2 bg-white/10 [&>div]:bg-gold"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">مدارک و گواهینامه‌ها</h3>
            <div className="space-y-3">
              {employee.certificates.map((cert) => (
                <div key={cert.id} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-gold" />
                        <h4 className="text-rosary font-medium">{cert.name}</h4>
                      </div>
                      <p className="text-sm text-rosary/60">{cert.issuedBy}</p>
                    </div>
                    <StatusBadge status={cert.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                    <div>
                      <span className="text-rosary/60">تاریخ صدور: </span>
                      <span className="text-rosary dir-ltr inline-block">{toPersianNumber(cert.issueDate)}</span>
                    </div>
                    {cert.expiryDate && (
                      <div>
                        <span className="text-rosary/60">انقضا: </span>
                        <span className="text-rosary dir-ltr inline-block">{toPersianNumber(cert.expiryDate)}</span>
                      </div>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="text-sm text-rosary/40 mt-2 font-mono dir-ltr text-right">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Assigned Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-4 text-lg font-semibold text-gold">گواهینامه‌ها و تخصیص ماشین‌آلات</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold text-right">ماشین</TableHead>
                    <TableHead className="text-gold text-right">گواهینامه</TableHead>
                    <TableHead className="text-gold text-right">تاریخ تخصیص</TableHead>
                    <TableHead className="text-gold text-right">سطح مهارت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.assignedMachines.map((machine) => (
                    <TableRow key={machine.machineId} className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center gap-2 text-rosary">
                          <Wrench className="w-4 h-4 text-rosary/60" />
                          {machine.machineName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-white/10 text-rosary border-white/20 hover:bg-white/20">{machine.certification}</Badge>
                      </TableCell>
                      <TableCell className="text-rosary dir-ltr text-right">{toPersianNumber(machine.assignedDate)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            machine.proficiencyLevel === 'master' ? 'bg-gold/20 text-gold border-gold/30' :
                            machine.proficiencyLevel === 'senior' ? 'bg-blood/20 text-blood border-blood/30' :
                            machine.proficiencyLevel === 'operator' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-rosary/20 text-rosary border-rosary/30'
                          }
                        >
                          {machine.proficiencyLevel === 'master' ? 'استادکار' : machine.proficiencyLevel === 'senior' ? 'ارشد' : machine.proficiencyLevel === 'operator' ? 'اپراتور' : 'کارآموز'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">ارزیابی عملکرد</h3>
            <div className="space-y-6">
              {employee.performanceReviews.map((review) => (
                <div key={review.id} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-rosary font-medium text-lg">گزارش ارزیابی عملکرد</h4>
                      <p className="text-sm text-rosary/60 dir-ltr text-right">{toPersianNumber(review.date)} • ارزیابی شده توسط {review.reviewer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-rosary/60 uppercase tracking-wider">Rating</p>
                        <p className="text-2xl font-bold text-green-400">{review.rating}/5.0</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gold mb-2 font-medium uppercase tracking-wide">نقاط قوت</p>
                      <ul className="space-y-2">
                        {review.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 text-rosary/90">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-blood mb-2 font-medium uppercase tracking-wide">موارد قابل بهبود</p>
                      <ul className="space-y-2">
                        {review.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 text-rosary/90">
                            <span className="text-blood mt-1">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-rosary mb-2 font-medium uppercase tracking-wide">اهداف دوره بعد</p>
                      <ul className="space-y-2">
                        {review.goals.map((goal, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 text-rosary/90">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-4 text-lg font-semibold text-gold">سوابق حضور و غیاب (۶ ماه اخیر)</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold text-right">ماه</TableHead>
                    <TableHead className="text-gold text-right">حاضر</TableHead>
                    <TableHead className="text-gold text-right">غایب</TableHead>
                    <TableHead className="text-gold text-right">تأخیر</TableHead>
                    <TableHead className="text-gold text-right">اضافه‌کاری (ساعت)</TableHead>
                    <TableHead className="text-gold text-right">نرخ حضور</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.attendance.map((record) => {
                    const totalDays = record.present + record.absent;
                    const attendanceRate = ((record.present / totalDays) * 100).toFixed(1);
                    return (
                      <TableRow key={record.month} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-rosary font-medium">{record.month}</TableCell>
                        <TableCell className="text-green-400">{toPersianNumber(record.present)}</TableCell>
                        <TableCell className={record.absent > 0 ? 'text-blood' : 'text-rosary/60'}>{toPersianNumber(record.absent)}</TableCell>
                        <TableCell className={record.late > 0 ? 'text-gold' : 'text-rosary/60'}>{toPersianNumber(record.late)}</TableCell>
                        <TableCell className="text-rosary">{toPersianNumber(record.overtime)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={parseFloat(attendanceRate)} className="w-20 bg-white/10 [&>div]:bg-green-500" />
                            <span className="text-sm text-rosary">{toPersianNumber(attendanceRate)}٪</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
