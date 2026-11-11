// IEC 60364 Electrical Load Estimation Dataset
// Source: IEC 60364-8-1, IEC 60364-5-52, CENELEC HD 60364, Siemens TIP Guide

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
  typicalRating: string;
  typicalRatingAr: string;
  notes: string;
  notesAr: string;
}

export interface IecHeatingPvRow {
  item: string;
  itemAr: string;
  unit: string;
  min: number;
  max: number;
  average: number;
  notes: string;
  notesAr: string;
}

export interface IecLightingRow {
  application: string;
  applicationAr: string;
  vaPerM2: string;
  lux: string;
  standardTarget: string;
  standardTargetAr: string;
}

export interface IecPowerRow {
  application: string;
  applicationAr: string;
  details: string;
  detailsAr: string;
  unit: string;
  min: number;
  max: number;
  average: number;
}

export interface IecKsConsumerRow {
  from: number;
  to: number | string;
  ks: number;
}

export interface IecKsCircuitRow {
  from: number;
  to: number | string;
  ks: number;
}

export interface IecKsFunctionRow {
  functionName: string;
  functionNameAr: string;
  ks: string;
  guidance: string;
  guidanceAr: string;
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
    sf: '0.60',
  },
  {
    buildingUse: 'Library',
    buildingUseAr: 'مكتبة عامة',
    details: 'Reading rooms & archival stacks',
    detailsAr: 'قاعات المطالعة ومستودعات الكتب',
    unit: 'W/m²',
    min: 20,
    max: 40,
    average: 30,
    sf: '0.60',
  },
  {
    buildingUse: 'Office',
    buildingUseAr: 'مبنى إداري / مكاتب',
    details: 'Administrative spaces & standard offices',
    detailsAr: 'مكاتب إدارية وقاعات عمل قياسية',
    unit: 'W/m²',
    min: 30,
    max: 50,
    average: 40,
    sf: '0.60',
  },
  {
    buildingUse: 'Shopping center',
    buildingUseAr: 'مركز تسوق / مول',
    details: 'Retail spaces, boutiques & galleries',
    detailsAr: 'المحلات والمتاجر وصالات العرض المشتركة',
    unit: 'W/m²',
    min: 30,
    max: 60,
    average: 45,
    sf: '0.60',
  },
  {
    buildingUse: 'Hotel',
    buildingUseAr: 'فندق سياحي',
    details: 'Guest rooms, reception & public areas',
    detailsAr: 'غرف النزلاء والاستقبال والمرافق العامة',
    unit: 'W/m²',
    min: 25,
    max: 45,
    average: 35,
    sf: '0.60',
  },
  {
    buildingUse: 'Small hospital',
    buildingUseAr: 'مستشفى صغير / مجمع عيادات',
    details: 'General wards, clinics & diagnosis',
    detailsAr: 'أجنحة التنويم، عيادات فحص وتشخيص',
    unit: 'W/m²',
    min: 40,
    max: 80,
    average: 60,
    sf: '0.70',
  },
  {
    buildingUse: 'School',
    buildingUseAr: 'مدرسة تعليمية',
    details: 'Classrooms, laboratories & administration',
    detailsAr: 'الفصول الدراسية والمختبرات والمكاتب',
    unit: 'W/m²',
    min: 15,
    max: 35,
    average: 25,
    sf: '0.60',
  },
  {
    buildingUse: 'Restaurant',
    buildingUseAr: 'مطعم وخدمات تقديم الطعام',
    details: 'Commercial kitchen, dining & cold rooms',
    detailsAr: 'المطبخ التجاري وصالة الطعام والتبريد',
    unit: 'W/m²',
    min: 60,
    max: 120,
    average: 90,
    sf: '0.70',
  },
  {
    buildingUse: 'Multi-family dwelling',
    buildingUseAr: 'مبنى سكني متعدد الشقق',
    details: 'Residential apartment units & utilities',
    detailsAr: 'الوحدات السكنية والخدمات المشتركة',
    unit: 'W/m²',
    min: 15,
    max: 30,
    average: 22,
    sf: '0.50',
  },
  {
    buildingUse: 'Kindergarten',
    buildingUseAr: 'روضة أطفال / حضانة',
    details: 'Activity rooms & food preparation',
    detailsAr: 'قاعات الأنشطة وتحضير الوجبات',
    unit: 'W/m²',
    min: 15,
    max: 30,
    average: 22,
    sf: '0.60',
  },
  {
    buildingUse: 'Warehouse',
    buildingUseAr: 'مستودع تخزين / لوجستيات',
    details: 'High-bay storage & loading bays',
    detailsAr: 'التخزين العالي ومنصات التفريغ والتحميل',
    unit: 'W/m²',
    min: 10,
    max: 25,
    average: 18,
    sf: '0.50',
  },
];

