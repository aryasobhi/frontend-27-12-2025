import { useState } from 'react';
import { Plus, Phone, Mail, Calendar, DollarSign, User, MoreVertical, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { mockLeads, pipelineStages } from '../data/mockCRM';
import { cn } from '../components/ui/utils';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface CRMPipelinePageProps {
  onViewLead?: (leadId: string) => void;
}

export function CRMPipelinePage({ onViewLead }: CRMPipelinePageProps) {
  const { t } = useTranslation();
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  // Stage translations
  const stageTranslations: Record<string, string> = {
    'New': t('crm.stages.new'),
    'Contacted': t('crm.stages.contacted'),
    'Qualified': t('crm.stages.qualified'),
    'Proposal': t('crm.stages.proposal'),
    'Negotiation': t('crm.stages.negotiation'),
    'Closed Won': 'موفق',
    'Closed Lost': 'ناموفق',
  };

  // Source translations
  const sourceTranslations: Record<string, string> = {
    'website': t('crm.sources.website'),
    'referral': t('crm.sources.referral'),
    'cold-call': t('crm.sources.cold_call'),
    'event': t('crm.sources.exhibition'),
    'social-media': t('crm.sources.social'),
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'website': 'bg-info/20 text-info border-info/30',
      'referral': 'bg-success/20 text-success border-success/30',
      'cold-call': 'bg-gold/20 text-gold border-gold/30',
      'event': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'social-media': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    };
    return colors[source] || 'bg-white/10 text-rosary border-white/20';
  };

  const totalValue = mockLeads.reduce((sum, lead) => sum + lead.value, 0);
  const avgProbability = mockLeads.reduce((sum, lead) => sum + lead.probability, 0) / mockLeads.length;

  return (
    <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary font-vazir" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold tracking-wide">{t('crm.title')}</h1>
          <p className="text-rosary/60">{t('crm.subtitle')}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          {t('crm.addLead')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/20 rounded-lg border border-info/30">
              <DollarSign className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('crm.stats.totalValue')}</p>
              <p className="text-2xl font-bold text-gold">{formatPersianCurrency(totalValue)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg border border-success/30">
              <User className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">{t('crm.stats.totalLeads')}</p>
              <p className="text-2xl font-bold text-rosary">{toPersianNumber(mockLeads.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">میانگین معامله</p>
              <p className="text-2xl font-bold text-rosary">{formatPersianCurrency(totalValue / mockLeads.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold/20 rounded-lg border border-gold/30">
              <DollarSign className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-rosary/60">میانگین احتمال</p>
              <p className="text-2xl font-bold text-gold">{toPersianNumber(avgProbability.toFixed(0))}٪</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Kanban */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max flex-row-reverse">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="w-80 flex-shrink-0">
              <Card className="h-full">
                {/* Stage Header */}
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gold font-semibold">{stageTranslations[stage.name] || stage.name}</h3>
                    <Badge variant="outline">{toPersianNumber(stage.leads.length)}</Badge>
                  </div>
                  <p className="text-sm text-success font-medium">
                    {formatPersianCurrency(stage.leads.reduce((sum, l) => sum + l.value, 0))}
                  </p>
                </div>

                {/* Stage Content */}
                <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                  {stage.leads.length === 0 ? (
                    <div className="text-center py-8 text-rosary/40">
                      <p className="text-sm">سرنخی در این مرحله نیست</p>
                    </div>
                  ) : (
                    stage.leads.map((lead) => (
                      <Card
                        key={lead.id}
                        className={cn(
                          'p-4 cursor-pointer hover:shadow-glow-gold transition-all bg-white/5 border-white/10 hover:bg-white/10',
                          selectedLead === lead.id && 'ring-2 ring-gold border-gold/50'
                        )}
                        onClick={() => setSelectedLead(lead.id)}
                      >
                        {/* Lead Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-sm mb-1 text-rosary font-medium">{lead.name}</h4>
                            <p className="text-xs text-rosary/60">{lead.company}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onViewLead?.(lead.id)}>
                                <Eye className="w-4 h-4 ml-2" />
                                {t('common.view')}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 ml-2" />
                                تماس
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 ml-2" />
                                ایمیل
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Lead Value */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-gold">{formatPersianCurrency(lead.value)}</span>
                          <Badge variant="outline" className="text-xs">
                            {toPersianNumber(lead.probability)}٪ احتمال
                          </Badge>
                        </div>

                        {/* Lead Meta */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-rosary/60">
                            <User className="w-3 h-3" />
                            <span>{lead.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-rosary/60">
                            <Calendar className="w-3 h-3" />
                            <span>پیگیری: {lead.nextFollowUp || 'زمانبندی نشده'}</span>
                          </div>
                        </div>

                        {/* Source Badge */}
                        <Badge variant="outline" className={cn('text-xs', getSourceColor(lead.source))}>
                          {sourceTranslations[lead.source] || lead.source.replace(/-/g, ' ')}
                        </Badge>

                        {/* Activities Indicator */}
                        {lead.activities.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-rosary/40">
                              {toPersianNumber(lead.activities.length)} فعالیت • آخرین: {lead.lastContact}
                            </p>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Lead Quick View */}
      {selectedLead && (
        <Card className="p-6">
          {(() => {
            const lead = mockLeads.find(l => l.id === selectedLead);
            if (!lead) return null;
            
            return (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gold font-semibold text-xl">{lead.name}</h3>
                    <p className="text-rosary/60">{lead.company}</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => onViewLead?.(lead.id)}>
                    مشاهده جزئیات کامل
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-rosary/60">{t('crm.email')}</p>
                    <p className="text-sm text-rosary dir-ltr">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-rosary/60">{t('crm.phone')}</p>
                    <p className="text-sm text-rosary dir-ltr">{lead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-rosary/60">{t('crm.value')}</p>
                    <p className="text-sm text-gold font-bold">{formatPersianCurrency(lead.value)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-rosary/60">{t('crm.probability')}</p>
                    <p className="text-sm text-gold font-bold">{toPersianNumber(lead.probability)}٪</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-rosary/60 mb-2">{t('crm.notes')}</p>
                  <p className="text-sm text-rosary/80 italic">{lead.notes}</p>
                </div>

                <div>
                  <p className="text-sm text-rosary/60 mb-2">فعالیت‌های اخیر</p>
                  <div className="space-y-2">
                    {lead.activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 text-sm">
                        <Badge variant="outline" className="text-xs capitalize">
                          {activity.type}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-rosary/80">{activity.description}</p>
                          <p className="text-xs text-rosary/40">{activity.date} • {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </Card>
      )}
    </div>
  );
}
