// Mock CRM Data
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'cold-call' | 'event' | 'social-media';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value: number;
  probability: number;
  assignedTo: string;
  createdDate: string;
  lastContact: string;
  nextFollowUp?: string;
  notes: string;
  activities: {
    id: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    date: string;
    description: string;
    user: string;
  }[];
  stage: string;
}

export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Robert Williams',
    company: 'Downtown Cafe Chain',
    email: 'robert.williams@downtowncafe.com',
    phone: '+1-555-7001',
    source: 'referral',
    status: 'negotiation',
    value: 125000,
    probability: 75,
    assignedTo: 'Sales Manager',
    createdDate: '2024-10-15',
    lastContact: '2024-12-10',
    nextFollowUp: '2024-12-16',
    notes: 'Interested in wholesale bread supply for 15 locations. Needs competitive pricing and reliable delivery.',
    activities: [
      {
        id: 'act-001',
        type: 'meeting',
        date: '2024-12-10',
        description: 'Product tasting session at main location. Positive feedback on sourdough and croissants.',
        user: 'Sales Manager',
      },
      {
        id: 'act-002',
        type: 'email',
        date: '2024-12-05',
        description: 'Sent detailed pricing proposal and delivery schedule',
        user: 'Sales Manager',
      },
      {
        id: 'act-003',
        type: 'call',
        date: '2024-11-28',
        description: 'Initial discussion about requirements and volume',
        user: 'Sales Manager',
      },
    ],
    stage: 'Proposal Sent',
  },
  {
    id: 'lead-002',
    name: 'Jennifer Lee',
    company: 'Healthy Eats Supermarket',
    email: 'jennifer.lee@healthyeats.com',
    phone: '+1-555-7002',
    source: 'website',
    status: 'qualified',
    value: 85000,
    probability: 60,
    assignedTo: 'Sarah Thompson',
    createdDate: '2024-11-20',
    lastContact: '2024-12-11',
    nextFollowUp: '2024-12-15',
    notes: 'Looking for organic and whole grain bread options. Wants to start with 3 store pilot.',
    activities: [
      {
        id: 'act-004',
        type: 'email',
        date: '2024-12-11',
        description: 'Sent product catalog with organic line details',
        user: 'Sarah Thompson',
      },
      {
        id: 'act-005',
        type: 'call',
        date: '2024-12-01',
        description: 'Discovery call - discussed organic certifications and delivery logistics',
        user: 'Sarah Thompson',
      },
    ],
    stage: 'Discovery',
  },
  {
    id: 'lead-003',
    name: 'Michael Chen',
    company: 'Corporate Catering Solutions',
    email: 'michael.chen@corpcatering.com',
    phone: '+1-555-7003',
    source: 'event',
    status: 'proposal',
    value: 220000,
    probability: 80,
    assignedTo: 'Sales Manager',
    createdDate: '2024-09-10',
    lastContact: '2024-12-12',
    nextFollowUp: '2024-12-17',
    notes: 'Large corporate catering contract for tech companies. Needs custom packaging and daily delivery.',
    activities: [
      {
        id: 'act-006',
        type: 'meeting',
        date: '2024-12-12',
        description: 'Contract review meeting. Discussed terms and service levels. Very interested.',
        user: 'Sales Manager',
      },
      {
        id: 'act-007',
        type: 'email',
        date: '2024-12-08',
        description: 'Sent revised proposal with custom packaging options',
        user: 'Sales Manager',
      },
      {
        id: 'act-008',
        type: 'call',
        date: '2024-11-25',
        description: 'Discussed customization requirements and branding',
        user: 'Sales Manager',
      },
    ],
    stage: 'Negotiation',
  },
  {
    id: 'lead-004',
    name: 'Amanda Rodriguez',
    company: 'Artisan Market Co.',
    email: 'amanda.r@artisanmarket.com',
    phone: '+1-555-7004',
    source: 'social-media',
    status: 'contacted',
    value: 45000,
    probability: 40,
    assignedTo: 'David Kim',
    createdDate: '2024-12-01',
    lastContact: '2024-12-09',
    nextFollowUp: '2024-12-14',
    notes: 'Boutique grocery store interested in premium artisan breads for weekend farmer\'s market.',
    activities: [
      {
        id: 'act-009',
        type: 'call',
        date: '2024-12-09',
        description: 'First call - discussed product interest and market positioning',
        user: 'David Kim',
      },
      {
        id: 'act-010',
        type: 'email',
        date: '2024-12-03',
        description: 'Initial outreach email sent',
        user: 'David Kim',
      },
    ],
    stage: 'Initial Contact',
  },
  {
    id: 'lead-005',
    name: 'Thomas Anderson',
    company: 'Hotel Grandeur',
    email: 'thomas.anderson@hotelgrandeur.com',
    phone: '+1-555-7005',
    source: 'referral',
    status: 'new',
    value: 180000,
    probability: 25,
    assignedTo: 'Sarah Thompson',
    createdDate: '2024-12-08',
    lastContact: '2024-12-08',
    nextFollowUp: '2024-12-14',
    notes: 'Luxury hotel chain looking for high-end bread and pastry supplier for breakfast service.',
    activities: [
      {
        id: 'act-011',
        type: 'note',
        date: '2024-12-08',
        description: 'Lead received from existing client recommendation',
        user: 'Sarah Thompson',
      },
    ],
    stage: 'New Lead',
  },
  {
    id: 'lead-006',
    name: 'Lisa Martinez',
    company: 'School District 45',
    email: 'lisa.martinez@district45.edu',
    phone: '+1-555-7006',
    source: 'cold-call',
    status: 'qualified',
    value: 95000,
    probability: 55,
    assignedTo: 'David Kim',
    createdDate: '2024-11-05',
    lastContact: '2024-12-10',
    nextFollowUp: '2024-12-18',
    notes: 'School lunch program. Need whole grain options that meet USDA standards.',
    activities: [
      {
        id: 'act-012',
        type: 'meeting',
        date: '2024-12-10',
        description: 'Met with nutrition committee. Presented whole grain product line.',
        user: 'David Kim',
      },
      {
        id: 'act-013',
        type: 'call',
        date: '2024-11-22',
        description: 'Qualified requirements and budget approval process',
        user: 'David Kim',
      },
    ],
    stage: 'Qualification',
  },
];

export const pipelineStages = [
  { id: 'new', name: 'New Lead', leads: mockLeads.filter(l => l.status === 'new') },
  { id: 'contacted', name: 'Contacted', leads: mockLeads.filter(l => l.status === 'contacted') },
  { id: 'qualified', name: 'Qualified', leads: mockLeads.filter(l => l.status === 'qualified') },
  { id: 'proposal', name: 'Proposal', leads: mockLeads.filter(l => l.status === 'proposal') },
  { id: 'negotiation', name: 'Negotiation', leads: mockLeads.filter(l => l.status === 'negotiation') },
  { id: 'won', name: 'Won', leads: mockLeads.filter(l => l.status === 'won') },
];