// 2. TAB 2: Table 30/2 - FUNCTIONAL AREAS
// Columns: Functional Area | Unit | Min | Max | Average | SF
export const IEC_TABLE_30_2_FUNCTIONAL_AREAS: IecFunctionalAreaRow[] = [
  {
    area: 'Hallway',
    areaAr: 'الممرات والردهات',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.90',
  },
  {
    area: 'Staircase',
    areaAr: 'بيت الدرج / السلالم',
    unit: 'W/m²',
    min: 5,
    max: 12,
    average: 8,
    sf: '0.80',
  },
  {
    area: 'Foyer',
    areaAr: 'بهو المدخل الرئيسي والاستقبال',
    unit: 'W/m²',
    min: 20,
    max: 50,
    average: 35,
    sf: '0.85',
  },
  {
    area: 'Office areas',
    areaAr: 'المكاتب وقاعات العمل',
    unit: 'W/m²',
    min: 25,
    max: 60,
    average: 40,
    sf: '0.75',
  },
  {
    area: 'Kitchens',
    areaAr: 'المطابخ والتموين',
    unit: 'W/m²',
    min: 100,
    max: 250,
    average: 160,
    sf: '0.70',
  },
  {
    area: 'Conference rooms',
    areaAr: 'قاعات الاجتماعات والمؤتمرات',
    unit: 'W/m²',
    min: 25,
    max: 65,
    average: 45,
    sf: '0.60',
  },
  {
    area: 'Sanitary facilities',
    areaAr: 'المرافق الصحية ودورات المياه',
    unit: 'W/m²',
    min: 10,
    max: 25,
    average: 18,
    sf: '0.50',
  },
  {
    area: 'Technical rooms',
    areaAr: 'الغرف الفنية والميكانيكية',
    unit: 'W/m²',
    min: 15,
    max: 35,
    average: 25,
    sf: '0.80',
  },
  {
    area: 'Underground parking',
    areaAr: 'مواقف السيارات تحت الأرض',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.60',
  },
  {
    area: 'Archive / Storage',
    areaAr: 'غرف الأرشيف والمخازن',
    unit: 'W/m²',
    min: 5,
    max: 15,
    average: 10,
    sf: '0.40',
  },
];

// 3. TAB 3: Installations (Special Loads)
// Part A: Equipment Simultaneity Factors
export const IEC_INSTALLATIONS_PART_A: IecEquipmentRow[] = [
  {
    equipment: 'Escalator',
    equipmentAr: 'السلم الكهربائي المتحرك',
    sf: '0.80 - 1.00',
    typicalRating: '7.5 - 15 kW',
    typicalRatingAr: '7.5 - 15 كيلووات',
    notes: 'Continuous passenger operation during operating hours',
    notesAr: 'تشغيل مستمر للركاب طوال ساعات العمل',
  },
  {
    equipment: 'Elevator (Passenger)',
    equipmentAr: 'مصعد الركاب',
    sf: '0.60 - 0.75',
    typicalRating: '11 - 30 kW',
    typicalRatingAr: '11 - 30 كيلووات',
    notes: 'Group diversity applied for multi-car lift banks',
    notesAr: 'معامل تزامن لمجموعات المصاعد متعددة الكبائن',
  },
  {
    equipment: 'Elevator (Freight)',
    equipmentAr: 'مصعد البضائع / الخدمة',
    sf: '0.70',
    typicalRating: '15 - 45 kW',
    typicalRatingAr: '15 - 45 كيلووات',
    notes: 'Heavy goods intermittent service cycle',
    notesAr: 'تشغيل متقطع مخصص للأحمال والبضائع الثقيلة',
  },
  {
    equipment: 'Sanitary pumps',
    equipmentAr: 'مضخات المياه والصرف الصحي',
    sf: '0.80',
    typicalRating: '3 - 11 kW',
    typicalRatingAr: '3 - 11 كيلووات',
    notes: 'Duty / Standby alternating system configuration',
    notesAr: 'نظام تبادلي (مضخة عاملة ومضخة احتياطية)',
  },
  {
    equipment: 'Heating circulation',
    equipmentAr: 'مضخات تدوير مياه التدفئة',
    sf: '0.90 - 1.00',
    typicalRating: '1.5 - 7.5 kW',
    typicalRatingAr: '1.5 - 7.5 كيلووات',
    notes: 'Continuous circulation throughout winter heating cycle',
    notesAr: 'تدوير مستمر للمياه طوال موسم التدفئة الشتوي',
  },
  {
    equipment: 'A/C (Air conditioning)',
    equipmentAr: 'مبردات التكييف المركزي (Chillers)',
    sf: '0.80 - 0.90',
    typicalRating: '50 - 500 kW',
    typicalRatingAr: '50 - 500 كيلووات',
    notes: 'Coincident summer peak cooling demand',
    notesAr: 'أقصى حمل تبريد متزامن خلال ذروة الصيف',
  },
];

