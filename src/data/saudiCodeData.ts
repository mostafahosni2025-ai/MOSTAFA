export interface Table19Row {
  code: string;
  category: string;
  categoryAr: string;
  areaBasedVA: number | string;
  withoutAcVA: number | string;
  winterPeakVA: number | string;
}

export interface Table20Row {
  code: string;
  category: string;
  categoryAr: string;
  df: number;
}

export interface Table21Row {
  n: number;
  cf: string;
}

export interface Table22Row {
  id: number;
  specialCase: string;
  specialCaseAr: string;
  definition: string;
  definitionAr: string;
  demandFactor: number;
  coincidenceFactor: number;
}

export const SAUDI_TABLE_19: Table19Row[] = [
  { code: 'C1', category: 'Normal Residential Dwelling', categoryAr: 'سكن سكني عادي (فلل، شقق، قصور)', areaBasedVA: 116, withoutAcVA: 35, winterPeakVA: 96 },
  { code: 'C2', category: 'Normal Commercial Shops', categoryAr: 'محلات تجارية عادية ومعارض', areaBasedVA: 172, withoutAcVA: 52, winterPeakVA: 144 },
  { code: 'C3', category: 'Furnished Flats', categoryAr: 'شقق مفروشة وسكن عمال', areaBasedVA: 140, withoutAcVA: 64, winterPeakVA: 116 },
  { code: 'C4', category: 'Hotels', categoryAr: 'فنادق وموتيلات', areaBasedVA: 192, withoutAcVA: 76, winterPeakVA: 156 },
  { code: 'C5', category: 'Malls', categoryAr: 'مراكز تسوق ومولات وسوبرماركت', areaBasedVA: 204, withoutAcVA: 60, winterPeakVA: 160 },
  { code: 'C6', category: 'Restaurants', categoryAr: 'مطاعم وكافيهات ومقاهي', areaBasedVA: 188, withoutAcVA: 76, winterPeakVA: 156 },
  { code: 'C7', category: 'Offices', categoryAr: 'مكاتب تجارية وحكومية وبنوك', areaBasedVA: 176, withoutAcVA: 72, winterPeakVA: 144 },
  { code: 'C8', category: 'Schools', categoryAr: 'مدارس وحضانات ومعاهد تدريب', areaBasedVA: 144, withoutAcVA: 64, winterPeakVA: 120 },
  { code: 'C9', category: 'Mosques', categoryAr: 'مساجد وجوامع', areaBasedVA: 148, withoutAcVA: 52, winterPeakVA: 120 },
  { code: 'C10', category: 'Mezzanine in Hotel', categoryAr: 'دور الميزانين في الفنادق', areaBasedVA: 80, withoutAcVA: 32, winterPeakVA: 64 },
  { code: 'C11', category: 'Common Area/Services in Buildings', categoryAr: 'خدمات مشتركة ومناطق عامة بالمباني', areaBasedVA: 48, withoutAcVA: 48, winterPeakVA: 48 },
  { code: 'C12', category: 'Public Services Facilities', categoryAr: 'مرافق خدمات عامة ودورات مياه', areaBasedVA: 40, withoutAcVA: 40, winterPeakVA: 40 },
  { code: 'C13', category: 'Indoor Parking', categoryAr: 'مواقف سيارات داخلية ومغطاة', areaBasedVA: 24, withoutAcVA: 24, winterPeakVA: 24 },
  { code: 'C14', category: 'Outdoor Parking', categoryAr: 'مواقف سيارات خارجية ومكشوفة', areaBasedVA: 4, withoutAcVA: 4, winterPeakVA: 4 },
  { code: 'C15', category: 'Streets Lighting', categoryAr: 'إنارة الشوارع والطرق', areaBasedVA: 4, withoutAcVA: 4, winterPeakVA: 4 },
  { code: 'C16', category: 'Parks & Garden', categoryAr: 'حدائق ومتنزهات عامة', areaBasedVA: 3.2, withoutAcVA: 3.2, winterPeakVA: 3.2 },
  { code: 'C17', category: 'Open Spaces', categoryAr: 'مساحات مفتوحة وساحات', areaBasedVA: 2.4, withoutAcVA: 2.4, winterPeakVA: 2.4 },
  { code: 'C18', category: 'Hospitals\\Medical Facilities', categoryAr: 'مستشفيات ومراكز طبية عامة', areaBasedVA: 200, withoutAcVA: 92, winterPeakVA: 168 },
  { code: 'C19', category: 'Medical Clinics', categoryAr: 'عيادات ومجمعات طبية متخصصة', areaBasedVA: 180, withoutAcVA: 80, winterPeakVA: 152 },
  { code: 'C20', category: 'Universities/High Educational Facilities', categoryAr: 'جامعات وكليات ومؤسسات تعليم عالي', areaBasedVA: 196, withoutAcVA: 100, winterPeakVA: 168 },
  { code: 'C21', category: 'Light Industries', categoryAr: 'صناعات خفيفة ومصانع صغيرة (حتى 4 م.ف.أ)', areaBasedVA: 224, withoutAcVA: 192, winterPeakVA: 212 },
  { code: 'C22', category: 'Workshops', categoryAr: 'ورش عمل وورش صيانة', areaBasedVA: 64, withoutAcVA: 64, winterPeakVA: 64 },
  { code: 'C23', category: 'Cooling Stores', categoryAr: 'مستودعات تبريد وثلاجات حفظ', areaBasedVA: 208, withoutAcVA: 20, winterPeakVA: 208 },
  { code: 'C24', category: 'Warehouses', categoryAr: 'مستودعات ومخازن عادية', areaBasedVA: 56, withoutAcVA: 56, winterPeakVA: 56 },
  { code: 'C25', category: 'Community Halls', categoryAr: 'صالات مناسبات وقاعات احتفالات', areaBasedVA: 184, withoutAcVA: 92, winterPeakVA: 156 },
  { code: 'C26', category: 'Recreational Facilities', categoryAr: 'منشآت ترفيهية ونوادي وسينما', areaBasedVA: 160, withoutAcVA: 72, winterPeakVA: 132 },
  { code: 'C27', category: 'Farms\\Agricultural Facilities', categoryAr: 'مزارع ومنشآت إنتاج زراعي وحيواني', areaBasedVA: 104, withoutAcVA: 92, winterPeakVA: 100 },
  { code: 'C28', category: 'Fuel Stations', categoryAr: 'محطات وقود وتزويد سيارات', areaBasedVA: 72, withoutAcVA: 56, winterPeakVA: 68 },
  { code: 'C29', category: 'Bulk Factories', categoryAr: 'مصانع كبرى ومجمعات تصنيع ضخمة (>4 م.ف.أ)', areaBasedVA: 236, withoutAcVA: 200, winterPeakVA: 224 },
];

