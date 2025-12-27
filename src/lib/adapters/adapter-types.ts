import { Result, Partner, Product, Order, InventoryItem, PurchaseOrder, SalesOrder, Machine, Customer, Supplier, Employee, ProductionOrder, QualityControl, Warehouse, AccountingEntry, Project, Formulation, BOM } from '../../types/api';

export interface DataAdapter {
  mode: 'mock' | 'api';

  // Partners
  getPartners: () => Promise<Result<Partner[]>>;
  addPartner: (p: Partner) => Promise<Result<Partner>>;
  updatePartner: (id: string, patch: Partial<Partner>) => Promise<Result<Partner>>;
  deletePartner: (id: string) => Promise<Result<{ id: string }>>;

  // Products
  getProducts: () => Promise<Result<Product[]>>;
  addProduct: (p: Product) => Promise<Result<Product>>;
  updateProduct: (id: string, patch: Partial<Product>) => Promise<Result<Product>>;
  deleteProduct: (id: string) => Promise<Result<{ id: string }>>;

  // Orders
  getOrders: () => Promise<Result<Order[]>>;
  addOrder: (o: Order) => Promise<Result<Order>>;
  updateOrder: (id: string, patch: Partial<Order>) => Promise<Result<Order>>;
  deleteOrder: (id: string) => Promise<Result<{ id: string }>>;

  // Inventory
  getInventory: () => Promise<Result<InventoryItem[]>>;
  addInventoryItem: (i: InventoryItem) => Promise<Result<InventoryItem>>;
  updateInventoryItem: (id: string, patch: Partial<InventoryItem>) => Promise<Result<InventoryItem>>;
  deleteInventoryItem: (id: string) => Promise<Result<{ id: string }>>;

  // Purchase & Sales
  getPurchaseOrders: () => Promise<Result<PurchaseOrder[]>>;
  addPurchaseOrder: (po: PurchaseOrder) => Promise<Result<PurchaseOrder>>;
  updatePurchaseOrder: (id: string, patch: Partial<PurchaseOrder>) => Promise<Result<PurchaseOrder>>;
  deletePurchaseOrder: (id: string) => Promise<Result<{ id: string }>>;

  getSalesOrders: () => Promise<Result<SalesOrder[]>>;
  addSalesOrder: (so: SalesOrder) => Promise<Result<SalesOrder>>;
  updateSalesOrder: (id: string, patch: Partial<SalesOrder>) => Promise<Result<SalesOrder>>;
  deleteSalesOrder: (id: string) => Promise<Result<{ id: string }>>;

  // Machines
  getMachines: () => Promise<Result<Machine[]>>;
  addMachine: (m: Machine) => Promise<Result<Machine>>;
  updateMachine: (id: string, patch: Partial<Machine>) => Promise<Result<Machine>>;
  deleteMachine: (id: string) => Promise<Result<{ id: string }>>;

  // Customers / Suppliers
  getCustomers: () => Promise<Result<Customer[]>>;
  addCustomer: (c: Customer) => Promise<Result<Customer>>;
  updateCustomer: (id: string, patch: Partial<Customer>) => Promise<Result<Customer>>;
  deleteCustomer: (id: string) => Promise<Result<{ id: string }>>;

  getSuppliers: () => Promise<Result<Supplier[]>>;
  addSupplier: (s: Supplier) => Promise<Result<Supplier>>;
  updateSupplier: (id: string, patch: Partial<Supplier>) => Promise<Result<Supplier>>;
  deleteSupplier: (id: string) => Promise<Result<{ id: string }>>;

  // Employees
  getEmployees: () => Promise<Result<Employee[]>>;
  addEmployee: (e: Employee) => Promise<Result<Employee>>;
  updateEmployee: (id: string, patch: Partial<Employee>) => Promise<Result<Employee>>;
  deleteEmployee: (id: string) => Promise<Result<{ id: string }>>;

  // Production, QC, Warehouses, Accounting, Projects, Formulations, BOMs
  getProductionOrders: () => Promise<Result<ProductionOrder[]>>;
  addProductionOrder: (po: ProductionOrder) => Promise<Result<ProductionOrder>>;
  updateProductionOrder: (id: string, patch: Partial<ProductionOrder>) => Promise<Result<ProductionOrder>>;
  deleteProductionOrder: (id: string) => Promise<Result<{ id: string }>>;

  getQualityControls: () => Promise<Result<QualityControl[]>>;
  addQualityControl: (q: QualityControl) => Promise<Result<QualityControl>>;
  updateQualityControl: (id: string, patch: Partial<QualityControl>) => Promise<Result<QualityControl>>;
  deleteQualityControl: (id: string) => Promise<Result<{ id: string }>>;

  getWarehouses: () => Promise<Result<Warehouse[]>>;
  addWarehouse: (w: Warehouse) => Promise<Result<Warehouse>>;
  updateWarehouse: (id: string, patch: Partial<Warehouse>) => Promise<Result<Warehouse>>;
  deleteWarehouse: (id: string) => Promise<Result<{ id: string }>>;

  getAccountingEntries: () => Promise<Result<AccountingEntry[]>>;
  addAccountingEntry: (a: AccountingEntry) => Promise<Result<AccountingEntry>>;
  updateAccountingEntry: (id: string, patch: Partial<AccountingEntry>) => Promise<Result<AccountingEntry>>;
  deleteAccountingEntry: (id: string) => Promise<Result<{ id: string }>>;

  getProjects: () => Promise<Result<Project[]>>;
  addProject: (p: Project) => Promise<Result<Project>>;
  updateProject: (id: string, patch: Partial<Project>) => Promise<Result<Project>>;
  deleteProject: (id: string) => Promise<Result<{ id: string }>>;

  getFormulations: () => Promise<Result<Formulation[]>>;
  addFormulation: (f: Formulation) => Promise<Result<Formulation>>;
  updateFormulation: (id: string, patch: Partial<Formulation>) => Promise<Result<Formulation>>;
  deleteFormulation: (id: string) => Promise<Result<{ id: string }>>;

  getBOMs: () => Promise<Result<BOM[]>>;
  addBOM: (b: BOM) => Promise<Result<BOM>>;
  updateBOM: (id: string, patch: Partial<BOM>) => Promise<Result<BOM>>;
  deleteBOM: (id: string) => Promise<Result<{ id: string }>>;
}

