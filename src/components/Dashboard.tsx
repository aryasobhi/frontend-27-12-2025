import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, ShoppingCart, TrendingUp, DollarSign, Activity, Package, Download, RefreshCw } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslation, toPersianNumber, formatRelativeTime } from '../lib/i18n';

// ============================================
// Chart Data with Persian Labels
// ============================================
const revenueData = [
  { month: 'فروردین', revenue: 45000 },
  { month: 'اردیبهشت', revenue: 52000 },
  { month: 'خرداد', revenue: 48000 },
  { month: 'تیر', revenue: 61000 },
  { month: 'مرداد', revenue: 58000 },
  { month: 'شهریور', revenue: 67000 },
];

const orderData = [
  { month: 'فروردین', orders: 124 },
  { month: 'اردیبهشت', orders: 142 },
  { month: 'خرداد', orders: 135 },
  { month: 'تیر', orders: 168 },
  { month: 'مرداد', orders: 155 },
  { month: 'شهریور', orders: 182 },
];

const partnerTypeData = [
  { name: 'توزیع‌کنندگان', value: 35, color: '#10b981' },
  { name: 'خرده‌فروشان', value: 45, color: '#3b82f6' },
  { name: 'عمده‌فروشان', value: 25, color: '#f59e0b' },
  { name: 'رستوران‌ها', value: 15, color: '#8b5cf6' },
];

const recentActivities = [
  { partner: 'توزیع‌کنندگان دره سبز', action: 'ثبت سفارش #ORD-2845', time: '۲ ساعت پیش', type: 'order' },
  { partner: 'شرکت بازار تازه', action: 'بروزرسانی آدرس تحویل', time: '۴ ساعت پیش', type: 'update' },
  { partner: 'محصولات ارگانیک', action: 'ثبت‌نام شریک جدید', time: '۱ روز پیش', type: 'new' },
  { partner: 'گروه خرده‌فروشان شهر', action: 'دریافت پرداخت ۱۲,۴۵۰ تومان', time: '۱ روز پیش', type: 'payment' },
  { partner: 'عمده‌فروشان حاصل', action: 'درخواست استعلام قیمت', time: '۲ روز پیش', type: 'quote' },
];

// ============================================
// Custom Tooltip for Persian RTL
// ============================================
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 shadow-xl" dir="rtl">
        <p className="text-gold font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-rosary text-sm">
            {entry.name === 'revenue' ? 'درآمد' : entry.name === 'orders' ? 'سفارشات' : entry.name}: {toPersianNumber(entry.value.toLocaleString())}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ============================================
// Dashboard Component
// ============================================
export function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gold">{t('dashboard.title')}</h1>
          <p className="text-rosary/60">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold active:bg-white/20 focus:ring-2 focus:ring-gold/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            {t('dashboard.exportReport')}
          </Button>
          <Button 
            className="bg-blood text-rosary hover:bg-blood/80 active:bg-blood/70 focus:ring-2 focus:ring-blood/30 shadow-lg hover:shadow-glow-red flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            {t('dashboard.refreshData')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('dashboard.kpi.totalProduction')}
          value={toPersianNumber('12,450')}
          change={12.5}
          icon={Package}
          iconColor="text-gold"
        />
        <KPICard
          title={t('dashboard.kpi.activeOrders')}
          value={toPersianNumber('45')}
          change={-2.4}
          icon={ShoppingCart}
          iconColor="text-gold"
        />
        <KPICard
          title={t('dashboard.kpi.efficiency')}
          value={`${toPersianNumber('94.2')}٪`}
          change={1.8}
          icon={Activity}
          iconColor="text-gold"
        />
        <KPICard
          title={t('dashboard.kpi.revenue')}
          value={`${toPersianNumber('1.2')}M تومان`}
          change={8.1}
          icon={DollarSign}
          iconColor="text-gold"
        />
      </div>

      {/* Partner Distribution & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <h3 className="mb-4 text-lg font-semibold text-gold">{t('dashboard.charts.partnerDistribution')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={partnerTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {partnerTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {partnerTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-rosary">{item.name}</span>
                </div>
                <span className="text-rosary/60 font-mono dir-ltr">{toPersianNumber(item.value)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <h3 className="mb-4 text-lg font-semibold text-gold">{t('dashboard.charts.recentActivities')}</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'order' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'payment' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'new' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {activity.type === 'order' && <ShoppingCart className="h-5 w-5" />}
                  {activity.type === 'payment' && <DollarSign className="h-5 w-5" />}
                  {activity.type === 'new' && <Users className="h-5 w-5" />}
                  {activity.type !== 'order' && activity.type !== 'payment' && activity.type !== 'new' && <TrendingUp className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="text-rosary font-medium">{activity.partner}</div>
                  <p className="text-sm text-rosary/60">{activity.action}</p>
                </div>
                <span className="text-sm text-rosary/40">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
