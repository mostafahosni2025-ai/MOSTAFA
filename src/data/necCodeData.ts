// American Code (NEC / NFPA 70 Article 220) Load Estimation Dataset

export interface NecLightingRow {
  occupancy: string;
  occupancyAr: string;
  group: string;
  groupAr: string;
  unitLoadVAm2: string;
  unitLoadVAft2: string;
  continuousDuty: string;
}

export interface NecTieredDfRow {
  occupancy: string;
  occupancyAr: string;
  portion: string;
  portionAr: string;
  df: string;
}

export interface NecDwellingDfRow {
  appliances: string;
  dryersDf: string;
  rangesDemand: string;
  notes: string;
  notesAr: string;
}

export interface NecCommercialDfRow {
  equipment: string;
  equipmentAr: string;
  df: string;
  notes: string;
  notesAr: string;
}

export interface NecSpecialOccupancyRow {
  loadType: string;
  loadTypeAr: string;
  ratingRule: string;
  ratingRuleAr: string;
  df: string;
  codeRef: string;
}

export interface NecFarmRow {
  portion: string;
  portionAr: string;
  df: string;
  guidance: string;
  guidanceAr: string;
}

// 1. Lighting Loads (Table 220.12 - General Lighting Loads by Occupancy)
// Columns: Type of Occupancy, Group, Unit load VA/m², Unit load VA/ft²
export const NEC_LIGHTING_LOADS: NecLightingRow[] = [
  {
    occupancy: 'Armories & Auditoriums',
    occupancyAr: 'صالات المناسبات والمدرجات العامة',
    group: 'Assembly (A-1)',
    groupAr: 'تجمعات كبرى (A-1)',
    unitLoadVAm2: '11 VA/m²',
    unitLoadVAft2: '1.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Banks',
    occupancyAr: 'البنوك والمصارف المالية',
    group: 'Business (B)',
    groupAr: 'أعمال وتجارة (B)',
    unitLoadVAm2: '38 VA/m²',
    unitLoadVAft2: '3.5 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Barber Shops & Beauty Parlors',
    occupancyAr: 'الصالونات ومراكز التجميل',
    group: 'Business (B)',
    groupAr: 'خدمات تجارية (B)',
    unitLoadVAm2: '32 VA/m²',
    unitLoadVAft2: '3.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Churches & Places of Worship',
    occupancyAr: 'المساجد ودور العبادة',
    group: 'Assembly (A-3)',
    groupAr: 'تجمعات دينية (A-3)',
    unitLoadVAm2: '11 VA/m²',
    unitLoadVAft2: '1.0 VA/ft²',
    continuousDuty: 'No',
  },
  {
    occupancy: 'Commercial / Retail Stores',
    occupancyAr: 'المتاجر والمحلات التجارية',
    group: 'Mercantile (M)',
    groupAr: 'متاجر تجزئة (M)',
    unitLoadVAm2: '32 VA/m²',
    unitLoadVAft2: '3.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Courtrooms & Civic Chambers',
    occupancyAr: 'قاعات المحاكم والمجالس الحكومية',
    group: 'Institutional (I)',
    groupAr: 'مؤسسات حكومية (I)',
    unitLoadVAm2: '22 VA/m²',
    unitLoadVAft2: '2.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Dwelling Units (Residential)',
    occupancyAr: 'الوحدات السكنية (شقق وفيلات)',
    group: 'Residential (R)',
    groupAr: 'سكني (R)',
    unitLoadVAm2: '33 VA/m²',
    unitLoadVAft2: '3.0 VA/ft²',
    continuousDuty: 'No (Tiered DF applies)',
  },
  {
    occupancy: 'Hospitals & Health Facilities',
    occupancyAr: 'المستشفيات والمنشآت الصحية',
    group: 'Institutional (I-2)',
    groupAr: 'رعاية صحية (I-2)',
    unitLoadVAm2: '22 VA/m²',
    unitLoadVAft2: '2.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Hotels & Motels',
    occupancyAr: 'الفنادق والموتيلات',
    group: 'Residential (R-1)',
    groupAr: 'إشغال فندقي (R-1)',
    unitLoadVAm2: '22 VA/m²',
    unitLoadVAft2: '2.0 VA/ft²',
    continuousDuty: 'Yes (public areas)',
  },
  {
    occupancy: 'Office Buildings (Standard)',
    occupancyAr: 'المباني الإدارية والمكاتب القياسية',
    group: 'Business (B)',
    groupAr: 'أعمال إدارية (B)',
    unitLoadVAm2: '38 VA/m²',
    unitLoadVAft2: '3.5 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Restaurants & Dining Facilities',
    occupancyAr: 'المطاعم وقاعات تناول الطعام',
    group: 'Assembly (A-2)',
    groupAr: 'خدمات طعام (A-2)',
    unitLoadVAm2: '16 VA/m²',
    unitLoadVAft2: '1.5 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Schools & Educational',
    occupancyAr: 'المدارس والمنشآت التعليمية',
    group: 'Educational (E)',
    groupAr: 'تعليمي (E)',
    unitLoadVAm2: '32 VA/m²',
    unitLoadVAft2: '3.0 VA/ft²',
    continuousDuty: 'Yes (125%)',
  },
  {
    occupancy: 'Warehouses & Storage',
    occupancyAr: 'المستودعات ومخازن البضائع',
    group: 'Storage (S)',
    groupAr: 'تخزين ولوجستيات (S)',
    unitLoadVAm2: '3 VA/m²',
    unitLoadVAft2: '0.25 VA/ft²',
    continuousDuty: 'No',
  },
];

