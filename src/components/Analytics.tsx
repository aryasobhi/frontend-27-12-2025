import { Card } from '../ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../lib/i18n';

const monthlyData = [
  { month: 'Jan', revenue: 45000, orders: 124, partners: 98 },
  { month: 'Feb', revenue: 52000, orders: 142, partners: 102 },
  { month: 'Mar', revenue: 48000, orders: 135, partners: 105 },
  { month: 'Apr', revenue: 61000, orders: 168, partners: 110 },
  { month: 'May', revenue: 58000, orders: 155, partners: 115 },
  { month: 'Jun', revenue: 67000, orders: 182, partners: 120 },
];

const categoryPerformance = [
  { category: 'Vegetables', sales: 185000, orders: 456 },
  { category: 'Fruits', sales: 142000, orders: 382 },
  { category: 'Dairy', sales: 98000, orders: 268 },
  { category: 'Bakery', sales: 76000, orders: 195 },
  { category: 'Frozen', sales: 112000, orders: 301 },
];

const topPartners = [
  { name: 'Green Valley', revenue: 125000, growth: 15.3 },
  { name: 'Organic Foods Ltd.', revenue: 156000, growth: 22.1 },
  { name: 'Premium Foods', revenue: 215000, growth: -5.2 },
  { name: 'Fresh Market Co.', revenue: 98500, growth: 8.7 },
  { name: 'Harvest Wholesalers', revenue: 102000, growth: 12.4 },
];

export function Analytics() {
  const { t } = useTranslation();

  const monthlyData = [
    { month: 'ژانویه', revenue: 45000, orders: 124, partners: 98 },
    { month: 'فوریه', revenue: 52000, orders: 142, partners: 102 },
    { month: 'مارس', revenue: 48000, orders: 135, partners: 105 },
    { month: 'آوریل', revenue: 61000, orders: 168, partners: 110 },
    { month: 'مه', revenue: 58000, orders: 155, partners: 115 },
    { month: 'ژوئن', revenue: 67000, orders: 182, partners: 120 },
  ];

  const categoryPerformance = [
    { category: 'سبزیجات', sales: 185000, orders: 456 },
    { category: 'میوه‌ها', sales: 142000, orders: 382 },
    { category: 'لبنیات', sales: 98000, orders: 268 },
    { category: 'نانوایی', sales: 76000, orders: 195 },
    { category: 'منجمد', sales: 112000, orders: 301 },
  ];

  const topPartners = [
    { name: 'دره سبز', revenue: 125000, growth: 15.3 },
    { name: 'غذاهای ارگانیک', revenue: 156000, growth: 22.1 },
    { name: 'تجهیزات برتر', revenue: 215000, growth: -5.2 },
    { name: 'بازار تازه', revenue: 98500, growth: 8.7 },
    { name: 'عمده‌فروشی هروست', revenue: 102000, growth: 12.4 },
  ];

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gold tracking-wide">{t('analytics.title')}</h1>
        <p className="text-rosary/60 mt-1">{t('analytics.subtitle')}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div className="text-right">
              <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">{t('dashboard.kpi.revenue')} (YTD)</p>
              <div className="mt-2 text-2xl font-bold text-gold font-mono">{toPersianNumber('۳۳۱,۰۰۰')} تومان</div>
              <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{toPersianNumber('۱۸.۵')}٪ نسبت به پارسال</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div className="text-right">
              <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">{t('dashboard.kpi.activeOrders')} (YTD)</p>
              <div className="mt-2 text-2xl font-bold text-gold font-mono">{toPersianNumber('۹۰۶')}</div>
              <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{toPersianNumber('۱۲.۳')}٪ نسبت به پارسال</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all">
              <ShoppingCart className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div className="text-right">
              <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">شرکای فعال</p>
              <div className="mt-2 text-2xl font-bold text-gold font-mono">{toPersianNumber('۱۲۰')}</div>
              <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{toPersianNumber('۲۲.۴')}٪ نسبت به پارسال</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div className="text-right">
              <p className="text-sm text-rosary/60 font-medium uppercase tracking-wider">میانگین ارزش سفارش</p>
              <div className="mt-2 text-2xl font-bold text-gold font-mono">{toPersianNumber('۳۶۵')} تومان</div>
              <div className="flex items-center gap-1 mt-2 text-blood text-sm">
                <TrendingDown className="h-4 w-4" />
                <span>{toPersianNumber('۳.۲')}٪ نسبت به ماه قبل</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue & Orders Trend */}
      <Card className="p-6 bg-white/5 border-white/10">
        <h3 className="mb-6 text-gold font-bold text-lg">روند درآمد و سفارشات (۶ ماهه)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="month" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a0d0a', border: '1px solid #ffffff20', color: '#e6d5c5' }}
              itemStyle={{ color: '#e6d5c5' }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#c5a059" 
              fill="#c5a059" 
              fillOpacity={0.1}
              name="درآمد (تومان)"
            />
            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#e6d5c5" 
              fill="#e6d5c5" 
              fillOpacity={0.1}
              name="تعداد سفارشات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Performance & Top Partners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="mb-6 text-gold font-bold text-lg">عملکرد دسته‌بندی‌ها</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
              <YAxis dataKey="category" type="category" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a0d0a', border: '1px solid #ffffff20', color: '#e6d5c5' }}
              />
              <Bar dataKey="sales" fill="#c5a059" radius={[0, 4, 4, 0]} name="فروش (تومان)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="mb-6 text-gold font-bold text-lg">برترین شرکا بر اساس درآمد</h3>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 text-right">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold font-mono text-xs">
                    {toPersianNumber(index + 1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{partner.name}</div>
                    <p className="text-xs text-rosary/50 font-mono">{toPersianNumber(partner.revenue.toLocaleString())} تومان</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-mono ${partner.growth >= 0 ? 'text-green-400' : 'text-blood'}`}>
                  {partner.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{toPersianNumber(Math.abs(partner.growth))}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Partner Growth Trend */}
      <Card className="p-6 bg-white/5 border-white/10">
        <h3 className="mb-6 text-gold font-bold text-lg">روند رشد شرکا</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="month" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a0d0a', border: '1px solid #ffffff20', color: '#e6d5c5' }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Line 
              type="monotone" 
              dataKey="partners" 
              stroke="#c5a059" 
              strokeWidth={3}
              name="شرکای فعال"
              dot={{ fill: '#c5a059', stroke: '#1a0d0a', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, stroke: '#c5a059', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
