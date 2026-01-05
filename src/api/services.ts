import apiClient, { cancelAndCreateSignal, setBaseURL } from './client';

const PATHS = {
  health: '/api/v1/health',
  register: '/api/v1/mdm/register',
  telemetry: '/api/v1/telemetry/stream',
};

export const BackendService = {
  async ping() {
    const signal = cancelAndCreateSignal('ping');
    const res = await apiClient.get(PATHS.health, { signal });
    return res.data;
  },

  async commitSchema(schema: any) {
    const signal = cancelAndCreateSignal('commitSchema');
    const res = await apiClient.post(PATHS.register, schema, { signal });
    return res.data;
  },

  async getAll() {
    const signal = cancelAndCreateSignal('getAll');
    const res = await apiClient.get('/api/v1/mdm/all', { signal });
    return res.data;
  },

  async updateEntity(entityId: string, delta: any) {
    const signal = cancelAndCreateSignal(`update:${entityId}`);
    const res = await apiClient.post('/api/v1/mdm/update', { entityId, delta }, { signal });
    return res.data;
  },

  async get(resource: string, id: string) {
    const signal = cancelAndCreateSignal(`get:${resource}:${id}`);
    const res = await apiClient.get(`/api/v1/${resource}/${id}`, { signal });
    return res.data;
  },

  async getSystemSnapshot() {
    const signal = cancelAndCreateSignal('system:snapshot');
    const res = await apiClient.get('/api/v1/system/snapshot', { signal });
    return res.data;
  },

  setBaseUrl(url: string) {
    setBaseURL(url);
  },

  // Generic REST helpers (resource name should be plural, e.g. 'partners')
  async list(resource: string, params?: any) {
    const signal = cancelAndCreateSignal(`list:${resource}`);
    const res = await apiClient.get(`/api/v1/${resource}`, { params, signal });
    return res.data;
  },

  async create(resource: string, payload: any) {
    const signal = cancelAndCreateSignal(`create:${resource}`);
    const res = await apiClient.post(`/api/v1/${resource}`, payload, { signal });
    return res.data;
  },

  async update(resource: string, id: string, payload: any) {
    const signal = cancelAndCreateSignal(`update:${resource}:${id}`);
    const res = await apiClient.put(`/api/v1/${resource}/${id}`, payload, { signal });
    return res.data;
  },

  async remove(resource: string, id: string) {
    const signal = cancelAndCreateSignal(`delete:${resource}:${id}`);
    const res = await apiClient.delete(`/api/v1/${resource}/${id}`, { signal });
    return res.data;
  },

  // SSE telemetry stream helper - returns EventSource instance (caller should close)
  createTelemetryStream(onMessage: (data: any) => void, onError?: (err: any) => void) {
    try {
      const url = (apiClient.defaults.baseURL || '').replace(/\/$/, '') + PATHS.telemetry;
      const es = new EventSource(url);
      es.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          onMessage(parsed);
        } catch (e) {
          onMessage(ev.data as any);
        }
      };
      es.onerror = (err) => {
        if (onError) onError(err);
      };
      return es;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  },
};

export default BackendService;
