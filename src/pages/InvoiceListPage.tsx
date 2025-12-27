// @ts-nocheck
import { useState } from 'react';
import { Plus, Search, Filter, Download, Send, Eye, Edit, MoreVertical, DollarSign, FileText, AlertCircle, CheckCircle } from 'lucide-react';
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
import { mockInvoices, invoiceStats } from '../data/mockInvoices';
import { KPICard } from '../components/KPICard';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface InvoiceListPageProps {
  onViewInvoice?: (invoiceId: string) => void;
}

export function InvoiceListPage({ onViewInvoice }: InvoiceListPageProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status translations
  const statusTranslations: Record<string, string> = {
    'all': t('common.all'),
    'paid': t('status.paid'),
    'pending': t('status.pending'),
    'overdue': t('status.overdue'),
    'draft': t('status.draft'),
  };

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('invoices.title')}</h1>
          <p className="text-rosary/60 mt-1">{t('invoices.subtitle')}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          {t('invoices.addInvoice')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="کل درآمد"
          value={formatPersianCurrency(invoiceStats.totalRevenue)}
          icon={DollarSign}
          iconColor="text-success"
        />
        <KPICard
          title={t('status.paid')}
          value={formatPersianCurrency(invoiceStats.totalPaid)}
          icon={CheckCircle}
          iconColor="text-info"
        />
        <KPICard
          title="در انتظار"
          value={formatPersianCurrency(invoiceStats.totalOutstanding)}
          icon={FileText}
          iconColor="text-gold"
        />
        <KPICard
          title={t('status.overdue')}
          value={formatPersianCurrency(invoiceStats.totalOverdue)}
          icon={AlertCircle}
          iconColor="text-error"
          change={-5.2}
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rosary/40 w-4 h-4" />
            <Input
              placeholder={t('common.search')}
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('table.status')} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusTranslations).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            {t('common.export')}
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/20">
            <TableRow className="hover:bg-transparent border-white/20">
              <TableHead>{t('invoices.invoiceNumber')}</TableHead>
              <TableHead>{t('invoices.customer')}</TableHead>
              <TableHead>{t('invoices.issueDate')}</TableHead>
              <TableHead>{t('invoices.dueDate')}</TableHead>
              <TableHead>{t('invoices.amount')}</TableHead>
              <TableHead>{t('table.status')}</TableHead>
              <TableHead className="text-left">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="cursor-pointer hover:bg-white/5 border-white/10 transition-colors group">
                <TableCell className="font-mono text-sm text-rosary/70 dir-ltr">{invoice.invoiceNumber}</TableCell>
                <TableCell className="font-medium text-rosary group-hover:text-gold transition-colors">{invoice.customer}</TableCell>
                <TableCell className="text-rosary/80">{invoice.issueDate}</TableCell>
                <TableCell className="text-rosary/80">{invoice.dueDate}</TableCell>
                <TableCell className="text-rosary font-medium">{formatPersianCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <StatusBadge status={statusTranslations[invoice.status] || invoice.status} />
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewInvoice?.(invoice.id)}>
                        <Eye className="w-4 h-4 ml-2" />
                        {t('common.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 ml-2" />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 ml-2" />
                        ارسال به مشتری
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 ml-2" />
                        دانلود PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
