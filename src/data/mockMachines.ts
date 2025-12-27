// Mock Machine Data with detailed information
export interface MachineDetail {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  uptime: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  currentJob?: string;
  manufacturer: string;
  installDate: string;
  model: string;
  serialNumber: string;
  capacity: string;
  powerRating: string;
  // Health metrics
  health: {
    overall: number;
    temperature: number;
    vibration: number;
    pressure: number;
    runtime: number;
  };
  // Maintenance history
  maintenanceHistory: {
    id: string;
    date: string;
    type: 'preventive' | 'corrective' | 'breakdown';
    description: string;
    technician: string;
    cost: number;
    downtime: number;
    status: 'completed' | 'scheduled' | 'in-progress';
  }[];
  // Parts & components
  parts: {
    id: string;
    name: string;
    partNumber: string;
    quantity: number;
    condition: 'good' | 'fair' | 'replace-soon' | 'critical';
    lastReplaced: string;
    supplier: string;
  }[];
  // Linked products
  linkedProducts: {
    productId: string;
    productName: string;
    role: string;
    averageRuntime: number;
  }[];
  // Performance metrics
  performance: {
    date: string;
    uptime: number;
    efficiency: number;
    output: number;
    defects: number;
  }[];
  // Operators
  operators: {
    id: string;
    name: string;
    certification: string;
    lastTrained: string;
  }[];
}

