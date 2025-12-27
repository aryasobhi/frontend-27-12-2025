import { Result, ErrorInfo, Partner, Product, Order, InventoryItem, PurchaseOrder, SalesOrder, Machine, Customer, Supplier, Employee, ProductionOrder, QualityControl, Warehouse, AccountingEntry, Project, Formulation, BOM } from '../../types/api';
import { initialPartners } from '../../data/mockPartners';
import { mockProducts } from '../../data/mockProducts';
import { initialInventory } from '../../data/mockInventory';
import { mockMachines } from '../../data/mockMachines';
import { initialCustomers } from '../../data/mockCustomers';
import { initialSuppliers } from '../../data/mockSuppliers';
import { isMock } from './adapter.config';
import apiAdapter from './apiAdapter';
import { DataAdapter } from './adapter-types';

// Minimal mock adapter implementation. This holds in-memory arrays and exposes methods used by DataContext.
// All methods return Promise<Result<...>> following the canonical Result<T> pattern.

// Module-level in-memory stores (mock mode)
let partnersStore: Partner[] = (initialPartners as Partner[]) || [];
let productsStore: Product[] = (mockProducts as Product[]) || [];
let inventoryStore: InventoryItem[] = (initialInventory as InventoryItem[]) || [];
let machinesStore: Machine[] = (mockMachines as Machine[]) || [];
let customersStore: Customer[] = (initialCustomers as Customer[]) || [];
let suppliersStore: Supplier[] = (initialSuppliers as Supplier[]) || [];
let ordersStore: Order[] = [];
let purchaseOrdersStore: PurchaseOrder[] = [];
let salesOrdersStore: SalesOrder[] = [];
let employeesStore: Employee[] = [];
let productionOrdersStore: ProductionOrder[] = [];
let qualityControlsStore: QualityControl[] = [];
let warehousesStore: Warehouse[] = [];
let accountingEntriesStore: AccountingEntry[] = [];
let projectsStore: Project[] = [];
let formulationsStore: Formulation[] = [];
let bomsStore: BOM[] = [];

function buildError(code: string | number, message: string, details?: any, retryable = false): ErrorInfo {
  return { code, message, details, retryable };
}

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