// 2. Tiered DF (Table 220.42 & Table 220.44)
export const NEC_TIERED_DF: NecTieredDfRow[] = [
  {
    occupancy: 'Dwelling Units (General lighting)',
    occupancyAr: 'الوحدات السكنية (الإنارة العامة)',
    portion: 'First 3,000 VA or less',
    portionAr: 'أول 3,000 فولت أمبير أو أقل',
    df: '100%',
  },
  {
    occupancy: 'Dwelling Units (General lighting)',
    occupancyAr: 'الوحدات السكنية (الإنارة العامة)',
    portion: 'From 3,001 to 120,000 VA',
    portionAr: 'من 3,001 إلى 120,000 فولت أمبير',
    df: '35%',
  },
  {
    occupancy: 'Dwelling Units (General lighting)',
    occupancyAr: 'الوحدات السكنية (الإنارة العامة)',
    portion: 'Remainder over 120,000 VA',
    portionAr: 'ما زاد عن 120,000 فولت أمبير',
    df: '25%',
  },
  {
    occupancy: 'Hospitals (General lighting)',
    occupancyAr: 'المستشفيات (الإنارة العامة)',
    portion: 'First 50,000 VA or less',
    portionAr: 'أول 50,000 فولت أمبير أو أقل',
    df: '40%',
  },
  {
    occupancy: 'Hospitals (General lighting)',
    occupancyAr: 'المستشفيات (الإنارة العامة)',
    portion: 'Remainder over 50,000 VA',
    portionAr: 'ما زاد عن 50,000 فولت أمبير',
    df: '20%',
  },
  {
    occupancy: 'Hotels & Motels (Lighting)',
    occupancyAr: 'الفنادق والموتيلات (الإنارة)',
    portion: 'First 20,000 VA or less',
    portionAr: 'أول 20,000 فولت أمبير أو أقل',
    df: '50%',
  },
  {
    occupancy: 'Hotels & Motels (Lighting)',
    occupancyAr: 'الفنادق والموتيلات (الإنارة)',
    portion: 'From 20,001 to 100,000 VA',
    portionAr: 'من 20,001 إلى 100,000 فولت أمبير',
    df: '40%',
  },
  {
    occupancy: 'Hotels & Motels (Lighting)',
    occupancyAr: 'الفنادق والموتيلات (الإنارة)',
    portion: 'Remainder over 100,000 VA',
    portionAr: 'ما زاد عن 100,000 فولت أمبير',
    df: '30%',
  },
  {
    occupancy: 'Warehouses (Storage lighting)',
    occupancyAr: 'المستودعات (إنارة التخزين)',
    portion: 'First 12,500 VA or less',
    portionAr: 'أول 12,500 فولت أمبير أو أقل',
    df: '100%',
  },
  {
    occupancy: 'Warehouses (Storage lighting)',
    occupancyAr: 'المستودعات (إنارة التخزين)',
    portion: 'Remainder over 12,500 VA',
    portionAr: 'ما زاد عن 12,500 فولت أمبير',
    df: '50%',
  },
  {
    occupancy: 'Non-Dwelling Receptacles',
    occupancyAr: 'المقابس غير السكنية (التجارية)',
    portion: 'First 10 kVA or less',
    portionAr: 'أول 10 كيلو فولت أمبير أو أقل',
    df: '100%',
  },
  {
    occupancy: 'Non-Dwelling Receptacles',
    occupancyAr: 'المقابس غير السكنية (التجارية)',
    portion: 'Remainder over 10 kVA',
    portionAr: 'ما زاد عن 10 كيلو فولت أمبير',
    df: '50%',
  },
];

