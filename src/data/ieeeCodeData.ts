// IEEE Std 241 (Gray Book) - Electric Power Systems in Commercial Buildings

export interface IeeeBuildingPowerRow {
  buildingType: string;
  buildingTypeAr: string;
  connectedVaPerM2: string;
  connectedWPerFt2: string;
  demandVaPerM2: string;
  loadFactor: string;
  notes: string;
  notesAr: string;
}

export interface IeeeHvacRow {
  equipment: string;
  equipmentAr: string;
  kwPerTon: string;
  diversityFactor: string;
  typicalRating: string;
  notes: string;
  notesAr: string;
}

export interface IeeeTransformerGrowthRow {
  facilityType: string;
  facilityTypeAr: string;
  initialDemandRatio: string;
  growthAllowance: string;
  recommendedSizing: string;
  recommendedSizingAr: string;
}

export interface IeeeLoadFactorRow {
  commercialActivity: string;
  commercialActivityAr: string;
  operatingHours: string;
  annualLoadFactor: string;
  peakSeasonCoincidence: string;
}

export interface IeeeElevatorRow {
  numberOfElevators: string;
  demandFactor: string;
  startingCurrentFactor: string;
  notes: string;
  notesAr: string;
}

export interface IeeeEmergencyRow {
  branchType: string;
  branchTypeAr: string;
  maxTransferTime: string;
  storageFuelAutonomy: string;
  standardGuidance: string;
  standardGuidanceAr: string;
}

// 1. Table 3: Power Densities by Commercial Building Type
export const IEEE_TABLE_3_BUILDINGS: IeeeBuildingPowerRow[] = [
  {
    buildingType: 'Office Building (Standard)',
    buildingTypeAr: 'مبنى مكاتب إدارية قياسي',
    connectedVaPerM2: '100 - 150 VA/m²',
    connectedWPerFt2: '9.0 - 14.0 W/ft²',
    demandVaPerM2: '65 - 95 VA/m²',
    loadFactor: '0.45 - 0.60',
    notes: 'Includes general lighting, PC receptacles, central HVAC & elevator core',
    notesAr: 'تشمل الإنارة العامة، مقابس الحواسب، التكييف المركزي ونواة المصاعد',
  },
  {
    buildingType: 'Bank / Financial Center',
    buildingTypeAr: 'مركز بنكي ومصرفي رئيسي',
    connectedVaPerM2: '120 - 180 VA/m²',
    connectedWPerFt2: '11.0 - 16.5 W/ft²',
    demandVaPerM2: '80 - 120 VA/m²',
    loadFactor: '0.50 - 0.65',
    notes: 'High-density trading floors, transaction halls & security vaults',
    notesAr: 'قاعات تداول مصرفية مكثفة، منصات الصرافة وخزائن الأمان',
  },
  {
    buildingType: 'Hospital / Acute Care',
    buildingTypeAr: 'مستشفى رعاية حادة عام',
    connectedVaPerM2: '140 - 220 VA/m²',
    connectedWPerFt2: '13.0 - 20.0 W/ft²',
    demandVaPerM2: '90 - 145 VA/m²',
    loadFactor: '0.70 - 0.85',
    notes: '24/7 operating profile with imaging, sterilizers & cleanroom HVAC',
    notesAr: 'تشغيل متواصل 24 ساعة، غرف عمليات وأجهزة تصوير طبي وتعقيم',
  },
  {
    buildingType: 'School / University Campus',
    buildingTypeAr: 'مدرسة ومجمع كليات جامعية',
    connectedVaPerM2: '60 - 100 VA/m²',
    connectedWPerFt2: '5.5 - 9.0 W/ft²',
    demandVaPerM2: '40 - 70 VA/m²',
    loadFactor: '0.30 - 0.45',
    notes: 'Classrooms, lecture theaters, research labs & sports complexes',
    notesAr: 'قاعات محاضرات، مختبرات دراسية ومرافق رياضية',
  },
  {
    buildingType: 'Shopping Mall / Retail Center',
    buildingTypeAr: 'مركز تسوق ومول تجاري',
    connectedVaPerM2: '110 - 170 VA/m²',
    connectedWPerFt2: '10.0 - 15.5 W/ft²',
    demandVaPerM2: '75 - 115 VA/m²',
    loadFactor: '0.55 - 0.70',
    notes: 'Intensive showcase illumination, fast-food courts & promenade cooling',
    notesAr: 'إنارة عروض تجارية مركزة، ردهات مطاعم وتكييف ممرات المول',
  },
  {
    buildingType: 'Hotel / Hospitality Resort',
    buildingTypeAr: 'فندق سياحي ومنتجع',
    connectedVaPerM2: '75 - 130 VA/m²',
    connectedWPerFt2: '7.0 - 12.0 W/ft²',
    demandVaPerM2: '50 - 90 VA/m²',
    loadFactor: '0.50 - 0.65',
    notes: 'Guest rooms, banqueting ballrooms, kitchens & laundry services',
    notesAr: 'غرف نزلاء، قاعات احتفالات، مطابخ مركزية ومغاسل ملابس',
  },
  {
    buildingType: 'Data Center / Computer Facility',
    buildingTypeAr: 'مركز بيانات وخوادم حاسوبية',
    connectedVaPerM2: '500 - 2000 VA/m²',
    connectedWPerFt2: '45.0 - 185.0 W/ft²',
    demandVaPerM2: '450 - 1800 VA/m²',
    loadFactor: '0.85 - 0.95',
    notes: 'Continuous server IT load + precision CRAC chiller infrastructure',
    notesAr: 'أحمال خوادم حاسوبية مستمرة + تبريد دقيق CRAC متواصل',
  },
  {
    buildingType: 'Warehouse / Storage Facility',
    buildingTypeAr: 'مستودع تخزين ولوجستيات',
    connectedVaPerM2: '15 - 35 VA/m²',
    connectedWPerFt2: '1.5 - 3.2 W/ft²',
    demandVaPerM2: '10 - 25 VA/m²',
    loadFactor: '0.25 - 0.40',
    notes: 'High-bay LED lighting, dock levelers & forklift battery charging',
    notesAr: 'إنارة مستودعات عالية، منصات شحن وبطاريات رافعات شوكية',
  },
];

