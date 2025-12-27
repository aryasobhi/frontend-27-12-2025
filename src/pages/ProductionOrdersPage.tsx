// @ts-nocheck
import { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, MoreVertical, Eye, Edit, Play, Pause, CheckCircle, Factory, Package, Clock } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { useTranslation, toPersianNumber } from '../lib/i18n';

// Mock Production Orders Data
const mockProductionOrders = [
  {
    id: 'po-001',
    orderNumber: 'PRD-2024-1245',
    product: 'نان گندم ممتاز',
    quantity: 500,
    quantityProduced: 475,
    status: 'in-progress',
    priority: 'high',
    startDate: '۱۴۰۳/۰۹/۲۳',
    endDate: '۱۴۰۳/۰۹/۲۳',
    machine: 'میکسر صنعتی M-500',
    operator: 'علی رضایی',
    progress: 95,
    notes: 'سفارش فوری برای توزیع‌کننده دره سبز',
  },
  {
    id: 'po-002',
    orderNumber: 'PRD-2024-1246',
    product: 'نان تنوری',
    quantity: 300,
    quantityProduced: 300,
    status: 'completed',
    priority: 'medium',
    startDate: '۱۴۰۳/۰۹/۲۲',
    endDate: '۱۴۰۳/۰۹/۲۳',
    machine: 'فر بخار SD-600',
    operator: 'محمد کریمی',
    progress: 100,
    notes: '',
  },
  {
    id: 'po-003',
    orderNumber: 'PRD-2024-1247',
    product: 'کلوچه شکلاتی',
    quantity: 800,
    quantityProduced: 450,
    status: 'in-progress',
    priority: 'medium',
    startDate: '۱۴۰۳/۰۹/۲۳',
    endDate: '۱۴۰۳/۰۹/۲۳',
    machine: 'دستگاه بیسکویت CD-100',
    operator: 'سارا محمدی',
    progress: 56,
    notes: '',
  },
  {
    id: 'po-004',
    orderNumber: 'PRD-2024-1248',
    product: 'کروسان ممتاز',
    quantity: 600,
    quantityProduced: 0,
    status: 'planned',
    priority: 'low',
    startDate: '۱۴۰۳/۰۹/۲۴',
    endDate: '۱۴۰۳/۰۹/۲۴',
    machine: 'لمینیتور L-400',
    operator: 'مریم احمدی',
    progress: 0,
    notes: 'برنامه‌ریزی برای شیفت صبح فردا',
  },
  {
    id: 'po-005',
    orderNumber: 'PRD-2024-1249',
    product: 'نان چندغله',
    quantity: 400,
    quantityProduced: 0,
    status: 'cancelled',
    priority: 'medium',
    startDate: '۱۴۰۳/۰۹/۱۹',
    endDate: '۱۴۰۳/۰۹/۱۹',
    machine: 'خط تولید نان BF-50',
    operator: 'حسین زارع',
    progress: 0,
    notes: 'لغو شده به دلیل تعمیرات تجهیزات',
  },
];

export function ProductionOrdersPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredOrders = mockProductionOrders.filter(order => {
    const matchesSearch = order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: mockProductionOrders.length,
    inProgress: mockProductionOrders.filter(o => o.status === 'in-progress').length,
    completed: mockProductionOrders.filter(o => o.status === 'completed').length,
    planned: mockProductionOrders.filter(o => o.status === 'planned').length,
    totalQuantity: mockProductionOrders.reduce((sum, o) => sum + o.quantity, 0),
  };

  // Translations
  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'planned': t('status.planned'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
    'cancelled': t('status.cancelled'),
  };

  const priorityTranslations: Record<string, string> = {
    'all': t('common.all'),
    'low': t('priority.low'),
    'medium': t('priority.medium'),
    'high': t('priority.high'),
    'critical': t('priority.critical'),
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('production.title')}</h1>
          <p className="text-rosary/60">{t('production.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 ml-2" />
            نمایش تقویم
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            {t('production.addOrder')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold/20 rounded-lg border border-gold/30">
              <Factory className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">کل سفارشات</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(stats.total)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <Play className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">در حال تولید</p>
              <p className="text-2xl font-bold text-info">{toPersianNumber(stats.inProgress)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg border border-success/30">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">تکمیل شده</p>
              <p className="text-2xl font-bold text-success">{toPersianNumber(stats.completed)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning/20 rounded-lg border border-warning/30">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">برنامه‌ریزی شده</p>
              <p className="text-2xl font-bold text-warning">{toPersianNumber(stats.planned)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rosary/40 w-4 h-4" />
            <Input
              placeholder={t('common.search')}
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('table.status')} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusTranslations).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('production.priority')} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(priorityTranslations).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            {t('common.filters')}
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('empty.noRecords')}
            description={t('empty.noResults')}
          />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('production.orderNumber')}</TableHead>
                <TableHead>{t('production.product')}</TableHead>
                <TableHead>{t('production.quantity')}</TableHead>
                <TableHead>{t('production.progress')}</TableHead>
                <TableHead>{t('production.machine')}</TableHead>
                <TableHead>{t('production.priority')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{order.orderNumber}</TableCell>
                  <TableCell className="font-medium text-rosary group-hover:text-gold transition-colors">{order.product}</TableCell>
                  <TableCell className="text-rosary">
                    {toPersianNumber(order.quantityProduced)} / {toPersianNumber(order.quantity)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="w-16" />
                      <span className="text-sm text-rosary">{toPersianNumber(order.progress)}٪</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-rosary/80">{order.machine}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.priority === 'high' ? 'error' :
                      order.priority === 'medium' ? 'warning' : 'default'
                    }>
                      {priorityTranslations[order.priority] || order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={statusTranslations[order.status] || order.status} />
                  </TableCell>
                  <TableCell className="text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('table.actions')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 ml-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        {order.status === 'planned' && (
                          <DropdownMenuItem className="text-success hover:bg-success/20">
                            <Play className="w-4 h-4 ml-2" />
                            شروع تولید
                          </DropdownMenuItem>
                        )}
                        {order.status === 'in-progress' && (
                          <>
                            <DropdownMenuItem>
                              <Pause className="w-4 h-4 ml-2" />
                              توقف موقت
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-success hover:bg-success/20">
                              <CheckCircle className="w-4 h-4 ml-2" />
                              تکمیل
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
