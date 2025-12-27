import { Customer } from '../../context/DataContext';
import { initialCustomers } from '../../data/mockCustomers';

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(initialCustomers);
  }
};
