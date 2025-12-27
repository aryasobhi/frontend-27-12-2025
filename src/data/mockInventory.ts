import { InventoryItem } from '../context/DataContext';

export const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Wheat Flour',
    sku: 'RAW-001',
    category: 'Raw Materials',
    quantity: 5000,
    unit: 'kg',
    location: 'Warehouse A',
    reorderLevel: 1000,
    lastUpdated: '2025-11-06',
  },
  {
    id: '2',
    name: 'Glass Jars 500ml',
    sku: 'PKG-001',
    category: 'Packaging',
    quantity: 10000,
    unit: 'units',
    location: 'Warehouse B',
    reorderLevel: 2000,
    lastUpdated: '2025-11-05',
  },
];
