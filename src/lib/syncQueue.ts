import BackendService from '../api/services';
import { toast } from 'sonner';

const KEY = 'mdm.syncQueue.v1';

function loadQueue(): any[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveQueue(q: any[]) { try { localStorage.setItem(KEY, JSON.stringify(q)); } catch (e) {} }

export async function processQueue() {
  const q = loadQueue();
  if (!q.length) return;
  for (const item of q.slice()) {
    try {
      await BackendService.commitSchema(item.payload);
      // remove item
      const cur = loadQueue().filter(x => x.id !== item.id);
      saveQueue(cur);
      toast.success('Queued sync completed');
    } catch (e: any) {
      // stop processing on first failure
      console.warn('[syncQueue] processing failed', e);
      return;
    }
  }
}

export function enqueue(payload: any) {
  const q = loadQueue();
  const item = { id: Date.now().toString(), payload };
  q.push(item);
  saveQueue(q);
  // try to process immediately if online
  if (typeof navigator !== 'undefined' && navigator.onLine) processQueue();
  return item.id;
}

// Listen for online events to flush queue
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => { setTimeout(() => { processQueue(); }, 1000); });
}

export default { enqueue, processQueue };
