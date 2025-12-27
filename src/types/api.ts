// Canonical domain DTOs and API contract types
// This file is the single source-of-truth for domain types used across the frontend.
// Do NOT duplicate domain types elsewhere; consumers should import from here.

export interface Partner {
  id: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  revenue: number;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  status: 'active' | 'discontinued';
  description?: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  reorderLevel: number;
  lastUpdated: string;
}

export interface PurchaseOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  orderDate: string;
  expectedDate: string;
  status: 'draft' | 'approved' | 'ordered' | 'received' | 'invoiced';
  receiptDate?: string;
  invoiceNumber?: string;
}

export interface SalesOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface SalesOrder {
  id: string;
  soNumber: string;
  customer: string;
  items: SalesOrderItem[];
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  status: 'draft' | 'confirmed' | 'picked' | 'delivered' | 'invoiced';
  deliveryNumber?: string;
  invoiceNumber?: string;
}

export interface Machine {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  uptime: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  currentJob?: string;
  manufacturer: string;
  installDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  rating: number;
  totalPurchases: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'on-leave' | 'inactive';
  joinDate: string;
  salary: number;
  // optional shift (may be provided by mock data or scheduling module)
  shift?: string;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  product: string;
  quantity: number;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  machine: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
}

export interface QualityControl {
  id: string;
  inspectionId: string;
  productionOrder: string;
  product: string;
  inspector: string;
  inspectionDate: string;
  status: 'passed' | 'failed' | 'pending';
  defectRate: number;
  notes: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  type: string;
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'inactive';
  manager: string;
}

export interface AccountingEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
  balance: number;
  type: 'income' | 'expense' | 'asset' | 'liability';
  reference: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  progress: number;
}

export interface FormulationIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Formulation {
  id: string;
  name: string;
  code: string;
  product: string;
  version: string;
  status: 'draft' | 'approved' | 'archived';
  ingredients: FormulationIngredient[];
  yield: number;
  cost: number;
}

export interface BOMComponent {
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface BOM {
  id: string;
  name: string;
  code: string;
  product: string;
  version: string;
  status: 'active' | 'obsolete';
  components: BOMComponent[];
  totalCost: number;
}

// Generic result type used by adapters and API client
export interface ErrorInfo {
  code: string | number;
  message: string;
  details?: any;
  retryable?: boolean;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: ErrorInfo };

// Export a narrow shape for data context to ease migration later
export interface DataContextShape {
  partners: Partner[];
  products: Product[];
  orders: Order[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  salesOrders: SalesOrder[];
  machines: Machine[];
  customers: Customer[];
  suppliers: Supplier[];
  employees: Employee[];
  productionOrders: ProductionOrder[];
  qualityControls: QualityControl[];
  warehouses: Warehouse[];
  accountingEntries: AccountingEntry[];
  projects: Project[];
  formulations: Formulation[];
  boms: BOM[];
}
