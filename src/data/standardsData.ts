export interface StandardMethodology {
  id: 'egypt' | 'saudi' | 'europe' | 'usa';
  country: string;
  countryAr: string;
  codeName: string;
  codeNameAr: string;
  standardReference: string;
  standardReferenceAr: string;
  borderColor: string;
  borderColorHex: string;
  bullet1: string;
  bullet1Ar: string;
  bullet2: string;
  bullet2Ar: string;
  frequency: string;
  nominalVoltage: string;
}

export const STANDARDS_DATA: StandardMethodology[] = [
  {
    id: 'egypt',
    country: 'Egypt',
    countryAr: 'جمهورية مصر العربية',
    codeName: 'Egyptian Code',
    codeNameAr: 'الكود المصري لتقدير الأحمال',
    standardReference: 'ECP 203 / EEHC Utility Regulations',
    standardReferenceAr: 'الكود المصري ECP 203 / لائحة شركات التوزيع EEHC',
    borderColor: 'border-l-[#DC2626]',
    borderColorHex: '#DC2626',
    bullet1: "Facility design capacity within distribution companies' geographical service areas shall be determined based on the specified categories.",
    bullet1Ar: "يتم تحديد القدرة التصميمية للمنشآت داخل النطاق الجغرافي لشركات التوزيع طبقاً للفئات المحددة.",
    bullet2: "For New Administrative Capital projects, preliminary load estimation is determined per specific schedules.",
    bullet2Ar: "بالنسبة لمشروعات العاصمة الإدارية الجديدة، يتم تحديد التقدير المبدئي للأحمال طبقاً لجداول واشتراطات محددة.",
    frequency: '50 Hz',
    nominalVoltage: '220V / 380V (3-Phase 4-Wire)'
  },
  {
    id: 'saudi',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    codeName: 'Saudi Code',
    codeNameAr: 'الكود السعودي للكهرباء',
    standardReference: 'SBC 401 / SEC Planning Standard',
    standardReferenceAr: 'كود البناء السعودي SBC 401 / معايير شركة الكهرباء SEC',
    borderColor: 'border-l-[#16A34A]',
    borderColorHex: '#16A34A',
    bullet1: "Preliminary electrical load estimation is based on facility type, gross area, and activity-specific consumption rates.",
    bullet1Ar: "يعتمد التقدير المبدئي للأحمال الكهربائية على نوع المنشأة، والمساحة الإجمالية، ومعدلات الاستهلاك النوعية لكل نشاط.",
    bullet2: "Facilities are categorized by usage, with an assigned unit load density (VA/m²) per category.",
    bullet2Ar: "يتم تصنيف المنشآت حسب الاستخدام، مع تخصيص كثافة حمل وحدة (فولت أمبير/م²) لكل فئة.",
    frequency: '60 Hz',
    nominalVoltage: '230V / 400V (Unified 3-Phase 4-Wire)'
  },
  {
    id: 'europe',
    country: 'Europe',
    countryAr: 'الاتحاد الأوروبي',
    codeName: 'IEC Code',
    codeNameAr: 'الكود الأوروبي الدولي (IEC)',
    standardReference: 'IEC 60364-8-1 / CENELEC HD 60364',
    standardReferenceAr: 'المواصفة الدولية IEC 60364-8-1 / معايير CENELEC',
    borderColor: 'border-l-[#2563EB]',
    borderColorHex: '#2563EB',
    bullet1: "Preliminary load estimation relies on average power demand (W/m²) based on building type and specific functional areas",
    bullet1Ar: "يعتمد التقدير المبدئي للأحمال على متوسط الطلب على القدرة (وات/م²) بناءً على نوع المبنى والمناطق الوظيفية المحددة",
    bullet2: "simultaneity factor (SF) is applied to the aggregated connected load to determine the maximum expected demad",
    bullet2Ar: "يتم تطبيق معامل التزامن (SF) على إجمالي الحمل المتصل لتحديد أقصى طلب متوقع",
    frequency: '50 Hz',
    nominalVoltage: '230V / 400V (Harmonized European Grid)'
  },
  {
    id: 'usa',
    country: 'United States',
    countryAr: 'الولايات المتحدة الأمريكية',
    codeName: 'NEC Code',
    codeNameAr: 'الكود الأمريكي الوطني (NEC)',
    standardReference: 'NFPA 70: NEC Article 220',
    standardReferenceAr: 'المواصفة القياسية NFPA 70 / مادة NEC 220',
    borderColor: 'border-l-[#1E3A8A]',
    borderColorHex: '#1E3A8A',
    bullet1: "Load estimation requires calculating specific loads (lighting, receptacles, appliances) separately using unit VA/m² per occupancy",
    bullet1Ar: "يتطلب تقدير الأحمال حساب أحمال محددة (الإنارة، المقابس، الأجهزة) بشكل منفصل باستخدام وحدة فولت أمبير/م² لكل إشغال",
    bullet2: "Specific demand factors are then applied to each individual load category before summing the total load",
    bullet2Ar: "يتم بعد ذلك تطبيق معاملات طلب محددة على كل فئة حمل فردية قبل جمع الحمل الإجمالي",
    frequency: '60 Hz',
    nominalVoltage: '120V / 208V, 277V / 480V (3-Phase 4-Wire)'
  }
];
