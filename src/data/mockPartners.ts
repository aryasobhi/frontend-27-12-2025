import { Partner } from '../context/DataContext';

export const initialPartners: Partner[] = [
  {
    id: '1',
    name: 'Green Valley Distributors',
    type: 'Distributor',
    contact: '+1 (555) 123-4567',
    email: 'contact@greenvalley.com',
    location: 'Los Angeles, CA',
    status: 'active',
    totalOrders: 245,
    revenue: 125000,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Fresh Market Co.',
    type: 'Retailer',
    contact: '+1 (555) 234-5678',
    email: 'info@freshmarket.com',
    location: 'New York, NY',
    status: 'active',
    totalOrders: 189,
    revenue: 98500,
    rating: 4.6,
  },
];
