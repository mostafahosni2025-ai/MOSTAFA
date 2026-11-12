import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  Zap,
  Sliders,
  FileText,
  Plus,
  Trash2,
  Info,
  CheckCircle2,
  Wrench,
  Printer,
  FileSpreadsheet,
  Download,
  X,
  ChevronDown,
} from 'lucide-react';
import { STANDARDS_DATA } from '../data/standardsData';
import { FlagIcon } from './Flags';
import { Language, TRANSLATIONS } from '../data/translations';

interface CalculationStepProps {
  onBackToOverview: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

interface PumpItem {
  id: string;
  name: string;
  nameAr: string;
  hp: number;
  category: 'water' | 'fire' | 'drainage' | 'hvac';
  demandFactor?: number;
}

interface ExtraLoadItem {
  id: string;
  name: string;
  nameAr: string;
  category: 'transport' | 'security' | 'ev' | 'general';
  kva: number;
  qty: number;
  demandFactor?: number;
}

export interface FloorRowItem {
  id: string;
  name: string;
  floorsCount: number | string;
  areaPerFloor: number | string;
  demandFactor?: number | string;
}

export interface BuildingItem {
  id: string;
  name: string;
  buildingType: OccupancyCategory;
  isTypeCustomized?: boolean;
  floorsCount: number;
  floors: FloorRowItem[];
  totalArea: number;
}

export type OccupancyCategory =
  | 'Normal Residential Dwelling'
  | 'Normal Commercial Shops'
  | 'Furnished Flats'
  | 'Hotels'
  | 'Malls'
  | 'Restaurants'
  | 'Offices'
  | 'Schools'
  | 'Mosques'
  | 'Common Area/Services in Buildings'
  | 'Public Services Facilities'
  | 'Indoor Parking'
  | 'Outdoor Parking'
  | 'Streets Lighting'
  | 'Parks & Garden'
  | 'Open Spaces'
  | 'Hospitals & Medical Facilities'
  | 'Medical Clinics'
  | 'Universities/High Educational Facilities'
  | 'Light Industries'
  | 'Workshops'
  | 'Cooling Stores'
  | 'Warehouses'
  | 'Community Halls'
  | 'Recreational Facilities'
  | 'Farms/Agricultural Facilities'
  | 'Fuel Stations'
  | 'Bulk Factories'
  | string;

export interface SaudiCategoryItem {
  code: string;
  name: string;
  label: string;
  vaPerM2: number;
  df: number;
}

export const SAUDI_SEC_CATEGORIES: SaudiCategoryItem[] = [
  { code: 'C1', name: 'Normal Residential Dwelling', label: 'Normal Residential Dwelling (C1) - 116 VA/m², DF: 0.5', vaPerM2: 116, df: 0.5 },
  { code: 'C2', name: 'Normal Commercial Shops', label: 'Normal Commercial Shops (C2) - 172 VA/m², DF: 0.6', vaPerM2: 172, df: 0.6 },
  { code: 'C3', name: 'Furnished Flats', label: 'Furnished Flats (C3) - 140 VA/m², DF: 0.6', vaPerM2: 140, df: 0.6 },
  { code: 'C4', name: 'Hotels', label: 'Hotels (C4) - 192 VA/m², DF: 0.65', vaPerM2: 192, df: 0.65 },
  { code: 'C5', name: 'Malls', label: 'Malls (C5) - 204 VA/m², DF: 0.6', vaPerM2: 204, df: 0.6 },
  { code: 'C6', name: 'Restaurants', label: 'Restaurants (C6) - 188 VA/m², DF: 0.6', vaPerM2: 188, df: 0.6 },
  { code: 'C7', name: 'Offices', label: 'Offices (C7) - 176 VA/m², DF: 0.6', vaPerM2: 176, df: 0.6 },
  { code: 'C8', name: 'Schools', label: 'Schools (C8) - 144 VA/m², DF: 0.7', vaPerM2: 144, df: 0.7 },
  { code: 'C9', name: 'Mosques', label: 'Mosques (C9) - 148 VA/m², DF: 0.8', vaPerM2: 148, df: 0.8 },
  { code: 'C10', name: 'Mezzanine in Hotel', label: 'Mezzanine in Hotel (C10) - 80 VA/m², DF: 0.65', vaPerM2: 80, df: 0.65 },
  { code: 'C11', name: 'Common Area/Services in Buildings', label: 'Common Area/Services in Buildings (C11) - 48 VA/m², DF: 0.7', vaPerM2: 48, df: 0.7 },
  { code: 'C12', name: 'Public Services Facilities', label: 'Public Services Facilities (C12) - 40 VA/m², DF: 0.65', vaPerM2: 40, df: 0.65 },
  { code: 'C13', name: 'Indoor Parking', label: 'Indoor Parking (C13) - 24 VA/m², DF: 0.7', vaPerM2: 24, df: 0.7 },
  { code: 'C14', name: 'Outdoor Parking', label: 'Outdoor Parking (C14) - 4 VA/m², DF: 0.8', vaPerM2: 4, df: 0.8 },
  { code: 'C15', name: 'Streets Lighting', label: 'Streets Lighting (C15) - 4 VA/m², DF: 0.8', vaPerM2: 4, df: 0.8 },
  { code: 'C16', name: 'Parks & Garden', label: 'Parks & Garden (C16) - 3.2 VA/m², DF: 0.7', vaPerM2: 3.2, df: 0.7 },
  { code: 'C17', name: 'Open Spaces', label: 'Open Spaces (C17) - 2.4 VA/m², DF: 0.8', vaPerM2: 2.4, df: 0.8 },
  { code: 'C18', name: 'Hospitals \\ Medical Facilities', label: 'Hospitals \\ Medical Facilities (C18) - 200 VA/m², DF: 0.7', vaPerM2: 200, df: 0.7 },
  { code: 'C19', name: 'Medical Clinics', label: 'Medical Clinics (C19) - 180 VA/m², DF: 0.6', vaPerM2: 180, df: 0.6 },
  { code: 'C20', name: 'Universities / High Educational Facilities', label: 'Universities / High Educational Facilities (C20) - 196 VA/m², DF: 0.7', vaPerM2: 196, df: 0.7 },
  { code: 'C21', name: 'Light Industries', label: 'Light Industries (C21) - 224 VA/m², DF: 0.8', vaPerM2: 224, df: 0.8 },
  { code: 'C22', name: 'Workshops', label: 'Workshops (C22) - 64 VA/m², DF: 0.8', vaPerM2: 64, df: 0.8 },
  { code: 'C23', name: 'Cooling Stores', label: 'Cooling Stores (C23) - 208 VA/m², DF: 0.8', vaPerM2: 208, df: 0.8 },
  { code: 'C24', name: 'Warehouses', label: 'Warehouses (C24) - 56 VA/m², DF: 0.6', vaPerM2: 56, df: 0.6 },
  { code: 'C25', name: 'Community Halls', label: 'Community Halls (C25) - 184 VA/m², DF: 0.7', vaPerM2: 184, df: 0.7 },
  { code: 'C26', name: 'Recreational Facilities', label: 'Recreational Facilities (C26) - 160 VA/m², DF: 0.7', vaPerM2: 160, df: 0.7 },
  { code: 'C27', name: 'Farms / Agricultural Facilities', label: 'Farms / Agricultural Facilities (C27) - 104 VA/m², DF: 0.8', vaPerM2: 104, df: 0.8 },
  { code: 'C28', name: 'Fuel Stations', label: 'Fuel Stations (C28) - 72 VA/m², DF: 0.6', vaPerM2: 72, df: 0.6 },
  { code: 'C29', name: 'Bulk Factories', label: 'Bulk Factories (C29) - 236 VA/m², DF: 0.8', vaPerM2: 236, df: 0.8 },
];

export const getSaudiCategoryByCodeOrName = (val: string | undefined): SaudiCategoryItem | undefined => {
  if (!val) return undefined;
  const trimmed = val.trim();
  return SAUDI_SEC_CATEGORIES.find(
    (c) =>
      c.code.toLowerCase() === trimmed.toLowerCase() ||
      c.name.toLowerCase() === trimmed.toLowerCase() ||
      c.label.toLowerCase() === trimmed.toLowerCase() ||
      trimmed.toLowerCase().includes(`(${c.code.toLowerCase()})`) ||
      c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === trimmed.toLowerCase().replace(/[^a-z0-9]/g, '')
  );
};

const OCCUPANCY_CATEGORIES: { id: OccupancyCategory; nameEn: string; nameAr: string }[] = [
  { id: 'Normal Residential Dwelling', nameEn: 'Normal Residential Dwelling', nameAr: 'سكن اعتيادي / وحدات سكنية' },
  { id: 'Normal Commercial Shops', nameEn: 'Normal Commercial Shops', nameAr: 'محلات تجارية اعتيادية' },
  { id: 'Furnished Flats', nameEn: 'Furnished Flats', nameAr: 'شقق مفروشة فندقية' },
  { id: 'Hotels', nameEn: 'Hotels', nameAr: 'فنادق ومنتجعات' },
  { id: 'Malls', nameEn: 'Malls', nameAr: 'مراكز تسوق ومولات كبرى' },
  { id: 'Restaurants', nameEn: 'Restaurants', nameAr: 'مطاعم وكافيهات' },
  { id: 'Offices', nameEn: 'Offices', nameAr: 'مكاتب إدارية وشركات' },
  { id: 'Schools', nameEn: 'Schools', nameAr: 'مدارس تعليمية' },
  { id: 'Mosques', nameEn: 'Mosques', nameAr: 'مساجد ودور عبادة' },
  { id: 'Common Area/Services in Buildings', nameEn: 'Common Area/Services in Buildings', nameAr: 'خدمات ومناطق مشتركة بالمباني' },
  { id: 'Public Services Facilities', nameEn: 'Public Services Facilities', nameAr: 'مرافق خدمات عامة وحكومية' },
  { id: 'Indoor Parking', nameEn: 'Indoor Parking', nameAr: 'مواقف سيارات مغطاة وبدرومات' },
  { id: 'Outdoor Parking', nameEn: 'Outdoor Parking', nameAr: 'مواقف سيارات مكشوفة وسطحية' },
  { id: 'Streets Lighting', nameEn: 'Streets Lighting', nameAr: 'إنارة الشوارع والطرق' },
  { id: 'Parks & Garden', nameEn: 'Parks & Garden', nameAr: 'حدائق ومنتزهات عامة' },
  { id: 'Open Spaces', nameEn: 'Open Spaces', nameAr: 'مساحات مفتوحة وساحات' },
  { id: 'Hospitals & Medical Facilities', nameEn: 'Hospitals & Medical Facilities', nameAr: 'مستشفيات ومراكز طبية متخصصة' },
  { id: 'Medical Clinics', nameEn: 'Medical Clinics', nameAr: 'عيادات ومجمعات طبية' },
  { id: 'Universities/High Educational Facilities', nameEn: 'Universities/High Educational Facilities', nameAr: 'جامعات ومنشآت تعليم عالي' },
  { id: 'Light Industries', nameEn: 'Light Industries', nameAr: 'صناعات خفيفة وتجميع' },
  { id: 'Workshops', nameEn: 'Workshops', nameAr: 'ورش عمل وصيانة وحرفية' },
  { id: 'Cooling Stores', nameEn: 'Cooling Stores', nameAr: 'مستودعات تبريد وثلاجات حفظ' },
  { id: 'Warehouses', nameEn: 'Warehouses', nameAr: 'مستودعات وتخزين بضائع' },
  { id: 'Community Halls', nameEn: 'Community Halls', nameAr: 'قاعات مناسبات ومراكز مجتمعية' },
  { id: 'Recreational Facilities', nameEn: 'Recreational Facilities', nameAr: 'منشآت ترفيهية ونوادي رياضية' },
  { id: 'Farms/Agricultural Facilities', nameEn: 'Farms/Agricultural Facilities', nameAr: 'مزارع ومنشآت زراعية وإنتاجية' },
  { id: 'Fuel Stations', nameEn: 'Fuel Stations', nameAr: 'محطات وقود وخدمات سيارات' },
  { id: 'Bulk Factories', nameEn: 'Bulk Factories', nameAr: 'مصانع كبرى ومصانع ثقيلة' },
];

export const STANDARD_SCHNEIDER_TRANSFORMER_SIZES = [
  100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500,
];

/**
 * Force English Western numerals (0-9) by replacing Arabic-Indic and Persian digits.
 * Also converts Arabic decimal comma (٫) to period (.).
 */
export const toEnglishDigits = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/٫/g, '.');
};

/**
 * Parse an English number safely after converting any Arabic numerals.
 */
export const parseEnglishNumber = (value: string | number | undefined | null, fallback = 0): number => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'number') return isNaN(value) ? fallback : value;
  const englishStr = toEnglishDigits(value).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(englishStr);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Universal English number formatter.
 * Guarantees 100% Western English digits (0-9), commas for thousands,
 * and standard period decimals across all browsers and languages.
 */
export const formatEnglishNumber = (
  value: number | string | undefined | null,
  minFractionDigits = 1,
  maxFractionDigits = 2
): string => {
  if (value === undefined || value === null || value === '') return '0.0';
  const num = typeof value === 'number' ? value : parseEnglishNumber(value, 0);
  if (isNaN(num)) return '0.0';
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  });
  return toEnglishDigits(formatted);
};

export const formatEnglishInt = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null || value === '') return '0';
  const num = typeof value === 'number' ? value : parseEnglishNumber(value, 0);
  if (isNaN(num)) return '0';
  const formatted = Math.round(num).toLocaleString('en-US');
  return toEnglishDigits(formatted);
};

/**
 * Convert Arabic-Indic keystrokes to English digits on the fly.
 */
export const handleArabicDigitsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const key = e.key;
  let eng: string | null = null;
  const idxAr = arabicDigits.indexOf(key);
  if (idxAr !== -1) {
    eng = String(idxAr);
  } else {
    const idxPe = persianDigits.indexOf(key);
    if (idxPe !== -1) {
      eng = String(idxPe);
    }
  }

  if (eng !== null) {
    e.preventDefault();
    const input = e.currentTarget;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const val = input.value;
    const newVal = val.substring(0, start) + eng + val.substring(end);

    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    if (nativeSetter) {
      nativeSetter.call(input, newVal);
    } else {
      input.value = newVal;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    try {
      input.setSelectionRange(start + 1, start + 1);
    } catch {
      // type="number" can throw on setSelectionRange in some browsers
    }
  }
};

/**
 * Handle paste events to ensure any pasted Arabic digits are converted to Western numerals.
 */
