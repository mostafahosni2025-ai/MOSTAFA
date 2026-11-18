// IEC 60364 Electrical Load Estimation Dataset
// Source: IEC 60364-8-1, IEC 60364-5-52, IEC 60364-5-56, CENELEC HD 60364, Siemens TIP Guide

export interface IecBuildingUseRow {
  buildingUse: string;
  buildingUseAr: string;
  details: string;
  detailsAr: string;
  unit: string;
  min: number;
  max: number;
  average: number;
  sf: string;
}

export interface IecFunctionalAreaRow {
  area: string;
  areaAr: string;
  unit: string;
  min: number;
  max: number;
  average: number;
  sf: string;
}

export interface IecEquipmentRow {
  equipment: string;
  equipmentAr: string;
  sf: string;
}

export interface IecHeatingPvRow {
  item: string;
  itemAr: string;
  unit: string;
  min: number;
  max: number;
  average: number;
}

export interface IecLightingRow {
  application: string;
  applicationAr: string;
  vaPerM2: number;
  lux: number;
}

export interface IecPowerRow {
  application: string;
  applicationAr: string;
  minVaPerM2: number;
  maxVaPerM2: number;
  avgVaPerM2: number;
}

export interface IecKsConsumerRow {
  consumers: string;
  consumersAr: string;
  ks: string;
}

export interface IecKsCircuitRow {
  circuits: string;
  circuitsAr: string;
  ks: string;
}

export interface IecKsFunctionRow {
  functionName: string;
  functionNameAr: string;
  ks: string;
}

export interface IecSpsRpsRow {
  load: string;
  loadAr: string;
  systemSf: string;
  comments: string;
  commentsAr: string;
}

