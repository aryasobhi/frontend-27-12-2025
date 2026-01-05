import { createContext, useContext, useState, ReactNode } from 'react';
import BackendService from '../api/services';
import { toast } from 'sonner';
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
  // Sync / connection status
  isSyncing: boolean;
  lastSyncTime: string | null;
  connectionError: string | null;
  fetchInitialData: () => Promise<boolean>;
  commitChanges: (entityId: string, delta: any) => Promise<any>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

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
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Partner CRUD
  const addPartner = (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
      totalOrders: 0,
      revenue: 0,
      rating: 0,
    };
    const prev = partners;
    setPartners([...partners, newPartner]);
    (async () => {
      try {
        await BackendService.create('partners', newPartner);
      } catch (err: any) {
        setPartners(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Add partner failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const updatePartner = (id: string, updatedData: Partial<Partner>) => {
    const prev = partners;
    setPartners(partners.map(p => p.id === id ? { ...p, ...updatedData } : p));
    (async () => {
      try {
        await BackendService.update('partners', id, updatedData);
      } catch (err: any) {
        setPartners(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Update partner failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const deletePartner = (id: string) => {
    const prev = partners;
    setPartners(partners.filter(p => p.id !== id));
    (async () => {
      try {
        await BackendService.remove('partners', id);
      } catch (err: any) {
        setPartners(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Delete partner failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  // Product CRUD
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    const prev = products;
    setProducts([...products, newProduct]);
    (async () => {
      try {
        await BackendService.create('products', newProduct);
      } catch (err: any) {
        setProducts(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Add product failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    const prev = products;
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    (async () => {
      try {
        await BackendService.update('products', id, updatedData);
      } catch (err: any) {
        setProducts(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Update product failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const deleteProduct = (id: string) => {
    const prev = products;
    setProducts(products.filter(p => p.id !== id));
    (async () => {
      try {
        await BackendService.remove('products', id);
      } catch (err: any) {
        setProducts(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Delete product failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  // Order CRUD
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
    };
    const prev = orders;
    setOrders([...orders, newOrder]);
    (async () => {
      try {
        await BackendService.create('orders', newOrder);
      } catch (err: any) {
        setOrders(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Add order failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const updateOrder = (id: string, updatedData: Partial<Order>) => {
    const prev = orders;
    setOrders(orders.map(o => o.id === id ? { ...o, ...updatedData } : o));
    (async () => {
      try {
        await BackendService.update('orders', id, updatedData);
      } catch (err: any) {
        setOrders(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Update order failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  const deleteOrder = (id: string) => {
    const prev = orders;
    setOrders(orders.filter(o => o.id !== id));
    (async () => {
      try {
        await BackendService.remove('orders', id);
      } catch (err: any) {
        setOrders(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Delete order failed';
        setConnectionError(m.toString());
        toast.error(m.toString());
      }
    })();
  };

  // Inventory CRUD
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
    };
    const prev = inventory;
    setInventory([...inventory, newItem]);
    (async () => {
      try { await BackendService.create('inventory', newItem); } catch (err: any) { setInventory(prev); const m = (err && (err.serverMessage || err.message)) || 'Add inventory failed'; setConnectionError(m.toString()); toast.error(m.toString()); }
    })();

  };

  const updateInventoryItem = (id: string, updatedData: Partial<InventoryItem>) => {
    const prev = inventory;
    setInventory(inventory.map(i => i.id === id ? { ...i, ...updatedData } : i));
    (async () => { try { await BackendService.update('inventory', id, updatedData); } catch (err: any) { setInventory(prev); const m = (err && (err.serverMessage || err.message)) || 'Update inventory failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteInventoryItem = (id: string) => {
    const prev = inventory;
    setInventory(inventory.filter(i => i.id !== id));
    (async () => { try { await BackendService.remove('inventory', id); } catch (err: any) { setInventory(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete inventory failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Purchase Order CRUD
  const addPurchaseOrder = (po: Omit<PurchaseOrder, 'id'>) => {
    const newPO: PurchaseOrder = {
      ...po,
      id: Date.now().toString(),
    };
    const prev = purchaseOrders;
    setPurchaseOrders([...purchaseOrders, newPO]);
    (async () => { try { await BackendService.create('purchase-orders', newPO); } catch (err: any) { setPurchaseOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Add purchase order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updatePurchaseOrder = (id: string, updatedData: Partial<PurchaseOrder>) => {
    const prev = purchaseOrders;
    setPurchaseOrders(purchaseOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
    (async () => { try { await BackendService.update('purchase-orders', id, updatedData); } catch (err: any) { setPurchaseOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Update purchase order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deletePurchaseOrder = (id: string) => {
    const prev = purchaseOrders;
    setPurchaseOrders(purchaseOrders.filter(po => po.id !== id));
    (async () => { try { await BackendService.remove('purchase-orders', id); } catch (err: any) { setPurchaseOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete purchase order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Sales Order CRUD
  const addSalesOrder = (so: Omit<SalesOrder, 'id'>) => {
    const newSO: SalesOrder = {
      ...so,
      id: Date.now().toString(),
    };
    const prev = salesOrders;
    setSalesOrders([...salesOrders, newSO]);
    (async () => { try { await BackendService.create('sales-orders', newSO); } catch (err: any) { setSalesOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Add sales order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateSalesOrder = (id: string, updatedData: Partial<SalesOrder>) => {
    const prev = salesOrders;
    setSalesOrders(salesOrders.map(so => so.id === id ? { ...so, ...updatedData } : so));
    (async () => { try { await BackendService.update('sales-orders', id, updatedData); } catch (err: any) { setSalesOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Update sales order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteSalesOrder = (id: string) => {
    const prev = salesOrders;
    setSalesOrders(salesOrders.filter(so => so.id !== id));
    (async () => { try { await BackendService.remove('sales-orders', id); } catch (err: any) { setSalesOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete sales order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Machine CRUD
  const addMachine = (machine: Omit<Machine, 'id'>) => {
    const newMachine: Machine = {
      ...machine,
      id: Date.now().toString(),
    };
    const prev = machines;
    setMachines([...machines, newMachine]);
    (async () => { try { await BackendService.create('machines', newMachine); } catch (err: any) { setMachines(prev); const m = (err && (err.serverMessage || err.message)) || 'Add machine failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateMachine = (id: string, updatedData: Partial<Machine>) => {
    const prev = machines;
    setMachines(machines.map(m => m.id === id ? { ...m, ...updatedData } : m));
    (async () => { try { await BackendService.update('machines', id, updatedData); } catch (err: any) { setMachines(prev); const m = (err && (err.serverMessage || err.message)) || 'Update machine failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteMachine = (id: string) => {
    const prev = machines;
    setMachines(machines.filter(m => m.id !== id));
    (async () => { try { await BackendService.remove('machines', id); } catch (err: any) { setMachines(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete machine failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
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
    const prev = customers;
    setCustomers([...customers, newCustomer]);
    (async () => { try { await BackendService.create('customers', newCustomer); } catch (err: any) { setCustomers(prev); const m = (err && (err.serverMessage || err.message)) || 'Add customer failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    const prev = customers;
    setCustomers(customers.map(c => c.id === id ? { ...c, ...updatedData } : c));
    (async () => { try { await BackendService.update('customers', id, updatedData); } catch (err: any) { setCustomers(prev); const m = (err && (err.serverMessage || err.message)) || 'Update customer failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteCustomer = (id: string) => {
    const prev = customers;
    setCustomers(customers.filter(c => c.id !== id));
    (async () => { try { await BackendService.remove('customers', id); } catch (err: any) { setCustomers(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete customer failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Supplier CRUD
  const addSupplier = (supplier: Omit<Supplier, 'id' | 'totalPurchases'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: Date.now().toString(),
      totalPurchases: 0,
    };
    const prev = suppliers;
    setSuppliers([...suppliers, newSupplier]);
    (async () => { try { await BackendService.create('suppliers', newSupplier); } catch (err: any) { setSuppliers(prev); const m = (err && (err.serverMessage || err.message)) || 'Add supplier failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateSupplier = (id: string, updatedData: Partial<Supplier>) => {
    const prev = suppliers;
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, ...updatedData } : s));
    (async () => { try { await BackendService.update('suppliers', id, updatedData); } catch (err: any) { setSuppliers(prev); const m = (err && (err.serverMessage || err.message)) || 'Update supplier failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteSupplier = (id: string) => {
    const prev = suppliers;
    setSuppliers(suppliers.filter(s => s.id !== id));
    (async () => { try { await BackendService.remove('suppliers', id); } catch (err: any) { setSuppliers(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete supplier failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Employee CRUD
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    const prev = employees;
    setEmployees([...employees, newEmployee]);
    (async () => { try { await BackendService.create('employees', newEmployee); } catch (err: any) { setEmployees(prev); const m = (err && (err.serverMessage || err.message)) || 'Add employee failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    const prev = employees;
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updatedData } : e));
    (async () => { try { await BackendService.update('employees', id, updatedData); } catch (err: any) { setEmployees(prev); const m = (err && (err.serverMessage || err.message)) || 'Update employee failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteEmployee = (id: string) => {
    const prev = employees;
    setEmployees(employees.filter(e => e.id !== id));
    (async () => { try { await BackendService.remove('employees', id); } catch (err: any) { setEmployees(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete employee failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Production Order CRUD
  const addProductionOrder = (order: Omit<ProductionOrder, 'id'>) => {
    const newOrder: ProductionOrder = {
      ...order,
      id: Date.now().toString(),
    };
    const prev = productionOrders;
    setProductionOrders([...productionOrders, newOrder]);
    (async () => { try { await BackendService.create('production-orders', newOrder); } catch (err: any) { setProductionOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Add production order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateProductionOrder = (id: string, updatedData: Partial<ProductionOrder>) => {
    const prev = productionOrders;
    setProductionOrders(productionOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
    (async () => { try { await BackendService.update('production-orders', id, updatedData); } catch (err: any) { setProductionOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Update production order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteProductionOrder = (id: string) => {
    const prev = productionOrders;
    setProductionOrders(productionOrders.filter(po => po.id !== id));
    (async () => { try { await BackendService.remove('production-orders', id); } catch (err: any) { setProductionOrders(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete production order failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Quality Control CRUD
  const addQualityControl = (qc: Omit<QualityControl, 'id'>) => {
    const newQC: QualityControl = {
      ...qc,
      id: Date.now().toString(),
    };
    const prev = qualityControls;
    setQualityControls([...qualityControls, newQC]);
    (async () => { try { await BackendService.create('quality-controls', newQC); } catch (err: any) { setQualityControls(prev); const m = (err && (err.serverMessage || err.message)) || 'Add quality control failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateQualityControl = (id: string, updatedData: Partial<QualityControl>) => {
    const prev = qualityControls;
    setQualityControls(qualityControls.map(qc => qc.id === id ? { ...qc, ...updatedData } : qc));
    (async () => { try { await BackendService.update('quality-controls', id, updatedData); } catch (err: any) { setQualityControls(prev); const m = (err && (err.serverMessage || err.message)) || 'Update quality control failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteQualityControl = (id: string) => {
    const prev = qualityControls;
    setQualityControls(qualityControls.filter(qc => qc.id !== id));
    (async () => { try { await BackendService.remove('quality-controls', id); } catch (err: any) { setQualityControls(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete quality control failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Warehouse CRUD
  const addWarehouse = (warehouse: Omit<Warehouse, 'id'>) => {
    const newWarehouse: Warehouse = {
      ...warehouse,
      id: Date.now().toString(),
    };
    const prev = warehouses;
    setWarehouses([...warehouses, newWarehouse]);
    (async () => { try { await BackendService.create('warehouses', newWarehouse); } catch (err: any) { setWarehouses(prev); const m = (err && (err.serverMessage || err.message)) || 'Add warehouse failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateWarehouse = (id: string, updatedData: Partial<Warehouse>) => {
    const prev = warehouses;
    setWarehouses(warehouses.map(w => w.id === id ? { ...w, ...updatedData } : w));
    (async () => { try { await BackendService.update('warehouses', id, updatedData); } catch (err: any) { setWarehouses(prev); const m = (err && (err.serverMessage || err.message)) || 'Update warehouse failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteWarehouse = (id: string) => {
    const prev = warehouses;
    setWarehouses(warehouses.filter(w => w.id !== id));
    (async () => { try { await BackendService.remove('warehouses', id); } catch (err: any) { setWarehouses(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete warehouse failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Accounting Entry CRUD
  const addAccountingEntry = (entry: Omit<AccountingEntry, 'id'>) => {
    const newEntry: AccountingEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    const prev = accountingEntries;
    setAccountingEntries([...accountingEntries, newEntry]);
    (async () => { try { await BackendService.create('accounting-entries', newEntry); } catch (err: any) { setAccountingEntries(prev); const m = (err && (err.serverMessage || err.message)) || 'Add accounting entry failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateAccountingEntry = (id: string, updatedData: Partial<AccountingEntry>) => {
    const prev = accountingEntries;
    setAccountingEntries(accountingEntries.map(e => e.id === id ? { ...e, ...updatedData } : e));
    (async () => { try { await BackendService.update('accounting-entries', id, updatedData); } catch (err: any) { setAccountingEntries(prev); const m = (err && (err.serverMessage || err.message)) || 'Update accounting entry failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteAccountingEntry = (id: string) => {
    const prev = accountingEntries;
    setAccountingEntries(accountingEntries.filter(e => e.id !== id));
    (async () => { try { await BackendService.remove('accounting-entries', id); } catch (err: any) { setAccountingEntries(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete accounting entry failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Project CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    const prev = projects;
    setProjects([...projects, newProject]);
    (async () => { try { await BackendService.create('projects', newProject); } catch (err: any) { setProjects(prev); const m = (err && (err.serverMessage || err.message)) || 'Add project failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    const prev = projects;
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedData } : p));
    (async () => { try { await BackendService.update('projects', id, updatedData); } catch (err: any) { setProjects(prev); const m = (err && (err.serverMessage || err.message)) || 'Update project failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  const deleteProject = (id: string) => {
    const prev = projects;
    setProjects(projects.filter(p => p.id !== id));
    (async () => { try { await BackendService.remove('projects', id); } catch (err: any) { setProjects(prev); const m = (err && (err.serverMessage || err.message)) || 'Delete project failed'; setConnectionError(m.toString()); toast.error(m.toString()); } })();
  };

  // Formulation CRUD
  function validateFormulationShape(f: Formulation) {
    if (!f) return false;
    if (!f.name || !f.code || !f.product || !f.version) return false;
    if (!Array.isArray(f.ingredients)) return false;
    for (const ing of f.ingredients) {
      if (!ing.name || typeof ing.quantity !== 'number' || !ing.unit) return false;
    }
    return true;
  }

  const addFormulation = (formulation: Omit<Formulation, 'id'>) => {
    const newFormulation: Formulation = {
      ...formulation,
      id: Date.now().toString(),
    };
    const prev = formulations;
    setFormulations([...formulations, newFormulation]);
    (async () => {
      try {
        if (!validateFormulationShape(newFormulation)) throw Object.assign(new Error('Invalid formulation shape'), { code: 'SCHEMA_VALIDATION' });
        await BackendService.create('formulations', newFormulation);
        setLastSyncTime(new Date().toISOString());
      } catch (err: any) {
        setFormulations(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Add formulation failed';
        setConnectionError(m.toString());
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      } finally {
        // no-op cleanup
      }
    })();
  };

  const updateFormulation = async (id: string, updatedData: Partial<Formulation>) => {
    const prev = formulations;
    setFormulations(formulations.map(f => f.id === id ? { ...f, ...updatedData } : f));
    try {
      // version check: fetch backend version
      const backend = await BackendService.get('formulations', id);
      const backendVersion = backend?.version || (backend?.data && backend.data.version) || null;
      const local = formulations.find(f => f.id === id)?.version;
      if (backendVersion && local && backendVersion !== local) {
        throw Object.assign(new Error('Data Outdated: Please refresh before saving.'), { code: 'VERSION_MISMATCH' });
      }
      const merged = { ...(formulations.find(f => f.id === id) || {}), ...updatedData } as Formulation;
      if (!validateFormulationShape(merged)) throw Object.assign(new Error('Invalid formulation shape'), { code: 'SCHEMA_VALIDATION' });
      await BackendService.update('formulations', id, merged);
      setLastSyncTime(new Date().toISOString());
    } catch (err: any) {
      setFormulations(prev);
      const m = (err && (err.serverMessage || err.message)) || 'Update formulation failed';
      setConnectionError(m.toString());
      if (err && err.code === 'VERSION_MISMATCH') {
        toast.error('Data Outdated: Please refresh before saving.');
      } else {
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      }
    } finally {
      // cleanup if necessary
    }
  };

  const deleteFormulation = (id: string) => {
    const prev = formulations;
    setFormulations(formulations.filter(f => f.id !== id));
    (async () => {
      try {
        await BackendService.remove('formulations', id);
        setLastSyncTime(new Date().toISOString());
      } catch (err: any) {
        setFormulations(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Delete formulation failed';
        setConnectionError(m.toString());
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      } finally {
        // no-op
      }
    })();
  };

  // BOM CRUD
  function validateBOMShape(b: BOM) {
    if (!b) return false;
    if (!b.name || !b.code || !b.product || !b.version) return false;
    if (!Array.isArray(b.components)) return false;
    for (const c of b.components) {
      if (!c.name || typeof c.quantity !== 'number' || !c.unit || typeof c.cost !== 'number') return false;
    }
    return true;
  }

  const addBOM = (bom: Omit<BOM, 'id'>) => {
    const newBOM: BOM = {
      ...bom,
      id: Date.now().toString(),
    };
    const prev = boms;
    setBOMs([...boms, newBOM]);
    (async () => {
      try {
        if (!validateBOMShape(newBOM)) throw Object.assign(new Error('Invalid BOM shape'), { code: 'SCHEMA_VALIDATION' });
        await BackendService.create('boms', newBOM);
        setLastSyncTime(new Date().toISOString());
      } catch (err: any) {
        setBOMs(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Add BOM failed';
        setConnectionError(m.toString());
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      } finally {
        // no-op
      }
    })();
  };

  const updateBOM = async (id: string, updatedData: Partial<BOM>) => {
    const prev = boms;
    setBOMs(boms.map(b => b.id === id ? { ...b, ...updatedData } : b));
    try {
      const backend = await BackendService.get('boms', id);
      const backendVersion = backend?.version || (backend?.data && backend.data.version) || null;
      const local = boms.find(b => b.id === id)?.version;
      if (backendVersion && local && backendVersion !== local) {
        throw Object.assign(new Error('Data Outdated: Please refresh before saving.'), { code: 'VERSION_MISMATCH' });
      }
      const merged = { ...(boms.find(b => b.id === id) || {}), ...updatedData } as BOM;
      if (!validateBOMShape(merged)) throw Object.assign(new Error('Invalid BOM shape'), { code: 'SCHEMA_VALIDATION' });
      await BackendService.update('boms', id, merged);
      setLastSyncTime(new Date().toISOString());
    } catch (err: any) {
      setBOMs(prev);
      const m = (err && (err.serverMessage || err.message)) || 'Update BOM failed';
      setConnectionError(m.toString());
      if (err && err.code === 'VERSION_MISMATCH') {
        toast.error('Data Outdated: Please refresh before saving.');
      } else {
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      }
    } finally {
      // cleanup
    }
  };

  const deleteBOM = (id: string) => {
    const prev = boms;
    setBOMs(boms.filter(b => b.id !== id));
    (async () => {
      try {
        await BackendService.remove('boms', id);
        setLastSyncTime(new Date().toISOString());
      } catch (err: any) {
        setBOMs(prev);
        const m = (err && (err.serverMessage || err.message)) || 'Delete BOM failed';
        setConnectionError(m.toString());
        toast.error(`${err?.code || 'ERROR'}: ${m}`);
      } finally {
        // no-op
      }
    })();
  };

  // Fetch initial MDM registry from backend
  async function fetchInitialData() {
    try {
      setConnectionError(null);
      const data = await BackendService.getAll();
      if (data && Array.isArray(data.entities)) {
        // Simple mapping: if backend returned arrays we map to places we can
        // Here we map entity list to BOMs as a placeholder for registry data
        setBOMs(data.entities as any[]);
      }
      return true;
    } catch (err: any) {
      const m = (err && (err.serverMessage || err.message)) || 'Unable to reach backend';
      setConnectionError(m.toString());
      toast.error(m.toString());
      return false;
    }
  }

  // Commit a delta for a single entity
  async function commitChanges(entityId: string, delta: any) {
    if (connectionError) {
      toast.error('Backend Unreachable');
      return false;
    }
    setIsSyncing(true);
    try {
      const res = await BackendService.updateEntity(entityId, delta);
      setLastSyncTime(new Date().toISOString());
      setConnectionError(null);
      toast.success('Saved');
      return res;
    } catch (err: any) {
      const m = (err && (err.serverMessage || err.message)) || 'Save failed';
      setConnectionError(m.toString());
      toast.error(m.toString());
      return false;
    } finally {
      setIsSyncing(false);
    }
  }

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
        isSyncing,
        lastSyncTime,
        connectionError,
        fetchInitialData,
        commitChanges,
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

// backward-compatible alias: some modules expect `useDataContext`
export const useDataContext = useData;
