import { useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Eye, Edit, Wrench, AlertTriangle } from 'lucide-react';
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
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { mockMachines } from '../data/mockMachines';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface MachineListPageProps {
  onViewMachine: (machineId: string) => void;
}

export function MachineListPage({ onViewMachine }: MachineListPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMachines = mockMachines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         machine.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || machine.status === statusFilter;
    const matchesType = typeFilter === 'all' || machine.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const types = ['all', ...Array.from(new Set(mockMachines.map(m => m.type)))];
  const statuses = ['all', 'operational', 'maintenance', 'idle', 'error'];

  // Status translations
  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'operational': t('machines.status.running'),
    'maintenance': t('machines.status.maintenance'),
    'idle': t('machines.status.idle'),
    'error': 'خطا',
  };

  // Type translations
  const typeTranslations: Record<string, string> = {
    'all': t('common.all'),
    'Processing': 'پردازش',
    'Packaging': 'بسته‌بندی',
    'Mixing': 'مخلوط‌کردن',
    'Heating': 'گرمایش',
    'Cooling': 'سرمایش',
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('machines.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('machines.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            {t('machines.addMachine')}
          </Button>
        </div>
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
              <SelectValue placeholder={t('machines.type')} />
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">کل ماشین‌آلات</p>
          <p className="text-3xl mt-2 font-bold text-gold">{toPersianNumber(mockMachines.length)}</p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">در حال کار</p>
          <p className="text-3xl mt-2 font-bold text-success">
            {toPersianNumber(mockMachines.filter(m => m.status === 'operational').length)}
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">تعمیرات</p>
          <p className="text-3xl mt-2 font-bold text-warning">
            {toPersianNumber(mockMachines.filter(m => m.status === 'maintenance').length)}
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">میانگین بازدهی</p>
          <p className="text-3xl mt-2 font-bold text-gold">
            {toPersianNumber(Math.round(mockMachines.reduce((sum, m) => sum + m.efficiency, 0) / mockMachines.length))}٪
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        {filteredMachines.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('empty.noMachines')}
            description={t('empty.noResults')}
          />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('machines.machineName')}</TableHead>
                <TableHead>{t('machines.machineCode')}</TableHead>
                <TableHead>{t('machines.type')}</TableHead>
                <TableHead>{t('machines.location')}</TableHead>
                <TableHead>{t('machines.efficiency')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMachines.map((machine) => (
                <TableRow key={machine.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        machine.status === 'operational' ? 'bg-success/20' :
                        machine.status === 'maintenance' ? 'bg-warning/20' :
                        machine.status === 'error' ? 'bg-error/20' : 'bg-white/10'
                      }`}>
                        <Wrench className={`w-4 h-4 ${
                          machine.status === 'operational' ? 'text-success' :
                          machine.status === 'maintenance' ? 'text-warning' :
                          machine.status === 'error' ? 'text-error' : 'text-rosary/60'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-rosary group-hover:text-gold transition-colors">{machine.name}</p>
                        <p className="text-sm text-rosary/50">{machine.manufacturer}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{machine.code}</TableCell>
                  <TableCell className="text-rosary/80">{typeTranslations[machine.type] || machine.type}</TableCell>
                  <TableCell className="text-rosary/80">{machine.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={machine.efficiency} className="w-16" />
                      <span className="text-sm text-rosary">{toPersianNumber(machine.efficiency)}٪</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={statusTranslations[machine.status] || machine.status} />
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
                        <DropdownMenuItem onClick={() => onViewMachine(machine.id)}>
                          <Eye className="w-4 h-4 ml-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wrench className="w-4 h-4 ml-2" />
                          ثبت تعمیرات
                        </DropdownMenuItem>
                        {machine.status === 'error' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-error hover:bg-error/20">
                              <AlertTriangle className="w-4 h-4 ml-2" />
                              مشاهده خطا
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