export const mockMachines: MachineDetail[] = [
  {
    id: 'mach-001',
    name: 'Industrial Mixer M-500',
    code: 'MIX-001',
    type: 'Mixer',
    location: 'Production Floor A - Zone 1',
    status: 'operational',
    uptime: 94.5,
    efficiency: 89.2,
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-02-15',
    currentJob: 'Mixing dough for Premium Wheat Bread',
    manufacturer: 'BakeMaster Industries',
    installDate: '2022-03-15',
    model: 'BM-M500-PRO',
    serialNumber: 'BM500-2022-0315',
    capacity: '500 kg/batch',
    powerRating: '15 kW',
    health: {
      overall: 92,
      temperature: 45,
      vibration: 2.3,
      pressure: 85,
      runtime: 1240,
    },
    maintenanceHistory: [
      {
        id: 'maint-001',
        date: '2024-11-15',
        type: 'preventive',
        description: 'Quarterly maintenance - lubrication, belt inspection, motor check',
        technician: 'Mike Johnson',
        cost: 450,
        downtime: 4,
        status: 'completed',
      },
      {
        id: 'maint-002',
        date: '2024-08-10',
        type: 'preventive',
        description: 'Quarterly maintenance and calibration',
        technician: 'Mike Johnson',
        cost: 420,
        downtime: 3.5,
        status: 'completed',
      },
      {
        id: 'maint-003',
        date: '2024-06-22',
        type: 'corrective',
        description: 'Replaced worn drive belt',
        technician: 'Sarah Williams',
        cost: 280,
        downtime: 6,
        status: 'completed',
      },
      {
        id: 'maint-004',
        date: '2025-02-15',
        type: 'preventive',
        description: 'Scheduled quarterly maintenance',
        technician: 'Mike Johnson',
        cost: 0,
        downtime: 0,
        status: 'scheduled',
      },
    ],
    parts: [
      {
        id: 'part-001',
        name: 'Drive Belt Type A',
        partNumber: 'BM-BELT-500A',
        quantity: 2,
        condition: 'good',
        lastReplaced: '2024-06-22',
        supplier: 'Industrial Parts Co.',
      },
      {
        id: 'part-002',
        name: 'Mixing Blade Set',
        partNumber: 'BM-BLADE-500',
        quantity: 1,
        condition: 'fair',
        lastReplaced: '2023-09-10',
        supplier: 'BakeMaster Industries',
      },
      {
        id: 'part-003',
        name: 'Motor Bearing Kit',
        partNumber: 'BM-BEAR-500K',
        quantity: 4,
        condition: 'good',
        lastReplaced: '2024-11-15',
        supplier: 'Industrial Parts Co.',
      },
      {
        id: 'part-004',
        name: 'Control Panel Display',
        partNumber: 'BM-DISP-500',
        quantity: 1,
        condition: 'replace-soon',
        lastReplaced: '2022-03-15',
        supplier: 'BakeMaster Industries',
      },
    ],
    linkedProducts: [
      { productId: 'prod-001', productName: 'Premium Wheat Bread', role: 'Mixing', averageRuntime: 12 },
      { productId: 'prod-002', productName: 'Artisan Sourdough', role: 'Mixing', averageRuntime: 15 },
      { productId: 'prod-003', productName: 'Chocolate Chip Cookies', role: 'Mixing', averageRuntime: 8 },
      { productId: 'prod-004', productName: 'Croissant Premium', role: 'Mixing', averageRuntime: 10 },
      { productId: 'prod-005', productName: 'Multigrain Bagels', role: 'Mixing', averageRuntime: 10 },
    ],
    performance: [
      { date: '2024-12-13', uptime: 95, efficiency: 91, output: 2400, defects: 12 },
      { date: '2024-12-12', uptime: 94, efficiency: 89, output: 2350, defects: 15 },
      { date: '2024-12-11', uptime: 96, efficiency: 92, output: 2480, defects: 8 },
      { date: '2024-12-10', uptime: 93, efficiency: 88, output: 2300, defects: 18 },
      { date: '2024-12-09', uptime: 95, efficiency: 90, output: 2420, defects: 10 },
    ],
    operators: [
      { id: 'emp-012', name: 'Maria Santos', certification: 'Industrial Mixer Level 3', lastTrained: '2024-06-01' },
      { id: 'emp-023', name: 'John Chen', certification: 'Industrial Mixer Level 2', lastTrained: '2024-03-15' },
      { id: 'emp-034', name: 'Pierre Dubois', certification: 'Industrial Mixer Level 3', lastTrained: '2024-07-20' },
    ],
  },
  {
    id: 'mach-002',
    name: 'Dough Proofer P-300',
    code: 'PRF-001',
    type: 'Proofer',
    location: 'Production Floor A - Zone 2',
    status: 'operational',
    uptime: 97.2,
    efficiency: 93.5,
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    manufacturer: 'ProofTech Systems',
    installDate: '2021-08-10',
    model: 'PT-P300-DLX',
    serialNumber: 'PT300-2021-0810',
    capacity: '300 loaves/cycle',
    powerRating: '8 kW',
    health: {
      overall: 95,
      temperature: 38,
      vibration: 0.8,
      pressure: 92,
      runtime: 980,
    },
    maintenanceHistory: [
      {
        id: 'maint-005',
        date: '2024-10-20',
        type: 'preventive',
        description: 'Humidity sensor calibration and cleaning',
        technician: 'David Lee',
        cost: 320,
        downtime: 2,
        status: 'completed',
      },
      {
        id: 'maint-006',
        date: '2024-07-15',
        type: 'preventive',
        description: 'Temperature control system check',
        technician: 'David Lee',
        cost: 280,
        downtime: 1.5,
        status: 'completed',
      },
      {
        id: 'maint-007',
        date: '2025-01-20',
        type: 'preventive',
        description: 'Scheduled quarterly maintenance',
        technician: 'David Lee',
        cost: 0,
        downtime: 0,
        status: 'scheduled',
      },
    ],
    parts: [
      {
        id: 'part-005',
        name: 'Humidity Sensor',
        partNumber: 'PT-HUM-300',
        quantity: 2,
        condition: 'good',
        lastReplaced: '2024-10-20',
        supplier: 'ProofTech Systems',
      },
      {
        id: 'part-006',
        name: 'Heating Element',
        partNumber: 'PT-HEAT-300',
        quantity: 3,
        condition: 'good',
        lastReplaced: '2023-12-05',
        supplier: 'Industrial Parts Co.',
      },
      {
        id: 'part-007',
        name: 'Fan Motor Assembly',
        partNumber: 'PT-FAN-300M',
        quantity: 2,
        condition: 'fair',
        lastReplaced: '2023-04-18',
        supplier: 'ProofTech Systems',
      },
    ],
    linkedProducts: [
      { productId: 'prod-001', productName: 'Premium Wheat Bread', role: 'Proofing', averageRuntime: 90 },
      { productId: 'prod-004', productName: 'Croissant Premium', role: 'Proofing', averageRuntime: 120 },
    ],
    performance: [
      { date: '2024-12-13', uptime: 98, efficiency: 94, output: 1800, defects: 5 },
      { date: '2024-12-12', uptime: 97, efficiency: 93, output: 1750, defects: 8 },
      { date: '2024-12-11', uptime: 97, efficiency: 95, output: 1820, defects: 3 },
      { date: '2024-12-10', uptime: 96, efficiency: 92, output: 1700, defects: 10 },
      { date: '2024-12-09', uptime: 98, efficiency: 94, output: 1800, defects: 6 },
    ],
    operators: [
      { id: 'emp-012', name: 'Maria Santos', certification: 'Proofing Systems Advanced', lastTrained: '2024-05-10' },
      { id: 'emp-056', name: 'Claire Martin', certification: 'Proofing Systems Advanced', lastTrained: '2024-08-22' },
    ],
  },
  {
    id: 'mach-003',
    name: 'Convection Oven O-800',
    code: 'OVN-001',
    type: 'Oven',
    location: 'Production Floor A - Zone 3',
    status: 'operational',
    uptime: 91.8,
    efficiency: 87.3,
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-03-01',
    manufacturer: 'BakeRight Equipment',
    installDate: '2020-05-22',
    model: 'BR-O800-CONV',
    serialNumber: 'BR800-2020-0522',
    capacity: '800 loaves/hour',
    powerRating: '45 kW',
    health: {
      overall: 88,
      temperature: 220,
      vibration: 1.2,
      pressure: 88,
      runtime: 1560,
    },
    maintenanceHistory: [
      {
        id: 'maint-008',
        date: '2024-12-01',
        type: 'preventive',
        description: 'Burner inspection and cleaning, thermostat calibration',
        technician: 'Mike Johnson',
        cost: 680,
        downtime: 8,
        status: 'completed',
      },
      {
        id: 'maint-009',
        date: '2024-09-10',
        type: 'corrective',
        description: 'Replaced faulty temperature sensor',
        technician: 'Sarah Williams',
        cost: 420,
        downtime: 12,
        status: 'completed',
      },
      {
        id: 'maint-010',
        date: '2024-06-05',
        type: 'preventive',
        description: 'Quarterly cleaning and maintenance',
        technician: 'Mike Johnson',
        cost: 550,
        downtime: 6,
        status: 'completed',
      },
      {
        id: 'maint-011',
        date: '2025-03-01',
        type: 'preventive',
        description: 'Scheduled quarterly maintenance',
        technician: 'Mike Johnson',
        cost: 0,
        downtime: 0,
        status: 'scheduled',
      },
    ],
    parts: [
      {
        id: 'part-008',
        name: 'Temperature Sensor Array',
        partNumber: 'BR-TEMP-800A',
        quantity: 4,
        condition: 'good',
        lastReplaced: '2024-09-10',
        supplier: 'BakeRight Equipment',
      },
      {
        id: 'part-009',
        name: 'Gas Burner Assembly',
        partNumber: 'BR-BURN-800',
        quantity: 2,
        condition: 'fair',
        lastReplaced: '2023-02-14',
        supplier: 'BakeRight Equipment',
      },
      {
        id: 'part-010',
        name: 'Convection Fan Blade',
        partNumber: 'BR-FAN-800B',
        quantity: 3,
        condition: 'replace-soon',
        lastReplaced: '2022-11-20',
        supplier: 'Industrial Parts Co.',
      },
      {
        id: 'part-011',
        name: 'Door Seal Gasket',
        partNumber: 'BR-SEAL-800',
        quantity: 2,
        condition: 'critical',
        lastReplaced: '2021-08-30',
        supplier: 'BakeRight Equipment',
      },
    ],
    linkedProducts: [
      { productId: 'prod-001', productName: 'Premium Wheat Bread', role: 'Baking', averageRuntime: 40 },
      { productId: 'prod-003', productName: 'Chocolate Chip Cookies', role: 'Baking', averageRuntime: 12 },
      { productId: 'prod-004', productName: 'Croissant Premium', role: 'Baking', averageRuntime: 18 },
      { productId: 'prod-005', productName: 'Multigrain Bagels', role: 'Baking', averageRuntime: 22 },
    ],
    performance: [
      { date: '2024-12-13', uptime: 92, efficiency: 88, output: 3200, defects: 45 },
      { date: '2024-12-12', uptime: 91, efficiency: 86, output: 3100, defects: 52 },
      { date: '2024-12-11', uptime: 93, efficiency: 89, output: 3350, defects: 38 },
      { date: '2024-12-10', uptime: 90, efficiency: 85, output: 3000, defects: 60 },
      { date: '2024-12-09', uptime: 92, efficiency: 87, output: 3180, defects: 48 },
    ],
    operators: [
      { id: 'emp-012', name: 'Maria Santos', certification: 'Oven Operations Master', lastTrained: '2024-04-12' },
      { id: 'emp-023', name: 'John Chen', certification: 'Oven Operations Level 2', lastTrained: '2024-06-08' },
      { id: 'emp-045', name: 'Sarah Johnson', certification: 'Oven Operations Advanced', lastTrained: '2024-09-15' },
    ],
  },
  {
    id: 'mach-004',
    name: 'Retarder Proofer RP-200',
    code: 'RTP-001',
    type: 'Retarder Proofer',
    location: 'Production Floor B - Zone 1',
    status: 'maintenance',
    uptime: 85.3,
    efficiency: 82.1,
    lastMaintenance: '2024-12-10',
    nextMaintenance: '2025-01-10',
    manufacturer: 'ColdProof Systems',
    installDate: '2023-01-18',
    model: 'CP-RP200-PRO',
    serialNumber: 'CP200-2023-0118',
    capacity: '200 units/cycle',
    powerRating: '12 kW',
    health: {
      overall: 78,
      temperature: 4,
      vibration: 1.5,
      pressure: 76,
      runtime: 720,
    },
    maintenanceHistory: [
      {
        id: 'maint-012',
        date: '2024-12-10',
        type: 'corrective',
        description: 'Refrigeration compressor repair - ongoing',
        technician: 'David Lee',
        cost: 1200,
        downtime: 24,
        status: 'in-progress',
      },
      {
        id: 'maint-013',
        date: '2024-09-20',
        type: 'preventive',
        description: 'Refrigeration system check and coolant top-up',
        technician: 'David Lee',
        cost: 380,
        downtime: 3,
        status: 'completed',
      },
    ],
    parts: [
      {
        id: 'part-012',
        name: 'Compressor Unit',
        partNumber: 'CP-COMP-200',
        quantity: 1,
        condition: 'critical',
        lastReplaced: '2023-01-18',
        supplier: 'ColdProof Systems',
      },
      {
        id: 'part-013',
        name: 'Temperature Controller',
        partNumber: 'CP-CTRL-200T',
        quantity: 1,
        condition: 'good',
        lastReplaced: '2024-09-20',
        supplier: 'ColdProof Systems',
      },
    ],
    linkedProducts: [
      { productId: 'prod-002', productName: 'Artisan Sourdough', role: 'Cold Proofing', averageRuntime: 720 },
    ],
    performance: [
      { date: '2024-12-09', uptime: 80, efficiency: 78, output: 800, defects: 28 },
      { date: '2024-12-08', uptime: 85, efficiency: 82, output: 850, defects: 22 },
      { date: '2024-12-07', uptime: 87, efficiency: 84, output: 920, defects: 18 },
    ],
    operators: [
      { id: 'emp-034', name: 'Pierre Dubois', certification: 'Retarder Proofer Specialist', lastTrained: '2024-02-28' },
    ],
  },
  {
    id: 'mach-005',
    name: 'Steam Deck Oven SD-600',
    code: 'STO-001',
    type: 'Steam Oven',
    location: 'Production Floor B - Zone 2',
    status: 'operational',
    uptime: 96.5,
    efficiency: 94.8,
    lastMaintenance: '2024-11-25',
    nextMaintenance: '2025-02-25',
    manufacturer: 'SteamBake Pro',
    installDate: '2023-07-05',
    model: 'SB-SD600-ULTRA',
    serialNumber: 'SB600-2023-0705',
    capacity: '600 loaves/hour',
    powerRating: '38 kW',
    health: {
      overall: 96,
      temperature: 230,
      vibration: 0.9,
      pressure: 95,
      runtime: 680,
    },
    maintenanceHistory: [
      {
        id: 'maint-014',
        date: '2024-11-25',
        type: 'preventive',
        description: 'Steam generator cleaning and descaling',
        technician: 'Mike Johnson',
        cost: 520,
        downtime: 4,
        status: 'completed',
      },
      {
        id: 'maint-015',
        date: '2024-08-22',
        type: 'preventive',
        description: 'Quarterly maintenance and steam system check',
        technician: 'Sarah Williams',
        cost: 480,
        downtime: 3,
        status: 'completed',
      },
    ],
    parts: [
      {
        id: 'part-014',
        name: 'Steam Generator',
        partNumber: 'SB-STEAM-600',
        quantity: 1,
        condition: 'good',
        lastReplaced: '2023-07-05',
        supplier: 'SteamBake Pro',
      },
      {
        id: 'part-015',
        name: 'Water Pump Assembly',
        partNumber: 'SB-PUMP-600W',
        quantity: 2,
        condition: 'good',
        lastReplaced: '2024-11-25',
        supplier: 'SteamBake Pro',
      },
    ],
    linkedProducts: [
      { productId: 'prod-002', productName: 'Artisan Sourdough', role: 'Baking', averageRuntime: 45 },
    ],
    performance: [
      { date: '2024-12-13', uptime: 97, efficiency: 95, output: 2850, defects: 12 },
      { date: '2024-12-12', uptime: 96, efficiency: 94, output: 2800, defects: 15 },
      { date: '2024-12-11', uptime: 98, efficiency: 96, output: 2920, defects: 8 },
      { date: '2024-12-10', uptime: 95, efficiency: 93, output: 2750, defects: 18 },
      { date: '2024-12-09', uptime: 97, efficiency: 95, output: 2880, defects: 10 },
    ],
    operators: [
      { id: 'emp-034', name: 'Pierre Dubois', certification: 'Steam Oven Expert', lastTrained: '2024-07-15' },
    ],
  },
];