export const SAUDI_TABLE_20: Table20Row[] = [
  { code: 'C1', category: 'Normal Residential Dwelling', categoryAr: 'سكن سكني عادي', df: 0.5 },
  { code: 'C2', category: 'Normal Commercial Shops', categoryAr: 'محلات تجارية عادية', df: 0.6 },
  { code: 'C3', category: 'Furnished Flats', categoryAr: 'شقق مفروشة وسكن عمال', df: 0.6 },
  { code: 'C4', category: 'Hotels', categoryAr: 'فنادق وموتيلات', df: 0.65 },
  { code: 'C5', category: 'Malls', categoryAr: 'مراكز تسوق ومولات', df: 0.6 },
  { code: 'C6', category: 'Restaurants', categoryAr: 'مطاعم ومقاهي', df: 0.6 },
  { code: 'C7', category: 'Offices', categoryAr: 'مكاتب ومقرات إدارية وبنوك', df: 0.6 },
  { code: 'C8', category: 'Schools', categoryAr: 'مدارس ومعاهد', df: 0.7 },
  { code: 'C9', category: 'Mosques', categoryAr: 'مساجد وجوامع', df: 0.8 },
  { code: 'C10', category: 'Mezzanine in Hotel', categoryAr: 'ميزانين في الفنادق', df: 0.65 },
  { code: 'C11', category: 'Common Area/Services in Buildings', categoryAr: 'خدمات مشتركة بالمباني', df: 0.7 },
  { code: 'C12', category: 'Public Services Facilities', categoryAr: 'مرافق خدمات عامة', df: 0.65 },
  { code: 'C13', category: 'Indoor Parking', categoryAr: 'مواقف سيارات داخلية', df: 0.7 },
  { code: 'C14', category: 'Outdoor Parking', categoryAr: 'مواقف سيارات خارجية', df: 0.8 },
  { code: 'C15', category: 'Streets Lighting', categoryAr: 'إنارة الشوارع', df: 0.8 },
  { code: 'C16', category: 'Parks & Garden', categoryAr: 'حدائق ومتنزهات', df: 0.7 },
  { code: 'C17', category: 'Open Spaces', categoryAr: 'مساحات مفتوحة', df: 0.8 },
  { code: 'C18', category: 'Hospitals\\Medical Facilities', categoryAr: 'مستشفيات ومراكز طبية', df: 0.7 },
  { code: 'C19', category: 'Medical Clinics', categoryAr: 'عيادات طبية', df: 0.6 },
  { code: 'C20', category: 'Universities/High Educational Facilities', categoryAr: 'جامعات وكليات', df: 0.7 },
  { code: 'C21', category: 'Light Industries', categoryAr: 'صناعات خفيفة', df: 0.8 },
  { code: 'C22', category: 'Workshops', categoryAr: 'ورش عمل', df: 0.8 },
  { code: 'C23', category: 'Cooling Stores', categoryAr: 'مستودعات تبريد', df: 0.8 },
  { code: 'C24', category: 'Warehouses', categoryAr: 'مستودعات عامة', df: 0.6 },
  { code: 'C25', category: 'Community Halls', categoryAr: 'صالات مناسبات', df: 0.7 },
  { code: 'C26', category: 'Recreational Facilities', categoryAr: 'منشآت ترفيهية', df: 0.7 },
  { code: 'C27', category: 'Farms/ Agricultural Facilities', categoryAr: 'مزارع ومرافق زراعية', df: 0.8 },
  { code: 'C28', category: 'Fuel Stations', categoryAr: 'محطات وقود', df: 0.6 },
  { code: 'C29', category: 'Bulk Factories', categoryAr: 'مصانع كبرى', df: 0.8 },
];

