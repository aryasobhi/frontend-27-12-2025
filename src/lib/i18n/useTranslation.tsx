import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Language } from './translations';

// ============================================
// Types
// ============================================
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

type TranslationPath = NestedKeyOf<typeof translations.fa>;

// ============================================
// Context
// ============================================
interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  // Relaxed: accept any string key to avoid overly-strict compile-time errors
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'rtl' | 'ltr';
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// ============================================
// Helper: Get nested value by dot-notation path
// ============================================
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return key if not found
    }
  }

  return typeof current === 'string' ? current : path;
}

// ============================================
// Provider Component
// ============================================
interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({ children, defaultLanguage = 'fa' }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const translation = getNestedValue(
        translations[language] as unknown as Record<string, unknown>,
        key
      );

      if (!params) return translation;

      // Replace placeholders like {min}, {max}
      return Object.entries(params).reduce(
        (str, [paramKey, value]) => str.replace(`{${paramKey}}`, String(value)),
        translation
      );
    },
    [language]
  );

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

// ============================================
// Hook
// ============================================
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

// ============================================
// Utility: Convert to Persian numerals
// ============================================
export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

// ============================================
// Utility: Format currency (Rial/Toman)
// ============================================
export function formatPersianCurrency(amount: number, unit: 'rial' | 'toman' = 'toman'): string {
  const formatted = new Intl.NumberFormat('fa-IR').format(amount);
  return `${formatted} ${unit === 'toman' ? 'تومان' : 'ریال'}`;
}

// ============================================
// Utility: Relative time in Persian
// ============================================
export function formatRelativeTime(timeString: string): string {
  if (timeString.includes('hours ago')) {
    const hours = timeString.match(/\d+/)?.[0] || '0';
    return `${toPersianNumber(hours)} ساعت پیش`;
  }
  if (timeString.includes('day ago') || timeString.includes('days ago')) {
    const days = timeString.match(/\d+/)?.[0] || '1';
    return `${toPersianNumber(days)} روز پیش`;
  }
  if (timeString.includes('minutes ago')) {
    const mins = timeString.match(/\d+/)?.[0] || '0';
    return `${toPersianNumber(mins)} دقیقه پیش`;
  }
  return timeString;
}
