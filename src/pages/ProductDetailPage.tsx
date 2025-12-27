import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Package, Wrench, Users, Warehouse, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockProducts, ProductDetail } from '../data/mockProducts';
import { useTranslation, toPersianNumber, formatPersianCurrency } from '../lib/i18n';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const { t } = useTranslation();
  const product = mockProducts.find(p => p.id === productId);
  

  if (!product) return (
  <div className="min-h-screen flex items-center justify-center bg-transparent text-rosary type-body" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gold mb-2">{t('empty.noResults')}</h2>
        <p className="text-rosary/60 mb-6">{t('common.noData')}</p>
        <Button onClick={() => window.history.back()} className="bg-white/10 text-gold hover:bg-white/20 border border-gold/30">
          <ArrowLeft className="w-4 h-4 ml-2" />
          {t('common.back')}
        </Button>
      </div>
    </div>
  );

  return (
  <div className="p-8 space-y-6 min-h-screen bg-transparent text-rosary type-body" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-rosary/60 hover:text-gold hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 ml-2" />
            {t('common.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gold tracking-wide">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm text-rosary/60 dir-ltr">{product.sku}</span>
              <span className="text-rosary/40">•</span>
              <StatusBadge status={product.status} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold backdrop-blur-md">
            <Edit className="w-4 h-4 ml-2" />
            {t('common.edit')}
          </Button>
          <Button className="bg-blood text-rosary hover:bg-blood/90 shadow-lg hover:shadow-glow-red">
            <Trash2 className="w-4 h-4 ml-2" />
            {t('common.delete')}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-rosary/60 uppercase tracking-wider font-medium">{t('products.stock')}</p>
              <p className="text-2xl font-bold text-rosary">{toPersianNumber(product.stock)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-rosary/60 uppercase tracking-wider font-medium">{t('products.price')}</p>
              <p className="text-2xl font-bold text-rosary">{formatPersianCurrency(product.price)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-rosary/60 uppercase tracking-wider font-medium">{t('products.cost')}</p>
              <p className="text-2xl font-bold text-rosary">{formatPersianCurrency(product.cost)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-rosary/60 uppercase tracking-wider font-medium">{t('table.status')}</p>
              <StatusBadge status={product.status} />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="recipe" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.recipe')}</TabsTrigger>
          <TabsTrigger value="bom" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.bom')}</TabsTrigger>
          <TabsTrigger value="machines" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.machines')}</TabsTrigger>
          <TabsTrigger value="operators" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.operators')}</TabsTrigger>
          <TabsTrigger value="stock" className="data-[state=active]:bg-gold data-[state=active]:text-damask text-rosary hover:bg-white/10">{t('products.tabs.stock')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold text-gold">{t('products.productDetails')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-rosary/60">{t('products.category')}</p>
                <p className="text-rosary">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.barcode')}</p>
                <p className="font-mono text-sm text-rosary dir-ltr text-right">{product.barcode}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.unit')}</p>
                <p className="capitalize text-rosary">{product.unit}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.weight')}</p>
                <p className="text-rosary">{toPersianNumber(product.weight)} {t('units.kg')}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.dimensions')}</p>
                <p className="text-rosary dir-ltr text-right">{toPersianNumber(product.dimensions.length)}×{toPersianNumber(product.dimensions.width)}×{toPersianNumber(product.dimensions.height)} {t('units.cm')}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.manufacturer')}</p>
                <p className="text-rosary">{product.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.brand')}</p>
                <p className="text-rosary">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">{t('products.reorderPoint')}</p>
                <p className="text-rosary">{toPersianNumber(product.reorderPoint)} {t('units.piece')}</p>
              </div>
              <div>
                <p className="text-sm text-rosary/60">تاریخ ایجاد</p>
                <p className="text-rosary dir-ltr text-right">{toPersianNumber(product.createdAt)}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-rosary/60 mb-2">{t('products.description')}</p>
              <p className="text-rosary">{product.description}</p>
            </div>
          </Card>
        </TabsContent>

        {/* Recipe Tab */}
        <TabsContent value="recipe" className="space-y-6">
          {product.recipe ? (
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gold">{product.recipe.name}</h3>
                <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
                  <Edit className="w-4 h-4 ml-2" />
                  ویرایش دستور ساخت
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-rosary/60">زمان آماده‌سازی</p>
                  <p className="text-rosary">{toPersianNumber(product.recipe.prepTime)} دقیقه</p>
                </div>
                <div>
                  <p className="text-sm text-rosary/60">زمان پخت</p>
                  <p className="text-rosary">{toPersianNumber(product.recipe.cookTime)} دقیقه</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-gold font-medium">مواد اولیه</h4>
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-gold">ماده اولیه</TableHead>
                        <TableHead className="text-gold">مقدار</TableHead>
                        <TableHead className="text-gold">واحد</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.recipe.ingredients.map((ingredient, index) => (
                        <TableRow key={index} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-rosary">{ingredient.name}</TableCell>
                          <TableCell className="text-rosary">{toPersianNumber(ingredient.quantity)}</TableCell>
                          <TableCell className="text-rosary">{ingredient.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-gold font-medium">دستورالعمل‌ها</h4>
                <ol className="space-y-3">
                  {product.recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <Badge variant="outline" className="shrink-0 text-gold border-gold/30">{toPersianNumber(index + 1)}</Badge>
                      <span className="text-rosary">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center bg-white/10 backdrop-blur-xl border-white/20">
              <p className="text-rosary/60">دستور ساختی برای این محصول ثبت نشده است</p>
              <Button className="mt-4 bg-gold text-damask hover:bg-gold/90">افزودن دستور ساخت</Button>
            </Card>
          )}
        </TabsContent>

        {/* BOM Tab */}
        <TabsContent value="bom" className="space-y-6">
          {product.bom ? (
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gold">{t('products.tabs.bom')}</h3>
                  <p className="text-sm text-rosary/60">نسخه: {toPersianNumber(product.bom.version)}</p>
                </div>
                <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
                  <Edit className="w-4 h-4 ml-2" />
                  ویرایش لیست مواد
                </Button>
              </div>

              <div className="rounded-lg border border-white/10 overflow-hidden">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-gold">جزء</TableHead>
                      <TableHead className="text-gold">مقدار</TableHead>
                      <TableHead className="text-gold">واحد</TableHead>
                      <TableHead className="text-gold">هزینه واحد</TableHead>
                      <TableHead className="text-gold">تأمین‌کننده</TableHead>
                      <TableHead className="text-left text-gold">جمع کل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.bom.components.map((component) => (
                      <TableRow key={component.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-rosary">{component.name}</TableCell>
                        <TableCell className="text-rosary">{toPersianNumber(component.quantity)}</TableCell>
                        <TableCell className="text-rosary">{component.unit}</TableCell>
                        <TableCell className="text-rosary">{formatPersianCurrency(component.cost)}</TableCell>
                        <TableCell className="text-rosary">{component.supplier}</TableCell>
                        <TableCell className="text-left text-rosary">
                          {formatPersianCurrency(component.quantity * component.cost)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-white/5 border-white/10">
                      <TableCell colSpan={5} className="text-right text-rosary">
                        <strong>هزینه کل:</strong>
                      </TableCell>
                      <TableCell className="text-left text-gold">
                        <strong>{formatPersianCurrency(product.bom.totalCost)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center bg-white/10 backdrop-blur-xl border-white/20">
              <p className="text-rosary/60">لیست موادی برای این محصول ثبت نشده است</p>
              <Button className="mt-4 bg-gold text-damask hover:bg-gold/90">ایجاد لیست مواد</Button>
            </Card>
          )}
        </TabsContent>

        {/* Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gold">ماشین‌آلات مرتبط</h3>
              <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
                تخصیص ماشین
              </Button>
            </div>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">ماشین</TableHead>
                    <TableHead className="text-gold">نقش</TableHead>
                    <TableHead className="text-gold">میانگین زمان کارکرد (دقیقه)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.machines.map((machine) => (
                    <TableRow key={machine.id} className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center gap-2 text-rosary">
                          <Wrench className="w-4 h-4 text-rosary/40" />
                          {machine.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-gold border-gold/30">{machine.role}</Badge>
                      </TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(machine.runtime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gold">اپراتورهای منتصب</h3>
              <Button variant="outline" size="sm" className="text-rosary border-white/30 hover:bg-white/10 hover:text-gold">
                تخصیص اپراتور
              </Button>
            </div>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">اپراتور</TableHead>
                    <TableHead className="text-gold">سطح مهارت</TableHead>
                    <TableHead className="text-gold">شیفت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.operators.map((operator) => (
                    <TableRow key={operator.id} className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center gap-2 text-rosary">
                          <Users className="w-4 h-4 text-rosary/40" />
                          {operator.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blood/20 text-blood border-none hover:bg-blood/30">{operator.skill}</Badge>
                      </TableCell>
                      <TableCell className="text-rosary">{operator.shift}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Stock Summary Tab */}
        <TabsContent value="stock" className="space-y-6">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <h3 className="mb-6 text-lg font-semibold text-gold">موجودی بر اساس انبار</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gold">انبار</TableHead>
                    <TableHead className="text-gold">کل موجودی</TableHead>
                    <TableHead className="text-gold">رزرو شده</TableHead>
                    <TableHead className="text-gold">قابل فروش</TableHead>
                    <TableHead className="text-gold">وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.stockByWarehouse.map((stock) => (
                    <TableRow key={stock.warehouseId} className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center gap-2 text-rosary">
                          <Warehouse className="w-4 h-4 text-rosary/40" />
                          {stock.warehouseName}
                        </div>
                      </TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(stock.quantity)}</TableCell>
                      <TableCell className="text-rosary">{toPersianNumber(stock.reserved)}</TableCell>
                      <TableCell>
                        <strong className="text-gold">{toPersianNumber(stock.available)}</strong>
                      </TableCell>
                      <TableCell>
                        {stock.available < product.reorderPoint ? (
                          <StatusBadge status={t('status.lowStock')} className="bg-blood/20 text-blood border-blood/30" />
                        ) : (
                          <StatusBadge status={t('status.inStock')} className="bg-gold/20 text-gold border-gold/30" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
