// @ts-nocheck
/*
  Status: SKELETON
  Reason: Sales summary UI exists but depends on mock DataContext and lacks backend contract integration.
  Allowed actions: authoring-only
*/

import { Card } from '../ui/card';
import { ShoppingCart, Truck, CheckCircle, DollarSign, ArrowRight, FileText, Activity } from 'lucide-react';
import { useTranslation, toPersianNumber } from '../../lib/i18n';
import { cn } from '../ui/utils';

/*
  Status: SKELETON
  Reason: Sales summary UI exists but depends on mock DataContext and lacks backend contract integration.
  Allowed actions: authoring-only
*/
export function SalesSummary() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('sales.openOrders'), value: toPersianNumber('۱۲'), sub: 'آماده پردازش', icon: ShoppingCart, color: 'text-gold' },
          { label: t('sales.pendingDeliveries'), value: toPersianNumber('۱۵'), sub: 'آماده ارسال', icon: Truck, color: 'text-gold' },
          { label: t('sales.deliveredMonth'), value: toPersianNumber('۴۵'), sub: '۹۶٪ به موقع', icon: CheckCircle, color: 'text-green-400' },
          { label: t('sales.revenueMonth'), value: '۱۹۸ م.ت', sub: '۱۵٪+ افزایش', icon: DollarSign, color: 'text-gold' },
        ].map((kpi, idx) => (
          <Card key={idx} className="group hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className="text-right">
                <p className="text-xs text-rosary/40 font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className={cn("text-2xl font-black font-mono", kpi.color)}>
                  {kpi.value}
                </div>
                <p className="text-xs text-rosary/40 mt-2 font-medium">{kpi.sub}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:shadow-glow-gold transition-all duration-500">
                <kpi.icon className="h-6 w-6 text-gold/40 group-hover:text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title={t('sales.transactionFlow')}>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8">
            {[
              { step: '۱', title: t('sales.createOrder'), icon: ShoppingCart },
              { step: '۲', title: t('sales.pickDeliver'), icon: Truck },
              { step: '۳', title: t('sales.createInvoice'), icon: FileText },
              { step: '۴', title: t('accounting.automaticPosting'), icon: Activity },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500 mb-4 relative z-10">
                    <item.icon className="h-8 w-8 text-gold/40 group-hover:text-gold" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-damask rounded-full text-[10px] font-black flex items-center justify-center shadow-lg">
                      {toPersianNumber(item.step)}
                    </div>
                  </div>
                  <h4 className="text-[10px] font-black text-gold/60 uppercase tracking-widest">{item.title}</h4>
                </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}
