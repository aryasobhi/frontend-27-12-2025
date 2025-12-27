import { Customer } from '../context/DataContext';

export const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    company: 'Green Valley Distributors',
    address: '123 Main St',
    city: 'Los Angeles',
    country: 'USA',
    status: 'active',
    totalOrders: 45,
    totalSpent: 125000,
    lastOrder: '2025-11-05',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@freshmarket.com',
    phone: '+1-555-0102',
    company: 'Fresh Market Co.',
    address: '456 Park Ave',
    city: 'New York',
    country: 'USA',
    status: 'active',
    totalOrders: 32,
    totalSpent: 98500,
    lastOrder: '2025-11-03',
  },
];