// 1. TAB 1: Fig. 2-4 - BUILDING USE
// Columns: Building Use | Details | Unit | Min | Max | Average | SF
export const IEC_FIG_2_4_BUILDING_USE: IecBuildingUseRow[] = [
  {
    buildingUse: 'Bank',
    buildingUseAr: 'مصرف / بنك',
    details: 'Branch & financial service counters',
    detailsAr: 'فرع محلي وقاعات المعاملات المصرفية',
    unit: 'W/m²',
    min: 40,
    max: 70,
    average: 55,
    sf: '0.6',
  },
  {
    buildingUse: 'Library',
    buildingUseAr: 'مكتبة',
    details: 'Reading rooms & archival stacks',
    detailsAr: 'قاعات المطالعة ومستودعات الكتب',
    unit: 'W/m²',
    min: 20,
    max: 40,
    average: 30,
    sf: '0.6',
  },
  {
    buildingUse: 'Office',
    buildingUseAr: 'مبنى إداري / مكاتب',
    details: 'Administrative spaces & standard offices',
    detailsAr: 'المساحات الإدارية والمكاتب القياسية',
    unit: 'W/m²',
    min: 30,
    max: 50,
    average: 40,
    sf: '0.6',
  },
  {
    buildingUse: 'Shopping center',
    buildingUseAr: 'مركز تسوق / مول',
    details: 'Retail spaces, boutiques & galleries',
    detailsAr: 'المتاجر والمحلات وصالات العرض',
    unit: 'W/m²',
    min: 30,
    max: 60,
    average: 45,
    sf: '0.6',
  },
  {
    buildingUse: 'Hotel',
    buildingUseAr: 'فندق',
    details: 'Guest rooms, reception & public areas',
    detailsAr: 'غرف النزلاء والاستقبال والمناطق العامة',
    unit: 'W/m²',
    min: 30,
    max: 60,
    average: 45,
    sf: '0.6',
  },
  {
    buildingUse: 'Department store',
    buildingUseAr: 'متجر متعدد الأقسام',
    details: 'Retail',
    detailsAr: 'تجزئة',
    unit: 'W/m²',
    min: 30,
    max: 60,
    average: 45,
    sf: '0.6',
  },
  {
    buildingUse: 'Small hospital (40-80 beds)',
    buildingUseAr: 'مستشفى صغير (40-80 سريراً)',
    details: 'General wards, clinics & diagnosis',
    detailsAr: 'أجنحة عامة، عيادات وتشخيص',
    unit: 'W/m²',
    min: 250,
    max: 400,
    average: 325,
    sf: '0.6',
  },
  {
    buildingUse: 'Hospital (200-500 beds)',
    buildingUseAr: 'مستشفى (200-500 سرير)',
    details: 'ca. 2,000 W per bed',
    detailsAr: 'حوالي 2,000 وات لكل سرير',
    unit: 'W/m²',
    min: 50,
    max: 80,
    average: 65,
    sf: '0.6',
  },
  {
    buildingUse: 'Warehouse',
    buildingUseAr: 'مستودع',
    details: 'no cooling',
    detailsAr: 'بدون تبريد',
    unit: 'W/m²',
    min: 2,
    max: 20,
    average: 11,
    sf: '0.6',
  },
  {
    buildingUse: 'Cold store',
    buildingUseAr: 'مخزن تبريد',
    details: 'Upper values for deep-freeze store',
    detailsAr: 'القيم العليا لمخازن التجميد العميق',
    unit: 'W/m²',
    min: 500,
    max: 1500,
    average: 1000,
    sf: '0.6',
  },
  {
    buildingUse: 'Apartment complex',
    buildingUseAr: 'مجمع سكني',
    details: 'without night storage / continuous-flow water heater',
    detailsAr: 'بدون تخزين ليلي / سخان مياه فوري',
    unit: 'W/m²',
    min: 10,
    max: 30,
    average: 20,
    sf: '0.6',
  },
  {
    buildingUse: 'Museum',
    buildingUseAr: 'متحف',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 60,
    max: 80,
    average: 70,
    sf: '0.6',
  },
  {
    buildingUse: 'Parking garage',
    buildingUseAr: 'موقف سيارات',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 3,
    max: 10,
    average: 6.5,
    sf: '0.6',
  },
  {
    buildingUse: 'Production plant',
    buildingUseAr: 'مصنع إنتاج',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 30,
    max: 80,
    average: 55,
    sf: '0.6',
  },
  {
    buildingUse: 'Data center',
    buildingUseAr: 'مركز بيانات',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 500,
    max: 2000,
    average: 1250,
    sf: '1.0',
  },
  {
    buildingUse: 'School',
    buildingUseAr: 'مدرسة',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 10,
    max: 30,
    average: 20,
    sf: '0.6',
  },
  {
    buildingUse: 'Gym hall',
    buildingUseAr: 'صالة رياضية',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 15,
    max: 30,
    average: 22.5,
    sf: '0.6',
  },
  {
    buildingUse: 'Stadium (40,000-80,000 seats)',
    buildingUseAr: 'ملعب (40,000-80,000 مقعد)',
    details: '',
    detailsAr: '',
    unit: 'W/seat',
    min: 70,
    max: 120,
    average: 95,
    sf: '0.6',
  },
  {
    buildingUse: "Old people's home",
    buildingUseAr: 'دار رعاية المسنين',
    details: '',
    detailsAr: '',
    unit: 'W/m²',
    min: 15,
    max: 30,
    average: 22.5,
    sf: '0.6',
  },
  {
    buildingUse: 'Greenhouse',
    buildingUseAr: 'صوبة زراعية',
    details: 'artificial lighting',
    detailsAr: 'إضاءة صناعية',
    unit: 'W/m²',
    min: 250,
    max: 500,
    average: 375,
    sf: '0.0',
  },
];

