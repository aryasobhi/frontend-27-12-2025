// @ts-nocheck
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Plus, Phone, Mail, MapPin, MoreVertical, Edit, Trash2, Eye, Users, Globe, ExternalLink } from 'lucide-react';
import { AddPartnerDialog } from '../components/AddPartnerDialog';
import { EditPartnerDialog } from '../components/EditPartnerDialog';
import { useData, Partner } from '../context/DataContext';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';
import { PageHeader } from './ui/PageHeader';
import { FilterBar } from './ui/FilterBar';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/TableContainer';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface PartnerListProps {
  onViewPartner?: (id: string) => void;
}

export function PartnerList({ onViewPartner }: PartnerListProps) {
  const { t } = useTranslation();
  const { partners, addPartner, updatePartner, deletePartner } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deletingPartnerId, setDeletingPartnerId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePartner(id);
    setDeletingPartnerId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border border-green-400/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30';
      case 'inactive': return 'bg-blood/20 text-blood border border-blood/30';
      default: return 'bg-rosary/20 text-rosary border border-rosary/30';
    }
  };

  return (
  <div className="p-8 space-y-8 bg-damask min-h-screen text-rosary type-body" dir="rtl">
      <PageHeader 
        title={t('partners.title')}
        subtitle={t('partners.subtitle')}
        action={{
          label: t('partners.addPartner'),
          icon: Plus,
          onClick: () => setIsAddDialogOpen(true),
        }}
      />

      <Card title={t('partners.title')} collapsible>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <FilterBar 
            onSearch={setSearchTerm} 
            searchPlaceholder={t('common.search')}
            className="flex-1 !p-0 border-none bg-transparent"
          />
          <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 h-10 overflow-x-auto">
            {[
              { id: 'all', label: t('common.all'), count: partners.length },
              { id: 'active', label: t('status.active'), count: partners.filter(p => p.status === 'active').length },
              { id: 'pending', label: t('status.pending'), count: partners.filter(p => p.status === 'pending').length },
              { id: 'inactive', label: t('status.inactive'), count: partners.filter(p => p.status === 'inactive').length },
            ].map((f) => (
              <Button
                key={f.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-xl px-6 transition-all duration-300 text-[10px] font-black uppercase tracking-widest h-full",
                  filterStatus === f.id ? 'bg-gold text-damask shadow-glow-gold' : 'text-rosary/60 hover:bg-white/10'
                )}
                onClick={() => setFilterStatus(f.id as any)}
              >
                {f.label} <span className="mr-2 font-mono opacity-40">{toPersianNumber(f.count.toString())}</span>
              </Button>
            ))}
          </div>
        </div>

        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>{t('partners.name')}</TableHead>
              <TableHead>{t('partners.type')}</TableHead>
              <TableHead>{t('partners.contact')}</TableHead>
              <TableHead>{t('partners.revenue')}</TableHead>
              <TableHead>{t('partners.status')}</TableHead>
              <TableHead className="text-left">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div className="flex items-center gap-4 text-right">
                    <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:shadow-glow-gold transition-all duration-500">
                      <Globe className="h-5 w-5 text-gold/40" />
                    </div>
                    <div>
                      <div className="font-black text-rose-50/90 group-hover:text-gold transition-colors">{partner.name}</div>
                      <div className="flex items-center gap-2 text-[8px] font-bold text-rosary/30 uppercase tracking-widest mt-1">
                        <Mail className="h-3 w-3" />
                        {partner.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-white/10 text-rosary/40 bg-white/5 text-[10px] uppercase font-bold tracking-widest px-3">
                    {partner.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 text-xs font-mono font-black text-rosary/60">
                      <Phone className="h-3 w-3 text-gold/20" />
                      {toPersianNumber(partner.contact)}
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-bold text-rosary/20 uppercase tracking-tighter">
                       <MapPin className="h-3 w-3" />
                       {partner.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs font-black text-gold/60">{formatPersianCurrency(partner.revenue)}</TableCell>
                <TableCell>
                  <Badge className={cn(getStatusColor(partner.status), "rounded-full px-4 border-none text-[10px] font-bold uppercase")}>
                    {t(`status.${partner.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-white/5 h-8 w-8 text-gold">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-damask border-white/10 text-rosary font-vazir rounded-xl p-1 shadow-2xl">
                        <DropdownMenuItem onClick={() => onViewPartner?.(partner.id)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Eye className="ml-2 h-4 w-4 text-gold/40" />
                          <span className="font-bold text-xs">{t('common.view')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(partner)} className="hover:bg-white/5 cursor-pointer rounded-lg py-2">
                          <Edit className="ml-2 h-4 w-4 text-gold" />
                          <span className="font-bold text-xs">{t('common.edit')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeletingPartnerId(partner.id)} className="hover:bg-blood/10 text-blood cursor-pointer rounded-lg py-2 focus:text-blood">
                          <Trash2 className="ml-2 h-4 w-4" />
                          <span className="font-bold text-xs">{t('common.delete')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>

        {filteredPartners.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-6">
            <Users className="h-16 w-16 text-white/5 mx-auto mb-4" />
            <p className="text-rosary/20 text-lg font-bold tracking-tight uppercase uppercase">{t('common.noResults')}</p>
          </div>
        )}
      </Card>

      <AddPartnerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addPartner}
      />

      <EditPartnerDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={updatePartner}
        partner={editingPartner}
      />

      <AlertDialog open={deletingPartnerId !== null} onOpenChange={() => setDeletingPartnerId(null)}>
        <AlertDialogContent className="bg-damask border-white/20 text-rosary font-vazir shadow-inner shadow-black/20" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold text-xl font-black">{t('common.confirm')}</AlertDialogTitle>
            <AlertDialogDescription className="text-rosary/60 font-medium pb-2">
              {t('messages.confirmDelete')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-8">
            <AlertDialogCancel className="bg-white/5 border-white/10 text-rosary hover:bg-white/10 rounded-xl px-10 h-12">{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingPartnerId && handleDelete(deletingPartnerId)}
              className="bg-blood hover:bg-blood/80 text-rosary shadow-glow-blood border border-white/10 rounded-xl px-10 h-12"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
