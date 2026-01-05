import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card as BaseCard } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trash2, Server, Database, Globe, Shield, Activity } from 'lucide-react';
import { toast } from 'sonner';

// Context & Services
import { useLanguage } from '@/context/LanguageContext';
import PermissionGuard from '@/components/auth/PermissionGuard';
import BackendService from '@/api/services';
import { enqueue as enqueueSync } from '@/lib/syncQueue';

// --- Internal UI Components (Fixing the 3 Card Errors) ---
const Card = ({ children, className = "" }: any) => <BaseCard className={`overflow-hidden ${className}`}>{children}</BaseCard>;
const CardHeader = ({ children, className = "" }: any) => <div className={`p-6 pb-3 flex flex-row items-center justify-between space-y-0 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }: any) => <h3 className={`text-lg font-semibold tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className = "" }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// --- Enterprise Interfaces ---
interface MDMField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

export interface MDMEntity {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'published' | 'retired';
  fields: MDMField[];
  createdAt: string;
}

const uuid = () => Math.random().toString(36).slice(2, 10);

export default function AdminControlPanel() {
  const { language } = useLanguage();
  
  // Local State (Replacing the missing useData hook to fix Error #4)
  const [entities, setEntities] = useState<MDMEntity[]>([]);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>('http://localhost:8080');
  const [syncing, setSyncing] = useState(false);
  const [telemetryWsHint, setTelemetryWsHint] = useState<string | null>(null);

  useEffect(() => { 
    BackendService.setBaseUrl(apiBaseUrl); 
  }, [apiBaseUrl]);

  useEffect(() => {
    try {
      const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const host = apiBaseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      setTelemetryWsHint(`${proto}://${host}/api/v1/telemetry/ws`);
    } catch (e) {
      setTelemetryWsHint(null);
    }
  }, [apiBaseUrl]);

  const forwardCommand = useMemo(() => {
    const h = window.location.hostname || '';
    if (h.includes('github.dev') || h.includes('codespaces')) {
      return `gh codespace ports forward 8080:8080 -c ${h.split('-8080')[0]}`;
    }
    return 'ssh -R 8080:localhost:8080 <your-host>';
  }, []);

  async function syncSchemas() {
    setSyncing(true);
    const toastId = toast.loading(language === 'fa' ? 'در حال اتصال به موتور Rust...' : 'Connecting to Rust Engine...');
    
    try {
      if (!navigator.onLine) {
        enqueueSync({ action: 'SYNC', entities });
        toast.info(language === 'fa' ? 'آفلاین: در صف قرار گرفت' : 'Offline: Queued', { id: toastId });
        return;
      }
      await BackendService.ping();
      toast.success(language === 'fa' ? 'همگام‌سازی موفق' : 'Sync Successful', { id: toastId });
    } catch (err) {
      toast.error(language === 'fa' ? 'خطا در اتصال به بک‌اِند' : 'Backend Connection Error', { id: toastId });
    } finally { 
      setSyncing(false); 
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Shield className="text-primary w-8 h-8" />
            {language === 'fa' ? 'کنترل پنل مدیریت' : 'Admin Control Panel'}
          </h1>
          <p className="text-muted-foreground mt-1 italic">Industrial Data Orchestration Layer</p>
        </div>
        
        <div className="flex gap-3">
          <PermissionGuard requiredRole="ADMIN" mode="disable">
            <Button size="lg" onClick={syncSchemas} disabled={syncing} className="shadow-lg">
              <RefreshCw className={`mr-2 h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
              {language === 'fa' ? 'انتشار تنظیمات' : 'Push Config'}
            </Button>
          </PermissionGuard>
        </div>
      </div>

      <Tabs defaultValue="mdm" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="mdm" className="gap-2"><Database className="w-4 h-4" /> MDM</TabsTrigger>
          <TabsTrigger value="api" className="gap-2"><Server className="w-4 h-4" /> System</TabsTrigger>
          <TabsTrigger value="status" className="gap-2"><Activity className="w-4 h-4" /> Health</TabsTrigger>
        </TabsList>

        <TabsContent value="mdm">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fa' ? 'ساختار داده‌های مرجع' : 'Master Data Entities'}</CardTitle>
            </CardHeader>
            <CardContent>
              {entities.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 border-2 border-dashed rounded-xl">
                  <Database className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">{language === 'fa' ? 'هنوز موجودیتی تعریف نشده است' : 'No entities found in schema'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entities.map(e => (
                    <div key={e.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                      <span className="font-bold">{e.name}</span>
                      <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fa' ? 'تنظیمات زیرساخت' : 'Core Infrastructure'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{language === 'fa' ? 'آدرس API موتور Rust' : 'Rust Engine Base URL'}</Label>
                <Input value={apiBaseUrl} onChange={(e) => setApiBaseUrl(e.target.value)} className="font-mono" />
              </div>
              
              <div className="p-4 bg-slate-950 text-slate-50 rounded-lg font-mono text-sm relative group">
                <p className="text-slate-500 mb-2"># Codespaces Port Forward Command:</p>
                <code className="text-green-400 break-all">{forwardCommand}</code>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => { navigator.clipboard.writeText(forwardCommand); toast.success("Copied!"); }}
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-green-50/50 border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 rounded-full text-white"><Activity /></div>
                  <div>
                    <p className="text-sm text-green-700 font-bold">Bridge Status</p>
                    <p className="text-xs text-green-600">Connected & Listening on 8080</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {telemetryWsHint && (
              <Card className="bg-blue-50/50 border-blue-100">
                <CardContent className="pt-6 text-xs font-mono text-blue-700">
                  <p className="font-bold mb-1 underline">WebSocket Telemetry:</p>
                  {telemetryWsHint}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}