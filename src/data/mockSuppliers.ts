import { Supplier } from '../context/DataContext';

export const initialSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Farm Fresh Supplies',
    email: 'contact@farmfresh.com',
    phone: '+1-555-0201',
    company: 'Farm Fresh Supplies Inc.',
    address: '789 Rural Road',
    category: 'Raw Materials',
    status: 'active',
    rating: 4.8,
    totalPurchases: 250000,
  },
  {
    id: '2',
    name: 'PackPro Industries',
    email: 'sales@packpro.com',
    phone: '+1-555-0202',
    company: 'PackPro Industries Ltd.',
    address: '321 Industrial Blvd',
    category: 'Packaging',
    status: 'active',
    rating: 4.6,
    totalPurchases: 180000,
  },
];