// 2. Table 4: Air Conditioning & Ventilation
export const IEEE_TABLE_4_HVAC: IeeeHvacRow[] = [
  {
    equipment: 'Water-Cooled Centrifugal Chiller',
    equipmentAr: 'مبرد مياه مركزي طرد مركزي (Chiller)',
    kwPerTon: '0.55 - 0.68 kW/ton',
    diversityFactor: '0.80 - 0.90',
    typicalRating: '200 - 1,500 Tons',
    notes: 'High efficiency central plant for large commercial towers',
    notesAr: 'كفاءة طاقة قصوى للأبراج والمجمعات التجارية الكبرى',
  },
  {
    equipment: 'Air-Cooled Screw Chiller',
    equipmentAr: 'مبرد مياه مبرد بالهواء حلزوني (Air-Cooled)',
    kwPerTon: '1.05 - 1.25 kW/ton',
    diversityFactor: '0.85 - 0.95',
    typicalRating: '50 - 450 Tons',
    notes: 'Outdoor rooftop installation, zero cooling tower water requirement',
    notesAr: 'تركيب على الأسطح الخارجية بدون استهلاك مياه لأبراج التبريد',
  },
  {
    equipment: 'Variable Refrigerant Flow (VRF)',
    equipmentAr: 'أنظمة التبريد متغيرة التدفق (VRF)',
    kwPerTon: '0.80 - 1.05 kW/ton',
    diversityFactor: '0.70 - 0.85',
    typicalRating: '10 - 60 HP',
    notes: 'Excellent part-load efficiency with multi-zone inverter zoning',
    notesAr: 'تحكم عالي في الأحمال الجزئية وتبريد متعدد المناطق',
  },
  {
    equipment: 'Cooling Tower Fan & Spray Pumps',
    equipmentAr: 'مراوح ومضخات أبراج التبريد',
    kwPerTon: '0.08 - 0.15 kW/ton',
    diversityFactor: '0.90 - 1.00',
    typicalRating: '5 - 50 kW',
    notes: 'Interlocked with chiller condenser loop water circulation',
    notesAr: 'تشغيل متزامن مع دورة مياه مكثف التبريد المركزي',
  },
  {
    equipment: 'Chilled Water Circulation Pumps',
    equipmentAr: 'مضخات تدوير المياه المبردة (CHW Pumps)',
    kwPerTon: '0.10 - 0.18 kW/ton',
    diversityFactor: '0.80 (Duty/Standby)',
    typicalRating: '7.5 - 75 kW',
    notes: 'Variable primary flow (VPF) frequency drive modulation',
    notesAr: 'تغيير السرعة آلياً عبر محولات التردد VFD حسب الطلب',
  },
];

