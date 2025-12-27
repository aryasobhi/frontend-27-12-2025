/*
  Status: SKELETON
  Reason: Products api module uses the typed client but falls back to mocks; backend parity is not guaranteed.
  Allowed actions: authoring-only (safe for development, not production-ready)
*/

import { Product } from '../../types/api';
import { mockProducts } from '../../data/mockProducts';
import apiClient from './client';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    // Try the typed api client first. If it fails (mock-first project), fall back to mock data.
    const res = await apiClient.get<Product[]>('/products');
    if (res && res.ok) return res.data;

    // Log deterministic error if present
    if (res && !res.ok) {
      console.warn('[productsApi] apiClient failed, falling back to mockProducts', res);
    } else {
      console.warn('[productsApi] apiClient returned unexpected result, falling back to mockProducts', res);
    }

    // Fallback to existing mock behavior with a small artificial delay to simulate latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts as unknown as Product[];
  },
  getById: async (id: string): Promise<Product | undefined> => {
    const res = await apiClient.get<Product>(`/products/${id}`);
    if (res && res.ok) return res.data;

    await new Promise(resolve => setTimeout(resolve, 300));
    return (mockProducts as unknown as Product[]).find(p => p.id === id);
  }
};
