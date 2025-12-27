import { ArrowLeft, Package, Calendar, User, DollarSign, Truck, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../widgets/StatusBadge';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

// Use a unified Order interface for the detail page
interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  partner: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  amount: number;
  items?: OrderItem[];
  deliveryDate?: string;
  notes?: string;
}

// Since OrderManagement has local mock data, we define a fallback or mock here if not found in context
// In a real app, this would come from an API or shared state
const mockOrderDetails: Record<string, Order> = {
  '1': {
    id: '1',
    orderNumber: 'ORD-2845',
    partner: 'Green Valley Distributors',
    date: '2025-11-01',
    status: 'shipped',
    amount: 12450,
    deliveryDate: '2025-11-05',
    items: [
      { product: 'Organic Tomatoes', quantity: 300, price: 25 },
      { product: 'Fresh Lettuce', quantity: 200, price: 24.75 },
    ],
    notes: 'تحویل در ساعات اداری انجام شود.'
  },
  '2': {
    id: '2',
    orderNumber: 'ORD-2844',
    partner: 'Fresh Market Co.',
    date: '2025-11-01',
    status: 'processing',
    amount: 8900,
    deliveryDate: '2025-11-04',
    items: [
      { product: 'Mixed Vegetables Bundle', quantity: 350, price: 25.42 },
    ]
  }
};

interface OrderDetailPageProps {
  orderId: string;
  onBack: () => void;
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const { t } = useTranslation();
  // We'll try to find it in our local mock first, then handle missing
  const order = mockOrderDetails[orderId];

  if (!order) {
    return (
      <div className="p-8 text-rosary font-vazir" dir="rtl">
        <p className="text-xl mb-4">سفارش یافت نشد</p>
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
            <h1 className="text-3xl font-bold text-gold tracking-wide">{toPersianNumber(order.orderNumber)}</h1>
            <p className="text-rosary/60 font-medium tracking-wide">{order.partner}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{t('orders.date')}</span>
          </div>
          <div className="text-xl font-bold text-rosary dir-ltr text-right font-mono">{toPersianNumber(order.date)}</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">{t('orders.amount')}</span>
          </div>
          <div className="text-xl font-bold text-rosary font-mono">{formatPersianCurrency(order.amount)}</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">{t('orders.delivery')}</span>
          </div>
          <div className="text-xl font-bold text-rosary dir-ltr text-right font-mono">{order.deliveryDate ? toPersianNumber(order.deliveryDate) : '-'}</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{t('orders.status')}</span>
          </div>
          <div className="mt-1">
            <StatusBadge status={order.status} />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('orders.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="items" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('orders.tabs.items')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-6 text-gold font-semibold">{t('orders.orderDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-gold/60 mt-1" />
                  <div>
                    <div className="text-xs text-rosary/40 uppercase tracking-widest mb-1">{t('orders.partner')}</div>
                    <div className="text-rosary font-medium text-lg">{order.partner}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Package className="w-5 h-5 text-gold/60 mt-1" />
                  <div>
                    <div className="text-xs text-rosary/40 uppercase tracking-widest mb-1">{t('common.details')}</div>
                    <div className="text-rosary leading-relaxed">{order.notes || 'توضیحاتی ثبت نشده است.'}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="items">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden">
            <h3 className="mb-6 text-gold font-semibold">{t('orders.tabs.items')}</h3>
            {!order.items || order.items.length === 0 ? (
              <p className="text-rosary/60 italic">آیتمی برای این سفارش ثبت نشده است.</p>
            ) : (
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-gold text-right">{t('products.productName')}</TableHead>
                      <TableHead className="text-gold text-right">{t('common.quantity')}</TableHead>
                      <TableHead className="text-gold text-right">{t('products.price')}</TableHead>
                      <TableHead className="text-gold text-right">{t('common.total')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, idx) => (
                      <TableRow key={idx} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-rosary font-medium">{item.product}</TableCell>
                        <TableCell className="text-rosary font-mono">{toPersianNumber(item.quantity)}</TableCell>
                        <TableCell className="text-rosary font-mono">{formatPersianCurrency(item.price)}</TableCell>
                        <TableCell className="text-gold font-bold font-mono">{formatPersianCurrency(item.quantity * item.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
