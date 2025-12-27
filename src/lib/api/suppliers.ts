import { Supplier } from '../../context/DataContext';
import { initialSuppliers } from '../../data/mockSuppliers';

export const suppliersApi = {
  getAll: async (): Promise<Supplier[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(initialSuppliers);
  }
};