// 3. Dwelling DF (Dryers & Cooking Appliances - Table 220.54 & 220.55)
export const NEC_DWELLING_DF: NecDwellingDfRow[] = [
  { appliances: '1 Unit', dryersDf: '100%', rangesDemand: '8 kW max', notes: 'Standard single household unit', notesAr: 'وحدة سكنية فردية قياسية' },
  { appliances: '2 Units', dryersDf: '100%', rangesDemand: '11 kW max', notes: 'Dual appliance installation', notesAr: 'تركيب جهازين متزامنين' },
  { appliances: '3 Units', dryersDf: '100%', rangesDemand: '14 kW max', notes: '3-unit multifamily branch', notesAr: 'مجمع سكني 3 شقق' },
  { appliances: '4 Units', dryersDf: '100%', rangesDemand: '17 kW max', notes: '4-unit residential feeder', notesAr: 'مغذي رئيسي 4 شقق' },
  { appliances: '5 Units', dryersDf: '85%', rangesDemand: '20 kW max', notes: '15% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 15%' },
  { appliances: '6 Units', dryersDf: '75%', rangesDemand: '21 kW max', notes: '25% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 25%' },
  { appliances: '7 Units', dryersDf: '65%', rangesDemand: '22 kW max', notes: '35% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 35%' },
  { appliances: '8 Units', dryersDf: '60%', rangesDemand: '23 kW max', notes: '40% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 40%' },
  { appliances: '9 Units', dryersDf: '55%', rangesDemand: '24 kW max', notes: '45% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 45%' },
  { appliances: '10 Units', dryersDf: '50%', rangesDemand: '25 kW max', notes: '50% diversity deduction', notesAr: 'تخفيض تزامن بنسبة 50%' },
  { appliances: '11 - 20 Units', dryersDf: '45%', rangesDemand: '25 kW + 1 kW/unit', notes: 'Stepped increment for ranges', notesAr: 'إضافة تزايدية 1 ك.و لكل شقة' },
  { appliances: '21 - 40 Units', dryersDf: '35%', rangesDemand: '15 kW + 1 kW/unit', notes: 'High-density multifamily', notesAr: 'مجمعات سكنية عالية الكثافة' },
];