export const handleNumericPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const text = e.clipboardData.getData('text');
  if (/[٠-٩۰-۹٫]/.test(text)) {
    e.preventDefault();
    const converted = toEnglishDigits(text);
    const input = e.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? input.value.length;
    const val = input.value;
    const newVal = val.substring(0, start) + converted + val.substring(end);
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    if (nativeSetter) {
      nativeSetter.call(input, newVal);
    } else {
      input.value = newVal;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

export const CalculationStep: React.FC<CalculationStepProps> = ({ onBackToOverview, lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // 1. Project Details Header state
  const [projectName, setProjectName] = useState<string>('Capital Commercial Complex Phase 1');

  // 2. Standards state
  const [selectedStandardId, setSelectedStandardId] = useState<'egypt' | 'saudi' | 'europe' | 'usa'>('egypt');
  const [egyptSubStandard, setEgyptSubStandard] = useState<'ecp203' | 'acud'>('ecp203');

  // Egyptian Code Cascading Specification state (ECP 203)
  const [egyptLocationType, setEgyptLocationType] = useState<'cities' | 'villages'>('cities');
  const [egyptBuildingCategory, setEgyptBuildingCategory] = useState<'residential' | 'commercial_admin'>('residential');
  const [egyptCityDistrictType, setEgyptCityDistrictType] = useState<'low_middle' | 'upscale'>('low_middle');

  const getEgyptianAppliedLoadDensity = (): number => {
    if (egyptLocationType === 'villages') {
      return egyptBuildingCategory === 'residential' ? 2 : 5;
    } else {
      if (egyptCityDistrictType === 'upscale') {
        return egyptBuildingCategory === 'residential' ? 8 : 10;
      } else {
        return egyptBuildingCategory === 'residential' ? 4 : 10;
      }
    }
  };

  // 🏛️ New Administrative Capital (ACUD) Activities & Densities (Exact 16 Options)
  const ACUD_ACTIVITIES = [
    { id: 'residential', name: 'Residential (سكني)', density: 8 },
    { id: 'administrative', name: 'Administrative (إداري)', density: 10 },
    { id: 'commercial', name: 'Commercial (تجاري)', density: 12 },
    { id: 'basement_garage', name: 'Basement/Garage (بدروم/جراج)', density: 3 },
    { id: 'hospitals', name: 'Hospitals (مستشفيات)', density: 20 },
    { id: 'banks', name: 'Banks (بنوك)', density: 16 },
    { id: 'medical_clinics', name: 'Medical Clinics (عيادات)', density: 17.5 },
    { id: 'mosques_churches', name: 'Mosques/Churches (مساجد/كنائس)', density: 8 },
    { id: 'hotels', name: 'Hotels (فنادق)', density: 18 },
    { id: 'universities', name: 'Universities (جامعات)', density: 15 },
    { id: 'schools', name: 'Schools (مدارس)', density: 14 },
    { id: 'sports_facilities', name: 'Sports facilities (منشآت رياضية)', density: 12 },
    { id: 'outdoor_parks', name: 'Outdoor Parks (حدائق)', density: 0.5 },
    { id: 'public_services', name: 'Public Services (خدمات عامة)', density: 5 },
    { id: 'factories', name: 'Factories (مصانع)', density: 30 },
    { id: 'fuel_stations', name: 'Fuel Stations (محطات بنزين)', density: 8, isFuelStation: true },
  ];

  // ACUD Interactive State
  const [acudActivityId, setAcudActivityId] = useState<string>('commercial');
  const [acudEvChargers, setAcudEvChargers] = useState<number>(2);

  const getAcudActivity = () => {
    return ACUD_ACTIVITIES.find((a) => a.id === acudActivityId) || ACUD_ACTIVITIES[2];
  };

  const getAcudAppliedDensity = (): number => {
    return getAcudActivity().density;
  };

  const calculateAcudConnectedKva = (area: number): number => {
    const act = getAcudActivity();
    if (act.isFuelStation) {
      return (area * 8) / 100 + (Number(acudEvChargers) || 0) * 150;
    }
    return (area * act.density) / 100;
  };

  // Compare Calculations Modal state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareCheckboxes, setCompareCheckboxes] = useState<Record<string, boolean>>({
    egypt: true,
    saudi: true,
    europe: true,
    usa: false,
  });
  const [displayedCompareCodes, setDisplayedCompareCodes] = useState<string[]>(['egypt', 'saudi', 'europe']);

  const handleToggleCompareCheckbox = (codeId: string) => {
    setCompareCheckboxes((prev) => ({
      ...prev,
      [codeId]: !prev[codeId],
    }));
  };

  const handleGenerateComparison = () => {
    const active = Object.keys(compareCheckboxes).filter((k) => compareCheckboxes[k]);
    setDisplayedCompareCodes(active);
  };

  // 3. Building parameters state
  const [buildingType, setBuildingType] = useState<OccupancyCategory>('Offices');
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(3500);

  // Saudi SEC Table 18/19 state (Density & DF available in state)
  const [saudiSelectedCategory, setSaudiSelectedCategory] = useState<SaudiCategoryItem>(SAUDI_SEC_CATEGORIES[6]); // Offices (C7)
  const [saudiLoadDensityVA, setSaudiLoadDensityVA] = useState<number>(176);
  const [saudiDemandFactor, setSaudiDemandFactor] = useState<number>(0.6);

  // Helper calculations for building totals
  const calcBuildingTotalArea = (floors: FloorRowItem[]) =>
    floors.reduce((sum, f) => sum + (Number(f.floorsCount) || 0) * (Number(f.areaPerFloor) || 0), 0);

  const calcBuildingTotalFloors = (floors: FloorRowItem[]) =>
    floors.reduce((sum, f) => sum + (Number(f.floorsCount) || 0), 0);

  // Helper for detecting basement floor name (including typos like basem, basemnt, etc. or Arabic)
  const isBasementFloorName = (name: string): boolean => {
    if (!name) return false;
    return /basement|بدروم|بادروم|bsmt/i.test(name.trim());
  };

  const getEgyptianAppliedDensityForType = (floorName: string, bType?: string): number => {
    if (isBasementFloorName(floorName)) {
      return 3;
    }
    const typeStr = bType || buildingType;
    if (selectedStandardId === 'egypt' && egyptSubStandard === 'acud') {
      const lower = typeStr.toLowerCase();
      if (lower.includes('resident') || lower.includes('flat') || lower.includes('dwelling') || lower.includes('سكن')) return 8;
      if (lower.includes('office') || lower.includes('admin') || lower.includes('إدار')) return 10;
      if (lower.includes('shop') || lower.includes('mall') || lower.includes('commercial') || lower.includes('تجار')) return 12;
      if (lower.includes('hospital') || lower.includes('مستشف')) return 20;
      if (lower.includes('bank') || lower.includes('بنوك')) return 16;
      if (lower.includes('clinic') || lower.includes('عياد')) return 17.5;
      if (lower.includes('hotel') || lower.includes('فندق') || lower.includes('فنادق')) return 18;
      if (lower.includes('universit') || lower.includes('جامع')) return 15;
      if (lower.includes('school') || lower.includes('مدارس')) return 14;
      if (lower.includes('mosque') || lower.includes('church') || lower.includes('مسجد') || lower.includes('كنيس')) return 8;
      if (lower.includes('recreation') || lower.includes('sport') || lower.includes('نادي') || lower.includes('رياض')) return 12;
      if (lower.includes('factor') || lower.includes('industr') || lower.includes('صناع') || lower.includes('مصانع')) return 30;
      if (lower.includes('fuel') || lower.includes('station') || lower.includes('وقود') || lower.includes('بنزين')) return 8;
      if (lower.includes('park') || lower.includes('garden') || lower.includes('حدائق')) return 0.5;
      if (lower.includes('public') || lower.includes('servic') || lower.includes('خدمات')) return 5;
      return getAcudAppliedDensity();
    }
    const isRes = /resident|flat|dwelling|سكن|شقق/i.test(typeStr);
    if (egyptLocationType === 'villages') {
      return isRes ? 2 : 5;
    }
    if (egyptCityDistrictType === 'upscale') {
      return isRes ? 8 : 10;
    }
    return isRes ? 4 : 10;
  };

  const getFloorAppliedDensity = (floorName: string, bType?: string): number => {
    const currentBldType = bType || buildingType;
    if (selectedStandardId === 'saudi') {
      if (isBasementFloorName(floorName)) {
        return 2.4; // 24 VA/m² (Indoor Parking C13) = 2.4 kVA/100m²
      }
      const saudiCat = getSaudiCategoryByCodeOrName(currentBldType);
      const va = saudiCat ? saudiCat.vaPerM2 : saudiLoadDensityVA;
      return va / 10; // convert VA/m² to kVA/100m²: (va * 100) / 1000 = va / 10
    }
    return getEgyptianAppliedDensityForType(floorName, currentBldType);
  };

  // Buildings Details list state (Always 1 visible building by default)
  const [buildingsList, setBuildingsList] = useState<BuildingItem[]>([
    {
      id: 'bld-1',
      name: 'Building 1',
      buildingType: 'Offices',
      isTypeCustomized: false,
      floorsCount: 7,
      floors: [
        { id: 'f-1', name: 'Ground Floor', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
        { id: 'f-2', name: 'Typical Floor', floorsCount: 5, areaPerFloor: 500, demandFactor: 0.8 },
        { id: 'f-3', name: 'Basement Parking', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
      ],
      totalArea: 3500,
    },
  ]);

  const totalBuildingsArea = buildingsList.reduce((sum, b) => sum + (Number(b.totalArea) || 0), 0);

  // Multiple Building / Area State in Project Details
  const [numberOfAreas, setNumberOfAreas] = useState<number | string>(1);
  const [buildingAreas, setBuildingAreas] = useState<(number | string)[]>([3500]);

  // Keep buildingAreas and numberOfAreas in sync with buildingsList
  useEffect(() => {
    setBuildingAreas((prev) => {
      const nextAreas = buildingsList.map((b) => b.totalArea);
      if (
        prev.length === nextAreas.length &&
        prev.every((v, i) => Number(v) === Number(nextAreas[i]))
      ) {
        return prev;
      }
      return nextAreas;
    });
    setNumberOfAreas(buildingsList.length);
  }, [buildingsList]);

  const handleNumberOfAreasChange = (valStr: string) => {
    const cleanStr = toEnglishDigits(valStr).replace(/[^0-9]/g, '');
    if (cleanStr === '') {
      setNumberOfAreas('');
      return;
    }
    const count = Math.max(1, parseInt(cleanStr, 10) || 1);
    setNumberOfAreas(count);

    setBuildingsList((prev) => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        const added: BuildingItem[] = [];
        const sourceFloors = prev.length > 0 && prev[0].floors.length > 0
          ? prev[0].floors
          : [
              { id: 'f-1', name: isAr ? 'الدور الأرضي' : 'Ground Floor', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
              { id: 'f-2', name: isAr ? 'دور متكرر' : 'Typical Floor', floorsCount: 5, areaPerFloor: 500, demandFactor: 0.8 },
              { id: 'f-3', name: isAr ? 'بدروم' : 'Basement Parking', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
            ];

        for (let i = prev.length; i < count; i++) {
          const nextNum = i + 1;
          const defaultDf = selectedStandardId === 'saudi' ? 0.6 : 0.8;
          const clonedFloors: FloorRowItem[] = sourceFloors.map((fl, fIdx) => ({
            id: `f-${Date.now()}-${i}-${fIdx}-${Math.random().toString(36).substring(2, 6)}`,
            name: fl.name,
            floorsCount: fl.floorsCount,
            areaPerFloor: fl.areaPerFloor,
            demandFactor: fl.demandFactor !== undefined ? fl.demandFactor : (isBasementFloorName(fl.name) ? (selectedStandardId === 'saudi' ? 0.7 : 0.8) : defaultDf),
          }));
          const defaultBldType = selectedStandardId === 'saudi'
            ? `${SAUDI_SEC_CATEGORIES[6].name} (${SAUDI_SEC_CATEGORIES[6].code})`
            : (prev[0]?.buildingType || 'Offices');
          added.push({
            id: `bld-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
            name: isAr ? `مبنى ${nextNum}` : `Building ${nextNum}`,
            buildingType: defaultBldType,
            isTypeCustomized: true,
            floorsCount: calcBuildingTotalFloors(clonedFloors),
            floors: clonedFloors,
            totalArea: calcBuildingTotalArea(clonedFloors),
          });
        }
        return [...prev, ...added];
      } else {
        return prev.slice(0, count);
      }
    });
  };

  const handleAreaInputChange = (index: number, valStr: string) => {
    const cleanStr = toEnglishDigits(valStr).replace(/[^0-9.]/g, '');
    const parts = cleanStr.split('.');
    const sanitized = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanStr;

    setBuildingAreas((prev) => {
      const updated = [...prev];
      updated[index] = sanitized;
      return updated;
    });

    const numVal = Math.max(0, parseFloat(sanitized) || 0);

    setBuildingsList((prev) => {
      if (!prev[index]) return prev;
      const targetBld = prev[index];
      const totalFloors = calcBuildingTotalFloors(targetBld.floors) || 1;
      const newAreaPerFloor = totalFloors > 0 ? Math.round((numVal / totalFloors) * 100) / 100 : numVal;

      const updatedFloors = targetBld.floors.map((fl) => ({
        ...fl,
        areaPerFloor: newAreaPerFloor,
      }));

      const updatedBld: BuildingItem = {
        ...targetBld,
        floors: updatedFloors,
        totalArea: numVal,
      };

      const copy = [...prev];
      copy[index] = updatedBld;
      return copy;
    });
  };

  const handleAreaInputBlur = (index: number) => {
    setBuildingAreas((prev) => {
      const currentVal = prev[index];
      if (currentVal === '' || Number(currentVal) <= 0) {
        const fallback = 500;
        handleAreaInputChange(index, String(fallback));
        const updated = [...prev];
        updated[index] = fallback;
        return updated;
      }
      return prev;
    });
  };

  // AUTO-SYNC 1: Keep areaSquareMeters synced with total buildings area
  useEffect(() => {
    if (totalBuildingsArea > 0) {
      setAreaSquareMeters(totalBuildingsArea);
    }
  }, [totalBuildingsArea]);

  // AUTO-SYNC 2: Auto-sync Building 1 occupancy category with top Project Details selection (unless manually overridden)
  useEffect(() => {
    setBuildingsList((prev) => {
      if (prev.length === 0) return prev;
      if (prev[0].isTypeCustomized) return prev;
      if (prev[0].buildingType === buildingType) return prev;
      const updated = [...prev];
      updated[0] = { ...updated[0], buildingType };
      return updated;
    });
  }, [buildingType]);

  // When switching to Saudi Code, ensure default SEC category (C7) and DF are synced
  useEffect(() => {
    if (selectedStandardId === 'saudi') {
      const match = getSaudiCategoryByCodeOrName(buildingType) || SAUDI_SEC_CATEGORIES[6];
      setSaudiSelectedCategory(match);
      setSaudiLoadDensityVA(match.vaPerM2);
      setSaudiDemandFactor(match.df);
      const newTypeStr = `${match.name} (${match.code})`;
      if (!buildingType.includes('(')) {
        setBuildingType(newTypeStr as any);
      }
      setBuildingsList((prev) =>
        prev.map((b, idx) => {
          if (idx === 0 || !b.isTypeCustomized) {
            return {
              ...b,
              buildingType: newTypeStr as any,
              floors: b.floors.map((fl) => ({
                ...fl,
                demandFactor: match.df,
              })),
            };
          }
          return b;
        })
      );
    }
  }, [selectedStandardId]);

  const handleBuildingCategoryChange = (buildingId: string, newTypeStrOrCode: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        if (selectedStandardId === 'saudi') {
          const saudiCat =
            SAUDI_SEC_CATEGORIES.find((c) => c.code === newTypeStrOrCode) ||
            getSaudiCategoryByCodeOrName(newTypeStrOrCode);
          if (saudiCat) {
            const newTypeStr = `${saudiCat.name} (${saudiCat.code})`;
            return {
              ...b,
              buildingType: newTypeStr as any,
              isTypeCustomized: true,
              floors: b.floors.map((fl) => ({
                ...fl,
                demandFactor: isBasementFloorName(fl.name) ? 0.7 : saudiCat.df,
              })),
            };
          }
        }
        return {
          ...b,
          buildingType: newTypeStrOrCode as any,
          isTypeCustomized: true,
        };
      })
    );
  };

  const handleUpdateBuildingType = (buildingId: string, type: OccupancyCategory) => {
    handleBuildingCategoryChange(buildingId, type);
  };

  const handleUpdateBuildingName = (buildingId: string, name: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => (b.id === buildingId ? { ...b, name } : b))
    );
  };

  const handleAddFloorRow = (buildingId: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const defaultDf = selectedStandardId === 'saudi' ? saudiDemandFactor : 0.8;
        const newRow: FloorRowItem = {
          id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: isAr ? 'دور متكرر (Typical Floor)' : 'Typical Floor',
          floorsCount: 1,
          areaPerFloor: 300,
          demandFactor: defaultDf,
        };
        const newFloors = [...b.floors, newRow];
        return {
          ...b,
          floorsCount: calcBuildingTotalFloors(newFloors),
          floors: newFloors,
          totalArea: calcBuildingTotalArea(newFloors),
        };
      })
    );
  };

  const handleAddBasementRow = (buildingId: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const existingBasements = b.floors.filter((f) => isBasementFloorName(f.name));
        const basementNum = existingBasements.length + 1;
        const basementName =
          basementNum === 1
            ? (isAr ? 'بدروم (Basement)' : 'Basement')
            : (isAr ? `بدروم ${basementNum} (Basement ${basementNum})` : `Basement ${basementNum}`);

        const sampleFloor = existingBasements[0] || b.floors[0];
        const defaultArea = sampleFloor ? (Number(sampleFloor.areaPerFloor) || 500) : 500;
        const defaultDf = selectedStandardId === 'saudi' ? 0.7 : 0.8;

        const newRow: FloorRowItem = {
          id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: basementName,
          floorsCount: 1,
          areaPerFloor: defaultArea,
          demandFactor: defaultDf,
        };
        const newFloors = [...b.floors, newRow];
        return {
          ...b,
          floorsCount: calcBuildingTotalFloors(newFloors),
          floors: newFloors,
          totalArea: calcBuildingTotalArea(newFloors),
        };
      })
    );
  };

  const handleUpdateFloorRow = (
    buildingId: string,
    floorId: string,
    field: 'name' | 'floorsCount' | 'areaPerFloor' | 'demandFactor',
    value: string | number
  ) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const newFloors = b.floors.map((f) => {
          if (f.id !== floorId) return f;
          if (field === 'name') {
            return { ...f, name: String(value) };
          } else if (field === 'floorsCount') {
            if (value === '') return { ...f, floorsCount: '' };
            const clean = toEnglishDigits(value).replace(/[^0-9]/g, '');
            if (clean === '') return { ...f, floorsCount: '' };
            const num = parseInt(clean, 10);
            return { ...f, floorsCount: Math.max(1, Math.min(100, num)) };
          } else if (field === 'areaPerFloor') {
            if (value === '') return { ...f, areaPerFloor: '' };
            let clean = toEnglishDigits(value).replace(/[^0-9.]/g, '');
            const parts = clean.split('.');
            if (parts.length > 2) {
              clean = parts[0] + '.' + parts.slice(1).join('');
            }
            return { ...f, areaPerFloor: clean };
          } else if (field === 'demandFactor') {
            if (value === '') return { ...f, demandFactor: '' };
            let clean = toEnglishDigits(value).replace(/[^0-9.]/g, '');
            const parts = clean.split('.');
            if (parts.length > 2) {
              clean = parts[0] + '.' + parts.slice(1).join('');
            }
            return { ...f, demandFactor: clean };
          }
          return f;
        });
        return {
          ...b,
          floorsCount: calcBuildingTotalFloors(newFloors),
          floors: newFloors,
          totalArea: calcBuildingTotalArea(newFloors),
        };
      })
    );
  };

  const handleDeleteFloorRow = (buildingId: string, floorId: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId || b.floors.length <= 1) return b;
        const newFloors = b.floors.filter((f) => f.id !== floorId);
        return {
          ...b,
          floorsCount: calcBuildingTotalFloors(newFloors),
          floors: newFloors,
          totalArea: calcBuildingTotalArea(newFloors),
        };
      })
    );
  };

  const handleAddAnotherBuilding = () => {
    const nextNumber = buildingsList.length + 1;
    // Deep clone floors array (and their areas/densities) from the FIRST building (Building 1)
    const sourceFloors = buildingsList.length > 0 && buildingsList[0].floors.length > 0
      ? buildingsList[0].floors
      : [
          { id: 'f-1', name: isAr ? 'الدور الأرضي (Ground Floor)' : 'Ground Floor', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
          { id: 'f-2', name: isAr ? 'دور متكرر (Typical Floor)' : 'Typical Floor', floorsCount: 5, areaPerFloor: 500, demandFactor: 0.8 },
          { id: 'f-3', name: isAr ? 'بدروم (Basement Parking)' : 'Basement Parking', floorsCount: 1, areaPerFloor: 500, demandFactor: 0.8 },
        ];

    const defaultDf = selectedStandardId === 'saudi' ? 0.6 : 0.8;
    const clonedFloors: FloorRowItem[] = sourceFloors.map((fl, idx) => ({
      id: `f-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      name: fl.name,
      floorsCount: fl.floorsCount,
      areaPerFloor: fl.areaPerFloor,
      demandFactor: fl.demandFactor !== undefined ? fl.demandFactor : (isBasementFloorName(fl.name) ? (selectedStandardId === 'saudi' ? 0.7 : 0.8) : defaultDf),
    }));

    const defaultBuildingType = selectedStandardId === 'saudi'
      ? `${SAUDI_SEC_CATEGORIES[6].name} (${SAUDI_SEC_CATEGORIES[6].code})`
      : (buildingsList.length > 0 ? buildingsList[0].buildingType : 'Offices');

    const newBuilding: BuildingItem = {
      id: `bld-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: isAr ? `مبنى ${nextNumber}` : `Building ${nextNumber}`,
      buildingType: defaultBuildingType,
      isTypeCustomized: true,
      floorsCount: calcBuildingTotalFloors(clonedFloors),
      floors: clonedFloors,
      totalArea: calcBuildingTotalArea(clonedFloors),
    };
    setBuildingsList((prev) => [...prev, newBuilding]);
  };

  const handleRemoveBuilding = (buildingId: string) => {
    if (buildingsList.length <= 1) return;
    setBuildingsList((prev) => prev.filter((b) => b.id !== buildingId));
  };

  // Standard engineering constants (Sliders removed from UI)
  const hvacDiversity = 85;
  const powerFactor = 0.90;

  // 4. Dynamic loads state
  const [activeLoadsTab, setActiveLoadsTab] = useState<'pumps' | 'extra'>('pumps');
  const [pumps, setPumps] = useState<PumpItem[]>([
    {
      id: 'p1',
      name: 'Domestic Water Booster Pump Set',
      nameAr: 'مجموعة مضخات مياه الشرب والتغذية',
      hp: 15,
      category: 'water',
      demandFactor: 0.8,
    },
    {
      id: 'p2',
      name: 'Firefighting Main Centrifugal Pump',
      nameAr: 'مضخة الحريق الرئيسية المركزية',
      hp: 75,
      category: 'fire',
      demandFactor: 0.8,
    },
    {
      id: 'p3',
      name: 'Stormwater & Drainage Sump Pump',
      nameAr: 'مضخة تصريف مياه الأمطار والنزح',
      hp: 7.5,
      category: 'drainage',
      demandFactor: 0.8,
    },
  ]);

  const [extraLoads, setExtraLoads] = useState<ExtraLoadItem[]>([
    {
      id: 'e1',
      name: 'Passenger Elevators Bank (2 Cars)',
      nameAr: 'مجموعة مصاعد الركاب (عدد 2)',
      category: 'transport',
      kva: 25,
      qty: 1,
      demandFactor: 0.8,
    },
    {
      id: 'e2',
      name: 'Motorized Security Perimeter Gates',
      nameAr: 'بوابات الأمن الإلكترونية المحيطية',
      category: 'security',
      kva: 4,
      qty: 2,
      demandFactor: 0.8,
    },
  ]);

  // Modals / Inline for adding items
  const [isAddingPump, setIsAddingPump] = useState<boolean>(false);
  const [newPumpName, setNewPumpName] = useState<string>('');
  const [newPumpHp, setNewPumpHp] = useState<number>(10);
  const [newPumpCategory, setNewPumpCategory] = useState<'water' | 'fire' | 'drainage' | 'hvac'>('water');

  const [isAddingExtra, setIsAddingExtra] = useState<boolean>(false);
  const [newExtraName, setNewExtraName] = useState<string>('');
  const [newExtraKva, setNewExtraKva] = useState<number>(15);
  const [newExtraQty, setNewExtraQty] = useState<number>(1);
  const [newExtraCategory, setNewExtraCategory] = useState<'transport' | 'security' | 'ev' | 'general'>('transport');

  // Detailed Load Summary: Diversity Factor & row Demand Factor overrides
  const [projectDiversityFactor, setProjectDiversityFactor] = useState<number | string>(1.0);
  const [spareCapacityPercent, setSpareCapacityPercent] = useState<number | string>(20);
  const [transformerLoadingRatio, setTransformerLoadingRatio] = useState<number | string>(80);
  const [selectedTransformerSize, setSelectedTransformerSize] = useState<number>(1000);
  const [transformerQuantity, setTransformerQuantity] = useState<number | string>(1);
  const [buildingsDemandFactorOverrides, setBuildingsDemandFactorOverrides] = useState<Record<string, number | string>>({});
  const [pumpsDemandFactorOverrides, setPumpsDemandFactorOverrides] = useState<Record<string, number | string>>({});
  const [extraLoadsDemandFactorOverrides, setExtraLoadsDemandFactorOverrides] = useState<Record<string, number | string>>({});

  // FORMULA FOR PUMPS: Power (kVA) = (HP * 0.746) / (Efficiency 0.90 * Power Factor 0.85)
  const calculatePumpKva = (hp: number): number => {
    const mechanicalKw = hp * 0.746;
    const electricalKva = mechanicalKw / (0.9 * 0.85); // 0.765
    return electricalKva;
  };

  // Handlers for Pumps
  const handleAddPump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPumpName.trim()) return;
    const newPump: PumpItem = {
      id: `p-${Date.now()}`,
      name: newPumpName.trim(),
      nameAr: newPumpName.trim(),
      hp: Math.max(1, newPumpHp),
      category: newPumpCategory,
      demandFactor: 0.8,
    };
    setPumps((prev) => [...prev, newPump]);
    setNewPumpName('');
    setNewPumpHp(10);
    setIsAddingPump(false);
  };

  const handleDeletePump = (id: string) => {
    setPumps((prev) => prev.filter((p) => p.id !== id));
  };

  // Handlers for Extra Loads
  const handleAddExtraLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExtraName.trim()) return;
    const newItem: ExtraLoadItem = {
      id: `e-${Date.now()}`,
      name: newExtraName.trim(),
      nameAr: newExtraName.trim(),
      category: newExtraCategory,
      kva: Math.max(0.5, newExtraKva),
      qty: Math.max(1, newExtraQty),
      demandFactor: 0.8,
    };
    setExtraLoads((prev) => [...prev, newItem]);
    setNewExtraName('');
    setNewExtraKva(15);
    setNewExtraQty(1);
    setIsAddingExtra(false);
  };

  const handleDeleteExtraLoad = (id: string) => {
    setExtraLoads((prev) => prev.filter((e) => e.id !== id));
  };

  // Specific density factors based on the 28 building types and standard (in VA/m²)
  const getStandardDensity = (stdId: string, bType: OccupancyCategory, egyptSub: 'ecp203' | 'acud') => {
    let lighting = 15;
    let power = 25;
    let hvac = 65;
    let baseDf = 0.82;

    switch (bType) {
      case 'Normal Residential Dwelling':
      case 'Furnished Flats':
        lighting = 12; power = 20; hvac = stdId === 'saudi' ? 95 : 45; baseDf = 0.75;
        break;
      case 'Normal Commercial Shops':
      case 'Malls':
        lighting = 30; power = 35; hvac = stdId === 'saudi' ? 140 : 85; baseDf = 0.85;
        break;
      case 'Hotels':
        lighting = 20; power = 28; hvac = stdId === 'saudi' ? 115 : 70; baseDf = 0.80;
        break;
      case 'Restaurants':
        lighting = 25; power = 45; hvac = stdId === 'saudi' ? 150 : 90; baseDf = 0.88;
        break;
      case 'Offices':
        lighting = 18; power = 28; hvac = stdId === 'saudi' ? 120 : 65; baseDf = 0.84;
        break;
      case 'Schools':
      case 'Universities/High Educational Facilities':
        lighting = 16; power = 22; hvac = stdId === 'saudi' ? 90 : 50; baseDf = 0.76;
        break;
      case 'Mosques':
      case 'Community Halls':
        lighting = 15; power = 15; hvac = stdId === 'saudi' ? 130 : 75; baseDf = 0.70;
        break;
      case 'Common Area/Services in Buildings':
      case 'Public Services Facilities':
        lighting = 10; power = 15; hvac = stdId === 'saudi' ? 60 : 35; baseDf = 0.75;
        break;
      case 'Indoor Parking':
        lighting = 6; power = 6; hvac = 15; baseDf = 0.80;
        break;
      case 'Outdoor Parking':
      case 'Streets Lighting':
      case 'Parks & Garden':
      case 'Open Spaces':
        lighting = 4; power = 2; hvac = 0; baseDf = 0.95;
        break;
      case 'Hospitals & Medical Facilities':
      case 'Medical Clinics':
        lighting = 24; power = 42; hvac = stdId === 'saudi' ? 135 : 85; baseDf = 0.88;
        break;
      case 'Light Industries':
      case 'Workshops':
        lighting = 14; power = 55; hvac = stdId === 'saudi' ? 60 : 30; baseDf = 0.80;
        break;
      case 'Cooling Stores':
        lighting = 8; power = 20; hvac = stdId === 'saudi' ? 240 : 180; baseDf = 0.90;
        break;
      case 'Warehouses':
        lighting = 8; power = 12; hvac = stdId === 'saudi' ? 40 : 20; baseDf = 0.72;
        break;
      case 'Recreational Facilities':
        lighting = 20; power = 25; hvac = stdId === 'saudi' ? 110 : 65; baseDf = 0.80;
        break;
      case 'Farms/Agricultural Facilities':
        lighting = 6; power = 30; hvac = 15; baseDf = 0.75;
        break;
      case 'Fuel Stations':
        lighting = 20; power = 25; hvac = stdId === 'saudi' ? 65 : 40; baseDf = 0.85;
        break;
      case 'Bulk Factories':
        lighting = 12; power = 85; hvac = stdId === 'saudi' ? 50 : 25; baseDf = 0.82;
        break;
      default:
        lighting = 15; power = 25; hvac = 60; baseDf = 0.80;
    }

    // Code-specific modifiers
    if (stdId === 'europe') {
      lighting *= 0.8;
      power *= 0.85;
      hvac *= 0.75;
    } else if (stdId === 'usa') {
      lighting *= 1.1;
      power *= 1.1;
      baseDf = Math.min(0.95, baseDf * 1.05);
    } else if (stdId === 'egypt' && egyptSub === 'acud') {
      lighting *= 1.1;
      power *= 1.15;
      hvac *= 1.1;
    }

    return { lighting, power, hvac, baseDf };
  };

  // Computations for active standard
  const activeDensity = getStandardDensity(selectedStandardId, buildingType, egyptSubStandard);
  const buildingConnectedKva =
    selectedStandardId === 'egypt'
      ? (egyptSubStandard === 'acud'
          ? calculateAcudConnectedKva(areaSquareMeters)
          : (areaSquareMeters / 100) * getEgyptianAppliedLoadDensity())
      : ((activeDensity.lighting + activeDensity.power + activeDensity.hvac) * areaSquareMeters) / 1000;

  // Total Pumps kVA
  const totalPumpsKva = pumps.reduce((sum, p) => sum + calculatePumpKva(p.hp), 0);

  // Total Extra Loads kVA
  const totalExtraLoadsKva = extraLoads.reduce((sum, e) => sum + e.kva * e.qty, 0);

  // Card 1: Total Connected Load
  const totalConnectedKva = buildingConnectedKva + totalPumpsKva + totalExtraLoadsKva;

  // Demand calculations
  const calculateStandardResults = (stdId: string) => {
    const d = getStandardDensity(stdId, buildingType, egyptSubStandard);
    let bldgConnKva = ((d.lighting + d.power + d.hvac) * areaSquareMeters) / 1000;
    if (stdId === 'egypt') {
      if (egyptSubStandard === 'acud') {
        bldgConnKva = calculateAcudConnectedKva(areaSquareMeters);
      } else {
        bldgConnKva = (areaSquareMeters / 100) * getEgyptianAppliedLoadDensity();
      }
    }
    const totalConn = bldgConnKva + totalPumpsKva + totalExtraLoadsKva;

    // Building Demand
    const lightKva = (d.lighting * areaSquareMeters) / 1000;
    const powerKva = (d.power * areaSquareMeters) / 1000;
    const hvacKva = (d.hvac * areaSquareMeters) / 1000;

    let bldgDemandKva = 0;
    if (stdId === 'usa') {
      const receptacleDemand = powerKva <= 10 ? powerKva : 10 + (powerKva - 10) * 0.5;
      bldgDemandKva = lightKva * 1.25 + receptacleDemand + hvacKva * (hvacDiversity / 100) * 1.25;
    } else if (stdId === 'saudi') {
      bldgDemandKva = lightKva * 0.9 + powerKva * 0.5 + hvacKva * (hvacDiversity / 100) * 0.95;
    } else if (stdId === 'europe') {
      bldgDemandKva = (lightKva * 0.9 + powerKva * 0.6 + hvacKva * (hvacDiversity / 100) * 0.85) * 0.85;
    } else {
      // egypt
      if (egyptSubStandard === 'acud') {
        bldgDemandKva = bldgConnKva * 0.8;
      } else {
        const factor = 0.82;
        bldgDemandKva = bldgConnKva * factor;
      }
    }

    // Dynamic loads demand: Pumps DF 0.80, extra loads DF 0.80
    const pumpsDemandKva = totalPumpsKva * 0.8;
    const extraDemandKva = totalExtraLoadsKva * 0.8;
    const totalDemand = bldgDemandKva + pumpsDemandKva + extraDemandKva;
    const estimatedKw = totalDemand * powerFactor;

    // Transformer standard sizing with 20% margin
    const standardRatings = [250, 400, 500, 630, 800, 1000, 1250, 1500, 1600, 2000, 2500, 3150, 4000, 5000];
    const targetWithMargin = totalDemand * 1.2;
    const transformerKva = standardRatings.find((r) => r >= targetWithMargin) || 5000;

    return {
      connectedKva: totalConn,
      demandKva: totalDemand,
      estimatedKw: estimatedKw,
      transformerKva: transformerKva,
    };
  };

  const activeResults = calculateStandardResults(selectedStandardId);

  // Helper to load ExcelJS from CDN
  const loadExcelJS = async (): Promise<any> => {
    if (typeof window !== 'undefined' && (window as any).ExcelJS) {
      return (window as any).ExcelJS;
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src*="exceljs"]');
      if (existing) {
        if ((window as any).ExcelJS) return resolve((window as any).ExcelJS);
        existing.addEventListener('load', () => resolve((window as any).ExcelJS));
        existing.addEventListener('error', () => reject(new Error('Failed to load ExcelJS from CDN')));
        setTimeout(() => {
          if ((window as any).ExcelJS) resolve((window as any).ExcelJS);
        }, 500);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js';
      script.onload = () => resolve((window as any).ExcelJS);
      script.onerror = () => reject(new Error('Failed to load ExcelJS from CDN'));
      document.head.appendChild(script);
    });
  };

  // Helper for standard IEC/ABB/Schneider transformer ratings (e.g. 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500 kVA)
  const getSelectedTransformerKva = (reqKva: number): number => {
    const standardIecSizes = [
      100, 160, 200, 250, 315, 400, 500, 630, 800,
      1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000,
    ];
    const match = standardIecSizes.find((s) => s >= reqKva);
    return match || Math.ceil(reqKva / 500) * 500;
  };

  // 📥 Professional Engineering Report Export via ExcelJS (Overhauled Format)
  const handleExportToExcel = async () => {
    try {
      const ExcelJS = await loadExcelJS();
      if (!ExcelJS) {
        throw new Error('ExcelJS library is not available');
      }

      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Load Estimation Calculator';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet('Load Estimation', {
        views: [{ showGridLines: true }],
      });

      // 1. DEFAULT ROW HEIGHT & COLUMN WIDTHS
      // Set default row height for generous wrapped text spacing
      worksheet.properties.defaultRowHeight = 25;

      // Base generous column widths:
      // A=25, B=28, C=25, D=15, E=15, F=15, G=18, H=18, I=18, J=22
      worksheet.columns = [
        { width: 25 }, // Col 1 (A): LOAD TYPE / ITEM (نوع الحمل)
        { width: 28 }, // Col 2 (B): ITEM NAME (اسم المبنى/المضخة)
        { width: 25 }, // Col 3 (C): CATEGORY / TYPE (الفئة/النوع)
        { width: 15 }, // Col 4 (D): AREA (G.F.L)
        { width: 15 }, // Col 5 (E): AREA (F.F.L)
        { width: 15 }, // Col 6 (F): AREA (TOTAL)
        { width: 18 }, // Col 7 (G): LOAD DENSITY (VA/M2)
        { width: 18 }, // Col 8 (H): TOTAL CONNECTED (KVA)
        { width: 18 }, // Col 9 (I): DEMAND FACTOR
        { width: 22 }, // Col 10 (J): TOTAL DEMAND LOAD (KVA)
      ];

      // Common border style
      const thinBorder = {
        top: { style: 'thin' as const, color: { argb: 'FF000000' } },
        left: { style: 'thin' as const, color: { argb: 'FF000000' } },
        bottom: { style: 'thin' as const, color: { argb: 'FF000000' } },
        right: { style: 'thin' as const, color: { argb: 'FF000000' } },
      };

      // 1. HEADER SECTION (Row 1 & 2 & 3)
      // Cell A1: "Project Name: [Insert Project Name]" (Bold, Left aligned)
      // Cell D1: "Project Nature: [Insert Project Nature]" (Bold, Left aligned)
      // Cell G1 to J1: "Load Estimation Report" (Merged, Bold, Font Size 14, Center aligned)
      worksheet.mergeCells('A1:C1');
      const cellA1 = worksheet.getCell('A1');
      cellA1.value = `Project Name: ${(projectName && projectName.trim()) || 'Project'}`;
      cellA1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      cellA1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

      worksheet.mergeCells('D1:F1');
      const cellD1 = worksheet.getCell('D1');
      cellD1.value = `Project Nature: ${
        selectedStandardId === 'egypt' && egyptSubStandard === 'acud'
          ? `${buildingType} [ACUD - ${getAcudActivity().name}]`
          : buildingType
      }`;
      cellD1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      cellD1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

      worksheet.mergeCells('G1:J1');
      const cellG1 = worksheet.getCell('G1');
      cellG1.value = 'Load Estimation Report';
      cellG1.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF1E3A8A' } };
      cellG1.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      worksheet.getRow(1).height = 32;

      // Row 2: Merge A2:J2.
      worksheet.mergeCells('A2:J2');
      const cellA2 = worksheet.getCell('A2');
      cellA2.value = '* Table covers only normal loads. Any additional loads will be considered & added as special loads.';
      cellA2.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF444444' } };
      cellA2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      worksheet.getRow(2).height = 20;

      // Row 3: Merge A3:J3.
      worksheet.mergeCells('A3:J3');
      const cellA3 = worksheet.getCell('A3');
      cellA3.value = '* For all such customers an average load requirement is considered as appropriate method for the load calculation.';
      cellA3.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF444444' } };
      cellA3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      worksheet.getRow(3).height = 20;

      // Row 4: Empty spacer row
      worksheet.getRow(4).height = 12;

      // 4. TABLE HEADERS (Row 5) - Height 30, Center-Aligned, Wrapped, Bold
      const headers = [
        'LOAD TYPE / ITEM (نوع الحمل)',
        'ITEM NAME (اسم المبنى/المضخة)',
        'CATEGORY / TYPE (الفئة/النوع)',
        'AREA (G.F.L)',
        'AREA (F.F.L)',
        'AREA (TOTAL)',
        'LOAD DENSITY (VA/M2)',
        'TOTAL CONNECTED (KVA)',
        'DEMAND FACTOR',
        'TOTAL DEMAND LOAD (KVA)',
      ];

      const headerRow = worksheet.getRow(5);
      headerRow.height = 30;
      headers.forEach((h, idx) => {
        const cell = headerRow.getCell(idx + 1);
        cell.value = h;
        cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9E1F2' },
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = thinBorder;
      });

      // 3. GROUPING DATA (Starts Row 6)
      let currentRowIndex = 6;

      // 3.1 Group: BUILDINGS
      const buildingItems = buildingsList.map((bld, idx) => {
        let connected = bld.floors.reduce((sum, fl) => {
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = getFloorAppliedDensity(fl.name, bld.buildingType);
          return sum + (rowSubtotal * density) / 100;
        }, 0);

        if (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0) {
          connected += (Number(acudEvChargers) || 0) * 150;
        }

        const floorBreakdownDemand = bld.floors.reduce((sum, fl) => {
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = getFloorAppliedDensity(fl.name, bld.buildingType);
          const conn = (rowSubtotal * density) / 100;
          const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) || 0.8 : 0.8;
          return sum + conn * df;
        }, 0) + (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0 ? (Number(acudEvChargers) || 0) * 150 * 0.8 : 0);

        const defaultDf = connected > 0 ? floorBreakdownDemand / connected : 0.8;
        const bldOverride = buildingsDemandFactorOverrides[bld.id];
        const effectiveDf = bldOverride !== undefined
          ? (bldOverride === '' ? 0 : Math.max(0, Number(bldOverride) || 0))
          : defaultDf;

        const demand = connected * effectiveDf;
        const avgDensityKvaPer100m2 = bld.totalArea > 0 ? (connected / bld.totalArea) * 100 : 0;
        const avgDensityVaPerM2 = avgDensityKvaPer100m2 * 10;

        const gfFloor = bld.floors.find((f) => /ground|g\.?f/i.test(f.name));
        const gfArea = gfFloor ? (Number(gfFloor.areaPerFloor) || 0) * (Number(gfFloor.floorsCount) || 1) : 0;

        const totalAreaNum = Number(bld.totalArea) || 0;
        let finalGfArea = 0;
        let finalFfArea = 0;
        if (gfArea > 0) {
          finalGfArea = gfArea;
          finalFfArea = Math.max(0, totalAreaNum - gfArea);
        } else {
          finalGfArea = 0;
          finalFfArea = totalAreaNum;
        }

        const categoryLabel = selectedStandardId === 'egypt' && egyptSubStandard === 'acud'
          ? (bld.isTypeCustomized ? bld.buildingType : `ACUD: ${getAcudActivity().name}`)
          : bld.buildingType;

        return {
          bld,
          itemName: bld.name,
          category: categoryLabel,
          areaGfl: finalGfArea,
          areaFfl: finalFfArea,
          areaTotal: totalAreaNum,
          loadDensity: avgDensityVaPerM2,
          connected,
          df: effectiveDf,
          demand,
        };
      });

      const bldStartRow = currentRowIndex;
      const mainBuildingRowIndices: number[] = [];
      buildingItems.forEach((b) => {
        // STEP A: Main Building Row (Bold, Total Values with Dynamic Formulas)
        const bldMainRowIdx = currentRowIndex;
        mainBuildingRowIndices.push(bldMainRowIdx);
        const rowObj = worksheet.getRow(currentRowIndex);
        rowObj.height = 25;

        rowObj.getCell(1).value = 'BUILDINGS';
        rowObj.getCell(2).value = b.itemName;
        rowObj.getCell(3).value = b.category;

        // Col D (AREA GFL): numeric with dash format if 0 to avoid #VALUE! error in sum formula
        if (b.areaGfl > 0) {
          rowObj.getCell(4).value = b.areaGfl;
          rowObj.getCell(4).numFmt = '#,##0.00';
        } else {
          rowObj.getCell(4).value = 0;
          rowObj.getCell(4).numFmt = '#,##0.00;-#,##0.00;"—"';
        }

        // Col E (AREA FFL): numeric with dash format if 0 to avoid #VALUE! error in sum formula
        if (b.areaFfl > 0) {
          rowObj.getCell(5).value = b.areaFfl;
          rowObj.getCell(5).numFmt = '#,##0.00';
        } else {
          rowObj.getCell(5).value = 0;
          rowObj.getCell(5).numFmt = '#,##0.00;-#,##0.00;"—"';
        }

        // Col F (AREA TOTAL): Live formula =D{row}+E{row}
        rowObj.getCell(6).value = {
          formula: `D${currentRowIndex}+E${currentRowIndex}`,
          result: b.areaTotal,
        };
        rowObj.getCell(6).numFmt = '#,##0.00';

        // Col G (LOAD DENSITY): Fixed string "---" for main building row
        rowObj.getCell(7).value = '---';
        rowObj.getCell(7).numFmt = '@';

        // Floors range below this main building row:
        const floorCount = b.bld.floors.length;
        const firstFloorRow = bldMainRowIdx + 1;
        const lastFloorRow = bldMainRowIdx + floorCount;

        // Col H (TOTAL CONNECTED): SUM formula of floor rows below it
        if (floorCount > 0) {
          rowObj.getCell(8).value = {
            formula: `SUM(H${firstFloorRow}:H${lastFloorRow})`,
            result: b.connected,
          };
        } else {
          rowObj.getCell(8).value = b.connected;
        }
        rowObj.getCell(8).numFmt = '#,##0.00';

        // Col I (DEMAND FACTOR): static factor
        rowObj.getCell(9).value = b.df;
        rowObj.getCell(9).numFmt = '0.00';

        // Col J (TOTAL DEMAND LOAD): Live formula =H{row}*I{row}
        rowObj.getCell(10).value = {
          formula: `H${currentRowIndex}*I${currentRowIndex}`,
          result: b.demand,
        };
        rowObj.getCell(10).numFmt = '#,##0.00';

        for (let c = 1; c <= 10; c++) {
          const cell = rowObj.getCell(c);
          cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF000000' } };
          cell.border = thinBorder;
          if (c <= 3) {
            cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          } else if (c === 7 || cell.value === '---' || cell.value === '—' || (typeof cell.value === 'number' && cell.value === 0 && cell.numFmt?.includes('"—"'))) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          } else {
            cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
          }
        }

        currentRowIndex++;

        // STEP B: IMMEDIATELY BELOW, Sub-rows for EACH floor in that building
        const floorRowFill = {
          type: 'pattern' as const,
          pattern: 'solid' as const,
          fgColor: { argb: 'FFF9FAFB' }, // Light gray #F9FAFB
        };

        b.bld.floors.forEach((fl) => {
          const floorRowObj = worksheet.getRow(currentRowIndex);
          floorRowObj.height = 22;

          const floorSubtotalArea = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const floorDensityKva = getFloorAppliedDensity(fl.name, b.bld.buildingType);
          const floorDensityVaPerM2 = floorDensityKva * 10;
          const floorConnectedKva = (floorSubtotalArea * floorDensityKva) / 100;
          const floorDf = fl.demandFactor !== undefined ? Number(fl.demandFactor) || 0.8 : 0.8;
          const floorDemandKva = floorConnectedKva * floorDf;

          const isGround = /ground|g\.?f/i.test(fl.name);
          const isFirstOrTypical = /first|f\.?f|typical/i.test(fl.name);

          // Col A (LOAD TYPE): Leave empty (merged across building group)
          floorRowObj.getCell(1).value = '';

          // Col B (ITEM NAME): Prefix with hyphen and indentation
          const floorDisplayName = `  - ${fl.name}${Number(fl.floorsCount) > 1 ? ` (${fl.floorsCount} floors)` : ''}`;
          floorRowObj.getCell(2).value = floorDisplayName;

          // Col C (CATEGORY): Leave empty
          floorRowObj.getCell(3).value = '';

          // Col D (AREA GFL)
          if (isGround) {
            floorRowObj.getCell(4).value = floorSubtotalArea;
            floorRowObj.getCell(4).numFmt = '#,##0.00';
          } else {
            floorRowObj.getCell(4).value = 0;
            floorRowObj.getCell(4).numFmt = '#,##0.00;-#,##0.00;"—"';
          }

          // Col E (AREA FFL)
          if (isFirstOrTypical) {
            floorRowObj.getCell(5).value = floorSubtotalArea;
            floorRowObj.getCell(5).numFmt = '#,##0.00';
          } else {
            floorRowObj.getCell(5).value = 0;
            floorRowObj.getCell(5).numFmt = '#,##0.00;-#,##0.00;"—"';
          }

          // Col F (AREA TOTAL): Live formula =D{row}+E{row}
          floorRowObj.getCell(6).value = {
            formula: `D${currentRowIndex}+E${currentRowIndex}`,
            result: floorSubtotalArea,
          };
          floorRowObj.getCell(6).numFmt = '#,##0.00';

          // Col G (LOAD DENSITY)
          floorRowObj.getCell(7).value = floorDensityVaPerM2;
          floorRowObj.getCell(7).numFmt = '#,##0.00';

          // Col H (TOTAL CONNECTED): Live formula =(F{row}*G{row})/1000
          floorRowObj.getCell(8).value = {
            formula: `(F${currentRowIndex}*G${currentRowIndex})/1000`,
            result: floorConnectedKva,
          };
          floorRowObj.getCell(8).numFmt = '#,##0.00';

          // Col I (DEMAND FACTOR)
          floorRowObj.getCell(9).value = floorDf;
          floorRowObj.getCell(9).numFmt = '0.00';

          // Col J (TOTAL DEMAND LOAD): Live formula =H{row}*I{row}
          floorRowObj.getCell(10).value = {
            formula: `H${currentRowIndex}*I${currentRowIndex}`,
            result: floorDemandKva,
          };
          floorRowObj.getCell(10).numFmt = '#,##0.00';

          // STYLE: Regular (not bold), slightly smaller font (size 9.5), light gray background #F9FAFB, thin borders
          for (let c = 1; c <= 10; c++) {
            const cell = floorRowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 9.5, bold: false, color: { argb: 'FF374151' } };
            cell.fill = floorRowFill;
            cell.border = thinBorder;
            if (c <= 3) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (cell.value === '—' || (typeof cell.value === 'number' && cell.value === 0 && cell.numFmt?.includes('"—"'))) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }

          currentRowIndex++;
        });
      });

      const bldEndRow = currentRowIndex - 1;
      if (bldEndRow > bldStartRow) {
        worksheet.mergeCells(`A${bldStartRow}:A${bldEndRow}`);
        worksheet.getCell(`A${bldStartRow}`).value = 'BUILDINGS';
        worksheet.getCell(`A${bldStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        worksheet.getCell(`A${bldStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E3A8A' } };
      } else if (bldEndRow === bldStartRow) {
        worksheet.getCell(`A${bldStartRow}`).value = 'BUILDINGS';
        worksheet.getCell(`A${bldStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E3A8A' } };
      }

      // 3.2 Group: PUMPS
      const pumpItems = pumps.map((p) => {
        const connected = calculatePumpKva(p.hp);
        const pumpOverride = pumpsDemandFactorOverrides[p.id];
        const defaultDf = p.demandFactor !== undefined ? p.demandFactor : 0.8;
        const effectiveDf = pumpOverride !== undefined
          ? (pumpOverride === '' ? 0 : Math.max(0, Number(pumpOverride) || 0))
          : defaultDf;
        const demand = connected * effectiveDf;

        const categoryLabel = p.category === 'fire'
          ? 'Firefighting Pump'
          : p.category === 'water'
          ? 'Domestic Water Booster'
          : p.category === 'drainage'
          ? 'Drainage & Sump'
          : 'HVAC Circulation';

        return {
          itemName: p.name,
          category: categoryLabel,
          connected,
          df: effectiveDf,
          demand,
        };
      });

      const pumpStartRow = currentRowIndex;
      pumpItems.forEach((p) => {
        const rowObj = worksheet.getRow(currentRowIndex);
        rowObj.height = 25;

        rowObj.getCell(1).value = 'PUMPS';
        rowObj.getCell(2).value = p.itemName;
        rowObj.getCell(3).value = p.category;

        rowObj.getCell(4).value = '—';
        rowObj.getCell(5).value = '—';
        rowObj.getCell(6).value = '—';
        rowObj.getCell(7).value = '—';

        rowObj.getCell(8).value = p.connected;
        rowObj.getCell(8).numFmt = '#,##0.00';

        rowObj.getCell(9).value = p.df;
        rowObj.getCell(9).numFmt = '0.00';

        rowObj.getCell(10).value = p.demand;
        rowObj.getCell(10).numFmt = '#,##0.00';

        for (let c = 1; c <= 10; c++) {
          const cell = rowObj.getCell(c);
          cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
          cell.border = thinBorder;
          if (c <= 3) {
            cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          } else if (c >= 4 && c <= 7) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          } else {
            cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
          }
        }

        currentRowIndex++;
      });
      const pumpEndRow = currentRowIndex - 1;
      if (pumpEndRow > pumpStartRow) {
        worksheet.mergeCells(`A${pumpStartRow}:A${pumpEndRow}`);
        worksheet.getCell(`A${pumpStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        worksheet.getCell(`A${pumpStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF92400E' } };
      } else if (pumpEndRow === pumpStartRow) {
        worksheet.getCell(`A${pumpStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF92400E' } };
      }

      // 3.3 Group: EXTRA LOADS
      const extraItems = extraLoads.map((e) => {
        const connected = (Number(e.kva) || 0) * (Number(e.qty) || 1);
        const extraOverride = extraLoadsDemandFactorOverrides[e.id];
        const defaultDf = e.demandFactor !== undefined ? e.demandFactor : 0.8;
        const effectiveDf = extraOverride !== undefined
          ? (extraOverride === '' ? 0 : Math.max(0, Number(extraOverride) || 0))
          : defaultDf;
        const demand = connected * effectiveDf;

        const categoryLabel = e.category === 'transport'
          ? 'Elevators & Transport'
          : e.category === 'security'
          ? 'Security Systems'
          : e.category === 'ev'
          ? 'EV Charging Station'
          : 'Special Electromechanical';

        return {
          itemName: e.name,
          category: categoryLabel,
          connected,
          df: effectiveDf,
          demand,
        };
      });

      const extraStartRow = currentRowIndex;
      extraItems.forEach((e) => {
        const rowObj = worksheet.getRow(currentRowIndex);
        rowObj.height = 25;

        rowObj.getCell(1).value = 'EXTRA LOADS';
        rowObj.getCell(2).value = e.itemName;
        rowObj.getCell(3).value = e.category;

        rowObj.getCell(4).value = '—';
        rowObj.getCell(5).value = '—';
        rowObj.getCell(6).value = '—';
        rowObj.getCell(7).value = '—';

        rowObj.getCell(8).value = e.connected;
        rowObj.getCell(8).numFmt = '#,##0.00';

        rowObj.getCell(9).value = e.df;
        rowObj.getCell(9).numFmt = '0.00';

        rowObj.getCell(10).value = e.demand;
        rowObj.getCell(10).numFmt = '#,##0.00';

        for (let c = 1; c <= 10; c++) {
          const cell = rowObj.getCell(c);
          cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
          cell.border = thinBorder;
          if (c <= 3) {
            cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          } else if (c >= 4 && c <= 7) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          } else {
            cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
          }
        }

        currentRowIndex++;
      });
      const extraEndRow = currentRowIndex - 1;
      if (extraEndRow > extraStartRow) {
        worksheet.mergeCells(`A${extraStartRow}:A${extraEndRow}`);
        worksheet.getCell(`A${extraStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        worksheet.getCell(`A${extraStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF581C87' } };
      } else if (extraEndRow === extraStartRow) {
        worksheet.getCell(`A${extraStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF581C87' } };
      }

      // 2. SUMMARY SECTION ALIGNMENT (Bottom Rows)
      const dataStartRow = 6;
      const dataEndRow = currentRowIndex - 1;

      const allItems = [...buildingItems, ...pumpItems, ...extraItems];
      const totalDemandBeforeDiversity = allItems.reduce((sum, item) => sum + item.demand, 0);
      const diversityFactorVal = projectDiversityFactor === '' ? 1.0 : Math.max(0, Number(projectDiversityFactor) || 1.0);
      const totalLoadAfterDiversity = totalDemandBeforeDiversity * diversityFactorVal;

      // 1. DYNAMIC SPARE CAPACITY & TRANSFORMER VALUES FROM STATE
      const numericSparePercent = spareCapacityPercent === '' ? 20 : Math.max(0, Number(spareCapacityPercent) || 0);
      const spareMultiplier = 1 + (numericSparePercent / 100);
      const spareCapacityVal = `${numericSparePercent}% (${spareMultiplier.toFixed(2)})`;
      const totalLoadWithSpare = totalLoadAfterDiversity * spareMultiplier;

      const numericLoadingRatio = transformerLoadingRatio === '' ? 80 : Math.max(1, Number(transformerLoadingRatio) || 80);
      const loadingRatioDecimal = numericLoadingRatio / 100;
      const loadingRatioText = `${numericLoadingRatio}% (${loadingRatioDecimal.toFixed(2)})`;
      const requiredTransformerKva = totalLoadWithSpare / loadingRatioDecimal;

      const numericQty = transformerQuantity === '' ? 1 : Math.max(1, parseInt(String(transformerQuantity), 10) || 1);
      const selectedSize = Number(selectedTransformerSize) || 1000;
      const selectedTransText = numericQty > 1 ? `${numericQty} x ${selectedSize} kVA` : `${selectedSize} kVA`;

      // 2. CHANGE COLORS (No Gray!): Very light, elegant Blue #EFF6FF with dark text
      const summaryFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: 'FFEFF6FF' }, // Light elegant Blue #EFF6FF
      };

      const summaryStartRow = currentRowIndex;

      const formatSummaryRow = (rowNum: number, label: string, value: any, numFmt?: string) => {
        worksheet.mergeCells(`A${rowNum}:I${rowNum}`);
        const r = worksheet.getRow(rowNum);
        r.height = 25;
        for (let c = 1; c <= 10; c++) {
          const cell = r.getCell(c);
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF1E293B' } };
          cell.fill = summaryFill;
          cell.border = thinBorder;
          cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
        }
        r.getCell(1).value = label;
        const valCell = r.getCell(10);
        valCell.value = value;
        valCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
        if (numFmt) valCell.numFmt = numFmt;
      };

      const demandCellRanges: string[] = [];
      if (mainBuildingRowIndices.length > 0) {
        demandCellRanges.push(...mainBuildingRowIndices.map((r) => `J${r}`));
      }
      if (pumpItems.length > 0 && pumpEndRow >= pumpStartRow) {
        demandCellRanges.push(`J${pumpStartRow}:J${pumpEndRow}`);
      }
      if (extraItems.length > 0 && extraEndRow >= extraStartRow) {
        demandCellRanges.push(`J${extraStartRow}:J${extraEndRow}`);
      }
      const totalDemandFormula = demandCellRanges.length > 0 ? `SUM(${demandCellRanges.join(',')})` : '0';

      const totalDemandRow = currentRowIndex;
      // Summary Row 1: TOTAL DEMAND LOAD (Before Diversity)
      formatSummaryRow(currentRowIndex++, 'TOTAL DEMAND LOAD (Before Diversity)', {
        formula: totalDemandFormula,
        result: totalDemandBeforeDiversity,
      }, '#,##0.00');

      const diversityFactorRow = currentRowIndex;
      // Summary Row 2: DIVERSITY FACTOR
      formatSummaryRow(currentRowIndex++, 'DIVERSITY FACTOR', diversityFactorVal, '0.00');

      const totalAfterDiversityRow = currentRowIndex;
      // Summary Row 3: TOTAL LOAD AFTER DIVERSITY (KVA)
      formatSummaryRow(currentRowIndex++, 'TOTAL LOAD AFTER DIVERSITY (KVA)', {
        formula: `J${totalDemandRow}*J${diversityFactorRow}`,
        result: totalLoadAfterDiversity,
      }, '#,##0.00');

      const spareCapacityRow = currentRowIndex;
      // Summary Row 4: SPARE CAPACITY (Dynamic from state)
      formatSummaryRow(currentRowIndex++, `SPARE CAPACITY (${numericSparePercent}%)`, spareCapacityVal);

      const totalWithSpareRow = currentRowIndex;
      // Summary Row 5: TOTAL LOAD WITH SPARE (KVA)
      formatSummaryRow(currentRowIndex++, 'TOTAL LOAD WITH SPARE (KVA)', {
        formula: `J${totalAfterDiversityRow}*${spareMultiplier.toFixed(2)}`,
        result: totalLoadWithSpare,
      }, '#,##0.00');

      const loadingRatioRow = currentRowIndex;
      // Summary Row 6: TRANSFORMER LOADING RATIO (Dynamic from state)
      formatSummaryRow(currentRowIndex++, 'TRANSFORMER LOADING RATIO', loadingRatioText);

      const requiredTransformerRow = currentRowIndex;
      // Summary Row 7: REQUIRED TRANSFORMER (KVA)
      formatSummaryRow(currentRowIndex++, 'REQUIRED TRANSFORMER (KVA)', {
        formula: `J${totalWithSpareRow}/${loadingRatioDecimal.toFixed(2)}`,
        result: requiredTransformerKva,
      }, '#,##0.00');

      // Standard transformer sizes list per IEC 60076 / ABB / Schneider
      const standardTransformerSizes = [
        100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000,
      ];

      const selectedTransformerRow = currentRowIndex;
      // Summary Row 8: SELECTED TRANSFORMER (KVA)
      // Formatted string: "{quantity} x {size} kVA" or "{size} kVA"
      formatSummaryRow(currentRowIndex++, 'SELECTED TRANSFORMER (KVA)', selectedTransText);

      const summaryEndRow = currentRowIndex - 1;

      // Summary Row 9 (Reference)
      const refRow = currentRowIndex++;
      worksheet.mergeCells(`A${refRow}:J${refRow}`);
      const refRowObj = worksheet.getRow(refRow);
      refRowObj.height = 24;
      for (let c = 1; c <= 10; c++) {
        const cell = refRowObj.getCell(c);
        cell.font = { name: 'Calibri', size: 9, italic: true, bold: true, color: { argb: 'FF1E3A8A' } };
        cell.fill = summaryFill;
        cell.border = thinBorder;
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      }
      refRowObj.getCell(1).value = 'Reference: Standard IEC 60076 / ABB / Schneider Distribution Transformers';

      // 3. ADD STANDARD TRANSFORMER SIZES TABLE (Leave 2 empty rows below summary)
      currentRowIndex += 2;

      // Table Title Row
      const transTitleRowNum = currentRowIndex;
      worksheet.mergeCells(`A${currentRowIndex}:B${currentRowIndex}`);
      const transTitleRow = worksheet.getRow(currentRowIndex);
      transTitleRow.height = 26;
      const transTitleCell = transTitleRow.getCell(1);
      transTitleCell.value = 'Standard Transformer Sizes (ABB / Schneider)';
      transTitleCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF1E3A8A' } };
      transTitleCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      currentRowIndex++;

      // Table Header Row
      const transHeaderRow = worksheet.getRow(currentRowIndex);
      transHeaderRow.height = 26;

      const th1 = transHeaderRow.getCell(1);
      th1.value = 'Standard Size (kVA)';
      th1.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF000000' } };
      th1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } }; // Light Blue #D9E1F2
      th1.border = thinBorder;
      th1.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

      const th2 = transHeaderRow.getCell(2);
      th2.value = 'Selection';
      th2.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF000000' } };
      th2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } }; // Light Blue #D9E1F2
      th2.border = thinBorder;
      th2.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

      currentRowIndex++;

      standardTransformerSizes.forEach((size) => {
        const isMatch = size === selectedSize;
        const sizeRow = worksheet.getRow(currentRowIndex);
        sizeRow.height = 24;

        const c1 = sizeRow.getCell(1);
        c1.value = size;
        c1.numFmt = '#,##0" kVA"';
        c1.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
        c1.border = thinBorder;

        const c2 = sizeRow.getCell(2);
        // Smart Selection: check if size matches user selectedSize
        c2.value = {
          formula: `IF(A${currentRowIndex}=${selectedSize},"SELECTED (المحول المختار)","—")`,
          result: isMatch ? 'SELECTED (المحول المختار)' : '—',
        };
        c2.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        c2.border = thinBorder;

        if (isMatch) {
          const matchFill = {
            type: 'pattern' as const,
            pattern: 'solid' as const,
            fgColor: { argb: 'FFC6EFCE' }, // Green background #C6EFCE
          };
          c1.fill = matchFill;
          c2.fill = matchFill;
          c1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF006100' } };
          c2.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF006100' } };
        } else {
          const whiteFill = {
            type: 'pattern' as const,
            pattern: 'solid' as const,
            fgColor: { argb: 'FFFFFFFF' }, // White background
          };
          c1.fill = whiteFill;
          c2.fill = whiteFill;
          c1.font = { name: 'Calibri', size: 10, bold: false, color: { argb: 'FF000000' } };
          c2.font = { name: 'Calibri', size: 10, bold: false, color: { argb: 'FF333333' } };
        }

        currentRowIndex++;
      });

      // 3. AUTO-FIT COLUMN WIDTHS (Crucial)
      // Calculate max length of text for each column A through K (colIdx 1..N)
      // Set column.width = Math.max(maxLength + 3, 12)
      worksheet.columns.forEach((column: any, colIdx: number) => {
        let maxLength = 0;
        const colNumber = colIdx + 1; // 1-based (1 = A, 2 = B, ..., 10 = J)

        column.eachCell({ includeEmpty: false }, (cell: any) => {
          // Do not let merged header rows 1-3 blow up column widths
          if (cell.row <= 3) return;

          // Do not let summary labels merged across columns A to I inflate single column width
          if (cell.row >= summaryStartRow && cell.row <= summaryEndRow && colNumber < 10) return;

          // Do not let full-width reference row or table title row blow up column widths
          if (cell.row === refRow || cell.row === transTitleRowNum) return;

          if (cell.value !== null && cell.value !== undefined) {
            let strVal = '';
            if (typeof cell.value === 'object') {
              if (cell.value.result !== undefined && cell.value.result !== null) {
                if (typeof cell.value.result === 'number') {
                  strVal = cell.value.result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                } else {
                  strVal = String(cell.value.result);
                }
              } else {
                strVal = cell.value.text || (cell.value.formula ? String(cell.value.formula) : '');
              }
            } else if (typeof cell.value === 'number') {
              strVal = cell.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
              strVal = cell.value.toString();
            }

            // In case of multi-line strings, measure the longest line
            const lines = strVal.split('\n');
            lines.forEach((l) => {
              const trimmedLen = l.trim().length;
              if (trimmedLen > maxLength) {
                maxLength = trimmedLen;
              }
            });
          }
        });

        // Set column.width = Math.max(maxLength + 3, 12)
        column.width = Math.max(maxLength + 3, 12);
      });

      // Force recalculation of all formulas when the spreadsheet is opened in Excel
      if (!workbook.calcProperties) {
        workbook.calcProperties = {};
      }
      workbook.calcProperties.fullCalcOnLoad = true;

      // Download file as "Load_Estimation_Report.xlsx"
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Load_Estimation_Report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Excel report with ExcelJS:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#F4F6F8] dark:bg-gray-900 pb-16 font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. TOP HEADER */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-200/90 dark:border-gray-700 shadow-2xs sticky top-[57px] z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onBackToOverview}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 active:bg-slate-200 text-slate-800 dark:text-gray-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180 text-slate-600 dark:text-gray-400" />
              <span>{isAr ? 'العودة لنظرة عامة' : 'Return to Overview'}</span>
            </button>
            <div className="h-6 w-px bg-slate-300 dark:bg-gray-700" />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
                <span className="text-[11px] font-extrabold text-[#1E3A8A] dark:text-blue-400 uppercase tracking-wider block">
                  {isAr ? 'المرحلة 2: محرك الحساب والتحجيم' : 'STEP 2: CALCULATION & SIZING'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {isAr ? 'حساب تقدير الأحمال' : 'Load Estimation Calculation'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#F8FAFC] dark:bg-gray-700/80 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-gray-600 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 dark:text-gray-300">
                {isAr ? 'الكود المختار للحساب:' : 'Active Calculation Standard:'}
              </span>
              <FlagIcon country={selectedStandardId} className="w-5 h-3.5 rounded-2xs" />
              <span className="text-xs font-extrabold text-[#1E3A8A] dark:text-blue-300">
                {selectedStandardId === 'egypt' &&
                  (egyptSubStandard === 'ecp203' ? 'Egyptian (ECP 203)' : 'Egyptian (ACUD Guidelines)')}
                {selectedStandardId === 'saudi' && 'Saudi Code (SEC / SBC 401)'}
                {selectedStandardId === 'europe' && 'European (IEC 60364)'}
                {selectedStandardId === 'usa' && 'American (NEC / NFPA 70)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER: Single Vertical Scrollable Column */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 1st: "Project Details" Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-2xs space-y-4 dark:text-gray-200 transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#1E3A8A] dark:text-blue-300">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {isAr ? 'بيانات المشروع' : 'Project Details'}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {/* Row 1: PROJECT NAME (Full width) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2">
                    {isAr ? 'اسم المشروع (Project Name)' : 'Project Name'}
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#F8FAFC] dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden shadow-2xs"
                    placeholder="e.g. Capital Commercial Complex Phase 1"
                  />
                </div>

                {/* Row 2: BUILDING OCCUPANCY CATEGORY (Full width) */}
                {/* Row 2: BUILDING OCCUPANCY CATEGORY (Full width) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2">
                    {isAr ? 'فئة إشغال المبنى (Building Occupancy Category)' : 'Building Occupancy Category'}
                  </label>
                  <select
                    value={
                      selectedStandardId === 'saudi'
                        ? (getSaudiCategoryByCodeOrName(buildingType)?.code || 'C7')
                        : buildingType
                    }
                    onChange={(e) => {
                      if (selectedStandardId === 'saudi') {
                        const saudiCat = SAUDI_SEC_CATEGORIES.find((c) => c.code === e.target.value);
                        if (saudiCat) {
                          setSaudiSelectedCategory(saudiCat);
                          setSaudiLoadDensityVA(saudiCat.vaPerM2);
                          setSaudiDemandFactor(saudiCat.df);
                          const newTypeStr = `${saudiCat.name} (${saudiCat.code})`;
                          setBuildingType(newTypeStr as any);
                          setBuildingsList((prev) =>
                            prev.map((b, idx) => {
                              if (idx === 0 || !b.isTypeCustomized) {
                                return {
                                  ...b,
                                  buildingType: newTypeStr as any,
                                  floors: b.floors.map((fl) => ({
                                    ...fl,
                                    demandFactor: saudiCat.df,
                                  })),
                                };
                              }
                              return b;
                            })
                          );
                        }
                      } else {
                        setBuildingType(e.target.value as OccupancyCategory);
                      }
                    }}
                    className="w-full bg-[#F8FAFC] dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                  >
                    {selectedStandardId === 'saudi'
                      ? SAUDI_SEC_CATEGORIES.map((cat) => (
                          <option key={cat.code} value={cat.code} className="dark:bg-gray-900 dark:text-white">
                            {cat.label}
                          </option>
                        ))
                      : OCCUPANCY_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="dark:bg-gray-900 dark:text-white">
                            {cat.nameEn}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Row 3: NUMBER OF BUILDINGS / AREAS (Min: 1) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'عدد المباني / المساحات (Number of Buildings / Areas)' : 'Number of Buildings / Areas'}
                    </label>
                    <span className="text-2xs font-bold text-slate-500 dark:text-gray-400">
                      {isAr ? 'الحد الأدنى: 1' : 'Min: 1'}
                    </span>
                  </div>
                  <div className="relative" dir="ltr">
                    <input
                      type="text"
                      inputMode="numeric"
                      dir="ltr"
                      lang="en"
                      style={{ direction: 'ltr' }}
                      value={toEnglishDigits(numberOfAreas)}
                      onChange={(e) => handleNumberOfAreasChange(e.target.value)}
                      onBlur={() => {
                        if (numberOfAreas === '' || Number(numberOfAreas) < 1) {
                          handleNumberOfAreasChange('1');
                        }
                      }}
                      onKeyDown={handleArabicDigitsKeyDown}
                      onPaste={handleNumericPaste}
                      className="w-full bg-[#F8FAFC] dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-mono font-bold rounded-xl p-3 pr-28 rtl:pr-3 rtl:pl-28 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden shadow-2xs"
                      placeholder="1"
                    />
                    <div className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 dark:text-gray-400 select-none">
                        {isAr ? 'مساحة / مبنى' : 'Area(s)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 4: DYNAMIC AREA INPUTS (Area 1, Area 2, ...) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'مساحات المباني / المناطق (M²)' : 'Building / Area Sizes (m²)'}
                    </span>
                    <span className="text-2xs font-semibold text-slate-500 dark:text-gray-400">
                      {isAr ? `إجمالي المساحة: ${formatEnglishInt(totalBuildingsArea)} م²` : `Total Area: ${formatEnglishInt(totalBuildingsArea)} m²`}
                    </span>
                  </div>

                  <div className={`grid gap-3 ${
                    buildingAreas.length === 1
                      ? 'grid-cols-1'
                      : buildingAreas.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : buildingAreas.length === 3
                      ? 'grid-cols-1 md:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  }`}>
                    {buildingAreas.map((areaVal, idx) => (
                      <div key={idx} className="bg-[#F8FAFC] dark:bg-gray-900/60 p-3 rounded-xl border border-slate-200 dark:border-gray-700 space-y-1.5">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                          {isAr ? `المساحة ${idx + 1} (م²)` : `Area ${idx + 1} (m²)`}
                        </label>
                        <div className="relative" dir="ltr">
                          <input
                            type="text"
                            inputMode="decimal"
                            dir="ltr"
                            lang="en"
                            style={{ direction: 'ltr' }}
                            value={toEnglishDigits(areaVal !== undefined ? areaVal : '')}
                            onChange={(e) => handleAreaInputChange(idx, e.target.value)}
                            onBlur={() => handleAreaInputBlur(idx)}
                            onKeyDown={handleArabicDigitsKeyDown}
                            onPaste={handleNumericPaste}
                            className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-mono font-bold rounded-lg p-2.5 pr-12 rtl:pr-2.5 rtl:pl-12 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden shadow-2xs"
                            placeholder="3500"
                          />
                          <span className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 text-xs font-bold text-slate-400 dark:text-gray-400 font-mono select-none">
                            m²
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: "Select Standard for Calculation" */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-2xs space-y-5 dark:text-gray-200 transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 flex items-center justify-center text-[#1E3A8A] dark:text-blue-300 shrink-0">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {isAr ? 'اختيار الكود المرجعي للحساب' : 'Select Standard for Calculation'}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-gray-300 font-semibold mt-0.5">
                      {isAr ? 'اختر الكود المطبق لاعتماد الكثافات ومعاملات الطلب' : 'Choose standard methodology to drive density and demand calculations'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 5 Horizontal Cards in a 5-Column Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5 items-stretch">
                {STANDARDS_DATA.map((std) => {
                  const isActive = selectedStandardId === std.id;
                  const isEgypt = std.id === 'egypt';
                  return (
                    <div
                      key={std.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedStandardId(std.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedStandardId(std.id);
                        }
                      }}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'border-2 border-[#1E3A8A] dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 shadow-xs ring-1 ring-blue-700/40'
                          : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 bg-[#F8FAFC] dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <FlagIcon country={std.id} className="w-6 h-4 rounded-xs border border-slate-300 dark:border-gray-600 shadow-2xs shrink-0" />
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400 shrink-0" />}
                        </div>
                        <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                          {isAr ? std.codeNameAr : std.codeName}
                        </div>
                        {isEgypt && (
                          <div className="mt-1">
                            <span className="inline-block text-[10px] font-mono font-bold text-[#1E3A8A] dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/60 px-1.5 py-0.5 rounded">
                              {egyptSubStandard === 'ecp203' ? 'ECP 203' : 'ACUD'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-gray-700">
                        <div className="text-[11px] sm:text-xs text-slate-600 dark:text-gray-300 font-bold truncate">
                          {isAr ? std.countryAr : std.country}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* 5th Card: Show All Results */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsCompareModalOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsCompareModalOpen(true);
                    }
                  }}
                  className="p-3 sm:p-3.5 rounded-xl border-2 border-blue-300/90 dark:border-blue-700/60 hover:border-[#1E3A8A] dark:hover:border-blue-400 bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/80 dark:from-blue-950/40 dark:via-gray-800 dark:to-gray-800 hover:from-blue-100/90 hover:to-sky-100/80 dark:hover:from-blue-900/40 dark:hover:to-gray-700 text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-4 rounded-xs bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[11px] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                        📊
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/60 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                        {isAr ? 'مقارنة' : 'Compare'}
                      </span>
                    </div>
                    <div className="font-black text-xs sm:text-sm text-[#1E3A8A] dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-200 leading-tight">
                      {isAr ? 'عرض كافة النتائج' : 'Show All Results'}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-blue-200/60 dark:border-gray-700">
                    <div className="text-[11px] sm:text-xs text-blue-800/80 dark:text-blue-300/80 font-bold flex items-center justify-between truncate">
                      <span>{isAr ? 'جميع الأكواد' : 'All Codes'}</span>
                      <span className="text-xs group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🇪🇬 EGYPTIAN CODE METHODOLOGY SELECTOR */}
            {selectedStandardId === 'egypt' && (
              <div className="bg-white dark:bg-gray-800 border-2 border-slate-200/90 dark:border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-200 dark:text-gray-200">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                      🇪🇬
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>🇪🇬 Egyptian Code Methodology (طريقة الحساب)</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                        Select the calculation path for the Egyptian Code.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                    {egyptSubStandard === 'ecp203' ? 'ECP 203' : 'ACUD'}
                  </span>
                </div>

                {/* Two large, clean selectable buttons (Toggle/Radio style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* Option 1: Standard Egyptian Code (ECP 203) */}
                  <button
                    type="button"
                    onClick={() => setEgyptSubStandard('ecp203')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-3.5 text-left rtl:text-right ${
                      egyptSubStandard === 'ecp203'
                        ? 'border-blue-600 bg-blue-50/90 text-[#1E3A8A] shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        egyptSubStandard === 'ecp203' ? 'border-blue-600 bg-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {egyptSubStandard === 'ecp203' && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-sm sm:text-base tracking-tight leading-snug">
                        Standard Egyptian Code (ECP 203)
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        الكود المصري العام للتركيبات والتوزيع
                      </div>
                    </div>
                    {egyptSubStandard === 'ecp203' && (
                      <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-600 text-white shrink-0">
                        Active
                      </span>
                    )}
                  </button>

                  {/* Option 2: New Administrative Capital (ACUD) */}
                  <button
                    type="button"
                    onClick={() => setEgyptSubStandard('acud')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-3.5 text-left rtl:text-right ${
                      egyptSubStandard === 'acud'
                        ? 'border-blue-600 bg-blue-50/90 text-[#1E3A8A] shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        egyptSubStandard === 'acud' ? 'border-blue-600 bg-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {egyptSubStandard === 'acud' && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-sm sm:text-base tracking-tight leading-snug">
                        New Administrative Capital (ACUD)
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        دليل وضوابط العاصمة الإدارية الجديدة
                      </div>
                    </div>
                    {egyptSubStandard === 'acud' && (
                      <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-600 text-white shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* EGYPTIAN CODE SPECIFICATION (Cascading Selection - Horizontal Flow) */}
            {selectedStandardId === 'egypt' && egyptSubStandard === 'ecp203' && (
              <div className="bg-slate-50 dark:bg-gray-800 border border-slate-200/90 dark:border-gray-700 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-gray-700 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🇪🇬</span>
                    <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      {isAr ? '🇪🇬 مواصفة الكود المصري (EGYPTIAN CODE SPECIFICATION)' : '🇪🇬 EGYPTIAN CODE SPECIFICATION'}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                    ECP 203 Load Tables
                  </span>
                </div>

                {/* HORIZONTAL FLOW: Step 1 -> Step 2 -> Step 3 */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-3.5 sm:gap-4">
                  {/* Step 1: Location Type */}
                  <div className="flex-1 min-w-0 flex flex-col space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-gray-300 uppercase tracking-wide truncate">
                        {isAr ? 'الخطوة 1: نوع المنطقة' : 'Step 1: Location Type'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 flex-1">
                      <button
                        type="button"
                        onClick={() => setEgyptLocationType('cities')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptLocationType === 'cities'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptLocationType === 'cities' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptLocationType === 'cities' && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span className="truncate">Cities (مدن)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEgyptLocationType('villages')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptLocationType === 'villages'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptLocationType === 'villages' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptLocationType === 'villages' && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span className="truncate">Villages (قرى)</span>
                      </button>
                    </div>
                  </div>

                  {/* Flow Arrow 1 */}
                  <div className="hidden lg:flex items-center justify-center self-center text-slate-400 dark:text-gray-500 text-xl font-bold select-none px-0.5 rtl:rotate-180" aria-hidden="true">
                    →
                  </div>

                  {/* Step 2: Building Category */}
                  <div className="flex-1 min-w-0 flex flex-col space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-gray-300 uppercase tracking-wide truncate">
                        {isAr ? 'الخطوة 2: نوع المنشأة' : 'Step 2: Building Category'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 flex-1">
                      <button
                        type="button"
                        onClick={() => setEgyptBuildingCategory('residential')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptBuildingCategory === 'residential'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptBuildingCategory === 'residential' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptBuildingCategory === 'residential' && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span className="truncate">Residential (سكنى)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEgyptBuildingCategory('commercial_admin')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptBuildingCategory === 'commercial_admin'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptBuildingCategory === 'commercial_admin' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptBuildingCategory === 'commercial_admin' && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span className="truncate">Commercial / Admin (تجارى/إدارى)</span>
                      </button>
                    </div>
                  </div>

                  {/* Flow Arrow 2 */}
                  <div className={`hidden lg:flex items-center justify-center self-center text-xl font-bold select-none px-0.5 rtl:rotate-180 transition-opacity ${
                    egyptLocationType === 'villages' ? 'text-slate-300 dark:text-gray-700 opacity-40' : 'text-slate-400 dark:text-gray-500'
                  }`} aria-hidden="true">
                    →
                  </div>

                  {/* Step 3: City District Type */}
                  <div className={`flex-1 min-w-0 flex flex-col space-y-2.5 transition-all ${
                    egyptLocationType === 'villages' ? 'opacity-40 pointer-events-none select-none' : ''
                  }`}>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          egyptLocationType === 'villages' ? 'bg-slate-300 dark:bg-gray-700 text-slate-600 dark:text-gray-400' : 'bg-[#1E3A8A] text-white'
                        }`}>3</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-gray-300 uppercase tracking-wide truncate">
                          {isAr ? 'الخطوة 3: تصنيف المدينة' : 'Step 3: District Type'}
                        </span>
                      </div>
                      {egyptLocationType === 'villages' && (
                        <span className="text-[10px] bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-gray-300 font-semibold px-2 py-0.5 rounded-md">
                          {isAr ? 'غير منطبق للقرى' : 'N/A for Villages'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5 flex-1">
                      <button
                        type="button"
                        disabled={egyptLocationType === 'villages'}
                        onClick={() => setEgyptCityDistrictType('low_middle')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptCityDistrictType === 'low_middle' && egyptLocationType !== 'villages'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptCityDistrictType === 'low_middle' && egyptLocationType !== 'villages' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptCityDistrictType === 'low_middle' && egyptLocationType !== 'villages' && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="truncate">Low & Middle (شعبية ومتوسطة)</span>
                      </button>

                      <button
                        type="button"
                        disabled={egyptLocationType === 'villages'}
                        onClick={() => setEgyptCityDistrictType('upscale')}
                        className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                          egyptCityDistrictType === 'upscale' && egyptLocationType !== 'villages'
                            ? 'bg-[#1E3A8A] text-white border-blue-900 shadow-[0_3px_8px_rgba(30,58,138,0.25)] ring-2 ring-blue-500/20'
                            : 'bg-[#F3F4F6] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-[#374151] border-[#D1D5DB] hover:bg-[#E5E7EB] hover:border-[#9CA3AF] hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          egyptCityDistrictType === 'upscale' && egyptLocationType !== 'villages' ? 'border-white' : 'border-[#9CA3AF] dark:border-gray-500'
                        }`}>
                          {egyptCityDistrictType === 'upscale' && egyptLocationType !== 'villages' && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="truncate">Upscale & Affluent (راقية)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC RESULT DISPLAY: Highlighted box (Wider & More Prominent) */}
                <div className="w-full bg-gradient-to-r from-blue-50/95 via-sky-50/80 to-blue-50/95 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-200/90 dark:border-blue-900/60 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-md ring-4 ring-blue-100 dark:ring-blue-900/40">
                      ⚡
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 dark:text-blue-300 block">
                        {isAr ? 'كثافة الحمل المقررة (الكود المصري)' : 'DYNAMIC APPLIED LOAD DENSITY'}
                      </span>
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 flex flex-wrap items-center gap-3">
                        <span className="text-slate-800 dark:text-gray-200 font-extrabold text-base sm:text-lg">Applied Load Density:</span>
                        <span className="inline-flex items-center gap-2 bg-yellow-300 text-gray-900 px-4 py-1.5 rounded-xl border-2 border-yellow-500 shadow-md font-mono font-black text-2xl sm:text-3xl tracking-tight ring-4 ring-yellow-100 dark:ring-yellow-900/30">
                          <span className="text-gray-900">{getEgyptianAppliedLoadDensity()}</span>
                          <span className="text-sm sm:text-base font-extrabold text-gray-900">kVA / 100 m²</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/95 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl px-3.5 py-2 shrink-0 shadow-2xs text-xs">
                    <span className="text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      {isAr ? 'المسار المحدد:' : 'Selection Path:'}
                    </span>
                    <span className="font-bold text-[#1E3A8A] dark:text-blue-300">
                      {egyptLocationType === 'villages'
                        ? 'Villages (قرى)'
                        : `Cities (${egyptCityDistrictType === 'upscale' ? 'Upscale' : 'Low/Middle'})`}
                      {' → '}
                      {egyptBuildingCategory === 'residential' ? 'Residential (سكنى)' : 'Commercial/Admin (تجارى/إدارى)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 🏛️ ACUD SPECIFICATION CARD (اشتراطات العاصمة الإدارية) */}
            {selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-blue-200/90 dark:border-gray-700 shadow-2xs space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
                      🏛️
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2">
                        <span>🇪🇬 ACUD Guidelines (اشتراطات العاصمة الإدارية)</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-semibold mt-0.5">
                        {isAr
                          ? 'اشتراطات وضوابط تقدير الأحمال الكهربائية المعتمدة لشركة العاصمة الإدارية للتنمية العمرانية (ACUD)'
                          : 'New Administrative Capital Electrical Load Estimation Specification & Guidelines'}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ACUD Methodology Active</span>
                  </div>
                </div>

                {/* Main Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Field 1: Project Activity (Dropdown with 16 options) */}
                  <div className="lg:col-span-2 space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'نشاط المشروع (Project Activity):' : 'Project Activity (نشاط المشروع):'}
                    </label>
                    <div className="relative">
                      <select
                        value={acudActivityId}
                        onChange={(e) => setAcudActivityId(e.target.value)}
                        className="w-full bg-[#F8FAFC] dark:bg-gray-900 hover:bg-white focus:bg-white dark:focus:bg-gray-900 border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-500/20 rounded-xl py-3 px-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white transition-colors shadow-2xs appearance-none cursor-pointer"
                      >
                        {ACUD_ACTIVITIES.map((act) => (
                          <option key={act.id} value={act.id} className="dark:bg-gray-900 dark:text-white">
                            {act.name} - Density: {act.density}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3.5 text-slate-500 dark:text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Field 2: Gross Built-Up Area (m²) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'المساحة البنائية (Gross Built-Up Area):' : 'Gross Built-Up Area (m²):'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        dir="ltr"
                        lang="en"
                        value={areaSquareMeters}
                        onChange={(e) => setAreaSquareMeters(Math.max(1, parseEnglishNumber(e.target.value, 1)))}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="w-full bg-[#F8FAFC] dark:bg-gray-900 hover:bg-white focus:bg-white dark:focus:bg-gray-900 border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-500/20 rounded-xl py-3 px-3.5 pr-12 rtl:pr-3.5 rtl:pl-12 text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white transition-colors shadow-2xs"
                        placeholder="3500"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3.5 rtl:right-auto rtl:left-3.5 flex items-center text-xs font-mono font-bold text-slate-400 dark:text-gray-400">
                        m²
                      </span>
                    </div>
                  </div>

                  {/* Field 3: Applied Load Density (Read-only) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'كثافة الحمل المقررة (Applied Density):' : 'Applied Load Density (kVA/100m²):'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        dir="ltr"
                        lang="en"
                        readOnly
                        value={`${getAcudAppliedDensity()} kVA / 100 m²`}
                        className="w-full bg-yellow-100/90 dark:bg-yellow-300 border-2 border-yellow-400 dark:border-yellow-500 text-gray-900 font-mono font-black text-xs sm:text-sm rounded-xl py-3 px-3.5 select-all shadow-2xs cursor-default text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-Grid: Demand Factor (0.8 Fixed) & Special EV Section if Fuel Station */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  {/* Field 4: Demand Factor (D.F.) (Read-only automatically set to 0.8) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'معامل الطلب (Demand Factor - D.F.):' : 'Demand Factor (D.F.):'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        dir="ltr"
                        lang="en"
                        readOnly
                        value="0.80"
                        className="w-full bg-slate-100 dark:bg-gray-900 border-2 border-slate-300 dark:border-gray-600 text-slate-800 dark:text-white font-mono font-black text-xs sm:text-sm rounded-xl py-3 px-3.5 cursor-default text-center shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* SPECIAL LOGIC: Fuel Stations EV Chargers */}
                  {getAcudActivity().isFuelStation && (
                    <div className="lg:col-span-3 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">⚡</span>
                          <span className="text-xs font-black uppercase tracking-wide text-amber-950 dark:text-amber-200">
                            {isAr ? 'عدد شواحن السيارات الكهربائية (EV Fast Chargers):' : 'Number of EV Chargers (عدد شواحن السيارات الكهربائية):'}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                          {isAr
                            ? 'وفق كود العاصمة الإدارية لمحطات الوقود: يضاف 150 ك.ف.أ لكل شاحن فائق السرعة إلى الحمل التوصيلي'
                            : 'ACUD Fuel Stations: 150 kVA per EV charger is added directly to total connected load'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            dir="ltr"
                            lang="en"
                            value={acudEvChargers}
                            onChange={(e) => setAcudEvChargers(Math.max(0, parseInt(toEnglishDigits(e.target.value), 10) || 0))}
                            onKeyDown={handleArabicDigitsKeyDown}
                            onPaste={handleNumericPaste}
                            className="w-24 bg-white dark:bg-gray-900 border-2 border-amber-400 dark:border-amber-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 rounded-xl py-2 px-3 text-center font-mono font-black text-amber-950 dark:text-amber-200 text-sm shadow-2xs"
                            placeholder="2"
                          />
                        </div>
                        <span dir="ltr" className="text-xs font-bold font-mono text-amber-900 dark:text-amber-200 bg-amber-200/70 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 rounded-lg px-2.5 py-1.5">
                          = {formatEnglishInt((Number(acudEvChargers) || 0) * 150)} kVA
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* DYNAMIC RESULT DISPLAY: Highlighted box for ACUD */}
                {(() => {
                  const connLoad = calculateAcudConnectedKva(areaSquareMeters);
                  const demandLoad = connLoad * 0.8;
                  const act = getAcudActivity();

                  return (
                    <div className="w-full bg-gradient-to-r from-blue-50/95 via-sky-50/80 to-blue-50/95 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-200/90 dark:border-blue-900/60 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-md ring-4 ring-blue-100 dark:ring-blue-900/40">
                          🏛️
                        </div>
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 dark:text-blue-300 block">
                            {isAr ? 'نتائج حسابات العاصمة الإدارية (ACUD ELECTRICAL LOADS)' : 'ACUD ELECTRICAL LOAD ESTIMATION RESULTS'}
                          </span>
                          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 flex flex-wrap items-center gap-3">
                            <span className="text-slate-700 dark:text-gray-300 font-bold text-xs sm:text-sm">Connected Load:</span>
                            <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-200 px-3 py-1 rounded-xl border border-blue-300 dark:border-blue-700 font-mono font-black text-base sm:text-lg shadow-2xs">
                              <span dir="ltr">{formatEnglishNumber(connLoad, 1, 1)} kVA</span>
                            </span>

                            <span className="text-slate-400 dark:text-gray-500 font-bold">×</span>
                            <span className="text-slate-700 dark:text-gray-300 font-bold text-xs sm:text-sm">D.F. (0.8):</span>

                            <span className="text-slate-400 dark:text-gray-500 font-bold">=</span>
                            <span className="text-slate-800 dark:text-gray-200 font-bold text-xs sm:text-sm">Demand Load:</span>
                            <span className="inline-flex items-center gap-2 bg-yellow-300 text-gray-900 px-4 py-1.5 rounded-xl border-2 border-yellow-500 shadow-md font-mono font-black text-xl sm:text-2xl tracking-tight ring-4 ring-yellow-100 dark:ring-yellow-900/30">
                              <span dir="ltr" className="text-gray-900">{formatEnglishNumber(demandLoad, 1, 1)}</span>
                              <span className="text-xs sm:text-sm font-extrabold text-gray-900">kVA</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Formula Path Details */}
                      <div className="flex flex-col gap-1 bg-white/95 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 shrink-0 shadow-2xs text-xs font-mono">
                        <div className="flex items-center justify-between gap-3 text-slate-500 dark:text-gray-400 text-[11px]">
                          <span>Activity:</span>
                          <span className="font-bold text-blue-900 dark:text-blue-300 font-sans">{act.name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-slate-500 dark:text-gray-400 text-[11px]">
                          <span>Formula:</span>
                          <span dir="ltr" className="font-bold text-slate-700 dark:text-gray-300">
                            {act.isFuelStation
                              ? `(${formatEnglishInt(areaSquareMeters)} m² × 8 / 100) + (${formatEnglishInt(acudEvChargers)} × 150 kVA)`
                              : `(${formatEnglishInt(areaSquareMeters)} m² × ${act.density}) / 100`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ARABIC NOTES SECTION FOR EGYPTIAN CODE (ECP 203) */}
            {selectedStandardId === 'egypt' && egyptSubStandard === 'ecp203' && (
              <div
                dir="rtl"
                className="bg-amber-50/95 dark:bg-amber-950/30 border-2 border-amber-200/90 dark:border-amber-800/60 rounded-2xl p-5 sm:p-6 shadow-xs text-right space-y-3"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200/80 dark:border-amber-800/60">
                  <span className="text-xl">📌</span>
                  <h4 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-200 tracking-tight">
                    ملاحظات هامة للكود المصري ECP 203 (Important Notes):
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-amber-950/90 dark:text-amber-100/90 leading-relaxed list-none pr-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>يتم حساب مساحة البدروم بنفس معدل إستهلاك الطاقة الكهربائية للدوار؛ أما الجراج يتم حساب مساحته منفصلاً و القدرة التصميمية له 3 ك ف أ / 100 م² بشرط تعهد صاحب المنشأة بعدم تغيير نشاط الجراج.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>هذه الطريقة تعتمد على حساب المساحة الكلية للمبنى الـ Over all area ويستثنى منها مساحة المناور و الفرغات و التراسات الموجوده بالمبنى.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>بالنسبة للطرق الخارجية والمساحات الخضراء يتم تخصيص 0.5 فولت أمبير لكل 1 متر مربع.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* ARABIC NOTES SECTION FOR ACUD */}
            {selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && (
              <div
                dir="rtl"
                className="bg-sky-50/95 dark:bg-blue-950/30 border-2 border-blue-200/90 dark:border-blue-800/60 rounded-2xl p-5 sm:p-6 shadow-xs text-right space-y-3"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-blue-200/80 dark:border-blue-800/60">
                  <span className="text-xl">📌</span>
                  <h4 className="text-base sm:text-lg font-black text-blue-950 dark:text-blue-200 tracking-tight">
                    ملاحظات واشتراطات العاصمة الإدارية الجديدة (ACUD Notes):
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-blue-950/90 dark:text-blue-100/90 leading-relaxed list-none pr-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>تطبق كثافات الأحمال المقررة وفقاً للاشتراطات الفنية المعتمدة لشركة العاصمة الإدارية للتنمية العمرانية (ACUD) بدقة لكل نشاط.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>لمحطات الوقود (Fuel Stations): يتم احتساب كثافة 8 ك.ف.أ / 100 م² للمباني والخدمات مضافاً إليها 150 ك.ف.أ لكل شاحن كهربائي فائق السرعة (EV Charger) يضاف مباشرة للحمل التوصيلي.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>معامل الطلب (Demand Factor) القياسي المعتمد لمباني العاصمة الإدارية هو 0.80.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base select-none shrink-0">•</span>
                    <span>أدوار البدرومات والجراجات تخضع لكثافة 3 ك.ف.أ / 100 م² حتى في حال اختلاف النشاط الرئيسي للأدوار المتكررة.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* SECTION: BUILDINGS DETAILS (تفاصيل المباني) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-2xs space-y-6">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#1E3A8A] dark:text-blue-300 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2">
                      <span>🏢</span>
                      <span>{isAr ? 'تفاصيل المباني (Buildings Details)' : 'Buildings Details (تفاصيل المباني)'}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-semibold mt-0.5">
                      {isAr
                        ? 'تحديد تصنيف كل مبنى وعدد الأدوار ومساحة كل دور لحساب الأحمال الكلية'
                        : 'Configure building occupancy category, floors count, and floor area breakdown'}
                    </p>
                  </div>
                </div>

                {/* Total Buildings Area Badge */}
                <div className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-2 self-start sm:self-auto flex items-center gap-2.5 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wide">
                    {isAr ? 'إجمالي مساحات المباني:' : 'Total Buildings Area:'}
                  </span>
                  <span dir="ltr" className="text-base sm:text-lg font-mono font-black text-[#1E3A8A] dark:text-blue-300">
                    {formatEnglishInt(totalBuildingsArea)} m²
                  </span>
                </div>
              </div>

              {/* Stacked Building Forms */}
              <div className="space-y-6">
                {buildingsList.map((bld, bIndex) => (
                  <div
                    key={bld.id}
                    className="bg-[#F8FAFC] dark:bg-gray-900/60 border-2 border-slate-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-slate-300 dark:hover:border-gray-600 transition-colors shadow-2xs"
                  >
                    {/* Building Item Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-gray-700 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#1E3A8A] text-white font-mono font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                          {bIndex + 1}
                        </span>
                        <input
                          type="text"
                          value={bld.name}
                          onChange={(e) => handleUpdateBuildingName(bld.id, e.target.value)}
                          className="font-black text-base text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-gray-600 focus:border-[#1E3A8A] focus:outline-hidden px-1.5 py-0.5 rounded transition-all"
                          placeholder={`Building ${bIndex + 1}`}
                        />
                      </div>

                      {/* Prominent Building Total Area & Actions (Top Right) */}
                      <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
                        <div className="bg-[#1E3A8A] text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs border border-blue-900">
                          <span className="text-2xs font-extrabold uppercase tracking-wide opacity-85">
                            {isAr ? 'إجمالي المبنى:' : 'Building Total:'}
                          </span>
                          <span dir="ltr" className="text-sm sm:text-base font-black font-mono">
                            {formatEnglishInt(bld.totalArea)} m²
                          </span>
                        </div>
                        <span dir="ltr" className="bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-200 px-2.5 py-1.5 rounded-xl text-xs font-black font-mono border border-blue-200 dark:border-blue-700">
                          {formatEnglishInt(bld.floorsCount)} {bld.floorsCount === 1 ? (isAr ? 'دور' : 'Floor') : (isAr ? 'أدوار' : 'Floors')}
                        </span>
                        {buildingsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBuilding(bld.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 p-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-200"
                            title={isAr ? 'حذف هذا المبنى' : 'Delete this building'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Building Inputs: Building Type & Total Number of Floors & Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Dropdown: Building Type */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                            {isAr ? 'نوع المبنى (فئة الإشغال)' : 'Building Type (Occupancy Category)'}
                          </label>
                          {bIndex === 0 && !bld.isTypeCustomized && (
                            <span className="text-2xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                              {isAr ? '🔄 متزامن' : '🔄 Synced'}
                            </span>
                          )}
                        </div>
                        <select
                          value={
                            selectedStandardId === 'saudi'
                              ? (getSaudiCategoryByCodeOrName(bld.buildingType)?.code || 'C7')
                              : bld.buildingType
                          }
                          onChange={(e) => {
                            if (selectedStandardId === 'saudi') {
                              const saudiCat = SAUDI_SEC_CATEGORIES.find((c) => c.code === e.target.value);
                              if (saudiCat) {
                                const newTypeStr = `${saudiCat.name} (${saudiCat.code})`;
                                setBuildingsList((prev) =>
                                  prev.map((b) => {
                                    if (b.id !== bld.id) return b;
                                    return {
                                      ...b,
                                      buildingType: newTypeStr as any,
                                      isTypeCustomized: true,
                                      floors: b.floors.map((fl) => ({
                                        ...fl,
                                        demandFactor: saudiCat.df,
                                      })),
                                    };
                                  })
                                );
                                return;
                              }
                            }
                            handleUpdateBuildingType(bld.id, e.target.value as OccupancyCategory);
                          }}
                          className="w-full bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                        >
                          {selectedStandardId === 'saudi'
                            ? SAUDI_SEC_CATEGORIES.map((cat) => (
                                <option key={cat.code} value={cat.code} className="dark:bg-gray-900 dark:text-white">
                                  {cat.label}
                                </option>
                              ))
                            : OCCUPANCY_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id} className="dark:bg-gray-900 dark:text-white">
                                  {cat.nameEn} — ({cat.nameAr})
                                </option>
                              ))}
                        </select>
                      </div>

                      {/* Number of Floors (Auto-calculated from breakdown rows) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-1.5">
                          {isAr ? 'إجمالي عدد الأدوار' : 'Total Number of Floors'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            dir="ltr"
                            lang="en"
                            readOnly
                            value={`${bld.floorsCount} ${bld.floorsCount === 1 ? (isAr ? 'دور' : 'Floor') : (isAr ? 'أدوار' : 'Floors')}`}
                            className="w-full bg-slate-100/90 dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-mono font-black rounded-xl p-3 focus:outline-hidden cursor-default shadow-2xs"
                          />
                          <span className="absolute right-3 rtl:right-auto rtl:left-3 top-3 text-2xs font-bold text-slate-500 dark:text-gray-400 font-sans">
                            {isAr ? '(محسوب تلقائياً)' : '(auto-calc)'}
                          </span>
                        </div>
                      </div>

                      {/* Area (M²) (Read-only, Synced with Project Details) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                            {isAr ? `المساحة (Area ${bIndex + 1})` : `Area ${bIndex + 1} (m²)`}
                          </label>
                          <span className="text-2xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                            {isAr ? '🔄 متزامن' : '🔄 Synced'}
                          </span>
                        </div>
                        <div className="relative" dir="ltr">
                          <input
                            type="text"
                            dir="ltr"
                            lang="en"
                            style={{ direction: 'ltr' }}
                            readOnly
                            value={`${formatEnglishInt(bld.totalArea)} m²`}
                            className="w-full bg-slate-100/90 dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-mono font-black rounded-xl p-3 focus:outline-hidden cursor-default shadow-2xs"
                            title={isAr ? `مساحة متزامنة مع بيانات المشروع: المساحة ${bIndex + 1}` : `Area synced with Area ${bIndex + 1} in Project Details`}
                          />
                          <span className="absolute right-3 rtl:right-auto rtl:left-3 top-3 text-2xs font-bold text-slate-500 dark:text-gray-400 font-sans">
                            {isAr ? '(متزامن تلقائياً)' : `(Area ${bIndex + 1})`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* REDESIGNED: Floor Areas Breakdown (Excel Style Table) */}
                    <div className="pt-2 border-t border-slate-200/80 dark:border-gray-700 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div>
                          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-gray-200 flex items-center gap-1.5">
                            <span>📊</span>
                            <span>{isAr ? 'جدول مساحات وتفاصيل الأدوار' : 'Floor Areas Breakdown (Excel Style Table)'}</span>
                          </span>
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-gray-400 font-medium">
                            {isAr
                              ? 'حدد اسم الدور أو نوعه (أرضي، متكرر، بدروم) وعدد الأدوار ومساحة الدور الواحد'
                              : 'Specify floor name (Ground, Typical, Basement), repeating count, and area per floor'}
                          </p>
                        </div>

                        {/* Buttons: [ + Add Floor (إضافة دور) ] and [ + Add Basement (إضافة بدروم) ] */}
                        <div className="flex items-center gap-2 flex-wrap shrink-0 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleAddFloorRow(bld.id)}
                            className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-blue-800 active:bg-blue-900 text-white font-extrabold text-xs px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            <span>{isAr ? '+ إضافة دور (+ Add Floor)' : '+ Add Floor (إضافة دور)'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddBasementRow(bld.id)}
                            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-extrabold text-xs px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                            title={isAr ? 'إضافة دور بدروم جديد (كثافة الحمل: 3 ك.ف.أ/100م²)' : 'Add a new Basement floor (Load Density: 3 kVA/100m²)'}
                          >
                            <Plus className="w-4 h-4" />
                            <span>{isAr ? '+ إضافة بدروم (+ Add Basement)' : '+ Add Basement (إضافة بدروم)'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Excel-Style Data Table with 4 New Calculation Columns */}
                      {(() => {
                        const bldConnectedLoadSum = bld.floors.reduce((sum, fl) => {
                          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                          const density = getFloorAppliedDensity(fl.name, bld.buildingType);
                          return sum + (rowSubtotal * density) / 100;
                        }, 0);

                        const bldDemandLoadSum = bld.floors.reduce((sum, fl) => {
                          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                          const density = getFloorAppliedDensity(fl.name, bld.buildingType);
                          const connLoad = (rowSubtotal * density) / 100;
                          const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) || 0.8 : 0.8;
                          return sum + connLoad * df;
                        }, 0);

                        const bldOverallDemandFactor = bldConnectedLoadSum > 0
                          ? bldDemandLoadSum / bldConnectedLoadSum
                          : 0.8;

                        return (
                          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-2xs">
                            <table className="w-full text-left rtl:text-right border-collapse text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-slate-100 dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-black uppercase text-2xs tracking-wider border-b border-slate-300 dark:border-gray-600">
                                  <th className="py-2.5 px-3 min-w-40 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'اسم الدور (FLOOR NAME)' : 'FLOOR NAME'}
                                  </th>
                                  <th className="py-2.5 px-3 w-28 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'عدد الأدوار (NO OF FLOORS)' : 'NO OF FLOORS'}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'المساحة (AREA M²)' : 'AREA (M²)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-32 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'الإجمالي (SUBTOTAL)' : 'SUBTOTAL (M²)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr
                                      ? 'كثافة الحمل (APPLIED LOAD DENSITY)'
                                      : selectedStandardId === 'saudi'
                                      ? 'APPLIED LOAD DENSITY (VA/m²)'
                                      : 'APPLIED LOAD DENSITY (kVA/100m²)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'الحمل التوصيلي (TOTAL CONNECTED LOAD)' : 'TOTAL CONNECTED LOAD (kVA)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-28 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'معامل الطلب (DEMAND FACTOR)' : 'DEMAND FACTOR (Editable)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'حمل الطلب (TOTAL DEMAND LOAD)' : 'TOTAL DEMAND LOAD (kVA)'}
                                  </th>
                                  <th className="py-2.5 px-2 w-14 text-center">
                                    {isAr ? 'حذف' : 'ACTION'}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                                {bld.floors.map((fl) => {
                                  const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                                  const isBasement = isBasementFloorName(fl.name);
                                  const appliedDensity = getFloorAppliedDensity(fl.name, bld.buildingType);
                                  const connectedLoadKva = (rowSubtotal * appliedDensity) / 100;
                                  const demandFactor = fl.demandFactor !== undefined ? Number(fl.demandFactor) || 0.8 : 0.8;
                                  const demandLoadKva = connectedLoadKva * demandFactor;

                                  return (
                                    <tr key={fl.id} className="hover:bg-blue-50/40 dark:hover:bg-gray-800/60 transition-colors">
                                      {/* Floor Name */}
                                      <td className="p-2 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <input
                                          type="text"
                                          value={fl.name}
                                          onChange={(e) => handleUpdateFloorRow(bld.id, fl.id, 'name', e.target.value)}
                                          className="w-full bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-1.5 font-bold text-slate-900 dark:text-white transition-colors"
                                          placeholder="e.g. Typical Floor"
                                        />
                                        {isBasement && (
                                          <span className="inline-block mt-1 text-[10px] font-extrabold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded px-1.5 py-0.5">
                                            {isAr ? '⚠️ كود البدروم (3 ك.ف.أ/100م²)' : '⚠️ Basement Code: 3 kVA/100m²'}
                                          </span>
                                        )}
                                      </td>

                                      {/* No of Floors */}
                                      <td className="p-2 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <div className="flex items-center gap-1.5 justify-center" dir="ltr">
                                          <input
                                            type="text"
                                            inputMode="numeric"
                                            dir="ltr"
                                            lang="en"
                                            style={{ direction: 'ltr', textAlign: 'center' }}
                                            value={toEnglishDigits(fl.floorsCount)}
                                            onChange={(e) => {
                                              const raw = e.target.value;
                                              const clean = raw
                                                .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
                                                .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
                                                .replace(/[^0-9]/g, '');
                                              handleUpdateFloorRow(bld.id, fl.id, 'floorsCount', clean);
                                            }}
                                            onBlur={() => {
                                              if (fl.floorsCount === '' || Number(fl.floorsCount) < 1) {
                                                handleUpdateFloorRow(bld.id, fl.id, 'floorsCount', 1);
                                              }
                                            }}
                                            onKeyDown={handleArabicDigitsKeyDown}
                                            onPaste={handleNumericPaste}
                                            className="w-16 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors"
                                            placeholder="1"
                                          />
                                          <span className="text-2xs font-bold text-slate-400 dark:text-gray-400 select-none">
                                            {isAr ? 'دور' : 'fl'}
                                          </span>
                                        </div>
                                      </td>

                                      {/* Area (m²) */}
                                      <td className="p-2 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <div className="relative" dir="ltr">
                                          <input
                                            type="text"
                                            inputMode="decimal"
                                            dir="ltr"
                                            lang="en"
                                            style={{ direction: 'ltr', textAlign: 'center' }}
                                            value={toEnglishDigits(fl.areaPerFloor)}
                                            onChange={(e) => {
                                              const raw = e.target.value;
                                              let clean = raw
                                                .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
                                                .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
                                                .replace(/٫/g, '.')
                                                .replace(/[^0-9.]/g, '');
                                              const parts = clean.split('.');
                                              if (parts.length > 2) {
                                                clean = parts[0] + '.' + parts.slice(1).join('');
                                              }
                                              handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', clean);
                                            }}
                                            onBlur={() => {
                                              if (fl.areaPerFloor === '') {
                                                handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', 0);
                                              } else {
                                                handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', Number(fl.areaPerFloor) || 0);
                                              }
                                            }}
                                            onKeyDown={handleArabicDigitsKeyDown}
                                            onPaste={handleNumericPaste}
                                            className="w-full bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-1.5 pr-8 rtl:pr-2.5 rtl:pl-8 font-mono font-bold text-slate-900 dark:text-white transition-colors"
                                            placeholder="300"
                                          />
                                          <span className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-2 text-2xs font-bold text-slate-400 dark:text-gray-400 font-mono select-none">
                                            m²
                                          </span>
                                        </div>
                                      </td>

                                      {/* Subtotal (M²) */}
                                      <td className="p-2 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <span dir="ltr" className="inline-block font-mono font-black text-xs text-slate-800 dark:text-gray-200 bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded-md border border-slate-200 dark:border-gray-600">
                                          {formatEnglishInt(rowSubtotal)} m²
                                        </span>
                                      </td>

                                      {/* Column 1: APPLIED LOAD DENSITY (kVA/m²) */}
                                      <td className="p-2 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <span dir="ltr" className={`inline-flex items-center gap-1 font-mono font-black text-xs px-2.5 py-1 rounded-lg border shadow-2xs text-gray-900 ${
                                          isBasement
                                            ? 'bg-amber-100 dark:bg-amber-300 text-gray-900 border-amber-300'
                                            : 'bg-yellow-200/90 dark:bg-yellow-300 text-gray-900 border-yellow-400'
                                        }`}>
                                          {selectedStandardId === 'saudi' ? (
                                            <>
                                              <span dir="ltr" className="text-gray-900">{formatEnglishNumber(appliedDensity * 10, 0, 1)}</span>
                                              <span className="text-[10px] font-bold opacity-80 uppercase text-gray-900">VA/m²</span>
                                            </>
                                          ) : (
                                            <>
                                              <span dir="ltr" className="text-gray-900">{formatEnglishNumber(appliedDensity, 0, 1)}</span>
                                              <span className="text-[10px] font-bold opacity-80 uppercase text-gray-900">kVA/100m²</span>
                                            </>
                                          )}
                                        </span>
                                      </td>

                                      {/* Column 2: TOTAL CONNECTED LOAD (kVA) */}
                                      <td className="p-2 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <span dir="ltr" className="inline-block font-mono font-black text-xs text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/60 px-2 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                                          {formatEnglishNumber(connectedLoadKva, 1, 1)} kVA
                                        </span>
                                      </td>

                                      {/* Column 3: DEMAND FACTOR (Editable) */}
                                      <td className="p-2 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <div className="flex items-center justify-center" dir="ltr">
                                          <input
                                            type="text"
                                            inputMode="decimal"
                                            dir="ltr"
                                            lang="en"
                                            style={{ direction: 'ltr', textAlign: 'center' }}
                                            value={toEnglishDigits(fl.demandFactor ?? '')}
                                            onChange={(e) => {
                                              const raw = e.target.value;
                                              let clean = raw
                                                .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
                                                .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
                                                .replace(/٫/g, '.')
                                                .replace(/[^0-9.]/g, '');
                                              const parts = clean.split('.');
                                              if (parts.length > 2) {
                                                clean = parts[0] + '.' + parts.slice(1).join('');
                                              }
                                              handleUpdateFloorRow(bld.id, fl.id, 'demandFactor', clean);
                                            }}
                                            onBlur={() => {
                                              if (fl.demandFactor === '' || fl.demandFactor === undefined) {
                                                handleUpdateFloorRow(bld.id, fl.id, 'demandFactor', 0.8);
                                              } else {
                                                const val = Math.max(0, Math.min(2, Number(fl.demandFactor) || 0));
                                                handleUpdateFloorRow(bld.id, fl.id, 'demandFactor', val);
                                              }
                                            }}
                                            onKeyDown={handleArabicDigitsKeyDown}
                                            onPaste={handleNumericPaste}
                                            className="w-18 bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border-2 border-blue-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-black text-slate-900 dark:text-white text-center transition-all shadow-2xs"
                                            placeholder="0.8"
                                          />
                                        </div>
                                      </td>

                                      {/* Column 4: TOTAL DEMAND LOAD (kVA) */}
                                      <td className="p-2 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <span dir="ltr" className="inline-block font-mono font-black text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                          {formatEnglishNumber(demandLoadKva, 1, 1)} kVA
                                        </span>
                                      </td>

                                      {/* Action */}
                                      <td className="p-2 text-center">
                                        <button
                                          type="button"
                                          disabled={bld.floors.length <= 1}
                                          onClick={() => handleDeleteFloorRow(bld.id, fl.id)}
                                          className={`p-1.5 rounded-lg transition-colors ${
                                            bld.floors.length <= 1
                                              ? 'text-slate-300 dark:text-gray-600 cursor-not-allowed'
                                              : 'text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer'
                                          }`}
                                          title={isAr ? 'حذف هذا السطر' : 'Delete row'}
                                        >
                                          <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot>
                                {/* BOLD SUMMARY ROW (Right above "Total for this Building" row) */}
                                <tr className="bg-blue-50/90 dark:bg-gray-800 font-black border-t-2 border-slate-300 dark:border-gray-600 text-xs text-slate-900 dark:text-white">
                                  <td className="py-2.5 px-3 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-black text-blue-950 dark:text-blue-300">
                                    <div className="flex items-center gap-1.5">
                                      <span>⚡</span>
                                      <span>{isAr ? 'ملخص الأحمال المحسوبة' : 'LOADS SUMMARY'}</span>
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                    —
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                    —
                                  </td>
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-700 dark:text-gray-300">
                                    <span dir="ltr">{formatEnglishInt(bld.totalArea)} m²</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-slate-400 dark:text-gray-500 font-mono">
                                    —
                                  </td>
                                  {/* Sum of TOTAL CONNECTED LOAD */}
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-blue-900 dark:text-blue-200 font-black text-xs sm:text-sm">
                                    <span dir="ltr" className="inline-block bg-blue-100 dark:bg-blue-900/60 border border-blue-300 dark:border-blue-700 px-2.5 py-1 rounded-md">
                                      {formatEnglishNumber(bldConnectedLoadSum, 1, 1)} kVA
                                    </span>
                                  </td>
                                  {/* Overall DEMAND FACTOR Ratio (Read-Only) */}
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    <input
                                      type="text"
                                      dir="ltr"
                                      lang="en"
                                      readOnly
                                      value={formatEnglishNumber(bldOverallDemandFactor, 3, 3)}
                                      className="w-18 bg-slate-200/90 dark:bg-gray-900 text-slate-900 dark:text-white font-mono font-black text-xs text-center rounded-lg px-2 py-1 border border-slate-300 dark:border-gray-600 cursor-default shadow-2xs"
                                      title={isAr ? 'النسبة الإجمالية: إجمالي حمل الطلب ÷ إجمالي الحمل التوصيلي' : 'Overall Ratio: Total Demand Load ÷ Total Connected Load'}
                                    />
                                  </td>
                                  {/* Sum of TOTAL DEMAND LOAD */}
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-emerald-900 dark:text-emerald-200 font-black text-xs sm:text-sm">
                                    <span dir="ltr" className="inline-block bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1 rounded-md">
                                      {formatEnglishNumber(bldDemandLoadSum, 1, 1)} kVA
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-2 text-center"></td>
                                </tr>

                                {/* Total for this Building Row */}
                                <tr className="bg-slate-100/90 dark:bg-gray-900/80 font-black border-t border-slate-300 dark:border-gray-600 text-xs text-slate-900 dark:text-gray-200">
                                  <td className="py-2.5 px-3 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? 'المجموع الإجمالي للمبنى' : 'Total for this Building'}
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono">
                                    <span dir="ltr">{formatEnglishInt(bld.floorsCount)} {isAr ? 'دور' : 'Floors'}</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-400 dark:text-gray-500 text-2xs uppercase border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-center">
                                    —
                                  </td>
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-[#1E3A8A] dark:text-blue-300 text-sm">
                                    <span dir="ltr">{formatEnglishInt(bld.totalArea)} m²</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-400 dark:text-gray-500 text-2xs uppercase border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-center">
                                    —
                                  </td>
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-blue-900 dark:text-blue-300 font-extrabold">
                                    <span dir="ltr">{formatEnglishNumber(bldConnectedLoadSum, 1, 1)} kVA</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-xs text-slate-700 dark:text-gray-300">
                                    <span dir="ltr">{formatEnglishNumber(bldOverallDemandFactor * 100, 1, 1)}%</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-emerald-900 dark:text-emerald-300 font-extrabold">
                                    <span dir="ltr">{formatEnglishNumber(bldDemandLoadSum, 1, 1)} kVA</span>
                                  </td>
                                  <td className="py-2.5 px-2 text-center"></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Button at the VERY BOTTOM of Buildings Details Card */}
              <div className="pt-3 border-t border-slate-100 dark:border-gray-700 flex justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={handleAddAnotherBuilding}
                  disabled={buildingsList.length >= 10}
                  className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 active:bg-blue-900 disabled:bg-slate-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD ANOTHER AREA (إضافة مساحة أخرى)</span>
                </button>
              </div>
            </div>

            {/* SECTION 3: "Pumps & Extra Loads (المضخات والأحمال الإضافية)" */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#1E3A8A] dark:text-blue-300">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {isAr ? 'المضخات والأحمال الإضافية (Pumps & Extra Loads)' : 'Pumps & Extra Loads (المضخات والأحمال الإضافية)'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-300 font-medium">
                      {isAr ? 'إدراج مضخات المياه والحريق ومصاعد المبنى' : 'Add electromechanical pump sets and extra vertical transport loads'}
                    </p>
                  </div>
                </div>

                {/* Sub-Tabs: Pumps vs Extra Loads */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-gray-900 p-1 rounded-xl self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveLoadsTab('pumps')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLoadsTab === 'pumps'
                        ? 'bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-blue-300 shadow-xs'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isAr ? `مضخات المياه والحريق (${pumps.length})` : `Pumps (${pumps.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLoadsTab('extra')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLoadsTab === 'extra'
                        ? 'bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-blue-300 shadow-xs'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isAr ? `أحمال إضافية (${extraLoads.length})` : `Extra Loads (${extraLoads.length})`}
                  </button>
                </div>
              </div>

              {/* Two Distinct Action Buttons Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLoadsTab('extra');
                    setIsAddingExtra(true);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 active:bg-slate-100 dark:active:bg-gray-600 text-slate-800 dark:text-gray-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#1E3A8A] dark:text-blue-300" />
                  <span>{isAr ? '+ إضافة أحمال خاصة (مصاعد / بوابات)' : '+ Add Extra Loads (Elevators/Gates)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLoadsTab('pumps');
                    setIsAddingPump(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 active:bg-blue-950 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? '+ إضافة مضخات (مياه / حريق)' : '+ Add Pumps (Water/Fire)'}</span>
                </button>
              </div>

              {/* Inline Form: Add Pump */}
              {isAddingPump && (
                <form
                  onSubmit={handleAddPump}
                  className="p-4 bg-blue-50/70 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-700 rounded-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      {isAr ? 'إدخال بيانات مضخة جديدة' : 'Add New Pump Parameters'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingPump(false)}
                      className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder={isAr ? 'اسم المضخة (مثال: مضخة التغذية العلوية)' : 'Pump Name (e.g., Irrigation Pump)'}
                      value={newPumpName}
                      onChange={(e) => setNewPumpName(e.target.value)}
                      className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                      required
                    />
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        lang="en"
                        placeholder="Power in HP"
                        value={newPumpHp}
                        onChange={(e) => setNewPumpHp(parseEnglishNumber(e.target.value, 1))}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 pr-10 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                        required
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 dark:text-gray-400 font-mono font-bold">HP</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-lg p-2.5 transition-colors cursor-pointer"
                    >
                      {isAr ? 'حفظ وإضافة المضخة' : 'Confirm & Save Pump'}
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Form: Add Extra Load */}
              {isAddingExtra && (
                <form
                  onSubmit={handleAddExtraLoad}
                  className="p-4 bg-slate-50 dark:bg-gray-900/80 border border-slate-300 dark:border-gray-700 rounded-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      {isAr ? 'إدخال حمل إضافي جديد' : 'Add New Extra Load Item'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingExtra(false)}
                      className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder={isAr ? 'اسم الحمل (مثال: محطة شحن EV)' : 'Load Name (e.g. EV Chargers)'}
                      value={newExtraName}
                      onChange={(e) => setNewExtraName(e.target.value)}
                      className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-medium sm:col-span-2 focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                      required
                    />
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        lang="en"
                        placeholder="Rating kVA"
                        value={newExtraKva}
                        onChange={(e) => setNewExtraKva(parseEnglishNumber(e.target.value, 1))}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 pr-12 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                        required
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 dark:text-gray-400 font-mono font-bold">kVA</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-900 dark:bg-gray-700 hover:bg-slate-800 dark:hover:bg-gray-600 text-white font-bold text-xs sm:text-sm rounded-lg p-2.5 transition-colors cursor-pointer"
                    >
                      {isAr ? 'إضافة الحمل' : 'Add Item'}
                    </button>
                  </div>
                </form>
              )}

              {/* Data Grid to Show Added Items */}
              {activeLoadsTab === 'pumps' ? (
                <div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="bg-[#F8FAFC] dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-gray-600">
                        <tr>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-200">
                            {isAr ? 'اسم المضخة (Pump Name)' : 'Pump Name'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'القدرة الحصانية (HP)' : 'Power (HP)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-[#1E3A8A] dark:text-blue-300">
                            {isAr ? 'القيمة المحسوبة (kVA)' : 'Calculated Value (kVA)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-700 dark:text-gray-300">
                            {isAr ? 'الإجراء (Action)' : 'Action'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-gray-700 font-medium">
                        {pumps.map((pump, idx) => {
                          const kvaValue = calculatePumpKva(pump.hp);
                          return (
                            <tr
                              key={pump.id}
                              className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800 hover:bg-blue-50/30 dark:hover:bg-gray-700/50' : 'bg-[#FAFCFF] dark:bg-gray-900/50 hover:bg-blue-50/30 dark:hover:bg-gray-700/50'}
                            >
                              <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                  <span>{isAr ? pump.nameAr : pump.name}</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 dark:text-gray-300 border-b border-slate-100 dark:border-gray-700">
                                <span dir="ltr">{formatEnglishNumber(pump.hp, 0, 1)} HP</span>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-black text-[#1E3A8A] dark:text-blue-300 border-b border-slate-100 dark:border-gray-700">
                                <span dir="ltr">{formatEnglishNumber(kvaValue, 2, 2)} kVA</span>
                              </td>
                              <td className="py-2.5 px-4 text-center border-b border-slate-100 dark:border-gray-700">
                                <button
                                  type="button"
                                  onClick={() => handleDeletePump(pump.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer inline-flex items-center justify-center"
                                  title="Delete pump"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {pumps.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-slate-400 dark:text-gray-500 font-medium text-xs">
                              {isAr ? 'لا توجد مضخات مضافة حالياً. اضغط على زر + إضافة مضخات أعلاه.' : 'No pumps currently listed. Click "+ Add Pumps (Water/Fire)" above to add.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Prominent Mathematical Formula Block */}
                  <div className="mt-4 p-4 sm:p-5 bg-gradient-to-b from-[#F8FAFD] to-[#F1F5F9] dark:from-gray-900 dark:to-gray-800 border border-blue-200/80 dark:border-gray-700 rounded-xl text-center shadow-2xs">
                    {/* Line 1 (Title): "POWER FORMULA" with bold "Formula:" */}
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 mb-1.5 flex items-center justify-center gap-1.5">
                      <span className="font-black text-slate-900 dark:text-white">{isAr ? 'المعادلة:' : 'Formula:'}</span>
                      <span className="text-[#1E3A8A] dark:text-blue-300 font-extrabold tracking-widest">
                        {isAr ? 'معادلة القدرة (POWER FORMULA)' : 'POWER FORMULA'}
                      </span>
                    </div>

                    {/* Line 2 (Equation, large and centered): Power (kVA) = (HP × 0.746) ÷ (η × PF) */}
                    <div className="py-1 text-lg sm:text-[20px] font-serif font-bold text-slate-900 dark:text-white tracking-wide select-all">
                      Power (kVA) = (HP × 0.746) ÷ (η × PF)
                    </div>

                    {/* Line 3 (Subtext below equation, smaller font): Where Efficiency (η) = 0.90 and Power Factor (PF) = 0.85 */}
                    <p className="text-xs text-slate-600 dark:text-gray-300 font-medium mt-1">
                      {isAr ? (
                        <>حيث معامل الكفاءة (η) = <span className="font-bold text-slate-800 dark:text-white font-mono">0.90</span> ومعامل القدرة (PF) = <span className="font-bold text-slate-800 dark:text-white font-mono">0.85</span></>
                      ) : (
                        <>Where Efficiency (η) = <span className="font-bold text-slate-800 dark:text-white font-mono">0.90</span> and Power Factor (PF) = <span className="font-bold text-slate-800 dark:text-white font-mono">0.85</span></>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                /* Extra Loads Grid */
                <div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="bg-[#F8FAFC] dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-gray-600">
                        <tr>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-200">
                            {isAr ? 'اسم الحمل (Load Name)' : 'Equipment / Load Name'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'القدرة المقننة (Unit kVA)' : 'Unit (kVA)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'الكمية (Qty)' : 'Quantity'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-[#1E3A8A] dark:text-blue-300">
                            {isAr ? 'إجمالي الحمل (Total kVA)' : 'Total (kVA)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-700 dark:text-gray-300">
                            {isAr ? 'حذف' : 'Action'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-gray-700 font-medium">
                        {extraLoads.map((load, idx) => (
                          <tr
                            key={load.id}
                            className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50' : 'bg-[#FAFCFF] dark:bg-gray-900/50 hover:bg-slate-50 dark:hover:bg-gray-700/50'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                <span>{isAr ? load.nameAr : load.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 dark:text-gray-300 border-b border-slate-100 dark:border-gray-700">
                              <span dir="ltr">{formatEnglishNumber(load.kva, 0, 1)} kVA</span>
                            </td>
                            <td className="py-2.5 px-4 text-center font-mono text-slate-700 dark:text-gray-300 border-b border-slate-100 dark:border-gray-700">
                              <span dir="ltr">{formatEnglishInt(load.qty)}</span>
                            </td>
                            <td className="py-2.5 px-4 text-center font-mono font-black text-[#1E3A8A] dark:text-blue-300 border-b border-slate-100 dark:border-gray-700">
                              <span dir="ltr">{formatEnglishNumber(load.kva * load.qty, 1, 1)} kVA</span>
                            </td>
                            <td className="py-2.5 px-4 text-center border-b border-slate-100 dark:border-gray-700">
                              <button
                                type="button"
                                onClick={() => handleDeleteExtraLoad(load.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer inline-flex items-center justify-center"
                                title="Delete item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* NEW SECTION: "DETAILED LOAD SUMMARY (ملخص الأحمال التفصيلي)"     */}
            {/* ============================================================== */}
            {(() => {
              // 1. Buildings Calculations
              const buildingsLoadsList = buildingsList.map((bld, idx) => {
                let connected = bld.floors.reduce((sum, fl) => {
                  const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                  const density = getFloorAppliedDensity(fl.name, bld.buildingType);
                  return sum + (rowSubtotal * density) / 100;
                }, 0);

                if (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0) {
                  connected += (Number(acudEvChargers) || 0) * 150;
                }

                const floorBreakdownDemand = bld.floors.reduce((sum, fl) => {
                  const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                  const density = getFloorAppliedDensity(fl.name, bld.buildingType);
                  const conn = (rowSubtotal * density) / 100;
                  const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) || 0.8 : 0.8;
                  return sum + conn * df;
                }, 0) + (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0 ? (Number(acudEvChargers) || 0) * 150 * 0.8 : 0);

                const defaultDf = connected > 0 ? floorBreakdownDemand / connected : 0.8;
                const bldOverride = buildingsDemandFactorOverrides[bld.id];
                const effectiveDf = bldOverride !== undefined
                  ? (bldOverride === '' ? 0 : Math.max(0, Number(bldOverride) || 0))
                  : defaultDf;

                const demand = connected * effectiveDf;
                const avgDensity = bld.totalArea > 0 ? (connected / bld.totalArea) * 100 : 0;

                return {
                  bld,
                  connected,
                  demand,
                  df: effectiveDf,
                  avgDensity,
                };
              });

              const totalBuildingsConnected = buildingsLoadsList.reduce((s, b) => s + b.connected, 0);
              const totalBuildingsDemand = buildingsLoadsList.reduce((s, b) => s + b.demand, 0);

              // 2. Pumps Calculations
              const pumpsLoadsList = pumps.map((p) => {
                const connected = calculatePumpKva(p.hp);
                const pumpOverride = pumpsDemandFactorOverrides[p.id];
                const defaultDf = p.demandFactor !== undefined ? p.demandFactor : 0.8;
                const effectiveDf = pumpOverride !== undefined
                  ? (pumpOverride === '' ? 0 : Math.max(0, Number(pumpOverride) || 0))
                  : defaultDf;
                const demand = connected * effectiveDf;
                return {
                  pump: p,
                  connected,
                  demand,
                  df: effectiveDf,
                };
              });

              const totalPumpsConnected = pumpsLoadsList.reduce((s, p) => s + p.connected, 0);
              const totalPumpsDemand = pumpsLoadsList.reduce((s, p) => s + p.demand, 0);

              // 3. Extra Loads Calculations
              const extraLoadsList = extraLoads.map((e) => {
                const connected = (Number(e.kva) || 0) * (Number(e.qty) || 1);
                const extraOverride = extraLoadsDemandFactorOverrides[e.id];
                const defaultDf = e.demandFactor !== undefined ? e.demandFactor : 0.8;
                const effectiveDf = extraOverride !== undefined
                  ? (extraOverride === '' ? 0 : Math.max(0, Number(extraOverride) || 0))
                  : defaultDf;
                const demand = connected * effectiveDf;
                return {
                  extra: e,
                  connected,
                  demand,
                  df: effectiveDf,
                };
              });

              const totalExtraConnected = extraLoadsList.reduce((s, e) => s + e.connected, 0);
              const totalExtraDemand = extraLoadsList.reduce((s, e) => s + e.demand, 0);

              // 4. Grand Totals
              const grandTotalConnected = totalBuildingsConnected + totalPumpsConnected + totalExtraConnected;
              const grandTotalDemand = totalBuildingsDemand + totalPumpsDemand + totalExtraDemand;
              const numericDiversityFactor = projectDiversityFactor === '' ? 0 : Math.max(0, Number(projectDiversityFactor) || 0);
              const finalDiversifiedDemand = grandTotalDemand * numericDiversityFactor;
              const numericSparePercent = spareCapacityPercent === '' ? 0 : Math.max(0, Number(spareCapacityPercent) || 0);
              const finalLoadWithSpare = finalDiversifiedDemand * (1 + numericSparePercent / 100);
              const numericLoadingRatio = transformerLoadingRatio === '' ? 0 : Math.max(0, Number(transformerLoadingRatio) || 0);
              const requiredTransformerKva = numericLoadingRatio > 0 ? finalLoadWithSpare / (numericLoadingRatio / 100) : 0;
              const numericQuantity = transformerQuantity === '' ? 1 : Math.max(1, parseInt(String(transformerQuantity), 10) || 1);
              const totalInstalledTransformerKva = selectedTransformerSize * numericQuantity;
              const actualLoadingRatio = totalInstalledTransformerKva > 0 ? (finalLoadWithSpare / totalInstalledTransformerKva) * 100 : 0;

              return (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-2xs space-y-5">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
                        📊
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2">
                          <span>{isAr ? '📊 ملخص الأحمال التفصيلي (DETAILED LOAD SUMMARY)' : '📊 DETAILED LOAD SUMMARY (ملخص الأحمال التفصيلي)'}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-semibold mt-0.5">
                          {isAr
                            ? 'تفصيل وتجميع كافة الأحمال التوصيلية وأحمال الطلب لكافة أجزاء ومرافق المشروع مع تطبيق معاملات التباين.'
                            : 'Breakdown of all connected loads, demand loads, and final diversified peak demand for the entire project.'}
                        </p>
                      </div>
                    </div>

                    {/* Quick Metric Badges on Header */}
                    <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
                      <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-2xs">
                        <span className="text-2xs font-extrabold uppercase text-slate-600 dark:text-gray-300">
                          {isAr ? 'إجمالي التوصيلي:' : 'Total Connected:'}
                        </span>
                        <span dir="ltr" className="text-sm sm:text-base font-mono font-black text-[#1E3A8A] dark:text-blue-300">
                          {formatEnglishNumber(grandTotalConnected, 1, 1)} kVA
                        </span>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-2xs">
                        <span className="text-2xs font-extrabold uppercase text-slate-600 dark:text-gray-300">
                          {isAr ? 'بعد معامل التباين:' : 'After Diversity:'}
                        </span>
                        <span dir="ltr" className="text-sm sm:text-base font-mono font-black text-emerald-800 dark:text-emerald-300">
                          {formatEnglishNumber(finalDiversifiedDemand, 1, 1)} kVA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-2xs">
                    <table className="w-full text-left rtl:text-right border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-black uppercase text-2xs tracking-wider border-b border-slate-300 dark:border-gray-600">
                          <th className="py-3 px-3.5 min-w-44 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'اسم البند (ITEM NAME)' : 'ITEM NAME'}
                          </th>
                          <th className="py-3 px-3.5 min-w-40 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'الفئة / النوع (CATEGORY / TYPE)' : 'CATEGORY / TYPE'}
                          </th>
                          <th className="py-3 px-3.5 w-36 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'المساحة / القدرة (AREA / POWER)' : 'AREA / POWER'}
                          </th>
                          <th className="py-3 px-3.5 min-w-44 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'كثافة الحمل / المعادلة (LOAD DENSITY / FORMULA)' : 'LOAD DENSITY / FORMULA'}
                          </th>
                          <th className="py-3 px-3.5 w-40 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'الحمل التوصيلي (TOTAL CONNECTED kVA)' : 'TOTAL CONNECTED (kVA)'}
                          </th>
                          <th className="py-3 px-3.5 w-36 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {isAr ? 'معامل الطلب (DEMAND FACTOR)' : 'DEMAND FACTOR'}
                          </th>
                          <th className="py-3 px-3.5 w-40 text-right rtl:text-left">
                            {isAr ? 'حمل الطلب (TOTAL DEMAND LOAD kVA)' : 'TOTAL DEMAND LOAD (kVA)'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                        {/* =================================================== */}
                        {/* GROUP 1: BUILDINGS                                  */}
                        {/* =================================================== */}
                        <tr className="bg-blue-100/75 dark:bg-blue-950/60 border-y border-blue-200 dark:border-blue-800">
                          <td colSpan={7} className="py-2.5 px-3.5 font-black text-xs text-[#1E3A8A] dark:text-blue-200">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#1E3A8A] dark:bg-blue-400" />
                              <span>🏢 {isAr ? 'المباني والإشغالات (BUILDINGS)' : 'BUILDINGS & OCCUPANCY LOADS'}</span>
                              <span className="text-2xs font-bold text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700">
                                {buildingsLoadsList.length} {buildingsLoadsList.length === 1 ? 'Building' : 'Buildings'}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {buildingsLoadsList.map((item, idx) => (
                          <tr key={item.bld.id} className="hover:bg-blue-50/40 dark:hover:bg-gray-800/60 transition-colors">
                            {/* ITEM NAME */}
                            <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-extrabold text-slate-900 dark:text-white">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-200 font-mono text-2xs font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{item.bld.name}</span>
                              </div>
                            </td>

                            {/* CATEGORY / TYPE */}
                            <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-slate-700 dark:text-gray-300 font-semibold">
                              <span className="bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-gray-700 text-xs inline-block">
                                {selectedStandardId === 'egypt' && egyptSubStandard === 'acud'
                                  ? (item.bld.isTypeCustomized ? item.bld.buildingType : `ACUD: ${getAcudActivity().name}`)
                                  : item.bld.buildingType}
                              </span>
                            </td>

                            {/* AREA / POWER */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-800 dark:text-gray-200">
                              <span dir="ltr">{formatEnglishInt(item.bld.totalArea)} m²</span>
                              <span dir="ltr" className="block text-2xs text-slate-400 dark:text-gray-400 font-sans font-medium">
                                ({formatEnglishInt(item.bld.floorsCount)} {item.bld.floorsCount === 1 ? 'floor' : 'floors'})
                              </span>
                            </td>

                            {/* LOAD DENSITY / FORMULA */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-xs text-slate-700 dark:text-gray-300">
                              <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-300 text-gray-900 px-2.5 py-1 rounded-lg border border-yellow-300 font-bold">
                                <span dir="ltr" className="text-gray-900">
                                  Avg: {selectedStandardId === 'saudi' ? formatEnglishNumber(item.avgDensity * 10, 1, 1) : formatEnglishNumber(item.avgDensity, 1, 1)}
                                </span>
                                <span className="text-2xs opacity-80 text-gray-900">
                                  {selectedStandardId === 'saudi' ? 'VA/m²' : 'kVA/100m²'}
                                </span>
                              </span>
                            </td>

                            {/* TOTAL CONNECTED (kVA) */}
                            <td className="py-2.5 px-3.5 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-black text-blue-900 dark:text-blue-200">
                              <span dir="ltr" className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded-md">
                                {formatEnglishNumber(item.connected, 1, 1)} kVA
                              </span>
                            </td>

                            {/* DEMAND FACTOR (Editable) */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                              <div className="flex items-center justify-center" dir="ltr">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  dir="ltr"
                                  lang="en"
                                  style={{ direction: 'ltr', textAlign: 'center' }}
                                  value={toEnglishDigits(buildingsDemandFactorOverrides[item.bld.id] !== undefined ? buildingsDemandFactorOverrides[item.bld.id] : formatEnglishNumber(item.df, 2, 2))}
                                  onChange={(e) => {
                                    const val = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                    setBuildingsDemandFactorOverrides((prev) => ({
                                      ...prev,
                                      [item.bld.id]: val,
                                    }));
                                  }}
                                  onKeyDown={handleArabicDigitsKeyDown}
                                  onPaste={handleNumericPaste}
                                  className="w-20 bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border-2 border-blue-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1 font-mono font-bold text-slate-900 dark:text-white text-center transition-all shadow-2xs text-xs focus:outline-hidden"
                                  title="Editable Demand Factor for Building"
                                />
                              </div>
                            </td>

                            {/* TOTAL DEMAND LOAD (kVA) */}
                            <td className="py-2.5 px-3.5 text-right rtl:text-left font-mono font-black text-emerald-900 dark:text-emerald-200">
                              <span dir="ltr" className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md">
                                {formatEnglishNumber(item.demand, 1, 1)} kVA
                              </span>
                            </td>
                          </tr>
                        ))}

                        {/* =================================================== */}
                        {/* GROUP 2: PUMPS                                      */}
                        {/* =================================================== */}
                        <tr className="bg-amber-100/75 dark:bg-amber-950/60 border-y border-amber-200 dark:border-amber-800">
                          <td colSpan={7} className="py-2.5 px-3.5 font-black text-xs text-amber-950 dark:text-amber-200">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-600" />
                              <span>⚙️ {isAr ? 'المضخات الكهروميكانيكية (PUMPS)' : 'ELECTROMECHANICAL PUMPS'}</span>
                              <span className="text-2xs font-bold text-amber-800 dark:text-amber-300 bg-white/80 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-700">
                                {pumpsLoadsList.length} {pumpsLoadsList.length === 1 ? 'Pump Set' : 'Pump Sets'}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {pumpsLoadsList.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-3 px-3.5 text-center text-slate-400 dark:text-gray-500 text-xs italic">
                              {isAr ? 'لا توجد مضخات مدخلة حالياً.' : 'No pumps registered.'}
                            </td>
                          </tr>
                        ) : (
                          pumpsLoadsList.map((item, idx) => (
                            <tr key={item.pump.id} className="hover:bg-amber-50/40 dark:hover:bg-gray-800/60 transition-colors">
                              {/* ITEM NAME */}
                              <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-extrabold text-slate-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-mono text-2xs font-bold flex items-center justify-center shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span>{isAr ? (item.pump.nameAr || item.pump.name) : item.pump.name}</span>
                                </div>
                              </td>

                              {/* CATEGORY / TYPE */}
                              <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-slate-700 dark:text-gray-300 font-semibold">
                                <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 text-xs inline-block capitalize">
                                  {item.pump.category === 'fire'
                                    ? 'Firefighting Pump'
                                    : item.pump.category === 'water'
                                    ? 'Domestic Water Booster'
                                    : item.pump.category === 'drainage'
                                    ? 'Drainage & Sump'
                                    : 'HVAC Circulation'}
                                </span>
                              </td>

                              {/* AREA / POWER */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-800 dark:text-gray-200">
                                <span dir="ltr" className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  {formatEnglishNumber(item.pump.hp, 0, 1)} HP
                                </span>
                              </td>

                              {/* LOAD DENSITY / FORMULA */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-gray-300">
                                <span className="bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  (HP × 0.746) ÷ (0.90 × 0.85)
                                </span>
                              </td>

                              {/* TOTAL CONNECTED (kVA) */}
                              <td className="py-2.5 px-3.5 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-black text-blue-900 dark:text-blue-200">
                                <span dir="ltr" className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded-md">
                                  {formatEnglishNumber(item.connected, 1, 1)} kVA
                                </span>
                              </td>

                              {/* DEMAND FACTOR (Editable) */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                <div className="flex items-center justify-center" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(pumpsDemandFactorOverrides[item.pump.id] !== undefined ? pumpsDemandFactorOverrides[item.pump.id] : formatEnglishNumber(item.df, 2, 2))}
                                    onChange={(e) => {
                                      const val = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      setPumpsDemandFactorOverrides((prev) => ({
                                        ...prev,
                                        [item.pump.id]: val,
                                      }));
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-20 bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border-2 border-amber-300 dark:border-gray-600 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 rounded-lg px-2 py-1 font-mono font-bold text-slate-900 dark:text-white text-center transition-all shadow-2xs text-xs focus:outline-hidden"
                                    title="Editable Demand Factor for Pump"
                                  />
                                </div>
                              </td>

                              {/* TOTAL DEMAND LOAD (kVA) */}
                              <td className="py-2.5 px-3.5 text-right rtl:text-left font-mono font-black text-emerald-900 dark:text-emerald-200">
                                <span dir="ltr" className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md">
                                  {formatEnglishNumber(item.demand, 1, 1)} kVA
                                </span>
                              </td>
                            </tr>
                          ))
                        )}

                        {/* =================================================== */}
                        {/* GROUP 3: EXTRA LOADS                                */}
                        {/* =================================================== */}
                        <tr className="bg-purple-100/75 dark:bg-purple-950/60 border-y border-purple-200 dark:border-purple-800">
                          <td colSpan={7} className="py-2.5 px-3.5 font-black text-xs text-purple-950 dark:text-purple-200">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-purple-600" />
                              <span>⚡ {isAr ? 'الأحمال الإضافية والخاصة (EXTRA LOADS)' : 'EXTRA & SPECIAL LOADS'}</span>
                              <span className="text-2xs font-bold text-purple-800 dark:text-purple-300 bg-white/80 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-700">
                                {extraLoadsList.length} {extraLoadsList.length === 1 ? 'Item' : 'Items'}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {extraLoadsList.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-3 px-3.5 text-center text-slate-400 dark:text-gray-500 text-xs italic">
                              {isAr ? 'لا توجد أحمال إضافية مدخلة.' : 'No extra loads registered.'}
                            </td>
                          </tr>
                        ) : (
                          extraLoadsList.map((item, idx) => (
                            <tr key={item.extra.id} className="hover:bg-purple-50/40 dark:hover:bg-gray-800/60 transition-colors">
                              {/* ITEM NAME */}
                              <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-extrabold text-slate-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-mono text-2xs font-bold flex items-center justify-center shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span>{isAr ? (item.extra.nameAr || item.extra.name) : item.extra.name}</span>
                                </div>
                              </td>

                              {/* CATEGORY / TYPE */}
                              <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-slate-700 dark:text-gray-300 font-semibold">
                                <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800 text-xs inline-block capitalize">
                                  {item.extra.category === 'transport'
                                    ? 'Elevators & Transport'
                                    : item.extra.category === 'security'
                                    ? 'Security Systems'
                                    : item.extra.category === 'ev'
                                    ? 'EV Charging Station'
                                    : 'Special Electromechanical'}
                                </span>
                              </td>

                              {/* AREA / POWER */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-800 dark:text-gray-200">
                                <span dir="ltr" className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  {formatEnglishInt(item.extra.qty)} × {formatEnglishNumber(item.extra.kva, 0, 1)} kVA
                                </span>
                              </td>

                              {/* LOAD DENSITY / FORMULA */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-gray-300">
                                <span className="bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  Direct (Qty × kVA)
                                </span>
                              </td>

                              {/* TOTAL CONNECTED (kVA) */}
                              <td className="py-2.5 px-3.5 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-black text-blue-900 dark:text-blue-200">
                                <span dir="ltr" className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded-md">
                                  {formatEnglishNumber(item.connected, 1, 1)} kVA
                                </span>
                              </td>

                              {/* DEMAND FACTOR (Editable) */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                <div className="flex items-center justify-center" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(extraLoadsDemandFactorOverrides[item.extra.id] !== undefined ? extraLoadsDemandFactorOverrides[item.extra.id] : formatEnglishNumber(item.df, 2, 2))}
                                    onChange={(e) => {
                                      const val = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      setExtraLoadsDemandFactorOverrides((prev) => ({
                                        ...prev,
                                        [item.extra.id]: val,
                                      }));
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-20 bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border-2 border-purple-300 dark:border-gray-600 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 rounded-lg px-2 py-1 font-mono font-bold text-slate-900 dark:text-white text-center transition-all shadow-2xs text-xs focus:outline-hidden"
                                    title="Editable Demand Factor for Extra Load"
                                  />
                                </div>
                              </td>

                              {/* TOTAL DEMAND LOAD (kVA) */}
                              <td className="py-2.5 px-3.5 text-right rtl:text-left font-mono font-black text-emerald-900 dark:text-emerald-200">
                                <span dir="ltr" className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md">
                                  {formatEnglishNumber(item.demand, 1, 1)} kVA
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                      {/* =================================================== */}
                      {/* BOLD TOTAL ROWS AT THE BOTTOM                       */}
                      {/* =================================================== */}
                      <tfoot>
                        {/* ROW 1: PROJECT TOTAL */}
                        <tr className="bg-[#1E3A8A] dark:bg-blue-950 text-white font-black text-xs sm:text-sm border-t-2 border-slate-400 dark:border-gray-600">
                          {/* ITEM NAME */}
                          <td className="py-3 px-3.5 border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <span>🌟</span>
                              <span>{isAr ? 'الإجمالي العام للمشروع (PROJECT TOTAL)' : 'PROJECT TOTAL (الإجمالي العام للمشروع)'}</span>
                            </div>
                          </td>

                          {/* CATEGORY / TYPE */}
                          <td className="py-3 px-3.5 border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-bold text-xs text-blue-100">
                            {isAr ? 'كافة مرافق وأحمال المشروع' : 'All Project Assets & Loads'}
                          </td>

                          {/* AREA / POWER */}
                          <td className="py-3 px-3.5 text-center border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono font-black text-xs text-blue-100">
                            <span dir="ltr">{formatEnglishInt(buildingsList.reduce((s, b) => s + (Number(b.totalArea) || 0), 0))} m²</span>
                          </td>

                          {/* LOAD DENSITY / FORMULA */}
                          <td className="py-3 px-3.5 text-center border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono text-2xs text-blue-200">
                            Combined Aggregate
                          </td>

                          {/* TOTAL CONNECTED (kVA) */}
                          <td className="py-3 px-3.5 text-right rtl:text-left border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono font-black text-sm sm:text-base text-yellow-300">
                            <span dir="ltr">{formatEnglishNumber(grandTotalConnected, 1, 1)} kVA</span>
                          </td>

                          {/* DEMAND FACTOR: REMOVED calculated value as requested -> dash "-" */}
                          <td className="py-3 px-3.5 text-center border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono font-bold text-sm text-blue-200">
                            —
                          </td>

                          {/* TOTAL DEMAND LOAD (kVA) */}
                          <td className="py-3 px-3.5 text-right rtl:text-left font-mono font-black text-sm sm:text-base text-emerald-300">
                            <span dir="ltr">{formatEnglishNumber(grandTotalDemand, 1, 1)} kVA</span>
                          </td>
                        </tr>

                        {/* ROW 2: TOTAL LOAD AFTER DIVERSITY FACTOR */}
                        <tr className="bg-[#EFF6FF] dark:bg-gray-800 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t-2 border-blue-600 dark:border-blue-500">
                          {/* Column 1: ITEM NAME */}
                          <td className="py-3.5 px-3.5 border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                            <div className="flex items-center gap-2">
                              <span className="text-base">⚡</span>
                              <span className="font-black text-xs sm:text-sm">
                                {isAr ? 'إجمالي الحمل بعد معامل التباين (TOTAL LOAD AFTER DIVERSITY FACTOR)' : 'TOTAL LOAD AFTER DIVERSITY FACTOR'}
                              </span>
                            </div>
                          </td>

                          {/* Column 2: CATEGORY / TYPE (Text removed as requested -> dash "-") */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 3: AREA / POWER */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 4: LOAD DENSITY / FORMULA */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-blue-900/80 dark:text-blue-300/80 font-semibold">
                            Total Demand × Diversity Factor
                          </td>

                          {/* Column 5: TOTAL CONNECTED (kVA) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 6: DEMAND FACTOR (Editable Diversity Factor) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                            <div className="flex items-center justify-center" dir="ltr">
                              <input
                                type="text"
                                inputMode="decimal"
                                dir="ltr"
                                lang="en"
                                style={{ direction: 'ltr', textAlign: 'center' }}
                                value={toEnglishDigits(projectDiversityFactor)}
                                onChange={(e) => setProjectDiversityFactor(toEnglishDigits(e.target.value).replace(/[^0-9.]/g, ''))}
                                onKeyDown={handleArabicDigitsKeyDown}
                                onPaste={handleNumericPaste}
                                className="w-22 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-blue-400 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                title="Project Diversity Factor (معامل التباين)"
                                placeholder="1.00"
                              />
                            </div>
                          </td>

                          {/* Column 7: TOTAL DEMAND LOAD (kVA) */}
                          <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl text-[#1E3A8A] dark:text-blue-300 tracking-tight">
                            <span dir="ltr" className="inline-block bg-[#1E3A8A] dark:bg-blue-600 text-white border border-blue-900 dark:border-blue-700 px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg">
                              {formatEnglishNumber(finalDiversifiedDemand, 1, 1)} kVA
                            </span>
                          </td>
                        </tr>

                        {/* ROW 3: SPARE CAPACITY */}
                        <tr className="bg-amber-50/80 dark:bg-amber-950/30 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t border-amber-200 dark:border-amber-800">
                          {/* Column 1: ITEM NAME */}
                          <td className="py-3.5 px-3.5 border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l text-amber-950 dark:text-amber-200">
                            <div className="flex items-start gap-2">
                              <span className="text-base">📈</span>
                              <div>
                                <span className="font-black text-xs sm:text-sm block">
                                  {isAr ? 'السعة الاحتياطية (SPARE CAPACITY)' : 'SPARE CAPACITY (احتياطي مستقبلي)'}
                                </span>
                                <span className="text-2xs text-slate-500 dark:text-gray-400 font-medium block">
                                  {isAr ? 'مضافة للتوسعات والنمو المستقبلي' : 'Added for future load expansions'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Column 2: CATEGORY / TYPE */}
                          <td className="py-3.5 px-3.5 text-center border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 3: AREA / POWER */}
                          <td className="py-3.5 px-3.5 text-center border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 4: LOAD DENSITY / FORMULA */}
                          <td className="py-3.5 px-3.5 text-center border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-amber-900/80 dark:text-amber-300/80 font-semibold">
                            Total Demand × (1 + Spare %)
                          </td>

                          {/* Column 5: TOTAL CONNECTED (kVA) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 6: DEMAND FACTOR (Editable Spare Capacity %) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-amber-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                            <div className="flex items-center justify-center gap-1" dir="ltr">
                              <input
                                type="text"
                                inputMode="decimal"
                                dir="ltr"
                                lang="en"
                                style={{ direction: 'ltr', textAlign: 'center' }}
                                value={toEnglishDigits(spareCapacityPercent)}
                                onChange={(e) => setSpareCapacityPercent(toEnglishDigits(e.target.value).replace(/[^0-9.]/g, ''))}
                                onKeyDown={handleArabicDigitsKeyDown}
                                onPaste={handleNumericPaste}
                                className="w-18 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-amber-400 dark:border-amber-600 focus:border-amber-700 font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-amber-300 focus:outline-hidden shadow-2xs"
                                title="Spare Capacity % (نسبة السعة الاحتياطية)"
                                placeholder="20"
                              />
                              <span className="font-mono font-extrabold text-xs sm:text-sm text-amber-900 dark:text-amber-300 select-none">%</span>
                            </div>
                          </td>

                          {/* Column 7: TOTAL DEMAND LOAD (kVA) */}
                          <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl text-amber-950 dark:text-amber-200 tracking-tight">
                            <span dir="ltr" className="inline-block bg-amber-500 dark:bg-amber-600 text-slate-950 dark:text-white border border-amber-600 dark:border-amber-500 px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg">
                              {formatEnglishNumber(finalLoadWithSpare, 1, 1)} kVA
                            </span>
                          </td>
                        </tr>

                        {/* ROW 4: TRANSFORMER LOADING RATIO */}
                        <tr className="bg-slate-50/90 dark:bg-gray-800/80 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t border-slate-200 dark:border-gray-700">
                          {/* Column 1: ITEM NAME */}
                          <td className="py-3.5 px-3.5 border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l text-slate-900 dark:text-white">
                            <div className="flex items-start gap-2">
                              <span className="text-base">⚙️</span>
                              <div>
                                <span className="font-black text-xs sm:text-sm block">
                                  {isAr ? 'نسبة تحميل المحول (TRANSFORMER LOADING RATIO)' : 'TRANSFORMER LOADING RATIO (نسبة تحميل المحول)'}
                                </span>
                                <span className="text-2xs text-slate-500 dark:text-gray-400 font-medium block">
                                  {isAr ? 'الحد الأقصى الموصى به: 80%' : 'Max recommended: 80%'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Column 2: CATEGORY / TYPE */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 3: AREA / POWER */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 4: LOAD DENSITY / FORMULA */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-slate-300 font-semibold">
                            Total Load with Spare / (Loading Ratio / 100)
                          </td>

                          {/* Column 5: TOTAL CONNECTED (kVA) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 6: DEMAND FACTOR (Editable Loading Ratio %) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="flex items-center justify-center gap-1" dir="ltr">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  dir="ltr"
                                  lang="en"
                                  style={{ direction: 'ltr', textAlign: 'center' }}
                                  value={toEnglishDigits(transformerLoadingRatio)}
                                  onChange={(e) => setTransformerLoadingRatio(toEnglishDigits(e.target.value).replace(/[^0-9.]/g, ''))}
                                  onBlur={() => {
                                    if (transformerLoadingRatio === '' || Number(transformerLoadingRatio) <= 0) {
                                      setTransformerLoadingRatio(80);
                                    }
                                  }}
                                  onKeyDown={handleArabicDigitsKeyDown}
                                  onPaste={handleNumericPaste}
                                  className="w-18 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                  title="Transformer Loading Ratio % (نسبة تحميل المحول)"
                                  placeholder="80"
                                />
                                <span className="font-mono font-extrabold text-xs sm:text-sm text-slate-700 dark:text-slate-300 select-none">%</span>
                              </div>
                              {Number(transformerLoadingRatio) > 80 && (
                                <span className="text-[10px] leading-tight text-red-600 dark:text-red-400 font-bold text-center max-w-[210px]">
                                  {isAr
                                    ? '⚠️ Warning: Exceeding 80% exceeds standard code limits and requires consultant approval.'
                                    : '⚠️ Warning: Exceeding 80% exceeds standard code limits and requires consultant approval.'}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Column 7: TOTAL DEMAND LOAD (Required Transformer kVA) */}
                          <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl text-slate-900 dark:text-white tracking-tight">
                            <span dir="ltr" className="inline-block bg-slate-900 dark:bg-slate-700 text-white border border-slate-950 dark:border-slate-600 px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg">
                              {formatEnglishNumber(requiredTransformerKva, 1, 1)} kVA
                            </span>
                          </td>
                        </tr>

                        {/* ROW 5: SELECTED TRANSFORMER & QUANTITY */}
                        <tr className="bg-slate-100/70 dark:bg-gray-800/90 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t border-slate-200 dark:border-gray-700">
                          {/* Column 1: ITEM NAME */}
                          <td className="py-3.5 px-3.5 border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l text-slate-900 dark:text-white">
                            <div className="flex items-start gap-2">
                              <span className="text-base">🔌</span>
                              <div>
                                <span className="font-black text-xs sm:text-sm block">
                                  {isAr ? 'المحول المختار (SELECTED TRANSFORMER)' : 'SELECTED TRANSFORMER (المحول المختار)'}
                                </span>
                                <span className="text-2xs text-slate-500 dark:text-gray-400 font-medium block">
                                  {isAr ? 'Standard Schneider Sizes' : 'Standard Schneider Sizes'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Column 2: CATEGORY / TYPE */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 3: AREA / POWER */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-xs text-slate-700 dark:text-gray-300 font-bold">
                            <span dir="ltr">{formatEnglishInt(totalInstalledTransformerKva)} kVA</span>
                          </td>

                          {/* Column 4: LOAD DENSITY / FORMULA */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-slate-300 font-semibold">
                            Total Load with Spare / (Size × Qty)
                          </td>

                          {/* Column 5: TOTAL CONNECTED (kVA) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 6: DEMAND FACTOR (Selected Transformer Size Dropdown + Quantity Input with Labels) */}
                          <td className="py-3 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                            <div className="flex items-center justify-center gap-3" dir="ltr">
                              {/* Transformer Size Group */}
                              <div className="flex flex-col items-start gap-1">
                                <label className="text-2xs sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-left">
                                  TRANSFORMER SIZE (قدرة المحول)
                                </label>
                                <select
                                  value={selectedTransformerSize}
                                  onChange={(e) => setSelectedTransformerSize(Number(e.target.value))}
                                  className="w-full bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-bold text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs cursor-pointer"
                                  title="Selected Transformer Size (kVA)"
                                >
                                  {STANDARD_SCHNEIDER_TRANSFORMER_SIZES.map((size) => (
                                    <option key={size} value={size}>
                                      {size} kVA
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Quantity Group */}
                              <div className="flex flex-col items-start gap-1">
                                <label className="text-2xs sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-left">
                                  QTY (العدد)
                                </label>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  dir="ltr"
                                  lang="en"
                                  style={{ direction: 'ltr', textAlign: 'center' }}
                                  value={toEnglishDigits(transformerQuantity)}
                                  onChange={(e) => setTransformerQuantity(toEnglishDigits(e.target.value).replace(/[^0-9]/g, ''))}
                                  onBlur={() => {
                                    if (transformerQuantity === '' || Number(transformerQuantity) < 1) {
                                      setTransformerQuantity(1);
                                    }
                                  }}
                                  onKeyDown={handleArabicDigitsKeyDown}
                                  onPaste={handleNumericPaste}
                                  className="w-16 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                  title="Transformer Quantity (العدد)"
                                  placeholder="1"
                                />
                              </div>
                            </div>
                          </td>

                          {/* Column 7: TOTAL DEMAND LOAD (ACTUAL LOADING RATIO %) */}
                          <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl tracking-tight">
                            <span
                              dir="ltr"
                              className={`inline-block px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg border ${
                                actualLoadingRatio < 80
                                  ? 'bg-emerald-600 text-white border-emerald-700'
                                  : 'bg-red-600 text-white border-red-700'
                              }`}
                            >
                              {formatEnglishNumber(actualLoadingRatio, 1, 1)}%
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              );
            })()}

        {/* ============================================================== */}
        {/* 4th: "Calculation Result" card (previously right sidebar)        */}
        {/* ============================================================== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/90 dark:border-gray-700 shadow-2xs p-6 space-y-6">
          {/* Header Title */}
          <div className="border-b border-slate-200 dark:border-gray-700 pb-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span className="text-[11px] font-extrabold text-[#1E3A8A] dark:text-blue-300 uppercase tracking-wider block">
                {isAr ? 'تقرير الحساب الهندسي' : 'CALCULATION RESULT'}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <span>Engineering Sizing Report</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              {isAr
                ? `محسوب وفق معايير ${selectedStandardId.toUpperCase()} مع تطبيق معاملات التزامن`
                : `Sized per ${selectedStandardId.toUpperCase()} methodology with applied coincidence factors`}
            </p>
          </div>

          {/* 3 KPI CARDS IN A BALANCED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CARD 1: TOTAL CONNECTED LOAD */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">
                TOTAL CONNECTED LOAD
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span dir="ltr" className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                  {formatEnglishNumber(totalConnectedKva, 1, 1)}
                </span>
                <span className="text-sm font-bold text-slate-600 dark:text-gray-300">kVA</span>
                <span dir="ltr" className="text-xs font-mono font-bold text-slate-400 dark:text-gray-400">
                  ({formatEnglishNumber(totalConnectedKva * powerFactor, 1, 1)} kW)
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-gray-400 font-medium mt-2 pt-2 border-t border-slate-100 dark:border-gray-700 flex justify-between">
                <span dir="ltr">Base: {formatEnglishNumber(buildingConnectedKva, 1, 1)} kVA</span>
                <span dir="ltr">Pumps & Extras: {formatEnglishNumber(totalPumpsKva + totalExtraLoadsKva, 1, 1)} kVA</span>
              </div>
            </div>

            {/* CARD 2: SIMULTANEOUS MAXIMUM DEMAND */}
            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-300 block uppercase tracking-wider">
                SIMULTANEOUS MAXIMUM DEMAND
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span dir="ltr" className="text-3xl font-black text-[#1E3A8A] dark:text-blue-200 font-mono tabular-nums">
                  {formatEnglishNumber(activeResults.demandKva, 1, 1)}
                </span>
                <span className="text-sm font-bold text-blue-900 dark:text-blue-300">kVA</span>
                <span dir="ltr" className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                  ({formatEnglishNumber(activeResults.estimatedKw, 1, 1)} kW)
                </span>
              </div>
              <div className="text-[11px] font-semibold text-blue-800/80 dark:text-blue-300 mt-2 pt-2 border-t border-blue-100 dark:border-blue-900/60">
                {isAr ? 'معامل التزامن الكلي:' : 'Overall System Diversity:'}{' '}
                <span dir="ltr" className="font-mono font-bold">
                  {formatEnglishInt((activeResults.demandKva / (totalConnectedKva || 1)) * 100)}%
                </span>
              </div>
            </div>

            {/* CARD 3: RECOMMENDED SUBSTATION TRANSFORMER */}
            <div className="p-4 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider">
                RECOMMENDED SUBSTATION TRANSFORMER
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span dir="ltr" className="text-3xl font-black text-emerald-900 dark:text-emerald-200 font-mono tabular-nums">
                  {formatEnglishInt(activeResults.transformerKva)}
                </span>
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">kVA (3-Phase)</span>
              </div>
              <p className="text-[11px] text-emerald-900/90 dark:text-emerald-300 mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/60 leading-snug font-medium">
                {isAr
                  ? `توفير هامش نمو وتوسع 20%. نسبة تحميل المحول: ${formatEnglishNumber(((activeResults.demandKva / (activeResults.transformerKva || 1)) * 100), 1, 1)}%.`
                  : `Sized with 20% future growth margin. Projected operating load: ${formatEnglishNumber(((activeResults.demandKva / (activeResults.transformerKva || 1)) * 100), 1, 1)}%.`}
              </p>
            </div>
          </div>

          {/* Action Buttons: 3 buttons side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Button 1: [ Print Engineering Sheet ] */}
            <button
              type="button"
              onClick={() => window.print()}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow"
            >
              <Printer className="w-4 h-4 text-blue-300" />
              <span>{isAr ? 'طباعة تقرير الحساب الهندسي' : 'Print Engineering Sheet'}</span>
            </button>

            {/* Button 2: [ 📥 Export to Excel ] */}
            <button
              type="button"
              onClick={handleExportToExcel}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow"
            >
              <span className="text-sm">📥</span>
              <span>{isAr ? 'تصدير النتائج إلى Excel' : 'Export to Excel'}</span>
            </button>

            {/* Button 3: [ Return to Step 1 Overview ] */}
            <button
              type="button"
              onClick={onBackToOverview}
              className="py-3 px-4 rounded-xl border border-slate-300 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 active:bg-slate-200 dark:active:bg-gray-600 text-slate-800 dark:text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180 text-slate-600 dark:text-gray-300" />
              <span>{isAr ? 'العودة إلى الخطوة 1: النظرة العامة' : 'Return to Step 1 Overview'}</span>
            </button>
          </div>
        </div>
      </div>


      {/* Compare Calculations Modal */}
      {isCompareModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-gray-700 bg-[#F8FAFC] dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
                  📊
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {isAr ? 'مقارنة الحسابات الهندسية بين الأكواد' : 'Compare Calculations Across Codes'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">
                    Category: <span className="font-bold text-slate-700 dark:text-gray-200">{buildingType}</span> · Built-Up Area: <span dir="ltr" className="font-bold text-slate-700 dark:text-gray-200">{formatEnglishInt(areaSquareMeters)} m²</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Checkboxes Section */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-gray-200">
                    {isAr ? 'حدد الأكواد المراد مقارنتها:' : 'Select Codes to Compare:'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">
                    {displayedCompareCodes.length} {isAr ? 'أكواد معروضة في الجدول' : 'codes displayed'}
                  </span>
                </div>

                {/* 4 Checkboxes: [x] Egyptian Code, [x] Saudi Code, [x] IEC Code, [ ] NEC Code */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'egypt' as const, label: isAr ? 'الكود المصري' : 'Egyptian Code' },
                    { id: 'saudi' as const, label: isAr ? 'الكود السعودي' : 'Saudi Code' },
                    { id: 'europe' as const, label: isAr ? 'الكود الأوروبي (IEC)' : 'IEC Code' },
                    { id: 'usa' as const, label: isAr ? 'الكود الأمريكي (NEC)' : 'NEC Code' },
                  ].map((code) => {
                    const isChecked = !!compareCheckboxes[code.id];
                    return (
                      <label
                        key={code.id}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-white dark:bg-gray-800 border-[#1E3A8A] dark:border-blue-500 shadow-2xs ring-1 ring-blue-600/30'
                            : 'bg-white/60 dark:bg-gray-800/60 border-slate-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCompareCheckbox(code.id)}
                          className="w-4 h-4 rounded text-[#1E3A8A] accent-[#1E3A8A] cursor-pointer shrink-0"
                        />
                        <FlagIcon country={code.id} className="w-5 h-3.5 rounded-2xs border border-slate-200 dark:border-gray-700 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {code.label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Generate Comparison Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleGenerateComparison}
                    className="py-2.5 px-6 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 active:bg-blue-950 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs hover:shadow cursor-pointer"
                  >
                    <span>⚡</span>
                    <span>{isAr ? 'توليد المقارنة' : 'Generate Comparison'}</span>
                  </button>
                </div>
              </div>

              {/* Comparative Table: Displaying ONLY the checked codes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                    {isAr ? 'جدول المقارنة الهندسية' : 'Comparative Table'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                    Filtered by active selection
                  </span>
                </div>

                {displayedCompareCodes.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 dark:bg-gray-900/60 rounded-xl border border-dashed border-slate-300 dark:border-gray-700 text-slate-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                    {isAr
                      ? 'يرجى تحديد كود واحد على الأقل أعلاه ثم الضغط على زر "توليد المقارنة".'
                      : 'Please select at least one code above and click "Generate Comparison" to display the comparative table.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-gray-900 shadow-[0_2px_4px_rgba(0,0,0,0.06)] border-b-2 border-slate-300 dark:border-gray-600">
                        <tr className="text-slate-800 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider bg-slate-100 dark:bg-gray-900">
                          <th className="py-3.5 px-4 border-b-2 border-r border-slate-300 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-bold text-slate-900 dark:text-white">
                            Standard
                          </th>
                          <th className="py-3.5 px-4 text-center border-b-2 border-r border-slate-300 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-bold text-slate-800 dark:text-gray-300">
                            Connected kVA
                          </th>
                          <th className="py-3.5 px-4 text-center border-b-2 border-r border-slate-300 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-black text-[#1E3A8A] dark:text-blue-300">
                            Demand kVA
                          </th>
                          <th className="py-3.5 px-4 text-center border-b-2 border-r border-slate-300 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-bold text-slate-800 dark:text-gray-300">
                            Estimated kW
                          </th>
                          <th className="py-3.5 px-4 text-center border-b-2 border-slate-300 dark:border-gray-600 font-extrabold text-emerald-800 dark:text-emerald-300">
                            Transformer Sizing
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-gray-700 font-medium">
                        {STANDARDS_DATA.filter((std) => displayedCompareCodes.includes(std.id)).map((std, idx) => {
                          const res = calculateStandardResults(std.id);
                          const isCurrent = std.id === selectedStandardId;

                          return (
                            <tr
                              key={std.id}
                              className={`transition-colors ${
                                isCurrent
                                  ? 'bg-blue-50/90 dark:bg-blue-950/60 font-bold text-slate-900 dark:text-white'
                                  : idx % 2 === 0
                                  ? 'bg-white dark:bg-gray-800 hover:bg-slate-50/80 dark:hover:bg-gray-700/60'
                                  : 'bg-[#F8FAFC] dark:bg-gray-900/50 hover:bg-slate-50/80 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              {/* Standard (with Flag) */}
                              <td className="py-3 px-4 border-b border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                                <div className="flex items-center gap-3">
                                  <FlagIcon country={std.id} className="w-6 h-4 rounded-2xs border border-slate-300 dark:border-gray-600 shadow-2xs shrink-0" />
                                  <div>
                                    <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                                      <span>{isAr ? std.codeNameAr : std.codeName}</span>
                                      {isCurrent && (
                                        <span className="text-[10px] bg-[#1E3A8A] text-white px-2 py-0.5 rounded-full font-bold">
                                          {isAr ? 'الكود النشط' : 'Active'}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono block">
                                      {std.id === 'egypt'
                                        ? egyptSubStandard === 'acud'
                                          ? 'ACUD Standards'
                                          : 'ECP 203 Regulations'
                                        : std.standardReference.split('/')[0]}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Connected kVA */}
                              <td className="py-3 px-4 text-center font-mono font-bold text-slate-700 dark:text-gray-300 border-b border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l tabular-nums">
                                <span dir="ltr">{formatEnglishNumber(res.connectedKva, 1, 1)} kVA</span>
                              </td>

                              {/* Demand kVA */}
                              <td className="py-3 px-4 text-center font-mono font-black text-[#1E3A8A] dark:text-blue-300 border-b border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l tabular-nums text-sm sm:text-base">
                                <span dir="ltr">{formatEnglishNumber(res.demandKva, 1, 1)} kVA</span>
                              </td>

                              {/* Estimated kW */}
                              <td className="py-3 px-4 text-center font-mono font-bold text-slate-800 dark:text-gray-300 border-b border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l tabular-nums">
                                <span dir="ltr">{formatEnglishNumber(res.estimatedKw, 1, 1)} kW</span>
                              </td>

                              {/* Transformer Sizing */}
                              <td className="py-3 px-4 text-center font-mono font-extrabold text-emerald-800 dark:text-emerald-300 border-b border-slate-200 dark:border-gray-700 tabular-nums text-sm sm:text-base">
                                <span dir="ltr" className="inline-block px-3 py-1 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800">
                                  {formatEnglishInt(res.transformerKva)} kVA
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-gray-900 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                {displayedCompareCodes.length} codes compared
              </span>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="py-2 px-5 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-800 dark:text-gray-200 font-bold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
