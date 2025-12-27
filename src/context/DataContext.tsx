import { createContext, useContext, useState, ReactNode } from 'react';
import dataAdapter from '../lib/adapters/dataAdapter';
import {
  Partner,
  Product,
  Order,
  InventoryItem,
  PurchaseOrder,
  SalesOrder,
  Machine,
  Customer,
  Supplier,
  Employee,
  ProductionOrder,
  QualityControl,
  Warehouse,
  AccountingEntry,
  Project,
  Formulation,
  BOM,
} from '../types/api';

// Re-export domain types for backward compatibility. Many modules import
// their DTO types from the DataContext file; keep that import surface here
// while the canonical definitions live in `src/types/api.ts`.
export type {
  Partner,
  Product,
  Order,
  InventoryItem,
  PurchaseOrder,
  SalesOrder,
  Machine,
  Customer,
  Supplier,
  Employee,
  ProductionOrder,
  QualityControl,
  Warehouse,
  AccountingEntry,
  Project,
  Formulation,
  BOM,
};

interface DataContextType {
  // Partners
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => void;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  // Inventory
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  
  // Purchase Orders
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void;
  updatePurchaseOrder: (id: string, po: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
  
  // Sales Orders
  salesOrders: SalesOrder[];
  addSalesOrder: (so: Omit<SalesOrder, 'id'>) => void;
  updateSalesOrder: (id: string, so: Partial<SalesOrder>) => void;
  deleteSalesOrder: (id: string) => void;
  
  // Machines
  machines: Machine[];
  addMachine: (machine: Omit<Machine, 'id'>) => void;
  updateMachine: (id: string, machine: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Suppliers
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id' | 'totalPurchases'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Production Orders
  productionOrders: ProductionOrder[];
  addProductionOrder: (order: Omit<ProductionOrder, 'id'>) => void;
  updateProductionOrder: (id: string, order: Partial<ProductionOrder>) => void;
  deleteProductionOrder: (id: string) => void;
  
  // Quality Control
  qualityControls: QualityControl[];
  addQualityControl: (qc: Omit<QualityControl, 'id'>) => void;
  updateQualityControl: (id: string, qc: Partial<QualityControl>) => void;
  deleteQualityControl: (id: string) => void;
  
  // Warehouses
  warehouses: Warehouse[];
  addWarehouse: (warehouse: Omit<Warehouse, 'id'>) => void;
  updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;
  
  // Accounting Entries
  accountingEntries: AccountingEntry[];
  addAccountingEntry: (entry: Omit<AccountingEntry, 'id'>) => void;
  updateAccountingEntry: (id: string, entry: Partial<AccountingEntry>) => void;
  deleteAccountingEntry: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Formulations
  formulations: Formulation[];
  addFormulation: (formulation: Omit<Formulation, 'id'>) => void;
  updateFormulation: (id: string, formulation: Partial<Formulation>) => void;
  deleteFormulation: (id: string) => void;
  
  // BOMs
  boms: BOM[];
  addBOM: (bom: Omit<BOM, 'id'>) => void;
  updateBOM: (id: string, bom: Partial<BOM>) => void;
  deleteBOM: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

import { initialPartners } from '../data/mockPartners';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomato Sauce',
    sku: 'PRD-001',
    category: 'Sauces',
    price: 8.50,
    cost: 3.45,
    stock: 1250,
    reorderPoint: 200,
    status: 'active',
    description: 'Premium organic tomato sauce',
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    sku: 'PRD-002',
    category: 'Bakery',
    price: 5.25,
    cost: 2.15,
    stock: 850,
    reorderPoint: 150,
    status: 'active',
    description: 'Fresh whole wheat bread',
  },
];

import { initialInventory } from '../data/mockInventory';
import { mockMachines as initialMachines } from '../data/mockMachines';
import { initialCustomers } from '../data/mockCustomers';
import { initialSuppliers } from '../data/mockSuppliers';

export function DataProvider({ children }: { children: ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [qualityControls, setQualityControls] = useState<QualityControl[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [accountingEntries, setAccountingEntries] = useState<AccountingEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [boms, setBOMs] = useState<BOM[]>([]);

  // Partner CRUD
  const addPartner = (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
      totalOrders: 0,
      revenue: 0,
      rating: 0,
    };
    setPartners([...partners, newPartner]);
    // persist via adapter (async) — optimistic update
    dataAdapter.addPartner(newPartner).then(res => {
      if (!res.ok) console.warn('[dataAdapter] addPartner failed', res);
    }).catch(e => console.warn('[dataAdapter] addPartner error', e));
  };

  const updatePartner = (id: string, updatedData: Partial<Partner>) => {
    setPartners(partners.map(p => p.id === id ? { ...p, ...updatedData } : p));
    dataAdapter.updatePartner(id, updatedData as Partial<Partner>).then(res => {
      if (!res.ok) console.warn('[dataAdapter] updatePartner failed', res);
    }).catch(e => console.warn('[dataAdapter] updatePartner error', e));
  };

  const deletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
    dataAdapter.deletePartner(id).then(res => {
      if (!res.ok) console.warn('[dataAdapter] deletePartner failed', res);
    }).catch(e => console.warn('[dataAdapter] deletePartner error', e));
  };

  // Product CRUD
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    dataAdapter.addProduct(newProduct).then(res => {
      if (!res.ok) console.warn('[dataAdapter] addProduct failed', res);
    }).catch(e => console.warn('[dataAdapter] addProduct error', e));
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    dataAdapter.updateProduct(id, updatedData as Partial<Product>).then(res => {
      if (!res.ok) console.warn('[dataAdapter] updateProduct failed', res);
    }).catch(e => console.warn('[dataAdapter] updateProduct error', e));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    dataAdapter.deleteProduct(id).then(res => {
      if (!res.ok) console.warn('[dataAdapter] deleteProduct failed', res);
    }).catch(e => console.warn('[dataAdapter] deleteProduct error', e));
  };