// 4. Commercial DF (Kitchen & Elevators - Table 220.56 & Art. 620)
export const NEC_COMMERCIAL_DF: NecCommercialDfRow[] = [
  { equipment: 'Commercial Kitchen (1 unit)', equipmentAr: 'المطبخ التجاري (جهاز واحد)', df: '100%', notes: 'No diversity for solitary kitchen appliance', notesAr: 'لا يوجد تخفيض للجهاز المنفرد' },
  { equipment: 'Commercial Kitchen (2 units)', equipmentAr: 'المطبخ التجاري (جهازان)', df: '100%', notes: 'Full 100% connected rating evaluated', notesAr: 'تقييم بكامل القدرة 100%' },
  { equipment: 'Commercial Kitchen (3 units)', equipmentAr: 'المطبخ التجاري (3 أجهزة)', df: '90%', notes: 'Ovens, fryers, dishwashers', notesAr: 'أفران، قلايات، غسالات أطباق' },
  { equipment: 'Commercial Kitchen (4 units)', equipmentAr: 'المطبخ التجاري (4 أجهزة)', df: '80%', notes: 'Cafeteria & restaurant cooking line', notesAr: 'خطوط طهي الكافتيريات والمطاعم' },
  { equipment: 'Commercial Kitchen (5 units)', equipmentAr: 'المطبخ التجاري (5 أجهزة)', df: '70%', notes: 'Large institutional dining kitchens', notesAr: 'مطابخ المؤسسات والمستشفيات' },
  { equipment: 'Commercial Kitchen (6+ units)', equipmentAr: 'المطبخ التجاري (6 أجهزة وأكثر)', df: '65%', notes: 'Resort & hotel production kitchen', notesAr: 'مطابخ الفنادق والمنتجعات الكبرى' },
  { equipment: 'Passenger Elevator (Single car)', equipmentAr: 'مصعد الركاب (كابينة مفردة)', df: '100%', notes: 'Largest motor sized at 125% per Art. 430', notesAr: 'تقييم أكبر محرك بنسبة 125%' },
  { equipment: 'Passenger Elevators (2 cars)', equipmentAr: 'مصاعد الركاب (كابينتان)', df: '95%', notes: 'Feeder demand factor (Table 620.14)', notesAr: 'معامل طلب المغذي (جدول 620.14)' },
  { equipment: 'Passenger Elevators (3 cars)', equipmentAr: 'مصاعد الركاب (3 كبائن)', df: '90%', notes: 'Banked elevator group dispatching', notesAr: 'توزيع آلي لمجموعة مصاعد' },
  { equipment: 'Passenger Elevators (4 cars)', equipmentAr: 'مصاعد الركاب (4 كبائن)', df: '85%', notes: 'High-rise commercial office core', notesAr: 'برج تجاري متعدد الطوابق' },
  { equipment: 'Passenger Elevators (5+ cars)', equipmentAr: 'مصاعد الركاب (5 كبائن وأكثر)', df: '80%', notes: 'Major commercial tower elevator core', notesAr: 'أبراج إدارية كبرى' },
];