// 2. TAB 2: Table 30/2 - FUNCTIONAL AREAS
// Columns: Area | Unit | Min | Max | Average | SF
export const IEC_TABLE_30_2_FUNCTIONAL_AREAS: IecFunctionalAreaRow[] = [
  {
    area: 'Hallway / anteroom, lobby',
    areaAr: 'ممر / صالة انتظار / بهو',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.3',
  },
  {
    area: 'Staircase',
    areaAr: 'بيت الدرج / السلم',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.3',
  },
  {
    area: 'Equipment, general',
    areaAr: 'معدات عامة',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.3',
  },
  {
    area: 'Foyer',
    areaAr: 'المدخل الرئيسي (Foyer)',
    unit: 'W/m²',
    min: 10,
    max: 30,
    average: 20,
    sf: '1.0',
  },
  {
    area: 'Access ways (e.g. tunnel)',
    areaAr: 'ممرات الوصول (مثل الأنفاق)',
    unit: 'W/m²',
    min: 10,
    max: 20,
    average: 15,
    sf: '1.0',
  },
  {
    area: 'Recreation room / kitchenette',
    areaAr: 'غرفة استراحة / مطبخ صغير',
    unit: 'W/m²',
    min: 20,
    max: 50,
    average: 35,
    sf: '0.3',
  },
  {
    area: 'Toilet areas',
    areaAr: 'دورات المياه',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '1.0',
  },
  {
    area: 'Travel center',
    areaAr: 'مركز سفر',
    unit: 'W/m²',
    min: 60,
    max: 80,
    average: 70,
    sf: '0.8',
  },
  {
    area: 'Office areas',
    areaAr: 'مناطق المكاتب',
    unit: 'W/m²',
    min: 20,
    max: 40,
    average: 30,
    sf: '0.8',
  },
  {
    area: 'Newspapers / bookstore',
    areaAr: 'صحف / مكتبة لبيع الكتب',
    unit: 'W/m²',
    min: 80,
    max: 120,
    average: 100,
    sf: '0.8',
  },
  {
    area: 'Flower shop',
    areaAr: 'متجر زهور',
    unit: 'W/m²',
    min: 80,
    max: 120,
    average: 100,
    sf: '0.8',
  },
  {
    area: 'Bakery / butcher',
    areaAr: 'مخبز / جزارة',
    unit: 'W/m²',
    min: 250,
    max: 350,
    average: 300,
    sf: '0.8',
  },
  {
    area: 'Fruit / vegetables',
    areaAr: 'فواكه / خضروات',
    unit: 'W/m²',
    min: 80,
    max: 120,
    average: 100,
    sf: '0.8',
  },
  {
    area: 'Bistro / ice cream parlour',
    areaAr: 'بيسترو / محل مثلجات',
    unit: 'W/m²',
    min: 150,
    max: 250,
    average: 200,
    sf: '0.8',
  },
  {
    area: 'Snack bar',
    areaAr: 'مطعم وجبات خفيفة',
    unit: 'W/m²',
    min: 180,
    max: 220,
    average: 200,
    sf: '0.8',
  },
  {
    area: 'Diner / restaurant',
    areaAr: 'مطعم',
    unit: 'W/m²',
    min: 180,
    max: 400,
    average: 290,
    sf: '0.8',
  },
  {
    area: 'Tobacco shop',
    areaAr: 'متجر تبغ',
    unit: 'W/m²',
    min: 80,
    max: 120,
    average: 100,
    sf: '0.8',
  },
  {
    area: 'Hairdresser',
    areaAr: 'صالون حلاقة وتجميل',
    unit: 'W/m²',
    min: 220,
    max: 280,
    average: 250,
    sf: '0.8',
  },
  {
    area: "Dry-cleaner's / laundry",
    areaAr: 'مغسلة / تنظيف جاف',
    unit: 'W/m²',
    min: 700,
    max: 950,
    average: 825,
    sf: '0.7',
  },
  {
    area: 'Storage area',
    areaAr: 'منطقة تخزين',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.3',
  },
  {
    area: 'Kitchens',
    areaAr: 'المطابخ',
    unit: 'W/m²',
    min: 200,
    max: 400,
    average: 300,
    sf: '0.7',
  },
];

// 3. TAB 3: Installations
// Sub-table A: Equipment SFs [Equipment, SF]
export const IEC_INSTALLATIONS_PART_A: IecEquipmentRow[] = [
  { equipment: 'Escalator', equipmentAr: 'سلم كهربائي', sf: '0.5' },
  { equipment: 'Elevator', equipmentAr: 'مصعد', sf: '0.3' },
  { equipment: 'Sanitary systems', equipmentAr: 'الأنظمة الصحية', sf: '0.5' },
  { equipment: 'Sprinklers', equipmentAr: 'مرشات الحريق', sf: '0.1' },
  { equipment: 'Heating', equipmentAr: 'التدفئة', sf: '0.8' },
  { equipment: 'Air conditioning', equipmentAr: 'تكييف الهواء', sf: '0.8' },
  { equipment: 'Cooling water system', equipmentAr: 'نظام مياه التبريد', sf: '0.7' },
  { equipment: 'Refrigeration', equipmentAr: 'التبريد والتجميد', sf: '0.7' },
];

