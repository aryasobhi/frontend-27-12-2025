// Mock Quality Control Data
export interface QualityControlRecord {
  id: string;
  inspectionId: string;
  productionOrderId: string;
  productionOrderNumber: string;
  productId: string;
  productName: string;
  batchNumber: string;
  inspectionDate: string;
  inspector: string;
  inspectorId: string;
  status: 'passed' | 'failed' | 'pending' | 'conditional';
  sampleSize: number;
  defectsFound: number;
  defectRate: number;
  // optional pre-computed pass rate for convenience in UI
  passRate?: number;
  // Inspection criteria
  criteria: {
    name: string;
    standard: string;
    result: string;
    passed: boolean;
  }[];
  // Defect details
  defects: {
    type: string;
    count: number;
    severity: 'minor' | 'major' | 'critical';
    description: string;
  }[];
  correctionRequired: boolean;
  correctionActions?: string[];
  notes: string;
  approvedBy?: string;
  approvalDate?: string;
  // Lab test results
  labTests?: {
    testName: string;
    result: string;
    unit: string;
    acceptableRange: string;
    passed: boolean;
  }[];
}

export const mockQualityControlRecords: QualityControlRecord[] = [
  {
    id: 'qc-001',
    inspectionId: 'QC-2024-5678',
    productionOrderId: 'po-001',
    productionOrderNumber: 'PRD-2024-1245',
    productId: 'prod-001',
    productName: 'Premium Wheat Bread',
    batchNumber: 'BATCH-2024-12-13-001',
    inspectionDate: '2024-12-13',
    inspector: 'Lisa Anderson',
    inspectorId: 'emp-089',
    status: 'passed',
    sampleSize: 50,
    defectsFound: 2,
    defectRate: 4.0,
    criteria: [
      { name: 'Weight', standard: '500g ± 10g', result: '505g', passed: true },
      { name: 'Crust Color', standard: 'Golden brown', result: 'Golden brown', passed: true },
      { name: 'Internal Temperature', standard: '95-98°C', result: '96°C', passed: true },
      { name: 'Texture', standard: 'Soft and uniform', result: 'Uniform', passed: true },
      { name: 'Shape', standard: 'Consistent loaf shape', result: 'Consistent', passed: true },
    ],
    defects: [
      { type: 'Slight surface crack', count: 2, severity: 'minor', description: 'Small surface cracks on 2 loaves, cosmetic only' },
    ],
    correctionRequired: false,
    notes: 'Excellent batch quality. Minor cosmetic defects within acceptable limits.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-13',
    labTests: [
      { testName: 'Moisture Content', result: '38', unit: '%', acceptableRange: '35-40%', passed: true },
      { testName: 'pH Level', result: '5.8', unit: '', acceptableRange: '5.5-6.0', passed: true },
    ],
  },
  {
    id: 'qc-002',
    inspectionId: 'QC-2024-5679',
    productionOrderId: 'po-002',
    productionOrderNumber: 'PRD-2024-1246',
    productId: 'prod-002',
    productName: 'Artisan Sourdough',
    batchNumber: 'BATCH-2024-12-12-002',
    inspectionDate: '2024-12-12',
    inspector: 'Lisa Anderson',
    inspectorId: 'emp-089',
    status: 'passed',
    sampleSize: 30,
    defectsFound: 0,
    defectRate: 0,
    criteria: [
      { name: 'Weight', standard: '650g ± 15g', result: '655g', passed: true },
      { name: 'Crust Thickness', standard: '3-5mm', result: '4mm', passed: true },
      { name: 'Internal Structure', standard: 'Open crumb', result: 'Open crumb achieved', passed: true },
      { name: 'Scoring Pattern', standard: 'Clean ear development', result: 'Excellent ear', passed: true },
      { name: 'Aroma', standard: 'Strong sourdough tang', result: 'Characteristic aroma', passed: true },
    ],
    defects: [],
    correctionRequired: false,
    notes: 'Perfect batch. Excellent fermentation and baking results.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-12',
    labTests: [
      { testName: 'pH Level', result: '4.2', unit: '', acceptableRange: '3.8-4.5', passed: true },
      { testName: 'Moisture Content', result: '42', unit: '%', acceptableRange: '40-45%', passed: true },
      { testName: 'Acidity (TTA)', result: '12', unit: 'mL', acceptableRange: '10-15 mL', passed: true },
    ],
  },
  {
    id: 'qc-003',
    inspectionId: 'QC-2024-5680',
    productionOrderId: 'po-003',
    productionOrderNumber: 'PRD-2024-1247',
    productId: 'prod-003',
    productName: 'Chocolate Chip Cookies',
    batchNumber: 'BATCH-2024-12-11-003',
    inspectionDate: '2024-12-11',
    inspector: 'Rachel Green',
    inspectorId: 'emp-104',
    status: 'conditional',
    sampleSize: 100,
    defectsFound: 12,
    defectRate: 12.0,
    criteria: [
      { name: 'Weight', standard: '30g ± 3g', result: '29-32g', passed: true },
      { name: 'Diameter', standard: '7-8cm', result: '7.5cm avg', passed: true },
      { name: 'Color', standard: 'Golden edges', result: 'Slightly over-browned', passed: false },
      { name: 'Chip Distribution', standard: 'Even throughout', result: 'Mostly even', passed: true },
      { name: 'Texture', standard: 'Soft center, crisp edge', result: 'Slightly over-crisp', passed: false },
    ],
    defects: [
      { type: 'Over-baked', count: 8, severity: 'minor', description: 'Edges darker than standard' },
      { type: 'Uneven chip distribution', count: 4, severity: 'minor', description: 'Some cookies with fewer chips' },
    ],
    correctionRequired: true,
    correctionActions: [
      'Reduce oven temperature by 5°C',
      'Review chip mixing procedure',
      'Monitor next batch closely',
    ],
    notes: 'Batch acceptable for sale but requires process adjustment. Oven temperature likely cause.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-11',
  },
  {
    id: 'qc-004',
    inspectionId: 'QC-2024-5681',
    productionOrderId: 'po-004',
    productionOrderNumber: 'PRD-2024-1248',
    productId: 'prod-004',
    productName: 'Croissant Premium',
    batchNumber: 'BATCH-2024-12-10-004',
    inspectionDate: '2024-12-10',
    inspector: 'Lisa Anderson',
    inspectorId: 'emp-089',
    status: 'passed',
    sampleSize: 40,
    defectsFound: 3,
    defectRate: 7.5,
    criteria: [
      { name: 'Weight', standard: '80g ± 5g', result: '82g', passed: true },
      { name: 'Lamination Layers', standard: 'Visible layers', result: 'Excellent layering', passed: true },
      { name: 'Shape', standard: 'Crescent shape', result: 'Consistent', passed: true },
      { name: 'Color', standard: 'Golden brown', result: 'Golden brown', passed: true },
      { name: 'Flakiness', standard: 'Flaky exterior', result: 'Very flaky', passed: true },
    ],
    defects: [
      { type: 'Slight shape irregularity', count: 3, severity: 'minor', description: 'Minor asymmetry in 3 pieces' },
    ],
    correctionRequired: false,
    notes: 'Excellent lamination quality. Minor shape variations within acceptable range.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-10',
  },
  {
    id: 'qc-005',
    inspectionId: 'QC-2024-5682',
    productionOrderId: 'po-005',
    productionOrderNumber: 'PRD-2024-1249',
    productId: 'prod-005',
    productName: 'Multigrain Bagels',
    batchNumber: 'BATCH-2024-12-09-005',
    inspectionDate: '2024-12-09',
    inspector: 'Rachel Green',
    inspectorId: 'emp-104',
    status: 'failed',
    sampleSize: 50,
    defectsFound: 18,
    defectRate: 36.0,
    criteria: [
      { name: 'Weight', standard: '100g ± 8g', result: '95-105g', passed: true },
      { name: 'Shape', standard: 'Round with hole', result: 'Irregular holes', passed: false },
      { name: 'Boil Time', standard: '60-90 seconds', result: 'Appears under-boiled', passed: false },
      { name: 'Crust', standard: 'Shiny, chewy', result: 'Dull, not chewy', passed: false },
      { name: 'Seed Coverage', standard: 'Even coating', result: 'Patchy', passed: false },
    ],
    defects: [
      { type: 'Irregular shape', count: 12, severity: 'major', description: 'Holes closed or irregular' },
      { type: 'Under-boiled', count: 15, severity: 'major', description: 'Lack of characteristic texture' },
      { type: 'Poor seed adhesion', count: 8, severity: 'minor', description: 'Uneven seed coverage' },
    ],
    correctionRequired: true,
    correctionActions: [
      'Review boiling procedure - extend boil time',
      'Check bagel former settings',
      'Improve seed application technique',
      'Retrain production staff on bagel process',
      'Batch rejected - do not ship',
    ],
    notes: 'BATCH REJECTED. Multiple process failures. Requires immediate corrective action.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-09',
  },
  {
    id: 'qc-006',
    inspectionId: 'QC-2024-5683',
    productionOrderId: 'po-006',
    productionOrderNumber: 'PRD-2024-1250',
    productId: 'prod-001',
    productName: 'Premium Wheat Bread',
    batchNumber: 'BATCH-2024-12-08-006',
    inspectionDate: '2024-12-08',
    inspector: 'Lisa Anderson',
    inspectorId: 'emp-089',
    status: 'passed',
    sampleSize: 50,
    defectsFound: 1,
    defectRate: 2.0,
    criteria: [
      { name: 'Weight', standard: '500g ± 10g', result: '502g', passed: true },
      { name: 'Crust Color', standard: 'Golden brown', result: 'Golden brown', passed: true },
      { name: 'Internal Temperature', standard: '95-98°C', result: '97°C', passed: true },
      { name: 'Texture', standard: 'Soft and uniform', result: 'Uniform', passed: true },
      { name: 'Shape', standard: 'Consistent loaf shape', result: 'Consistent', passed: true },
    ],
    defects: [
      { type: 'Minor packaging issue', count: 1, severity: 'minor', description: 'One loaf with torn wrapper' },
    ],
    correctionRequired: false,
    notes: 'High quality batch. Single packaging defect, product quality excellent.',
    approvedBy: 'Quality Manager',
    approvalDate: '2024-12-08',
    labTests: [
      { testName: 'Moisture Content', result: '37', unit: '%', acceptableRange: '35-40%', passed: true },
      { testName: 'pH Level', result: '5.7', unit: '', acceptableRange: '5.5-6.0', passed: true },
    ],
  },
  {
    id: 'qc-007',
    inspectionId: 'QC-2024-5684',
    productionOrderId: 'po-007',
    productionOrderNumber: 'PRD-2024-1251',
    productId: 'prod-003',
    productName: 'Chocolate Chip Cookies',
    batchNumber: 'BATCH-2024-12-14-007',
    inspectionDate: '2024-12-14',
    inspector: 'Rachel Green',
    inspectorId: 'emp-104',
    status: 'pending',
    sampleSize: 100,
    defectsFound: 0,
    defectRate: 0,
    criteria: [
      { name: 'Weight', standard: '30g ± 3g', result: 'Testing in progress', passed: true },
      { name: 'Diameter', standard: '7-8cm', result: 'Testing in progress', passed: true },
      { name: 'Color', standard: 'Golden edges', result: 'Testing in progress', passed: true },
      { name: 'Chip Distribution', standard: 'Even throughout', result: 'Testing in progress', passed: true },
      { name: 'Texture', standard: 'Soft center, crisp edge', result: 'Testing in progress', passed: true },
    ],
    defects: [],
    correctionRequired: false,
    notes: 'Inspection in progress. Temperature correction from QC-003 applied.',
  },
];

export const qcStats = {
  totalInspections: mockQualityControlRecords.length,
  // alias for pages expecting `total`
  total: mockQualityControlRecords.length,
  passed: mockQualityControlRecords.filter(r => r.status === 'passed').length,
  failed: mockQualityControlRecords.filter(r => r.status === 'failed').length,
  conditional: mockQualityControlRecords.filter(r => r.status === 'conditional').length,
  pending: mockQualityControlRecords.filter(r => r.status === 'pending').length,
  averageDefectRate: mockQualityControlRecords.reduce((sum, r) => sum + r.defectRate, 0) / mockQualityControlRecords.length,
  passRate: (mockQualityControlRecords.filter(r => r.status === 'passed').length / mockQualityControlRecords.filter(r => r.status !== 'pending').length) * 100,
};
