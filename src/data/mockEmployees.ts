// Mock Employee Data with detailed information
export interface EmployeeDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  // Optional shift information (e.g., Morning/Afternoon/Night)
  shift?: string;
  status: 'active' | 'on-leave' | 'inactive';
  joinDate: string;
  salary: number;
  employeeNumber: string;
  avatar?: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  // Biography
  bio: {
    summary: string;
    experience: number;
    education: string;
    previousCompanies: string[];
  };
  // Skills
  skills: {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsOfExperience: number;
  }[];
  // Certificates
  certificates: {
    id: string;
    name: string;
    issuedBy: string;
    issueDate: string;
    expiryDate?: string;
    status: 'valid' | 'expired' | 'expiring-soon';
    credentialId?: string;
  }[];
  // Assigned machines
  assignedMachines: {
    machineId: string;
    machineName: string;
    certification: string;
    assignedDate: string;
    proficiencyLevel: 'trainee' | 'operator' | 'senior' | 'master';
  }[];
  // Performance reviews
  performanceReviews: {
    id: string;
    date: string;
    reviewer: string;
    rating: number;
    strengths: string[];
    improvements: string[];
    goals: string[];
  }[];
  // Attendance
  attendance: {
    month: string;
    present: number;
    absent: number;
    late: number;
    overtime: number;
  }[];
}