// Exact Table 21: Coincident factors from SEC DPS Page 30 (N = 1 to 100)
export const SAUDI_TABLE_21: Table21Row[] = [
  { n: 1, cf: '1.000' }, { n: 2, cf: '0.723' }, { n: 3, cf: '0.688' }, { n: 4, cf: '0.668' }, { n: 5, cf: '0.654' },
  { n: 6, cf: '0.644' }, { n: 7, cf: '0.636' }, { n: 8, cf: '0.629' }, { n: 9, cf: '0.624' }, { n: 10, cf: '0.619' },
  { n: 11, cf: '0.616' }, { n: 12, cf: '0.612' }, { n: 13, cf: '0.609' }, { n: 14, cf: '0.607' }, { n: 15, cf: '0.604' },
  { n: 16, cf: '0.602' }, { n: 17, cf: '0.600' }, { n: 18, cf: '0.598' }, { n: 19, cf: '0.597' }, { n: 20, cf: '0.595' },
  { n: 21, cf: '0.594' }, { n: 22, cf: '0.592' }, { n: 23, cf: '0.591' }, { n: 24, cf: '0.590' }, { n: 25, cf: '0.589' },
  { n: 26, cf: '0.588' }, { n: 27, cf: '0.587' }, { n: 28, cf: '0.586' }, { n: 29, cf: '0.585' }, { n: 30, cf: '0.584' },
  { n: 31, cf: '0.583' }, { n: 32, cf: '0.583' }, { n: 33, cf: '0.582' }, { n: 34, cf: '0.581' }, { n: 35, cf: '0.581' },
  { n: 36, cf: '0.580' }, { n: 37, cf: '0.579' }, { n: 38, cf: '0.579' }, { n: 39, cf: '0.578' }, { n: 40, cf: '0.578' },
  { n: 41, cf: '0.577' }, { n: 42, cf: '0.577' }, { n: 43, cf: '0.576' }, { n: 44, cf: '0.576' }, { n: 45, cf: '0.575' },
  { n: 46, cf: '0.575' }, { n: 47, cf: '0.575' }, { n: 48, cf: '0.574' }, { n: 49, cf: '0.574' }, { n: 50, cf: '0.573' },
  { n: 51, cf: '0.573' }, { n: 52, cf: '0.573' }, { n: 53, cf: '0.572' }, { n: 54, cf: '0.572' }, { n: 55, cf: '0.572' },
  { n: 56, cf: '0.571' }, { n: 57, cf: '0.571' }, { n: 58, cf: '0.571' }, { n: 59, cf: '0.570' }, { n: 60, cf: '0.570' },
  { n: 61, cf: '0.570' }, { n: 62, cf: '0.570' }, { n: 63, cf: '0.569' }, { n: 64, cf: '0.569' }, { n: 65, cf: '0.569' },
  { n: 66, cf: '0.568' }, { n: 67, cf: '0.568' }, { n: 68, cf: '0.568' }, { n: 69, cf: '0.568' }, { n: 70, cf: '0.568' },
  { n: 71, cf: '0.567' }, { n: 72, cf: '0.567' }, { n: 73, cf: '0.567' }, { n: 74, cf: '0.567' }, { n: 75, cf: '0.566' },
  { n: 76, cf: '0.566' }, { n: 77, cf: '0.566' }, { n: 78, cf: '0.566' }, { n: 79, cf: '0.566' }, { n: 80, cf: '0.566' },
  { n: 81, cf: '0.565' }, { n: 82, cf: '0.565' }, { n: 83, cf: '0.565' }, { n: 84, cf: '0.565' }, { n: 85, cf: '0.565' },
  { n: 86, cf: '0.564' }, { n: 87, cf: '0.564' }, { n: 88, cf: '0.564' }, { n: 89, cf: '0.564' }, { n: 90, cf: '0.564' },
  { n: 91, cf: '0.564' }, { n: 92, cf: '0.564' }, { n: 93, cf: '0.563' }, { n: 94, cf: '0.563' }, { n: 95, cf: '0.563' },
  { n: 96, cf: '0.563' }, { n: 97, cf: '0.563' }, { n: 98, cf: '0.563' }, { n: 99, cf: '0.563' }, { n: 100, cf: '0.563' }
];