  // Order CRUD
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
    };
    setOrders([...orders, newOrder]);
    dataAdapter.addOrder(newOrder).then(res => { if (!res.ok) console.warn('[dataAdapter] addOrder failed', res); }).catch(e => console.warn('[dataAdapter] addOrder error', e));
  };

  const updateOrder = (id: string, updatedData: Partial<Order>) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updatedData } : o));
    dataAdapter.updateOrder(id, updatedData as Partial<Order>).catch(e => console.warn('[dataAdapter] updateOrder error', e));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    dataAdapter.deleteOrder(id).catch(e => console.warn('[dataAdapter] deleteOrder error', e));
  };

  // Inventory CRUD
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
    };
    setInventory([...inventory, newItem]);
    dataAdapter.addInventoryItem(newItem).then(res => { if (!res.ok) console.warn('[dataAdapter] addInventoryItem failed', res); }).catch(e => console.warn('[dataAdapter] addInventoryItem error', e));
  };

  const updateInventoryItem = (id: string, updatedData: Partial<InventoryItem>) => {
    setInventory(inventory.map(i => i.id === id ? { ...i, ...updatedData } : i));
    dataAdapter.updateInventoryItem(id, updatedData as Partial<InventoryItem>).catch(e => console.warn('[dataAdapter] updateInventoryItem error', e));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
    dataAdapter.deleteInventoryItem(id).catch(e => console.warn('[dataAdapter] deleteInventoryItem error', e));
  };

  // Purchase Order CRUD
  const addPurchaseOrder = (po: Omit<PurchaseOrder, 'id'>) => {
    const newPO: PurchaseOrder = {
      ...po,
      id: Date.now().toString(),
    };
    setPurchaseOrders([...purchaseOrders, newPO]);
    dataAdapter.addPurchaseOrder(newPO).then(res => { if (!res.ok) console.warn('[dataAdapter] addPurchaseOrder failed', res); }).catch(e => console.warn('[dataAdapter] addPurchaseOrder error', e));
  };

  const updatePurchaseOrder = (id: string, updatedData: Partial<PurchaseOrder>) => {
    setPurchaseOrders(purchaseOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
    dataAdapter.updatePurchaseOrder(id, updatedData as Partial<PurchaseOrder>).catch(e => console.warn('[dataAdapter] updatePurchaseOrder error', e));
  };

  const deletePurchaseOrder = (id: string) => {
    setPurchaseOrders(purchaseOrders.filter(po => po.id !== id));
    dataAdapter.deletePurchaseOrder(id).catch(e => console.warn('[dataAdapter] deletePurchaseOrder error', e));
  };

  // Sales Order CRUD
  const addSalesOrder = (so: Omit<SalesOrder, 'id'>) => {
    const newSO: SalesOrder = {
      ...so,
      id: Date.now().toString(),
    };
    setSalesOrders([...salesOrders, newSO]);
    dataAdapter.addSalesOrder(newSO).then(res => { if (!res.ok) console.warn('[dataAdapter] addSalesOrder failed', res); }).catch(e => console.warn('[dataAdapter] addSalesOrder error', e));
  };

  const updateSalesOrder = (id: string, updatedData: Partial<SalesOrder>) => {
    setSalesOrders(salesOrders.map(so => so.id === id ? { ...so, ...updatedData } : so));
    dataAdapter.updateSalesOrder(id, updatedData as Partial<SalesOrder>).catch(e => console.warn('[dataAdapter] updateSalesOrder error', e));
  };

  const deleteSalesOrder = (id: string) => {
    setSalesOrders(salesOrders.filter(so => so.id !== id));
    dataAdapter.deleteSalesOrder(id).catch(e => console.warn('[dataAdapter] deleteSalesOrder error', e));
  };

  // Machine CRUD
  const addMachine = (machine: Omit<Machine, 'id'>) => {
    const newMachine: Machine = {
      ...machine,
      id: Date.now().toString(),
    };
    setMachines([...machines, newMachine]);
    dataAdapter.addMachine(newMachine).then(res => { if (!res.ok) console.warn('[dataAdapter] addMachine failed', res); }).catch(e => console.warn('[dataAdapter] addMachine error', e));
  };

  const updateMachine = (id: string, updatedData: Partial<Machine>) => {
    setMachines(machines.map(m => m.id === id ? { ...m, ...updatedData } : m));
    dataAdapter.updateMachine(id, updatedData as Partial<Machine>).catch(e => console.warn('[dataAdapter] updateMachine error', e));
  };

  const deleteMachine = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    dataAdapter.deleteMachine(id).catch(e => console.warn('[dataAdapter] deleteMachine error', e));
  };

  // Customer CRUD
  const addCustomer = (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: '',
    };
    setCustomers([...customers, newCustomer]);
    dataAdapter.addCustomer(newCustomer).then(res => { if (!res.ok) console.warn('[dataAdapter] addCustomer failed', res); }).catch(e => console.warn('[dataAdapter] addCustomer error', e));
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...updatedData } : c));
    dataAdapter.updateCustomer(id, updatedData as Partial<Customer>).catch(e => console.warn('[dataAdapter] updateCustomer error', e));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
    dataAdapter.deleteCustomer(id).catch(e => console.warn('[dataAdapter] deleteCustomer error', e));
  };

  // Supplier CRUD
  const addSupplier = (supplier: Omit<Supplier, 'id' | 'totalPurchases'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: Date.now().toString(),
      totalPurchases: 0,
    };
    setSuppliers([...suppliers, newSupplier]);
    dataAdapter.addSupplier(newSupplier).then(res => { if (!res.ok) console.warn('[dataAdapter] addSupplier failed', res); }).catch(e => console.warn('[dataAdapter] addSupplier error', e));
  };

  const updateSupplier = (id: string, updatedData: Partial<Supplier>) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, ...updatedData } : s));
    dataAdapter.updateSupplier(id, updatedData as Partial<Supplier>).catch(e => console.warn('[dataAdapter] updateSupplier error', e));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    dataAdapter.deleteSupplier(id).catch(e => console.warn('[dataAdapter] deleteSupplier error', e));
  };

  // Employee CRUD
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee]);
    dataAdapter.addEmployee(newEmployee).then(res => { if (!res.ok) console.warn('[dataAdapter] addEmployee failed', res); }).catch(e => console.warn('[dataAdapter] addEmployee error', e));
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updatedData } : e));
    dataAdapter.updateEmployee(id, updatedData as Partial<Employee>).catch(e => console.warn('[dataAdapter] updateEmployee error', e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    dataAdapter.deleteEmployee(id).catch(e => console.warn('[dataAdapter] deleteEmployee error', e));
  };

  // Production Order CRUD
  const addProductionOrder = (order: Omit<ProductionOrder, 'id'>) => {
    const newOrder: ProductionOrder = {
      ...order,
      id: Date.now().toString(),
    };
    setProductionOrders([...productionOrders, newOrder]);
    dataAdapter.addProductionOrder(newOrder).then(res => { if (!res.ok) console.warn('[dataAdapter] addProductionOrder failed', res); }).catch(e => console.warn('[dataAdapter] addProductionOrder error', e));
  };

  const updateProductionOrder = (id: string, updatedData: Partial<ProductionOrder>) => {
    setProductionOrders(productionOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
    dataAdapter.updateProductionOrder(id, updatedData as Partial<ProductionOrder>).catch(e => console.warn('[dataAdapter] updateProductionOrder error', e));
  };

  const deleteProductionOrder = (id: string) => {
    setProductionOrders(productionOrders.filter(po => po.id !== id));
    dataAdapter.deleteProductionOrder(id).catch(e => console.warn('[dataAdapter] deleteProductionOrder error', e));
  };

  // Quality Control CRUD
  const addQualityControl = (qc: Omit<QualityControl, 'id'>) => {
    const newQC: QualityControl = {
      ...qc,
      id: Date.now().toString(),
    };
    setQualityControls([...qualityControls, newQC]);
    dataAdapter.addQualityControl(newQC).then(res => { if (!res.ok) console.warn('[dataAdapter] addQualityControl failed', res); }).catch(e => console.warn('[dataAdapter] addQualityControl error', e));
  };

  const updateQualityControl = (id: string, updatedData: Partial<QualityControl>) => {
    setQualityControls(qualityControls.map(qc => qc.id === id ? { ...qc, ...updatedData } : qc));
    dataAdapter.updateQualityControl(id, updatedData as Partial<QualityControl>).catch(e => console.warn('[dataAdapter] updateQualityControl error', e));
  };

  const deleteQualityControl = (id: string) => {
    setQualityControls(qualityControls.filter(qc => qc.id !== id));
    dataAdapter.deleteQualityControl(id).catch(e => console.warn('[dataAdapter] deleteQualityControl error', e));
  };

  // Warehouse CRUD
  const addWarehouse = (warehouse: Omit<Warehouse, 'id'>) => {
    const newWarehouse: Warehouse = {
      ...warehouse,
      id: Date.now().toString(),
    };
    setWarehouses([...warehouses, newWarehouse]);
    dataAdapter.addWarehouse(newWarehouse).then(res => { if (!res.ok) console.warn('[dataAdapter] addWarehouse failed', res); }).catch(e => console.warn('[dataAdapter] addWarehouse error', e));
  };

  const updateWarehouse = (id: string, updatedData: Partial<Warehouse>) => {
    setWarehouses(warehouses.map(w => w.id === id ? { ...w, ...updatedData } : w));
    dataAdapter.updateWarehouse(id, updatedData as Partial<Warehouse>).catch(e => console.warn('[dataAdapter] updateWarehouse error', e));
  };

  const deleteWarehouse = (id: string) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
    dataAdapter.deleteWarehouse(id).catch(e => console.warn('[dataAdapter] deleteWarehouse error', e));
  };

  // Accounting Entry CRUD
  const addAccountingEntry = (entry: Omit<AccountingEntry, 'id'>) => {
    const newEntry: AccountingEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setAccountingEntries([...accountingEntries, newEntry]);
    dataAdapter.addAccountingEntry(newEntry).then(res => { if (!res.ok) console.warn('[dataAdapter] addAccountingEntry failed', res); }).catch(e => console.warn('[dataAdapter] addAccountingEntry error', e));
  };

  const updateAccountingEntry = (id: string, updatedData: Partial<AccountingEntry>) => {
    setAccountingEntries(accountingEntries.map(e => e.id === id ? { ...e, ...updatedData } : e));
    dataAdapter.updateAccountingEntry(id, updatedData as Partial<AccountingEntry>).catch(e => console.warn('[dataAdapter] updateAccountingEntry error', e));
  };

  const deleteAccountingEntry = (id: string) => {
    setAccountingEntries(accountingEntries.filter(e => e.id !== id));
    dataAdapter.deleteAccountingEntry(id).catch(e => console.warn('[dataAdapter] deleteAccountingEntry error', e));
  };

  // Project CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
    dataAdapter.addProject(newProject).then(res => { if (!res.ok) console.warn('[dataAdapter] addProject failed', res); }).catch(e => console.warn('[dataAdapter] addProject error', e));
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedData } : p));
    dataAdapter.updateProject(id, updatedData as Partial<Project>).catch(e => console.warn('[dataAdapter] updateProject error', e));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    dataAdapter.deleteProject(id).catch(e => console.warn('[dataAdapter] deleteProject error', e));
  };

  // Formulation CRUD
  const addFormulation = (formulation: Omit<Formulation, 'id'>) => {
    const newFormulation: Formulation = {
      ...formulation,
      id: Date.now().toString(),
    };
    setFormulations([...formulations, newFormulation]);
    dataAdapter.addFormulation(newFormulation).then(res => { if (!res.ok) console.warn('[dataAdapter] addFormulation failed', res); }).catch(e => console.warn('[dataAdapter] addFormulation error', e));
  };

  const updateFormulation = (id: string, updatedData: Partial<Formulation>) => {
    setFormulations(formulations.map(f => f.id === id ? { ...f, ...updatedData } : f));
    dataAdapter.updateFormulation(id, updatedData as Partial<Formulation>).catch(e => console.warn('[dataAdapter] updateFormulation error', e));
  };

  const deleteFormulation = (id: string) => {
    setFormulations(formulations.filter(f => f.id !== id));
    dataAdapter.deleteFormulation(id).catch(e => console.warn('[dataAdapter] deleteFormulation error', e));
  };

  // BOM CRUD
  const addBOM = (bom: Omit<BOM, 'id'>) => {
    const newBOM: BOM = {
      ...bom,
      id: Date.now().toString(),
    };
    setBOMs([...boms, newBOM]);
    dataAdapter.addBOM(newBOM).then(res => { if (!res.ok) console.warn('[dataAdapter] addBOM failed', res); }).catch(e => console.warn('[dataAdapter] addBOM error', e));
  };

  const updateBOM = (id: string, updatedData: Partial<BOM>) => {
    setBOMs(boms.map(b => b.id === id ? { ...b, ...updatedData } : b));
    dataAdapter.updateBOM(id, updatedData as Partial<BOM>).catch(e => console.warn('[dataAdapter] updateBOM error', e));
  };

  const deleteBOM = (id: string) => {
    setBOMs(boms.filter(b => b.id !== id));
    dataAdapter.deleteBOM(id).catch(e => console.warn('[dataAdapter] deleteBOM error', e));
  };

  return (
    <DataContext.Provider
      value={{
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        purchaseOrders,
        addPurchaseOrder,
        updatePurchaseOrder,
        deletePurchaseOrder,
        salesOrders,
        addSalesOrder,
        updateSalesOrder,
        deleteSalesOrder,
        machines,
        addMachine,
        updateMachine,
        deleteMachine,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        productionOrders,
        addProductionOrder,
        updateProductionOrder,
        deleteProductionOrder,
        qualityControls,
        addQualityControl,
        updateQualityControl,
        deleteQualityControl,
        warehouses,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
        accountingEntries,
        addAccountingEntry,
        updateAccountingEntry,
        deleteAccountingEntry,
        projects,
        addProject,
        updateProject,
        deleteProject,
        formulations,
        addFormulation,
        updateFormulation,
        deleteFormulation,
        boms,
        addBOM,
        updateBOM,
        deleteBOM,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