const mockAdapter = {
  // Partners
  getPartners: async (): Promise<Result<Partner[]>> => {
    await delay();
    return { ok: true, data: [...partnersStore] };
  },
  addPartner: async (partner: Partner): Promise<Result<Partner>> => {
    await delay();
    partnersStore = [...partnersStore, partner];
    return { ok: true, data: partner };
  },
  updatePartner: async (id: string, patch: Partial<Partner>): Promise<Result<Partner>> => {
    await delay();
    partnersStore = partnersStore.map(p => p.id === id ? { ...p, ...patch } : p);
    const updated = partnersStore.find(p => p.id === id)!;
    return { ok: true, data: updated };
  },
  deletePartner: async (id: string): Promise<Result<{ id: string }>> => {
    await delay();
    partnersStore = partnersStore.filter(p => p.id !== id);
    return { ok: true, data: { id } };
  },

  // Products
  getProducts: async (): Promise<Result<Product[]>> => {
    await delay();
    return { ok: true, data: [...productsStore] };
  },
  addProduct: async (product: Product): Promise<Result<Product>> => {
    await delay();
    productsStore = [...productsStore, product];
    return { ok: true, data: product };
  },
  updateProduct: async (id: string, patch: Partial<Product>): Promise<Result<Product>> => {
    await delay();
    productsStore = productsStore.map(p => p.id === id ? { ...p, ...patch } : p);
    const updated = productsStore.find(p => p.id === id)!;
    return { ok: true, data: updated };
  },
  deleteProduct: async (id: string): Promise<Result<{ id: string }>> => {
    await delay();
    productsStore = productsStore.filter(p => p.id !== id);
    return { ok: true, data: { id } };
  },

  // Machines (example, rest follow same pattern)
  getMachines: async (): Promise<Result<Machine[]>> => {
    await delay();
    return { ok: true, data: [...machinesStore] };
  },
  addMachine: async (m: Machine): Promise<Result<Machine>> => {
    await delay();
    machinesStore = [...machinesStore, m];
    return { ok: true, data: m };
  },
  updateMachine: async (id: string, patch: Partial<Machine>): Promise<Result<Machine>> => {
    await delay();
    machinesStore = machinesStore.map(x => x.id === id ? { ...x, ...patch } : x);
    return { ok: true, data: machinesStore.find(x => x.id === id)! };
  },
  deleteMachine: async (id: string): Promise<Result<{ id: string }>> => {
    await delay();
    machinesStore = machinesStore.filter(x => x.id !== id);
    return { ok: true, data: { id } };
  },

  // Customers & Suppliers
  getCustomers: async (): Promise<Result<Customer[]>> => {
    await delay();
    return { ok: true, data: [...customersStore] };
  },
  addCustomer: async (c: Customer): Promise<Result<Customer>> => {
    await delay();
    customersStore = [...customersStore, c];
    return { ok: true, data: c };
  },
  updateCustomer: async (id: string, patch: Partial<Customer>): Promise<Result<Customer>> => {
    await delay();
    customersStore = customersStore.map(x => x.id === id ? { ...x, ...patch } : x);
    return { ok: true, data: customersStore.find(x => x.id === id)! };
  },
  deleteCustomer: async (id: string): Promise<Result<{ id: string }>> => {
    await delay();
    customersStore = customersStore.filter(x => x.id !== id);
    return { ok: true, data: { id } };
  },

  getSuppliers: async (): Promise<Result<Supplier[]>> => {
    await delay();
    return { ok: true, data: [...suppliersStore] };
  },
  addSupplier: async (s: Supplier): Promise<Result<Supplier>> => {
    await delay();
    suppliersStore = [...suppliersStore, s];
    return { ok: true, data: s };
  },
  updateSupplier: async (id: string, patch: Partial<Supplier>): Promise<Result<Supplier>> => {
    await delay();
    suppliersStore = suppliersStore.map(x => x.id === id ? { ...x, ...patch } : x);
    return { ok: true, data: suppliersStore.find(x => x.id === id)! };
  },
  deleteSupplier: async (id: string): Promise<Result<{ id: string }>> => {
    await delay();
    suppliersStore = suppliersStore.filter(x => x.id !== id);
    return { ok: true, data: { id } };
  },

  // Inventory
  getInventory: async (): Promise<Result<InventoryItem[]>> => {
    await delay();
    return { ok: true, data: [...inventoryStore] };
  },
  // ... Additional inventory methods can be added similarly

  // Generic getters for stores not yet populated by mock files
  getOrders: async (): Promise<Result<Order[]>> => ({ ok: true, data: [...ordersStore] }),
  getPurchaseOrders: async (): Promise<Result<PurchaseOrder[]>> => ({ ok: true, data: [...purchaseOrdersStore] }),
  getSalesOrders: async (): Promise<Result<SalesOrder[]>> => ({ ok: true, data: [...salesOrdersStore] }),
  getEmployees: async (): Promise<Result<Employee[]>> => ({ ok: true, data: [...employeesStore] }),
  getProductionOrders: async (): Promise<Result<ProductionOrder[]>> => ({ ok: true, data: [...productionOrdersStore] }),
  getQualityControls: async (): Promise<Result<QualityControl[]>> => ({ ok: true, data: [...qualityControlsStore] }),
  getWarehouses: async (): Promise<Result<Warehouse[]>> => ({ ok: true, data: [...warehousesStore] }),
  getAccountingEntries: async (): Promise<Result<AccountingEntry[]>> => ({ ok: true, data: [...accountingEntriesStore] }),
  getProjects: async (): Promise<Result<Project[]>> => ({ ok: true, data: [...projectsStore] }),
  getFormulations: async (): Promise<Result<Formulation[]>> => ({ ok: true, data: [...formulationsStore] }),
  getBOMs: async (): Promise<Result<BOM[]>> => ({ ok: true, data: [...bomsStore] }),
};

// Select adapter at runtime based on configuration
const dataAdapter = isMock()
  ? { mode: 'mock', ...mockAdapter }
  : { mode: 'api', ...apiAdapter };

export default dataAdapter as unknown as DataAdapter;
