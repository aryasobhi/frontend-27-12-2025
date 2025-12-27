import { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, MoreVertical, Eye, Edit, CheckCircle, Wrench, AlertTriangle } from 'lucide-react';
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
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { mockMaintenanceRecords, maintenanceStats } from '../data/mockMaintenance';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface MaintenanceListPageProps {
  onViewRecord: (recordId: string) => void;
}

export function MaintenanceListPage({ onViewRecord }: MaintenanceListPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecords = mockMaintenanceRecords.filter(record => {
    const matchesSearch = record.machineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.recordNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.technician.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = ['all', 'preventive', 'corrective', 'breakdown', 'inspection'];
  const statuses = ['all', 'scheduled', 'in-progress', 'completed', 'cancelled'];

  // Translations
  const typeTranslations: Record<string, string> = {
    'all': t('common.all'),
    'preventive': t('maintenance.types.preventive'),
    'corrective': t('maintenance.types.corrective'),
    'breakdown': t('maintenance.types.emergency'),
    'inspection': 'بازرسی',
  };

  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'scheduled': t('status.scheduled'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
    'cancelled': t('status.cancelled'),
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('maintenance.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('maintenance.subtitle')}</p>
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
            {t('maintenance.addRecord')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <Wrench className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">کل سوابق</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(maintenanceStats?.total || mockMaintenanceRecords.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning/20 rounded-lg border border-warning/30">
              <Calendar className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">زمانبندی شده</p>
              <p className="text-2xl font-bold text-warning">
                {toPersianNumber(mockMaintenanceRecords.filter(r => r.status === 'scheduled').length)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <AlertTriangle className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">در حال انجام</p>
              <p className="text-2xl font-bold text-info">
                {toPersianNumber(mockMaintenanceRecords.filter(r => r.status === 'in-progress').length)}
              </p>
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
              <p className="text-2xl font-bold text-success">
                {toPersianNumber(mockMaintenanceRecords.filter(r => r.status === 'completed').length)}
              </p>
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('maintenance.maintenanceType')} />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {typeTranslations[type] || type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('table.status')} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusTranslations[status] || status}
                </SelectItem>
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
        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('empty.noRecords')}
            description={t('empty.noResults')}
          />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('maintenance.workOrder')}</TableHead>
                <TableHead>{t('maintenance.machine')}</TableHead>
                <TableHead>{t('maintenance.maintenanceType')}</TableHead>
                <TableHead>{t('maintenance.technician')}</TableHead>
                <TableHead>{t('maintenance.scheduledDate')}</TableHead>
                <TableHead>{t('maintenance.cost')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{record.recordNumber}</TableCell>
                  <TableCell className="font-medium text-rosary group-hover:text-gold transition-colors">{record.machineName}</TableCell>
                  <TableCell>
                    <Badge variant={record.type === 'breakdown' ? 'error' : record.type === 'preventive' ? 'success' : 'default'}>
                      {typeTranslations[record.type] || record.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-rosary/80">{record.technician}</TableCell>
                  <TableCell className="text-rosary/80">{record.scheduledDate}</TableCell>
                  <TableCell className="text-rosary">{formatPersianCurrency(record.totalCost || 0)}</TableCell>
                  <TableCell>
                    <StatusBadge status={statusTranslations[record.status] || record.status} />
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
                        <DropdownMenuItem onClick={() => onViewRecord(record.id)}>
                          <Eye className="w-4 h-4 ml-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        {record.status === 'scheduled' && (
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 ml-2" />
                            شروع کار
                          </DropdownMenuItem>
                        )}
                        {record.status === 'in-progress' && (
                          <DropdownMenuItem className="text-success hover:bg-success/20">
                            <CheckCircle className="w-4 h-4 ml-2" />
                            تکمیل
                          </DropdownMenuItem>
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
