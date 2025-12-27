/*
  Status: SKELETON
  Reason: DynamicModuleLoader is an authoring utility that dynamically maps JSON configs to summary components; not intended for production runtime until contracts stabilize.
  Allowed actions: authoring-only (safe to edit for demos and local authoring; avoid production wiring)
*/

import React, { useState, useEffect } from 'react';
import { UniversalModuleTemplate } from './layout/UniversalModuleTemplate';
import { useData } from '../context/DataContext';

// Import JSON configs
import productionConfig from '../configs/production.json';
import purchasingConfig from '../configs/purchasing.json';
import maintenanceConfig from '../configs/maintenance.json';
import inventoryConfig from '../configs/inventory.json';
import crmConfig from '../configs/crm.json';
import qualityConfig from '../configs/quality.json';
import supplyChainConfig from '../configs/supply-chain.json';
import fsmConfig from '../configs/fsm.json';
import hrConfig from '../configs/hr.json';
import financeConfig from '../configs/finance.json';
import procurementConfig from '../configs/procurement.json';
import shippingConfig from '../configs/shipping.json';
import salesConfig from '../configs/sales.json';
import accountingConfig from '../configs/accounting.json';
import machinesConfig from '../configs/machines.json';
import bomConfig from '../configs/bom.json';
import formulationConfig from '../configs/formulation.json';
import projectsConfig from '../configs/projects.json';
import invoicesConfig from '../configs/invoices.json';
import analyticsConfig from '../configs/analytics.json';
import partnersConfig from '../configs/partners.json';
import ordersConfig from '../configs/orders.json';
import productsConfig from '../configs/products.json';

// Import specialized extra content (if we move them to separate files or keep them in registry)
// For now, we'll keep the specialized components but pass the config to them if they are standardized
// OR we can render UniversalModuleTemplate here directly for the true "dynamic" feel

// Import Summary components
import { ProductionSummary } from './modules/ProductionSummary';
import { MaintenanceSummary } from './modules/MaintenanceSummary';
import { CRMSummary } from './modules/CRMSummary';
import { InventorySummary } from './modules/InventorySummary';
import { PurchasingSummary } from './modules/PurchasingSummary';
import { QCSummary } from './modules/QCSummary';
import { FinanceSummary } from './modules/FinanceSummary';
import { BOMSummary } from './modules/BOMSummary';
import { HRSummary } from './modules/HRSummary';
import { SalesSummary } from './modules/SalesSummary';
import { ProjectSummary } from './modules/ProjectSummary';
import { SupplyChainSummary } from './modules/SupplyChainSummary';

// Import specialized forms
import { PurchaseOrderForm } from './PurchaseOrderForm';

const configRegistry: Record<string, any> = {
  production: productionConfig,
  purchasing: purchasingConfig,
  maintenance: maintenanceConfig,
  inventory: inventoryConfig,
  crm: crmConfig,
  quality: qualityConfig,
  'supply-chain': supplyChainConfig,
  fsm: fsmConfig,
  hr: hrConfig,
  finance: financeConfig,
  procurement: procurementConfig,
  shipping: shippingConfig,
  sales: salesConfig,
  accounting: accountingConfig,
  machines: machinesConfig,
  bom: bomConfig,
  formulation: formulationConfig,
  projects: projectsConfig,
  invoices: invoicesConfig,
  analytics: analyticsConfig,
  partners: partnersConfig,
  orders: ordersConfig,
  products: productsConfig,
};

interface DynamicModuleLoaderProps {
  moduleId: string;
}

export function DynamicModuleLoader({ moduleId }: DynamicModuleLoaderProps) {
  const dataContext = useData();
  const [config, setConfig] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const baseConfig = configRegistry[moduleId];
    if (moduleId === 'crm' && activeTab === 'customers') {
      setConfig(baseConfig.views.customers);
    } else if (moduleId === 'crm') {
      setConfig(baseConfig.views.leads);
      if (!activeTab) setActiveTab('leads');
    } else {
      setConfig(baseConfig);
      if (!activeTab) {
        if (moduleId === 'inventory') setActiveTab('all');
        if (moduleId === 'purchasing') setActiveTab('purchase-orders');
      }
    }
  }, [moduleId, activeTab]);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen text-rosary/40">
        <p>در حال بارگزاری ماژول: {moduleId}...</p>
      </div>
    );
  }

  // Map moduleId to its corresponding data from DataContext
  const dataMap: Record<string, any[]> = {
    inventory: dataContext.inventory,
    purchasing: dataContext.purchaseOrders,
    crm_leads: [
      { id: '1', name: 'جان اسمیت', company: 'بازارهای مواد غذایی مترو', value: 45000000, status: 'qualified', displayStatus: 'واجد شرایط', date: '2025-11-01' },
      { id: '2', name: 'امیلی چن', company: 'بنیاد خواربارفروشی تازه', value: 67000000, status: 'proposal', displayStatus: 'پیشنهاد', date: '2025-10-28' },
    ],
    crm_customers: [
      { id: '1', name: 'توزیع‌کنندگان دره سبز', totalOrders: 245, totalRevenue: 125000000, status: 'active', displayStatus: 'فعال' },
      { id: '2', name: 'شرکت بازار تازه', totalOrders: 189, totalRevenue: 98500000, status: 'active', displayStatus: 'فعال' },
    ]
  };

  let data = dataMap[moduleId] || [];
  if (moduleId === 'crm') {
    data = activeTab === 'leads' ? dataMap.crm_leads : dataMap.crm_customers;
  }
  
  // Custom Tab Filtering for Inventory
  if (moduleId === 'inventory' && activeTab !== 'all') {
    data = data.filter(item => item.category === activeTab);
  }

  const renderExtraContent = () => {
    switch (moduleId) {
      case 'production': return <ProductionSummary />;
      case 'maintenance': return <MaintenanceSummary />;
      case 'crm': return <CRMSummary activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'inventory': return <InventorySummary inventory={dataContext.inventory} activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'purchasing': return <PurchasingSummary activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'quality': return <QCSummary />;
      case 'finance': return <FinanceSummary />;
      case 'bom': return <BOMSummary />;
      case 'hr': return <HRSummary />;
      case 'sales': return <SalesSummary />;
      case 'projects': return <ProjectSummary />;
      case 'supply-chain': return <SupplyChainSummary />;
      default: return null;
    }
  };

  const getEntryForm = () => {
    if (moduleId === 'purchasing') {
      return {
        title: 'سفارش خرید جدید',
        render: (controller: any) => (
          <PurchaseOrderForm 
            mode="add" 
            onSave={(data) => {
              dataContext.addPurchaseOrder(data);
              controller.closeEntryForm();
            }} 
            onCancel={controller.closeEntryForm} 
          />
        )
      };
    }
    return undefined;
  };

  return (
    <UniversalModuleTemplate 
      config={config} 
      data={data}
      renderExtraContent={renderExtraContent}
      entryForm={getEntryForm()}
    />
  );
}