// Sub-table B: Heating/Cooling Densities [Item, Unit, Min, Max, Average]
export const IEC_INSTALLATIONS_PART_B: IecHeatingPvRow[] = [
  {
    item: 'Electric floor heating - living',
    itemAr: 'تدفئة أرضية كهربائية - غرف المعيشة',
    unit: 'W/m²',
    min: 65,
    max: 100,
    average: 82.5,
  },
  {
    item: 'Electric floor heating - bathroom',
    itemAr: 'تدفئة أرضية كهربائية - الحمامات',
    unit: 'W/m²',
    min: 130,
    max: 150,
    average: 140,
  },
  {
    item: 'Night storage - low energy',
    itemAr: 'تخزين حراري ليلي - منخفض الطاقة',
    unit: 'W/m²',
    min: 60,
    max: 70,
    average: 65,
  },
  {
    item: 'Night storage - standard',
    itemAr: 'تخزين حراري ليلي - قياسي',
    unit: 'W/m²',
    min: 100,
    max: 110,
    average: 105,
  },
  {
    item: 'Small aircon unit',
    itemAr: 'وحدة تكييف صغيرة',
    unit: 'W/m²',
    min: 60,
    max: 60,
    average: 60,
  },
  {
    item: 'Photovoltaics',
    itemAr: 'الألواح الشمسية الكهروضوئية',
    unit: 'W/m²',
    min: 100,
    max: 130,
    average: 115,
  },
];

// 4. TAB 4: Lighting & Power
// Sub-table A: Fluorescent Lighting [Application, VA/m², Lux]
export const IEC_LIGHTING_PART_A: IecLightingRow[] = [
  { application: 'Roads and highways', applicationAr: 'الطرق والطرق السريعة', vaPerM2: 7, lux: 150 },
  { application: 'Heavy-duty works', applicationAr: 'الأعمال الشاقة', vaPerM2: 14, lux: 300 },
  { application: 'Office work', applicationAr: 'أعمال المكاتب', vaPerM2: 24, lux: 500 },
  { application: 'Fine work', applicationAr: 'الأعمال الدقيقة', vaPerM2: 41, lux: 800 },
];

// Sub-table B: Power Circuits [Application, Min VA/m², Max VA/m², Avg VA/m²]
export const IEC_POWER_PART_B: IecPowerRow[] = [
  {
    application: 'Pumping station compressed air',
    applicationAr: 'محطة ضخ الهواء المضغوط',
    minVaPerM2: 3,
    maxVaPerM2: 6,
    avgVaPerM2: 4.5,
  },
  {
    application: 'Ventilation of premises',
    applicationAr: 'تهوية المباني والمنشآت',
    minVaPerM2: 23,
    maxVaPerM2: 23,
    avgVaPerM2: 23,
  },
  {
    application: 'Electric convection heaters (private)',
    applicationAr: 'سخانات حرارية كهربائية (خاص)',
    minVaPerM2: 115,
    maxVaPerM2: 146,
    avgVaPerM2: 130.5,
  },
  {
    application: 'Electric convection heaters (flats)',
    applicationAr: 'سخانات حرارية كهربائية (شقق)',
    minVaPerM2: 90,
    maxVaPerM2: 90,
    avgVaPerM2: 90,
  },
  {
    application: 'Offices',
    applicationAr: 'المكاتب',
    minVaPerM2: 25,
    maxVaPerM2: 25,
    avgVaPerM2: 25,
  },
  {
    application: 'Dispatching workshop',
    applicationAr: 'ورشة الإرسال والتجهيز',
    minVaPerM2: 50,
    maxVaPerM2: 50,
    avgVaPerM2: 50,
  },
  {
    application: 'Assembly workshop',
    applicationAr: 'ورشة التجميع',
    minVaPerM2: 70,
    maxVaPerM2: 70,
    avgVaPerM2: 70,
  },
  {
    application: 'Machine shop',
    applicationAr: 'ورشة الآلات والمخارط',
    minVaPerM2: 300,
    maxVaPerM2: 300,
    avgVaPerM2: 300,
  },
  {
    application: 'Painting workshop',
    applicationAr: 'ورشة الطلاء',
    minVaPerM2: 350,
    maxVaPerM2: 350,
    avgVaPerM2: 350,
  },
  {
    application: 'Heat-treatment plant',
    applicationAr: 'مصنع المعالجة الحرارية',
    minVaPerM2: 700,
    maxVaPerM2: 700,
    avgVaPerM2: 700,
  },
];

