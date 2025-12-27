import { Result, ErrorInfo } from '../../types/api';

const _env = (import.meta as any).env || {};
const BASE_URL = _env.VITE_API_URL || '/api';
const DEFAULT_TIMEOUT = Number(_env.VITE_API_TIMEOUT ?? 10000);

function buildError(code: string | number, message: string, details?: any, retryable = false): ErrorInfo {
  return { code, message, details, retryable };
}

async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]) as T;
  } finally {
    clearTimeout(timer!);
  }
}

async function safeJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    return text;
  }
}

async function request<T>(method: string, endpoint: string, body?: any, timeoutMs = DEFAULT_TIMEOUT): Promise<Result<T>> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const opts: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);

    // Perform fetch with timeout
    const res = await timeout(fetch(url, opts), timeoutMs);

    if (!res.ok) {
      const payload = await safeJson(res as Response);
      const err: ErrorInfo = buildError(res.status, `HTTP ${res.status} - ${res.statusText}`, payload, false);
      return { ok: false, error: err };
    }

    const data = await safeJson(res as Response);
    return { ok: true, data: data as T };
  } catch (e: any) {
    // Map known error types
    if (e && e.message === 'timeout') {
      return { ok: false, error: buildError('timeout', 'Request timed out', undefined, true) };
    }
    return { ok: false, error: buildError('network_error', e?.message ?? 'Network error', e, true) };
  }
}

export const apiClient = {
  get: async <T>(endpoint: string): Promise<Result<T>> => {
    console.log(`[API] GET ${endpoint}`);
    return request<T>('GET', endpoint);
  },
  post: async <T>(endpoint: string, data: any): Promise<Result<T>> => {
    console.log(`[API] POST ${endpoint}`);
    return request<T>('POST', endpoint, data);
  },
  put: async <T>(endpoint: string, data: any): Promise<Result<T>> => {
    console.log(`[API] PUT ${endpoint}`);
    return request<T>('PUT', endpoint, data);
  },
  delete: async <T>(endpoint: string): Promise<Result<T>> => {
    console.log(`[API] DELETE ${endpoint}`);
    return request<T>('DELETE', endpoint);
  },
};

export default apiClient;
