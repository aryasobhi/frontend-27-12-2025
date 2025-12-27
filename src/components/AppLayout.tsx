import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

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
      </div>
    </div>
  );
}
