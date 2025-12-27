import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { I18nProvider } from './lib/i18n';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './components/Dashboard';
import { PartnerList } from './components/PartnerList';
import { OrderManagement } from './components/OrderManagement';
import { Products } from './components/Products';
import { Analytics } from './components/Analytics';
import { QualityControl } from './components/QualityControl';
import { Sales } from './components/Sales';
import { Accounting } from './components/Accounting';
import { Machines } from './components/Machines';
import { BOM } from './components/BOM';
import { Formulation } from './components/Formulation';
import { Projects } from './components/Projects';
import MDMRegistry from './pages/ModuleBuilder';
import { DynamicModuleLoader } from './components/DynamicModuleLoader';
// New page imports
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MachineListPage } from './pages/MachineListPage';
import { MachineDetailPage } from './pages/MachineDetailPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { EmployeeDetailPage } from './pages/EmployeeDetailPage';
import { MaintenanceListPage } from './pages/MaintenanceListPage';
import { MaintenanceDetailPage } from './pages/MaintenanceDetailPage';
import { QualityControlListPage } from './pages/QualityControlListPage';
import { QualityControlDetailPage } from './pages/QualityControlDetailPage';
import { BOMEditorPage } from './pages/BOMEditorPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { InvoiceListPage } from './pages/InvoiceListPage';
import { InvoiceDetailPage } from './pages/InvoiceDetailPage';
import { PartnerDetailPage } from './pages/PartnerDetailPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { useParams } from 'react-router-dom';

function DynamicModuleLoaderProxy() {
  const { moduleId } = useParams();
  return <DynamicModuleLoader moduleId={moduleId || ''} />;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState('dashboard');
  const [subView, setSubView] = useState<{ type: string; id?: string } | null>(null);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      setActiveView('dashboard');
    } else {
      // For legacy routes, sync URL to state
      // This allows browser back/forward buttons to work for unmigrated views
      const view = location.pathname.substring(1); // remove leading slash
      if (view) {
        // Handle sub-views if needed, or simple views
        // Simple heuristic for now: take the first segment
        const mainView = view.split('/')[0];
        setActiveView(mainView);
      }
    }
  }, [location]);

  const handleSetActiveView = (view: string) => {
    if (view === 'dashboard') {
      navigate('/');
    } else {
      // For legacy views, navigate to the path so URL updates
      // The "*" route will catch this and renderView() will use the updated activeView
      navigate(`/${view}`);
    }
  };

  const handleViewProduct = (productId: string) => {
    setSubView({ type: 'product-detail', id: productId });
  };

  const handleViewMachine = (machineId: string) => {
    setSubView({ type: 'machine-detail', id: machineId });
  };

  const handleViewEmployee = (employeeId: string) => {
    setSubView({ type: 'employee-detail', id: employeeId });
  };

  const handleViewMaintenance = (recordId: string) => {
    setSubView({ type: 'maintenance-detail', id: recordId });
  };

  const handleViewQC = (recordId: string) => {
    setSubView({ type: 'quality-detail', id: recordId });
  };

  const handleViewProject = (projectId: string) => {
    setSubView({ type: 'project-detail', id: projectId });
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSubView({ type: 'invoice-detail', id: invoiceId });
  };

  const handleViewPartner = (partnerId: string) => {
    setSubView({ type: 'partner-detail', id: partnerId });
  };

  const handleViewOrder = (orderId: string) => {
    setSubView({ type: 'order-detail', id: orderId });
  };

  const handleBack = () => {
    setSubView(null);
  };

  const renderView = () => {
    // Handle subviews first
    if (subView) {
      switch (subView.type) {
        case 'product-detail':
          return <ProductDetailPage productId={subView.id!} onBack={handleBack} />;
        case 'machine-detail':
          return <MachineDetailPage machineId={subView.id!} onBack={handleBack} />;
        case 'employee-detail':
          return <EmployeeDetailPage employeeId={subView.id!} onBack={handleBack} />;
        case 'maintenance-detail':
          return <MaintenanceDetailPage recordId={subView.id!} onBack={handleBack} />;
        case 'quality-detail':
          return <QualityControlDetailPage recordId={subView.id!} onBack={handleBack} />;
        case 'project-detail':
          return <ProjectDetailPage projectId={subView.id!} onBack={handleBack} />;
        case 'invoice-detail':
          return <InvoiceDetailPage invoiceId={subView.id!} onBack={handleBack} />;
        case 'partner-detail':
          return <PartnerDetailPage partnerId={subView.id!} onBack={handleBack} />;
        case 'order-detail':
          return <OrderDetailPage orderId={subView.id!} onBack={handleBack} />;
        case 'bom-editor':
          return <BOMEditorPage />;
        default:
          break;
      }
    }

    // Main views
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'builder':
        return <MDMRegistry />;
      default:
        // Attempt to load as a dynamic module if no specialized view exists
        return <DynamicModuleLoader moduleId={activeView} />;
    }
  };

  return (
    <I18nProvider defaultLanguage="fa">
      <LanguageProvider>
        <DataProvider>
          <AppLayout activeView={activeView} setActiveView={handleSetActiveView}>
            <div className="min-h-full text-rosary type-body" dir="rtl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/builder" element={<MDMRegistry />} />
                <Route path="/:moduleId" element={<DynamicModuleLoaderProxy />} />
                <Route path="*" element={renderView()} />
              </Routes>
            </div>
          </AppLayout>
        </DataProvider>
      </LanguageProvider>
    </I18nProvider>
  );
}