// 3. Table 5: Transformer Sizing & Growth
export const IEEE_TABLE_5_TRANSFORMERS: IeeeTransformerGrowthRow[] = [
  {
    facilityType: 'Commercial Office Tower',
    facilityTypeAr: 'برج مكاتب تجاري',
    initialDemandRatio: '65% - 75% of Nameplate',
    growthAllowance: '20% - 25% Future Capacity',
    recommendedSizing: 'Target 70% nominal continuous loading',
    recommendedSizingAr: 'تصميم عند 70% من السعة الاسمية لاستيعاب التوسع',
  },
  {
    facilityType: 'Corporate Headquarters / Financial',
    facilityTypeAr: 'مقر رئيسي لشركة أو بنك',
    initialDemandRatio: '60% - 70% of Nameplate',
    growthAllowance: '25% - 30% Future Capacity',
    recommendedSizing: 'Double-ended secondary selective substation (2x100%)',
    recommendedSizingAr: 'محطة ثنائية التغذية مع مفتاح ربط tie breaker',
  },
  {
    facilityType: 'Hospital & Healthcare Complex',
    facilityTypeAr: 'مجمع مستشفيات ورعاية صحية',
    initialDemandRatio: '55% - 65% of Nameplate',
    growthAllowance: '30% - 40% Future Capacity',
    recommendedSizing: 'Dual redundant transformers with automatic bus transfer',
    recommendedSizingAr: 'محولات احتياطية مزدوجة مع تحويل آلي سريع',
  },
  {
    facilityType: 'Retail & Shopping Center',
    facilityTypeAr: 'مركز تسوق وتجزئة',
    initialDemandRatio: '70% - 80% of Nameplate',
    growthAllowance: '15% - 20% Future Capacity',
    recommendedSizing: 'Dry-type ventilated indoor transformers',
    recommendedSizingAr: 'محولات جافة مهواة داخل غرف محطات التوزيع',
  },
];

// 4. Table 8: Load Factors & Peak Coincidence
export const IEEE_TABLE_8_LOAD_FACTORS: IeeeLoadFactorRow[] = [
  {
    commercialActivity: 'General Commercial Offices',
    commercialActivityAr: 'المكاتب التجارية العامة',
    operatingHours: '08:00 - 18:00 (5 Days/Week)',
    annualLoadFactor: '38% - 48%',
    peakSeasonCoincidence: '0.85 - 0.90 (Summer peak 14:00)',
  },
  {
    commercialActivity: 'Major Retail Department Stores',
    commercialActivityAr: 'المتاجر الكبرى ومراكز التسوق',
    operatingHours: '10:00 - 22:00 (7 Days/Week)',
    annualLoadFactor: '52% - 64%',
    peakSeasonCoincidence: '0.90 - 0.95 (Weekend afternoons)',
  },
  {
    commercialActivity: 'Hotels & Resort Facilities',
    commercialActivityAr: 'الفنادق والمنتجعات السياحية',
    operatingHours: '24 Hours / 365 Days',
    annualLoadFactor: '55% - 70%',
    peakSeasonCoincidence: '0.80 - 0.88 (Evening dining & HVAC)',
  },
  {
    commercialActivity: 'Hospitals & Medical Care',
    commercialActivityAr: 'المستشفيات والمرافق الطبية',
    operatingHours: '24 Hours / 365 Days',
    annualLoadFactor: '68% - 82%',
    peakSeasonCoincidence: '0.88 - 0.94 (Late morning peak)',
  },
];

