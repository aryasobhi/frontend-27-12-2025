import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.crm': 'CRM',
    'nav.partners': 'Partners',
    'nav.orders': 'Orders',
    'nav.production': 'Production',
    'nav.quality': 'Quality Control',
    'nav.maintenance': 'Maintenance',
    'nav.fsm': 'Field Service',
    'nav.inventory': 'Inventory',
    'nav.products': 'Products',
    'nav.procurement': 'Procurement',
    'nav.purchasing': 'Purchasing',
    'nav.sales': 'Sales',
    'nav.supplyChain': 'Supply Chain',
    'nav.shipping': 'Shipping',
    'nav.hr': 'Human Resources',
    'nav.finance': 'Finance',
    'nav.accounting': 'Accounting',
    'nav.machines': 'Machines',
    'nav.bom': 'BOM & Planning',
    'nav.formulation': 'Formulation',
    'nav.projects': 'Projects',
    
    // Sections
    'section.overview': 'Overview',
    'section.salesCrm': 'Sales & CRM',
    'section.operations': 'Operations',
    'section.supplyChain': 'Supply Chain',
    'section.transaction': 'Transaction Flow',
    'section.management': 'Management',
    'section.other': 'Other Modules',
    
    // Common
    'common.search': 'Search',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.amount': 'Amount',
    'common.actions': 'Actions',
    'common.total': 'Total',
    'common.quantity': 'Quantity',
    'common.price': 'Price',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': "Welcome back! Here's what's happening with your partners.",
    'dashboard.totalPartners': 'Total Partners',
    'dashboard.activeOrders': 'Active Orders',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.growthRate': 'Growth Rate',
    
    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
  },
  fa: {
    // Navigation
    'nav.dashboard': 'داشبورد',
    'nav.analytics': 'تحلیل و گزارش',
    'nav.crm': 'مدیریت ارتباط با مشتری',
    'nav.partners': 'شرکاء',
    'nav.orders': 'سفارشات',
    'nav.production': 'تولید',
    'nav.quality': 'کنترل کیفیت',
    'nav.maintenance': 'نگهداری',
    'nav.fsm': 'خدمات میدانی',
    'nav.inventory': 'انبارداری',
    'nav.products': 'محصولات',
    'nav.procurement': 'تدارکات',
    'nav.purchasing': 'خرید',
    'nav.sales': 'فروش',
    'nav.supplyChain': 'زنجیره تامین',
    'nav.shipping': 'حمل و نقل',
    'nav.hr': 'منابع انسانی',
    'nav.finance': 'امور مالی',
    'nav.accounting': 'حسابداری',
    'nav.machines': 'ماشین‌آلات',
    'nav.bom': 'برنامه‌ریزی تولید',
    'nav.formulation': 'فرمولاسیون',
    'nav.projects': 'پروژه‌ها',
    
    // Sections
    'section.overview': 'نمای کلی',
    'section.salesCrm': 'فروش و مشتریان',
    'section.operations': 'عملیات',
    'section.supplyChain': 'زنجیره تامین',
    'section.transaction': 'جریان معاملات',
    'section.management': 'مدیریت',
    'section.other': 'سایر ماژول‌ها',
    
    // Common
    'common.search': 'جستجو',
    'common.add': 'افزودن',
    'common.edit': 'ویرایش',
    'common.delete': 'حذف',
    'common.view': 'مشاهده',
    'common.save': 'ذخیره',
    'common.cancel': 'انصراف',
    'common.status': 'وضعیت',
    'common.date': 'تاریخ',
    'common.amount': 'مبلغ',
    'common.actions': 'عملیات',
    'common.total': 'مجموع',
    'common.quantity': 'تعداد',
    'common.price': 'قیمت',
    
    // Dashboard
    'dashboard.title': 'داشبورد',
    'dashboard.subtitle': 'خوش آمدید! در اینجا آنچه با شرکای شما اتفاق می‌افتد را مشاهده کنید.',
    'dashboard.totalPartners': 'کل شرکاء',
    'dashboard.activeOrders': 'سفارشات فعال',
    'dashboard.monthlyRevenue': 'درآمد ماهانه',
    'dashboard.growthRate': 'نرخ رشد',
    
    // Status
    'status.active': 'فعال',
    'status.inactive': 'غیرفعال',
    'status.pending': 'در انتظار',
    'status.completed': 'تکمیل شده',
    'status.approved': 'تایید شده',
    'status.rejected': 'رد شده',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'fa' ? 'rtl' : 'ltr'} className={language === 'fa' ? 'font-vazir' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