// Part B: Space Heating, Cooling & Renewables
export const IEC_INSTALLATIONS_PART_B: IecHeatingPvRow[] = [
  {
    item: 'Floor heating',
    itemAr: 'تدفئة الأرضيات الكهربائية',
    unit: 'W/m²',
    min: 80,
    max: 160,
    average: 120,
    notes: 'Direct electric radiant screed heating',
    notesAr: 'تدفئة إشعاعية مباشرة مدمجة في الأرضيات',
  },
  {
    item: 'Night storage heating',
    itemAr: 'سخانات التخزين الحراري الليلي',
    unit: 'W/m²',
    min: 100,
    max: 200,
    average: 150,
    notes: 'Off-peak charging thermal blocks',
    notesAr: 'شحن حراري خلال ساعات انخفاض التعرفة الليلية',
  },
  {
    item: 'PV (Photovoltaic)',
    itemAr: 'أنظمة الطاقة الشمسية الكهروضوئية',
    unit: 'Wp/m²',
    min: 120,
    max: 220,
    average: 170,
    notes: 'Rooftop monocrystalline solar peak rating',
    notesAr: 'القدرة القصوى للألواح الشمسية على الأسطح',
  },
  {
    item: 'Heat pump (Air / Water)',
    itemAr: 'المضخات الحرارية (هواء / ماء)',
    unit: 'W/m²',
    min: 30,
    max: 70,
    average: 50,
    notes: 'High efficiency reversible seasonal heating & cooling',
    notesAr: 'كفاءة موسمية عالية للتدفئة والتبريد العكسي',
  },
  {
    item: 'Mechanical ventilation',
    itemAr: 'مراوح التهوية الميكانيكية المركزية',
    unit: 'W/m²',
    min: 15,
    max: 35,
    average: 25,
    notes: 'Central AHU supply and exhaust fan systems',
    notesAr: 'وحدات مناولة الهواء وتدوير الهواء النقي',
  },
];

// 4. TAB 4: Lighting & Power
// Part A: Lighting Load Density & Illuminance Levels
export const IEC_LIGHTING_PART_A: IecLightingRow[] = [
  {
    application: 'Roads & External areas',
    applicationAr: 'الطرق والساحات الخارجية',
    vaPerM2: '2 - 5',
    lux: '20 - 50',
    standardTarget: 'EN 13201 street & driveway illumination',
    standardTargetAr: 'المواصفة EN 13201 لإنارة الشوارع والممرات',
  },
  {
    application: 'Heavy-duty & Industrial',
    applicationAr: 'الصناعات الثقيلة والورش الميكانيكية',
    vaPerM2: '15 - 30',
    lux: '200 - 300',
    standardTarget: 'Machinery workshops & rough manufacturing',
    standardTargetAr: 'ورش الآلات والتصنيع العام',
  },
  {
    application: 'Office work',
    applicationAr: 'المكاتب وبيئات العمل الإدارية',
    vaPerM2: '12 - 20',
    lux: '500',
    standardTarget: 'EN 12464-1 writing, typing & reading tasks',
    standardTargetAr: 'المواصفة EN 12464-1 لأعمال الكتابة والقراءة والمكاتب',
  },
  {
    application: 'Fine work & Drafting',
    applicationAr: 'الأعمال الدقيقة والرسم الهندسي',
    vaPerM2: '25 - 45',
    lux: '750 - 1000',
    standardTarget: 'Precision engineering & detailed inspection',
    standardTargetAr: 'التفتيش الدقيق وأعمال الهندسة الدقيقة',
  },
  {
    application: 'Circulation & Hallways',
    applicationAr: 'الممرات ومسارات الحركة',
    vaPerM2: '5 - 10',
    lux: '100',
    standardTarget: 'Safe corridor passage & emergency routing',
    standardTargetAr: 'سلامة الحركة ومسارات الإخلاء الآمنة',
  },
  {
    application: 'Retail & Sales display',
    applicationAr: 'المحلات والمتاجر وصالات العرض',
    vaPerM2: '20 - 45',
    lux: '500 - 1000',
    standardTarget: 'Merchandising & feature accent lighting',
    standardTargetAr: 'إبراز المعروضات التجارية وجذب المتسوقين',
  },
];

