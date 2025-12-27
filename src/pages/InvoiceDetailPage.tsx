import { ArrowLeft, Download, Send, Edit, Printer, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockInvoices } from '../data/mockInvoices';
import { Separator } from '../components/ui/separator';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface InvoiceDetailPageProps {
  invoiceId: string;
  onBack: () => void;
}

export function InvoiceDetailPage({ invoiceId, onBack }: InvoiceDetailPageProps) {
  const { t } = useTranslation();
  const invoice = mockInvoices.find(inv => inv.id === invoiceId);
  
  if (!invoice) {
    return (
  <div className="p-8 text-rosary type-body" dir="rtl">
        <p className="text-xl mb-4">فاکتور یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" />
          {t('common.back')}
        </Button>
      </div>
    );
  }

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" />
            {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">فاکتور {toPersianNumber(invoice.invoiceNumber)}</h1>
            <p className="text-rosary/60">{invoice.customer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold backdrop-blur-md">
            <Download className="w-4 h-4 ml-2" />
            {t('common.download')}
          </Button>
          <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold backdrop-blur-md">
            <Printer className="w-4 h-4 ml-2" />
            {t('common.print')}
          </Button>
          {invoice.status === 'draft' && (
            <Button size="sm" className="bg-blood text-rosary hover:bg-blood/90 shadow-lg hover:shadow-glow-red">
              <Send className="w-4 h-4 ml-2" />
              {t('common.submit')}
            </Button>
          )}
          {invoice.status === 'sent' && (
            <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
              <Check className="w-4 h-4 ml-2" />
              علامت به عنوان پرداخت شده
            </Button>
          )}
        </div>
      </div>

      {/* Status Flow Visualization */}
      <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/20 shadow-xl">
        <h3 className="mb-4 text-gold font-semibold">روند وضعیت فاکتور</h3>
        <div className="flex items-center justify-between">
          {['draft', 'sent', 'paid'].map((status, index) => (
            <div key={status} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    status === invoice.status
                      ? 'bg-gold text-damask border-gold shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                      : invoice.status === 'paid' && index < 2
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : invoice.status === 'sent' && index === 0
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : invoice.status === 'overdue' && index === 1
                      ? 'bg-blood text-rosary border-blood'
                      : 'bg-white/5 text-rosary/40 border-white/10'
                  }`}
                >
                  {status === invoice.status || 
                   (invoice.status === 'paid' && index < 2) ||
                   (invoice.status === 'sent' && index === 0) ||
                   (invoice.status === 'overdue' && index === 1) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{toPersianNumber(index + 1)}</span>
                  )}
                </div>
                <p className={`text-sm mt-2 ${status === invoice.status ? 'text-gold font-bold' : 'text-rosary/60'}`}>
                  {status === 'draft' ? 'پیش‌نویس' : status === 'sent' ? 'ارسال شده' : 'پرداخت شده'}
                </p>
              </div>
              {index < 2 && (
                <div
                  className={`h-0.5 flex-1 ${
                    (invoice.status === 'paid' && index < 2) ||
                    (invoice.status === 'sent' && index === 0)
                      ? 'bg-green-500/50'
                      : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Card */}
        <Card className="lg:col-span-2 p-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2 text-gold font-bold tracking-widest leading-none">فاکتور</h2>
              <p className="text-rosary font-medium">مجموعه نانوایی Fresh Bakery</p>
              <p className="text-sm text-rosary/60">خیابان نانوایی ۱۲۳، سن فرانسیسکو، کالیفرنیا</p>
              <p className="text-sm text-rosary/60">شناسه مالیاتی: {toPersianNumber('12-3456789')}</p>
            </div>
            <div className="text-left font-vazir dir-rtl">
              <StatusBadge status={invoice.status} />
              <p className="text-sm text-rosary/60 mt-2">شماره فاکتور</p>
              <p className="font-mono text-gold text-lg dir-ltr">{toPersianNumber(invoice.invoiceNumber)}</p>
            </div>
          </div>

          <Separator className="my-6 bg-white/10" />

          {/* Bill To */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-rosary/60 mb-2 font-medium uppercase tracking-wider">صورت حساب برای:</p>
              <p className="text-rosary font-medium">{invoice.customer}</p>
              <p className="text-sm text-rosary/60 dir-ltr text-right">{invoice.customerEmail}</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-rosary/60">تاریخ صدور:</p>
                  <p className="text-rosary dir-ltr text-right">{toPersianNumber(invoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-rosary/60">تاریخ سررسید:</p>
                  <p className="text-rosary dir-ltr text-right">{toPersianNumber(invoice.dueDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-rosary/60">شرایط پرداخت:</p>
                  <p className="text-rosary">{toPersianNumber(invoice.paymentTerms)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="rounded-lg border border-white/10 overflow-hidden mb-8">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-gold text-right">شرح</TableHead>
                  <TableHead className="text-right text-gold">تعداد</TableHead>
                  <TableHead className="text-right text-gold">قیمت واحد</TableHead>
                  <TableHead className="text-right text-gold">جمع کل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-rosary">{item.description}</TableCell>
                    <TableCell className="text-right text-rosary">{toPersianNumber(item.quantity)}</TableCell>
                    <TableCell className="text-right text-rosary font-mono">{formatPersianCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right text-rosary font-mono">{formatPersianCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="flex justify-start">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-rosary/60">جمع فرعی:</span>
                <span className="text-rosary font-mono">{formatPersianCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-rosary/60">مالیات ({toPersianNumber(10)}٪):</span>
                <span className="text-rosary font-mono">{formatPersianCurrency(invoice.tax)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>تخفیف:</span>
                  <span className="font-mono">{formatPersianCurrency(invoice.discount)}-</span>
                </div>
              )}
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-between">
                <span className="text-gold font-bold">مبلغ نهایی:</span>
                <span className="text-xl text-gold font-bold font-mono">{formatPersianCurrency(invoice.total)}</span>
              </div>
              {invoice.amountPaid > 0 && (
                <>
                  <div className="flex justify-between text-sm text-green-400 mt-2">
                    <span>مبلغ پرداخت شده:</span>
                    <span className="font-mono">{formatPersianCurrency(invoice.amountPaid)}-</span>
                  </div>
                  <Separator className="bg-white/10 my-2" />
                  <div className="flex justify-between">
                    <span className="text-rosary">باقی‌مانده:</span>
                    <span className={`text-xl font-bold font-mono ${invoice.amountDue > 0 ? 'text-blood' : 'text-green-400'}`}>{formatPersianCurrency(invoice.amountDue)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm text-gold mb-1 font-medium">یادداشت‌ها:</p>
              <p className="text-sm text-rosary/80 italic">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-rosary/40">
            <p>با تشکر از اعتماد شما!</p>
            <p className="mt-1 dir-ltr">برای سوالات مربوط به این فاکتور، با accounting@freshbakery.com تماس بگیرید</p>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">خلاصه پرداخت</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-rosary/60">مبلغ کل</span>
                <span className="text-rosary font-mono">{formatPersianCurrency(invoice.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-rosary/60">مبلغ پرداخت شده</span>
                <span className="text-green-400 font-mono">{formatPersianCurrency(invoice.amountPaid)}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-medium">
                <span className="text-sm text-rosary/60">باقی‌مانده</span>
                <span className={`font-mono ${invoice.amountDue > 0 ? 'text-blood' : 'text-green-400'}`}>
                  {formatPersianCurrency(invoice.amountDue)}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment History */}
          {invoice.paymentHistory.length > 0 && (
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/20 shadow-xl">
              <h3 className="mb-4 text-gold font-semibold">تاریخچه پرداخت‌ها</h3>
              <div className="space-y-3">
                {invoice.paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-green-400 font-mono">{formatPersianCurrency(payment.amount)}</span>
                      <Badge variant="outline" className="text-xs text-rosary border-white/20 bg-white/5">
                        {payment.method === 'credit-card' ? 'کارت اعتباری' : payment.method === 'bank-transfer' ? 'حواله بانکی' : payment.method}
                      </Badge>
                    </div>
                    <p className="text-xs text-rosary/60 dir-ltr text-right">{toPersianNumber(payment.date)}</p>
                    <p className="text-xs text-rosary/40 font-mono mt-1 dir-ltr text-right">Ref: {payment.reference}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">عملیات سریع</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-rosary border-white/20 hover:bg-white/10 hover:text-gold hover:border-gold/30" size="sm">
                <Edit className="w-4 h-4 ml-2" />
                ویرایش فاکتور
              </Button>
              <Button variant="outline" className="w-full justify-start text-rosary border-white/20 hover:bg-white/10 hover:text-gold hover:border-gold/30" size="sm">
                <Send className="w-4 h-4 ml-2" />
                ارسال یادآور
              </Button>
              <Button variant="outline" className="w-full justify-start text-rosary border-white/20 hover:bg-white/10 hover:text-gold hover:border-gold/30" size="sm">
                <Download className="w-4 h-4 ml-2" />
                دانلود فایل PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
