// Mock data hooks for ERP system
import { mockProducts } from './mockProducts';
import { mockMachines } from './mockMachines';
import { mockEmployees } from './mockEmployees';
import { mockLeads, pipelineStages } from './mockCRM';
import { mockInvoices, invoiceStats } from './mockInvoices';
import { mockProjects } from './mockProjects';
import { mockMaintenanceRecords, maintenanceStats } from './mockMaintenance';
import { mockQualityControlRecords, qcStats } from './mockQualityControl';

export function useProducts() {
  return {
    products: mockProducts,
    loading: false,
    error: null,
  };
}

export function useMachines() {
  return {
    machines: mockMachines,
    loading: false,
    error: null,
  };
}

export function useEmployees() {
  return {
    employees: mockEmployees,
    loading: false,
    error: null,
  };
}

export function useLeads() {
  return {
    leads: mockLeads,
    pipelineStages,
    loading: false,
    error: null,
  };
}

export function useInvoices() {
  return {
    invoices: mockInvoices,
    stats: invoiceStats,
    loading: false,
    error: null,
  };
}

export function useProjects() {
  return {
    projects: mockProjects,
    loading: false,
    error: null,
  };
}

export function useMaintenance() {
  return {
    records: mockMaintenanceRecords,
    stats: maintenanceStats,
    loading: false,
    error: null,
  };
}

export function useQualityControl() {
  return {
    records: mockQualityControlRecords,
    stats: qcStats,
    loading: false,
    error: null,
  };
}

// Simulated loading states
export function useLoadingState(delay: number = 1000) {
  return {
    loading: false,
    error: null,
  };
}