// 5. TAB 5: IEC Ks (Simultaneity Factors)
// Sub-table A: Fig B10 - Apartments [Consumers, Ks]
export const IEC_KS_FIG_B10: IecKsConsumerRow[] = [
  { consumers: '2 to 4', consumersAr: '2 إلى 4', ks: '1' },
  { consumers: '5 to 9', consumersAr: '5 إلى 9', ks: '0.78' },
  { consumers: '10 to 14', consumersAr: '10 إلى 14', ks: '0.63' },
  { consumers: '15 to 19', consumersAr: '15 إلى 19', ks: '0.53' },
  { consumers: '20 to 24', consumersAr: '20 إلى 24', ks: '0.49' },
  { consumers: '25 to 29', consumersAr: '25 إلى 29', ks: '0.46' },
  { consumers: '30 to 34', consumersAr: '30 إلى 34', ks: '0.44' },
  { consumers: '35 to 39', consumersAr: '35 إلى 39', ks: '0.42' },
  { consumers: '40 to 49', consumersAr: '40 إلى 49', ks: '0.41' },
  { consumers: '50 and more', consumersAr: '50 فأكثر', ks: '0.40' },
];

// Sub-table B: Fig B12 - Distribution Boards [Circuits, Ks]
export const IEC_KS_FIG_B12: IecKsCircuitRow[] = [
  { circuits: '2 and 3', circuitsAr: '2 و 3', ks: '0.9' },
  { circuits: '4 and 5', circuitsAr: '4 و 5', ks: '0.8' },
  { circuits: '6 to 9', circuitsAr: '6 إلى 9', ks: '0.7' },
  { circuits: '10 and more', circuitsAr: '10 فأكثر', ks: '0.6' },
  { circuits: 'Partially tested', circuitsAr: 'مختبرة جزئياً', ks: '1.0' },
];

// Sub-table C: Fig B13 - Circuit Function [Function, Ks]
export const IEC_KS_FIG_B13: IecKsFunctionRow[] = [
  { functionName: 'Lighting', functionNameAr: 'الإنارة', ks: '1' },
  { functionName: 'Heating and A/C', functionNameAr: 'التدفئة والتكييف', ks: '1' },
  { functionName: 'Socket-outlets', functionNameAr: 'مخارج المقابس', ks: '0.1 - 0.2' },
  { functionName: 'Socket-outlets (10+)', functionNameAr: 'مخارج المقابس (+10)', ks: '0.6' },
  { functionName: 'Lifts (most powerful)', functionNameAr: 'المصاعد (الأكبر قدرة)', ks: '1' },
  { functionName: 'Lifts (2nd powerful)', functionNameAr: 'المصاعد (الثاني قدرة)', ks: '0.75' },
  { functionName: 'Lifts (all motors)', functionNameAr: 'المصاعد (جميع المحركات)', ks: '0.60' },
];

// 6. TAB 6: SPS & RPS (Safety Power Supply & Reserve Power Supply)
// Columns: Load | System-SF | Comments
export const IEC_SPS_RPS_TABLE: IecSpsRpsRow[] = [
  {
    load: 'Special equipment',
    loadAr: 'معدات خاصة',
    systemSf: '1.0',
    comments: 'Consider network synchronization',
    commentsAr: 'مراعاة تزامن الشبكة',
  },
  {
    load: 'Safety/substitute lighting',
    loadAr: 'إنارة السلامة / الإنارة البديلة',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'Alarm systems',
    loadAr: 'أنظمة الإنذار',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'Fire extinguishing pumps',
    loadAr: 'مضخات إطفاء الحريق',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'Sewage water lifting',
    loadAr: 'رفع مياه الصرف الصحي',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'A/C (smoke extraction)',
    loadAr: 'التكييف (سحب الدخان)',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'Elevators for fire brigade',
    loadAr: 'مصاعد رجال الإطفاء',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
  {
    load: 'Building automation',
    loadAr: 'أنظمة أتمتة المباني',
    systemSf: '1.0',
    comments: '',
    commentsAr: '',
  },
];
