import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import BackendService from '../api/services';
import { useEffect, useState } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppLayout({ children, activeView, setActiveView }: AppLayoutProps) {
  return (
  <div className="flex h-screen bg-gradient-to-br from-damask via-rose to-damask text-rosary type-body">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden bg-white/5 backdrop-blur-xl relative">
        <Header />
        <main className="flex-1 overflow-y-auto bg-transparent">
          {children}
        </main>
        <footer className="p-2 border-t border-white/10 text-xs text-rosary/60 flex items-center justify-end">
          <ConnectionBadge />
        </footer>
      </div>
    </div>
  );
}

function ConnectionBadge() {
  const [engineOk, setEngineOk] = useState<boolean | null>(null);
  const [online, setOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const ping = async () => {
      try {
        await BackendService.ping();
        setEngineOk(true);
      } catch (e) {
        setEngineOk(false);
      }
    };
    ping();
    const id = setInterval(ping, 30000);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { clearInterval(id); window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, []);

  const stable = online && engineOk;
  return (
    <div className="flex items-center gap-3">
      <div className={`px-2 py-1 rounded-md ${stable ? 'bg-green-600/20 text-green-300' : 'bg-yellow-700/20 text-yellow-300'}`}>{stable ? 'Stable' : 'Unstable'}</div>
    </div>
  );
}
