/**
 * Persian (Farsi) translations for Solaris ERP
 * Complete Industrial/Manufacturing terminology
 */

export const translations = {
  fa: {
    // ============================================
    // Common Actions & Labels
    // ============================================
    common: {
      search: 'جستجو...',
      loading: 'در حال بارگذاری...',
      save: 'ذخیره',
      cancel: 'لغو',
      delete: 'حذف',
      edit: 'ویرایش',
      view: 'مشاهده',
      add: 'افزودن',
      create: 'ایجاد',
      close: 'بستن',
      confirm: 'تایید',
      back: 'بازگشت',
      next: 'بعدی',
      previous: 'قبلی',
      export: 'خروجی',
      import: 'ورود داده',
      refresh: 'بروزرسانی',
      filter: 'فیلتر',
      filters: 'فیلترها',
      clearFilters: 'پاک کردن فیلترها',
      all: 'همه',
      none: 'هیچکدام',
      yes: 'بله',
      no: 'خیر',
      actions: 'عملیات',
      details: 'جزئیات',
      settings: 'تنظیمات',
      noData: 'داده‌ای یافت نشد',
      noResults: 'نتیجه‌ای یافت نشد',
      total: 'مجموع',
      select: 'انتخاب',
      selectAll: 'انتخاب همه',
      print: 'چاپ',
      download: 'دانلود',
      upload: 'آپلود',
      submit: 'ارسال',
      reset: 'بازنشانی',
      more: 'بیشتر',
      less: 'کمتر',
      showAll: 'نمایش همه',
      hideAll: 'پنهان کردن همه',
      priority: {
        low: 'کم',
        medium: 'متوسط',
        high: 'بالا',
        critical: 'بحرانی',
        urgent: 'فوری',
      },
    },

    // ============================================
    // Dashboard
    // ============================================
    dashboard: {
      title: 'داشبورد',
      subtitle: 'نمای کلی کارخانه و شاخص‌های کلیدی عملکرد',
      exportReport: 'خروجی گزارش',
      refreshData: 'بروزرسانی داده‌ها',
      
      kpi: {
        totalProduction: 'کل تولید',
        activeOrders: 'سفارش‌های فعال',
        efficiency: 'بهره‌وری',
        revenue: 'درآمد',
        units: 'واحد',
        orders: 'سفارش',
        totalMachines: 'تعداد ماشین‌آلات',
        totalEmployees: 'تعداد کارکنان',
        pendingMaintenance: 'تعمیرات در انتظار',
        qualityScore: 'امتیاز کیفیت',
      },

      charts: {
        partnerDistribution: 'توزیع شرکا',
        recentActivities: 'فعالیت‌های اخیر',
        revenueChart: 'نمودار درآمد',
        orderChart: 'نمودار سفارشات',
        productionTrend: 'روند تولید',
        qualityTrend: 'روند کیفیت',
      },

      partnerTypes: {
        distributors: 'توزیع‌کنندگان',
        retailers: 'خرده‌فروشان',
        wholesalers: 'عمده‌فروشان',
        restaurants: 'رستوران‌ها',
      },

      activityTypes: {
        order: 'سفارش',
        payment: 'پرداخت',
        new: 'جدید',
        update: 'بروزرسانی',
        quote: 'استعلام قیمت',
      },

      timeAgo: {
        hoursAgo: 'ساعت پیش',
        daysAgo: 'روز پیش',
        minutesAgo: 'دقیقه پیش',
        justNow: 'همین الان',
      },
    },

    // ============================================
    // Navigation
    // ============================================
    nav: {
      dashboard: 'داشبورد',
      products: 'محصولات',
      machines: 'ماشین‌آلات',
      employees: 'کارکنان',
      hr: 'منابع انسانی',
      inventory: 'انبار',
      production: 'تولید',
      quality: 'کنترل کیفیت',
      maintenance: 'نگهداری و تعمیرات',
      invoices: 'فاکتورها',
      finance: 'مالی',
      reports: 'گزارشات',
      analytics: 'تحلیل‌ها',
      settings: 'تنظیمات',
      crm: 'مدیریت ارتباط با مشتری',
      partners: 'شرکا',
      orders: 'سفارشات',
      supplyChain: 'زنجیره تامین',
      procurement: 'تدارکات',
      purchasing: 'خرید',
      sales: 'فروش',
      shipping: 'حمل و نقل',
      accounting: 'حسابداری',
      bom: 'لیست مواد',
      formulation: 'فرمولاسیون',
      projects: 'پروژه‌ها',
      fsm: 'مدیریت خدمات میدانی',
    },

    // ============================================
    // Analytics Module
    // ============================================
    analytics: {
      title: 'تحلیل‌ها و گزارشات',
      subtitle: 'بینش جامع از روابط شرکا و عملکرد سیستم',
    },

    // ============================================
    // Status Labels
    // ============================================
    status: {
      active: 'فعال',
      inactive: 'غیرفعال',
      pending: 'در انتظار',
      completed: 'تکمیل شده',
      cancelled: 'لغو شده',
      inProgress: 'در حال انجام',
      planned: 'برنامه‌ریزی شده',
      onHold: 'معلق',
      approved: 'تایید شده',
      rejected: 'رد شده',
      draft: 'پیش‌نویس',
      lowStock: 'موجودی کم',
      inStock: 'موجود',
      instock: 'موجود',
      outOfStock: 'ناموجود',
      outofstock: 'ناموجود',
      running: 'در حال کار',
      idle: 'بیکار',
      maintenance: 'تعمیرات',
      offline: 'آفلاین',
      online: 'آنلاین',
      open: 'باز',
      closed: 'بسته',
      paid: 'پرداخت شده',
      unpaid: 'پرداخت نشده',
      overdue: 'سررسید گذشته',
      scheduled: 'زمانبندی شده',
      passed: 'قبول',
      failed: 'رد',
      invoiced: 'فاکتور شده',
      ordered: 'سفارش داده شده',
      received: 'دریافت شده',
      picked: 'آماده ارسال',
      confirmed: 'تایید شده',
      delivered: 'تحویل شده',
      shipped: 'ارسال شده',
    },

    // ============================================
    // Priority Levels
    // ============================================
    priority: {
      low: 'کم',
      medium: 'متوسط',
      high: 'بالا',
      critical: 'بحرانی',
      urgent: 'فوری',
    },

    // ============================================
    // Persian Months
    // ============================================
    months: {
      farvardin: 'فروردین',
      ordibehesht: 'اردیبهشت',
      khordad: 'خرداد',
      tir: 'تیر',
      mordad: 'مرداد',
      shahrivar: 'شهریور',
      mehr: 'مهر',
      aban: 'آبان',
      azar: 'آذر',
      dey: 'دی',
      bahman: 'بهمن',
      esfand: 'اسفند',
    },

    // ============================================
    // Weekdays
    // ============================================
    weekdays: {
      saturday: 'شنبه',
      sunday: 'یکشنبه',
      monday: 'دوشنبه',
      tuesday: 'سه‌شنبه',
      wednesday: 'چهارشنبه',
      thursday: 'پنجشنبه',
      friday: 'جمعه',
      sat: 'ش',
      sun: 'ی',
      mon: 'د',
      tue: 'س',
      wed: 'چ',
      thu: 'پ',
      fri: 'ج',
    },

    // ============================================
    // Forms & Validation
    // ============================================
    forms: {
      required: 'این فیلد الزامی است',
      invalidEmail: 'ایمیل نامعتبر است',
      invalidPhone: 'شماره تلفن نامعتبر است',
      minLength: 'حداقل {min} کاراکتر',
      maxLength: 'حداکثر {max} کاراکتر',
      passwordMismatch: 'رمز عبور مطابقت ندارد',
      invalidNumber: 'عدد نامعتبر است',
      invalidDate: 'تاریخ نامعتبر است',
      selectOption: 'یک گزینه انتخاب کنید',
      enterValue: 'مقدار وارد کنید',
    },

    // ============================================
    // Products Module
    // ============================================
    products: {
      title: 'محصولات',
      subtitle: 'مدیریت محصولات و کالاها',
      addProduct: 'افزودن محصول',
      editProduct: 'ویرایش محصول',
      productDetails: 'جزئیات محصول',
      productName: 'نام محصول',
      sku: 'کد محصول',
      category: 'دسته‌بندی',
      price: 'قیمت',
      cost: 'هزینه',
      stock: 'موجودی',
      unit: 'واحد',
      weight: 'وزن',
      dimensions: 'ابعاد',
      barcode: 'بارکد',
      description: 'توضیحات',
      manufacturer: 'تولیدکننده',
      brand: 'برند',
      reorderPoint: 'نقطه سفارش مجدد',
      minStock: 'حداقل موجودی',
      maxStock: 'حداکثر موجودی',
      
      tabs: {
        overview: 'نمای کلی',
        recipe: 'دستور ساخت',
        bom: 'لیست مواد',
        machines: 'ماشین‌آلات',
        operators: 'اپراتورها',
        stock: 'موجودی انبار',
      },
    },

    // ============================================
    // Machines Module
    // ============================================
    machines: {
      title: 'ماشین‌آلات',
      subtitle: 'مدیریت ماشین‌آلات و تجهیزات',
      addMachine: 'افزودن ماشین',
      editMachine: 'ویرایش ماشین',
      machineDetails: 'جزئیات ماشین',
      machineName: 'نام ماشین',
      machineCode: 'کد ماشین',
      type: 'نوع',
      model: 'مدل',
      manufacturer: 'سازنده',
      serialNumber: 'شماره سریال',
      location: 'محل',
      department: 'بخش',
      installDate: 'تاریخ نصب',
      lastMaintenance: 'آخرین تعمیرات',
      nextMaintenance: 'تعمیرات بعدی',
      capacity: 'ظرفیت',
      efficiency: 'بازدهی',
      operatingHours: 'ساعات کارکرد',
      powerConsumption: 'مصرف برق',
      
      status: {
        running: 'در حال کار',
        idle: 'بیکار',
        maintenance: 'تعمیرات',
        offline: 'خاموش',
        operational: 'عملیاتی',
        error: 'خطا',
      },

      stats: {
        avgUptime: 'میانگین زمان فعال',
        avgEfficiency: 'میانگین کارایی',
        needsAttention: 'نیاز به توجه',
        issuesFound: 'مشکل یافت شد',
        excellent: 'عالی',
        aboveTarget: 'بالاتر از هدف',
      },

      tabs: {
        overview: 'نمای کلی',
        maintenance: 'تعمیرات',
        operators: 'اپراتورها',
        production: 'تولید',
        documents: 'مستندات',
      },
    },

    // ============================================
    // Employees / HR Module
    // ============================================
    employees: {
      title: 'کارکنان',
      subtitle: 'مدیریت کارکنان و منابع انسانی',
      addEmployee: 'افزودن کارمند',
      editEmployee: 'ویرایش کارمند',
      employeeDetails: 'جزئیات کارمند',
      employeeId: 'کد کارمند',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      fullName: 'نام کامل',
      email: 'ایمیل',
      phone: 'تلفن',
      mobile: 'موبایل',
      department: 'بخش',
      position: 'سمت',
      role: 'نقش',
      hireDate: 'تاریخ استخدام',
      salary: 'حقوق',
      address: 'آدرس',
      nationalId: 'کد ملی',
      birthDate: 'تاریخ تولد',
      skills: 'مهارت‌ها',
      certifications: 'گواهینامه‌ها',
      shift: 'شیفت',
      
      shifts: {
        morning: 'صبح',
        afternoon: 'عصر',
        night: 'شب',
        rotating: 'چرخشی',
      },

      tabs: {
        overview: 'نمای کلی',
        attendance: 'حضور و غیاب',
        performance: 'عملکرد',
        documents: 'مستندات',
        training: 'آموزش',
      },

      stats: {
        totalEmployees: 'کل کارکنان',
        attendanceRate: 'نرخ حضور و غیاب',
        avgWorkingHours: 'میانگین ساعت کار',
        payroll: 'لیست حقوق (ماهانه)',
        newThisQuarter: '+{count} در این فصل',
        aboveTarget: 'بالاتر از هدف',
        perWeek: 'در هفته',
        totalExpenses: 'کل هزینه‌ها',
      },

      attendance: {
        summary: 'خلاصه حضور و غیاب ماهانه',
        present: 'روزهای حضور',
        absent: 'روزهای غیبت',
        late: 'تاخیرها',
        rate: 'درصد حضور',
      },

      departments: {
        title: 'بخش‌ها',
        employees: 'کارمند',
        annualBudget: 'بودجه سالانه',
        costPerEmployee: 'هزینه به ازای هر کارمند',
      },
    },

    // ============================================
    // Invoices / Finance Module
    // ============================================
    invoices: {
      title: 'فاکتورها',
      subtitle: 'مدیریت فاکتورها و صورتحساب‌ها',
      addInvoice: 'افزودن فاکتور',
      editInvoice: 'ویرایش فاکتور',
      invoiceDetails: 'جزئیات فاکتور',
      invoiceNumber: 'شماره فاکتور',
      customer: 'مشتری',
      vendor: 'تامین‌کننده',
      issueDate: 'تاریخ صدور',
      dueDate: 'تاریخ سررسید',
      amount: 'مبلغ',
      tax: 'مالیات',
      discount: 'تخفیف',
      total: 'مجموع',
      subtotal: 'جمع کل',
      grandTotal: 'مبلغ نهایی',
      paymentStatus: 'وضعیت پرداخت',
      paymentMethod: 'روش پرداخت',
      notes: 'یادداشت‌ها',
      items: 'اقلام',
      quantity: 'تعداد',
      unitPrice: 'قیمت واحد',
      
      types: {
        sales: 'فروش',
        purchase: 'خرید',
        return: 'مرجوعی',
        credit: 'اعتباری',
      },

      tabs: {
        details: 'جزئیات',
        items: 'اقلام',
        payments: 'پرداخت‌ها',
        history: 'تاریخچه',
      },
    },

    // ============================================
    // Maintenance Module
    // ============================================
    maintenance: {
      title: 'نگهداری و تعمیرات',
      subtitle: 'مدیریت تعمیرات و نگهداری تجهیزات',
      addRecord: 'افزودن رکورد',
      editRecord: 'ویرایش رکورد',
      recordDetails: 'جزئیات رکورد',
      workOrder: 'دستور کار',
      machine: 'ماشین',
      technician: 'تکنسین',
      scheduledDate: 'تاریخ برنامه‌ریزی',
      completedDate: 'تاریخ تکمیل',
      maintenanceType: 'نوع تعمیرات',
      duration: 'مدت زمان',
      cost: 'هزینه',
      parts: 'قطعات',
      description: 'شرح',
      findings: 'یافته‌ها',
      actions: 'اقدامات',
      
      types: {
        preventive: 'پیشگیرانه',
        corrective: 'اصلاحی',
        predictive: 'پیش‌بینانه',
        emergency: 'اضطراری',
      },

      tabs: {
        details: 'جزئیات',
        parts: 'قطعات',
        labor: 'نیروی کار',
        history: 'تاریخچه',
      },
    },

    // ============================================
    // Inventory Module
    // ============================================
    inventory: {
      title: 'انبار',
      subtitle: 'مدیریت موجودی و انبار',
      addItem: 'افزودن کالا',
      editItem: 'ویرایش کالا',
      itemDetails: 'جزئیات کالا',
      itemName: 'نام کالا',
      itemCode: 'کد کالا',
      warehouse: 'انبار',
      location: 'محل',
      quantity: 'تعداد',
      reserved: 'رزرو شده',
      available: 'موجود',
      minLevel: 'حداقل موجودی',
      maxLevel: 'حداکثر موجودی',
      reorderLevel: 'نقطه سفارش',
      lastReceived: 'آخرین دریافت',
      lastIssued: 'آخرین صدور',
      
      movements: {
        receive: 'دریافت',
        issue: 'صدور',
        transfer: 'انتقال',
        adjustment: 'تعدیل',
        return: 'برگشت',
      },

      tabs: {
        stock: 'موجودی',
        movements: 'حرکات',
        history: 'تاریخچه',
      },
    },

    // ============================================
    // Quality Control Module
    // ============================================
    quality: {
      title: 'کنترل کیفیت',
      subtitle: 'مدیریت کنترل کیفیت و بازرسی',
      addInspection: 'افزودن بازرسی',
      editInspection: 'ویرایش بازرسی',
      inspectionDetails: 'جزئیات بازرسی',
      inspectionNumber: 'شماره بازرسی',
      inspector: 'بازرس',
      inspectionDate: 'تاریخ بازرسی',
      product: 'محصول',
      batch: 'دسته',
      lotNumber: 'شماره لات',
      sampleSize: 'اندازه نمونه',
      defects: 'عیوب',
      defectCount: 'تعداد عیوب',
      passRate: 'نرخ قبولی',
      result: 'نتیجه',
      notes: 'یادداشت‌ها',
      
      results: {
        passed: 'قبول',
        failed: 'رد',
        conditional: 'مشروط',
        pending: 'در انتظار',
      },

      tabs: {
        details: 'جزئیات',
        measurements: 'اندازه‌گیری‌ها',
        defects: 'عیوب',
        checklist: 'چک‌لیست',
      },
    },

    // ============================================
    // Production Module
    // ============================================
    production: {
      title: 'سفارشات تولید',
      subtitle: 'مدیریت سفارشات و برنامه تولید',
      newOrder: 'سفارش جدید',
      editOrder: 'ویرایش سفارش',
      orderDetails: 'جزئیات سفارش',
      orderNumber: 'شماره سفارش',
      product: 'محصول',
      productPlaceholder: 'نام محصول را انتخاب کنید',
      quantity: 'تعداد',
      produced: 'تولید شده',
      remaining: 'باقیمانده',
      progress: 'پیشرفت',
      startDate: 'تاریخ شروع',
      endDate: 'تاریخ پایان',
      dueDate: 'موعد تحویل',
      machine: 'ماشین',
      machinePlaceholder: 'نام یا کد دستگاه',
      operator: 'اپراتور',
      priority: 'اولویت',
      notes: 'یادداشت‌ها',
      batch: 'دسته',
      yield: 'بازده',
      scrap: 'ضایعات',
      
      tabs: {
        details: 'جزئیات',
        materials: 'مواد',
        operations: 'عملیات',
        quality: 'کیفیت',
        performance: 'عملکرد',
      },
      stats: {
        todayOutput: 'تولید امروز',
        activeOrders: 'سفارشات فعال',
        efficiencyRate: 'نرخ بهره‌وری',
        downtime: 'زمان توقف',
      },
      lines: 'خطوط تولید',
    },

    // ============================================
    // Supply Chain Module
    // ============================================
    supplyChain: {
      title: 'مدیریت زنجیره تامین',
      subtitle: 'پیگیری محموله‌ها و مدیریت تامین‌کنندگان',
      newShipment: 'محموله جدید',
      activeShipments: 'محموله‌های فعال',
      shipmentDetails: 'جزئیات محموله',
      trackingNumber: 'شماره پیگیری',
      supplier: 'تامین‌کننده',
      destination: 'مقصد',
      origin: 'مبدا',
      items: 'اقلام',
      status: 'وضعیت',
      estArrival: 'وصول تخمینی',
      currentLocation: 'موقعیت فعلی',
      track: 'پیگیری',
      
      stats: {
        activeShipments: 'محموله‌های فعال',
        onTimeDelivery: 'تحویل به موقع',
        delayedShipments: 'محموله‌های با تاخیر',
        activeSuppliers: 'تامین‌کنندگان فعال',
      },

      supplierPerformance: 'عملکرد تامین‌کننده',
      totalDeliveries: 'کل تحویل‌ها',
      onTimeRate: 'نرخ تحویل به موقع',
      rating: 'امتیاز',
    },

    // ============================================
    // CRM Module
    // ============================================
    crm: {
      title: 'مدیریت ارتباط با مشتری',
      subtitle: 'مدیریت مشتریان و فرصت‌های فروش',
      addLead: 'افزودن سرنخ',
      editLead: 'ویرایش سرنخ',
      leadDetails: 'جزئیات سرنخ',
      leadName: 'نام سرنخ',
      company: 'شرکت',
      contact: 'مخاطب',
      email: 'ایمیل',
      phone: 'تلفن',
      source: 'منبع',
      value: 'ارزش',
      stage: 'مرحله',
      probability: 'احتمال',
      expectedClose: 'تاریخ پیش‌بینی',
      assignedTo: 'مسئول',
      notes: 'یادداشت‌ها',
      
      stages: {
        new: 'جدید',
        contacted: 'تماس گرفته شده',
        qualified: 'واجد شرایط',
        proposal: 'پیشنهاد',
        negotiation: 'مذاکره',
        closed: 'بسته شده',
        lost: 'از دست رفته',
      },

      sources: {
        website: 'وبسایت',
        referral: 'معرفی',
        social: 'شبکه اجتماعی',
        advertisement: 'تبلیغات',
        exhibition: 'نمایشگاه',
        cold_call: 'تماس سرد',
      },

      stats: {
        totalLeads: 'کل سرنخ‌ها',
        newLeads: 'سرنخ‌های جدید',
        qualified: 'واجد شرایط',
        proposals: 'پیشنهادات',
        closedWon: 'موفق',
        closedLost: 'ناموفق',
        conversionRate: 'نرخ تبدیل',
        totalValue: 'ارزش کل',
      },
    },

    // ============================================
    // BOM (Bill of Materials) Module
    // ============================================
    bom: {
      title: 'BOM و برنامه‌ریزی تولید',
      subtitle: 'مدیریت لیست مواد اولیه و برنامه‌های تولید',
      createBom: 'ایجاد BOM',
      addBom: 'افزودن لیست مواد',
      editBom: 'ویرایش لیست مواد',
      bomDetails: 'جزئیات لیست مواد',
      bomNumber: 'شماره لیست',
      product: 'محصول',
      version: 'نسخه',
      component: 'جزء',
      material: 'ماده',
      quantity: 'تعداد',
      unit: 'واحد',
      cost: 'هزینه',
      supplier: 'تامین‌کننده',
      leadTime: 'زمان تحویل',
      notes: 'یادداشت‌ها',
      totalCost: 'هزینه کل',
      activeBoms: 'BOMهای فعال',
      productionPlans: 'برنامه‌های تولید',
      materialEfficiency: 'کارایی مواد',
      unitCost: 'هزینه واحد',
      billOfMaterials: 'لیست مواد اولیه',
      productionPlanning: 'برنامه‌ریزی تولید',
      costAnalysis: 'تحلیل هزینه',
      requiredMaterials: 'مواد مورد نیاز',
      yield: 'بازده',
      mrp: 'نیازهای مواد (MRP)',
      
      tabs: {
        components: 'اجزا',
        costAnalysis: 'تحلیل هزینه',
        whereUsed: 'محل استفاده',
        revisions: 'بازنگری‌ها',
      },
    },

    // ============================================
    // Partners Module
    // ============================================
    partners: {
      title: 'شرکا',
      subtitle: 'مدیریت شرکای تجاری و روابط',
      addPartner: 'افزودن شریک',
      editPartner: 'ویرایش شریک',
      partnerDetails: 'جزئیات شریک',
      name: 'نام شریک',
      type: 'نوع',
      contact: 'مخاطب',
      email: 'ایمیل',
      location: 'محل',
      status: 'وضعیت',
      totalOrders: 'کل سفارشات',
      revenue: 'درآمد',
      rating: 'امتیاز',
      
      tabs: {
        overview: 'نمای کلی',
        orders: 'سفارشات',
        contacts: 'مخاطبین',
        history: 'تاریخچه',
      },
    },

    // ============================================
    // Orders Module
    // ============================================
    orders: {
      title: 'مدیریت سفارشات',
      subtitle: 'پیگیری و مدیریت کلیه سفارشات شرکا',
      orderNumber: 'شماره سفارش',
      partner: 'شریک تجاری',
      date: 'تاریخ سفارش',
      products: 'محصولات',
      quantity: 'تعداد',
      amount: 'مبلغ',
      status: 'وضعیت',
      delivery: 'تحویل',
      orderDetails: 'جزئیات سفارش',
      
      tabs: {
        overview: 'نمای کلی',
        items: 'اقلام سفارش',
        shipping: 'حمل و نقل',
        payment: 'پرداخت',
      },
    },

    // ============================================
    // Table Headers
    // ============================================
    table: {
      id: 'شناسه',
      name: 'نام',
      code: 'کد',
      status: 'وضعیت',
      date: 'تاریخ',
      createdAt: 'تاریخ ایجاد',
      updatedAt: 'تاریخ بروزرسانی',
      actions: 'عملیات',
      description: 'توضیحات',
      type: 'نوع',
      category: 'دسته‌بندی',
      quantity: 'تعداد',
      price: 'قیمت',
      total: 'جمع',
      progress: 'پیشرفت',
      priority: 'اولویت',
      assignedTo: 'مسئول',
      dueDate: 'موعد',
      noData: 'داده‌ای برای نمایش وجود ندارد',
    },

    // ============================================
    // Empty States
    // ============================================
    empty: {
      noProducts: 'محصولی یافت نشد',
      noMachines: 'ماشینی یافت نشد',
      noEmployees: 'کارمندی یافت نشد',
      noInvoices: 'فاکتوری یافت نشد',
      noRecords: 'رکوردی یافت نشد',
      noResults: 'نتیجه‌ای یافت نشد',
      addFirst: 'اولین مورد را اضافه کنید',
    },

    // ============================================
    // Errors & Messages
    // ============================================
    errors: {
      general: 'خطایی رخ داد',
      notFound: 'یافت نشد',
      unauthorized: 'دسترسی غیرمجاز',
      networkError: 'خطای شبکه',
      saveError: 'خطا در ذخیره',
      deleteError: 'خطا در حذف',
      loadError: 'خطا در بارگذاری',
    },

    messages: {
      saveSuccess: 'با موفقیت ذخیره شد',
      deleteSuccess: 'با موفقیت حذف شد',
      updateSuccess: 'با موفقیت بروزرسانی شد',
      confirmDelete: 'آیا از حذف اطمینان دارید؟',
      unsavedChanges: 'تغییرات ذخیره نشده وجود دارد',
    },

    // ============================================
    // Units
    // ============================================
    units: {
      piece: 'عدد',
      kg: 'کیلوگرم',
      g: 'گرم',
      liter: 'لیتر',
      ml: 'میلی‌لیتر',
      meter: 'متر',
      cm: 'سانتی‌متر',
      box: 'جعبه',
      pack: 'بسته',
      set: 'ست',
      hour: 'ساعت',
      minute: 'دقیقه',
      day: 'روز',
      month: 'ماه',
      year: 'سال',
      toman: 'تومان',
      rial: 'ریال',
    },

    // ============================================
    // Projects Module
    // ============================================
    projects: {
      title: 'پروژه‌ها',
      subtitle: 'مدیریت و پیگیری پروژه‌های صنعتی',
      addProject: 'افزودن پروژه',
      newProject: 'پروژه جدید',
      editProject: 'ویرایش پروژه',
      trackProjects: 'پیگیری و مدیریت پروژه‌ها و ابتکارات شرکت',
      name: 'نام پروژه',
      code: 'کد پروژه',
      project: 'پروژه',
      manager: 'مدیر پروژه',
      startDate: 'تاریخ شروع',
      endDate: 'تاریخ پایان',
      budget: 'بودجه',
      spent: 'هزینه شده',
      allocated: 'تخصیص یافته',
      used: 'استفاده شده',
      progress: 'پیشرفت',
      status: 'وضعیت',
      type: 'نوع پروژه',
      priority: 'اولویت',
      tasks: 'وظایف',
      tasksCompleted: 'کار تکمیل شده',
      completedTasks: 'وظایف تکمیل شده',
      team: 'تیم پروژه',
      members: 'عضو',
      viewDetails: 'مشاهده جزئیات',
      activeProjects: 'پروژه‌های فعال',
      allProjects: 'همه پروژه‌ها',
      timeline: 'جدول زمانی',
      timelineDesc: 'جدول زمانی و نمودار گانت پروژه',
      totalProjects: 'کل پروژه‌ها',
      totalBudget: 'بودجه کل',
      totalSpent: 'هزینه کل شده',
      completionRate: 'نرخ تکمیل',
      onTrack: 'در مسیر',
      development: 'توسعه محصول',
      productdevelopment: 'توسعه محصول',
      infrastructure: 'زیرساخت',
      compliance: 'انطباق',
      technology: 'تکنولوژی',
      sustainability: 'پایداری',
    },

    // ============================================
    // Purchasing & Procurement Module
    // ============================================
    purchasing: {
      title: 'خرید و تدارکات',
      subtitle: 'مدیریت سفارشات خرید و تامین‌کنندگان',
      createOrder: 'ایجاد سفارش خرید',
      editOrder: 'ویرایش سفارش خرید',
      orderNumber: 'شماره سفارش',
      supplier: 'تامین‌کننده',
      orderItems: 'اقلام سفارش',
      totalAmount: 'مبلغ کل',
      orderDate: 'تاریخ سفارش',
      status: 'وضعیت',
      expectedDate: 'تاریخ تحویل پیش‌بینی شده',
      receiptDate: 'تاریخ دریافت',
      invoiceNumber: 'شماره فاکتور',
      procurementManagement: 'مدیریت تدارکات',
      managePO: 'مدیریت سفارشات خرید و روابط با تامین‌کنندگان',
      newPO: 'سفارش خرید جدید',
      totalPOs: 'کل سفارشات خرید',
      pendingApprovals: 'در انتظار تایید',
      completedPOs: 'سفارشات تکمیل شده',
      costSavings: 'صرفه‌جویی در هزینه',
      recentQuotes: 'استعلام قیمت‌های اخیر',
      review: 'بررسی',
      purchaseFlow: 'جریان کامل خرید: سفارش خرید ← دریافت ← فاکتور ← حسابداری',
      openPOs: 'سفارشات باز',
      pendingReceipts: 'دریافت‌های در انتظار',
      receivedMonth: 'دریافت شده (ماه)',
      pendingInvoices: 'فاکتورهای معوق',
      goodsReceipt: 'دریافت کالا',
      supplierInvoices: 'فاکتورهای تامین‌کننده',
      transactionFlow: 'جریان معامله خرید',
    },

    // ============================================
    // Sales Module
    // ============================================
    sales: {
      title: 'فروش',
      subtitle: 'مدیریت سفارشات فروش و مشتریان',
      createOrder: 'ایجاد سفارش فروش',
      editOrder: 'ویرایش سفارش فروش',
      orderNumber: 'شماره سفارش',
      customer: 'مشتری',
      orderItems: 'اقلام سفارش',
      totalAmount: 'مبلغ کل',
      orderDate: 'تاریخ سفارش',
      status: 'وضعیت',
      deliveryDate: 'تاریخ تحویل',
      deliveryNumber: 'شماره بارنامه',
      invoiceNumber: 'شماره فاکتور',
      newOrder: 'سفارش فروش جدید',
      salesFlow: 'جریان کامل فروش: سفارش فروش ← تحویل ← فاکتور ← حسابداری',
      openOrders: 'سفارشات باز',
      pendingDeliveries: 'تحویل‌های در انتظار',
      deliveredMonth: 'تحویل شده (ماه)',
      revenueMonth: 'درآمد (ماه)',
      deliveries: 'تحویل‌ها',
      customerInvoices: 'فاکتورهای مشتری',
      transactionFlow: 'جریان معامله فروش',
    },

    // ============================================
    // Shipping & Logistics Module
    // ============================================
    shipping: {
      title: 'حمل و نقل و لجستیک',
      subtitle: 'مدیریت محموله‌های خروجی و توزیع',
      createShipment: 'ایجاد محموله',
      shipmentNumber: 'شماره محموله',
      destination: 'مقصد',
      carrier: 'حمل‌کننده',
      trackingNumber: 'شماره پیگیری',
      shipDate: 'تاریخ ارسال',
      estDelivery: 'تحویل تخمینی',
      activeShipments: 'محموله‌های فعال',
      preparing: 'در حال آماده‌سازی',
      deliveredWeek: 'تحویل شده (هفته)',
      avgDeliveryTime: 'میانگین زمان تحویل',
      carrierPerformance: 'عملکرد حمل‌کنندگان',
      itemsWeight: 'اقلام / وزن',
    },

    // ============================================
    // Accounting Module
    // ============================================
    accounting: {
      title: 'حسابداری',
      subtitle: 'حسابداری خودکار با یکپارچه‌سازی معاملات',
      manualEntry: 'ثبت دفتری دستی',
      totalAssets: 'کل دارایی‌ها',
      totalLiabilities: 'کل بدهی‌ها',
      equity: 'حقوق صاحبان سهام',
      postedEntries: 'ثبت‌های نهایی',
      journalEntries: 'ثبت‌های دفتری',
      chartOfAccounts: 'دفتر حساب‌ها',
      financialReports: 'گزارش‌های مالی',
      automaticPosting: 'سیستم ثبت خودکار',
      entryNumber: 'شماره ثبت',
      debit: 'بدهکار',
      credit: 'بستانکار',
      accountCode: 'کد حساب',
      accountName: 'نام حساب',
      balance: 'مانده',
      balanceSheet: 'ترازنامه',
      incomeStatement: 'صورت سود و زیان',
      revenue: 'درآمد',
      cogs: 'بهای تمام شده',
      netProfit: 'سود خالص',
    },


    formulation: {
      title: 'مدیریت فرمولاسیون',
      subtitle: 'مدیریت دستورهای محصول و فرمول‌بندی مواد',
      manageFormulas: 'مدیریت دستورهای محصول و فرمول‌بندی مواد',
      createFormula: 'ایجاد فرمول',
      editFormula: 'ویرایش فرمول',
      activeFormulas: 'فرمول‌های فعال',
      acrossCategories: 'در دسته‌بندی‌ها',
      inTesting: 'در حال تست',
      underEvaluation: 'در حال ارزیابی',
      qualityScore: 'امتیاز کیفیت',
      avgQualityScore: 'میانگین امتیاز کیفیت',
      costOptimization: 'بهینه‌سازی هزینه',
      formulas: 'فرمول‌ها',
      ingredientLibrary: 'کتابخانه مواد',
      testingDev: 'تست و توسعه',
      testingAndDev: 'تست و توسعه',
      ingredientLibDesc: 'کتابخانه و مشخصات مواد',
      testingDevDesc: 'گردش کار تست و توسعه فرمول',
      formulaDetails: 'جزئیات فرمول',
      ingredientComposition: 'ترکیب مواد',
      batchSize: 'اندازه دسته',
      costPerKg: 'هزینه هر کیلو',
      testBatch: 'تست دسته',
      ingredient: 'ماده',
      role: 'نقش',
      roles: {
        active: 'ماده فعال',
        diluent: 'رقیق کننده',
        stabilizer: 'پایدار کننده',
        preservative: 'نگهدارنده',
        excipient: 'ماده جانبی',
      },
    },

    // ============================================
    // Finance Module
    // ============================================
    finance: {
      title: 'امور مالی و حسابداری',
      subtitle: 'نمای کلی وضعیت مالی و جریان نقدینگی',
      generateReport: 'تهیه گزارش مالی',
      totalRevenue: 'کل درآمد',
      totalExpenses: 'کل هزینه‌ها',
      netProfit: 'سود خالص',
      overdueInvoices: 'فاکتورهای معوق',
      invoiceNumber: 'شماره فاکتور',
      customer: 'مشتری',
      amount: 'مبلغ',
      date: 'تاریخ',
      dueDate: 'تاریخ سررسید',
      status: 'وضعیت',
      expenseCategories: 'دسته‌بندی هزینه‌ها',
      tabs: {
        overview: 'نمای کلی',
        invoices: 'فاکتورها',
        expenses: 'هزینه‌ها',
      },
      charts: {
        revenueVsExpense: 'درآمد در مقابل هزینه',
        expenseBreakdown: 'تفکیک هزینه‌ها',
      },
      summary: {
        title: 'خلاصه مالی',
        grossMargin: 'حاشیه سود ناخالص',
        operatingMargin: 'حاشیه سود عملیاتی',
        cashFlow: 'جریان نقدینگی',
        accountsReceivable: 'حساب‌های دریافتنی',
      },
    },

    // ============================================
    // FSM Module
    // ============================================
    fsm: {
      title: 'مدیریت خدمات میدانی (FSM)',
      subtitle: 'مدیریت تیم اعزامی و تعمیرات در محل',
      scheduleService: 'زمانبندی سرویس',
      openTickets: 'تیکت‌های باز',
      activeTechnicians: 'تکنسین‌های فعال',
      avgResponseTime: 'میانگین زمان پاسخ',
      completionRate: 'نرخ تکمیل کار',
      ticketNumber: 'شماره تیکت',
      customer: 'مشتری',
      location: 'محل',
      type: 'نوع',
      priority: 'اولویت',
      status: 'وضعیت',
      technician: 'تکنسین',
      scheduledDate: 'تاریخ برنامه‌ریزی',
      tabs: {
        tickets: 'تیکت‌ها',
        technicians: 'تکنسین‌ها',
        schedule: 'برنامه زمانی',
      },
      stats: {
        urgent: 'فوری',
        onField: 'در محل مشتری',
        improvement: 'بهبود',
        firstTimeFix: 'رفع در اولین بازدید',
        activeJobs: 'کارهای فعال',
        completedToday: 'تکمیل شده امروز',
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.fa;
export type Language = keyof typeof translations;
