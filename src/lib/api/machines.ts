import { Machine } from '../../context/DataContext';
import { mockMachines } from '../../data/mockMachines';

export const machinesApi = {
  getAll: async (): Promise<Machine[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(mockMachines as unknown as Machine[]);
  },
  getById: async (id: string): Promise<Machine | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(mockMachines.find(m => m.id === id) as unknown as Machine);
  }
};
