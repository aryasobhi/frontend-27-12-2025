import { Partner } from '../../context/DataContext';
import { initialPartners } from '../../data/mockPartners';

// Wrapper to simulate API calls
export const partnersApi = {
  getAll: async (): Promise<Partner[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(initialPartners); // We might need to export this from DataContext or move it
  },
  getById: async (id: string): Promise<Partner | undefined> => {
     await new Promise(resolve => setTimeout(resolve, 500));
     return Promise.resolve(initialPartners.find(p => p.id === id));
  },
  create: async (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>): Promise<Partner> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Just mock return
      return {
          ...partner,
          id: Date.now().toString(),
          totalOrders: 0,
          revenue: 0,
          rating: 0
      };
  },
  update: async (id: string, partner: Partial<Partner>): Promise<Partner> => {
       await new Promise(resolve => setTimeout(resolve, 500));
       return { id, ...partner } as Partner;
  },
  delete: async (id: string): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve();
  }
};
