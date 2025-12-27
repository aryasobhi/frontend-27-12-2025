// @ts-nocheck
/*
  Status: SKELETON
  Reason: Component showcase is a development reference page for UI components and not part of the production runtime.
  Allowed actions: authoring-only (update examples, docs, and component demos)
*/

import { Package, TrendingUp, AlertCircle, Users, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { KPICard } from '../widgets/KPICard';
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { LoadingSpinner } from '../widgets/LoadingSpinner';
import { PageHeader } from '../components/PageHeader';
import { StatsGrid } from '../components/StatsGrid';

// @ts-nocheck
/**
 * Component Showcase Page
 * 
 * This page demonstrates all reusable components and patterns
 * used throughout the ERP system. Use as a reference when
 * building new features.
 */
export function ComponentShowcase() {
  return (
    <div className="p-8 space-y-8">
      {/* Page Header Example */}
      <PageHeader
        title="Component Showcase"
        description="Reference page for all reusable components and UI patterns"
        actions={
          <>
            <Button variant="outline">Secondary Action</Button>
            <Button>Primary Action</Button>
          </>
        }
      />

      {/* KPI Cards */}
      <section className="space-y-4">
        <h2>KPI Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Total Revenue"
            value="$125,430"
            change={12.5}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <KPICard
            title="Active Users"
            value="1,234"
            change={-5.2}
            changeLabel="vs last week"
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <KPICard
            title="Total Orders"
            value="856"
            icon={Package}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="space-y-4">
        <h2>Stats Grid</h2>
        <StatsGrid
          stats={[
            { label: 'Total Products', value: 1234, color: 'text-blue-600' },
            { label: 'Active', value: 1100, color: 'text-green-600', trend: { value: 8, isPositive: true } },
            { label: 'Low Stock', value: 45, color: 'text-orange-600', trend: { value: -12, isPositive: true } },
            { label: 'Out of Stock', value: 12, color: 'text-red-600' },
          ]}
          columns={4}
        />
      </section>

      {/* Status Badges */}
      <section className="space-y-4">
        <h2>Status Badges (Auto-Color)</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2">Success States</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="active" />
                <StatusBadge status="completed" />
                <StatusBadge status="paid" />
                <StatusBadge status="passed" />
                <StatusBadge status="delivered" />
                <StatusBadge status="operational" />
                <StatusBadge status="approved" />
                <StatusBadge status="won" />
                <StatusBadge status="valid" />
              </div>
            </div>
            <div>
              <h4 className="mb-2">Warning States</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="pending" />
                <StatusBadge status="processing" />
                <StatusBadge status="in-progress" />
                <StatusBadge status="contacted" />
                <StatusBadge status="qualified" />
                <StatusBadge status="expiring-soon" />
              </div>
            </div>
            <div>
              <h4 className="mb-2">Error States</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="failed" />
                <StatusBadge status="cancelled" />
                <StatusBadge status="overdue" />
                <StatusBadge status="error" />
                <StatusBadge status="inactive" />
                <StatusBadge status="lost" />
                <StatusBadge status="critical" />
                <StatusBadge status="expired" />
              </div>
            </div>
            <div>
              <h4 className="mb-2">Neutral States</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="draft" />
                <StatusBadge status="idle" />
                <StatusBadge status="on-hold" />
                <StatusBadge status="maintenance" />
              </div>
            </div>
            <div>
              <h4 className="mb-2">Info States</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="shipped" />
                <StatusBadge status="sent" />
                <StatusBadge status="planning" />
                <StatusBadge status="new" />
              </div>
            </div>
            <div>
              <h4 className="mb-2">Force Specific Variant</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="Custom Status" variant="success" />
                <StatusBadge status="Another One" variant="warning" />
                <StatusBadge status="Error State" variant="error" />
                <StatusBadge status="Information" variant="info" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2>Standard Badges</h2>
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">Custom Blue</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">Custom Green</Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">Custom Red</Badge>
          </div>
        </Card>
      </section>

      {/* Progress Bars */}
      <section className="space-y-4">
        <h2>Progress Indicators</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">25% Complete</span>
                <span className="text-sm text-gray-500">25/100</span>
              </div>
              <Progress value={25} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">50% Complete</span>
                <span className="text-sm text-gray-500">50/100</span>
              </div>
              <Progress value={50} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">75% Complete</span>
                <span className="text-sm text-gray-500">75/100</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">100% Complete</span>
                <span className="text-sm text-gray-500">100/100</span>
              </div>
              <Progress value={100} />
            </div>
          </div>
        </Card>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2>Buttons</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <CheckCircle className="w-4 h-4 mr-2" />
                With Icon
              </Button>
              <Button variant="outline">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Empty States */}
      <section className="space-y-4">
        <h2>Empty States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
            />
          </Card>
          <Card>
            <EmptyState
              icon={Package}
              title="No products yet"
              description="Get started by adding your first product to the catalog."
              actionLabel="Add Product"
              onAction={() => alert('Add product clicked')}
            />
          </Card>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2>Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <LoadingSpinner message="Loading..." size="sm" />
          </Card>
          <Card>
            <LoadingSpinner message="Processing data..." size="md" />
          </Card>
          <Card>
            <LoadingSpinner message="Please wait..." size="lg" />
          </Card>
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2>Form Elements</h2>
        <Card className="p-6">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm mb-2 block">Text Input</label>
              <Input placeholder="Enter text..." />
            </div>
            <div>
              <label className="text-sm mb-2 block">Search Input</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Disabled Input</label>
              <Input placeholder="Disabled" disabled />
            </div>
          </div>
        </Card>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2>Common Icons (Lucide React)</h2>
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Package className="w-6 h-6" />
              <span className="text-xs">Package</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Users className="w-6 h-6" />
              <span className="text-xs">Users</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs">TrendingUp</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-xs">CheckCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="text-xs">XCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <span className="text-xs">AlertCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Clock className="w-6 h-6" />
              <span className="text-xs">Clock</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Search className="w-6 h-6" />
              <span className="text-xs">Search</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2>Color Palette</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2">Primary Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="h-20 bg-blue-600 rounded flex items-center justify-center text-white text-sm">Blue 600</div>
                <div className="h-20 bg-green-600 rounded flex items-center justify-center text-white text-sm">Green 600</div>
                <div className="h-20 bg-yellow-600 rounded flex items-center justify-center text-white text-sm">Yellow 600</div>
                <div className="h-20 bg-red-600 rounded flex items-center justify-center text-white text-sm">Red 600</div>
                <div className="h-20 bg-gray-600 rounded flex items-center justify-center text-white text-sm">Gray 600</div>
              </div>
            </div>
            <div>
              <h4 className="mb-2">Background Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="h-20 bg-blue-100 rounded flex items-center justify-center text-blue-700 text-sm">Blue 100</div>
                <div className="h-20 bg-green-100 rounded flex items-center justify-center text-green-700 text-sm">Green 100</div>
                <div className="h-20 bg-yellow-100 rounded flex items-center justify-center text-yellow-700 text-sm">Yellow 100</div>
                <div className="h-20 bg-red-100 rounded flex items-center justify-center text-red-700 text-sm">Red 100</div>
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm">Gray 100</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2>Code Examples</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2">KPICard Usage</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<KPICard
  title="Total Revenue"
  value="$125,430"
  change={12.5}
  changeLabel="vs last month"
  icon={TrendingUp}
  iconColor="text-green-600"
  iconBgColor="bg-green-100"
/>`}
              </pre>
            </div>
            <div>
              <h4 className="mb-2">StatusBadge Usage</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Auto-detect color
<StatusBadge status="active" />
<StatusBadge status="pending" />

// Force specific variant
<StatusBadge status="custom" variant="success" />`}
              </pre>
            </div>
            <div>
              <h4 className="mb-2">EmptyState Usage</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<EmptyState
  icon={Search}
  title="No results found"
  description="Try different filters"
  actionLabel="Clear Filters"
  onAction={() => clearFilters()}
/>`}
              </pre>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