export const mockEmployees: EmployeeDetail[] = [
  {
    id: 'emp-012',
    name: 'Maria Santos',
    email: 'maria.santos@company.com',
    phone: '+1-555-0112',
    position: 'Master Baker',
    department: 'Production',
    status: 'active',
    joinDate: '2018-03-15',
    salary: 65000,
    employeeNumber: 'EMP-2018-012',
    avatar: '/avatars/maria-santos.jpg',
    dateOfBirth: '1985-07-22',
    address: '456 Bakery Lane',
    city: 'San Francisco',
    country: 'USA',
    emergencyContact: {
      name: 'Carlos Santos',
      relationship: 'Spouse',
      phone: '+1-555-0113',
    },
    bio: {
      summary: 'Highly skilled master baker with over 15 years of experience in artisan bread production. Specializes in European-style breads and has trained multiple apprentice bakers. Passionate about quality and innovation in baking techniques.',
      experience: 15,
      education: 'Culinary Institute of America - Professional Baking and Pastry Arts',
      previousCompanies: ['European Bakery Co.', 'Artisan Bread House', 'La Boulangerie'],
    },
    skills: [
      { name: 'Artisan Bread Baking', level: 'expert', yearsOfExperience: 15 },
      { name: 'Sourdough Production', level: 'expert', yearsOfExperience: 12 },
      { name: 'Industrial Mixer Operation', level: 'expert', yearsOfExperience: 10 },
      { name: 'Quality Control', level: 'advanced', yearsOfExperience: 8 },
      { name: 'Recipe Development', level: 'advanced', yearsOfExperience: 6 },
      { name: 'Team Leadership', level: 'advanced', yearsOfExperience: 5 },
      { name: 'Oven Operations', level: 'expert', yearsOfExperience: 15 },
      { name: 'Food Safety & HACCP', level: 'advanced', yearsOfExperience: 10 },
    ],
    certificates: [
      {
        id: 'cert-001',
        name: 'Master Baker Certification',
        issuedBy: 'American Bakers Association',
        issueDate: '2020-06-15',
        status: 'valid',
        credentialId: 'MBA-2020-45678',
      },
      {
        id: 'cert-002',
        name: 'Food Safety Manager Certification',
        issuedBy: 'National Restaurant Association',
        issueDate: '2023-02-10',
        expiryDate: '2026-02-10',
        status: 'valid',
        credentialId: 'FSM-2023-98765',
      },
      {
        id: 'cert-003',
        name: 'HACCP Certification',
        issuedBy: 'International HACCP Alliance',
        issueDate: '2022-09-20',
        expiryDate: '2025-09-20',
        status: 'valid',
        credentialId: 'HACCP-2022-12345',
      },
      {
        id: 'cert-004',
        name: 'Industrial Mixer Level 3',
        issuedBy: 'BakeMaster Industries',
        issueDate: '2024-06-01',
        expiryDate: '2027-06-01',
        status: 'valid',
        credentialId: 'BM-L3-2024-567',
      },
      {
        id: 'cert-005',
        name: 'Oven Operations Master',
        issuedBy: 'BakeRight Equipment',
        issueDate: '2024-04-12',
        expiryDate: '2027-04-12',
        status: 'valid',
        credentialId: 'BR-OM-2024-789',
      },
    ],
    assignedMachines: [
      {
        machineId: 'mach-001',
        machineName: 'Industrial Mixer M-500',
        certification: 'Industrial Mixer Level 3',
        assignedDate: '2022-03-20',
        proficiencyLevel: 'master',
      },
      {
        machineId: 'mach-002',
        machineName: 'Dough Proofer P-300',
        certification: 'Proofing Systems Advanced',
        assignedDate: '2021-08-15',
        proficiencyLevel: 'master',
      },
      {
        machineId: 'mach-003',
        machineName: 'Convection Oven O-800',
        certification: 'Oven Operations Master',
        assignedDate: '2020-05-25',
        proficiencyLevel: 'master',
      },
    ],
    performanceReviews: [
      {
        id: 'rev-001',
        date: '2024-06-15',
        reviewer: 'Production Manager',
        rating: 4.8,
        strengths: ['Exceptional bread quality', 'Strong leadership', 'Innovative recipe development'],
        improvements: ['Documentation of new processes', 'Cross-training in pastry'],
        goals: ['Lead sourdough expansion project', 'Mentor 2 new apprentices', 'Reduce waste by 10%'],
      },
      {
        id: 'rev-002',
        date: '2023-06-15',
        reviewer: 'Production Manager',
        rating: 4.7,
        strengths: ['Consistent quality', 'Team collaboration', 'Process optimization'],
        improvements: ['Time management during peak hours', 'Inventory tracking'],
        goals: ['Complete Master Baker certification', 'Improve efficiency by 5%'],
      },
    ],
    attendance: [
      { month: '2024-11', present: 22, absent: 0, late: 1, overtime: 8 },
      { month: '2024-10', present: 23, absent: 0, late: 0, overtime: 12 },
      { month: '2024-09', present: 21, absent: 1, late: 0, overtime: 6 },
      { month: '2024-08', present: 22, absent: 0, late: 2, overtime: 10 },
      { month: '2024-07', present: 23, absent: 0, late: 0, overtime: 15 },
      { month: '2024-06', present: 20, absent: 2, late: 1, overtime: 5 },
    ],
  },
  {
    id: 'emp-023',
    name: 'John Chen',
    email: 'john.chen@company.com',
    phone: '+1-555-0123',
    position: 'Baker Assistant',
    department: 'Production',
    status: 'active',
    joinDate: '2022-09-01',
    salary: 42000,
    employeeNumber: 'EMP-2022-023',
    dateOfBirth: '1995-03-10',
    address: '789 Mill Street',
    city: 'San Francisco',
    country: 'USA',
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Sister',
      phone: '+1-555-0124',
    },
    bio: {
      summary: 'Dedicated baker assistant with strong attention to detail and eagerness to learn. Quickly advancing skills in bread production and machine operation.',
      experience: 3,
      education: 'San Francisco Culinary School - Baking Certificate',
      previousCompanies: ['Corner Bakery Cafe'],
    },
    skills: [
      { name: 'Bread Baking', level: 'intermediate', yearsOfExperience: 3 },
      { name: 'Industrial Mixer Operation', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'Oven Operations', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'Food Safety', level: 'intermediate', yearsOfExperience: 3 },
      { name: 'Quality Control', level: 'beginner', yearsOfExperience: 1 },
    ],
    certificates: [
      {
        id: 'cert-006',
        name: 'Food Handler Certification',
        issuedBy: 'San Francisco Health Department',
        issueDate: '2024-01-15',
        expiryDate: '2027-01-15',
        status: 'valid',
        credentialId: 'FH-2024-456',
      },
      {
        id: 'cert-007',
        name: 'Industrial Mixer Level 2',
        issuedBy: 'BakeMaster Industries',
        issueDate: '2024-03-15',
        expiryDate: '2027-03-15',
        status: 'valid',
        credentialId: 'BM-L2-2024-321',
      },
      {
        id: 'cert-008',
        name: 'Oven Operations Level 2',
        issuedBy: 'BakeRight Equipment',
        issueDate: '2024-06-08',
        expiryDate: '2027-06-08',
        status: 'valid',
        credentialId: 'BR-L2-2024-654',
      },
    ],
    assignedMachines: [
      {
        machineId: 'mach-001',
        machineName: 'Industrial Mixer M-500',
        certification: 'Industrial Mixer Level 2',
        assignedDate: '2023-03-20',
        proficiencyLevel: 'operator',
      },
      {
        machineId: 'mach-003',
        machineName: 'Convection Oven O-800',
        certification: 'Oven Operations Level 2',
        assignedDate: '2023-06-15',
        proficiencyLevel: 'operator',
      },
      {
        machineId: 'mach-008',
        machineName: 'Bagel Former BF-50',
        certification: 'Bagel Production Basics',
        assignedDate: '2024-05-25',
        proficiencyLevel: 'operator',
      },
    ],
    performanceReviews: [
      {
        id: 'rev-003',
        date: '2024-09-01',
        reviewer: 'Maria Santos',
        rating: 4.2,
        strengths: ['Reliable', 'Fast learner', 'Team player'],
        improvements: ['Speed in repetitive tasks', 'Proactive problem solving'],
        goals: ['Complete Level 3 mixer certification', 'Learn sourdough production', 'Reduce setup time by 15%'],
      },
    ],
    attendance: [
      { month: '2024-11', present: 21, absent: 1, late: 2, overtime: 4 },
      { month: '2024-10', present: 23, absent: 0, late: 1, overtime: 6 },
      { month: '2024-09', present: 22, absent: 0, late: 0, overtime: 5 },
      { month: '2024-08', present: 21, absent: 1, late: 3, overtime: 3 },
      { month: '2024-07', present: 23, absent: 0, late: 1, overtime: 7 },
      { month: '2024-06', present: 22, absent: 0, late: 2, overtime: 4 },
    ],
  },
  {
    id: 'emp-034',
    name: 'Pierre Dubois',
    email: 'pierre.dubois@company.com',
    phone: '+1-555-0134',
    position: 'Sourdough Specialist',
    department: 'Production',
    status: 'active',
    joinDate: '2020-11-10',
    salary: 58000,
    employeeNumber: 'EMP-2020-034',
    dateOfBirth: '1988-05-18',
    address: '234 French Quarter Ave',
    city: 'San Francisco',
    country: 'USA',
    emergencyContact: {
      name: 'Sophie Dubois',
      relationship: 'Wife',
      phone: '+1-555-0135',
    },
    bio: {
      summary: 'French-trained artisan baker specializing in traditional sourdough and European breads. Expert in long fermentation techniques and natural leavening.',
      experience: 12,
      education: 'École de Boulangerie et de Pâtisserie de Paris - Master Baker',
      previousCompanies: ['Poilâne Paris', 'Le Pain Quotidien', 'Boudin Bakery'],
    },
    skills: [
      { name: 'Sourdough Production', level: 'expert', yearsOfExperience: 12 },
      { name: 'Artisan Bread Baking', level: 'expert', yearsOfExperience: 12 },
      { name: 'Viennoiserie', level: 'advanced', yearsOfExperience: 10 },
      { name: 'Natural Fermentation', level: 'expert', yearsOfExperience: 12 },
      { name: 'Industrial Mixer Operation', level: 'expert', yearsOfExperience: 8 },
      { name: 'Steam Oven Operations', level: 'expert', yearsOfExperience: 6 },
      { name: 'Recipe Development', level: 'advanced', yearsOfExperience: 8 },
    ],
    certificates: [
      {
        id: 'cert-009',
        name: 'Master Baker - French Certification',
        issuedBy: 'Confédération Nationale de la Boulangerie',
        issueDate: '2015-05-20',
        status: 'valid',
        credentialId: 'CNB-2015-7890',
      },
      {
        id: 'cert-010',
        name: 'Sourdough Expert Certification',
        issuedBy: 'Sourdough Library',
        issueDate: '2021-08-10',
        status: 'valid',
        credentialId: 'SDL-2021-3456',
      },
      {
        id: 'cert-011',
        name: 'Retarder Proofer Specialist',
        issuedBy: 'ColdProof Systems',
        issueDate: '2024-02-28',
        expiryDate: '2027-02-28',
        status: 'valid',
        credentialId: 'CP-RS-2024-111',
      },
      {
        id: 'cert-012',
        name: 'Steam Oven Expert',
        issuedBy: 'SteamBake Pro',
        issueDate: '2024-07-15',
        expiryDate: '2027-07-15',
        status: 'valid',
        credentialId: 'SB-EXP-2024-222',
      },
    ],
    assignedMachines: [
      {
        machineId: 'mach-001',
        machineName: 'Industrial Mixer M-500',
        certification: 'Industrial Mixer Level 3',
        assignedDate: '2021-01-15',
        proficiencyLevel: 'master',
      },
      {
        machineId: 'mach-004',
        machineName: 'Retarder Proofer RP-200',
        certification: 'Retarder Proofer Specialist',
        assignedDate: '2023-01-20',
        proficiencyLevel: 'master',
      },
      {
        machineId: 'mach-005',
        machineName: 'Steam Deck Oven SD-600',
        certification: 'Steam Oven Expert',
        assignedDate: '2023-07-10',
        proficiencyLevel: 'master',
      },
    ],
    performanceReviews: [
      {
        id: 'rev-004',
        date: '2024-11-10',
        reviewer: 'Production Manager',
        rating: 4.9,
        strengths: ['World-class sourdough quality', 'Process innovation', 'Mentorship excellence'],
        improvements: ['Documentation in English', 'Adaptability to new product lines'],
        goals: ['Expand sourdough variety', 'Train team on European techniques', 'Achieve 98% quality score'],
      },
    ],
    attendance: [
      { month: '2024-11', present: 22, absent: 0, late: 0, overtime: 14 },
      { month: '2024-10', present: 23, absent: 0, late: 0, overtime: 16 },
      { month: '2024-09', present: 22, absent: 0, late: 0, overtime: 12 },
      { month: '2024-08', present: 23, absent: 0, late: 0, overtime: 18 },
      { month: '2024-07', present: 22, absent: 0, late: 1, overtime: 15 },
      { month: '2024-06', present: 21, absent: 0, late: 0, overtime: 13 },
    ],
  },
  {
    id: 'emp-045',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0145',
    position: 'Pastry Chef',
    department: 'Production',
    status: 'active',
    joinDate: '2021-06-15',
    salary: 52000,
    employeeNumber: 'EMP-2021-045',
    dateOfBirth: '1992-11-05',
    address: '567 Sweet Street',
    city: 'San Francisco',
    country: 'USA',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Father',
      phone: '+1-555-0146',
    },
    bio: {
      summary: 'Creative pastry chef with expertise in cookies, brownies, and sweet baked goods. Strong background in product development and quality assurance.',
      experience: 8,
      education: 'Le Cordon Bleu - Pastry Arts Diploma',
      previousCompanies: ['Sweet Creations Bakery', 'Pastry Palace'],
    },
    skills: [
      { name: 'Pastry Making', level: 'expert', yearsOfExperience: 8 },
      { name: 'Cookie Production', level: 'expert', yearsOfExperience: 7 },
      { name: 'Recipe Development', level: 'advanced', yearsOfExperience: 5 },
      { name: 'Quality Control', level: 'advanced', yearsOfExperience: 6 },
      { name: 'Oven Operations', level: 'advanced', yearsOfExperience: 7 },
      { name: 'Food Safety', level: 'advanced', yearsOfExperience: 8 },
    ],
    certificates: [
      {
        id: 'cert-013',
        name: 'Pastry Chef Certification',
        issuedBy: 'American Culinary Federation',
        issueDate: '2019-10-20',
        status: 'valid',
        credentialId: 'ACF-PC-2019-888',
      },
      {
        id: 'cert-014',
        name: 'Oven Operations Advanced',
        issuedBy: 'BakeRight Equipment',
        issueDate: '2024-09-15',
        expiryDate: '2027-09-15',
        status: 'valid',
        credentialId: 'BR-ADV-2024-999',
      },
      {
        id: 'cert-015',
        name: 'Food Safety Manager',
        issuedBy: 'National Restaurant Association',
        issueDate: '2022-05-10',
        expiryDate: '2025-05-10',
        status: 'expiring-soon',
        credentialId: 'FSM-2022-777',
      },
    ],
    assignedMachines: [
      {
        machineId: 'mach-001',
        machineName: 'Industrial Mixer M-500',
        certification: 'Industrial Mixer Level 2',
        assignedDate: '2021-07-01',
        proficiencyLevel: 'senior',
      },
      {
        machineId: 'mach-003',
        machineName: 'Convection Oven O-800',
        certification: 'Oven Operations Advanced',
        assignedDate: '2021-06-20',
        proficiencyLevel: 'senior',
      },
      {
        machineId: 'mach-006',
        machineName: 'Cookie Depositor CD-100',
        certification: 'Cookie Production Specialist',
        assignedDate: '2021-08-10',
        proficiencyLevel: 'master',
      },
    ],
    performanceReviews: [
      {
        id: 'rev-005',
        date: '2024-06-15',
        reviewer: 'Production Manager',
        rating: 4.6,
        strengths: ['Creative product development', 'Consistent quality', 'Efficient production'],
        improvements: ['Team coordination', 'Waste reduction'],
        goals: ['Launch 3 new cookie varieties', 'Reduce ingredient waste by 12%', 'Mentor junior staff'],
      },
    ],
    attendance: [
      { month: '2024-11', present: 22, absent: 0, late: 1, overtime: 9 },
      { month: '2024-10', present: 23, absent: 0, late: 0, overtime: 11 },
      { month: '2024-09', present: 21, absent: 1, late: 2, overtime: 7 },
      { month: '2024-08', present: 22, absent: 0, late: 0, overtime: 10 },
      { month: '2024-07', present: 23, absent: 0, late: 1, overtime: 12 },
      { month: '2024-06', present: 22, absent: 0, late: 0, overtime: 8 },
    ],
  },
  {
    id: 'emp-056',
    name: 'Claire Martin',
    email: 'claire.martin@company.com',
    phone: '+1-555-0156',
    position: 'Viennoiserie Expert',
    department: 'Production',
    status: 'active',
    joinDate: '2023-04-01',
    salary: 54000,
    employeeNumber: 'EMP-2023-056',
    dateOfBirth: '1990-09-12',
    address: '890 Croissant Circle',
    city: 'San Francisco',
    country: 'USA',
    emergencyContact: {
      name: 'Jean Martin',
      relationship: 'Brother',
      phone: '+1-555-0157',
    },
    bio: {
      summary: 'Specialized in French viennoiserie with focus on croissants, pain au chocolat, and Danish pastries. Trained in traditional lamination techniques.',
      experience: 9,
      education: 'Institut National de la Boulangerie Pâtisserie - Viennoiserie Specialist',
      previousCompanies: ['Maison Kayser', 'Pain au Chocolat Bakery'],
    },
    skills: [
      { name: 'Viennoiserie', level: 'expert', yearsOfExperience: 9 },
      { name: 'Lamination', level: 'expert', yearsOfExperience: 9 },
      { name: 'Croissant Production', level: 'expert', yearsOfExperience: 9 },
      { name: 'Proofing Techniques', level: 'advanced', yearsOfExperience: 8 },
      { name: 'Quality Control', level: 'advanced', yearsOfExperience: 7 },
    ],
    certificates: [
      {
        id: 'cert-016',
        name: 'Viennoiserie Master Certification',
        issuedBy: 'INBP France',
        issueDate: '2018-12-15',
        status: 'valid',
        credentialId: 'INBP-VM-2018-555',
      },
      {
        id: 'cert-017',
        name: 'Proofing Systems Advanced',
        issuedBy: 'ProofTech Systems',
        issueDate: '2024-08-22',
        expiryDate: '2027-08-22',
        status: 'valid',
        credentialId: 'PT-ADV-2024-666',
      },
    ],
    assignedMachines: [
      {
        machineId: 'mach-002',
        machineName: 'Dough Proofer P-300',
        certification: 'Proofing Systems Advanced',
        assignedDate: '2023-04-15',
        proficiencyLevel: 'senior',
      },
      {
        machineId: 'mach-007',
        machineName: 'Laminator L-400',
        certification: 'Lamination Expert',
        assignedDate: '2023-04-10',
        proficiencyLevel: 'master',
      },
    ],
    performanceReviews: [
      {
        id: 'rev-006',
        date: '2024-04-01',
        reviewer: 'Production Manager',
        rating: 4.7,
        strengths: ['Perfect lamination technique', 'Consistent croissant quality', 'Fast production'],
        improvements: ['Cross-training in bread production', 'English documentation'],
        goals: ['Increase croissant production by 20%', 'Develop 2 new viennoiserie products', 'Train assistant'],
      },
    ],
    attendance: [
      { month: '2024-11', present: 22, absent: 0, late: 0, overtime: 10 },
      { month: '2024-10', present: 23, absent: 0, late: 0, overtime: 12 },
      { month: '2024-09', present: 22, absent: 0, late: 1, overtime: 9 },
      { month: '2024-08', present: 21, absent: 1, late: 0, overtime: 8 },
      { month: '2024-07', present: 23, absent: 0, late: 0, overtime: 11 },
      { month: '2024-06', present: 22, absent: 0, late: 0, overtime: 10 },
    ],
  },
];
