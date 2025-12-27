// Mock Product Data with detailed information
export interface ProductDetail {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  status: 'active' | 'discontinued';
  description: string;
  barcode: string;
  unit: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  manufacturer: string;
  brand: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  // Recipe & BOM
  recipe?: {
    id: string;
    name: string;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
  };
  bom?: {
    id: string;
    components: { 
      id: string;
      name: string; 
      quantity: number; 
      unit: string; 
      cost: number;
      supplier: string;
    }[];
    totalCost: number;
    version: string;
  };
  // Associated machines
  machines: {
    id: string;
    name: string;
    role: string;
    runtime: number;
  }[];
  // Operators
  operators: {
    id: string;
    name: string;
    skill: string;
    shift: string;
  }[];
  // Stock across warehouses
  stockByWarehouse: {
    warehouseId: string;
    warehouseName: string;
    quantity: number;
    reserved: number;
    available: number;
  }[];
}

export const mockProducts: ProductDetail[] = [
  {
    id: 'prod-001',
    name: 'Premium Wheat Bread',
    sku: 'BRD-WHT-001',
    category: 'Bakery',
    price: 4.99,
    cost: 2.50,
    stock: 450,
    reorderPoint: 100,
    status: 'active',
    description: 'Fresh baked premium wheat bread made with organic ingredients. Perfect for sandwiches and toast.',
    barcode: '8901234567890',
    unit: 'loaf',
    weight: 0.5,
    dimensions: { length: 25, width: 12, height: 10 },
    manufacturer: 'Fresh Bakery Co.',
    brand: 'GoldenGrain',
    images: ['/products/wheat-bread-1.jpg', '/products/wheat-bread-2.jpg'],
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10',
    recipe: {
      id: 'rec-001',
      name: 'Premium Wheat Bread Recipe',
      ingredients: [
        { name: 'Wheat Flour', quantity: 500, unit: 'g' },
        { name: 'Water', quantity: 300, unit: 'ml' },
        { name: 'Yeast', quantity: 10, unit: 'g' },
        { name: 'Salt', quantity: 10, unit: 'g' },
        { name: 'Sugar', quantity: 20, unit: 'g' },
        { name: 'Butter', quantity: 30, unit: 'g' },
      ],
      instructions: [
        'Mix flour, yeast, sugar in a large bowl',
        'Add water gradually and knead for 10 minutes',
        'Let the dough rise for 1 hour',
        'Shape into loaf and place in pan',
        'Let rise for another 30 minutes',
        'Bake at 180°C for 35-40 minutes',
      ],
      prepTime: 20,
      cookTime: 40,
    },
    bom: {
      id: 'bom-001',
      components: [
        { id: 'mat-001', name: 'Wheat Flour Premium', quantity: 0.5, unit: 'kg', cost: 0.80, supplier: 'Grain Masters Inc.' },
        { id: 'mat-002', name: 'Active Dry Yeast', quantity: 10, unit: 'g', cost: 0.15, supplier: 'Baking Essentials Ltd.' },
        { id: 'mat-003', name: 'Fine Sea Salt', quantity: 10, unit: 'g', cost: 0.05, supplier: 'Salt Co.' },
        { id: 'mat-004', name: 'Organic Sugar', quantity: 20, unit: 'g', cost: 0.10, supplier: 'Sweet Suppliers' },
        { id: 'mat-005', name: 'Unsalted Butter', quantity: 30, unit: 'g', cost: 0.40, supplier: 'Dairy Fresh Co.' },
      ],
      totalCost: 1.50,
      version: 'v2.1',
    },
    machines: [
      { id: 'mach-001', name: 'Industrial Mixer M-500', role: 'Mixing', runtime: 12 },
      { id: 'mach-002', name: 'Dough Proofer P-300', role: 'Proofing', runtime: 90 },
      { id: 'mach-003', name: 'Convection Oven O-800', role: 'Baking', runtime: 40 },
    ],
    operators: [
      { id: 'emp-012', name: 'Maria Santos', skill: 'Master Baker', shift: 'Morning' },
      { id: 'emp-023', name: 'John Chen', skill: 'Baker Assistant', shift: 'Morning' },
    ],
    stockByWarehouse: [
      { warehouseId: 'wh-001', warehouseName: 'Main Warehouse', quantity: 300, reserved: 50, available: 250 },
      { warehouseId: 'wh-002', warehouseName: 'Distribution Center A', quantity: 150, reserved: 20, available: 130 },
    ],
  },
  {
    id: 'prod-002',
    name: 'Artisan Sourdough',
    sku: 'BRD-SOU-002',
    category: 'Bakery',
    price: 7.99,
    cost: 3.80,
    stock: 280,
    reorderPoint: 80,
    status: 'active',
    description: 'Traditional sourdough bread with a crispy crust and tangy flavor. Made with our 100-year-old starter.',
    barcode: '8901234567891',
    unit: 'loaf',
    weight: 0.65,
    dimensions: { length: 30, width: 15, height: 12 },
    manufacturer: 'Fresh Bakery Co.',
    brand: 'Artisan Collection',
    images: ['/products/sourdough-1.jpg'],
    createdAt: '2024-02-01',
    updatedAt: '2024-12-11',
    recipe: {
      id: 'rec-002',
      name: 'Artisan Sourdough Recipe',
      ingredients: [
        { name: 'Bread Flour', quantity: 600, unit: 'g' },
        { name: 'Sourdough Starter', quantity: 200, unit: 'g' },
        { name: 'Water', quantity: 400, unit: 'ml' },
        { name: 'Salt', quantity: 12, unit: 'g' },
      ],
      instructions: [
        'Mix starter with water until well combined',
        'Add flour and salt, mix until no dry flour remains',
        'Perform stretch and fold every 30 minutes for 2 hours',
        'Bulk fermentation for 4-6 hours',
        'Shape into boule and place in banneton',
        'Cold proof in refrigerator for 12-18 hours',
        'Score and bake at 230°C for 45 minutes',
      ],
      prepTime: 30,
      cookTime: 45,
    },
    bom: {
      id: 'bom-002',
      components: [
        { id: 'mat-006', name: 'Organic Bread Flour', quantity: 0.6, unit: 'kg', cost: 1.20, supplier: 'Grain Masters Inc.' },
        { id: 'mat-007', name: 'Sourdough Starter', quantity: 0.2, unit: 'kg', cost: 1.50, supplier: 'In-house' },
        { id: 'mat-003', name: 'Fine Sea Salt', quantity: 12, unit: 'g', cost: 0.06, supplier: 'Salt Co.' },
      ],
      totalCost: 2.76,
      version: 'v1.5',
    },
    machines: [
      { id: 'mach-001', name: 'Industrial Mixer M-500', role: 'Mixing', runtime: 15 },
      { id: 'mach-004', name: 'Retarder Proofer RP-200', role: 'Cold Proofing', runtime: 720 },
      { id: 'mach-005', name: 'Steam Deck Oven SD-600', role: 'Baking', runtime: 45 },
    ],
    operators: [
      { id: 'emp-012', name: 'Maria Santos', skill: 'Master Baker', shift: 'Night' },
      { id: 'emp-034', name: 'Pierre Dubois', skill: 'Sourdough Specialist', shift: 'Night' },
    ],
    stockByWarehouse: [
      { warehouseId: 'wh-001', warehouseName: 'Main Warehouse', quantity: 180, reserved: 30, available: 150 },
      { warehouseId: 'wh-002', warehouseName: 'Distribution Center A', quantity: 100, reserved: 15, available: 85 },
    ],
  },
  {
    id: 'prod-003',
    name: 'Chocolate Chip Cookies',
    sku: 'CKI-CHC-003',
    category: 'Cookies',
    price: 6.49,
    cost: 2.80,
    stock: 620,
    reorderPoint: 150,
    status: 'active',
    description: 'Classic chocolate chip cookies with premium Belgian chocolate chips. Soft and chewy texture.',
    barcode: '8901234567892',
    unit: 'pack',
    weight: 0.3,
    dimensions: { length: 20, width: 15, height: 5 },
    manufacturer: 'Fresh Bakery Co.',
    brand: 'Sweet Treats',
    images: ['/products/cookies-1.jpg'],
    createdAt: '2024-03-10',
    updatedAt: '2024-12-12',
    machines: [
      { id: 'mach-001', name: 'Industrial Mixer M-500', role: 'Mixing', runtime: 8 },
      { id: 'mach-006', name: 'Cookie Depositor CD-100', role: 'Forming', runtime: 5 },
      { id: 'mach-003', name: 'Convection Oven O-800', role: 'Baking', runtime: 12 },
    ],
    operators: [
      { id: 'emp-045', name: 'Sarah Johnson', skill: 'Pastry Chef', shift: 'Morning' },
    ],
    stockByWarehouse: [
      { warehouseId: 'wh-001', warehouseName: 'Main Warehouse', quantity: 420, reserved: 80, available: 340 },
      { warehouseId: 'wh-002', warehouseName: 'Distribution Center A', quantity: 200, reserved: 40, available: 160 },
    ],
  },
  {
    id: 'prod-004',
    name: 'Croissant Premium',
    sku: 'PST-CRS-004',
    category: 'Pastry',
    price: 3.99,
    cost: 1.90,
    stock: 340,
    reorderPoint: 120,
    status: 'active',
    description: 'Buttery, flaky French croissant made with 100% butter and traditional lamination technique.',
    barcode: '8901234567893',
    unit: 'piece',
    weight: 0.08,
    dimensions: { length: 15, width: 8, height: 6 },
    manufacturer: 'Fresh Bakery Co.',
    brand: 'French Collection',
    images: ['/products/croissant-1.jpg'],
    createdAt: '2024-04-05',
    updatedAt: '2024-12-13',
    machines: [
      { id: 'mach-001', name: 'Industrial Mixer M-500', role: 'Mixing', runtime: 10 },
      { id: 'mach-007', name: 'Laminator L-400', role: 'Laminating', runtime: 60 },
      { id: 'mach-002', name: 'Dough Proofer P-300', role: 'Proofing', runtime: 120 },
      { id: 'mach-003', name: 'Convection Oven O-800', role: 'Baking', runtime: 18 },
    ],
    operators: [
      { id: 'emp-034', name: 'Pierre Dubois', skill: 'Sourdough Specialist', shift: 'Morning' },
      { id: 'emp-056', name: 'Claire Martin', skill: 'Viennoiserie Expert', shift: 'Morning' },
    ],
    stockByWarehouse: [
      { warehouseId: 'wh-001', warehouseName: 'Main Warehouse', quantity: 240, reserved: 60, available: 180 },
      { warehouseId: 'wh-002', warehouseName: 'Distribution Center A', quantity: 100, reserved: 25, available: 75 },
    ],
  },
  {
    id: 'prod-005',
    name: 'Multigrain Bagels',
    sku: 'BGL-MLT-005',
    category: 'Bagels',
    price: 5.99,
    cost: 2.20,
    stock: 180,
    reorderPoint: 60,
    status: 'active',
    description: 'Hearty multigrain bagels with seeds and grains. Boiled and baked to perfection.',
    barcode: '8901234567894',
    unit: 'pack',
    weight: 0.4,
    dimensions: { length: 18, width: 18, height: 8 },
    manufacturer: 'Fresh Bakery Co.',
    brand: 'GoldenGrain',
    images: ['/products/bagels-1.jpg'],
    createdAt: '2024-05-20',
    updatedAt: '2024-12-09',
    machines: [
      { id: 'mach-001', name: 'Industrial Mixer M-500', role: 'Mixing', runtime: 10 },
      { id: 'mach-008', name: 'Bagel Former BF-50', role: 'Shaping', runtime: 8 },
      { id: 'mach-009', name: 'Bagel Boiler BB-100', role: 'Boiling', runtime: 3 },
      { id: 'mach-003', name: 'Convection Oven O-800', role: 'Baking', runtime: 22 },
    ],
    operators: [
      { id: 'emp-023', name: 'John Chen', skill: 'Baker Assistant', shift: 'Morning' },
    ],
    stockByWarehouse: [
      { warehouseId: 'wh-001', warehouseName: 'Main Warehouse', quantity: 120, reserved: 20, available: 100 },
      { warehouseId: 'wh-002', warehouseName: 'Distribution Center A', quantity: 60, reserved: 10, available: 50 },
    ],
  },
];
