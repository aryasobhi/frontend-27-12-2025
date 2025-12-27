import { ArrowLeft, Mail, Phone, MapPin, Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../widgets/StatusBadge';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface PartnerDetailPageProps {
  partnerId: string;
  onBack: () => void;
}

export function PartnerDetailPage({ partnerId, onBack }: PartnerDetailPageProps) {
  const { t } = useTranslation();
  const { partners } = useData();
  const partner = partners.find(p => p.id === partnerId);

  if (!partner) {
    return (
  <div className="p-8 text-rosary type-body" dir="rtl">
        <p className="text-xl mb-4">شریک تجاری یافت نشد</p>
        <Button onClick={onBack} variant="outline" className="mt-4 text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
          <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
        </Button>
      </div>
    );
  }

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" /> {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{partner.name}</h1>
            <p className="text-rosary/60 font-medium tracking-wide">{partner.type} • {partner.location}</p>
          </div>
        </div>
        <StatusBadge status={partner.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">{t('partners.rating')}</span>
          </div>
          <div className="text-2xl font-bold text-rosary font-mono">{toPersianNumber(partner.rating)} / ۵</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">{t('partners.totalOrders')}</span>
          </div>
          <div className="text-2xl font-bold text-rosary font-mono">{toPersianNumber(partner.totalOrders)}</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="flex items-center gap-3 text-gold mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{t('partners.revenue')}</span>
          </div>
          <div className="text-2xl font-bold text-rosary font-mono">{formatPersianCurrency(partner.revenue)}</div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <div className="text-sm text-rosary/60 mb-2 font-medium">{t('partners.status')}</div>
          <div className="mt-1">
            <StatusBadge status={partner.status} />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('partners.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('partners.tabs.orders')}</TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('partners.tabs.contacts')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">{t('common.details')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold/60" />
                  <div>
                    <div className="text-xs text-rosary/40 uppercase tracking-tighter">{t('partners.email')}</div>
                    <div className="text-rosary">{partner.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold/60" />
                  <div>
                    <div className="text-xs text-rosary/40 uppercase tracking-tighter">{t('partners.contact')}</div>
                    <div className="text-rosary dir-ltr text-right">{toPersianNumber(partner.contact)}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold/60" />
                  <div>
                    <div className="text-xs text-rosary/40 uppercase tracking-tighter">{t('partners.location')}</div>
                    <div className="text-rosary">{partner.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">{t('partners.tabs.orders')}</h3>
            <p className="text-rosary/60 italic">تاریخچه سفارشات به زودی در این بخش نمایش داده خواهد شد.</p>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <h3 className="mb-4 text-gold font-semibold">{t('partners.tabs.contacts')}</h3>
            <div className="p-4 border border-white/10 rounded-lg bg-white/5">
              <div className="font-bold text-rosary">{partner.name}</div>
              <div className="text-sm text-rosary/60">{partner.email}</div>
              <div className="text-sm text-rosary/60 mt-1 dir-ltr text-right">{toPersianNumber(partner.contact)}</div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
