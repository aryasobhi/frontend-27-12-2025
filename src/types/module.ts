export type FilterType = 'text' | 'select' | 'date';
export type ColumnType = 'text' | 'badge' | 'currency' | 'date' | 'progress';

export interface ModuleFilter {
  id: string;
  type: FilterType;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface ModuleColumn {
  key: string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
}

export interface ModuleConfig {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string; // Lucide icon name string
  primaryAction: {
    label: string;
    iconName?: string;
  };
  filters: ModuleFilter[];
  columns: ModuleColumn[];
  formFields: {
    id: string;
    label: string;
    type: string;
    required?: boolean;
    colSpan?: number;
  }[];
}
