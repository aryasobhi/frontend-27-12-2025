import axios, { AxiosHeaders } from 'axios';

const DEFAULT_TENANT = 'factory_001';

const apiClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Map of abort controllers per key
const controllers: Record<string, AbortController | null> = {};

export function cancelAndCreateSignal(key = 'default') {
  try {
    if (controllers[key]) controllers[key]!.abort();
  } catch (e) {}
  const c = new AbortController();
  controllers[key] = c;
  return c.signal;
}

export function setBaseURL(url: string) {
  apiClient.defaults.baseURL = url;
}

// Allow the app to provide an auth token getter (e.g. from AuthContext).
let authGetter: (() => string | null) | null = null;
export function setAuthGetter(fn: () => string | null) {
  authGetter = fn;
}

// simple inflight counter to power a global loading UI
let inflight = 0;
function emitLoading() {
  try {
    window.dispatchEvent(new CustomEvent('api:loading', { detail: { count: inflight } }));
  } catch (e) {}
}

function transformBigInts(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
  if (typeof obj === 'number') {
    // convert unsafe integers to string
    if (!Number.isSafeInteger(obj)) return obj.toString();
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(transformBigInts);
  if (typeof obj === 'object') {
    const out: any = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      // special-case likely long fields by name
      if (typeof v === 'number' && !Number.isSafeInteger(v)) {
        out[k] = v.toString();
      } else if (typeof v === 'bigint') {
        out[k] = v.toString();
      } else {
        out[k] = transformBigInts(v);
      }
    }
    return out;
  }
  return obj;
}

// Request interceptor: add tenant header and ensure JSON content-type and transform bigints
apiClient.interceptors.request.use((cfg) => {
  // increment inflight and emit
  try { inflight = Math.max(0, inflight + 1); emitLoading(); } catch (e) {}
  // Ensure headers object is an AxiosHeaders instance (avoid type mismatch)
  if (!cfg.headers) {
    cfg.headers = new AxiosHeaders();
  } else if (!(cfg.headers instanceof AxiosHeaders)) {
    try {
      cfg.headers = new AxiosHeaders(cfg.headers as any);
    } catch (e) {
      // fallback for older axios/types versions
      cfg.headers = { ...(cfg.headers as any) } as any;
    }
  }
  if (!cfg.headers['X-Tenant-ID']) cfg.headers['X-Tenant-ID'] = DEFAULT_TENANT;
  cfg.headers['Content-Type'] = 'application/json';

  // Attach Authorization header from localStorage token if present
  try {
    let token: string | null = null;
    if (authGetter) {
      try { token = authGetter(); } catch (e) { token = null; }
    }
    if (!token && typeof window !== 'undefined') {
      try { token = localStorage.getItem('auth.token'); } catch (e) { token = null; }
    }
    if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
  } catch (e) {}

  // Transform data for bigints / unsafe ints
  if (cfg.data && typeof cfg.data === 'object') {
    try {
      cfg.data = transformBigInts(cfg.data);
    } catch (e) {
      // swallow
    }
  }
  return cfg;
});

// Response interceptor: map industrial errors
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    try { inflight = Math.max(0, inflight - 1); emitLoading(); } catch (e) {}
    if (!err || !err.response) return Promise.reject(err);
    const status = err.response.status;
    const payload = err.response.data;
    let serverMessage = undefined;
    if (payload && typeof payload === 'object') {
      serverMessage = payload.error || payload.message || payload.detail || JSON.stringify(payload);
    } else if (typeof payload === 'string') {
      serverMessage = payload;
    }

    if (status === 422) {
      const e = new Error(serverMessage || 'Schema Validation Error in Rust Bridge');
      (e as any).code = 'SCHEMA_VALIDATION';
      (e as any).serverMessage = serverMessage;
      return Promise.reject(e);
    }

    if (status === 503) {
      const e = new Error(serverMessage || 'C++ Engine Busy/Offline');
      (e as any).code = 'ENGINE_BUSY';
      (e as any).serverMessage = serverMessage;
      return Promise.reject(e);
    }

    if (status === 401) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth.token');
          localStorage.removeItem('auth.role');
          // redirect to login
          window.location.href = '/login';
        }
      } catch (e) {}
    }

    return Promise.reject(err);
  }
);

// also decrement on successful responses
apiClient.interceptors.response.use((res) => { try { inflight = Math.max(0, inflight - 1); emitLoading(); } catch (e) {} return res; }, (e) => Promise.reject(e));

export default apiClient;

export { apiClient };
