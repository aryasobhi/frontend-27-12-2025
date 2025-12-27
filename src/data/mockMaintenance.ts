// Mock Maintenance Data
export interface MaintenanceRecord {
  id: string;
  recordNumber: string;
  machineId: string;
  machineName: string;
  type: 'preventive' | 'corrective' | 'breakdown' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  description: string;
  workPerformed?: string;
  partsReplaced: {
    partName: string;
    partNumber: string;
    quantity: number;
    cost: number;
  }[];
  laborHours: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  downtime: number;
  nextMaintenanceDate?: string;
  notes?: string;
}

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    recordNumber: 'MNT-2024-1245',
    machineId: 'mach-001',
    machineName: 'Industrial Mixer M-500',
    type: 'preventive',
    priority: 'medium',
    status: 'completed',
    scheduledDate: '2024-11-15',
    completedDate: '2024-11-15',
    technician: 'Mike Johnson',
    description: 'Quarterly preventive maintenance - lubrication, belt inspection, motor check',
    workPerformed: 'Completed full inspection, lubricated all moving parts, checked belt tension, tested motor performance, calibrated mixing speed controls',
    partsReplaced: [
      { partName: 'Motor Bearing Kit', partNumber: 'BM-BEAR-500K', quantity: 4, cost: 120 },
      { partName: 'Lubricant (Industrial Grade)', partNumber: 'LUB-500', quantity: 2, cost: 45 },
    ],
    laborHours: 4,
    laborCost: 280,
    partsCost: 165,
    totalCost: 445,
    downtime: 4,
    nextMaintenanceDate: '2025-02-15',
    notes: 'All systems operating within normal parameters. Belt shows minimal wear, good for another quarter.',
  },
  {
    id: 'maint-002',
    recordNumber: 'MNT-2024-1246',
    machineId: 'mach-003',
    machineName: 'Convection Oven O-800',
    type: 'corrective',
    priority: 'high',
    status: 'completed',
    scheduledDate: '2024-09-10',
    completedDate: '2024-09-10',
    technician: 'Sarah Williams',
    description: 'Temperature sensor malfunction - inconsistent readings causing baking issues',
    workPerformed: 'Diagnosed faulty temperature sensor array, replaced all 4 sensors, recalibrated oven control system, ran test baking cycle',
    partsReplaced: [
      { partName: 'Temperature Sensor Array', partNumber: 'BR-TEMP-800A', quantity: 4, cost: 320 },
      { partName: 'Thermal Paste', partNumber: 'TP-800', quantity: 1, cost: 25 },
    ],
    laborHours: 12,
    laborCost: 840,
    partsCost: 345,
    totalCost: 1185,
    downtime: 12,
    nextMaintenanceDate: '2024-12-10',
    notes: 'Sensors were beyond service life. Temperature now stable within ±2°C tolerance.',
  },
  {
    id: 'maint-003',
    recordNumber: 'MNT-2024-1247',
    machineId: 'mach-004',
    machineName: 'Retarder Proofer RP-200',
    type: 'breakdown',
    priority: 'critical',
    status: 'in-progress',
    scheduledDate: '2024-12-10',
    technician: 'David Lee',
    description: 'Refrigeration compressor failure - unit not maintaining cold temperature',
    workPerformed: 'Compressor diagnostics in progress. Ordering replacement compressor unit.',
    partsReplaced: [],
    laborHours: 8,
    laborCost: 560,
    partsCost: 0,
    totalCost: 560,
    downtime: 24,
    notes: 'Critical repair. Compressor seized. Estimated 2-3 days for part delivery and installation.',
  },
  {
    id: 'maint-004',
    recordNumber: 'MNT-2024-1248',
    machineId: 'mach-002',
    machineName: 'Dough Proofer P-300',
    type: 'preventive',
    priority: 'medium',
    status: 'completed',
    scheduledDate: '2024-10-20',
    completedDate: '2024-10-20',
    technician: 'David Lee',
    description: 'Humidity sensor calibration and system cleaning',
    workPerformed: 'Calibrated humidity sensors, cleaned heating elements, inspected fan motors, tested control systems',
    partsReplaced: [
      { partName: 'Humidity Sensor', partNumber: 'PT-HUM-300', quantity: 2, cost: 180 },
      { partName: 'Air Filter Set', partNumber: 'PT-FILT-300', quantity: 1, cost: 35 },
    ],
    laborHours: 2,
    laborCost: 140,
    partsCost: 215,
    totalCost: 355,
    downtime: 2,
    nextMaintenanceDate: '2025-01-20',
    notes: 'Humidity control excellent. Sensors replaced as preventive measure.',
  },
  {
    id: 'maint-005',
    recordNumber: 'MNT-2024-1249',
    machineId: 'mach-005',
    machineName: 'Steam Deck Oven SD-600',
    type: 'preventive',
    priority: 'medium',
    status: 'completed',
    scheduledDate: '2024-11-25',
    completedDate: '2024-11-25',
    technician: 'Mike Johnson',
    description: 'Steam generator descaling and water pump maintenance',
    workPerformed: 'Descaled steam generator, replaced water pump seals, checked pressure relief valves, tested steam injection system',
    partsReplaced: [
      { partName: 'Water Pump Assembly', partNumber: 'SB-PUMP-600W', quantity: 2, cost: 280 },
      { partName: 'Descaling Agent', partNumber: 'DSC-100', quantity: 5, cost: 75 },
      { partName: 'Valve Seals', partNumber: 'SB-SEAL-600V', quantity: 4, cost: 60 },
    ],
    laborHours: 4,
    laborCost: 280,
    partsCost: 415,
    totalCost: 695,
    downtime: 4,
    nextMaintenanceDate: '2025-02-25',
    notes: 'Steam system performing excellently. Minimal scale buildup.',
  },
  {
    id: 'maint-006',
    recordNumber: 'MNT-2024-1250',
    machineId: 'mach-001',
    machineName: 'Industrial Mixer M-500',
    type: 'corrective',
    priority: 'medium',
    status: 'completed',
    scheduledDate: '2024-06-22',
    completedDate: '2024-06-22',
    technician: 'Sarah Williams',
    description: 'Drive belt showing wear and slipping under load',
    workPerformed: 'Replaced worn drive belt, adjusted tension, inspected pulleys, tested under full load',
    partsReplaced: [
      { partName: 'Drive Belt Type A', partNumber: 'BM-BELT-500A', quantity: 2, cost: 140 },
    ],
    laborHours: 6,
    laborCost: 420,
    partsCost: 140,
    totalCost: 560,
    downtime: 6,
    nextMaintenanceDate: '2024-11-15',
    notes: 'Belt replacement resolved slipping issue. Mixing performance back to normal.',
  },
  {
    id: 'maint-007',
    recordNumber: 'MNT-2025-0001',
    machineId: 'mach-003',
    machineName: 'Convection Oven O-800',
    type: 'preventive',
    priority: 'medium',
    status: 'scheduled',
    scheduledDate: '2025-03-01',
    technician: 'Mike Johnson',
    description: 'Scheduled quarterly maintenance - burner inspection and cleaning',
    workPerformed: '',
    partsReplaced: [],
    laborHours: 0,
    laborCost: 0,
    partsCost: 0,
    totalCost: 0,
    downtime: 0,
    nextMaintenanceDate: '2025-06-01',
  },
  {
    id: 'maint-008',
    recordNumber: 'MNT-2025-0002',
    machineId: 'mach-002',
    machineName: 'Dough Proofer P-300',
    type: 'preventive',
    priority: 'medium',
    status: 'scheduled',
    scheduledDate: '2025-01-20',
    technician: 'David Lee',
    description: 'Scheduled quarterly maintenance',
    workPerformed: '',
    partsReplaced: [],
    laborHours: 0,
    laborCost: 0,
    partsCost: 0,
    totalCost: 0,
    downtime: 0,
    nextMaintenanceDate: '2025-04-20',
  },
  {
    id: 'maint-009',
    recordNumber: 'MNT-2024-1251',
    machineId: 'mach-006',
    machineName: 'Cookie Depositor CD-100',
    type: 'inspection',
    priority: 'low',
    status: 'completed',
    scheduledDate: '2024-11-30',
    completedDate: '2024-11-30',
    technician: 'David Lee',
    description: 'Annual safety inspection',
    workPerformed: 'Comprehensive safety inspection, tested all emergency stops, checked electrical systems, verified safety guards',
    partsReplaced: [],
    laborHours: 2,
    laborCost: 140,
    partsCost: 0,
    totalCost: 140,
    downtime: 2,
    notes: 'Passed all safety inspections. No issues found.',
  },
];

export const maintenanceStats = {
  totalRecords: mockMaintenanceRecords.length,
  // backward-compatible alias used by some pages
  total: mockMaintenanceRecords.length,
  scheduled: mockMaintenanceRecords.filter(r => r.status === 'scheduled').length,
  inProgress: mockMaintenanceRecords.filter(r => r.status === 'in-progress').length,
  completed: mockMaintenanceRecords.filter(r => r.status === 'completed').length,
  totalCost: mockMaintenanceRecords.reduce((sum, r) => sum + r.totalCost, 0),
  totalDowntime: mockMaintenanceRecords.reduce((sum, r) => sum + r.downtime, 0),
  avgDowntime: mockMaintenanceRecords.filter(r => r.downtime > 0).reduce((sum, r) => sum + r.downtime, 0) / mockMaintenanceRecords.filter(r => r.downtime > 0).length,
};