// 5. Table 11: Elevator Group Feeder Diversity (IEEE Std 241 Table 11)
export const IEEE_TABLE_11_ELEVATORS: IeeeElevatorRow[] = [
  { numberOfElevators: '1 Elevator Car', demandFactor: '100%', startingCurrentFactor: '1.25x FLA + Starting Peak', notes: 'Single car evaluates largest motor with starting inrush', notesAr: 'تقييم تيار البدء العالي للمحرك الفردي' },
  { numberOfElevators: '2 Elevator Cars', demandFactor: '95%', startingCurrentFactor: '1.0x FLA car 1 + car 2 run', notes: 'Feeder diversity for paired elevator bank', notesAr: 'تزامن لمجموعات المصاعد المزدوجة' },
  { numberOfElevators: '3 Elevator Cars', demandFactor: '90%', startingCurrentFactor: 'Shared dispatching diversity', notes: 'Triplex elevator passenger dispatching', notesAr: 'توزيع الحركة لمجموعة 3 مصاعد' },
  { numberOfElevators: '4 Elevator Cars', demandFactor: '85%', startingCurrentFactor: 'Shared dispatching diversity', notes: 'Quadruplex office building passenger bank', notesAr: 'مجموعة 4 مصاعد للأبراج الإدارية' },
  { numberOfElevators: '5 Elevator Cars', demandFactor: '80%', startingCurrentFactor: 'Shared dispatching diversity', notes: 'High-rise core low-zone elevator group', notesAr: 'مجموعة 5 مصاعد للمنطقة المنخفضة' },
  { numberOfElevators: '6 to 8 Elevator Cars', demandFactor: '75%', startingCurrentFactor: 'Major core bank diversity', notes: 'High-speed destination dispatch elevator bank', notesAr: 'مجموعات مصاعد سريعة بنظام التوجيه الذكي' },
];

// 6. Table 14: Emergency & Standby Systems (IEEE Std 241 Sec 5)
export const IEEE_TABLE_14_EMERGENCY: IeeeEmergencyRow[] = [
  {
    branchType: 'Emergency System (Life Safety - NEC 700)',
    branchTypeAr: 'أنظمة الطوارئ وحماية الأرواح (NEC 700)',
    maxTransferTime: '<= 10 Seconds',
    storageFuelAutonomy: '>= 2 Hours on-site fuel',
    standardGuidance: 'Emergency egress lighting, exit signs, fire alarms & voice evacuation',
    standardGuidanceAr: 'إنارة مسالك الهروب، لوحات الإنذار، وإشارات الخروج التلقائية',
  },
  {
    branchType: 'Legally Required Standby (NEC 701)',
    branchTypeAr: 'الأنظمة الاحتياطية الملزمة قانوناً (NEC 701)',
    maxTransferTime: '<= 60 Seconds',
    storageFuelAutonomy: '>= 2 Hours on-site fuel',
    standardGuidance: 'Smoke evacuation fans, sewage pumps, firefighter lifts & communication',
    standardGuidanceAr: 'مراوح طرد الدخان، طلمبات الصرف، ومصاعد الدفاع المدني',
  },
  {
    branchType: 'Optional Standby Systems (NEC 702)',
    branchTypeAr: 'أنظمة الطوارئ الاختيارية (NEC 702)',
    maxTransferTime: 'Manual or Automatic (1 - 5 min)',
    storageFuelAutonomy: '>= 8 - 24 Hours on-site fuel',
    standardGuidance: 'Data center servers, refrigeration, manufacturing operations & HVAC',
    standardGuidanceAr: 'الخوادم، مستودعات التبريد، خطوط الإنتاج والتكييف التشغيلي',
  },
];
