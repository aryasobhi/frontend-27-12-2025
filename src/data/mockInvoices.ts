// Mock Invoice Data
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  paymentTerms: string;
  notes?: string;
  items: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    method: 'bank-transfer' | 'check' | 'credit-card' | 'cash';
    reference: string;
  }[];
}

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-1245',
    customer: 'Green Valley Distributors',
    customerEmail: 'accounts@greenvalley.com',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    status: 'paid',
    subtotal: 12450.00,
    tax: 1245.00,
    discount: 500.00,
    total: 13195.00,
    amountPaid: 13195.00,
    amountDue: 0,
    paymentTerms: 'Net 30',
    notes: 'Thank you for your business!',
    items: [
      {
        id: 'item-001',
        description: 'Premium Wheat Bread - 500 loaves',
        quantity: 500,
        unitPrice: 4.99,
        total: 2495.00,
      },
      {
        id: 'item-002',
        description: 'Artisan Sourdough - 300 loaves',
        quantity: 300,
        unitPrice: 7.99,
        total: 2397.00,
      },
      {
        id: 'item-003',
        description: 'Chocolate Chip Cookies - 800 packs',
        quantity: 800,
        unitPrice: 6.49,
        total: 5192.00,
      },
      {
        id: 'item-004',
        description: 'Croissant Premium - 600 pieces',
        quantity: 600,
        unitPrice: 3.99,
        total: 2394.00,
      },
    ],
    paymentHistory: [
      {
        id: 'pay-001',
        date: '2024-12-10',
        amount: 13195.00,
        method: 'bank-transfer',
        reference: 'TRX-456789',
      },
    ],
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-1246',
    customer: 'Fresh Market Co.',
    customerEmail: 'billing@freshmarket.com',
    issueDate: '2024-12-05',
    dueDate: '2025-01-04',
    status: 'sent',
    subtotal: 8750.00,
    tax: 875.00,
    discount: 0,
    total: 9625.00,
    amountPaid: 0,
    amountDue: 9625.00,
    paymentTerms: 'Net 30',
    items: [
      {
        id: 'item-005',
        description: 'Premium Wheat Bread - 350 loaves',
        quantity: 350,
        unitPrice: 4.99,
        total: 1746.50,
      },
      {
        id: 'item-006',
        description: 'Multigrain Bagels - 500 packs',
        quantity: 500,
        unitPrice: 5.99,
        total: 2995.00,
      },
      {
        id: 'item-007',
        description: 'Croissant Premium - 1000 pieces',
        quantity: 1000,
        unitPrice: 3.99,
        total: 3990.00,
      },
    ],
    paymentHistory: [],
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-1247',
    customer: 'Downtown Cafe Chain',
    customerEmail: 'robert.williams@downtowncafe.com',
    issueDate: '2024-11-20',
    dueDate: '2024-12-20',
    status: 'overdue',
    subtotal: 15600.00,
    tax: 1560.00,
    discount: 780.00,
    total: 16380.00,
    amountPaid: 10000.00,
    amountDue: 6380.00,
    paymentTerms: 'Net 30',
    notes: 'Partial payment received. Remainder overdue.',
    items: [
      {
        id: 'item-008',
        description: 'Artisan Sourdough - 600 loaves',
        quantity: 600,
        unitPrice: 7.99,
        total: 4794.00,
      },
      {
        id: 'item-009',
        description: 'Croissant Premium - 1500 pieces',
        quantity: 1500,
        unitPrice: 3.99,
        total: 5985.00,
      },
      {
        id: 'item-010',
        description: 'Chocolate Chip Cookies - 750 packs',
        quantity: 750,
        unitPrice: 6.49,
        total: 4867.50,
      },
    ],
    paymentHistory: [
      {
        id: 'pay-002',
        date: '2024-12-05',
        amount: 10000.00,
        method: 'bank-transfer',
        reference: 'TRX-789012',
      },
    ],
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2024-1248',
    customer: 'Organic Foods Ltd.',
    customerEmail: 'finance@organicfoods.com',
    issueDate: '2024-12-10',
    dueDate: '2025-01-09',
    status: 'sent',
    subtotal: 6840.00,
    tax: 684.00,
    discount: 200.00,
    total: 7324.00,
    amountPaid: 0,
    amountDue: 7324.00,
    paymentTerms: 'Net 30',
    items: [
      {
        id: 'item-011',
        description: 'Premium Wheat Bread - 400 loaves',
        quantity: 400,
        unitPrice: 4.99,
        total: 1996.00,
      },
      {
        id: 'item-012',
        description: 'Multigrain Bagels - 400 packs',
        quantity: 400,
        unitPrice: 5.99,
        total: 2396.00,
      },
      {
        id: 'item-013',
        description: 'Artisan Sourdough - 300 loaves',
        quantity: 300,
        unitPrice: 7.99,
        total: 2397.00,
      },
    ],
    paymentHistory: [],
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2024-1249',
    customer: 'City Retailers Group',
    customerEmail: 'accounts@cityretailers.com',
    issueDate: '2024-12-12',
    dueDate: '2025-01-11',
    status: 'draft',
    subtotal: 11250.00,
    tax: 1125.00,
    discount: 0,
    total: 12375.00,
    amountPaid: 0,
    amountDue: 12375.00,
    paymentTerms: 'Net 30',
    notes: 'Draft - awaiting approval before sending',
    items: [
      {
        id: 'item-014',
        description: 'Premium Wheat Bread - 600 loaves',
        quantity: 600,
        unitPrice: 4.99,
        total: 2994.00,
      },
      {
        id: 'item-015',
        description: 'Chocolate Chip Cookies - 900 packs',
        quantity: 900,
        unitPrice: 6.49,
        total: 5841.00,
      },
      {
        id: 'item-016',
        description: 'Croissant Premium - 600 pieces',
        quantity: 600,
        unitPrice: 3.99,
        total: 2394.00,
      },
    ],
    paymentHistory: [],
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2024-1250',
    customer: 'Healthy Eats Supermarket',
    customerEmail: 'jennifer.lee@healthyeats.com',
    issueDate: '2024-12-08',
    dueDate: '2025-01-07',
    status: 'sent',
    subtotal: 9420.00,
    tax: 942.00,
    discount: 450.00,
    total: 9912.00,
    amountPaid: 0,
    amountDue: 9912.00,
    paymentTerms: 'Net 30',
    items: [
      {
        id: 'item-017',
        description: 'Multigrain Bagels - 600 packs',
        quantity: 600,
        unitPrice: 5.99,
        total: 3594.00,
      },
      {
        id: 'item-018',
        description: 'Premium Wheat Bread - 500 loaves',
        quantity: 500,
        unitPrice: 4.99,
        total: 2495.00,
      },
      {
        id: 'item-019',
        description: 'Artisan Sourdough - 400 loaves',
        quantity: 400,
        unitPrice: 7.99,
        total: 3196.00,
      },
    ],
    paymentHistory: [],
  },
];

export const invoiceStats = {
  totalRevenue: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
  totalPaid: mockInvoices.reduce((sum, inv) => sum + inv.amountPaid, 0),
  totalOutstanding: mockInvoices.reduce((sum, inv) => sum + inv.amountDue, 0),
  overdueAmount: mockInvoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amountDue, 0),
  draftCount: mockInvoices.filter(inv => inv.status === 'draft').length,
  sentCount: mockInvoices.filter(inv => inv.status === 'sent').length,
  paidCount: mockInvoices.filter(inv => inv.status === 'paid').length,
  overdueCount: mockInvoices.filter(inv => inv.status === 'overdue').length,
};