// 5. Special Occupancies (Article 550, 625 - EV Charging, Mobile Homes)
export const NEC_SPECIAL_OCCUPANCIES: NecSpecialOccupancyRow[] = [
  {
    loadType: 'Electric Vehicle Charger (EVSE)',
    loadTypeAr: 'شواحن السيارات الكهربائية (EVSE)',
    ratingRule: '125% continuous rating of max nameplate',
    ratingRuleAr: '125% حمل مستمر من القدرة المقننة',
    df: '100%',
    codeRef: 'NEC Article 625.42',
  },
  {
    loadType: 'Multiple EV Chargers (Unmanaged)',
    loadTypeAr: 'شواحن سيارات متعددة (بدون تحكم)',
    ratingRule: 'Sum of all EVSE branch rated capacities',
    ratingRuleAr: 'مجموع قدرات جميع الشواحن المتزامنة',
    df: '100%',
    codeRef: 'NEC 625.42',
  },
  {
    loadType: 'EV Energy Management System (EMS)',
    loadTypeAr: 'نظام إدارة طاقة شحن السيارات (EMS)',
    ratingRule: 'Controlled dynamic allocation',
    ratingRuleAr: 'توزيع ديناميكي ذكي للحمل الأقصى',
    df: '50% - 80%',
    codeRef: 'NEC 625.42(B)',
  },
  {
    loadType: 'Mobile Home Park (Single site)',
    loadTypeAr: 'مواقف المنازل المتنقلة (موقع واحد)',
    ratingRule: '16,000 VA per mobile home site',
    ratingRuleAr: '16,000 ف.أ لكل موقع منزل متنقل',
    df: '100%',
    codeRef: 'NEC Table 550.31',
  },
  {
    loadType: 'Mobile Home Park (2 to 4 sites)',
    loadTypeAr: 'مواقف المنازل المتنقلة (2 إلى 4 مواقع)',
    ratingRule: '16,000 VA per site × Number of sites',
    ratingRuleAr: '16,000 ف.أ لكل موقع × عدد المواقع',
    df: '55%',
    codeRef: 'NEC Table 550.31',
  },
  {
    loadType: 'Mobile Home Park (5 to 9 sites)',
    loadTypeAr: 'مواقف المنازل المتنقلة (5 إلى 9 مواقع)',
    ratingRule: '16,000 VA per site × Number of sites',
    ratingRuleAr: '16,000 ف.أ لكل موقع × عدد المواقع',
    df: '44%',
    codeRef: 'NEC Table 550.31',
  },
  {
    loadType: 'Mobile Home Park (10 to 19 sites)',
    loadTypeAr: 'مواقف المنازل المتنقلة (10 إلى 19 موقعاً)',
    ratingRule: '16,000 VA per site × Number of sites',
    ratingRuleAr: '16,000 ف.أ لكل موقع × عدد المواقع',
    df: '39%',
    codeRef: 'NEC Table 550.31',
  },
  {
    loadType: 'RV Park Sites (20+ sites)',
    loadTypeAr: 'مواقف كرفانات التخييم (20 موقعاً وأكثر)',
    ratingRule: '20A / 30A / 50A connection receptacle',
    ratingRuleAr: 'مخارج تغذية 20A / 30A / 50A',
    df: '36%',
    codeRef: 'NEC Table 551.73',
  },
];

// 6. Farm Loads (Table 220.102)
export const NEC_FARM_LOADS: NecFarmRow[] = [
  {
    portion: 'Largest Individual Farm Load',
    portionAr: 'أكبر حمل زراعي منفرد',
    df: '100%',
    guidance: 'Must be evaluated at 100% without diversity',
    guidanceAr: 'تقييم بنسبة 100% دون أي تخفيض للتزامن',
  },
  {
    portion: 'Second Largest Load',
    portionAr: 'ثاني أكبر حمل زراعي',
    df: '75%',
    guidance: 'Grain drying, heavy refrigeration or deep well pump',
    guidanceAr: 'تجفيف الحبوب، التبريد أو مضخات الآبار العميقة',
  },
  {
    portion: 'Third Largest Load',
    portionAr: 'ثالث أكبر حمل زراعي',
    df: '65%',
    guidance: 'Milking parlor, feed conveyor or water pumps',
    guidanceAr: 'محالب آلية، سيور التغذية أو مضخات المياه',
  },
  {
    portion: 'Remaining Agricultural Loads',
    portionAr: 'بقية الأحمال الزراعية مجتمعة',
    df: '50%',
    guidance: 'Barn lighting, small utility sockets, workshop tools',
    guidanceAr: 'إنارة الحظائر، المقابس والمعدات اليدوية',
  },
  {
    portion: 'Entire Farm Service (with Dwelling)',
    portionAr: 'إجمالي خدمة المزرعة (تشمل السكن)',
    df: 'Combined',
    guidance: 'Dwelling computed at Art. 220 + Farm at Table 220.103',
    guidanceAr: 'حساب المنزل السكني + أحمال المزرعة بالمعاملات',
  },
];
