// Adapter selection config
const _env = (import.meta as any).env || {};
export const ADAPTER_MODE: 'mock' | 'api' = (_env.VITE_ADAPTER_MODE as 'mock' | 'api') || 'mock';

export function isMock() {
  return ADAPTER_MODE === 'mock';
}

export default { ADAPTER_MODE, isMock };
