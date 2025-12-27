import { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, MoreVertical, Eye, Edit, UserX } from 'lucide-react';
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
import { mockEmployees } from '../data/mockEmployees';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface EmployeeListPageProps {
  onViewEmployee: (employeeId: string) => void;
}

export function EmployeeListPage({ onViewEmployee }: EmployeeListPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = ['all', ...Array.from(new Set(mockEmployees.map(e => e.department)))];
  const statuses = ['all', 'active', 'on-leave', 'inactive'];

  // Translations
  const departmentTranslations: Record<string, string> = {
    'all': t('common.all'),
    'Production': 'تولید',
    'Quality': 'کنترل کیفیت',
    'Maintenance': 'نگهداری',
    'HR': 'منابع انسانی',
    'Finance': 'مالی',
    'Sales': 'فروش',
    'IT': 'فناوری اطلاعات',
  };

  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'active': t('status.active'),
    'on-leave': 'مرخصی',
    'inactive': t('status.inactive'),
  };

  const shiftTranslations: Record<string, string> = {
    'Morning': t('employees.shifts.morning'),
    'Afternoon': t('employees.shifts.afternoon'),
    'Night': t('employees.shifts.night'),
    'Rotating': t('employees.shifts.rotating'),
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('employees.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('employees.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 ml-2" />
            {t('common.import')}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            {t('employees.addEmployee')}
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
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('employees.department')} />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {departmentTranslations[dept] || dept}
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
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">کل کارکنان</p>
          <p className="text-3xl mt-2 font-bold text-gold">{toPersianNumber(mockEmployees.length)}</p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">فعال</p>
          <p className="text-3xl mt-2 font-bold text-success">
            {toPersianNumber(mockEmployees.filter(e => e.status === 'active').length)}
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">مرخصی</p>
          <p className="text-3xl mt-2 font-bold text-warning">
            {toPersianNumber(mockEmployees.filter(e => e.status === 'on-leave').length)}
          </p>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">بخش‌ها</p>
          <p className="text-3xl mt-2 font-bold text-gold">
            {toPersianNumber(new Set(mockEmployees.map(e => e.department)).size)}
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        {filteredEmployees.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('empty.noEmployees')}
            description={t('empty.noResults')}
          />
        ) : (
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/20">
              <TableRow className="hover:bg-transparent border-white/20">
                <TableHead>{t('employees.fullName')}</TableHead>
                <TableHead>{t('employees.employeeId')}</TableHead>
                <TableHead>{t('employees.department')}</TableHead>
                <TableHead>{t('employees.position')}</TableHead>
                <TableHead>{t('employees.shift')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-rosary group-hover:text-gold transition-colors">{employee.name}</p>
                        <p className="text-sm text-rosary/50 dir-ltr">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{employee.id}</TableCell>
                  <TableCell className="text-rosary/80">{departmentTranslations[employee.department] || employee.department}</TableCell>
                  <TableCell className="text-rosary/80">{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shiftTranslations[employee.shift] || employee.shift}</Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={statusTranslations[employee.status] || employee.status} />
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
                        <DropdownMenuItem onClick={() => onViewEmployee(employee.id)}>
                          <Eye className="w-4 h-4 ml-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-error hover:bg-error/20">
                          <UserX className="w-4 h-4 ml-2" />
                          غیرفعال کردن
                        </DropdownMenuItem>
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
