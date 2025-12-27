import { create } from 'zustand';
import { Partner } from '../context/DataContext';
import { partnersApi } from '../lib/api/partners';

interface PartnerState {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  fetchPartners: () => Promise<void>;
  addPartner: (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => Promise<void>;
  updatePartner: (id: string, partner: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
}

export const usePartnerStore = create<PartnerState>((set, get) => ({
  partners: [],
  loading: false,
  error: null,
  
  fetchPartners: async () => {
    set({ loading: true, error: null });
    try {
      const data = await partnersApi.getAll();
      set({ partners: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch partners', loading: false });
    }
  },

  addPartner: async (partner) => {
    set({ loading: true, error: null });
    try {
       const newPartner = await partnersApi.create(partner);
       set(state => ({ 
           partners: [...state.partners, newPartner],
           loading: false 
       }));
    } catch (error) {
       set({ error: 'Failed to create partner', loading: false });
    }
  },

  updatePartner: async (id, partner) => {
      set({ loading: true, error: null });
      try {
          const updated = await partnersApi.update(id, partner);
          set(state => ({
              partners: state.partners.map(p => p.id === id ? { ...p, ...updated } : p),
              loading: false
          }));
      } catch (error) {
          set({ error: 'Failed to update partner', loading: false });
      }
  },

  deletePartner: async (id) => {
      set({ loading: true, error: null });
      try {
          await partnersApi.delete(id);
          set(state => ({
              partners: state.partners.filter(p => p.id !== id),
              loading: false
          }));
      } catch (error) {
          set({ error: 'Failed to delete partner', loading: false });
      }
  }
}));
