import { useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Eye, Edit, CheckCircle, XCircle, ClipboardCheck, AlertTriangle } from 'lucide-react';
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
import { mockQualityControlRecords, qcStats } from '../data/mockQualityControl';
import { useTranslation, toPersianNumber } from '../lib/i18n';

interface QualityControlListPageProps {
  onViewRecord: (recordId: string) => void;
}

export function QualityControlListPage({ onViewRecord }: QualityControlListPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');

  const filteredRecords = mockQualityControlRecords.filter(record => {
    const matchesSearch = record.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.inspectionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesProduct = productFilter === 'all' || record.productId === productFilter;
    return matchesSearch && matchesStatus && matchesProduct;
  });

  const products = ['all', ...Array.from(new Set(mockQualityControlRecords.map(r => r.productId)))];
  const statuses = ['all', 'passed', 'failed', 'conditional', 'pending'];

  // Translations
  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'passed': t('quality.results.passed'),
    'failed': t('quality.results.failed'),
    'conditional': t('quality.results.conditional'),
    'pending': t('quality.results.pending'),
  };

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('quality.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('quality.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            {t('quality.addInspection')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <ClipboardCheck className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">کل بازرسی‌ها</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(qcStats?.total || mockQualityControlRecords.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg border border-success/30">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('quality.results.passed')}</p>
              <p className="text-2xl font-bold text-success">
                {toPersianNumber(mockQualityControlRecords.filter(r => r.status === 'passed').length)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-error/20 rounded-lg border border-error/30">
              <XCircle className="w-6 h-6 text-error" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('quality.results.failed')}</p>
              <p className="text-2xl font-bold text-error">
                {toPersianNumber(mockQualityControlRecords.filter(r => r.status === 'failed').length)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning/20 rounded-lg border border-warning/30">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">در انتظار</p>
              <p className="text-2xl font-bold text-warning">
                {toPersianNumber(mockQualityControlRecords.filter(r => r.status === 'pending').length)}
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('quality.result')} />
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
                <TableHead>{t('quality.inspectionNumber')}</TableHead>
                <TableHead>{t('quality.product')}</TableHead>
                <TableHead>{t('quality.lotNumber')}</TableHead>
                <TableHead>{t('quality.sampleSize')}</TableHead>
                <TableHead>{t('quality.passRate')}</TableHead>
                <TableHead>{t('quality.result')}</TableHead>
                <TableHead className="text-left">{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{record.inspectionId}</TableCell>
                  <TableCell className="font-medium text-rosary group-hover:text-gold transition-colors">{record.productName}</TableCell>
                  <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{record.batchNumber}</TableCell>
                  <TableCell className="text-rosary">{toPersianNumber(record.sampleSize)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={record.passRate} className="w-16" />
                      <span className="text-sm text-rosary">{toPersianNumber(record.passRate)}٪</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      record.status === 'passed' ? 'success' :
                      record.status === 'failed' ? 'error' :
                      record.status === 'conditional' ? 'warning' : 'default'
                    }>
                      {statusTranslations[record.status] || record.status}
                    </Badge>
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
