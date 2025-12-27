import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { FilterBar } from '../ui/FilterBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { useModuleController } from '../../hooks/useModuleController';
import { LucideIcon, Plus } from 'lucide-react';
import { ModuleConfig } from '../../types/module';
import { getIconByName } from '../../lib/icons';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/TableContainer';
import { Badge } from '../ui/badge';
import { toPersianNumber } from '../../lib/i18n';
import { Button } from '../ui/button';

interface UniversalModuleTemplateProps {
  // Module Metadata
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  
  // JSON Config (Alternative to explicit props)
  config?: ModuleConfig;
  data?: any[];

  // Slot - Header Actions
  primaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };

  // Slot - Filter Content
  filterPlaceholder?: string;
  renderFilters?: (controller: ReturnType<typeof useModuleController>) => React.ReactNode;

  // Slot - Main Content
  renderMainContent?: (controller: ReturnType<typeof useModuleController>) => React.ReactNode;

  // Slot - Entry Form
  entryForm?: {
    title: string;
    description?: string;
    render: (controller: ReturnType<typeof useModuleController>) => React.ReactNode;
  };

  // Slot - Extra Content (KPIs, Charts, etc.)
  renderExtraContent?: (controller: ReturnType<typeof useModuleController>) => React.ReactNode;

  className?: string;
}

export function UniversalModuleTemplate({
  title: propTitle,
  subtitle: propSubtitle,
  icon: propIcon,
  config,
  data = [],
  primaryAction: propPrimaryAction,
  filterPlaceholder: propFilterPlaceholder,
  renderFilters,
  renderMainContent,
  renderExtraContent,
  entryForm: propEntryForm,
  className
}: UniversalModuleTemplateProps) {
  const controller = useModuleController();

  // Derived values from config if present
  const title = config?.title || propTitle || '';
  const subtitle = config?.subtitle || propSubtitle;
  const Icon = config?.iconName ? getIconByName(config.iconName) : propIcon;
  const filterPlaceholder = config?.id ? `جستجو در ${title}...` : propFilterPlaceholder;
  
  const primaryAction = config?.primaryAction ? {
    label: config.primaryAction.label,
    icon: config.primaryAction.iconName ? getIconByName(config.primaryAction.iconName) : undefined
  } : propPrimaryAction;

  const handlePrimaryAction = () => {
    if (primaryAction?.onClick) {
      primaryAction.onClick();
    } else {
      controller.openEntryForm();
    }
  };

  const renderDynamicFilters = () => {
    if (!config?.filters) return renderFilters?.(controller);
    
    return config.filters.map((f) => (
      <div key={f.id} className="space-y-2">
        <Label className="text-xs font-bold text-rosary/40 mr-1">{f.label}</Label>
        {f.type === 'select' ? (
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg">
              <SelectValue placeholder={f.placeholder || `انتخاب ${f.label}`} />
            </SelectTrigger>
            <SelectContent className="bg-damask border-white/10 text-rosary">
              <SelectItem value="all">همه</SelectItem>
              {f.options?.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input 
            type={f.type === 'date' ? 'date' : 'text'}
            placeholder={f.placeholder}
            className="bg-white/5 border-white/10 text-rosary h-9 rounded-lg focus:border-gold/50" 
          />
        )}
      </div>
    ));
  };

  const renderDynamicTable = () => {
    if (!config?.columns) return renderMainContent?.(controller);

    const filteredData = data.filter(item => {
      if (!controller.searchQuery) return true;
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(controller.searchQuery.toLowerCase())
      );
    });

    return (
      <TableContainer>
        <TableHeader>
          <TableRow>
            {config.columns.map(col => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row, idx) => (
            <TableRow key={idx}>
              {config.columns.map(col => {
                const value = row[col.key];
                return (
                  <TableCell key={col.key}>
                    {col.type === 'badge' ? (
                      <Badge className="bg-gold/10 text-gold border-none">{value}</Badge>
                    ) : col.type === 'currency' ? (
                      <span className="font-mono text-gold/80">{toPersianNumber(Number(value).toLocaleString())}</span>
                    ) : (
                      toPersianNumber(String(value))
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    );
  };

  const renderDynamicForm = () => {
    if (propEntryForm) return propEntryForm.render(controller);
    if (!config?.formFields || config.formFields.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.formFields.map((field) => (
          <div key={field.id} className={field.colSpan === 2 ? "col-span-2" : "col-span-1"}>
            <Label className="text-sm font-bold text-rosary/60 mb-2 block">{field.label}</Label>
            {field.type === 'select' ? (
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-11 rounded-xl">
                  <SelectValue placeholder={`انتخاب ${field.label}...`} />
                </SelectTrigger>
                <SelectContent className="bg-damask border-white/10 text-rosary">
                  {/* Options would come from config or a data source */}
                  <SelectItem value="null">در حال بارگزاری...</SelectItem>
                </SelectContent>
              </Select>
            ) : field.type === 'textarea' ? (
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-rosary focus:border-gold/50 min-h-[100px] text-right font-vazir"
                placeholder={field.label}
              />
            ) : (
              <Input 
                type={field.type}
                className="bg-white/5 border-white/10 h-11 rounded-xl focus:border-gold/50 text-right font-vazir"
                placeholder={field.label}
              />
            )}
          </div>
        ))}
        <div className="col-span-2 pt-6">
          <Button 
            onClick={() => {
              console.log('Saving dynamic form data...');
              controller.closeEntryForm();
            }}
            className="w-full bg-gold text-damask hover:bg-gold/80 h-12 font-black rounded-xl shadow-glow-gold/20"
          >
            ذخیره اطلاعات
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-8 space-y-8 bg-damask min-h-screen text-rosary type-body ${className || ''}`} dir="rtl">
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={primaryAction ? {
          label: primaryAction.label,
          icon: primaryAction.icon || Plus,
          onClick: handlePrimaryAction,
        } : undefined}
      />

      <FilterBar
        onSearch={controller.setSearchQuery}
        searchPlaceholder={filterPlaceholder}
        isExpanded={controller.isFilterOpen}
        onExpandedChange={controller.toggleFilter}
      >
        {renderDynamicFilters()}
      </FilterBar>

      <div className="flex-1 overflow-auto animate-in fade-in duration-500 space-y-8">
        {renderExtraContent?.(controller)}
        {renderDynamicTable()}
      </div>

      {((propEntryForm) || (config?.formFields && config.formFields.length > 0)) && (
        <Dialog 
          open={controller.isEntryFormOpen} 
          onOpenChange={(open) => !open && controller.closeEntryForm()}
        >
          <DialogContent 
            className="fixed inset-y-0 left-0 right-auto translate-x-0 translate-y-0 h-full w-full sm:max-w-[550px] rounded-none border-r border-white/10 animate-in slide-in-from-left duration-500 shadow-2xl z-[100] bg-damask overflow-hidden flex flex-col"
          >
            <DialogHeader className="text-right p-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="h-6 w-6 text-gold" />}
                <DialogTitle className="text-2xl font-black text-gold">
                  {propEntryForm?.title || `ثبت ${title}`}
                </DialogTitle>
              </div>
              {(propEntryForm?.description || config?.subtitle) && (
                <DialogDescription className="text-rosary/40 mt-2">
                  {propEntryForm?.description || config?.subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-8">
              {renderDynamicForm()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