export const SAUDI_TABLE_22: Table22Row[] = [
  {
    id: 1,
    specialCase: 'Hajj area',
    specialCaseAr: 'منطقة الحج والمشاعر المقدسة',
    definition: 'Area which has permits from municipality to build buildings using for pilgrims lodging',
    definitionAr: 'المناطق المرخصة من الأمانة/البلدية لإنشاء مبانٍ مخصصة لإسكان الحجاج والمعتمرين',
    demandFactor: 0.9,
    coincidenceFactor: 1.0,
  },
  {
    id: 2,
    specialCase: 'Random area',
    specialCaseAr: 'المناطق العشوائية غير المخططة',
    definition: 'Un-planned area according to the municipality and which has many buildings without construction permits from the municipality',
    definitionAr: 'المناطق غير المخططة بلدياً وتحتوي على العديد من المباني بدون تراخيص بناء نظامية',
    demandFactor: 1.0,
    coincidenceFactor: 0.8,
  },
  {
    id: 3,
    specialCase: 'Commercial center',
    specialCaseAr: 'المراكز التجارية والأسواق المجمعة',
    definition: 'Group of commercial shops which apply common working time so that all its shops are to be opened and closed at the same time',
    definitionAr: 'مجموعة محلات تجارية تطبق مواعيد عمل موحدة بحيث تفتح وتغلق أبوابها في نفس التوقيت',
    demandFactor: 0.6,
    coincidenceFactor: 1.0,
  },
  {
    id: 4,
    specialCase: 'Commercial offices',
    specialCaseAr: 'المباني والمقرات الإدارية والمكاتب التجارية',
    definition: 'Buildings with commercial offices that are open and closed at the same time',
    definitionAr: 'مباني المكاتب والشركات التجارية التي تفتح وتغلق في أوقات دوام متزامنة',
    demandFactor: 0.6,
    coincidenceFactor: 1.0,
  },
  {
    id: 5,
    specialCase: 'Workshop complex',
    specialCaseAr: 'مجمعات الورش والأنشطة الصناعية',
    definition: 'Heavy load due to industrial / semi-industrial workshops that are open and closed at the same time',
    definitionAr: 'مجمعات الورش الصناعية ونصف الصناعية ذات الأحمال الكثيفة التي تعمل بالتزامن',
    demandFactor: 0.8,
    coincidenceFactor: 1.0,
  },
];
