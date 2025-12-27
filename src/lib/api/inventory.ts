import { InventoryItem } from '../../context/DataContext';
import { initialInventory } from '../../data/mockInventory';

export const inventoryApi = {
  getAll: async (): Promise<InventoryItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(initialInventory);
  }
};