// Part B: Small Power / Receptacles
export const IEC_POWER_PART_B: IecPowerRow[] = [
  {
    application: 'Ventilation',
    applicationAr: 'مراوح التهوية ووحدات FCU',
    details: 'Local extract fans, fan coil units & dampers',
    detailsAr: 'مراوح الطرد الموضعية ووحدات مناولة الغرف',
    unit: 'VA/m²',
    min: 10,
    max: 25,
    average: 18,
  },
  {
    application: 'Heaters',
    applicationAr: 'السخانات والتدفئة الموضعية',
    details: 'Local convective heaters & radiant panels',
    detailsAr: 'السخانات الحملية والألواح المشعة الموضعية',
    unit: 'VA/m²',
    min: 40,
    max: 100,
    average: 70,
  },
  {
    application: 'Offices',
    applicationAr: 'المكاتب ومقابس الأجهزة العامة',
    details: 'General PCs, monitors & peripherals',
    detailsAr: 'أجهزة الكمبيوتر والشاشات ومقابس الخدمات',
    unit: 'VA/m²',
    min: 15,
    max: 35,
    average: 25,
  },
  {
    application: 'Workshops',
    applicationAr: 'الورش ومقابس القوى الحرفية',
    details: 'Bench tools, drills & test equipment',
    detailsAr: 'معدات الاختبار والأدوات اليدوية الكهربائية',
    unit: 'VA/m²',
    min: 30,
    max: 80,
    average: 50,
  },
  {
    application: 'Classrooms',
    applicationAr: 'الفصول الدراسية بالمدارس',
    details: 'Interactive smart boards & device charging',
    detailsAr: 'السبورات الذكية ووحدات شحن الأجهزة',
    unit: 'VA/m²',
    min: 8,
    max: 20,
    average: 14,
  },
  {
    application: 'Conference rooms',
    applicationAr: 'قاعات المؤتمرات والاجتماعات',
    details: 'Video conferencing, projectors & laptops',
    detailsAr: 'شاشات العرض وأجهزة المحادثة المرئية',
    unit: 'VA/m²',
    min: 20,
    max: 45,
    average: 30,
  },
];

// 5. TAB 5: IEC Ks (Simultaneity Factors)
// Fig. B10: Number of Consumers
export const IEC_KS_FIG_B10: IecKsConsumerRow[] = [
  { from: 2, to: 3, ks: 0.90 },
  { from: 4, to: 5, ks: 0.80 },
  { from: 6, to: 9, ks: 0.70 },
  { from: 10, to: 19, ks: 0.60 },
  { from: 20, to: 29, ks: 0.50 },
  { from: 30, to: 49, ks: 0.45 },
  { from: 50, to: 'and more', ks: 0.40 },
];

// Fig. B12: Number of Circuits in Distribution Board
export const IEC_KS_FIG_B12: IecKsCircuitRow[] = [
  { from: 2, to: 3, ks: 0.90 },
  { from: 4, to: 5, ks: 0.80 },
  { from: 6, to: 9, ks: 0.70 },
  { from: 10, to: 'and more', ks: 0.60 },
];

