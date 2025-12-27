// Mock Project Data
export interface ProjectDetail {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  manager: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  // Team members
  team: {
    id: string;
    name: string;
    role: string;
    allocation: number;
  }[];
  // Tasks
  tasks: {
    id: string;
    name: string;
    assignedTo: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    dueDate: string;
    progress: number;
  }[];
  // Milestones
  milestones: {
    id: string;
    name: string;
    date: string;
    status: 'pending' | 'completed' | 'delayed';
    description: string;
  }[];
  // Resources
  resources: {
    type: 'machine' | 'material' | 'person';
    name: string;
    allocated: number;
    used: number;
    unit: string;
  }[];
  // Budget breakdown
  budgetBreakdown: {
    category: string;
    allocated: number;
    spent: number;
    remaining: number;
  }[];
  // Timeline
  timeline: {
    date: string;
    event: string;
    type: 'milestone' | 'task' | 'issue' | 'update';
    description: string;
  }[];
}

export const mockProjects: ProjectDetail[] = [
  {
    id: 'proj-001',
    name: 'Sourdough Product Line Expansion',
    code: 'PROJ-2024-SD',
    description: 'Expand sourdough production capacity and introduce 5 new sourdough varieties to meet growing market demand.',
    status: 'active',
    startDate: '2024-09-01',
    endDate: '2025-03-31',
    budget: 450000,
    spent: 285000,
    progress: 65,
    manager: 'Pierre Dubois',
    priority: 'high',
    category: 'Product Development',
    team: [
      { id: 'emp-034', name: 'Pierre Dubois', role: 'Project Lead & Sourdough Specialist', allocation: 80 },
      { id: 'emp-012', name: 'Maria Santos', role: 'Senior Baker', allocation: 40 },
      { id: 'emp-067', name: 'Robert Chang', role: 'R&D Manager', allocation: 60 },
      { id: 'emp-089', name: 'Lisa Anderson', role: 'Quality Assurance', allocation: 30 },
    ],
    tasks: [
      {
        id: 'task-001',
        name: 'Recipe Development - Olive & Rosemary Sourdough',
        assignedTo: 'Pierre Dubois',
        status: 'done',
        dueDate: '2024-10-15',
        progress: 100,
      },
      {
        id: 'task-002',
        name: 'Recipe Development - Whole Wheat Sourdough',
        assignedTo: 'Pierre Dubois',
        status: 'done',
        dueDate: '2024-11-01',
        progress: 100,
      },
      {
        id: 'task-003',
        name: 'Production Line Setup - New Retarder Proofer',
        assignedTo: 'Maria Santos',
        status: 'in-progress',
        dueDate: '2024-12-20',
        progress: 75,
      },
      {
        id: 'task-004',
        name: 'Market Testing - 3 New Varieties',
        assignedTo: 'Robert Chang',
        status: 'in-progress',
        dueDate: '2025-01-15',
        progress: 45,
      },
      {
        id: 'task-005',
        name: 'Quality Standards Documentation',
        assignedTo: 'Lisa Anderson',
        status: 'review',
        dueDate: '2024-12-31',
        progress: 90,
      },
      {
        id: 'task-006',
        name: 'Staff Training Program',
        assignedTo: 'Maria Santos',
        status: 'todo',
        dueDate: '2025-02-15',
        progress: 0,
      },
    ],
    milestones: [
      {
        id: 'mile-001',
        name: 'Recipe Development Complete',
        date: '2024-11-15',
        status: 'completed',
        description: 'All 5 new sourdough recipes finalized and approved',
      },
      {
        id: 'mile-002',
        name: 'Equipment Installation',
        date: '2024-12-20',
        status: 'pending',
        description: 'New retarder proofer and steam oven installed and operational',
      },
      {
        id: 'mile-003',
        name: 'Market Testing Complete',
        date: '2025-01-31',
        status: 'pending',
        description: 'Consumer testing and feedback collection for all varieties',
      },
      {
        id: 'mile-004',
        name: 'Commercial Launch',
        date: '2025-03-15',
        status: 'pending',
        description: 'Full commercial production and distribution begins',
      },
    ],
    resources: [
      { type: 'machine', name: 'Retarder Proofer RP-200', allocated: 1000, used: 650, unit: 'hours' },
      { type: 'machine', name: 'Steam Deck Oven SD-600', allocated: 800, used: 520, unit: 'hours' },
      { type: 'material', name: 'Organic Bread Flour', allocated: 5000, used: 3200, unit: 'kg' },
      { type: 'material', name: 'Sourdough Starter', allocated: 1000, used: 650, unit: 'kg' },
      { type: 'person', name: 'Development Team', allocated: 2400, used: 1560, unit: 'hours' },
    ],
    budgetBreakdown: [
      { category: 'Equipment', allocated: 200000, spent: 150000, remaining: 50000 },
      { category: 'Raw Materials', allocated: 80000, spent: 52000, remaining: 28000 },
      { category: 'Labor', allocated: 120000, spent: 65000, remaining: 55000 },
      { category: 'Marketing', allocated: 30000, spent: 12000, remaining: 18000 },
      { category: 'Testing & QA', allocated: 20000, spent: 6000, remaining: 14000 },
    ],
    timeline: [
      {
        date: '2024-12-10',
        event: 'Equipment Installation Progress',
        type: 'update',
        description: 'Retarder proofer installation 75% complete, on schedule',
      },
      {
        date: '2024-11-15',
        event: 'Recipe Development Milestone',
        type: 'milestone',
        description: 'All 5 recipes approved by quality team',
      },
      {
        date: '2024-10-20',
        event: 'Market Research Complete',
        type: 'task',
        description: 'Consumer survey shows 85% interest in new varieties',
      },
      {
        date: '2024-09-01',
        event: 'Project Kickoff',
        type: 'milestone',
        description: 'Project initiated with team meeting and goal setting',
      },
    ],
  },
  {
    id: 'proj-002',
    name: 'Automation & Efficiency Upgrade',
    code: 'PROJ-2024-AE',
    description: 'Install automated packaging line and upgrade production monitoring systems to increase efficiency by 25%.',
    status: 'active',
    startDate: '2024-10-01',
    endDate: '2025-04-30',
    budget: 680000,
    spent: 340000,
    progress: 50,
    manager: 'Operations Director',
    priority: 'critical',
    category: 'Process Improvement',
    team: [
      { id: 'emp-078', name: 'Michael Zhang', role: 'Automation Engineer', allocation: 90 },
      { id: 'emp-012', name: 'Maria Santos', role: 'Production Lead', allocation: 30 },
      { id: 'emp-091', name: 'David Wilson', role: 'IT Systems', allocation: 60 },
      { id: 'emp-102', name: 'Emily Brown', role: 'Project Manager', allocation: 70 },
    ],
    tasks: [
      {
        id: 'task-007',
        name: 'Packaging Line Equipment Procurement',
        assignedTo: 'Michael Zhang',
        status: 'done',
        dueDate: '2024-11-15',
        progress: 100,
      },
      {
        id: 'task-008',
        name: 'Installation & Setup',
        assignedTo: 'Michael Zhang',
        status: 'in-progress',
        dueDate: '2025-01-31',
        progress: 60,
      },
      {
        id: 'task-009',
        name: 'Monitoring System Software Development',
        assignedTo: 'David Wilson',
        status: 'in-progress',
        dueDate: '2025-02-28',
        progress: 45,
      },
      {
        id: 'task-010',
        name: 'Staff Training Program',
        assignedTo: 'Maria Santos',
        status: 'todo',
        dueDate: '2025-03-31',
        progress: 0,
      },
    ],
    milestones: [
      {
        id: 'mile-005',
        name: 'Equipment Delivery',
        date: '2024-11-30',
        status: 'completed',
        description: 'All automated packaging equipment delivered',
      },
      {
        id: 'mile-006',
        name: 'Installation Complete',
        date: '2025-02-15',
        status: 'pending',
        description: 'Packaging line fully installed and tested',
      },
      {
        id: 'mile-007',
        name: 'System Integration',
        date: '2025-03-31',
        status: 'pending',
        description: 'Monitoring systems integrated with production line',
      },
      {
        id: 'mile-008',
        name: 'Go Live',
        date: '2025-04-30',
        status: 'pending',
        description: 'Full production using new automated systems',
      },
    ],
    resources: [
      { type: 'machine', name: 'Packaging Line Components', allocated: 1, used: 0.6, unit: 'system' },
      { type: 'person', name: 'Engineering Team', allocated: 3200, used: 1600, unit: 'hours' },
      { type: 'person', name: 'Installation Crew', allocated: 800, used: 480, unit: 'hours' },
    ],
    budgetBreakdown: [
      { category: 'Equipment Purchase', allocated: 450000, spent: 250000, remaining: 200000 },
      { category: 'Installation', allocated: 120000, spent: 50000, remaining: 70000 },
      { category: 'Software Development', allocated: 80000, spent: 30000, remaining: 50000 },
      { category: 'Training', allocated: 30000, spent: 10000, remaining: 20000 },
    ],
    timeline: [
      {
        date: '2024-12-05',
        event: 'Installation Phase 1 Complete',
        type: 'update',
        description: 'Main conveyor system installed and operational',
      },
      {
        date: '2024-11-30',
        event: 'Equipment Delivery',
        type: 'milestone',
        description: 'All equipment received and inspected',
      },
      {
        date: '2024-10-01',
        event: 'Project Start',
        type: 'milestone',
        description: 'Automation project officially launched',
      },
    ],
  },
  {
    id: 'proj-003',
    name: 'Organic Certification Expansion',
    code: 'PROJ-2024-OC',
    description: 'Obtain organic certification for entire product line and establish dedicated organic production facility.',
    status: 'planning',
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    budget: 320000,
    spent: 25000,
    progress: 8,
    manager: 'Quality Director',
    priority: 'medium',
    category: 'Compliance & Certification',
    team: [
      { id: 'emp-089', name: 'Lisa Anderson', role: 'Quality Assurance Lead', allocation: 80 },
      { id: 'emp-104', name: 'Rachel Green', role: 'Compliance Officer', allocation: 70 },
      { id: 'emp-012', name: 'Maria Santos', role: 'Production Consultant', allocation: 20 },
    ],
    tasks: [
      {
        id: 'task-011',
        name: 'Certification Requirements Analysis',
        assignedTo: 'Rachel Green',
        status: 'in-progress',
        dueDate: '2025-02-15',
        progress: 60,
      },
      {
        id: 'task-012',
        name: 'Supplier Qualification - Organic Ingredients',
        assignedTo: 'Lisa Anderson',
        status: 'in-progress',
        dueDate: '2025-03-31',
        progress: 30,
      },
      {
        id: 'task-013',
        name: 'Facility Separation Planning',
        assignedTo: 'Maria Santos',
        status: 'todo',
        dueDate: '2025-04-30',
        progress: 0,
      },
      {
        id: 'task-014',
        name: 'Documentation & Procedures',
        assignedTo: 'Rachel Green',
        status: 'todo',
        dueDate: '2025-06-30',
        progress: 0,
      },
    ],
    milestones: [
      {
        id: 'mile-009',
        name: 'Requirements Documentation',
        date: '2025-02-28',
        status: 'pending',
        description: 'Complete certification requirements documentation',
      },
      {
        id: 'mile-010',
        name: 'Supplier Agreements',
        date: '2025-05-31',
        status: 'pending',
        description: 'All organic ingredient suppliers qualified and contracted',
      },
      {
        id: 'mile-011',
        name: 'Facility Ready',
        date: '2025-09-30',
        status: 'pending',
        description: 'Dedicated organic production area established',
      },
      {
        id: 'mile-012',
        name: 'Certification Audit',
        date: '2025-11-30',
        status: 'pending',
        description: 'Official certification audit conducted',
      },
    ],
    resources: [
      { type: 'person', name: 'Compliance Team', allocated: 2000, used: 160, unit: 'hours' },
      { type: 'material', name: 'Organic Ingredient Samples', allocated: 500, used: 80, unit: 'kg' },
    ],
    budgetBreakdown: [
      { category: 'Certification Fees', allocated: 50000, spent: 10000, remaining: 40000 },
      { category: 'Facility Modifications', allocated: 150000, spent: 0, remaining: 150000 },
      { category: 'Supplier Development', allocated: 60000, spent: 8000, remaining: 52000 },
      { category: 'Training & Documentation', allocated: 40000, spent: 5000, remaining: 35000 },
      { category: 'Consulting Services', allocated: 20000, spent: 2000, remaining: 18000 },
    ],
    timeline: [
      {
        date: '2024-12-10',
        event: 'Initial Consultation',
        type: 'update',
        description: 'Met with organic certification body for preliminary assessment',
      },
      {
        date: '2024-11-20',
        event: 'Project Approved',
        type: 'milestone',
        description: 'Board approved organic certification project',
      },
    ],
  },
  {
    id: 'proj-004',
    name: 'New Distribution Center - East Coast',
    code: 'PROJ-2024-DC',
    description: 'Establish new distribution center in New York to serve East Coast markets and reduce delivery times.',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-09-30',
    budget: 1250000,
    spent: 1180000,
    progress: 100,
    manager: 'Logistics Director',
    priority: 'high',
    category: 'Expansion',
    team: [
      { id: 'emp-115', name: 'James Peterson', role: 'Logistics Manager', allocation: 100 },
      { id: 'emp-126', name: 'Susan Clark', role: 'Facility Manager', allocation: 90 },
      { id: 'emp-137', name: 'Tom Harris', role: 'Operations Coordinator', allocation: 80 },
    ],
    tasks: [
      {
        id: 'task-015',
        name: 'Site Selection',
        assignedTo: 'James Peterson',
        status: 'done',
        dueDate: '2024-03-15',
        progress: 100,
      },
      {
        id: 'task-016',
        name: 'Facility Construction',
        assignedTo: 'Susan Clark',
        status: 'done',
        dueDate: '2024-07-31',
        progress: 100,
      },
      {
        id: 'task-017',
        name: 'Equipment Installation',
        assignedTo: 'Tom Harris',
        status: 'done',
        dueDate: '2024-08-31',
        progress: 100,
      },
      {
        id: 'task-018',
        name: 'Staff Hiring & Training',
        assignedTo: 'Susan Clark',
        status: 'done',
        dueDate: '2024-09-15',
        progress: 100,
      },
    ],
    milestones: [
      {
        id: 'mile-013',
        name: 'Site Acquired',
        date: '2024-03-31',
        status: 'completed',
        description: 'Distribution center location secured in New Jersey',
      },
      {
        id: 'mile-014',
        name: 'Construction Complete',
        date: '2024-08-15',
        status: 'completed',
        description: '50,000 sq ft facility construction finished',
      },
      {
        id: 'mile-015',
        name: 'Operational Launch',
        date: '2024-09-30',
        status: 'completed',
        description: 'Distribution center fully operational',
      },
    ],
    resources: [
      { type: 'person', name: 'Project Team', allocated: 5000, used: 4800, unit: 'hours' },
      { type: 'machine', name: 'Warehouse Equipment', allocated: 25, used: 25, unit: 'units' },
    ],
    budgetBreakdown: [
      { category: 'Land & Building', allocated: 800000, spent: 750000, remaining: 50000 },
      { category: 'Equipment', allocated: 250000, spent: 240000, remaining: 10000 },
      { category: 'Initial Inventory', allocated: 100000, spent: 95000, remaining: 5000 },
      { category: 'Staffing', allocated: 80000, spent: 75000, remaining: 5000 },
      { category: 'IT Systems', allocated: 20000, spent: 20000, remaining: 0 },
    ],
    timeline: [
      {
        date: '2024-09-30',
        event: 'Official Opening',
        type: 'milestone',
        description: 'Distribution center opened with ceremony',
      },
      {
        date: '2024-08-15',
        event: 'Construction Finished',
        type: 'milestone',
        description: 'Building construction completed on schedule',
      },
      {
        date: '2024-03-31',
        event: 'Site Purchased',
        type: 'milestone',
        description: 'Facility location acquired',
      },
      {
        date: '2024-01-15',
        event: 'Project Launch',
        type: 'milestone',
        description: 'East Coast expansion project initiated',
      },
    ],
  },
];
