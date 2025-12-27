/*
  Status: SKELETON
  Reason: apiAdapter is a scaffold that forwards calls to the typed HTTP client but backend endpoints are not implemented yet.
  Allowed actions: authoring-only (scaffold for future backend integration)
*/

import { apiClient } from '../api/client';
import { Result, ErrorInfo, Partner, Product, Order, InventoryItem, PurchaseOrder, SalesOrder, Machine, Customer, Supplier, Employee, ProductionOrder, QualityControl, Warehouse, AccountingEntry, Project, Formulation, BOM } from '../../types/api';

function wrap<T>(res: Result<T>): Result<T> {
  return res;
}

const apiAdapter = {
  // Partners
  getPartners: async (): Promise<Result<Partner[]>> => {
    const res = await apiClient.get<Partner[]>('/partners');
    return wrap(res);
  },
  addPartner: async (partner: Partner): Promise<Result<Partner>> => {
    const res = await apiClient.post<Partner>('/partners', partner);
    return wrap(res);
  },
  updatePartner: async (id: string, patch: Partial<Partner>): Promise<Result<Partner>> => {
    const res = await apiClient.put<Partner>(`/partners/${id}`, patch);
    return wrap(res);
  },
  deletePartner: async (id: string): Promise<Result<{ id: string }>> => {
    const res = await apiClient.delete<{ id: string }>(`/partners/${id}`);
    return wrap(res);
  },

  // Products
  getProducts: async (): Promise<Result<Product[]>> => wrap(await apiClient.get<Product[]>('/products')),
  addProduct: async (product: Product): Promise<Result<Product>> => wrap(await apiClient.post<Product>('/products', product)),
  updateProduct: async (id: string, patch: Partial<Product>): Promise<Result<Product>> => wrap(await apiClient.put<Product>(`/products/${id}`, patch)),
  deleteProduct: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/products/${id}`)),

  // Orders
  getOrders: async (): Promise<Result<Order[]>> => wrap(await apiClient.get<Order[]>('/orders')),
  addOrder: async (order: Order): Promise<Result<Order>> => wrap(await apiClient.post<Order>('/orders', order)),
  updateOrder: async (id: string, patch: Partial<Order>): Promise<Result<Order>> => wrap(await apiClient.put<Order>(`/orders/${id}`, patch)),
  deleteOrder: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/orders/${id}`)),

  // Inventory
  getInventory: async (): Promise<Result<InventoryItem[]>> => wrap(await apiClient.get<InventoryItem[]>('/inventory')),
  addInventoryItem: async (item: InventoryItem): Promise<Result<InventoryItem>> => wrap(await apiClient.post<InventoryItem>('/inventory', item)),
  updateInventoryItem: async (id: string, patch: Partial<InventoryItem>): Promise<Result<InventoryItem>> => wrap(await apiClient.put<InventoryItem>(`/inventory/${id}`, patch)),
  deleteInventoryItem: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/inventory/${id}`)),

  // Purchase & Sales Orders
  getPurchaseOrders: async (): Promise<Result<PurchaseOrder[]>> => wrap(await apiClient.get<PurchaseOrder[]>('/purchase-orders')),
  addPurchaseOrder: async (po: PurchaseOrder): Promise<Result<PurchaseOrder>> => wrap(await apiClient.post<PurchaseOrder>('/purchase-orders', po)),
  updatePurchaseOrder: async (id: string, patch: Partial<PurchaseOrder>): Promise<Result<PurchaseOrder>> => wrap(await apiClient.put<PurchaseOrder>(`/purchase-orders/${id}`, patch)),
  deletePurchaseOrder: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/purchase-orders/${id}`)),

  getSalesOrders: async (): Promise<Result<SalesOrder[]>> => wrap(await apiClient.get<SalesOrder[]>('/sales-orders')),
  addSalesOrder: async (so: SalesOrder): Promise<Result<SalesOrder>> => wrap(await apiClient.post<SalesOrder>('/sales-orders', so)),
  updateSalesOrder: async (id: string, patch: Partial<SalesOrder>): Promise<Result<SalesOrder>> => wrap(await apiClient.put<SalesOrder>(`/sales-orders/${id}`, patch)),
  deleteSalesOrder: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/sales-orders/${id}`)),

  // Machines
  getMachines: async (): Promise<Result<Machine[]>> => wrap(await apiClient.get<Machine[]>('/machines')),
  addMachine: async (m: Machine): Promise<Result<Machine>> => wrap(await apiClient.post<Machine>('/machines', m)),
  updateMachine: async (id: string, patch: Partial<Machine>): Promise<Result<Machine>> => wrap(await apiClient.put<Machine>(`/machines/${id}`, patch)),
  deleteMachine: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/machines/${id}`)),

  // Customers & Suppliers
  getCustomers: async (): Promise<Result<Customer[]>> => wrap(await apiClient.get<Customer[]>('/customers')),
  addCustomer: async (c: Customer): Promise<Result<Customer>> => wrap(await apiClient.post<Customer>('/customers', c)),
  updateCustomer: async (id: string, patch: Partial<Customer>): Promise<Result<Customer>> => wrap(await apiClient.put<Customer>(`/customers/${id}`, patch)),
  deleteCustomer: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/customers/${id}`)),

  getSuppliers: async (): Promise<Result<Supplier[]>> => wrap(await apiClient.get<Supplier[]>('/suppliers')),
  addSupplier: async (s: Supplier): Promise<Result<Supplier>> => wrap(await apiClient.post<Supplier>('/suppliers', s)),
  updateSupplier: async (id: string, patch: Partial<Supplier>): Promise<Result<Supplier>> => wrap(await apiClient.put<Supplier>(`/suppliers/${id}`, patch)),
  deleteSupplier: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/suppliers/${id}`)),

  // Employees
  getEmployees: async (): Promise<Result<Employee[]>> => wrap(await apiClient.get<Employee[]>('/employees')),
  addEmployee: async (e: Employee): Promise<Result<Employee>> => wrap(await apiClient.post<Employee>('/employees', e)),
  updateEmployee: async (id: string, patch: Partial<Employee>): Promise<Result<Employee>> => wrap(await apiClient.put<Employee>(`/employees/${id}`, patch)),
  deleteEmployee: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/employees/${id}`)),

  // Production, QC, Warehouses, Accounting, Projects, Formulations, BOMs
  getProductionOrders: async (): Promise<Result<ProductionOrder[]>> => wrap(await apiClient.get<ProductionOrder[]>('/production-orders')),
  addProductionOrder: async (po: ProductionOrder): Promise<Result<ProductionOrder>> => wrap(await apiClient.post<ProductionOrder>('/production-orders', po)),
  updateProductionOrder: async (id: string, patch: Partial<ProductionOrder>): Promise<Result<ProductionOrder>> => wrap(await apiClient.put<ProductionOrder>(`/production-orders/${id}`, patch)),
  deleteProductionOrder: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/production-orders/${id}`)),

  getQualityControls: async (): Promise<Result<QualityControl[]>> => wrap(await apiClient.get<QualityControl[]>('/quality-controls')),
  addQualityControl: async (q: QualityControl): Promise<Result<QualityControl>> => wrap(await apiClient.post<QualityControl>('/quality-controls', q)),
  updateQualityControl: async (id: string, patch: Partial<QualityControl>): Promise<Result<QualityControl>> => wrap(await apiClient.put<QualityControl>(`/quality-controls/${id}`, patch)),
  deleteQualityControl: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/quality-controls/${id}`)),

  getWarehouses: async (): Promise<Result<Warehouse[]>> => wrap(await apiClient.get<Warehouse[]>('/warehouses')),
  addWarehouse: async (w: Warehouse): Promise<Result<Warehouse>> => wrap(await apiClient.post<Warehouse>('/warehouses', w)),
  updateWarehouse: async (id: string, patch: Partial<Warehouse>): Promise<Result<Warehouse>> => wrap(await apiClient.put<Warehouse>(`/warehouses/${id}`, patch)),
  deleteWarehouse: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/warehouses/${id}`)),

  getAccountingEntries: async (): Promise<Result<AccountingEntry[]>> => wrap(await apiClient.get<AccountingEntry[]>('/accounting-entries')),
  addAccountingEntry: async (a: AccountingEntry): Promise<Result<AccountingEntry>> => wrap(await apiClient.post<AccountingEntry>('/accounting-entries', a)),
  updateAccountingEntry: async (id: string, patch: Partial<AccountingEntry>): Promise<Result<AccountingEntry>> => wrap(await apiClient.put<AccountingEntry>(`/accounting-entries/${id}`, patch)),
  deleteAccountingEntry: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/accounting-entries/${id}`)),

  getProjects: async (): Promise<Result<Project[]>> => wrap(await apiClient.get<Project[]>('/projects')),
  addProject: async (p: Project): Promise<Result<Project>> => wrap(await apiClient.post<Project>('/projects', p)),
  updateProject: async (id: string, patch: Partial<Project>): Promise<Result<Project>> => wrap(await apiClient.put<Project>(`/projects/${id}`, patch)),
  deleteProject: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/projects/${id}`)),

  getFormulations: async (): Promise<Result<Formulation[]>> => wrap(await apiClient.get<Formulation[]>('/formulations')),
  addFormulation: async (f: Formulation): Promise<Result<Formulation>> => wrap(await apiClient.post<Formulation>('/formulations', f)),
  updateFormulation: async (id: string, patch: Partial<Formulation>): Promise<Result<Formulation>> => wrap(await apiClient.put<Formulation>(`/formulations/${id}`, patch)),
  deleteFormulation: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/formulations/${id}`)),

  getBOMs: async (): Promise<Result<BOM[]>> => wrap(await apiClient.get<BOM[]>('/boms')),
  addBOM: async (b: BOM): Promise<Result<BOM>> => wrap(await apiClient.post<BOM>('/boms', b)),
  updateBOM: async (id: string, patch: Partial<BOM>): Promise<Result<BOM>> => wrap(await apiClient.put<BOM>(`/boms/${id}`, patch)),
  deleteBOM: async (id: string): Promise<Result<{ id: string }>> => wrap(await apiClient.delete<{ id: string }>(`/boms/${id}`)),
};

export default apiAdapter;