// Fig. B13: Circuit Function
export const IEC_KS_FIG_B13: IecKsFunctionRow[] = [
  {
    functionName: 'Lighting circuits',
    functionNameAr: 'دوائر الإنارة العامة',
    ks: '1.00',
    guidance: '100% coincident duty under normal operating hours',
    guidanceAr: 'حمل متزامن بنسبة 100% أثناء ساعات العمل الطبيعية',
  },
  {
    functionName: 'Space heating & air conditioning',
    functionNameAr: 'دوائر التدفئة والتكييف (HVAC)',
    ks: '1.00',
    guidance: 'Full capacity during peak thermal climate conditions',
    guidanceAr: 'كامل القدرة التصميمية خلال ذروة الطقس الحار أو البارد',
  },
  {
    functionName: 'Socket-outlet circuits (general)',
    functionNameAr: 'دوائر مخارج المقابس العامة (Receptacles)',
    ks: '0.10 - 0.20',
    guidance: 'Standard office or domestic receptacle diversity (IEC 60364)',
    guidanceAr: 'تزامن المقابس للأحمال المكتبية والمنزلية القياسية',
  },
  {
    functionName: 'Electric motors (grouped)',
    functionNameAr: 'المحركات الكهربائية (المجمعة)',
    ks: '1.00 + 0.75',
    guidance: '1.0 for the largest motor + 0.75 for all remaining motors',
    guidanceAr: '1.0 لأكبر محرك منفرد + 0.75 لبقية المحركات مجتمعة',
  },
  {
    functionName: 'Lifts and elevators (multiple)',
    functionNameAr: 'المصاعد متعددة الكبائن',
    ks: '1.00 + 0.75 + 0.60',
    guidance: '1.0 for first lift + 0.75 for second lift + 0.60 for remaining',
    guidanceAr: '1.0 لأول مصعد + 0.75 لثاني مصعد + 0.60 لبقية المصاعد',
  },
];

// 6. TAB 6: SPS & RPS (Safety Power Supply & Reserve Power Supply)
// Columns: Load | System-SF | Comments
export const IEC_SPS_RPS_TABLE: IecSpsRpsRow[] = [
  {
    load: 'Emergency lighting & Exit signs',
    loadAr: 'إنارة الطوارئ وإشارات مسالك الهروب',
    systemSf: '1.00',
    comments: 'Mandatory automatic switchover <= 0.5 s (Central battery / UPS)',
    commentsAr: 'تحويل تلقائي فوري <= 0.5 ثانية (بطاريات مركزية أو UPS)',
  },
  {
    load: 'Firefighters elevator (Fire lifts)',
    loadAr: 'مصاعد رجال الإطفاء والدفاع المدني',
    systemSf: '1.00',
    comments: 'Automatic transfer within <= 15 s, supplied from dual feeder or generator',
    commentsAr: 'تحويل تلقائي <= 15 ثانية، تغذية مزدوجة أو مولد طوارئ مخصص',
  },
  {
    load: 'Fire detection & Voice alarm system',
    loadAr: 'أنظمة الكشف عن الحريق والإنذار الصوتي',
    systemSf: '1.00',
    comments: 'Continuous battery-buffered standby with min 24h autonomy + 30 min alarm',
    commentsAr: 'تغذية مستمرة من بطاريات بحد أدنى 24 ساعة جهوزية + 30 دقيقة إنذار',
  },
  {
    load: 'Smoke extraction & Pressurization fans',
    loadAr: 'مراوح طرد الدخان وضغط السلالم',
    systemSf: '1.00',
    comments: 'Full rated continuous power, direct feed from emergency busbar',
    commentsAr: 'قدرة كاملة دون تخفيض، تغذية مباشرة من لوحة طوارئ معزولة',
  },
  {
    load: 'Fire fighting water booster pumps',
    loadAr: 'مضخات إطفاء الحريق ومكافحة اللهب',
    systemSf: '1.00',
    comments: 'Independent emergency power source with bypass and lock-in starting',
    commentsAr: 'مصدر طوارئ مستقل مع تشغيل مباشر وتأمين تدفق المياه',
  },
  {
    load: 'Hospital Operating Theatres & ICU',
    loadAr: 'غرف العمليات والعناية المركزة (مستشفيات)',
    systemSf: '1.00',
    comments: 'Class 0.5 IT medical isolated system, no break / short break <= 0.5 s',
    commentsAr: 'نظام طبي معزول فئة 0.5 IT، بدون انقطاع أو تحويل <= 0.5 ثانية',
  },
  {
    load: 'Essential HVAC / Laboratory extraction',
    loadAr: 'التهوية الضرورية ومختبرات الأبحاث',
    systemSf: '0.80 - 1.00',
    comments: 'Transfer within <= 15 s to prevent containment breach or overheating',
    commentsAr: 'تحويل خلال 15 ثانية لتفادي تسرب المواد أو التلف البيئي',
  },
  {
    load: 'Server rooms & Data Center UPS',
    loadAr: 'غرف الخوادم ومراكز البيانات (UPS)',
    systemSf: '1.00',
    comments: 'Static online double conversion UPS backed by diesel generator set',
    commentsAr: 'أنظمة UPS أونلاين مزدوجة التحويل مدعومة بمولدات ديزل',
  },
];
