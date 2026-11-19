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
  FileSpreadsheet,
  Download,
  X,
  ChevronDown,
} from 'lucide-react';
import { STANDARDS_DATA } from '../data/standardsData';
import { FlagIcon } from './Flags';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  lookupSaudiC1C2ByArea,
  SaudiC1C2Category,
  SaudiVoltageOption,
  SaudiC1C2LookupResult,
} from '../data/c1c2TablesData';
import { SAUDI_TABLE_19, SAUDI_TABLE_20, SAUDI_TABLE_21 } from '../data/saudiCodeData';

export type StandardId = 'egypt' | 'saudi' | 'europe' | 'usa';

export interface CalculationStepProps {
  onBackToOverview: () => void;
  onBackToHome?: () => void;
  lang: Language;
  isDarkMode?: boolean;
  // Lifted persistent project state from App.tsx
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  selectedStandardId: StandardId;
  setSelectedStandardId: React.Dispatch<React.SetStateAction<StandardId>>;
  egyptSubStandard: 'ecp203' | 'acud';
  setEgyptSubStandard: React.Dispatch<React.SetStateAction<'ecp203' | 'acud'>>;
  egyptLocationType: 'cities' | 'villages';
  setEgyptLocationType: React.Dispatch<React.SetStateAction<'cities' | 'villages'>>;
  egyptBuildingCategory: 'residential' | 'commercial_admin';
  setEgyptBuildingCategory: React.Dispatch<React.SetStateAction<'residential' | 'commercial_admin'>>;
  egyptCityDistrictType: 'low_middle' | 'upscale';
  setEgyptCityDistrictType: React.Dispatch<React.SetStateAction<'low_middle' | 'upscale'>>;
  acudActivityId: string;
  setAcudActivityId: React.Dispatch<React.SetStateAction<string>>;
  acudEvChargers: number;
  setAcudEvChargers: React.Dispatch<React.SetStateAction<number>>;
  sharedCategory: OccupancyCategory;
  setSharedCategory: React.Dispatch<React.SetStateAction<OccupancyCategory>>;
  iecCategory: string;
  setIecCategory: React.Dispatch<React.SetStateAction<string>>;
  necCategory: string;
  setNecCategory: React.Dispatch<React.SetStateAction<string>>;
  areaSquareMeters: number;
  setAreaSquareMeters: React.Dispatch<React.SetStateAction<number>>;
  saudiSelectedCategory: SaudiCategoryItem;
  setSaudiSelectedCategory: React.Dispatch<React.SetStateAction<SaudiCategoryItem>>;
  saudiLoadDensityVA: number;
  setSaudiLoadDensityVA: React.Dispatch<React.SetStateAction<number>>;
  saudiDemandFactor: number;
  setSaudiDemandFactor: React.Dispatch<React.SetStateAction<number>>;
  iecSelectedCategory: IecOccupancyCategory;
  setIecSelectedCategory: React.Dispatch<React.SetStateAction<IecOccupancyCategory>>;
  iecDemandType: IecDemandType;
  setIecDemandType: React.Dispatch<React.SetStateAction<IecDemandType>>;
  iecPowerFactor: number | string;
  setIecPowerFactor: React.Dispatch<React.SetStateAction<number | string>>;
  saudiC1C2Voltage: SaudiVoltageOption;
  setSaudiC1C2Voltage: React.Dispatch<React.SetStateAction<SaudiVoltageOption>>;
  saudiC1C2Area: number | string;
  setSaudiC1C2Area: React.Dispatch<React.SetStateAction<number | string>>;
  hasAdditionalLoads: boolean;
  setHasAdditionalLoads: React.Dispatch<React.SetStateAction<boolean>>;
  needsTransformer: boolean;
  setNeedsTransformer: React.Dispatch<React.SetStateAction<boolean>>;
  buildingsList: BuildingItem[];
  setBuildingsList: React.Dispatch<React.SetStateAction<BuildingItem[]>>;
  numberOfAreas: number | string;
  setNumberOfAreas: React.Dispatch<React.SetStateAction<number | string>>;
  buildingAreas: (number | string)[];
  setBuildingAreas: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  pumps: PumpItem[];
  setPumps: React.Dispatch<React.SetStateAction<PumpItem[]>>;
  extraLoads: ExtraLoadItem[];
  setExtraLoads: React.Dispatch<React.SetStateAction<ExtraLoadItem[]>>;
  iecExtraLoads: IecExtraLoadItem[];
  setIecExtraLoads: React.Dispatch<React.SetStateAction<IecExtraLoadItem[]>>;
  projectDiversityFactor: number | string;
  setProjectDiversityFactor: React.Dispatch<React.SetStateAction<number | string>>;
  necDiversityFactor: number | string;
  setNecDiversityFactor: React.Dispatch<React.SetStateAction<number | string>>;
  numberOfMeters: number | string;
  setNumberOfMeters: React.Dispatch<React.SetStateAction<number | string>>;
  coincidentFactor: number;
  setCoincidentFactor: React.Dispatch<React.SetStateAction<number>>;
  spareCapacityPercent: number | string;
  setSpareCapacityPercent: React.Dispatch<React.SetStateAction<number | string>>;
  transformerLoadingRatio: number | string;
  setTransformerLoadingRatio: React.Dispatch<React.SetStateAction<number | string>>;
  egyptTransformerSize: number;
  setEgyptTransformerSize: React.Dispatch<React.SetStateAction<number>>;
  egyptTransformerQty: number | string;
  setEgyptTransformerQty: React.Dispatch<React.SetStateAction<number | string>>;
  saudiTransformerSize: number;
  setSaudiTransformerSize: React.Dispatch<React.SetStateAction<number>>;
  saudiTransformerQty: number | string;
  setSaudiTransformerQty: React.Dispatch<React.SetStateAction<number | string>>;
  iecTransformerSize: number;
  setIecTransformerSize: React.Dispatch<React.SetStateAction<number>>;
  iecTransformerQty: number | string;
  setIecTransformerQty: React.Dispatch<React.SetStateAction<number | string>>;
  necTransformerSize: number;
  setNecTransformerSize: React.Dispatch<React.SetStateAction<number>>;
  necTransformerQty: number | string;
  setNecTransformerQty: React.Dispatch<React.SetStateAction<number | string>>;
  buildingsDemandFactorOverrides: Record<string, number | string>;
  setBuildingsDemandFactorOverrides: React.Dispatch<React.SetStateAction<Record<string, number | string>>>;
  pumpsDemandFactorOverrides: Record<string | number, number | string>;
  setPumpsDemandFactorOverrides: React.Dispatch<React.SetStateAction<Record<string | number, number | string>>>;
  extraLoadsDemandFactorOverrides: Record<string | number, number | string>;
  setExtraLoadsDemandFactorOverrides: React.Dispatch<React.SetStateAction<Record<string | number, number | string>>>;
}

export type PumpPowerUnit = 'HP' | 'W' | 'kVA';
export type ExtraLoadUnit = 'kVA' | 'W';

export interface PumpItem {
  id: string | number;
  name: string;
  nameAr?: string;
  power: number | string;
  unit: PumpPowerUnit;
  efficiency: number | string;
  pf: number | string;
  category?: 'water' | 'fire' | 'drainage' | 'hvac';
  demandFactor?: number;
}

export interface ExtraLoadItem {
  id: string | number;
  name: string;
  nameAr?: string;
  power: number | string;
  unit: ExtraLoadUnit;
  category?: 'transport' | 'security' | 'ev' | 'general';
  qty?: number;
  demandFactor?: number;
}

export interface IecExtraLoadItem {
  id: string;
  name: string;
  category: 'Functional Area' | 'Installation' | 'Heating/Cooling';
  area: number | string;
  directPowerKw: number | string;
  sf: number;
}

export type NecLoadType = 'Lighting' | 'Power' | 'HVAC' | 'Additional';

export interface NecFloorLoadItem {
  id: string;
  type: NecLoadType;
  label: string;
  densityOrPower: number | string;
  demandFactor: number | string;
}

export const createDefaultNecLoads = (
  lightingDensity: number,
  fl?: Partial<FloorRowItem>
): NecFloorLoadItem[] => [
  {
    id: 'lighting',
    type: 'Lighting',
    label: 'Lighting',
    densityOrPower: lightingDensity,
    demandFactor: 1.0,
  },
  {
    id: 'power',
    type: 'Power',
    label: 'Power / Sockets',
    densityOrPower: fl?.necPowerDensity ?? 20,
    demandFactor: fl?.necPowerDf ?? 0.5,
  },
  {
    id: 'hvac',
    type: 'HVAC',
    label: 'HVAC',
    densityOrPower: fl?.necHvacDensity ?? 50,
    demandFactor: fl?.necHvacDf ?? 1.0,
  },
  {
    id: 'additional',
    type: 'Additional',
    label: 'Additional',
    densityOrPower: fl?.necAdditionalKva ?? 0,
    demandFactor: fl?.necAdditionalDf ?? 1.0,
  },
];

export interface FloorRowItem {
  id: string;
  name: string;
  floorsCount: number | string;
  areaPerFloor: number | string;
  demandFactor?: number | string;
  appliedLoadDensity?: number;
  necPowerDensity?: number | string;
  necPowerDf?: number | string;
  necHvacDensity?: number | string;
  necHvacDf?: number | string;
  necAdditionalKva?: number | string;
  necAdditionalDf?: number | string;
  loads?: NecFloorLoadItem[];
}

export type SaudiLoadEstimationType = 'standard' | 'no_ac' | 'winter_peak';

export interface BuildingItem {
  id: string;
  name: string;
  buildingType: OccupancyCategory;
  iecBuildingType?: string;
  necBuildingType?: string;
  isTypeCustomized?: boolean;
  saudiLoadEstimationType?: SaudiLoadEstimationType;
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

export const SAUDI_LOAD_ESTIMATION_OPTIONS: {
  value: SaudiLoadEstimationType;
  label: string;
}[] = [
  { value: 'standard', label: '1. Lights + AC + Power Sockets (Standard)' },
  { value: 'no_ac', label: '2. Lights + Power Sockets (No AC / District Cooling)' },
  { value: 'winter_peak', label: '3. Lights + Heating + Power Sockets (Winter Peak)' },
];

export const SAUDI_C3_TO_C29_CATEGORIES = SAUDI_SEC_CATEGORIES.filter(
  (c) => c.code !== 'C1' && c.code !== 'C2'
);

export const getSaudiTable19DensityVA = (
  categoryVal: string | undefined,
  estimationType: SaudiLoadEstimationType = 'standard',
  fallbackCode = 'C7'
): number => {
  const cat = getSaudiCategoryByCodeOrName(categoryVal);
  const resolvedCode =
    cat && cat.code !== 'C1' && cat.code !== 'C2'
      ? cat.code
      : fallbackCode !== 'C1' && fallbackCode !== 'C2'
      ? fallbackCode
      : 'C7';
  const row = SAUDI_TABLE_19.find((r) => r.code === resolvedCode) || SAUDI_TABLE_19.find((r) => r.code === 'C7');
  if (!row) return 176;
  if (estimationType === 'no_ac') return Number(row.withoutAcVA) || Number(row.areaBasedVA) || 176;
  if (estimationType === 'winter_peak') return Number(row.winterPeakVA) || Number(row.areaBasedVA) || 176;
  return Number(row.areaBasedVA) || 176;
};

export const calculateSaudiC1C2Lookup = (
  category: SaudiC1C2Category,
  constructedArea: number,
  voltage: SaudiVoltageOption = '400V'
): SaudiC1C2LookupResult => lookupSaudiC1C2ByArea(category, constructedArea, voltage);

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

export type IecDemandType = 'min' | 'avg' | 'max';

export interface IecOccupancyCategory {
  label: string;
  value: string;
  min: number;
  avg: number;
  max: number;
  sf: number;
}

export const IEC_OCCUPANCY_CATEGORIES: IecOccupancyCategory[] = [
  { label: "Bank", value: "Bank", min: 40, avg: 55, max: 70, sf: 0.6 },
  { label: "Library", value: "Library", min: 20, avg: 30, max: 40, sf: 0.6 },
  { label: "Office", value: "Office", min: 30, avg: 40, max: 50, sf: 0.6 },
  { label: "Shopping center", value: "Shopping center", min: 30, avg: 45, max: 60, sf: 0.6 },
  { label: "Hotel", value: "Hotel", min: 30, avg: 45, max: 60, sf: 0.6 },
  { label: "Department store", value: "Department store", min: 30, avg: 45, max: 60, sf: 0.6 },
  { label: "Small hospital (40-80 beds)", value: "Small hospital", min: 250, avg: 325, max: 400, sf: 0.6 },
  { label: "Hospital (200-500 beds)", value: "Hospital", min: 50, avg: 65, max: 80, sf: 0.6 },
  { label: "Warehouse (no cooling)", value: "Warehouse", min: 2, avg: 11, max: 20, sf: 0.6 },
  { label: "Cold store", value: "Cold store", min: 500, avg: 1000, max: 1500, sf: 0.6 },
  { label: "Apartment complex", value: "Apartment complex", min: 10, avg: 20, max: 30, sf: 0.6 },
  { label: "Museum", value: "Museum", min: 60, avg: 70, max: 80, sf: 0.6 },
  { label: "Parking garage", value: "Parking garage", min: 3, avg: 6.5, max: 10, sf: 0.6 },
  { label: "Production plant", value: "Production plant", min: 30, avg: 55, max: 80, sf: 0.6 },
  { label: "Data center", value: "Data center", min: 500, avg: 1250, max: 2000, sf: 1.0 },
  { label: "School", value: "School", min: 10, avg: 20, max: 30, sf: 0.6 },
  { label: "Gym hall", value: "Gym hall", min: 15, avg: 22.5, max: 30, sf: 0.6 },
  { label: "Stadium (40,000-80,000 seats)", value: "Stadium", min: 70, avg: 95, max: 120, sf: 0.6 },
  { label: "Old people's home", value: "Old people's home", min: 15, avg: 22.5, max: 30, sf: 0.6 },
  { label: "Greenhouse (artificial lighting)", value: "Greenhouse", min: 250, avg: 375, max: 500, sf: 1.0 }
];

export const getIecCategoryByValue = (val: string | undefined): IecOccupancyCategory => {
  if (!val) return IEC_OCCUPANCY_CATEGORIES[2]; // Office (min: 30, avg: 40, max: 50, sf: 0.6)
  const trimmed = val.trim().toLowerCase();
  return (
    IEC_OCCUPANCY_CATEGORIES.find(
      (c) => c.value.toLowerCase() === trimmed || c.label.toLowerCase() === trimmed
    ) || IEC_OCCUPANCY_CATEGORIES[2]
  );
};

export const getIecBasementCategory = (): IecOccupancyCategory =>
  getIecCategoryByValue('Parking garage');

export const formatIecOptionLabel = (cat: IecOccupancyCategory, demandType: IecDemandType): string => {
  const typeLabel = demandType === 'min' ? 'Min' : demandType === 'max' ? 'Max' : 'Avg';
  const unit = cat.value === 'Stadium' ? 'W/seat' : 'W/m²';
  const sfStr = Number.isInteger(cat.sf) ? cat.sf.toFixed(1) : String(cat.sf);
  return `${cat.label} (${typeLabel}: ${cat[demandType]} ${unit}, SF: ${sfStr})`;
};

export interface NecOccupancyCategory {
  label: string;
  value: string;
  vaPerM2: number;
}

export const NEC_OCCUPANCY_CATEGORIES: NecOccupancyCategory[] = [
  { label: 'Armories and auditoriums (11)', value: 'Armories and auditoriums', vaPerM2: 11 },
  { label: 'Banks (39)', value: 'Banks', vaPerM2: 39 },
  { label: 'Barber shops and beauty parlors (33)', value: 'Barber shops and beauty parlors', vaPerM2: 33 },
  { label: 'Churches (11)', value: 'Churches', vaPerM2: 11 },
  { label: 'Clubs (22)', value: 'Clubs', vaPerM2: 22 },
  { label: 'Court Rooms (22)', value: 'Court Rooms', vaPerM2: 22 },
  { label: 'Dwelling Units (33)', value: 'Dwelling Units', vaPerM2: 33 },
  { label: 'Garages – commercial (storage) (6)', value: 'Garages – commercial (storage)', vaPerM2: 6 },
  { label: 'Hospitals (22)', value: 'Hospitals', vaPerM2: 22 },
  { label: 'Hotels and motels (22)', value: 'Hotels and motels', vaPerM2: 22 },
  { label: 'Industrial commercial (loft) buildings (22)', value: 'Industrial commercial (loft) buildings', vaPerM2: 22 },
  { label: 'Lodge rooms (17)', value: 'Lodge rooms', vaPerM2: 17 },
  { label: 'Office buildings (39)', value: 'Office buildings', vaPerM2: 39 },
  { label: 'Restaurants (22)', value: 'Restaurants', vaPerM2: 22 },
  { label: 'Schools (33)', value: 'Schools', vaPerM2: 33 },
  { label: 'Stores (33)', value: 'Stores', vaPerM2: 33 },
  { label: 'Warehouses (storage) (3)', value: 'Warehouses (storage)', vaPerM2: 3 },
  { label: 'Assembly halls and auditoriums (11)', value: 'Assembly halls and auditoriums', vaPerM2: 11 },
  { label: 'Halls, corridors, closets, stairways (6)', value: 'Halls, corridors, closets, stairways', vaPerM2: 6 },
  { label: 'Storage Spaces (3)', value: 'Storage Spaces', vaPerM2: 3 },
];

export const getNecCategoryByValue = (val: string | undefined): NecOccupancyCategory => {
  if (!val) return NEC_OCCUPANCY_CATEGORIES[12]; // Office buildings (39 VA/m²)
  const trimmed = val.trim().toLowerCase();
  return (
    NEC_OCCUPANCY_CATEGORIES.find(
      (c) => c.value.toLowerCase() === trimmed || c.label.toLowerCase() === trimmed
    ) || NEC_OCCUPANCY_CATEGORIES[12]
  );
};

export interface IecExtraLoadOption {
  category: 'Functional Area' | 'Installation' | 'Heating/Cooling';
  name: string;
  min?: number;
  avg?: number;
  max?: number;
  density?: number;
  sf: number;
}

export const IEC_EXTRA_LOADS_DATA: IecExtraLoadOption[] = [
  // Functional Areas
  { category: 'Functional Area', name: 'Hallway / anteroom, lobby', min: 5, avg: 10, max: 15, sf: 0.3 },
  { category: 'Functional Area', name: 'Staircase', min: 5, avg: 10, max: 15, sf: 0.3 },
  { category: 'Functional Area', name: 'Equipment, general', min: 5, avg: 10, max: 15, sf: 0.3 },
  { category: 'Functional Area', name: 'Foyer', min: 10, avg: 20, max: 30, sf: 1.0 },
  { category: 'Functional Area', name: 'Access ways (e.g. tunnel)', min: 10, avg: 15, max: 20, sf: 1.0 },
  { category: 'Functional Area', name: 'Recreation room / kitchenette', min: 20, avg: 35, max: 50, sf: 0.3 },
  { category: 'Functional Area', name: 'Toilet areas', min: 5, avg: 10, max: 15, sf: 1.0 },
  { category: 'Functional Area', name: 'Travel center', min: 60, avg: 70, max: 80, sf: 0.8 },
  { category: 'Functional Area', name: 'Office areas', min: 20, avg: 30, max: 40, sf: 0.8 },
  { category: 'Functional Area', name: 'Newspapers / bookstore', min: 80, avg: 100, max: 120, sf: 0.8 },
  { category: 'Functional Area', name: 'Flower shop', min: 80, avg: 100, max: 120, sf: 0.8 },
  { category: 'Functional Area', name: 'Bakery / butcher', min: 250, avg: 300, max: 350, sf: 0.8 },
  { category: 'Functional Area', name: 'Fruit / vegetables', min: 80, avg: 100, max: 120, sf: 0.8 },
  { category: 'Functional Area', name: 'Bistro / ice cream parlour', min: 150, avg: 200, max: 250, sf: 0.8 },
  { category: 'Functional Area', name: 'Snack bar', min: 180, avg: 200, max: 220, sf: 0.8 },
  { category: 'Functional Area', name: 'Diner / restaurant', min: 180, avg: 290, max: 400, sf: 0.8 },
  { category: 'Functional Area', name: 'Tobacco shop', min: 80, avg: 100, max: 120, sf: 0.8 },
  { category: 'Functional Area', name: 'Hairdresser', min: 220, avg: 250, max: 280, sf: 0.8 },
  { category: 'Functional Area', name: "Dry-cleaner's / laundry", min: 700, avg: 825, max: 950, sf: 0.7 },
  { category: 'Functional Area', name: 'Storage area', min: 5, avg: 10, max: 15, sf: 0.3 },
  { category: 'Functional Area', name: 'Kitchens', min: 200, avg: 300, max: 400, sf: 0.7 },

  // Building Installations (No Area, just SF - direct Power kW input)
  { category: 'Installation', name: 'Escalator', density: 0, sf: 0.5 },
  { category: 'Installation', name: 'Elevator', density: 0, sf: 0.3 },
  { category: 'Installation', name: 'Sanitary systems', density: 0, sf: 0.5 },
  { category: 'Installation', name: 'Sprinklers', density: 0, sf: 0.1 },
  { category: 'Installation', name: 'Heating', density: 0, sf: 0.8 },
  { category: 'Installation', name: 'Air conditioning', density: 0, sf: 0.8 },
  { category: 'Installation', name: 'Cooling water system', density: 0, sf: 0.7 },
  { category: 'Installation', name: 'Refrigeration', density: 0, sf: 0.7 },

  // Heating/Cooling/PV
  { category: 'Heating/Cooling', name: 'Electric floor heating, living area', min: 65, avg: 82.5, max: 100, sf: 1.0 },
  { category: 'Heating/Cooling', name: 'Electric floor heating, bathroom', min: 130, avg: 140, max: 150, sf: 1.0 },
  { category: 'Heating/Cooling', name: 'Night storage heating: low-energy', min: 60, avg: 65, max: 70, sf: 1.0 },
  { category: 'Heating/Cooling', name: 'Night storage heating: standard', min: 100, avg: 105, max: 110, sf: 1.0 },
  { category: 'Heating/Cooling', name: 'Small aircon unit', min: 60, avg: 60, max: 60, sf: 1.0 },
  { category: 'Heating/Cooling', name: 'Photovoltaics', min: 100, avg: 115, max: 130, sf: 1.0 },
];

export const getIecExtraLoadSpec = (name: string): IecExtraLoadOption | undefined =>
  IEC_EXTRA_LOADS_DATA.find((item) => item.name === name);

export const getIecExtraLoadDensity = (
  spec: IecExtraLoadOption | undefined,
  demandType: IecDemandType
): number => {
  if (!spec || spec.density === 0) return 0;
  return spec[demandType] ?? spec.avg ?? 0;
};

export const STANDARD_SCHNEIDER_TRANSFORMER_SIZES = [
  100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500,
];

export const SAUDI_TRANSFORMER_SIZES = [500, 1000, 1500];

export const NEC_TRANSFORMER_SIZES = [
  15, 30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500,
];

// SEC DPS Table 21 Coincident Factor lookup by Number of Meters (N >= 99 capped at 0.563)
export const SAUDI_COINCIDENT_FACTOR_TABLE_21 = [
  1.000, 0.723, 0.688, 0.668, 0.654, 0.644, 0.636, 0.629, 0.624, 0.619,
  0.616, 0.612, 0.609, 0.607, 0.604, 0.602, 0.600, 0.598, 0.597, 0.595,
  0.594, 0.592, 0.591, 0.590, 0.589, 0.588, 0.587, 0.586, 0.585, 0.584,
  0.583, 0.583, 0.582, 0.581, 0.581, 0.580, 0.579, 0.579, 0.578, 0.578,
  0.577, 0.577, 0.576, 0.576, 0.575, 0.575, 0.575, 0.574, 0.574, 0.573,
  0.573, 0.573, 0.572, 0.572, 0.572, 0.571, 0.571, 0.571, 0.570, 0.570,
  0.570, 0.569, 0.569, 0.569, 0.568, 0.568, 0.568, 0.568, 0.568, 0.567,
  0.567, 0.567, 0.567, 0.566, 0.566, 0.566, 0.566, 0.565, 0.565, 0.565,
  0.565, 0.564, 0.564, 0.564, 0.564, 0.564, 0.563, 0.563, 0.563, 0.563,
  0.563, 0.563, 0.563, 0.563, 0.563, 0.563, 0.563, 0.563, 0.563, // Index 98 = 99 meters
];

export const getSaudiCoincidentFactor = (meters: number): number => {
  if (!Number.isFinite(meters)) return 1.000;
  const n = Math.floor(meters);
  if (n >= 99) return 0.563; // Cap at the last table value for 99 and above
  if (n < 1) return 1.000;
  return SAUDI_COINCIDENT_FACTOR_TABLE_21[n - 1];
};

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

export const CalculationStep: React.FC<CalculationStepProps> = ({
  onBackToOverview,
  onBackToHome,
  lang,
  isDarkMode,
  projectName,
  setProjectName,
  selectedStandardId,
  setSelectedStandardId,
  egyptSubStandard,
  setEgyptSubStandard,
  egyptLocationType,
  setEgyptLocationType,
  egyptBuildingCategory,
  setEgyptBuildingCategory,
  egyptCityDistrictType,
  setEgyptCityDistrictType,
  acudActivityId,
  setAcudActivityId,
  acudEvChargers,
  setAcudEvChargers,
  sharedCategory,
  setSharedCategory,
  iecCategory,
  setIecCategory,
  necCategory,
  setNecCategory,
  areaSquareMeters,
  setAreaSquareMeters,
  saudiSelectedCategory,
  setSaudiSelectedCategory,
  saudiLoadDensityVA,
  setSaudiLoadDensityVA,
  saudiDemandFactor,
  setSaudiDemandFactor,
  iecSelectedCategory,
  setIecSelectedCategory,
  iecDemandType,
  setIecDemandType,
  iecPowerFactor,
  setIecPowerFactor,
  saudiC1C2Voltage,
  setSaudiC1C2Voltage,
  saudiC1C2Area,
  setSaudiC1C2Area,
  hasAdditionalLoads,
  setHasAdditionalLoads,
  needsTransformer,
  setNeedsTransformer,
  buildingsList,
  setBuildingsList,
  numberOfAreas,
  setNumberOfAreas,
  buildingAreas,
  setBuildingAreas,
  pumps,
  setPumps,
  extraLoads,
  setExtraLoads,
  iecExtraLoads,
  setIecExtraLoads,
  projectDiversityFactor,
  setProjectDiversityFactor,
  necDiversityFactor,
  setNecDiversityFactor,
  numberOfMeters,
  setNumberOfMeters,
  coincidentFactor,
  setCoincidentFactor,
  spareCapacityPercent,
  setSpareCapacityPercent,
  transformerLoadingRatio,
  setTransformerLoadingRatio,
  egyptTransformerSize,
  setEgyptTransformerSize,
  egyptTransformerQty,
  setEgyptTransformerQty,
  saudiTransformerSize,
  setSaudiTransformerSize,
  saudiTransformerQty,
  setSaudiTransformerQty,
  iecTransformerSize,
  setIecTransformerSize,
  iecTransformerQty,
  setIecTransformerQty,
  necTransformerSize,
  setNecTransformerSize,
  necTransformerQty,
  setNecTransformerQty,
  buildingsDemandFactorOverrides,
  setBuildingsDemandFactorOverrides,
  pumpsDemandFactorOverrides,
  setPumpsDemandFactorOverrides,
  extraLoadsDemandFactorOverrides,
  setExtraLoadsDemandFactorOverrides,
}) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

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
    { id: 'residential', name: 'Residential (سكني)', density: 8, label: 'Residential (سكني) - Density: 8 kVA/100m²' },
    { id: 'administrative', name: 'Administrative (إداري)', density: 10, label: 'Administrative (إداري) - Density: 10 kVA/100m²' },
    { id: 'commercial', name: 'Commercial (تجاري)', density: 12, label: 'Commercial (تجاري) - Density: 12 kVA/100m²' },
    { id: 'basement_garage', name: 'Basement/Garage (بدروم/جراج)', density: 3, label: 'Basement/Garage (بدروم/جراج) - Density: 3 kVA/100m²' },
    { id: 'hospitals', name: 'Hospitals (مستشفيات)', density: 20, label: 'Hospitals (مستشفيات) - Density: 20 kVA/100m²' },
    { id: 'banks', name: 'Banks (بنوك)', density: 16, label: 'Banks (بنوك) - Density: 16 kVA/100m²' },
    { id: 'medical_clinics', name: 'Medical Clinics (عيادات)', density: 17.5, label: 'Medical Clinics (عيادات) - Density: 17.5 kVA/100m²' },
    { id: 'mosques_churches', name: 'Mosques/Churches (مساجد/كنائس)', density: 8, label: 'Mosques/Churches (مساجد/كنائس) - Density: 8 kVA/100m²' },
    { id: 'hotels', name: 'Hotels (فنادق)', density: 18, label: 'Hotels (فنادق) - Density: 18 kVA/100m²' },
    { id: 'universities', name: 'Universities (جامعات)', density: 15, label: 'Universities (جامعات) - Density: 15 kVA/100m²' },
    { id: 'schools', name: 'Schools (مدارس)', density: 14, label: 'Schools (مدارس) - Density: 14 kVA/100m²' },
    { id: 'sports_facilities', name: 'Sports facilities (منشآت رياضية)', density: 12, label: 'Sports facilities (منشآت رياضية) - Density: 12 kVA/100m²' },
    { id: 'outdoor_parks', name: 'Outdoor Parks (حدائق)', density: 0.5, label: 'Outdoor Parks (حدائق) - Density: 0.5 kVA/100m²' },
    { id: 'public_services', name: 'Public Services (خدمات عامة)', density: 5, label: 'Public Services (خدمات عامة) - Density: 5 kVA/100m²' },
    { id: 'factories', name: 'Factories (مصانع)', density: 30, label: 'Factories (مصانع) - Density: 30 kVA/100m²' },
    { id: 'fuel_stations', name: 'Fuel Stations (محطات بنزين)', density: 8, isFuelStation: true, label: 'Fuel Stations (محطات بنزين) - Density: 8 kVA/100m²' },
  ];

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

  // Compare Calculations Modal state (local transient UI state)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [egyptMethodologyInModal, setEgyptMethodologyInModal] = useState<'ecp203' | 'acud'>(egyptSubStandard);
  useEffect(() => {
    if (!isCompareModalOpen) {
      setEgyptMethodologyInModal(egyptSubStandard);
    }
  }, [egyptSubStandard, isCompareModalOpen]);
  const [compareCheckboxes, setCompareCheckboxes] = useState<Record<string, boolean>>({
    egypt: true,
    saudi: true,
    europe: true,
    usa: false,
  });
  const displayedCompareCodes = Object.keys(compareCheckboxes).filter((k) => compareCheckboxes[k]);

  const handleToggleCompareCheckbox = (codeId: string) => {
    setCompareCheckboxes((prev) => ({
      ...prev,
      [codeId]: !prev[codeId],
    }));
  };

  const activeCategory: OccupancyCategory =
    selectedStandardId === 'europe' ? (iecCategory as OccupancyCategory) : sharedCategory;

  const selectedSaudiCategoryCode = getSaudiCategoryByCodeOrName(sharedCategory)?.code || 'C7';
  const isC1orC2 =
    selectedStandardId === 'saudi' &&
    (selectedSaudiCategoryCode === 'C1' || selectedSaudiCategoryCode === 'C2');
  const isSaudiC3toC29 = selectedStandardId === 'saudi' && !isC1orC2;
  const includeAdditionalLoads = !isC1orC2 || hasAdditionalLoads;
  const includeTransformer = !isC1orC2 || needsTransformer;

  useEffect(() => {
    if (!isC1orC2) {
      setHasAdditionalLoads(false);
      setNeedsTransformer(false);
    }
  }, [isC1orC2]);

  const c1c2LookupResult = isC1orC2
    ? lookupSaudiC1C2ByArea(
        selectedSaudiCategoryCode as 'C1' | 'C2',
        parseEnglishNumber(saudiC1C2Area, 0),
        saudiC1C2Voltage
      )
    : null;

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
    const typeStr = bType || sharedCategory;
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

  const getFloorAppliedDensity = (
    floorName: string,
    bType?: string,
    saudiEstType: SaudiLoadEstimationType = 'standard',
    floorAppliedLoadDensity?: number
  ): number => {
    const currentBldType = bType || activeCategory;
    if (selectedStandardId === 'saudi') {
      if (isBasementFloorName(floorName)) {
        return 3; // 3 kVA/100m² (30 VA/m²) as per SEC Basement rule
      }
      const va = getSaudiTable19DensityVA(
        currentBldType,
        saudiEstType,
        selectedSaudiCategoryCode
      );
      return va / 10; // convert VA/m² to kVA/100m²: (va * 100) / 1000 = va / 10
    }
    if (selectedStandardId === 'egypt') {
      if (isBasementFloorName(floorName)) {
        return 3;
      }
      if (floorAppliedLoadDensity !== undefined) {
        return floorAppliedLoadDensity;
      }
      return egyptSubStandard === 'acud'
        ? getAcudAppliedDensity()
        : getEgyptianAppliedLoadDensity();
    }
    if (selectedStandardId === 'europe') {
      if (isBasementFloorName(floorName)) {
        return getIecBasementCategory()[iecDemandType]; // IEC Parking garage density (min: 3, avg: 6.5, max: 10 W/m²)
      }
      if (floorAppliedLoadDensity !== undefined) {
        return floorAppliedLoadDensity;
      }
      return getIecCategoryByValue(currentBldType)[iecDemandType];
    }
    if (selectedStandardId === 'usa') {
      if (isBasementFloorName(floorName)) {
        return 3; // 3 VA/m² default for Basement under NEC
      }
      return getNecCategoryByValue(currentBldType).vaPerM2;
    }
    return getEgyptianAppliedDensityForType(floorName, currentBldType);
  };

  const sanitizeNecNumericField = (val: number | string | undefined, fallback: number): number => {
    if (val === undefined) return fallback;
    if (val === '') return 0;
    const parsed = Number(val);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  };

  const getNecFloorLoads = (fl: FloorRowItem, bldNecType: string): NecFloorLoadItem[] => {
    const necCat = getNecCategoryByValue(bldNecType);
    const dynamicLightingDensity = isBasementFloorName(fl.name) ? 3 : necCat.vaPerM2;
    if (Array.isArray(fl.loads)) {
      return fl.loads.map((item) =>
        item.type === 'Lighting'
          ? { ...item, densityOrPower: dynamicLightingDensity, demandFactor: 1.0 }
          : item
      );
    }
    return createDefaultNecLoads(dynamicLightingDensity, fl);
  };

  const calcNecFloorLoads = (fl: FloorRowItem, bldNecType: string) => {
    const subtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
    const necCat = getNecCategoryByValue(bldNecType);
    const lightingDensity = isBasementFloorName(fl.name) ? 3 : necCat.vaPerM2;
    const loads = getNecFloorLoads(fl, bldNecType);

    const evaluatedLoads = loads.map((item) => {
      const isAdditional = item.type === 'Additional';
      const defaultDens =
        item.type === 'Lighting'
          ? lightingDensity
          : item.type === 'Power'
          ? 20
          : item.type === 'HVAC'
          ? 50
          : 0;
      const defaultDf = item.type === 'Power' ? 0.5 : 1.0;
      const val =
        item.type === 'Lighting'
          ? lightingDensity
          : sanitizeNecNumericField(item.densityOrPower, defaultDens);
      const df =
        item.type === 'Lighting'
          ? 1.0
          : sanitizeNecNumericField(item.demandFactor, defaultDf);
      const connectedKva = isAdditional ? val : (subtotal * val) / 1000;
      const demandKva = connectedKva * df;
      return {
        ...item,
        connectedKva,
        demandKva,
      };
    });

    const totalConnected = evaluatedLoads.reduce((s, l) => s + l.connectedKva, 0);
    const totalDemand = evaluatedLoads.reduce((s, l) => s + l.demandKva, 0);

    return {
      subtotal,
      lightingDensity,
      loads: evaluatedLoads,
      totalConnected,
      totalDemand,
    };
  };

  const totalBuildingsArea = buildingsList.reduce((sum, b) => sum + (Number(b.totalArea) || 0), 0);

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
    setNumberOfMeters(count);

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
          const defaultDf = selectedStandardId === 'saudi' ? 0.6 : selectedStandardId === 'europe' ? 0.6 : 0.8;
          const egyptTopDensity =
            egyptSubStandard === 'acud'
              ? getAcudAppliedDensity()
              : getEgyptianAppliedLoadDensity();
          const sourceIecType = prev[0]?.iecBuildingType || iecCategory || IEC_OCCUPANCY_CATEGORIES[2].value;
          const iecCatForNewBld = getIecCategoryByValue(sourceIecType);
          const sourceNecType = prev[0]?.necBuildingType || necCategory || NEC_OCCUPANCY_CATEGORIES[12].value;
          const necCatForNewBld = getNecCategoryByValue(sourceNecType);
          const clonedFloors: FloorRowItem[] = sourceFloors.map((fl, fIdx) => ({
            id: `f-${Date.now()}-${i}-${fIdx}-${Math.random().toString(36).substring(2, 6)}`,
            name: fl.name,
            floorsCount: fl.floorsCount,
            areaPerFloor: fl.areaPerFloor,
            demandFactor:
              selectedStandardId === 'europe'
                ? (isBasementFloorName(fl.name) ? 0.6 : iecCatForNewBld.sf)
                : (fl.demandFactor !== undefined ? fl.demandFactor : (isBasementFloorName(fl.name) ? (selectedStandardId === 'saudi' ? 0.7 : 0.8) : defaultDf)),
            appliedLoadDensity:
              selectedStandardId === 'egypt'
                ? (isBasementFloorName(fl.name) ? 3 : egyptTopDensity)
                : selectedStandardId === 'europe'
                ? (isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCatForNewBld[iecDemandType])
                : selectedStandardId === 'usa'
                ? (isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2)
                : fl.appliedLoadDensity,
            necPowerDensity: fl.necPowerDensity ?? 20,
            necPowerDf: fl.necPowerDf ?? 0.5,
            necHvacDensity: fl.necHvacDensity ?? 50,
            necHvacDf: fl.necHvacDf ?? 1.0,
            necAdditionalKva: fl.necAdditionalKva ?? 0,
            necAdditionalDf: fl.necAdditionalDf ?? 1.0,
            loads: fl.loads
              ? fl.loads.map((l) =>
                  l.type === 'Lighting'
                    ? { ...l, densityOrPower: isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2, demandFactor: 1.0 }
                    : { ...l }
                )
              : createDefaultNecLoads(isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2, fl),
          }));
          const globalSaudiCat =
            getSaudiCategoryByCodeOrName(sharedCategory) ||
            SAUDI_SEC_CATEGORIES[6];
          const defaultBldType = selectedStandardId === 'saudi'
            ? `${globalSaudiCat.name} (${globalSaudiCat.code})`
            : (prev[0]?.buildingType || sharedCategory || 'Offices');
          added.push({
            id: `bld-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
            name: isAr ? `مبنى ${nextNum}` : `Building ${nextNum}`,
            buildingType: defaultBldType,
            iecBuildingType: iecCatForNewBld.value,
            necBuildingType: necCatForNewBld.value,
            isTypeCustomized: false,
            saudiLoadEstimationType: 'standard',
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

  // Category membership helpers (only switch to default when current category doesn't belong to target standard)
  const findIecCategoryMatch = (val: string | undefined): IecOccupancyCategory | undefined => {
    if (!val) return undefined;
    const trimmed = val.trim().toLowerCase();
    return IEC_OCCUPANCY_CATEGORIES.find(
      (c) => c.value.toLowerCase() === trimmed || c.label.toLowerCase() === trimmed
    );
  };

  const findOccupancyCategoryMatch = (val: string | undefined): OccupancyCategory | undefined => {
    if (!val) return undefined;
    const trimmed = val.trim();
    const direct = OCCUPANCY_CATEGORIES.find((c) => c.id.toLowerCase() === trimmed.toLowerCase());
    if (direct) return direct.id;
    const saudiCat = getSaudiCategoryByCodeOrName(trimmed);
    if (saudiCat) {
      const normalized = saudiCat.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const bySaudiName = OCCUPANCY_CATEGORIES.find(
        (c) => c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
      );
      if (bySaudiName) return bySaudiName.id;
    }
    return undefined;
  };

  // Explicit standard-switching handler (prevents mount-time resets when navigating between Step 1 & Step 2)
  const handleSelectStandard = (nextStandardId: StandardId) => {
    if (nextStandardId === selectedStandardId) return;
    setSelectedStandardId(nextStandardId);

    if (nextStandardId !== 'europe' && selectedStandardId === 'europe') {
      setActiveLoadsTab('pumps');
    }

    if (nextStandardId === 'saudi') {
      // Share category with Egyptian Code — never read/overwrite iecCategory
      const match = getSaudiCategoryByCodeOrName(sharedCategory) || SAUDI_SEC_CATEGORIES[6];
      setSaudiSelectedCategory(match);
      setSaudiLoadDensityVA(match.vaPerM2);
      setSaudiDemandFactor(match.df);

      setBuildingsList((prev) =>
        prev.map((b) => {
          const bMatch = getSaudiCategoryByCodeOrName(b.buildingType);
          const resolvedCat = bMatch || match;
          const resolvedStr = bMatch ? `${bMatch.name} (${bMatch.code})` : `${match.name} (${match.code})`;
          return {
            ...b,
            buildingType: resolvedStr as OccupancyCategory,
            saudiLoadEstimationType: b.saudiLoadEstimationType || 'standard',
            floors: b.floors.map((fl) => ({
              ...fl,
              demandFactor: isBasementFloorName(fl.name) ? 0.7 : resolvedCat.df,
            })),
          };
        })
      );
    } else if (nextStandardId === 'europe') {
      // IEC uses independent iecCategory & b.iecBuildingType — NEVER overwrite sharedCategory or b.buildingType
      setIsAddingPump(false);
      setActiveLoadsTab('extra');
      const activeIecCat = getIecCategoryByValue(iecCategory);
      setIecSelectedCategory(activeIecCat);

      setBuildingsList((prev) =>
        prev.map((b) => {
          const bCat = getIecCategoryByValue(b.iecBuildingType || iecCategory);
          return {
            ...b,
            iecBuildingType: bCat.value,
            floors: b.floors.map((fl) => ({
              ...fl,
              appliedLoadDensity: isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : bCat[iecDemandType],
              demandFactor: isBasementFloorName(fl.name) ? getIecBasementCategory().sf : bCat.sf,
            })),
          };
        })
      );
    } else if (nextStandardId === 'egypt') {
      // Share category with Saudi Code — never read/overwrite iecCategory
      const matchedGlobal = findOccupancyCategoryMatch(sharedCategory) || 'Offices';
      setProjectDiversityFactor(0.8);

      const topLoadDensity =
        egyptSubStandard === 'acud'
          ? getAcudAppliedDensity()
          : getEgyptianAppliedLoadDensity();

      setBuildingsList((prev) =>
        prev.map((b) => {
          const matchedBld = findOccupancyCategoryMatch(b.buildingType) || matchedGlobal;
          return {
            ...b,
            buildingType: matchedBld,
            floors: b.floors.map((fl) => ({
              ...fl,
              demandFactor: 0.8,
              appliedLoadDensity: isBasementFloorName(fl.name) ? 3 : topLoadDensity,
            })),
          };
        })
      );
    } else if (nextStandardId === 'usa') {
      if (!NEC_TRANSFORMER_SIZES.includes(necTransformerSize)) {
        setNecTransformerSize(1000);
      }
      setBuildingsList((prev) =>
        prev.map((b) => {
          const bNecCat = getNecCategoryByValue(b.necBuildingType || necCategory);
          return {
            ...b,
            necBuildingType: bNecCat.value,
            floors: b.floors.map((fl) => {
              const lightingDens = isBasementFloorName(fl.name) ? 3 : bNecCat.vaPerM2;
              return {
                ...fl,
                appliedLoadDensity: lightingDens,
                necPowerDensity: fl.necPowerDensity ?? 20,
                necPowerDf: fl.necPowerDf ?? 0.5,
                necHvacDensity: fl.necHvacDensity ?? 50,
                necHvacDf: fl.necHvacDf ?? 1.0,
                necAdditionalKva: fl.necAdditionalKva ?? 0,
                necAdditionalDf: fl.necAdditionalDf ?? 1.0,
                loads: Array.isArray(fl.loads)
                  ? fl.loads.map((l) =>
                      l.type === 'Lighting' ? { ...l, densityOrPower: lightingDens, demandFactor: 1.0 } : l
                    )
                  : createDefaultNecLoads(lightingDens, fl),
              };
            }),
          };
        })
      );
    }
  };

  // Explicit Egyptian sub-standard switcher (ECP 203 <-> ACUD)
  const handleSelectEgyptSubStandard = (nextSub: 'ecp203' | 'acud') => {
    if (nextSub === egyptSubStandard) return;
    setEgyptSubStandard(nextSub);
    setProjectDiversityFactor(0.8);
    setBuildingsList((prev) =>
      prev.map((b) => ({
        ...b,
        floors: b.floors.map((fl) => ({
          ...fl,
          demandFactor: 0.8,
        })),
      }))
    );
  };

  // Explicit IEC Min/Avg/Max switcher (updates floor density without resetting building categories)
  const handleIecDemandTypeChange = (mode: IecDemandType) => {
    setIecDemandType(mode);
    if (selectedStandardId === 'europe') {
      setBuildingsList((prev) =>
        prev.map((b) => {
          const bCat = getIecCategoryByValue(b.iecBuildingType || iecCategory);
          return {
            ...b,
            floors: b.floors.map((fl) => ({
              ...fl,
              appliedLoadDensity: isBasementFloorName(fl.name) ? getIecBasementCategory()[mode] : bCat[mode],
            })),
          };
        })
      );
    }
  };

  // Sync Egyptian (ECP 203 & ACUD) top-level Applied Load Density down to all building floors (Basements remain 3)
  useEffect(() => {
    if (selectedStandardId !== 'egypt') return;
    const topLoadDensity =
      egyptSubStandard === 'acud'
        ? getAcudAppliedDensity()
        : getEgyptianAppliedLoadDensity();

    setBuildingsList((prev) => {
      let hasChanges = false;
      const next = prev.map((b) => {
        let bChanged = false;
        const nextFloors = b.floors.map((fl) => {
          const expectedDensity = isBasementFloorName(fl.name) ? 3 : topLoadDensity;
          if (fl.appliedLoadDensity !== expectedDensity) {
            bChanged = true;
            hasChanges = true;
            return { ...fl, appliedLoadDensity: expectedDensity };
          }
          return fl;
        });
        return bChanged ? { ...b, floors: nextFloors } : b;
      });
      return hasChanges ? next : prev;
    });
  }, [
    selectedStandardId,
    egyptSubStandard,
    egyptLocationType,
    egyptBuildingCategory,
    egyptCityDistrictType,
    acudActivityId,
  ]);

  const handleBuildingCategoryChange = (buildingId: string, newTypeStrOrCode: string) => {
    if (selectedStandardId === 'saudi') {
      const saudiCat =
        SAUDI_SEC_CATEGORIES.find((c) => c.code === newTypeStrOrCode) ||
        getSaudiCategoryByCodeOrName(newTypeStrOrCode);
      if (saudiCat) {
        setBuildingsDemandFactorOverrides((prev) => {
          if (prev[buildingId] === undefined) return prev;
          const next = { ...prev };
          delete next[buildingId];
          return next;
        });
      }
    } else if (selectedStandardId === 'europe') {
      const iecCat = getIecCategoryByValue(newTypeStrOrCode);
      setBuildingsDemandFactorOverrides((prev) => {
        if (prev[buildingId] === undefined) return prev;
        const next = { ...prev };
        delete next[buildingId];
        return next;
      });
      setBuildingsList((prev) =>
        prev.map((b) => {
          if (b.id !== buildingId) return b;
          return {
            ...b,
            iecBuildingType: iecCat.value,
            isTypeCustomized: true,
            floors: b.floors.map((fl) => ({
              ...fl,
              appliedLoadDensity: isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCat[iecDemandType],
              demandFactor: isBasementFloorName(fl.name) ? getIecBasementCategory().sf : iecCat.sf,
            })),
          };
        })
      );
      return;
    } else if (selectedStandardId === 'usa') {
      const necCat = getNecCategoryByValue(newTypeStrOrCode);
      setBuildingsDemandFactorOverrides((prev) => {
        if (prev[buildingId] === undefined) return prev;
        const next = { ...prev };
        delete next[buildingId];
        return next;
      });
      setBuildingsList((prev) =>
        prev.map((b) => {
          if (b.id !== buildingId) return b;
          return {
            ...b,
            necBuildingType: necCat.value,
            isTypeCustomized: true,
            floors: b.floors.map((fl) => {
              const lightingDens = isBasementFloorName(fl.name) ? 3 : necCat.vaPerM2;
              return {
                ...fl,
                appliedLoadDensity: lightingDens,
                ...(Array.isArray(fl.loads)
                  ? {
                      loads: fl.loads.map((l) =>
                        l.type === 'Lighting' ? { ...l, densityOrPower: lightingDens, demandFactor: 1.0 } : l
                      ),
                    }
                  : {}),
              };
            }),
          };
        })
      );
      return;
    }

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

  const handleBuildingEstimationTypeChange = (
    buildingId: string,
    estimationType: SaudiLoadEstimationType
  ) => {
    setBuildingsList((prev) =>
      prev.map((b) =>
        b.id === buildingId ? { ...b, saudiLoadEstimationType: estimationType } : b
      )
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
    const egyptTopDensity =
      egyptSubStandard === 'acud'
        ? getAcudAppliedDensity()
        : getEgyptianAppliedLoadDensity();
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const bldCat = selectedStandardId === 'saudi' ? getSaudiCategoryByCodeOrName(b.buildingType) : undefined;
        const iecCat = selectedStandardId === 'europe' ? getIecCategoryByValue(b.iecBuildingType || iecCategory) : undefined;
        const necCat = selectedStandardId === 'usa' ? getNecCategoryByValue(b.necBuildingType || necCategory) : undefined;
        const defaultDf =
          selectedStandardId === 'egypt'
            ? 0.8
            : selectedStandardId === 'saudi'
            ? (bldCat ? bldCat.df : saudiDemandFactor)
            : selectedStandardId === 'europe'
            ? (iecCat ? iecCat.sf : 0.6)
            : 0.8;
        const newRow: FloorRowItem = {
          id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: isAr ? 'دور متكرر (Typical Floor)' : 'Typical Floor',
          floorsCount: 1,
          areaPerFloor: 300,
          demandFactor: defaultDf,
          ...(selectedStandardId === 'egypt'
            ? { appliedLoadDensity: egyptTopDensity }
            : selectedStandardId === 'europe'
            ? { appliedLoadDensity: iecCat ? iecCat[iecDemandType] : 40 }
            : selectedStandardId === 'usa'
            ? { appliedLoadDensity: necCat ? necCat.vaPerM2 : 39 }
            : {}),
          necPowerDensity: 20,
          necPowerDf: 0.5,
          necHvacDensity: 50,
          necHvacDf: 1.0,
          necAdditionalKva: 0,
          necAdditionalDf: 1.0,
          loads: createDefaultNecLoads(necCat ? necCat.vaPerM2 : 39),
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
        const defaultDf =
          selectedStandardId === 'egypt'
            ? 0.8
            : selectedStandardId === 'saudi'
            ? 0.7
            : selectedStandardId === 'europe'
            ? 0.6
            : 0.8;

        const newRow: FloorRowItem = {
          id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: basementName,
          floorsCount: 1,
          areaPerFloor: defaultArea,
          demandFactor: defaultDf,
          ...(selectedStandardId === 'egypt' || selectedStandardId === 'usa'
            ? { appliedLoadDensity: 3 }
            : selectedStandardId === 'europe'
            ? { appliedLoadDensity: getIecBasementCategory()[iecDemandType] }
            : {}),
          necPowerDensity: 20,
          necPowerDf: 0.5,
          necHvacDensity: 50,
          necHvacDf: 1.0,
          necAdditionalKva: 0,
          necAdditionalDf: 1.0,
          loads: createDefaultNecLoads(3),
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
    field:
      | 'name'
      | 'floorsCount'
      | 'areaPerFloor'
      | 'demandFactor'
      | 'necPowerDensity'
      | 'necPowerDf'
      | 'necHvacDensity'
      | 'necHvacDf'
      | 'necAdditionalKva'
      | 'necAdditionalDf',
    value: string | number
  ) => {
    const egyptTopDensity =
      egyptSubStandard === 'acud'
        ? getAcudAppliedDensity()
        : getEgyptianAppliedLoadDensity();
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const newFloors = b.floors.map((f) => {
          if (f.id !== floorId) return f;
          if (field === 'name') {
            const nextName = String(value);
            if (selectedStandardId === 'europe') {
              const iecCat = getIecCategoryByValue(b.iecBuildingType || iecCategory);
              const isBsmnt = isBasementFloorName(nextName);
              return {
                ...f,
                name: nextName,
                appliedLoadDensity: isBsmnt ? getIecBasementCategory()[iecDemandType] : iecCat[iecDemandType],
                demandFactor: isBsmnt ? getIecBasementCategory().sf : iecCat.sf,
              };
            }
            if (selectedStandardId === 'usa') {
              const necCat = getNecCategoryByValue(b.necBuildingType || necCategory);
              const isBsmnt = isBasementFloorName(nextName);
              const lightingDens = isBsmnt ? 3 : necCat.vaPerM2;
              return {
                ...f,
                name: nextName,
                appliedLoadDensity: lightingDens,
                ...(Array.isArray(f.loads)
                  ? {
                      loads: f.loads.map((l) =>
                        l.type === 'Lighting' ? { ...l, densityOrPower: lightingDens, demandFactor: 1.0 } : l
                      ),
                    }
                  : {}),
              };
            }
            return {
              ...f,
              name: nextName,
              ...(selectedStandardId === 'egypt'
                ? { appliedLoadDensity: isBasementFloorName(nextName) ? 3 : egyptTopDensity }
                : {}),
            };
          } else if (field === 'floorsCount') {
            if (value === '') return { ...f, floorsCount: '' };
            const clean = toEnglishDigits(value).replace(/[^0-9]/g, '');
            if (clean === '') return { ...f, floorsCount: '' };
            const num = parseInt(clean, 10);
            return { ...f, floorsCount: Math.max(1, Math.min(100, num)) };
          } else if (
            field === 'areaPerFloor' ||
            field === 'demandFactor' ||
            field === 'necPowerDensity' ||
            field === 'necPowerDf' ||
            field === 'necHvacDensity' ||
            field === 'necHvacDf' ||
            field === 'necAdditionalKva' ||
            field === 'necAdditionalDf'
          ) {
            if (value === '') return { ...f, [field]: '' };
            let clean = toEnglishDigits(value).replace(/[^0-9.]/g, '');
            const parts = clean.split('.');
            if (parts.length > 2) {
              clean = parts[0] + '.' + parts.slice(1).join('');
            }
            return { ...f, [field]: clean };
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

  const handleUpdateNecLoad = (
    buildingId: string,
    floorId: string,
    loadId: string,
    field: 'densityOrPower' | 'demandFactor',
    value: string | number
  ) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const bldNecType = b.necBuildingType || necCategory;
        const newFloors = b.floors.map((f) => {
          if (f.id !== floorId) return f;
          const currentLoads = getNecFloorLoads(f, bldNecType);
          let nextVal: string | number = '';
          if (value !== '') {
            let clean = toEnglishDigits(value).replace(/[^0-9.]/g, '');
            const parts = clean.split('.');
            if (parts.length > 2) {
              clean = parts[0] + '.' + parts.slice(1).join('');
            }
            nextVal = clean;
          }
          const updatedLoads = currentLoads.map((l) => {
            if (l.id !== loadId || l.type === 'Lighting') return l;
            return { ...l, [field]: nextVal };
          });
          const powerItem = updatedLoads.find((l) => l.type === 'Power');
          const hvacItem = updatedLoads.find((l) => l.type === 'HVAC');
          const addItem = updatedLoads.find((l) => l.type === 'Additional');
          return {
            ...f,
            loads: updatedLoads,
            ...(powerItem ? { necPowerDensity: powerItem.densityOrPower, necPowerDf: powerItem.demandFactor } : {}),
            ...(hvacItem ? { necHvacDensity: hvacItem.densityOrPower, necHvacDf: hvacItem.demandFactor } : {}),
            ...(addItem ? { necAdditionalKva: addItem.densityOrPower, necAdditionalDf: addItem.demandFactor } : {}),
          };
        });
        return { ...b, floors: newFloors };
      })
    );
  };

  const handleDeleteNecLoad = (buildingId: string, floorId: string, loadId: string) => {
    setBuildingsList((prev) =>
      prev.map((b) => {
        if (b.id !== buildingId) return b;
        const bldNecType = b.necBuildingType || necCategory;
        const newFloors = b.floors.map((f) => {
          if (f.id !== floorId) return f;
          const currentLoads = getNecFloorLoads(f, bldNecType);
          const nextLoads = currentLoads.filter((l) => l.id !== loadId);
          return {
            ...f,
            loads: nextLoads,
          };
        });
        return { ...b, floors: newFloors };
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

    const defaultDf = selectedStandardId === 'saudi' ? 0.6 : selectedStandardId === 'europe' ? 0.6 : 0.8;
    const egyptTopDensity =
      egyptSubStandard === 'acud'
        ? getAcudAppliedDensity()
        : getEgyptianAppliedLoadDensity();
    const defaultBuildingType = selectedStandardId === 'saudi'
      ? `${(SAUDI_C3_TO_C29_CATEGORIES.find((c) => c.code === selectedSaudiCategoryCode) || SAUDI_SEC_CATEGORIES[6]).name} (${(SAUDI_C3_TO_C29_CATEGORIES.find((c) => c.code === selectedSaudiCategoryCode) || SAUDI_SEC_CATEGORIES[6]).code})`
      : (buildingsList.length > 0 ? buildingsList[0].buildingType : sharedCategory || 'Offices');
    const defaultIecType =
      buildingsList.length > 0 && buildingsList[0].iecBuildingType
        ? buildingsList[0].iecBuildingType
        : iecCategory;
    const iecCatForNewBld = getIecCategoryByValue(defaultIecType);
    const defaultNecType =
      buildingsList.length > 0 && buildingsList[0].necBuildingType
        ? buildingsList[0].necBuildingType
        : necCategory;
    const necCatForNewBld = getNecCategoryByValue(defaultNecType);
    const clonedFloors: FloorRowItem[] = sourceFloors.map((fl, idx) => ({
      id: `f-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      name: fl.name,
      floorsCount: fl.floorsCount,
      areaPerFloor: fl.areaPerFloor,
      demandFactor:
        selectedStandardId === 'europe'
          ? (isBasementFloorName(fl.name) ? 0.6 : iecCatForNewBld.sf)
          : (fl.demandFactor !== undefined ? fl.demandFactor : (isBasementFloorName(fl.name) ? (selectedStandardId === 'saudi' ? 0.7 : 0.8) : defaultDf)),
      appliedLoadDensity:
        selectedStandardId === 'egypt'
          ? (isBasementFloorName(fl.name) ? 3 : egyptTopDensity)
          : selectedStandardId === 'europe'
          ? (isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCatForNewBld[iecDemandType])
          : selectedStandardId === 'usa'
          ? (isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2)
          : fl.appliedLoadDensity,
      necPowerDensity: fl.necPowerDensity ?? 20,
      necPowerDf: fl.necPowerDf ?? 0.5,
      necHvacDensity: fl.necHvacDensity ?? 50,
      necHvacDf: fl.necHvacDf ?? 1.0,
      necAdditionalKva: fl.necAdditionalKva ?? 0,
      necAdditionalDf: fl.necAdditionalDf ?? 1.0,
      loads: fl.loads
        ? fl.loads.map((l) =>
            l.type === 'Lighting'
              ? { ...l, densityOrPower: isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2, demandFactor: 1.0 }
              : { ...l }
          )
        : createDefaultNecLoads(isBasementFloorName(fl.name) ? 3 : necCatForNewBld.vaPerM2, fl),
    }));

    const newBuilding: BuildingItem = {
      id: `bld-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: isAr ? `مبنى ${nextNumber}` : `Building ${nextNumber}`,
      buildingType: defaultBuildingType,
      iecBuildingType: iecCatForNewBld.value,
      necBuildingType: necCatForNewBld.value,
      isTypeCustomized: false,
      saudiLoadEstimationType: 'standard',
      floorsCount: calcBuildingTotalFloors(clonedFloors),
      floors: clonedFloors,
      totalArea: calcBuildingTotalArea(clonedFloors),
    };
    setNumberOfMeters(nextNumber);
    setBuildingsList((prev) => [...prev, newBuilding]);
  };

  const handleRemoveBuilding = (buildingId: string) => {
    if (buildingsList.length <= 1) return;
    setNumberOfMeters(buildingsList.length - 1);
    setBuildingsList((prev) => prev.filter((b) => b.id !== buildingId));
  };

  // Standard engineering constants (Sliders removed from UI)
  const hvacDiversity = 85;
  const powerFactor = 0.90;

  // 4. Transient UI form states (local to Step 2 modal/add-item forms)
  const [activeLoadsTab, setActiveLoadsTab] = useState<'pumps' | 'extra'>(
    selectedStandardId === 'europe' ? 'extra' : 'pumps'
  );

  // Inline form visibility (both hidden by default, max one open at a time)
  const [isAddingPump, setIsAddingPump] = useState<boolean>(false);
  const [newPumpName, setNewPumpName] = useState<string>('');
  const [newPumpPower, setNewPumpPower] = useState<number | string>(10);
  const [newPumpUnit, setNewPumpUnit] = useState<PumpPowerUnit>('HP');
  const [newPumpCategory, setNewPumpCategory] = useState<'water' | 'fire' | 'drainage' | 'hvac'>('water');

  const [isAddingExtra, setIsAddingExtra] = useState<boolean>(false);
  const [newExtraName, setNewExtraName] = useState<string>('');
  const [newExtraPower, setNewExtraPower] = useState<number | string>(15);
  const [newExtraUnit, setNewExtraUnit] = useState<ExtraLoadUnit>('kVA');
  const [newExtraQty, setNewExtraQty] = useState<number>(1);
  const [newExtraCategory, setNewExtraCategory] = useState<'transport' | 'security' | 'ev' | 'general'>('transport');

  // IEC Table 30/2 Extra Load Form State (Used ONLY when selectedStandardId === 'europe')
  const [selectedIecExtraName, setSelectedIecExtraName] = useState<string>(IEC_EXTRA_LOADS_DATA[0].name);
  const [newIecExtraArea, setNewIecExtraArea] = useState<number | string>(100);
  const [newIecExtraPowerKw, setNewIecExtraPowerKw] = useState<number | string>(15);

  const numberOfBuildings = buildingsList.length;

  useEffect(() => {
    const parsedMeters =
      numberOfMeters === '' ? 1 : Math.max(1, parseInt(String(numberOfMeters), 10) || 1);
    setCoincidentFactor(getSaudiCoincidentFactor(parsedMeters));
  }, [numberOfMeters]);

  const availableTransformerSizes =
    selectedStandardId === 'saudi'
      ? SAUDI_TRANSFORMER_SIZES
      : selectedStandardId === 'usa'
      ? NEC_TRANSFORMER_SIZES
      : STANDARD_SCHNEIDER_TRANSFORMER_SIZES;

  const selectedTransformerSize =
    selectedStandardId === 'egypt'
      ? egyptTransformerSize
      : selectedStandardId === 'saudi'
      ? saudiTransformerSize
      : selectedStandardId === 'europe'
      ? iecTransformerSize
      : necTransformerSize;

  const setSelectedTransformerSize = (val: number) => {
    if (selectedStandardId === 'egypt') setEgyptTransformerSize(val);
    else if (selectedStandardId === 'saudi') setSaudiTransformerSize(val);
    else if (selectedStandardId === 'europe') setIecTransformerSize(val);
    else setNecTransformerSize(val);
  };

  const transformerQty =
    selectedStandardId === 'egypt'
      ? egyptTransformerQty
      : selectedStandardId === 'saudi'
      ? saudiTransformerQty
      : selectedStandardId === 'europe'
      ? iecTransformerQty
      : necTransformerQty;

  const setTransformerQty = (val: number | string) => {
    if (selectedStandardId === 'egypt') setEgyptTransformerQty(val);
    else if (selectedStandardId === 'saudi') setSaudiTransformerQty(val);
    else if (selectedStandardId === 'europe') setIecTransformerQty(val);
    else setNecTransformerQty(val);
  };

  // UNIT CONVERSION LOGIC FOR PUMPS:
  // HP    => kVA = (Power * 0.746) / ((Efficiency / 100) * PF)
  // Watts => kVA = (Power / 1000) / PF (default PF 0.85)
  // kVA   => kVA = Power (Direct)
  const calculatePumpKva = (
    power: number | string,
    unit: PumpPowerUnit = 'HP',
    efficiency: number | string = 95,
    pf: number | string = 0.85
  ): number => {
    const numPower = Math.max(0, parseEnglishNumber(power, 0));
    const numEffPercent = parseEnglishNumber(efficiency, 95);
    const numPf = parseEnglishNumber(pf, 0.85);
    if (unit === 'kVA') {
      return numPower;
    }
    if (unit === 'W') {
      const effectivePf = numPf > 0 ? numPf : 0.85;
      return (numPower / 1000) / effectivePf;
    }
    const effRatio = numEffPercent / 100;
    if (effRatio <= 0 || numPf <= 0) return 0;
    return (numPower * 0.746) / (effRatio * numPf);
  };

  // UNIT CONVERSION LOGIC FOR EXTRA LOADS:
  // Watts => kVA = (Power / 1000) / 0.85
  // kVA   => kVA = Power (Direct)
  const calculateExtraLoadUnitKva = (
    power: number | string,
    unit: ExtraLoadUnit = 'kVA',
    pf: number = 0.85
  ): number => {
    const numPower = Math.max(0, parseEnglishNumber(power, 0));
    if (unit === 'W') {
      const effectivePf = pf > 0 ? pf : 0.85;
      return (numPower / 1000) / effectivePf;
    }
    return numPower;
  };

  // Handlers for Pumps
  const handleAddPump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPumpName.trim()) return;
    const parsedPower = Math.max(0, parseEnglishNumber(newPumpPower, 10));
    const newPump: PumpItem = {
      id: `p-${Date.now()}`,
      name: newPumpName.trim(),
      nameAr: newPumpName.trim(),
      power: parsedPower,
      unit: newPumpUnit,
      efficiency: 95,
      pf: 0.85,
      category: newPumpCategory,
      demandFactor: 0.8,
    };
    setPumps((prev) => [...prev, newPump]);
    setNewPumpName('');
    setNewPumpPower(10);
    setNewPumpUnit('HP');
    setIsAddingPump(false);
  };

  const handleUpdatePump = (
    id: string | number,
    field: 'power' | 'unit' | 'efficiency' | 'pf',
    value: number | string
  ) => {
    setPumps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleDeletePump = (id: string | number) => {
    setPumps((prev) => prev.filter((p) => p.id !== id));
  };

  // Handlers for Extra Loads
  const handleAddExtraLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExtraName.trim()) return;
    const parsedPower = Math.max(0, parseEnglishNumber(newExtraPower, 15));
    const newItem: ExtraLoadItem = {
      id: `e-${Date.now()}`,
      name: newExtraName.trim(),
      nameAr: newExtraName.trim(),
      power: parsedPower,
      unit: newExtraUnit,
      category: newExtraCategory,
      qty: Math.max(1, newExtraQty),
      demandFactor: 0.8,
    };
    setExtraLoads((prev) => [...prev, newItem]);
    setNewExtraName('');
    setNewExtraPower(15);
    setNewExtraUnit('kVA');
    setNewExtraQty(1);
    setIsAddingExtra(false);
  };

  const handleUpdateExtraLoad = (
    id: string | number,
    field: 'power' | 'unit' | 'qty',
    value: number | string
  ) => {
    setExtraLoads((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleDeleteExtraLoad = (id: string | number) => {
    setExtraLoads((prev) => prev.filter((e) => e.id !== id));
  };

  // Handlers for IEC Table 30/2 Extra Loads (IEC ONLY)
  const selectedIecExtraSpec = getIecExtraLoadSpec(selectedIecExtraName) || IEC_EXTRA_LOADS_DATA[0];
  const isSelectedIecInstallation =
    selectedIecExtraSpec.category === 'Installation' || selectedIecExtraSpec.density === 0;

  const handleAddIecExtraLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const spec = getIecExtraLoadSpec(selectedIecExtraName) || IEC_EXTRA_LOADS_DATA[0];
    const isInst = spec.category === 'Installation' || spec.density === 0;
    const parsedArea = isInst ? 0 : Math.max(0, parseEnglishNumber(newIecExtraArea, 100));
    const parsedPowerKw = isInst ? Math.max(0, parseEnglishNumber(newIecExtraPowerKw, 15)) : 0;

    const newItem: IecExtraLoadItem = {
      id: `iec-e-${Date.now()}`,
      name: spec.name,
      category: spec.category,
      area: parsedArea,
      directPowerKw: parsedPowerKw,
      sf: spec.sf,
    };

    setIecExtraLoads((prev) => [...prev, newItem]);
    setNewIecExtraArea(100);
    setNewIecExtraPowerKw(15);
    setIsAddingExtra(false);
  };

  const handleUpdateIecExtraLoad = (
    id: string,
    field: 'area' | 'directPowerKw',
    value: number | string
  ) => {
    setIecExtraLoads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteIecExtraLoad = (id: string) => {
    setIecExtraLoads((prev) => prev.filter((item) => item.id !== id));
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
  const activeDensity = getStandardDensity(selectedStandardId, activeCategory, egyptSubStandard);
  const buildingConnectedKva =
    isC1orC2 && c1c2LookupResult
      ? c1c2LookupResult.connectedLoadKva
      : selectedStandardId === 'egypt'
      ? (egyptSubStandard === 'acud'
          ? calculateAcudConnectedKva(areaSquareMeters)
          : (areaSquareMeters / 100) * getEgyptianAppliedLoadDensity())
      : ((activeDensity.lighting + activeDensity.power + activeDensity.hvac) * areaSquareMeters) / 1000;

  // Total Pumps kVA (Excluded when standard is IEC / 'europe')
  const rawTotalPumpsKva = includeAdditionalLoads
    ? pumps.reduce((sum, p) => sum + calculatePumpKva(p.power, p.unit, p.efficiency, p.pf), 0)
    : 0;
  const totalPumpsKva = selectedStandardId === 'europe' ? 0 : rawTotalPumpsKva;

  // Total Extra Loads (IEC uses Table 30/2 area/power kW; other codes use extraLoads kVA)
  const rawStandardExtraLoadsKva = includeAdditionalLoads
    ? extraLoads.reduce((sum, e) => sum + calculateExtraLoadUnitKva(e.power, e.unit) * (Number(e.qty) || 1), 0)
    : 0;

  const iecExtraTotals = includeAdditionalLoads
    ? iecExtraLoads.reduce(
        (acc, item) => {
          const spec = getIecExtraLoadSpec(item.name);
          const isInst = spec ? spec.density === 0 : item.category === 'Installation';
          const density = isInst ? 0 : getIecExtraLoadDensity(spec, iecDemandType);
          const connected = isInst
            ? Math.max(0, parseEnglishNumber(item.directPowerKw, 0))
            : (Math.max(0, parseEnglishNumber(item.area, 0)) * density) / 1000;
          const sf = spec ? spec.sf : item.sf;
          return {
            connected: acc.connected + connected,
            demand: acc.demand + connected * sf,
          };
        },
        { connected: 0, demand: 0 }
      )
    : { connected: 0, demand: 0 };

  const totalExtraLoadsKva =
    selectedStandardId === 'europe' ? iecExtraTotals.connected : rawStandardExtraLoadsKva;

  // Card 1: Total Connected Load
  const totalConnectedKva = buildingConnectedKva + totalPumpsKva + totalExtraLoadsKva;

  // Demand calculations
  const calculateStandardResults = (stdId: string) => {
    const stdCat = stdId === 'europe' ? (iecCategory as OccupancyCategory) : sharedCategory;
    const d = getStandardDensity(stdId, stdCat, egyptSubStandard);
    let bldgConnKva = ((d.lighting + d.power + d.hvac) * areaSquareMeters) / 1000;
    if (stdId === 'saudi' && isC1orC2 && c1c2LookupResult) {
      bldgConnKva = c1c2LookupResult.connectedLoadKva;
    } else if (stdId === 'egypt') {
      if (egyptSubStandard === 'acud') {
        bldgConnKva = calculateAcudConnectedKva(areaSquareMeters);
      } else {
        bldgConnKva = (areaSquareMeters / 100) * getEgyptianAppliedLoadDensity();
      }
    }
    const stdPumpsKva = stdId === 'europe' ? 0 : rawTotalPumpsKva;
    const stdExtraConn = stdId === 'europe' ? iecExtraTotals.connected : rawStandardExtraLoadsKva;
    const totalConn = bldgConnKva + stdPumpsKva + stdExtraConn;

    // Building Demand
    const lightKva = (d.lighting * areaSquareMeters) / 1000;
    const powerKva = (d.power * areaSquareMeters) / 1000;
    const hvacKva = (d.hvac * areaSquareMeters) / 1000;

    let bldgDemandKva = 0;
    if (stdId === 'usa') {
      const receptacleDemand = powerKva <= 10 ? powerKva : 10 + (powerKva - 10) * 0.5;
      bldgDemandKva = lightKva * 1.25 + receptacleDemand + hvacKva * (hvacDiversity / 100) * 1.25;
    } else if (stdId === 'saudi') {
      if (isC1orC2 && c1c2LookupResult) {
        const defaultC1C2Df = selectedSaudiCategoryCode === 'C1' ? 0.5 : 0.6;
        const c1c2Override = buildingsDemandFactorOverrides['saudi-c1c2-building'];
        const effectiveC1C2Df =
          c1c2Override !== undefined
            ? c1c2Override === ''
              ? 0
              : Math.max(0, Number(c1c2Override) || 0)
            : defaultC1C2Df;
        bldgDemandKva = bldgConnKva * effectiveC1C2Df;
      } else {
        bldgDemandKva = lightKva * 0.9 + powerKva * 0.5 + hvacKva * (hvacDiversity / 100) * 0.95;
      }
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

    // Dynamic loads demand: Pumps DF 0.80 (excluded in IEC), extra loads SF for IEC or DF 0.80 otherwise
    const pumpsDemandKva = stdPumpsKva * 0.8;
    const extraDemandKva = stdId === 'europe' ? iecExtraTotals.demand : rawStandardExtraLoadsKva * 0.8;
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

      const SheetName =
        selectedStandardId === 'egypt'
          ? egyptSubStandard === 'acud'
            ? 'LOAD ESTIMATION-ACUD'
            : 'LOAD ESTIMATION-EGY'
          : selectedStandardId === 'saudi'
          ? 'LOAD ESTIMATION-KSA'
          : selectedStandardId === 'europe'
          ? 'LOAD ESTIMATION-IEC'
          : 'LOAD ESTIMATION-NEC';

      const worksheet = workbook.addWorksheet(SheetName, {
        views: [{ showGridLines: true }],
      });

      // 1. DEFAULT ROW HEIGHT & COLUMN WIDTHS
      // Set default row height for generous wrapped text spacing
      worksheet.properties.defaultRowHeight = 25;

      const isSaudiExcel = selectedStandardId === 'saudi';
      const totalCols = isSaudiExcel ? 9 : 11;
      const lastColLetter = isSaudiExcel ? 'I' : 'K';
      const labelEndColLetter = isSaudiExcel ? 'H' : 'J';
      const connectedColLetter = isSaudiExcel ? 'G' : 'I';
      const demandColLetter = isSaudiExcel ? 'I' : 'K';

      // Base generous column widths (Saudi: 9 cols A..I; Others: 11 cols A..K)
      worksheet.columns = isSaudiExcel
        ? [
            { width: 28 }, // Col 1 (A): Building Name
            { width: 16 }, // Col 2 (B): NO OF FLOORS (عدد الأدوار)
            { width: 28 }, // Col 3 (C): Customer Category
            { width: 15 }, // Col 4 (D): AREA(TOTAL)
            { width: 14 }, // Col 5 (E): DPS CODE
            { width: 18 }, // Col 6 (F): LOAD DENSITY (VA/M2)
            { width: 22 }, // Col 7 (G): TOTAL CONNECTED LOAD (KVA)
            { width: 16 }, // Col 8 (H): DEMAND FACTOR
            { width: 22 }, // Col 9 (I): TOTAL DEMAND LOAD (KVA)
          ]
        : [
            { width: 25 }, // Col 1 (A): LOAD TYPE / ITEM (نوع الحمل)
            { width: 28 }, // Col 2 (B): ITEM NAME (اسم المبنى/المضخة)
            { width: 16 }, // Col 3 (C): NO OF FLOORS (عدد الأدوار)
            { width: 25 }, // Col 4 (D): CATEGORY / TYPE (الفئة/النوع)
            { width: 15 }, // Col 5 (E): AREA (G.F.L)
            { width: 15 }, // Col 6 (F): AREA (F.F.L)
            { width: 15 }, // Col 7 (G): AREA (TOTAL)
            { width: 18 }, // Col 8 (H): LOAD DENSITY (VA/M2)
            { width: 18 }, // Col 9 (I): TOTAL CONNECTED (KVA)
            { width: 18 }, // Col 10 (J): DEMAND FACTOR
            { width: 22 }, // Col 11 (K): TOTAL DEMAND LOAD (KVA)
          ];

      // Common border style
      const thinBorder = {
        top: { style: 'thin' as const, color: { argb: 'FF000000' } },
        left: { style: 'thin' as const, color: { argb: 'FF000000' } },
        bottom: { style: 'thin' as const, color: { argb: 'FF000000' } },
        right: { style: 'thin' as const, color: { argb: 'FF000000' } },
      };

      // 1. HEADER SECTION (Row 1 & 2 & 3)
      worksheet.mergeCells('A1:C1');
      const cellA1 = worksheet.getCell('A1');
      cellA1.value = `Project Name: ${(projectName && projectName.trim()) || 'Project'}`;
      cellA1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      cellA1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

      worksheet.mergeCells(isSaudiExcel ? 'D1:F1' : 'D1:G1');
      const cellD1 = worksheet.getCell('D1');
      cellD1.value = `Project Nature: ${
        selectedStandardId === 'egypt' && egyptSubStandard === 'acud'
          ? `${sharedCategory} [ACUD - ${getAcudActivity().name}]`
          : activeCategory
      }`;
      cellD1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      cellD1.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

      const reportTitleRange = isSaudiExcel ? 'G1:I1' : 'H1:K1';
      worksheet.mergeCells(reportTitleRange);
      const cellTitle = worksheet.getCell(isSaudiExcel ? 'G1' : 'H1');
      cellTitle.value = 'Load Estimation Report';
      cellTitle.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF1E3A8A' } };
      cellTitle.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      worksheet.getRow(1).height = 32;

      // Row 2: Merge across full table width
      worksheet.mergeCells(`A2:${lastColLetter}2`);
      const cellA2 = worksheet.getCell('A2');
      cellA2.value = '* Table covers only normal loads. Any additional loads will be considered & added as special loads.';
      cellA2.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF444444' } };
      cellA2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      worksheet.getRow(2).height = 20;

      // Row 3: Merge across full table width
      worksheet.mergeCells(`A3:${lastColLetter}3`);
      const cellA3 = worksheet.getCell('A3');
      cellA3.value = '* For all such customers an average load requirement is considered as appropriate method for the load calculation.';
      cellA3.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF444444' } };
      cellA3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      worksheet.getRow(3).height = 20;

      // Row 4: Empty spacer row
      worksheet.getRow(4).height = 12;

      // 4. TABLE HEADERS (Row 5) - Height 30, Center-Aligned, Wrapped, Bold
      const headers = isSaudiExcel
        ? [
            'Building Name',
            'NO OF FLOORS (عدد الأدوار)',
            'Customer Category',
            'AREA(TOTAL)',
            'DPS CODE',
            'LOAD DENSITY (VA/M2)',
            'TOTAL CONNECTED LOAD (KVA)',
            'DEMAND FACTOR',
            'TOTAL DEMAND LOAD (KVA)',
          ]
        : [
            'LOAD TYPE / ITEM (نوع الحمل)',
            'ITEM NAME (اسم المبنى/المضخة)',
            'NO OF FLOORS (عدد الأدوار)',
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
      const buildingItems =
        isC1orC2 && c1c2LookupResult
          ? [
              (() => {
                const areaNum = parseEnglishNumber(saudiC1C2Area, 0);
                const connected = c1c2LookupResult.connectedLoadKva;
                const defaultDf = selectedSaudiCategoryCode === 'C1' ? 0.5 : 0.6;
                const bldOverride = buildingsDemandFactorOverrides['saudi-c1c2-building'];
                const effectiveDf =
                  bldOverride !== undefined
                    ? bldOverride === ''
                      ? 0
                      : Math.max(0, Number(bldOverride) || 0)
                    : defaultDf;
                const demand = connected * effectiveDf;
                const avgDensityVaPerM2 = areaNum > 0 ? (connected * 1000) / areaNum : 0;
                const voltageLabel = saudiC1C2Voltage === '220V' ? '220 V P-P' : '400/230 V';
                return {
                  bld: {
                    id: 'saudi-c1c2-building',
                    name: 'Building 1',
                    buildingType: sharedCategory,
                    floorsCount: 1,
                    floors: [] as FloorRowItem[],
                    totalArea: areaNum,
                  } as BuildingItem,
                  itemName: 'Building 1',
                  category: `${sharedCategory} | ${voltageLabel} | CB: ${c1c2LookupResult.circuitBreakerRating} A`,
                  dpsCode: selectedSaudiCategoryCode,
                  areaGfl: areaNum,
                  areaFfl: 0,
                  areaTotal: areaNum,
                  loadDensity: avgDensityVaPerM2,
                  connected,
                  df: effectiveDf,
                  demand,
                };
              })(),
            ]
          : isSaudiC3toC29
          ? buildingsList.map((bld) => {
              const totalAreaNum = Number(bld.totalArea) || 0;
              const estType = bld.saudiLoadEstimationType || 'standard';
              const estLabel =
                SAUDI_LOAD_ESTIMATION_OPTIONS.find((o) => o.value === estType)?.label ||
                SAUDI_LOAD_ESTIMATION_OPTIONS[0].label;
              const bldCat =
                getSaudiCategoryByCodeOrName(bld.buildingType) ||
                SAUDI_C3_TO_C29_CATEGORIES.find((c) => c.code === selectedSaudiCategoryCode) ||
                SAUDI_SEC_CATEGORIES[6];

              const connected = bld.floors.reduce((sum, fl) => {
                const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                const density = getFloorAppliedDensity(fl.name, bld.buildingType, estType);
                return sum + (rowSubtotal * density) / 100;
              }, 0);

              const floorBreakdownDemand = bld.floors.reduce((sum, fl) => {
                const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                const density = getFloorAppliedDensity(fl.name, bld.buildingType, estType);
                const conn = (rowSubtotal * density) / 100;
                const defaultFloorDf = isBasementFloorName(fl.name) ? 0.7 : bldCat.df;
                const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) || defaultFloorDf : defaultFloorDf;
                return sum + conn * df;
              }, 0);

              const defaultDf = connected > 0 ? floorBreakdownDemand / connected : bldCat.df;
              const bldOverride = buildingsDemandFactorOverrides[bld.id];
              const effectiveDf =
                bldOverride !== undefined
                  ? bldOverride === ''
                    ? 0
                    : Math.max(0, Number(bldOverride) || 0)
                  : defaultDf;
              const demand = connected * effectiveDf;

              const gfFloor = bld.floors.find((f) => /ground|g\.?f/i.test(f.name));
              const gfArea = gfFloor ? (Number(gfFloor.areaPerFloor) || 0) * (Number(gfFloor.floorsCount) || 1) : 0;
              const finalGfArea = gfArea > 0 ? gfArea : 0;
              const finalFfArea = gfArea > 0 ? Math.max(0, totalAreaNum - gfArea) : totalAreaNum;

              const fallbackDensityVA = getSaudiTable19DensityVA(
                bld.buildingType,
                estType,
                selectedSaudiCategoryCode
              );
              const avgDensityVaPerM2 = totalAreaNum > 0 ? (connected * 1000) / totalAreaNum : fallbackDensityVA;

              const cleanEstLabel = estLabel.replace(/^\d+\.\s*/, '');

              return {
                bld,
                itemName: bld.name,
                category: `${bldCat.name} { ${cleanEstLabel} }`,
                dpsCode: bldCat.code,
                areaGfl: finalGfArea,
                areaFfl: finalFfArea,
                areaTotal: totalAreaNum,
                loadDensity: avgDensityVaPerM2,
                connected,
                df: effectiveDf,
                demand,
              };
            })
          : buildingsList.map((bld, idx) => {
        const bldActiveType = selectedStandardId === 'europe'
          ? (bld.iecBuildingType || iecCategory)
          : selectedStandardId === 'usa'
          ? (bld.necBuildingType || necCategory)
          : bld.buildingType;
        const densityDivisor = (selectedStandardId === 'europe' || selectedStandardId === 'usa') ? 1000 : 100;
        const iecFallbackSf = selectedStandardId === 'europe' ? getIecCategoryByValue(bldActiveType).sf : 0.8;
        let connected = bld.floors.reduce((sum, fl) => {
          if (selectedStandardId === 'usa') {
            return sum + calcNecFloorLoads(fl, bldActiveType).totalConnected;
          }
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = getFloorAppliedDensity(fl.name, bldActiveType, bld.saudiLoadEstimationType || 'standard', fl.appliedLoadDensity);
          return sum + (rowSubtotal * density) / densityDivisor;
        }, 0);

        if (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0) {
          connected += (Number(acudEvChargers) || 0) * 150;
        }

        const floorBreakdownDemand = bld.floors.reduce((sum, fl) => {
          if (selectedStandardId === 'usa') {
            return sum + calcNecFloorLoads(fl, bldActiveType).totalDemand;
          }
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = getFloorAppliedDensity(fl.name, bldActiveType, bld.saudiLoadEstimationType || 'standard', fl.appliedLoadDensity);
          const conn = (rowSubtotal * density) / densityDivisor;
          const fallbackDf = selectedStandardId === 'europe' ? (isBasementFloorName(fl.name) ? 0.6 : iecFallbackSf) : 0.8;
          const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) ?? fallbackDf : fallbackDf;
          return sum + conn * df;
        }, 0) + (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0 ? (Number(acudEvChargers) || 0) * 150 * 0.8 : 0);

        const defaultDf = connected > 0 ? floorBreakdownDemand / connected : iecFallbackSf;
        const bldOverride = selectedStandardId === 'usa' ? undefined : buildingsDemandFactorOverrides[bld.id];
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
          : bldActiveType;

        return {
          bld,
          itemName: bld.name,
          category: categoryLabel,
          dpsCode: '',
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

        if (isSaudiExcel) {
          // Floor range below this main building row
          const floorCount = b.bld.floors.length;
          const firstFloorRow = bldMainRowIdx + 1;
          const lastFloorRow = bldMainRowIdx + floorCount;

          rowObj.getCell(1).value = b.itemName;
          rowObj.getCell(2).value = ''; // NO OF FLOORS only populated on floor sub-rows
          rowObj.getCell(3).value = b.category;

          // Col D (4): AREA(TOTAL)
          if (floorCount > 0) {
            rowObj.getCell(4).value = {
              formula: `SUM(D${firstFloorRow}:D${lastFloorRow})`,
              result: b.areaTotal,
            };
          } else {
            rowObj.getCell(4).value = b.areaTotal;
          }
          rowObj.getCell(4).numFmt = '#,##0.00';

          // Col E (5): DPS CODE
          rowObj.getCell(5).value = b.dpsCode || selectedSaudiCategoryCode;

          // Col F (6): LOAD DENSITY (VA/M2) - '---' when floor sub-rows exist, numeric for single-row (C1/C2)
          if (floorCount > 0) {
            rowObj.getCell(6).value = '---';
            rowObj.getCell(6).numFmt = '@';
          } else {
            rowObj.getCell(6).value = b.loadDensity;
            rowObj.getCell(6).numFmt = '#,##0.0';
          }

          // Col G (7): TOTAL CONNECTED LOAD (KVA) = SUM of floor sub-rows below it
          if (floorCount > 0) {
            rowObj.getCell(7).value = {
              formula: `SUM(G${firstFloorRow}:G${lastFloorRow})`,
              result: b.connected,
            };
          } else {
            rowObj.getCell(7).value = {
              formula: `(D${currentRowIndex}*F${currentRowIndex})/1000`,
              result: b.connected,
            };
          }
          rowObj.getCell(7).numFmt = '#,##0.00';

          // Col H (8): DEMAND FACTOR = "-" on main building rows
          rowObj.getCell(8).value = '-';
          rowObj.getCell(8).numFmt = '@';

          // Col I (9): TOTAL DEMAND LOAD (KVA) = SUM of floor sub-rows below it
          if (floorCount > 0) {
            rowObj.getCell(9).value = {
              formula: `SUM(I${firstFloorRow}:I${lastFloorRow})`,
              result: b.demand,
            };
          } else {
            rowObj.getCell(9).value = b.demand;
          }
          rowObj.getCell(9).numFmt = '#,##0.00';

          rowObj.height = 30;
          for (let c = 1; c <= 9; c++) {
            const cell = rowObj.getCell(c);
            cell.font = {
              name: 'Calibri',
              size: c === 3 ? 12 : 10,
              bold: true,
              color: { argb: 'FF000000' },
            };
            cell.border = thinBorder;
            if (c === 1 || c === 3) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 2 || c === 5 || c === 6 || c === 8) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }
        } else {
          rowObj.getCell(1).value = 'BUILDINGS';
          rowObj.getCell(2).value = b.itemName;
          rowObj.getCell(3).value = ''; // NO OF FLOORS only populated on floor sub-rows
          rowObj.getCell(4).value = b.category;

          // Col E (AREA GFL): numeric with dash format if 0 to avoid #VALUE! error in sum formula
          if (b.areaGfl > 0) {
            rowObj.getCell(5).value = b.areaGfl;
            rowObj.getCell(5).numFmt = '#,##0.00';
          } else {
            rowObj.getCell(5).value = 0;
            rowObj.getCell(5).numFmt = '#,##0.00;-#,##0.00;"—"';
          }

          // Col F (AREA FFL): numeric with dash format if 0 to avoid #VALUE! error in sum formula
          if (b.areaFfl > 0) {
            rowObj.getCell(6).value = b.areaFfl;
            rowObj.getCell(6).numFmt = '#,##0.00';
          } else {
            rowObj.getCell(6).value = 0;
            rowObj.getCell(6).numFmt = '#,##0.00;-#,##0.00;"—"';
          }

          // Col G (AREA TOTAL): Live formula =E{row}+F{row}
          rowObj.getCell(7).value = {
            formula: `E${currentRowIndex}+F${currentRowIndex}`,
            result: b.areaTotal,
          };
          rowObj.getCell(7).numFmt = '#,##0.00';

          // Floors range below this main building row:
          const floorCount = b.bld.floors.length;
          const firstFloorRow = bldMainRowIdx + 1;
          const lastFloorRow = bldMainRowIdx + floorCount;

          // Col H (LOAD DENSITY): numeric density for single-row buildings, "---" when floor sub-rows exist
          if (floorCount === 0 && (isC1orC2 || isSaudiC3toC29)) {
            rowObj.getCell(8).value = b.loadDensity;
            rowObj.getCell(8).numFmt = '#,##0.0';
          } else {
            rowObj.getCell(8).value = '---';
            rowObj.getCell(8).numFmt = '@';
          }

          // Col I (TOTAL CONNECTED): SUM formula of floor rows below it
          if (floorCount > 0) {
            rowObj.getCell(9).value = {
              formula: `SUM(I${firstFloorRow}:I${lastFloorRow})`,
              result: b.connected,
            };
          } else {
            rowObj.getCell(9).value = b.connected;
          }
          rowObj.getCell(9).numFmt = '#,##0.00';

          // Col J (DEMAND FACTOR) & Col K (TOTAL DEMAND LOAD)
          if (selectedStandardId === 'usa' && floorCount > 0) {
            rowObj.getCell(10).value = '-';
            rowObj.getCell(10).numFmt = '@';
            rowObj.getCell(11).value = {
              formula: `SUM(K${firstFloorRow}:K${lastFloorRow})`,
              result: b.demand,
            };
            rowObj.getCell(11).numFmt = '#,##0.00';
          } else {
            rowObj.getCell(10).value = b.df;
            rowObj.getCell(10).numFmt = '0.00';

            rowObj.getCell(11).value = {
              formula: `I${currentRowIndex}*J${currentRowIndex}`,
              result: b.demand,
            };
            rowObj.getCell(11).numFmt = '#,##0.00';
          }

          for (let c = 1; c <= 11; c++) {
            const cell = rowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF000000' } };
            cell.border = thinBorder;
            if (c === 1 || c === 2 || c === 4) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 3 || c === 8 || cell.value === '---' || cell.value === '—' || (typeof cell.value === 'number' && cell.value === 0 && cell.numFmt?.includes('"—"'))) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
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

          const floorQty = Number(fl.floorsCount) || 0;
          const floorSubtotalArea = floorQty * (Number(fl.areaPerFloor) || 0);
          const bldEstType = b.bld.saudiLoadEstimationType || 'standard';
          const bldActiveType = selectedStandardId === 'europe'
            ? (b.bld.iecBuildingType || iecCategory)
            : selectedStandardId === 'usa'
            ? (b.bld.necBuildingType || necCategory)
            : b.bld.buildingType;
          const necFloorRes = selectedStandardId === 'usa' ? calcNecFloorLoads(fl, bldActiveType) : null;
          const floorDensityKva = necFloorRes
            ? necFloorRes.lightingDensity
            : getFloorAppliedDensity(fl.name, bldActiveType, bldEstType, fl.appliedLoadDensity);
          const floorDensityVaPerM2 = necFloorRes
            ? (floorSubtotalArea > 0 ? (necFloorRes.totalConnected * 1000) / floorSubtotalArea : necFloorRes.lightingDensity)
            : (selectedStandardId === 'europe' ? floorDensityKva : floorDensityKva * 10);
          const floorConnectedKva = necFloorRes
            ? necFloorRes.totalConnected
            : (selectedStandardId === 'europe'
              ? (floorSubtotalArea * floorDensityKva) / 1000
              : (floorSubtotalArea * floorDensityKva) / 100);
          const defaultFloorDf = isSaudiExcel
            ? (isBasementFloorName(fl.name) ? 0.7 : (getSaudiCategoryByCodeOrName(b.bld.buildingType)?.df ?? 0.6))
            : selectedStandardId === 'europe'
            ? (isBasementFloorName(fl.name) ? 0.6 : getIecCategoryByValue(bldActiveType).sf)
            : 0.8;
          const floorDf = necFloorRes
            ? (necFloorRes.totalConnected > 0 ? necFloorRes.totalDemand / necFloorRes.totalConnected : 1)
            : (fl.demandFactor !== undefined
              ? (fl.demandFactor === '' ? 0 : Number(fl.demandFactor) ?? defaultFloorDf)
              : defaultFloorDf);
          const floorDemandKva = necFloorRes ? necFloorRes.totalDemand : floorConnectedKva * floorDf;

          const exactFloorName = `- ${fl.name}`;

          if (isSaudiExcel) {
            // Col A (1): Building Name -> "- " + exact floor.name
            floorRowObj.getCell(1).value = exactFloorName;

            // Col B (2): NO OF FLOORS -> repetition count
            floorRowObj.getCell(2).value = floorQty;
            floorRowObj.getCell(2).numFmt = '#,##0';

            // Col C (3): Customer Category -> empty
            floorRowObj.getCell(3).value = '';

            // Col D (4): AREA(TOTAL) -> calculated total area for that floor (area * noOfFloors)
            floorRowObj.getCell(4).value = floorSubtotalArea;
            floorRowObj.getCell(4).numFmt = '#,##0.00';

            // Col E (5): DPS CODE -> empty
            floorRowObj.getCell(5).value = '';

            // Col F (6): LOAD DENSITY (VA/M2)
            floorRowObj.getCell(6).value = floorDensityVaPerM2;
            floorRowObj.getCell(6).numFmt = '#,##0.00';

            // Col G (7): TOTAL CONNECTED LOAD (KVA) -> exact calculated value
            floorRowObj.getCell(7).value = floorConnectedKva;
            floorRowObj.getCell(7).numFmt = '#,##0.00';

            // Col H (8): DEMAND FACTOR
            floorRowObj.getCell(8).value = floorDf;
            floorRowObj.getCell(8).numFmt = '0.00';

            // Col I (9): TOTAL DEMAND LOAD (KVA) -> exact calculated value
            floorRowObj.getCell(9).value = floorDemandKva;
            floorRowObj.getCell(9).numFmt = '#,##0.00';

            for (let c = 1; c <= 9; c++) {
              const cell = floorRowObj.getCell(c);
              cell.font = { name: 'Calibri', size: 9.5, bold: false, color: { argb: 'FF374151' } };
              cell.fill = floorRowFill;
              cell.border = thinBorder;
              if (c === 1 || c === 3) {
                cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
              } else if (c === 2 || c === 5) {
                cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
              } else {
                cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
              }
            }
          } else {
            // Col A (LOAD TYPE): empty (merged across building group)
            floorRowObj.getCell(1).value = '';

            // Col B (ITEM NAME): "- " + exact floor.name
            floorRowObj.getCell(2).value = exactFloorName;

            // Col C (NO OF FLOORS): repetition count
            floorRowObj.getCell(3).value = floorQty;
            floorRowObj.getCell(3).numFmt = '#,##0';

            // Col D (CATEGORY): empty
            floorRowObj.getCell(4).value = '';

            // Col E (AREA GFL) & Col F (AREA FFL): dash
            floorRowObj.getCell(5).value = '—';
            floorRowObj.getCell(6).value = '—';

            // Col G (AREA TOTAL): total area for that floor (area * noOfFloors)
            floorRowObj.getCell(7).value = floorSubtotalArea;
            floorRowObj.getCell(7).numFmt = '#,##0.00';

            // Col H (LOAD DENSITY)
            floorRowObj.getCell(8).value = floorDensityVaPerM2;
            floorRowObj.getCell(8).numFmt = '#,##0.00';

            // Col I (TOTAL CONNECTED)
            if (necFloorRes && floorSubtotalArea <= 0) {
              floorRowObj.getCell(9).value = floorConnectedKva;
            } else {
              floorRowObj.getCell(9).value = {
                formula: `(G${currentRowIndex}*H${currentRowIndex})/1000`,
                result: floorConnectedKva,
              };
            }
            floorRowObj.getCell(9).numFmt = '#,##0.00';

            // Col J (DEMAND FACTOR)
            floorRowObj.getCell(10).value = floorDf;
            floorRowObj.getCell(10).numFmt = '0.00';

            // Col K (TOTAL DEMAND LOAD): Live formula =I{row}*J{row}
            floorRowObj.getCell(11).value = {
              formula: `I${currentRowIndex}*J${currentRowIndex}`,
              result: floorDemandKva,
            };
            floorRowObj.getCell(11).numFmt = '#,##0.00';

            // STYLE: Regular (not bold), slightly smaller font (size 9.5), light gray background #F9FAFB, thin borders
            for (let c = 1; c <= 11; c++) {
              const cell = floorRowObj.getCell(c);
              cell.font = { name: 'Calibri', size: 9.5, bold: false, color: { argb: 'FF374151' } };
              cell.fill = floorRowFill;
              cell.border = thinBorder;
              if (c === 1 || c === 2 || c === 4) {
                cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
              } else if (c === 3 || c === 5 || c === 6) {
                cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
              } else {
                cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
              }
            }
          }

          currentRowIndex++;
        });
      });

      const bldEndRow = currentRowIndex - 1;
      if (!isSaudiExcel) {
        if (bldEndRow > bldStartRow) {
          worksheet.mergeCells(`A${bldStartRow}:A${bldEndRow}`);
          worksheet.getCell(`A${bldStartRow}`).value = 'BUILDINGS';
          worksheet.getCell(`A${bldStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          worksheet.getCell(`A${bldStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E3A8A' } };
        } else if (bldEndRow === bldStartRow) {
          worksheet.getCell(`A${bldStartRow}`).value = 'BUILDINGS';
          worksheet.getCell(`A${bldStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E3A8A' } };
        }
      }

      // 3.2 Group: PUMPS (Excluded for IEC / 'europe')
      const pumpItems = includeAdditionalLoads && selectedStandardId !== 'europe' ? pumps.map((p) => {
        const connected = calculatePumpKva(p.power, p.unit, p.efficiency, p.pf);
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
      }) : [];

      const pumpStartRow = currentRowIndex;
      pumpItems.forEach((p) => {
        const rowObj = worksheet.getRow(currentRowIndex);
        rowObj.height = 25;

        if (isSaudiExcel) {
          rowObj.getCell(1).value = p.itemName;
          rowObj.getCell(2).value = '';
          rowObj.getCell(3).value = p.category;
          rowObj.getCell(4).value = '—';
          rowObj.getCell(5).value = 'PUMP';
          rowObj.getCell(6).value = '—';
          rowObj.getCell(7).value = p.connected;
          rowObj.getCell(7).numFmt = '#,##0.00';
          rowObj.getCell(8).value = p.df;
          rowObj.getCell(8).numFmt = '0.00';
          rowObj.getCell(9).value = {
            formula: `G${currentRowIndex}*H${currentRowIndex}`,
            result: p.demand,
          };
          rowObj.getCell(9).numFmt = '#,##0.00';

          for (let c = 1; c <= 9; c++) {
            const cell = rowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
            cell.border = thinBorder;
            if (c === 1 || c === 3) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 2 || (c >= 4 && c <= 6)) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }
        } else {
          rowObj.getCell(1).value = 'PUMPS';
          rowObj.getCell(2).value = p.itemName;
          rowObj.getCell(3).value = '';
          rowObj.getCell(4).value = p.category;
          rowObj.getCell(5).value = '—';
          rowObj.getCell(6).value = '—';
          rowObj.getCell(7).value = '—';
          rowObj.getCell(8).value = '—';
          rowObj.getCell(9).value = p.connected;
          rowObj.getCell(9).numFmt = '#,##0.00';
          rowObj.getCell(10).value = p.df;
          rowObj.getCell(10).numFmt = '0.00';
          rowObj.getCell(11).value = p.demand;
          rowObj.getCell(11).numFmt = '#,##0.00';

          for (let c = 1; c <= 11; c++) {
            const cell = rowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
            cell.border = thinBorder;
            if (c === 1 || c === 2 || c === 4) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 3 || (c >= 5 && c <= 8)) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }
        }

        currentRowIndex++;
      });
      const pumpEndRow = currentRowIndex - 1;
      if (!isSaudiExcel) {
        if (pumpEndRow > pumpStartRow) {
          worksheet.mergeCells(`A${pumpStartRow}:A${pumpEndRow}`);
          worksheet.getCell(`A${pumpStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          worksheet.getCell(`A${pumpStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF92400E' } };
        } else if (pumpEndRow === pumpStartRow) {
          worksheet.getCell(`A${pumpStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF92400E' } };
        }
      }

      // 3.3 Group: EXTRA LOADS
      const extraItems: {
        itemName: string;
        category: string;
        areaVal?: number | string;
        densityVal?: number | string;
        connected: number;
        df: number;
        demand: number;
      }[] = includeAdditionalLoads
        ? selectedStandardId === 'europe'
          ? iecExtraLoads.map((item) => {
              const spec = getIecExtraLoadSpec(item.name);
              const isInst = spec ? spec.density === 0 : item.category === 'Installation';
              const density = isInst ? 0 : getIecExtraLoadDensity(spec, iecDemandType);
              const areaNum = isInst ? 0 : Math.max(0, parseEnglishNumber(item.area, 0));
              const connected = isInst
                ? Math.max(0, parseEnglishNumber(item.directPowerKw, 0))
                : (areaNum * density) / 1000;
              const sf = spec ? spec.sf : item.sf;
              const demand = connected * sf;
              return {
                itemName: item.name,
                category: item.category,
                areaVal: isInst ? '—' : areaNum,
                densityVal: isInst ? '—' : density,
                connected,
                df: sf,
                demand,
              };
            })
          : extraLoads.map((e) => {
              const unitKva = calculateExtraLoadUnitKva(e.power, e.unit);
              const connected = unitKva * (Number(e.qty) || 1);
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
            })
        : [];

      const extraStartRow = currentRowIndex;
      extraItems.forEach((e) => {
        const rowObj = worksheet.getRow(currentRowIndex);
        rowObj.height = 25;

        if (isSaudiExcel) {
          rowObj.getCell(1).value = e.itemName;
          rowObj.getCell(2).value = '';
          rowObj.getCell(3).value = e.category;
          rowObj.getCell(4).value = '—';
          rowObj.getCell(5).value = 'EXTRA';
          rowObj.getCell(6).value = '—';
          rowObj.getCell(7).value = e.connected;
          rowObj.getCell(7).numFmt = '#,##0.00';
          rowObj.getCell(8).value = e.df;
          rowObj.getCell(8).numFmt = '0.00';
          rowObj.getCell(9).value = {
            formula: `G${currentRowIndex}*H${currentRowIndex}`,
            result: e.demand,
          };
          rowObj.getCell(9).numFmt = '#,##0.00';

          for (let c = 1; c <= 9; c++) {
            const cell = rowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
            cell.border = thinBorder;
            if (c === 1 || c === 3) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 2 || (c >= 4 && c <= 6)) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }
        } else {
          rowObj.getCell(1).value = 'EXTRA LOADS';
          rowObj.getCell(2).value = e.itemName;
          rowObj.getCell(3).value = '';
          rowObj.getCell(4).value = e.category;
          rowObj.getCell(5).value = '—';
          rowObj.getCell(6).value = '—';
          if (typeof e.areaVal === 'number') {
            rowObj.getCell(7).value = e.areaVal;
            rowObj.getCell(7).numFmt = '#,##0.00';
          } else {
            rowObj.getCell(7).value = e.areaVal ?? '—';
          }
          if (typeof e.densityVal === 'number') {
            rowObj.getCell(8).value = e.densityVal;
            rowObj.getCell(8).numFmt = '#,##0.0';
          } else {
            rowObj.getCell(8).value = e.densityVal ?? '—';
          }
          rowObj.getCell(9).value = e.connected;
          rowObj.getCell(9).numFmt = '#,##0.00';
          rowObj.getCell(10).value = e.df;
          rowObj.getCell(10).numFmt = '0.00';
          rowObj.getCell(11).value = e.demand;
          rowObj.getCell(11).numFmt = '#,##0.00';

          for (let c = 1; c <= 11; c++) {
            const cell = rowObj.getCell(c);
            cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF000000' } };
            cell.border = thinBorder;
            if (c === 1 || c === 2 || c === 4) {
              cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            } else if (c === 3 || (c >= 5 && c <= 8)) {
              cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            } else {
              cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
            }
          }
        }

        currentRowIndex++;
      });
      const extraEndRow = currentRowIndex - 1;
      if (!isSaudiExcel) {
        if (extraEndRow > extraStartRow) {
          worksheet.mergeCells(`A${extraStartRow}:A${extraEndRow}`);
          worksheet.getCell(`A${extraStartRow}`).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
          worksheet.getCell(`A${extraStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF581C87' } };
        } else if (extraEndRow === extraStartRow) {
          worksheet.getCell(`A${extraStartRow}`).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF581C87' } };
        }
      }

      // 2. SUMMARY SECTION ALIGNMENT (Bottom Rows)
      const dataStartRow = 6;
      const dataEndRow = currentRowIndex - 1;

      const allItems = [...buildingItems, ...pumpItems, ...extraItems];
      const totalConnectedAll = allItems.reduce((sum, item) => sum + item.connected, 0);
      const totalDemandBeforeDiversity = allItems.reduce((sum, item) => sum + item.demand, 0);
      const isIecExcel = selectedStandardId === 'europe';
      const isNecExcel = selectedStandardId === 'usa';
      const numericIecPfExcel = iecPowerFactor === '' ? 0 : Math.max(0, Number(iecPowerFactor) || 0);
      const diversityFactorVal = isSaudiExcel
        ? coincidentFactor
        : isNecExcel
        ? (necDiversityFactor === '' ? 0 : Math.max(0, Number(necDiversityFactor) || 0))
        : (projectDiversityFactor === '' ? 0 : Math.max(0, Number(projectDiversityFactor) || 0));
      const totalLoadAfterDiversity = isIecExcel
        ? (numericIecPfExcel > 0 ? totalDemandBeforeDiversity / numericIecPfExcel : 0)
        : totalDemandBeforeDiversity * diversityFactorVal;

      // 1. DYNAMIC SPARE CAPACITY & TRANSFORMER VALUES FROM STATE
      const numericSparePercent = spareCapacityPercent === '' ? 0 : Math.max(0, Number(spareCapacityPercent) || 0);
      const spareMultiplier = 1 + (numericSparePercent / 100);
      const spareCapacityVal = `${numericSparePercent}% (${spareMultiplier.toFixed(2)})`;
      const totalLoadWithSpare = totalLoadAfterDiversity * spareMultiplier;

      const numericLoadingRatio = transformerLoadingRatio === '' ? 80 : Math.max(1, Number(transformerLoadingRatio) || 80);
      const loadingRatioDecimal = numericLoadingRatio / 100;
      const loadingRatioText = `${numericLoadingRatio}% (${loadingRatioDecimal.toFixed(2)})`;
      const requiredTransformerKva = totalLoadWithSpare / loadingRatioDecimal;

      const numericQty = transformerQty === '' ? 1 : Math.max(1, parseInt(String(transformerQty), 10) || 1);
      const selectedSize = Number(selectedTransformerSize) || 1000;
      const selectedTransText = `${numericQty} x ${selectedSize} kVA`;

      // 2. CHANGE COLORS (No Gray!): Very light, elegant Blue #EFF6FF with dark text
      const summaryFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: 'FFEFF6FF' }, // Light elegant Blue #EFF6FF
      };

      const summaryStartRow = currentRowIndex;

      const formatSummaryRow = (rowNum: number, label: string, value: any, numFmt?: string) => {
        worksheet.mergeCells(`A${rowNum}:${labelEndColLetter}${rowNum}`);
        const r = worksheet.getRow(rowNum);
        r.height = 25;
        for (let c = 1; c <= totalCols; c++) {
          const cell = r.getCell(c);
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF1E293B' } };
          cell.fill = summaryFill;
          cell.border = thinBorder;
          cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
        }
        r.getCell(1).value = label;
        const valCell = r.getCell(totalCols);
        valCell.value = value;
        valCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
        if (numFmt) valCell.numFmt = numFmt;
      };

      const connectedCellRanges: string[] = [];
      if (mainBuildingRowIndices.length > 0) {
        connectedCellRanges.push(...mainBuildingRowIndices.map((r) => `${connectedColLetter}${r}`));
      }
      if (pumpItems.length > 0 && pumpEndRow >= pumpStartRow) {
        connectedCellRanges.push(`${connectedColLetter}${pumpStartRow}:${connectedColLetter}${pumpEndRow}`);
      }
      if (extraItems.length > 0 && extraEndRow >= extraStartRow) {
        connectedCellRanges.push(`${connectedColLetter}${extraStartRow}:${connectedColLetter}${extraEndRow}`);
      }
      const totalConnectedFormula = connectedCellRanges.length > 0 ? `SUM(${connectedCellRanges.join(',')})` : '0';

      const demandCellRanges: string[] = [];
      if (mainBuildingRowIndices.length > 0) {
        demandCellRanges.push(...mainBuildingRowIndices.map((r) => `${demandColLetter}${r}`));
      }
      if (pumpItems.length > 0 && pumpEndRow >= pumpStartRow) {
        demandCellRanges.push(`${demandColLetter}${pumpStartRow}:${demandColLetter}${pumpEndRow}`);
      }
      if (extraItems.length > 0 && extraEndRow >= extraStartRow) {
        demandCellRanges.push(`${demandColLetter}${extraStartRow}:${demandColLetter}${extraEndRow}`);
      }
      const totalDemandFormula = demandCellRanges.length > 0 ? `SUM(${demandCellRanges.join(',')})` : '0';

      // Summary Row 1: TOTAL CONNECTED LOAD (KVA / kW)
      formatSummaryRow(
        currentRowIndex++,
        isIecExcel ? 'TOTAL CONNECTED LOAD (kW)' : 'TOTAL CONNECTED LOAD (KVA)',
        {
          formula: totalConnectedFormula,
          result: totalConnectedAll,
        },
        '#,##0.00'
      );

      const totalDemandRow = currentRowIndex;
      // Summary Row 2: TOTAL DEMAND LOAD
      formatSummaryRow(
        currentRowIndex++,
        isIecExcel
          ? 'TOTAL DEMAND LOAD (kW)'
          : isSaudiExcel
          ? 'TOTAL DEMAND LOAD (Before Coincident)'
          : 'TOTAL DEMAND LOAD (Before Diversity)',
        {
          formula: totalDemandFormula,
          result: totalDemandBeforeDiversity,
        },
        '#,##0.00'
      );

      const diversityFactorRow = currentRowIndex;
      // Summary Row 3: POWER FACTOR (IEC) / COINCIDENT FACTOR (Saudi) / DIVERSITY FACTOR (Others)
      formatSummaryRow(
        currentRowIndex++,
        isIecExcel
          ? 'POWER FACTOR (PF)'
          : isSaudiExcel
          ? 'COINCIDENT FACTOR (CF)'
          : 'DIVERSITY FACTOR',
        isIecExcel ? numericIecPfExcel : diversityFactorVal,
        isSaudiExcel ? '0.000' : '0.00'
      );

      const totalAfterDiversityRow = currentRowIndex;
      // Summary Row 4: TOTAL DEMAND LOAD (KVA) (IEC) / TOTAL LOAD AFTER COINCIDENT or DIVERSITY (KVA)
      formatSummaryRow(
        currentRowIndex++,
        isIecExcel
          ? 'TOTAL DEMAND LOAD (KVA)'
          : isSaudiExcel
          ? 'TOTAL LOAD AFTER COINCIDENT FACTOR (KVA)'
          : 'TOTAL LOAD AFTER DIVERSITY (KVA)',
        {
          formula: isIecExcel
            ? `${demandColLetter}${totalDemandRow}/${demandColLetter}${diversityFactorRow}`
            : `${demandColLetter}${totalDemandRow}*${demandColLetter}${diversityFactorRow}`,
          result: totalLoadAfterDiversity,
        },
        '#,##0.00'
      );

      const spareCapacityRow = currentRowIndex;
      // Summary Row 5: SPARE CAPACITY (Dynamic from state)
      formatSummaryRow(currentRowIndex++, `SPARE CAPACITY (${numericSparePercent}%)`, spareCapacityVal);

      const totalWithSpareRow = currentRowIndex;
      // Summary Row 6: TOTAL LOAD WITH SPARE (KVA)
      formatSummaryRow(currentRowIndex++, 'TOTAL LOAD WITH SPARE (KVA)', {
        formula: `${demandColLetter}${totalAfterDiversityRow}*${spareMultiplier.toFixed(2)}`,
        result: totalLoadWithSpare,
      }, '#,##0.00');

      // Dynamic transformer sizes list based on selected standard
      const allowedSizes =
        selectedStandardId === 'saudi'
          ? [500, 1000, 1500]
          : selectedStandardId === 'usa'
          ? NEC_TRANSFORMER_SIZES
          : [100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500];

      if (includeTransformer) {
        // Summary Row 6: TRANSFORMER LOADING RATIO (Dynamic from state)
        formatSummaryRow(currentRowIndex++, 'TRANSFORMER LOADING RATIO', loadingRatioText);

        // Summary Row 7: REQUIRED TRANSFORMER (KVA)
        formatSummaryRow(currentRowIndex++, 'REQUIRED TRANSFORMER (KVA)', {
          formula: `${demandColLetter}${totalWithSpareRow}/${loadingRatioDecimal.toFixed(2)}`,
          result: requiredTransformerKva,
        }, '#,##0.00');

        // Summary Row 8: SELECTED TRANSFORMER (KVA)
        // Formatted string: "{quantity} x {size} kVA"
        formatSummaryRow(currentRowIndex++, 'SELECTED TRANSFORMER (KVA)', selectedTransText);

        // Summary Row 9: ACTUAL TRANSFORMER LOADING RATIO (Matches 5th Calculation Result card)
        const totalInstalledKvaExcel = selectedSize * numericQty;
        const actualLoadingRatioFraction = totalInstalledKvaExcel > 0 ? totalLoadWithSpare / totalInstalledKvaExcel : 0;
        formatSummaryRow(currentRowIndex++, 'ACTUAL TRANSFORMER LOADING RATIO (نسبة تحميل المحول)', {
          formula: `${demandColLetter}${totalWithSpareRow}/(${selectedSize}*${numericQty})`,
          result: actualLoadingRatioFraction,
        }, '0.0%');
      }

      const summaryEndRow = currentRowIndex - 1;

      let refRow = -1;
      let transTitleRowNum = -1;

      if (includeTransformer) {
        // Summary Row 9 (Reference)
        refRow = currentRowIndex++;
        worksheet.mergeCells(`A${refRow}:${lastColLetter}${refRow}`);
        const refRowObj = worksheet.getRow(refRow);
        refRowObj.height = 24;
        for (let c = 1; c <= totalCols; c++) {
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
        transTitleRowNum = currentRowIndex;
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

        allowedSizes.forEach((size) => {
          const isMatch = size === selectedSize;
          const sizeRow = worksheet.getRow(currentRowIndex);
          sizeRow.height = 24;

          const c1 = sizeRow.getCell(1);
          c1.value = size;
          c1.numFmt = size % 1 !== 0 ? '#,##0.0" kVA"' : '#,##0" kVA"';
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
      }

      // 3. AUTO-FIT COLUMN WIDTHS (Crucial)
      // Calculate max length of text for each column A through K (colIdx 1..N)
      // Set column.width = Math.max(maxLength + 3, 12)
      worksheet.columns.forEach((column: any, colIdx: number) => {
        let maxLength = 0;
        const colNumber = colIdx + 1; // 1-based (1 = A, 2 = B, ..., 10 = J)

        column.eachCell({ includeEmpty: false }, (cell: any) => {
          // Do not let merged header rows 1-3 blow up column widths
          if (cell.row <= 3) return;

          // Do not let summary labels merged across label columns inflate single column width
          if (cell.row >= summaryStartRow && cell.row <= summaryEndRow && colNumber < totalCols) return;

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

      const lightGrayFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: 'FFE5E7EB' },
      };

      const addEgyptianTables = (wb: any) => {
        const tablesSheet = wb.addWorksheet('Egyptian Code Tables');
        tablesSheet.columns = [
          { width: 26 }, // Col A: Table 3-3 Type
          { width: 14 }, // Col B: Table 3-3 Demand (B:C)
          { width: 14 }, // Col C: Table 3-3 Demand (B:C)
          { width: 6 },  // Col D: Spacer
          { width: 24 }, // Col E: Table 3-4 Type
          { width: 14 }, // Col F: Table 3-4 Demand (F:G)
          { width: 14 }, // Col G: Table 3-4 Demand (F:G)
          { width: 6 },  // Col H: Spacer
          { width: 30 }, // Col I: Table 3-6 Area
          { width: 14 }, // Col J: Table 3-6 Res
          { width: 18 }, // Col K: Table 3-6 Shops/Offices
        ];

        const styleTableTitleRange = (rowNum: number, startCol: number, endCol: number, title: string, height = 36) => {
          const startLetter = String.fromCharCode(64 + startCol);
          const endLetter = String.fromCharCode(64 + endCol);
          tablesSheet.mergeCells(`${startLetter}${rowNum}:${endLetter}${rowNum}`);
          const rowObj = tablesSheet.getRow(rowNum);
          rowObj.height = height;
          const firstCell = rowObj.getCell(startCol);
          firstCell.value = title;
          firstCell.font = { name: 'Calibri', size: 12, bold: true, color: { argb: 'FF000000' } };
          firstCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
          for (let c = startCol; c <= endCol; c++) {
            rowObj.getCell(c).border = thinBorder;
          }
        };

        const styleHeaderCell = (rowNum: number, colNum: number, text: string) => {
          const cell = tablesSheet.getRow(rowNum).getCell(colNum);
          cell.value = text;
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
          cell.fill = lightGrayFill;
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        const styleDataCell = (
          rowNum: number,
          colNum: number,
          val: string | number,
          align: 'right' | 'center'
        ) => {
          const cell = tablesSheet.getRow(rowNum).getCell(colNum);
          cell.value = val === '' ? '' : val;
          cell.font = { name: 'Calibri', size: 11, bold: false, color: { argb: 'FF000000' } };
          cell.alignment = { horizontal: align, vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        // TOP TABLES (Side-by-Side: Table 3-3, Table 3-4, Table 3-6)
        styleTableTitleRange(1, 1, 3, 'جدول (3-3) نماذج الطلب للمباني السكنية أقل من 15 طابقاً', 36);
        styleTableTitleRange(1, 5, 7, 'جدول (3-4) نماذج الطلب للمباني السكنية أكثر من 15 طابقاً', 36);
        styleTableTitleRange(1, 9, 11, 'جدول (3-6) السعات النمطية للمباني أكثر من 15 دوراً', 36);

        tablesSheet.getRow(2).height = 28;
        // Table 3-3 Headers (A2, B2:C2)
        styleHeaderCell(2, 1, 'النوع');
        tablesSheet.mergeCells('B2:C2');
        styleHeaderCell(2, 2, 'الطلب (ك.ف.أ / 100 م²)');
        tablesSheet.getRow(2).getCell(3).border = thinBorder;
        tablesSheet.getRow(2).getCell(3).fill = lightGrayFill;

        // Table 3-4 Headers (E2, F2:G2)
        styleHeaderCell(2, 5, 'النوع');
        tablesSheet.mergeCells('F2:G2');
        styleHeaderCell(2, 6, 'الطلب (ك.ف.أ / 100 م²)');
        tablesSheet.getRow(2).getCell(7).border = thinBorder;
        tablesSheet.getRow(2).getCell(7).fill = lightGrayFill;

        // Table 3-6 Headers (I2, J2, K2)
        styleHeaderCell(2, 9, 'المنطقة');
        styleHeaderCell(2, 10, 'مسكن');
        styleHeaderCell(2, 11, 'محلات أو مكاتب');

        // Table 3-3 Data Rows (Rows 3-6)
        const tableARows: [string, string][] = [
          ['إسكان منخفض التكاليف', '1.5 - 2'],
          ['إسكان متوسط', '2.5 - 4'],
          ['إسكان فاخر', '6 - 10'],
          ['إداري', '6 - 12'],
        ];
        tableARows.forEach(([typeName, demandRange], idx) => {
          const r = 3 + idx;
          tablesSheet.getRow(r).height = 24;
          styleDataCell(r, 1, typeName, 'right');
          tablesSheet.mergeCells(`B${r}:C${r}`);
          styleDataCell(r, 2, demandRange, 'center');
          tablesSheet.getRow(r).getCell(3).border = thinBorder;
        });

        // Table 3-4 Data Rows (Rows 3-4)
        const tableBRows: [string, string][] = [
          ['سكنى', '8 - 10'],
          ['إداري', '12'],
        ];
        tableBRows.forEach(([typeName, demandRange], idx) => {
          const r = 3 + idx;
          styleDataCell(r, 5, typeName, 'right');
          tablesSheet.mergeCells(`F${r}:G${r}`);
          styleDataCell(r, 6, demandRange, 'center');
          tablesSheet.getRow(r).getCell(7).border = thinBorder;
        });

        // Table 3-6 Data Row (Row 3)
        styleDataCell(3, 9, 'جميع المواقع بالقاهرة الكبرى', 'right');
        styleDataCell(3, 10, '8', 'center');
        styleDataCell(3, 11, '12', 'center');
      };

      const addAcudTables = (wb: any) => {
        const acudSheet = wb.addWorksheet('ACUD Code Tables');
        acudSheet.columns = [
          { width: 42 }, // Col A: Table 1 Project Activity
          { width: 34 }, // Col B: Table 1 KVA / 100 m²
          { width: 6 },  // Col C: Spacer
          { width: 28 }, // Col D: Table 2 Node
          { width: 15 }, // Col E: Table 2 D.F.
          { width: 6 },  // Col F: Spacer
          { width: 25 }, // Col G: Table 3 Project Activity
          { width: 22 }, // Col H: Table 3 EV Car Charger Load
        ];

        const styleAcudTitle = (
          rowNum: number,
          startCol: number,
          endCol: number,
          title: string,
          fontSize: number
        ) => {
          const startLetter = String.fromCharCode(64 + startCol);
          const endLetter = String.fromCharCode(64 + endCol);
          acudSheet.mergeCells(`${startLetter}${rowNum}:${endLetter}${rowNum}`);
          const rowObj = acudSheet.getRow(rowNum);
          const firstCell = rowObj.getCell(startCol);
          firstCell.value = title;
          firstCell.font = { name: 'Calibri', size: fontSize, bold: true, color: { argb: 'FF000000' } };
          firstCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          for (let c = startCol; c <= endCol; c++) {
            rowObj.getCell(c).border = thinBorder;
          }
        };

        const styleAcudHeader = (rowNum: number, colNum: number, text: string) => {
          const cell = acudSheet.getRow(rowNum).getCell(colNum);
          cell.value = text;
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
          cell.fill = lightGrayFill;
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        const styleAcudData = (
          rowNum: number,
          colNum: number,
          val: string | number,
          align: 'left' | 'center'
        ) => {
          const cell = acudSheet.getRow(rowNum).getCell(colNum);
          cell.value = val;
          cell.font = { name: 'Calibri', size: 11, bold: false, color: { argb: 'FF000000' } };
          cell.alignment = { horizontal: align, vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        acudSheet.getRow(1).height = 36;
        acudSheet.getRow(2).height = 30;
        acudSheet.getRow(3).height = 26;

        // TABLE 1: LOAD ESTIMATE FACTORS (Cols A-B, Row 1-18)
        styleAcudTitle(1, 1, 2, 'ACUD Load Estimate Factors for Different Building Types', 14);
        styleAcudHeader(2, 1, 'Project Activity');
        styleAcudHeader(2, 2, 'KVA / 100 m²');

        const acudTable1Rows: [string, string][] = [
          ['Residential', '8'],
          ['Administrative', '10'],
          ['Commercial', '12'],
          ['Basement (garage)', '3'],
          ['Hospitals / Medical Facilities', '20'],
          ['Banks', '16'],
          ['Medical Clinics', '17.5'],
          ['Mosques / churches', '8'],
          ['Hotels', '18'],
          ['Universities / High Educational Facilities', '15'],
          ['Schools', '14'],
          ['Sports facilities', '12'],
          ['Outdoor Parks and Gardens', '0.5'],
          ['Public Services Facilities', '5'],
          ['Fuel Stations', '8 + (No. of EV charges x 150 kVA)'],
          ['Factories', '30'],
        ];
        acudTable1Rows.forEach(([activity, factor], idx) => {
          const r = 3 + idx;
          if (r > 3) acudSheet.getRow(r).height = 24;
          styleAcudData(r, 1, activity, 'left');
          styleAcudData(r, 2, factor, 'center');
        });

        // TABLE 2: DIVERSITY FACTORS (Cols D-E, Row 2-7)
        styleAcudTitle(2, 4, 5, 'Diversity Factors at Distribution Points', 12);
        styleAcudHeader(3, 4, 'Node');
        styleAcudHeader(3, 5, 'D.F.');

        const acudTable2Rows: [string, string][] = [
          ['Coffree', '0.8'],
          ['Feeder pillar / Submain DB', '0.8'],
          ['Transformer', '0.8'],
          ['Distributor', '0.8'],
        ];
        acudTable2Rows.forEach(([nodeName, dfVal], idx) => {
          const r = 4 + idx;
          styleAcudData(r, 4, nodeName, 'left');
          styleAcudData(r, 5, dfVal, 'center');
        });

        // TABLE 3: EV CAR CHARGER LOAD (Cols G-H, Row 2-6)
        styleAcudTitle(2, 7, 8, 'EV Car Charger Load', 12);
        styleAcudHeader(3, 7, 'Project Activity');
        styleAcudHeader(3, 8, 'EV Car Charger Load');

        const acudTable3Rows: [string, string][] = [
          ['Residential Area', '11 kw'],
          ['Administration Area', '22 kw'],
          ['Commercial Area', '50 kw'],
        ];
        acudTable3Rows.forEach(([activity, evLoad], idx) => {
          const r = 4 + idx;
          styleAcudData(r, 7, activity, 'left');
          styleAcudData(r, 8, evLoad, 'center');
        });
      };

      const addSaudiTables = (wb: any) => {
        const saudiSheet = wb.addWorksheet('Saudi Code Tables');
        saudiSheet.columns = [
          { width: 10 }, // Col A: Table 19 Code
          { width: 38 }, // Col B: Table 19 Category
          { width: 22 }, // Col C: Table 19 Standard VA/m²
          { width: 22 }, // Col D: Table 19 No AC VA/m²
          { width: 24 }, // Col E: Table 19 Winter Peak VA/m²
          { width: 5 },  // Col F: Spacer
          { width: 10 }, // Col G: Table 20 Code
          { width: 36 }, // Col H: Table 20 Category
          { width: 16 }, // Col I: Table 20 Demand Factor
          { width: 5 },  // Col J: Spacer
          { width: 8 },  // Col K: Table 21 N (1-25)
          { width: 10 }, // Col L: Table 21 CF (1-25)
          { width: 8 },  // Col M: Table 21 N (26-50)
          { width: 10 }, // Col N: Table 21 CF (26-50)
          { width: 8 },  // Col O: Table 21 N (51-75)
          { width: 10 }, // Col P: Table 21 CF (51-75)
          { width: 8 },  // Col Q: Table 21 N (76-100)
          { width: 10 }, // Col R: Table 21 CF (76-100)
        ];

        const styleSaudiTitle = (
          rowNum: number,
          startCol: number,
          endCol: number,
          title: string
        ) => {
          const startLetter = String.fromCharCode(64 + startCol);
          const endLetter = String.fromCharCode(64 + endCol);
          saudiSheet.mergeCells(`${startLetter}${rowNum}:${endLetter}${rowNum}`);
          const rowObj = saudiSheet.getRow(rowNum);
          const firstCell = rowObj.getCell(startCol);
          firstCell.value = title;
          firstCell.font = { name: 'Calibri', size: 13, bold: true, color: { argb: 'FF000000' } };
          firstCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          for (let c = startCol; c <= endCol; c++) {
            rowObj.getCell(c).border = thinBorder;
          }
        };

        const styleSaudiHeader = (rowNum: number, colNum: number, text: string) => {
          const cell = saudiSheet.getRow(rowNum).getCell(colNum);
          cell.value = text;
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
          cell.fill = lightGrayFill;
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        const highlightFill = {
          type: 'pattern' as const,
          pattern: 'solid' as const,
          fgColor: { argb: 'FFC6EFCE' },
        };
        const highlightFont = {
          name: 'Calibri',
          size: 11,
          bold: true,
          color: { argb: 'FF006100' },
        };

        const selectedSaudiCodes = new Set<string>(
          isC1orC2 || buildingsList.length === 0
            ? [selectedSaudiCategoryCode]
            : buildingsList.map(
                (b) => getSaudiCategoryByCodeOrName(b.buildingType)?.code || selectedSaudiCategoryCode
              )
        );
        const activeMetersCount =
          numberOfMeters === '' ? 1 : Math.max(1, parseInt(String(numberOfMeters), 10) || 1);

        const styleSaudiData = (
          rowNum: number,
          colNum: number,
          val: string | number,
          align: 'left' | 'center',
          isHighlighted = false
        ) => {
          const cell = saudiSheet.getRow(rowNum).getCell(colNum);
          cell.value = val;
          if (isHighlighted) {
            cell.fill = highlightFill;
            cell.font = highlightFont;
          } else {
            cell.font = { name: 'Calibri', size: 11, bold: false, color: { argb: 'FF000000' } };
          }
          cell.alignment = { horizontal: align, vertical: 'middle', wrapText: true };
          cell.border = thinBorder;
        };

        saudiSheet.getRow(1).height = 34;
        saudiSheet.getRow(2).height = 36;

        // TABLE 19: SEC Connected Load Density Estimation (Cols A-E, Rows 1-31)
        styleSaudiTitle(1, 1, 5, 'SEC Table 19 — Connected Load Density Estimation (VA/m²)');
        const table19Headers = [
          'Code',
          'Building Category',
          '1. Lights + AC + Sockets (VA/m²)',
          '2. Lights + Sockets (No AC) (VA/m²)',
          '3. Lights + Heating + Sockets (VA/m²)',
        ];
        table19Headers.forEach((h, idx) => styleSaudiHeader(2, 1 + idx, h));

        SAUDI_TABLE_19.forEach((row, idx) => {
          const r = 3 + idx;
          const isSelected = selectedSaudiCodes.has(row.code);
          saudiSheet.getRow(r).height = 24;
          styleSaudiData(r, 1, row.code, 'center', isSelected);
          styleSaudiData(r, 2, row.category, 'left', isSelected);
          styleSaudiData(r, 3, row.areaBasedVA, 'center', isSelected);
          styleSaudiData(r, 4, row.withoutAcVA, 'center', isSelected);
          styleSaudiData(r, 5, row.winterPeakVA, 'center', isSelected);
        });

        // TABLE 20: SEC Demand Factors (Cols G-I, Rows 1-31)
        styleSaudiTitle(1, 7, 9, 'SEC Table 20 — Demand Factors (DF)');
        ['Code', 'Building Category', 'Demand Factor'].forEach((h, idx) =>
          styleSaudiHeader(2, 7 + idx, h)
        );

        SAUDI_TABLE_20.forEach((row, idx) => {
          const r = 3 + idx;
          const isSelected = selectedSaudiCodes.has(row.code);
          styleSaudiData(r, 7, row.code, 'center', isSelected);
          styleSaudiData(r, 8, row.category, 'left', isSelected);
          styleSaudiData(r, 9, row.df, 'center', isSelected);
        });

        // TABLE 21: SEC Coincident Factors for N = 1..100 Meters (Cols K-R, Rows 1-27)
        styleSaudiTitle(1, 11, 18, 'SEC Table 21 — Coincident Factors (CF) by Number of Meters (N)');
        for (let pair = 0; pair < 4; pair++) {
          styleSaudiHeader(2, 11 + pair * 2, 'Meters (N)');
          styleSaudiHeader(2, 12 + pair * 2, 'CF');
        }

        for (let rowIdx = 0; rowIdx < 25; rowIdx++) {
          const r = 3 + rowIdx;
          for (let pair = 0; pair < 4; pair++) {
            const item = SAUDI_TABLE_21[pair * 25 + rowIdx];
            if (item) {
              const isMetersMatch = item.n === activeMetersCount;
              styleSaudiData(r, 11 + pair * 2, item.n, 'center', isMetersMatch);
              styleSaudiData(r, 12 + pair * 2, item.cf, 'center', isMetersMatch);
            }
          }
        }
      };

      // CONDITIONAL REFERENCE SHEET GENERATION
      if (selectedStandardId === 'egypt') {
        if (egyptSubStandard === 'ecp203') {
          addEgyptianTables(workbook);
        } else if (egyptSubStandard === 'acud') {
          addAcudTables(workbook);
        }
      } else if (selectedStandardId === 'saudi') {
        addSaudiTables(workbook);
      }

      // Force recalculation of all formulas when the spreadsheet is opened in Excel
      if (!workbook.calcProperties) {
        workbook.calcProperties = {};
      }
      workbook.calcProperties.fullCalcOnLoad = true;

      // Dynamic file name based on selected standard and methodology
      const fileName =
        selectedStandardId === 'egypt'
          ? egyptSubStandard === 'acud'
            ? 'Load_Estimation_ACUD.xlsx'
            : 'Load_Estimation_EGY.xlsx'
          : selectedStandardId === 'saudi'
          ? 'Load_Estimation_KSA.xlsx'
          : selectedStandardId === 'europe'
          ? 'Load_Estimation_IEC.xlsx'
          : 'Load_Estimation_NEC.xlsx';

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Excel report with ExcelJS:', error);
    }
  };

  // Shared Detailed Load Summary & Calculation Result computations
  const buildingsLoadsList =
    isC1orC2 && c1c2LookupResult
      ? [
          (() => {
            const areaNum = parseEnglishNumber(saudiC1C2Area, 0);
            const connected = c1c2LookupResult.connectedLoadKva;
            const defaultDf = selectedSaudiCategoryCode === 'C1' ? 0.5 : 0.6;
            const bldOverride = buildingsDemandFactorOverrides['saudi-c1c2-building'];
            const effectiveDf =
              bldOverride !== undefined
                ? bldOverride === ''
                  ? 0
                  : Math.max(0, Number(bldOverride) || 0)
                : defaultDf;
            const demand = connected * effectiveDf;
            const avgDensity = areaNum > 0 ? (connected / areaNum) * 100 : 0;

            return {
              bld: {
                id: 'saudi-c1c2-building',
                name: 'Building 1',
                buildingType: sharedCategory,
                floorsCount: 1,
                floors: [] as FloorRowItem[],
                totalArea: areaNum,
              } as BuildingItem,
              connected,
              demand,
              df: effectiveDf,
              avgDensity,
            };
          })(),
        ]
      : isSaudiC3toC29
      ? buildingsList.map((bld) => {
          const estType = bld.saudiLoadEstimationType || 'standard';
          const bldCat =
            getSaudiCategoryByCodeOrName(bld.buildingType) ||
            SAUDI_C3_TO_C29_CATEGORIES.find((c) => c.code === selectedSaudiCategoryCode) ||
            SAUDI_SEC_CATEGORIES[6];

          const connected = bld.floors.reduce((sum, fl) => {
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            const density = getFloorAppliedDensity(fl.name, bld.buildingType, estType);
            return sum + (rowSubtotal * density) / 100;
          }, 0);

          const floorBreakdownDemand = bld.floors.reduce((sum, fl) => {
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            const density = getFloorAppliedDensity(fl.name, bld.buildingType, estType);
            const conn = (rowSubtotal * density) / 100;
            const defaultFloorDf = isBasementFloorName(fl.name) ? 0.7 : bldCat.df;
            const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) || defaultFloorDf : defaultFloorDf;
            return sum + conn * df;
          }, 0);

          const defaultDf = connected > 0 ? floorBreakdownDemand / connected : bldCat.df;
          const bldOverride = buildingsDemandFactorOverrides[bld.id];
          const effectiveDf =
            bldOverride !== undefined
              ? bldOverride === ''
                ? 0
                : Math.max(0, Number(bldOverride) || 0)
              : defaultDf;
          const demand = connected * effectiveDf;
          const totalAreaNum = Number(bld.totalArea) || 0;
          const fallbackDensityVA = getSaudiTable19DensityVA(
            bld.buildingType,
            estType,
            selectedSaudiCategoryCode
          );
          const avgDensity = totalAreaNum > 0 ? (connected / totalAreaNum) * 100 : fallbackDensityVA / 10;

          return {
            bld: {
              ...bld,
              buildingType: `${bldCat.name} (${bldCat.code})` as OccupancyCategory,
            },
            connected,
            demand,
            df: effectiveDf,
            avgDensity,
          };
        })
      : buildingsList.map((bld, idx) => {
          const isNec = selectedStandardId === 'usa';
          const bldActiveType = selectedStandardId === 'europe'
            ? (bld.iecBuildingType || iecCategory)
            : isNec
            ? (bld.necBuildingType || necCategory)
            : bld.buildingType;
          const densityDivisor = (selectedStandardId === 'europe' || isNec) ? 1000 : 100;
          const iecFallbackSf = selectedStandardId === 'europe' ? getIecCategoryByValue(bldActiveType).sf : 0.8;
          let connected = bld.floors.reduce((sum, fl) => {
            if (isNec) {
              return sum + calcNecFloorLoads(fl, bldActiveType).totalConnected;
            }
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            const density = getFloorAppliedDensity(fl.name, bldActiveType, bld.saudiLoadEstimationType || 'standard', fl.appliedLoadDensity);
            return sum + (rowSubtotal * density) / densityDivisor;
          }, 0);

          if (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0) {
            connected += (Number(acudEvChargers) || 0) * 150;
          }

          const floorBreakdownDemand =
            bld.floors.reduce((sum, fl) => {
              if (isNec) {
                return sum + calcNecFloorLoads(fl, bldActiveType).totalDemand;
              }
              const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
              const density = getFloorAppliedDensity(fl.name, bldActiveType, bld.saudiLoadEstimationType || 'standard', fl.appliedLoadDensity);
              const conn = (rowSubtotal * density) / densityDivisor;
              const fallbackDf = selectedStandardId === 'europe' ? (isBasementFloorName(fl.name) ? 0.6 : iecFallbackSf) : 0.8;
              const df = fl.demandFactor !== undefined ? Number(fl.demandFactor) ?? fallbackDf : fallbackDf;
              return sum + conn * df;
            }, 0) +
            (selectedStandardId === 'egypt' && egyptSubStandard === 'acud' && getAcudActivity().isFuelStation && idx === 0
              ? (Number(acudEvChargers) || 0) * 150 * 0.8
              : 0);

          const defaultDf = connected > 0 ? floorBreakdownDemand / connected : iecFallbackSf;
          const bldOverride = isNec ? undefined : buildingsDemandFactorOverrides[bld.id];
          const effectiveDf =
            bldOverride !== undefined
              ? bldOverride === ''
                ? 0
                : Math.max(0, Number(bldOverride) || 0)
              : defaultDf;

          const demand = connected * effectiveDf;
          const avgDensity = bld.totalArea > 0 ? (connected / bld.totalArea) * densityDivisor : 0;

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

  const pumpsLoadsList = includeAdditionalLoads && selectedStandardId !== 'europe'
    ? pumps.map((p) => {
        const connected = calculatePumpKva(p.power, p.unit, p.efficiency, p.pf);
        const pumpOverride = pumpsDemandFactorOverrides[p.id];
        const defaultDf = p.demandFactor !== undefined ? p.demandFactor : 0.8;
        const effectiveDf =
          pumpOverride !== undefined
            ? pumpOverride === ''
              ? 0
              : Math.max(0, Number(pumpOverride) || 0)
            : defaultDf;
        const demand = connected * effectiveDf;
        return {
          pump: p,
          connected,
          demand,
          df: effectiveDf,
        };
      })
    : [];

  const totalPumpsConnected = pumpsLoadsList.reduce((s, p) => s + p.connected, 0);
  const totalPumpsDemand = pumpsLoadsList.reduce((s, p) => s + p.demand, 0);

  const extraLoadsList = includeAdditionalLoads && selectedStandardId !== 'europe'
    ? extraLoads.map((e) => {
        const unitKva = calculateExtraLoadUnitKva(e.power, e.unit);
        const connected = unitKva * (Number(e.qty) || 1);
        const extraOverride = extraLoadsDemandFactorOverrides[e.id];
        const defaultDf = e.demandFactor !== undefined ? e.demandFactor : 0.8;
        const effectiveDf =
          extraOverride !== undefined
            ? extraOverride === ''
              ? 0
              : Math.max(0, Number(extraOverride) || 0)
            : defaultDf;
        const demand = connected * effectiveDf;
        return {
          extra: e,
          unitKva,
          connected,
          demand,
          df: effectiveDf,
        };
      })
    : [];

  const iecExtraLoadsList = includeAdditionalLoads && selectedStandardId === 'europe'
    ? iecExtraLoads.map((item) => {
        const spec = getIecExtraLoadSpec(item.name);
        const isInstallation = spec ? spec.density === 0 : item.category === 'Installation';
        const density = isInstallation ? 0 : getIecExtraLoadDensity(spec, iecDemandType);
        const areaNum = isInstallation ? 0 : Math.max(0, parseEnglishNumber(item.area, 0));
        const directKw = isInstallation ? Math.max(0, parseEnglishNumber(item.directPowerKw, 0)) : 0;
        const connected = isInstallation ? directKw : (areaNum * density) / 1000;
        const sf = spec ? spec.sf : item.sf;
        const demand = connected * sf;
        return {
          item,
          isInstallation,
          density,
          areaNum,
          directKw,
          connected,
          sf,
          demand,
        };
      })
    : [];

  const totalExtraConnected =
    selectedStandardId === 'europe'
      ? iecExtraLoadsList.reduce((s, e) => s + e.connected, 0)
      : extraLoadsList.reduce((s, e) => s + e.connected, 0);
  const totalExtraDemand =
    selectedStandardId === 'europe'
      ? iecExtraLoadsList.reduce((s, e) => s + e.demand, 0)
      : extraLoadsList.reduce((s, e) => s + e.demand, 0);

  const grandTotalConnected = totalBuildingsConnected + totalPumpsConnected + totalExtraConnected;
  const grandTotalDemand = totalBuildingsDemand + totalPumpsDemand + totalExtraDemand;
  const numericDiversityFactor = projectDiversityFactor === '' ? 0 : Math.max(0, Number(projectDiversityFactor) || 0);
  const numericNecDiversityFactor = necDiversityFactor === '' ? 0 : Math.max(0, Number(necDiversityFactor) || 0);
  const appliedProjectFactor =
    selectedStandardId === 'saudi'
      ? coincidentFactor
      : selectedStandardId === 'usa'
      ? numericNecDiversityFactor
      : numericDiversityFactor;
  const finalDiversifiedDemand = grandTotalDemand * appliedProjectFactor;
  const numericIecPowerFactor = iecPowerFactor === '' ? 0 : Math.max(0, Number(iecPowerFactor) || 0);
  const iecTotalDemandKva = numericIecPowerFactor > 0 ? grandTotalDemand / numericIecPowerFactor : 0;
  const summaryDemandBase = selectedStandardId === 'europe' ? iecTotalDemandKva : finalDiversifiedDemand;
  const numericSparePercent = spareCapacityPercent === '' ? 0 : Math.max(0, Number(spareCapacityPercent) || 0);
  const finalLoadWithSpare = summaryDemandBase * (1 + numericSparePercent / 100);
  const numericLoadingRatio = transformerLoadingRatio === '' ? 0 : Math.max(0, Number(transformerLoadingRatio) || 0);
  const requiredTransformerKva = numericLoadingRatio > 0 ? finalLoadWithSpare / (numericLoadingRatio / 100) : 0;
  const numericQuantity = transformerQty === '' ? 1 : Math.max(1, parseInt(String(transformerQty), 10) || 1);
  const totalInstalledTransformerKva = selectedTransformerSize * numericQuantity;
  const actualLoadingRatio = totalInstalledTransformerKva > 0 ? (finalLoadWithSpare / totalInstalledTransformerKva) * 100 : 0;

  const getStandardTransformerSelection = (stdId: StandardId) => {
    const rawSize =
      stdId === 'egypt'
        ? egyptTransformerSize
        : stdId === 'saudi'
        ? saudiTransformerSize
        : stdId === 'europe'
        ? iecTransformerSize
        : necTransformerSize;
    const rawQty =
      stdId === 'egypt'
        ? egyptTransformerQty
        : stdId === 'saudi'
        ? saudiTransformerQty
        : stdId === 'europe'
        ? iecTransformerQty
        : necTransformerQty;
    const qty = rawQty === '' ? 1 : Math.max(1, parseInt(String(rawQty), 10) || 1);
    const size = Number(rawSize) || (stdId === 'saudi' ? 500 : 1000);
    return { size, qty, totalKva: size * qty };
  };

  // Comparison Modal Data Mapping (mirrors bottom CALCULATION SUMMARY cards for active code and computes equivalent summary for other codes)
  const getCompareSummaryRow = (stdId: StandardId) => {
    const stdTrans = getStandardTransformerSelection(stdId);
    if (stdId === selectedStandardId && !(stdId === 'egypt' && egyptMethodologyInModal !== egyptSubStandard)) {
      const isIec = stdId === 'europe';
      const sf = isIec
        ? (grandTotalConnected > 0 ? grandTotalDemand / grandTotalConnected : 0)
        : (grandTotalConnected > 0 ? finalDiversifiedDemand / grandTotalConnected : 0);
      return {
        connectedLoad: grandTotalConnected,
        connectedUnit: isIec ? ('kW' as const) : ('kVA' as const),
        simultaneityFactor: sf,
        rawDemandKva: grandTotalDemand,
        demandKw: isIec ? grandTotalDemand : finalDiversifiedDemand * powerFactor,
        demandKva: isIec ? iecTotalDemandKva : finalDiversifiedDemand,
        transformerQty: stdTrans.qty,
        transformerSize: stdTrans.size,
        loadingRatio: actualLoadingRatio,
      };
    }

    const spareMult = 1 + numericSparePercent / 100;
    const rawPumpsConn = pumps.reduce((s, p) => s + calculatePumpKva(p.power, p.unit, p.efficiency, p.pf), 0);
    const rawPumpsDem = pumps.reduce((s, p) => {
      const conn = calculatePumpKva(p.power, p.unit, p.efficiency, p.pf);
      const ov = pumpsDemandFactorOverrides[p.id];
      const defDf = p.demandFactor !== undefined ? p.demandFactor : 0.8;
      const effDf = ov !== undefined ? (ov === '' ? 0 : Math.max(0, Number(ov) || 0)) : defDf;
      return s + conn * effDf;
    }, 0);
    const rawExtraConn = extraLoads.reduce((s, e) => s + calculateExtraLoadUnitKva(e.power, e.unit) * (Number(e.qty) || 1), 0);
    const rawExtraDem = extraLoads.reduce((s, e) => {
      const conn = calculateExtraLoadUnitKva(e.power, e.unit) * (Number(e.qty) || 1);
      const ov = extraLoadsDemandFactorOverrides[e.id];
      const defDf = e.demandFactor !== undefined ? e.demandFactor : 0.8;
      const effDf = ov !== undefined ? (ov === '' ? 0 : Math.max(0, Number(ov) || 0)) : defDf;
      return s + conn * effDf;
    }, 0);

    if (stdId === 'europe') {
      let bldConnKw = 0;
      let bldDemKw = 0;
      buildingsList.forEach((bld) => {
        const bldActiveType = bld.iecBuildingType || iecCategory;
        const iecCat = getIecCategoryByValue(bldActiveType);
        const conn = bld.floors.reduce((sum, fl) => {
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCat[iecDemandType];
          return sum + (rowSubtotal * density) / 1000;
        }, 0);
        const dem = bld.floors.reduce((sum, fl) => {
          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
          const density = isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCat[iecDemandType];
          const sf = isBasementFloorName(fl.name) ? getIecBasementCategory().sf : iecCat.sf;
          return sum + ((rowSubtotal * density) / 1000) * sf;
        }, 0);
        bldConnKw += conn;
        bldDemKw += dem;
      });
      const extraIecConn = iecExtraLoads.reduce((s, item) => {
        const spec = getIecExtraLoadSpec(item.name);
        const isInst = spec ? spec.density === 0 : item.category === 'Installation';
        const density = isInst ? 0 : getIecExtraLoadDensity(spec, iecDemandType);
        return s + (isInst ? Math.max(0, parseEnglishNumber(item.directPowerKw, 0)) : (Math.max(0, parseEnglishNumber(item.area, 0)) * density) / 1000);
      }, 0);
      const extraIecDem = iecExtraLoads.reduce((s, item) => {
        const spec = getIecExtraLoadSpec(item.name);
        const isInst = spec ? spec.density === 0 : item.category === 'Installation';
        const density = isInst ? 0 : getIecExtraLoadDensity(spec, iecDemandType);
        const conn = isInst ? Math.max(0, parseEnglishNumber(item.directPowerKw, 0)) : (Math.max(0, parseEnglishNumber(item.area, 0)) * density) / 1000;
        const sf = spec ? spec.sf : item.sf;
        return s + conn * sf;
      }, 0);
      const connectedLoad = bldConnKw + extraIecConn;
      const demandKw = bldDemKw + extraIecDem;
      const simultaneityFactor = connectedLoad > 0 ? demandKw / connectedLoad : 0;
      const pf = numericIecPowerFactor > 0 ? numericIecPowerFactor : 0.85;
      const demandKva = demandKw / pf;
      const loadWithSpare = demandKva * spareMult;
      const loadingRatio = stdTrans.totalKva > 0 ? (loadWithSpare / stdTrans.totalKva) * 100 : 0;
      return {
        connectedLoad,
        connectedUnit: 'kW' as const,
        simultaneityFactor,
        rawDemandKva: demandKw,
        demandKw,
        demandKva,
        transformerQty: stdTrans.qty,
        transformerSize: stdTrans.size,
        loadingRatio,
      };
    }

    if (stdId === 'saudi') {
      const saudiCatCode = getSaudiCategoryByCodeOrName(sharedCategory)?.code || 'C7';
      const isSaudiC12 = saudiCatCode === 'C1' || saudiCatCode === 'C2';
      const c1c2Res = isSaudiC12
        ? lookupSaudiC1C2ByArea(saudiCatCode as 'C1' | 'C2', parseEnglishNumber(saudiC1C2Area, 0), saudiC1C2Voltage)
        : null;
      let bldConn = 0;
      let bldDem = 0;
      if (isSaudiC12 && c1c2Res) {
        bldConn = c1c2Res.connectedLoadKva;
        const defaultDf = saudiCatCode === 'C1' ? 0.5 : 0.6;
        const ov = buildingsDemandFactorOverrides['saudi-c1c2-building'];
        const effDf = ov !== undefined ? (ov === '' ? 0 : Math.max(0, Number(ov) || 0)) : defaultDf;
        bldDem = bldConn * effDf;
      } else {
        buildingsList.forEach((bld) => {
          const estType = bld.saudiLoadEstimationType || 'standard';
          const bldCat = getSaudiCategoryByCodeOrName(bld.buildingType) || SAUDI_SEC_CATEGORIES[6];
          const conn = bld.floors.reduce((sum, fl) => {
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            const density = isBasementFloorName(fl.name)
              ? 3
              : getSaudiTable19DensityVA(bld.buildingType, estType, saudiCatCode) / 10;
            return sum + (rowSubtotal * density) / 100;
          }, 0);
          const dem = bld.floors.reduce((sum, fl) => {
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            const density = isBasementFloorName(fl.name)
              ? 3
              : getSaudiTable19DensityVA(bld.buildingType, estType, saudiCatCode) / 10;
            const df = isBasementFloorName(fl.name) ? 0.7 : bldCat.df;
            return sum + ((rowSubtotal * density) / 100) * df;
          }, 0);
          bldConn += conn;
          bldDem += dem;
        });
      }
      const addLoads = !isSaudiC12 || hasAdditionalLoads;
      const connectedLoad = bldConn + (addLoads ? rawPumpsConn + rawExtraConn : 0);
      const rawDemand = bldDem + (addLoads ? rawPumpsDem + rawExtraDem : 0);
      const demandKva = rawDemand * coincidentFactor;
      const simultaneityFactor = connectedLoad > 0 ? demandKva / connectedLoad : 0;
      const demandKw = demandKva * powerFactor;
      const loadWithSpare = demandKva * spareMult;
      const loadingRatio = stdTrans.totalKva > 0 ? (loadWithSpare / stdTrans.totalKva) * 100 : 0;
      return {
        connectedLoad,
        connectedUnit: 'kVA' as const,
        simultaneityFactor,
        rawDemandKva: rawDemand,
        demandKw,
        demandKva,
        transformerQty: stdTrans.qty,
        transformerSize: stdTrans.size,
        loadingRatio,
      };
    }

    if (stdId === 'egypt') {
      let bldConn = 0;
      let bldDem = 0;
      const acudAct = getAcudActivity();
      buildingsList.forEach((bld, idx) => {
        const typeStr = bld.buildingType || sharedCategory;
        const conn =
          bld.floors.reduce((sum, fl) => {
            const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
            let density = 4;
            if (isBasementFloorName(fl.name)) {
              density = 3;
            } else if (egyptMethodologyInModal === 'acud') {
              const lower = typeStr.toLowerCase();
              if (lower.includes('resident') || lower.includes('flat') || lower.includes('dwelling') || lower.includes('سكن')) density = 8;
              else if (lower.includes('office') || lower.includes('admin') || lower.includes('إدار')) density = 10;
              else if (lower.includes('shop') || lower.includes('mall') || lower.includes('commercial') || lower.includes('تجار')) density = 12;
              else if (lower.includes('hospital') || lower.includes('مستشف')) density = 20;
              else if (lower.includes('bank') || lower.includes('بنوك')) density = 16;
              else if (lower.includes('clinic') || lower.includes('عياد')) density = 17.5;
              else if (lower.includes('hotel') || lower.includes('فندق') || lower.includes('فنادق')) density = 18;
              else if (lower.includes('universit') || lower.includes('جامع')) density = 15;
              else if (lower.includes('school') || lower.includes('مدارس')) density = 14;
              else if (lower.includes('mosque') || lower.includes('church') || lower.includes('مسجد') || lower.includes('كنيس')) density = 8;
              else if (lower.includes('recreation') || lower.includes('sport') || lower.includes('نادي') || lower.includes('رياض')) density = 12;
              else if (lower.includes('factor') || lower.includes('industr') || lower.includes('صناع') || lower.includes('مصانع')) density = 30;
              else if (lower.includes('fuel') || lower.includes('station') || lower.includes('وقود') || lower.includes('بنزين')) density = 8;
              else if (lower.includes('park') || lower.includes('garden') || lower.includes('حدائق')) density = 0.5;
              else if (lower.includes('public') || lower.includes('servic') || lower.includes('خدمات')) density = 5;
              else density = acudAct.density;
            } else {
              const isRes = /resident|flat|dwelling|سكن|شقق/i.test(typeStr);
              density = egyptLocationType === 'villages' ? (isRes ? 2 : 5) : egyptCityDistrictType === 'upscale' ? (isRes ? 8 : 10) : (isRes ? 4 : 10);
            }
            return sum + (rowSubtotal * density) / 100;
          }, 0) + (egyptMethodologyInModal === 'acud' && acudAct.isFuelStation && idx === 0 ? (Number(acudEvChargers) || 0) * 150 : 0);
        const bldOverride = buildingsDemandFactorOverrides[bld.id];
        const effectiveDf =
          bldOverride !== undefined
            ? bldOverride === ''
              ? 0
              : Math.max(0, Number(bldOverride) || 0)
            : 0.8;
        bldConn += conn;
        bldDem += conn * effectiveDf;
      });
      const connectedLoad = bldConn + rawPumpsConn + rawExtraConn;
      const rawDemand = bldDem + rawPumpsDem + rawExtraDem;
      const divFactor = numericDiversityFactor > 0 ? numericDiversityFactor : 0.8;
      const demandKva = rawDemand * divFactor;
      const simultaneityFactor = connectedLoad > 0 ? demandKva / connectedLoad : 0;
      const demandKw = demandKva * powerFactor;
      const loadWithSpare = demandKva * spareMult;
      const loadingRatio = stdTrans.totalKva > 0 ? (loadWithSpare / stdTrans.totalKva) * 100 : 0;
      return {
        connectedLoad,
        connectedUnit: 'kVA' as const,
        simultaneityFactor,
        rawDemandKva: rawDemand,
        demandKw,
        demandKva,
        transformerQty: stdTrans.qty,
        transformerSize: stdTrans.size,
        loadingRatio,
      };
    }

    // NEC ('usa')
    let bldConnNec = 0;
    let bldDemNec = 0;
    buildingsList.forEach((bld) => {
      const necType = bld.necBuildingType || necCategory;
      bld.floors.forEach((fl) => {
        const res = calcNecFloorLoads(fl, necType);
        bldConnNec += res.totalConnected;
        bldDemNec += res.totalDemand;
      });
    });
    const connectedLoad = bldConnNec + rawPumpsConn + rawExtraConn;
    const rawDemand = bldDemNec + rawPumpsDem + rawExtraDem;
    const necDiv = numericNecDiversityFactor > 0 ? numericNecDiversityFactor : 1.0;
    const demandKva = rawDemand * necDiv;
    const simultaneityFactor = connectedLoad > 0 ? demandKva / connectedLoad : 0;
    const demandKw = demandKva * powerFactor;
    const loadWithSpare = demandKva * spareMult;
    const loadingRatio = stdTrans.totalKva > 0 ? (loadWithSpare / stdTrans.totalKva) * 100 : 0;
    return {
      connectedLoad,
      connectedUnit: 'kVA' as const,
      simultaneityFactor,
      rawDemandKva: rawDemand,
      demandKw,
      demandKva,
      transformerQty: stdTrans.qty,
      transformerSize: stdTrans.size,
      loadingRatio,
    };
  };

  const iecEffectiveSf = grandTotalConnected > 0 ? grandTotalDemand / grandTotalConnected : 0;

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#F4F6F8] dark:bg-gray-900 pb-16 font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. TOP HEADER */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-200/90 dark:border-gray-700 shadow-2xs sticky top-[57px] z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="px-3.5 py-2 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-[#1E3A8A] dark:text-blue-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home Page'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToOverview}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 active:bg-slate-200 text-slate-800 dark:text-gray-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
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
        {/* 1st: "Select Standard for Calculation" */}
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
                  return (
                    <div
                      key={std.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectStandard(std.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSelectStandard(std.id);
                        }
                      }}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isActive
                          ? 'border-2 border-[#1E3A8A] dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 shadow-xs ring-1 ring-blue-700/40'
                          : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 bg-[#F8FAFC] dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3.5">
                          <FlagIcon country={std.id} className="w-12 h-8 rounded-sm border border-slate-300 dark:border-gray-600 shadow-xs shrink-0" />
                          {isActive && <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0" />}
                        </div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white leading-snug">
                          {isAr ? std.codeNameAr : std.codeName}
                        </div>
                      </div>

                      <div className="mt-2 pt-2.5 border-t border-slate-200/60 dark:border-gray-700">
                        <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium truncate">
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

        {/* 2nd: "Project Details" Card */}
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
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                      {isAr ? 'فئة إشغال المبنى (Building Occupancy Category)' : 'Building Occupancy Category'}
                    </label>
                    {selectedStandardId === 'europe' && (
                      <div
                        className="inline-flex items-center bg-slate-100 dark:bg-gray-900 p-0.5 rounded-lg border border-slate-300 dark:border-gray-600 shadow-2xs"
                        role="group"
                        aria-label="IEC Demand Level"
                      >
                        {(['min', 'avg', 'max'] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleIecDemandTypeChange(mode)}
                            className={`px-2.5 py-1 text-2xs font-extrabold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                              iecDemandType === mode
                                ? 'bg-[#1E3A8A] text-white shadow-2xs'
                                : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {mode === 'min' ? 'Min' : mode === 'avg' ? 'Avg' : 'Max'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <select
                    value={
                      selectedStandardId === 'europe'
                        ? iecCategory
                        : selectedStandardId === 'usa'
                        ? necCategory
                        : selectedStandardId === 'saudi'
                        ? (getSaudiCategoryByCodeOrName(sharedCategory)?.code || 'C7')
                        : (findOccupancyCategoryMatch(sharedCategory) || sharedCategory)
                    }
                    onChange={(e) => {
                      if (selectedStandardId === 'europe') {
                        const iecCat = getIecCategoryByValue(e.target.value);
                        setIecCategory(iecCat.value);
                        setIecSelectedCategory(iecCat);
                        const allIds = buildingsList.map((b) => b.id);
                        if (allIds.length > 0) {
                          setBuildingsDemandFactorOverrides((prev) => {
                            const next = { ...prev };
                            allIds.forEach((id) => {
                              delete next[id];
                            });
                            return next;
                          });
                        }
                        setBuildingsList((prev) =>
                          prev.map((b) => ({
                            ...b,
                            iecBuildingType: iecCat.value,
                            isTypeCustomized: false,
                            floors: b.floors.map((fl) => ({
                              ...fl,
                              appliedLoadDensity: isBasementFloorName(fl.name) ? getIecBasementCategory()[iecDemandType] : iecCat[iecDemandType],
                              demandFactor: isBasementFloorName(fl.name) ? getIecBasementCategory().sf : iecCat.sf,
                            })),
                          }))
                        );
                      } else if (selectedStandardId === 'usa') {
                        const necCat = getNecCategoryByValue(e.target.value);
                        setNecCategory(necCat.value);
                        const allIds = buildingsList.map((b) => b.id);
                        if (allIds.length > 0) {
                          setBuildingsDemandFactorOverrides((prev) => {
                            const next = { ...prev };
                            allIds.forEach((id) => {
                              delete next[id];
                            });
                            return next;
                          });
                        }
                        setBuildingsList((prev) =>
                          prev.map((b) => ({
                            ...b,
                            necBuildingType: necCat.value,
                            isTypeCustomized: false,
                            floors: b.floors.map((fl) => {
                              const lightingDens = isBasementFloorName(fl.name) ? 3 : necCat.vaPerM2;
                              return {
                                ...fl,
                                appliedLoadDensity: lightingDens,
                                ...(Array.isArray(fl.loads)
                                  ? {
                                      loads: fl.loads.map((l) =>
                                        l.type === 'Lighting' ? { ...l, densityOrPower: lightingDens, demandFactor: 1.0 } : l
                                      ),
                                    }
                                  : {}),
                              };
                            }),
                          }))
                        );
                      } else if (selectedStandardId === 'saudi') {
                        const saudiCat = SAUDI_SEC_CATEGORIES.find((c) => c.code === e.target.value);
                        if (saudiCat) {
                          setSaudiSelectedCategory(saudiCat);
                          setSaudiLoadDensityVA(saudiCat.vaPerM2);
                          setSaudiDemandFactor(saudiCat.df);
                          const newTypeStr = `${saudiCat.name} (${saudiCat.code})`;
                          setSharedCategory(newTypeStr as OccupancyCategory);
                          const allIds = buildingsList.map((b) => b.id);
                          if (allIds.length > 0) {
                            setBuildingsDemandFactorOverrides((prev) => {
                              const next = { ...prev };
                              allIds.forEach((id) => {
                                delete next[id];
                              });
                              return next;
                            });
                          }
                          setBuildingsList((prev) =>
                            prev.map((b) => ({
                              ...b,
                              buildingType: newTypeStr as OccupancyCategory,
                              isTypeCustomized: false,
                              saudiLoadEstimationType: b.saudiLoadEstimationType || 'standard',
                              floors: b.floors.map((fl) => ({
                                ...fl,
                                demandFactor: isBasementFloorName(fl.name) ? 0.7 : saudiCat.df,
                              })),
                            }))
                          );
                        }
                      } else {
                        const nextCategory = e.target.value as OccupancyCategory;
                        setSharedCategory(nextCategory);
                        setBuildingsList((prev) =>
                          prev.map((b) => ({
                            ...b,
                            buildingType: nextCategory,
                            isTypeCustomized: false,
                          }))
                        );
                      }
                    }}
                    className="w-full bg-[#F8FAFC] dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                  >
                    {selectedStandardId === 'saudi'
                      ? SAUDI_SEC_CATEGORIES.map((cat) => (
                          <option key={cat.code} value={cat.code} className="dark:bg-gray-900 dark:text-white">
                            {cat.name}
                          </option>
                        ))
                      : selectedStandardId === 'europe'
                      ? IEC_OCCUPANCY_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value} className="dark:bg-gray-900 dark:text-white">
                            {cat.value}
                          </option>
                        ))
                      : selectedStandardId === 'usa'
                      ? NEC_OCCUPANCY_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value} className="dark:bg-gray-900 dark:text-white">
                            {cat.value}
                          </option>
                        ))
                      : OCCUPANCY_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="dark:bg-gray-900 dark:text-white">
                            {cat.nameEn}
                          </option>
                        ))}
                  </select>
                </div>

                {isC1orC2 ? (
                  <>
                  <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/80 dark:border-blue-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#1E3A8A] dark:text-blue-300 shrink-0" />
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1E3A8A] dark:text-blue-200">
                          {isAr
                            ? `جدول الملحق (1) الكود السعودي - فئة ${selectedSaudiCategoryCode}`
                            : `SEC Appendix 1 Lookup — Category ${selectedSaudiCategoryCode}`}
                        </span>
                      </div>
                      <span className="text-2xs font-bold px-2.5 py-0.5 rounded-md bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 self-start sm:self-auto">
                        {selectedSaudiCategoryCode === 'C1'
                          ? 'Normal Residential Dwelling (C1)'
                          : 'Normal Commercial Shops (C2)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Dropdown: VOLTAGE SYSTEM */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2">
                          {isAr ? 'نظام الجهد (VOLTAGE SYSTEM)' : 'VOLTAGE SYSTEM'}
                        </label>
                        <select
                          value={saudiC1C2Voltage}
                          onChange={(e) => setSaudiC1C2Voltage(e.target.value as '220V' | '400V')}
                          className="w-full bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-bold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                        >
                          <option value="220V">220 V Phase to Phase</option>
                          <option value="400V">400/230 V</option>
                        </select>
                      </div>

                      {/* Input: Constructed Area of Building (m²) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2">
                          {isAr
                            ? 'المساحة البنائية للمبنى (Constructed Area of Building (m²))'
                            : 'Constructed Area of Building (m²)'}
                        </label>
                        <div className="relative" dir="ltr">
                          <input
                            type="text"
                            inputMode="decimal"
                            dir="ltr"
                            lang="en"
                            style={{ direction: 'ltr' }}
                            value={toEnglishDigits(saudiC1C2Area)}
                            onChange={(e) => {
                              const cleaned = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                              setSaudiC1C2Area(cleaned);
                            }}
                            onBlur={() => {
                              if (saudiC1C2Area === '' || parseEnglishNumber(saudiC1C2Area, 0) < 0) {
                                setSaudiC1C2Area(0);
                              }
                            }}
                            onKeyDown={handleArabicDigitsKeyDown}
                            onPaste={handleNumericPaste}
                            className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-mono font-bold rounded-xl p-3 pr-14 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden shadow-2xs"
                            placeholder="350"
                          />
                          <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-400 dark:text-gray-400 font-mono select-none">
                            m²
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Read-only Lookup Result Display */}
                    {c1c2LookupResult && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
                          <div>
                            <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                              {isAr ? 'الحمل التوصيلي (Connected Load)' : 'Connected Load'}
                            </span>
                            <span dir="ltr" className="text-lg sm:text-xl font-mono font-black text-[#1E3A8A] dark:text-blue-300">
                              Connected Load: {formatEnglishNumber(c1c2LookupResult.connectedLoadKva, 0, 2)} kVA
                            </span>
                          </div>
                          <span dir="ltr" className="text-2xs font-mono font-bold text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded-md border border-slate-200 dark:border-gray-700">
                            {c1c2LookupResult.exceedsTableLimit
                              ? `>${formatEnglishInt(c1c2LookupResult.matchedArea)} m²`
                              : c1c2LookupResult.matchedArea > 0
                              ? `Table: ${formatEnglishInt(c1c2LookupResult.matchedArea)} m²`
                              : '0 m²'}
                          </span>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
                          <div>
                            <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                              {isAr ? 'قاطع الدائرة (Circuit Breaker)' : 'Circuit Breaker'}
                            </span>
                            <span dir="ltr" className="text-lg sm:text-xl font-mono font-black text-emerald-700 dark:text-emerald-300">
                              Circuit Breaker: {formatEnglishInt(c1c2LookupResult.circuitBreakerRating)} A
                            </span>
                          </div>
                          <span dir="ltr" className="text-2xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                            {saudiC1C2Voltage === '220V' ? '220 V P-P' : '400/230 V'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conditional Step for Saudi C1 & C2: Ask if there are additional loads (No blue box wrapper) */}
                  <div className="pt-3 border-t border-slate-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                    <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Are there additional loads (Pumps / Extra Loads)?
                    </span>

                    <div className="flex items-center gap-3 shrink-0" dir="ltr">
                      <button
                        type="button"
                        onClick={() => setHasAdditionalLoads(true)}
                        className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                          hasAdditionalLoads
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/25'
                            : 'bg-white dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        }`}
                      >
                        Yes (نعم)
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasAdditionalLoads(false)}
                        className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                          !hasAdditionalLoads
                            ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/25'
                            : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-200 border-slate-300 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        No (لا)
                      </button>
                    </div>
                  </div>
                  </>
                ) : (
                  <>
                    {/* Row 3: NUMBER OF BUILDINGS / AREAS */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                          {isSaudiC3toC29
                            ? (isAr ? 'عدد المباني (NUMBER OF BUILDINGS)' : 'NUMBER OF BUILDINGS')
                            : (isAr ? 'عدد المباني / المساحات (Number of Buildings / Areas)' : 'Number of Buildings / Areas')}
                        </label>
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
                            {isSaudiC3toC29
                              ? (isAr ? 'مبنى' : 'Building(s)')
                              : (isAr ? 'مساحة / مبنى' : 'Area(s)')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: DYNAMIC AREA INPUTS (Area 1, Area 2, ...) */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                          BUILDING AREAS (M²)
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
                              {`BUILDING ${idx + 1} AREA (M²)`}
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
                  </>
                )}
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
                    onClick={() => handleSelectEgyptSubStandard('ecp203')}
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
                    onClick={() => handleSelectEgyptSubStandard('acud')}
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
                            {act.label}
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
            {!isC1orC2 && (
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

                    {/* Building Inputs */}
                    {isSaudiC3toC29 ? (
                      (() => {
                        const estType = bld.saudiLoadEstimationType || 'standard';
                        const resolvedSaudiCat =
                          getSaudiCategoryByCodeOrName(bld.buildingType) &&
                          getSaudiCategoryByCodeOrName(bld.buildingType)?.code !== 'C1' &&
                          getSaudiCategoryByCodeOrName(bld.buildingType)?.code !== 'C2'
                            ? getSaudiCategoryByCodeOrName(bld.buildingType)!
                            : SAUDI_C3_TO_C29_CATEGORIES.find((c) => c.code === selectedSaudiCategoryCode) ||
                              SAUDI_SEC_CATEGORIES[6];

                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Dropdown 1: BUILDING CATEGORY (C3 to C29) */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                                  BUILDING CATEGORY
                                </label>
                                {bIndex === 0 && !bld.isTypeCustomized && (
                                  <span className="text-2xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                                    {isAr ? '🔄 متزامن' : '🔄 Synced'}
                                  </span>
                                )}
                              </div>
                              <select
                                dir="ltr"
                                lang="en"
                                value={resolvedSaudiCat.code}
                                onChange={(e) => handleBuildingCategoryChange(bld.id, e.target.value)}
                                className="w-full bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                              >
                                {SAUDI_C3_TO_C29_CATEGORIES.map((cat) => (
                                  <option key={cat.code} value={cat.code} className="dark:bg-gray-900 dark:text-white">
                                    {cat.code} — {cat.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Dropdown 2: LOAD ESTIMATION TYPE */}
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-1.5">
                                LOAD ESTIMATION TYPE
                              </label>
                              <select
                                dir="ltr"
                                lang="en"
                                value={estType}
                                onChange={(e) =>
                                  handleBuildingEstimationTypeChange(
                                    bld.id,
                                    e.target.value as SaudiLoadEstimationType
                                  )
                                }
                                className="w-full bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden transition-all shadow-2xs cursor-pointer"
                              >
                                {SAUDI_LOAD_ESTIMATION_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value} className="dark:bg-gray-900 dark:text-white">
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
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
                            selectedStandardId === 'europe'
                              ? getIecCategoryByValue(bld.iecBuildingType || iecCategory).value
                              : selectedStandardId === 'usa'
                              ? getNecCategoryByValue(bld.necBuildingType || necCategory).value
                              : selectedStandardId === 'saudi'
                              ? (getSaudiCategoryByCodeOrName(bld.buildingType)?.code || 'C7')
                              : (findOccupancyCategoryMatch(bld.buildingType) || bld.buildingType)
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
                                        demandFactor: isBasementFloorName(fl.name) ? 0.7 : saudiCat.df,
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
                                  {cat.name}
                                </option>
                              ))
                            : selectedStandardId === 'europe'
                            ? IEC_OCCUPANCY_CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value} className="dark:bg-gray-900 dark:text-white">
                                  {cat.value}
                                </option>
                              ))
                            : selectedStandardId === 'usa'
                            ? NEC_OCCUPANCY_CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value} className="dark:bg-gray-900 dark:text-white">
                                  {cat.value}
                                </option>
                              ))
                            : OCCUPANCY_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id} className="dark:bg-gray-900 dark:text-white">
                                  {cat.nameEn}
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
                    )}

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
                            title={
                              selectedStandardId === 'saudi'
                                ? (isAr ? 'إضافة دور بدروم جديد (كثافة الحمل: 30 ف.أ/م² أو 3 ك.ف.أ/100م²)' : 'Add a new Basement floor (Load Density: 30 VA/m² / 3 kVA/100m²)')
                                : selectedStandardId === 'usa'
                                ? (isAr ? 'إضافة دور بدروم جديد (كثافة الحمل: 3 ف.أ/م²)' : 'Add a new Basement floor (Load Density: 3 VA/m²)')
                                : selectedStandardId === 'europe'
                                ? (isAr
                                    ? `إضافة دور بدروم جديد (كثافة الحمل: ${getIecBasementCategory()[iecDemandType]} W/m²)`
                                    : `Add a new Basement floor (Load Density: ${getIecBasementCategory()[iecDemandType]} W/m²)`)
                                : (isAr ? 'إضافة دور بدروم جديد (كثافة الحمل: 3 ك.ف.أ/100م²)' : 'Add a new Basement floor (Load Density: 3 kVA/100m²)')
                            }
                          >
                            <Plus className="w-4 h-4" />
                            <span>{isAr ? '+ إضافة بدروم (+ Add Basement)' : '+ Add Basement (إضافة بدروم)'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Excel-Style Data Table with 4 New Calculation Columns */}
                      {(() => {
                        const bldEstType = bld.saudiLoadEstimationType || 'standard';
                        const isIecMode = selectedStandardId === 'europe';
                        const isNecMode = selectedStandardId === 'usa';
                        const bldActiveType = isIecMode
                          ? (bld.iecBuildingType || iecCategory)
                          : isNecMode
                          ? (bld.necBuildingType || necCategory)
                          : bld.buildingType;
                        const densityDivisor = (isIecMode || isNecMode) ? 1000 : 100;
                        const iecBuildingCat = isIecMode ? getIecCategoryByValue(bldActiveType) : null;
                        const bldConnectedLoadSum = bld.floors.reduce((sum, fl) => {
                          if (isNecMode) {
                            return sum + calcNecFloorLoads(fl, bldActiveType).totalConnected;
                          }
                          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                          const density = getFloorAppliedDensity(fl.name, bldActiveType, bldEstType, fl.appliedLoadDensity);
                          return sum + (rowSubtotal * density) / densityDivisor;
                        }, 0);

                        const bldDemandLoadSum = bld.floors.reduce((sum, fl) => {
                          if (isNecMode) {
                            return sum + calcNecFloorLoads(fl, bldActiveType).totalDemand;
                          }
                          const rowSubtotal = (Number(fl.floorsCount) || 0) * (Number(fl.areaPerFloor) || 0);
                          const density = getFloorAppliedDensity(fl.name, bldActiveType, bldEstType, fl.appliedLoadDensity);
                          const connLoad = (rowSubtotal * density) / densityDivisor;
                          const fallbackDf = isIecMode
                            ? (isBasementFloorName(fl.name) ? 0.6 : (iecBuildingCat?.sf ?? 0.6))
                            : 0.8;
                          const df = fl.demandFactor !== undefined ? (Number(fl.demandFactor) ?? fallbackDf) : fallbackDf;
                          return sum + connLoad * df;
                        }, 0);

                        const bldOverallDemandFactor = bldConnectedLoadSum > 0
                          ? bldDemandLoadSum / bldConnectedLoadSum
                          : (isIecMode ? (iecBuildingCat?.sf ?? 0.6) : 0.8);

                        if (isNecMode) {
                          const renderDecimalSanitizer = (raw: string) => {
                            let clean = raw
                              .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
                              .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
                              .replace(/٫/g, '.')
                              .replace(/[^0-9.]/g, '');
                            const parts = clean.split('.');
                            if (parts.length > 2) {
                              clean = parts[0] + '.' + parts.slice(1).join('');
                            }
                            return clean;
                          };

                          return (
                            <div className="space-y-4">
                              {bld.floors.map((fl) => {
                                const isBasement = isBasementFloorName(fl.name);
                                const necFloor = calcNecFloorLoads(fl, bldActiveType);

                                return (
                                  <div
                                    key={fl.id}
                                    className="border border-slate-200 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-gray-900 shadow-2xs"
                                  >
                                    {/* 1. FLOOR BLOCK HEADER */}
                                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-3 mb-3 border-b border-slate-200 dark:border-gray-700">
                                      {/* Floor Name */}
                                      <div className="flex-1 min-w-[200px]">
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1">
                                          Floor Name
                                        </label>
                                        <input
                                          type="text"
                                          value={fl.name}
                                          onChange={(e) => handleUpdateFloorRow(bld.id, fl.id, 'name', e.target.value)}
                                          className="w-full bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-3 py-2 font-bold text-slate-900 dark:text-white text-sm transition-colors"
                                          placeholder="e.g. Ground Floor"
                                        />
                                        {isBasement && (
                                          <span className="inline-block mt-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded px-2 py-0.5 whitespace-nowrap">
                                            ⚠️ Basement Lighting: 3 VA/m²
                                          </span>
                                        )}
                                      </div>

                                      {/* No of Floors, Area (M²), Subtotal Area, Delete Floor */}
                                      <div className="flex flex-wrap items-end gap-3">
                                        <div className="w-28" dir="ltr">
                                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1">
                                            No of Floors
                                          </label>
                                          <input
                                            type="text"
                                            inputMode="numeric"
                                            dir="ltr"
                                            lang="en"
                                            style={{ direction: 'ltr', textAlign: 'center' }}
                                            value={toEnglishDigits(fl.floorsCount)}
                                            onChange={(e) => {
                                              const clean = toEnglishDigits(e.target.value).replace(/[^0-9]/g, '');
                                              handleUpdateFloorRow(bld.id, fl.id, 'floorsCount', clean);
                                            }}
                                            onBlur={() => {
                                              if (fl.floorsCount === '' || Number(fl.floorsCount) < 1) {
                                                handleUpdateFloorRow(bld.id, fl.id, 'floorsCount', 1);
                                              }
                                            }}
                                            onKeyDown={handleArabicDigitsKeyDown}
                                            onPaste={handleNumericPaste}
                                            className="w-full bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-2 font-mono font-bold text-slate-900 dark:text-white text-center text-sm transition-colors"
                                            placeholder="1"
                                          />
                                        </div>

                                        <div className="w-36" dir="ltr">
                                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1">
                                            Area (m²)
                                          </label>
                                          <div className="relative">
                                            <input
                                              type="text"
                                              inputMode="decimal"
                                              dir="ltr"
                                              lang="en"
                                              style={{ direction: 'ltr', textAlign: 'center' }}
                                              value={toEnglishDigits(fl.areaPerFloor)}
                                              onChange={(e) => handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', renderDecimalSanitizer(e.target.value))}
                                              onBlur={() => {
                                                if (fl.areaPerFloor === '') {
                                                  handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', 0);
                                                } else {
                                                  handleUpdateFloorRow(bld.id, fl.id, 'areaPerFloor', Number(fl.areaPerFloor) || 0);
                                                }
                                              }}
                                              onKeyDown={handleArabicDigitsKeyDown}
                                              onPaste={handleNumericPaste}
                                              className="w-full bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-2 pr-8 font-mono font-bold text-slate-900 dark:text-white text-sm transition-colors"
                                              placeholder="300"
                                            />
                                            <span className="absolute right-2.5 top-2.5 text-xs font-bold text-slate-400 dark:text-gray-400 font-mono select-none">
                                              m²
                                            </span>
                                          </div>
                                        </div>

                                        <div>
                                          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1">
                                            Subtotal Area
                                          </span>
                                          <div
                                            dir="ltr"
                                            className="font-mono font-bold text-sm text-slate-800 dark:text-gray-200 bg-slate-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-gray-600 whitespace-nowrap"
                                          >
                                            {formatEnglishInt(necFloor.subtotal)} m²
                                          </div>
                                        </div>

                                        <button
                                          type="button"
                                          disabled={bld.floors.length <= 1}
                                          onClick={() => handleDeleteFloorRow(bld.id, fl.id)}
                                          className={`p-2 rounded-lg border transition-colors ${
                                            bld.floors.length <= 1
                                              ? 'border-slate-200 dark:border-gray-700 text-slate-300 dark:text-gray-600 cursor-not-allowed'
                                              : 'border-red-200 dark:border-red-900/50 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer'
                                          }`}
                                          title="Delete floor"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* 2. SUB-ITEMS LIST (Floor Loads) */}
                                    <div className="space-y-2">
                                      {/* Desktop Column Headers */}
                                      {necFloor.loads.length > 0 && (
                                        <div className="hidden lg:grid lg:grid-cols-[1.5fr_1.4fr_1.1fr_1.2fr_1.2fr_44px] gap-3 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                          <div>Load Name</div>
                                          <div className="text-center">Density / Power</div>
                                          <div className="text-center">Demand Factor (DF)</div>
                                          <div className="text-right">Connected Load (kVA)</div>
                                          <div className="text-right">Demand Load (kVA)</div>
                                          <div className="text-center">Action</div>
                                        </div>
                                      )}

                                      {necFloor.loads.length === 0 ? (
                                        <div className="text-center py-4 text-xs font-medium text-slate-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-dashed border-slate-200 dark:border-gray-700">
                                          No loads assigned to this floor.
                                        </div>
                                      ) : (
                                        necFloor.loads.map((loadItem) => {
                                          const isLighting = loadItem.type === 'Lighting';
                                          const isAdditional = loadItem.type === 'Additional';
                                          const unitLabel = isAdditional ? 'kVA' : 'VA/m²';
                                          const defaultDensFallback = isLighting ? necFloor.lightingDensity : loadItem.type === 'Power' ? 20 : loadItem.type === 'HVAC' ? 50 : 0;
                                          const defaultDfFallback = loadItem.type === 'Power' ? 0.5 : 1.0;

                                          const badgeStyle =
                                            loadItem.type === 'Lighting'
                                              ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800'
                                              : loadItem.type === 'Power'
                                              ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/60 dark:text-green-200 dark:border-green-800'
                                              : loadItem.type === 'HVAC'
                                              ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-800'
                                              : 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800';

                                          return (
                                            <div
                                              key={loadItem.id}
                                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.4fr_1.1fr_1.2fr_1.2fr_44px] gap-3 items-center bg-gray-50 dark:bg-gray-800/70 p-2 rounded-lg border border-slate-200/80 dark:border-gray-700"
                                            >
                                              {/* Load Name */}
                                              <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${badgeStyle}`}>
                                                  {loadItem.label}
                                                </span>
                                                <span className="text-[11px] font-semibold text-slate-400 dark:text-gray-500 font-mono">
                                                  ({unitLabel})
                                                </span>
                                              </div>

                                              {/* Input: Density / Power */}
                                              <div dir="ltr">
                                                <label className="block lg:hidden text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 mb-1">
                                                  {isAdditional ? 'Power (kVA)' : 'Density (VA/m²)'}
                                                </label>
                                                <div className="relative">
                                                  {isLighting ? (
                                                    <input
                                                      type="text"
                                                      readOnly
                                                      dir="ltr"
                                                      lang="en"
                                                      style={{ direction: 'ltr', textAlign: 'center' }}
                                                      value={formatEnglishNumber(necFloor.lightingDensity, 0, 1)}
                                                      className={`w-full font-mono font-bold text-sm text-center rounded-lg px-2.5 py-1.5 pr-14 border cursor-default ${
                                                        isBasement
                                                          ? 'bg-amber-100 dark:bg-amber-300 text-gray-900 border-amber-300'
                                                          : 'bg-blue-50 dark:bg-blue-900/40 text-blue-950 dark:text-blue-100 border-blue-200 dark:border-blue-700'
                                                      }`}
                                                      title="Auto-populated from Building Occupancy Category (3 VA/m² for Basement)"
                                                    />
                                                  ) : (
                                                    <input
                                                      type="text"
                                                      inputMode="decimal"
                                                      dir="ltr"
                                                      lang="en"
                                                      style={{ direction: 'ltr', textAlign: 'center' }}
                                                      value={toEnglishDigits(loadItem.densityOrPower)}
                                                      onChange={(e) =>
                                                        handleUpdateNecLoad(
                                                          bld.id,
                                                          fl.id,
                                                          loadItem.id,
                                                          'densityOrPower',
                                                          renderDecimalSanitizer(e.target.value)
                                                        )
                                                      }
                                                      onBlur={() => {
                                                        if (loadItem.densityOrPower === '' || loadItem.densityOrPower === undefined) {
                                                          handleUpdateNecLoad(bld.id, fl.id, loadItem.id, 'densityOrPower', defaultDensFallback);
                                                        } else {
                                                          handleUpdateNecLoad(
                                                            bld.id,
                                                            fl.id,
                                                            loadItem.id,
                                                            'densityOrPower',
                                                            Math.max(0, Number(loadItem.densityOrPower) || 0)
                                                          );
                                                        }
                                                      }}
                                                      onKeyDown={handleArabicDigitsKeyDown}
                                                      onPaste={handleNumericPaste}
                                                      className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-1.5 pr-14 font-mono font-bold text-slate-900 dark:text-white text-sm text-center transition-colors"
                                                    />
                                                  )}
                                                  <span className="absolute right-2.5 top-2 text-[11px] font-bold text-slate-400 dark:text-gray-400 font-mono select-none">
                                                    {unitLabel}
                                                  </span>
                                                </div>
                                              </div>

                                              {/* Input: Demand Factor (DF) */}
                                              <div dir="ltr">
                                                <label className="block lg:hidden text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 mb-1">
                                                  Demand Factor (DF)
                                                </label>
                                                {isLighting ? (
                                                  <input
                                                    type="text"
                                                    readOnly
                                                    disabled
                                                    dir="ltr"
                                                    lang="en"
                                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                                    value="1.0"
                                                    className="w-full bg-slate-200/70 dark:bg-gray-700/60 text-slate-600 dark:text-gray-300 border border-slate-300 dark:border-gray-600 font-mono font-bold text-sm text-center rounded-lg px-2.5 py-1.5 cursor-not-allowed"
                                                    title="Fixed Lighting Demand Factor (1.0)"
                                                  />
                                                ) : (
                                                  <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    dir="ltr"
                                                    lang="en"
                                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                                    value={toEnglishDigits(loadItem.demandFactor)}
                                                    onChange={(e) =>
                                                      handleUpdateNecLoad(
                                                        bld.id,
                                                        fl.id,
                                                        loadItem.id,
                                                        'demandFactor',
                                                        renderDecimalSanitizer(e.target.value)
                                                      )
                                                    }
                                                    onBlur={() => {
                                                      if (loadItem.demandFactor === '' || loadItem.demandFactor === undefined) {
                                                        handleUpdateNecLoad(bld.id, fl.id, loadItem.id, 'demandFactor', defaultDfFallback);
                                                      } else {
                                                        handleUpdateNecLoad(
                                                          bld.id,
                                                          fl.id,
                                                          loadItem.id,
                                                          'demandFactor',
                                                          Math.max(0, Math.min(2, Number(loadItem.demandFactor) || 0))
                                                        );
                                                      }
                                                    }}
                                                    onKeyDown={handleArabicDigitsKeyDown}
                                                    onPaste={handleNumericPaste}
                                                    className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2.5 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-sm text-center transition-colors"
                                                  />
                                                )}
                                              </div>

                                              {/* Read-only: Connected Load (kVA) */}
                                              <div className="lg:text-right">
                                                <span className="block lg:hidden text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 mb-1">
                                                  Connected Load (kVA)
                                                </span>
                                                <div
                                                  dir="ltr"
                                                  className="inline-block w-full lg:w-auto text-center lg:text-right font-mono font-bold text-sm text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1.5 rounded-md border border-blue-200 dark:border-blue-800 whitespace-nowrap"
                                                >
                                                  {formatEnglishNumber(loadItem.connectedKva, 1, 2)} kVA
                                                </div>
                                              </div>

                                              {/* Read-only: Demand Load (kVA) */}
                                              <div className="lg:text-right">
                                                <span className="block lg:hidden text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 mb-1">
                                                  Demand Load (kVA)
                                                </span>
                                                <div
                                                  dir="ltr"
                                                  className="inline-block w-full lg:w-auto text-center lg:text-right font-mono font-bold text-sm text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800 whitespace-nowrap"
                                                >
                                                  {formatEnglishNumber(loadItem.demandKva, 1, 2)} kVA
                                                </div>
                                              </div>

                                              {/* Action: Delete Load */}
                                              <div className="flex justify-end lg:justify-center">
                                                <button
                                                  type="button"
                                                  onClick={() => handleDeleteNecLoad(bld.id, fl.id, loadItem.id)}
                                                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                                                  title={`Remove ${loadItem.label} from ${fl.name}`}
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </div>
                                            </div>
                                          );
                                        })
                                      )}
                                    </div>

                                    {/* 4. FLOOR TOTALS */}
                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-gray-700 flex flex-wrap items-center justify-end gap-4 sm:gap-6">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400">
                                          Floor Total Connected (kVA):
                                        </span>
                                        <span
                                          dir="ltr"
                                          className="font-mono font-black text-sm text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-md"
                                        >
                                          {formatEnglishNumber(necFloor.totalConnected, 1, 2)} kVA
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400">
                                          Floor Total Demand (kVA):
                                        </span>
                                        <span
                                          dir="ltr"
                                          className="font-mono font-black text-sm text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-md"
                                        >
                                          {formatEnglishNumber(necFloor.totalDemand, 1, 2)} kVA
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                              {/* Building Total Summary Strip */}
                              <div className="rounded-xl border border-slate-300 dark:border-gray-600 bg-blue-50/70 dark:bg-gray-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-4 text-sm font-black text-slate-900 dark:text-white">
                                  <span className="flex items-center gap-1.5 text-blue-950 dark:text-blue-300">
                                    <span>⚡</span>
                                    <span>Total for this Building</span>
                                  </span>
                                  <span dir="ltr" className="font-mono text-xs font-bold bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-600 px-2.5 py-1 rounded-md text-slate-700 dark:text-gray-200">
                                    {formatEnglishInt(bld.floorsCount)} Floors
                                  </span>
                                  <span dir="ltr" className="font-mono text-xs font-bold bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-600 px-2.5 py-1 rounded-md text-[#1E3A8A] dark:text-blue-300">
                                    {formatEnglishInt(bld.totalArea)} m²
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-gray-300">Connected:</span>
                                    <span dir="ltr" className="font-mono font-black text-sm text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/60 border border-blue-300 dark:border-blue-700 px-2.5 py-1 rounded-md">
                                      {formatEnglishNumber(bldConnectedLoadSum, 1, 2)} kVA
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-gray-300">Demand:</span>
                                    <span dir="ltr" className="font-mono font-black text-sm text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1 rounded-md">
                                      {formatEnglishNumber(bldDemandLoadSum, 1, 2)} kVA
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }

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
                                      : (selectedStandardId === 'saudi' || isNecMode)
                                      ? 'APPLIED LOAD DENSITY (VA/m²)'
                                      : isIecMode
                                      ? 'APPLIED LOAD DENSITY (W/m²)'
                                      : 'APPLIED LOAD DENSITY (kVA/100m²)'}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr
                                      ? (isIecMode ? 'الحمل التوصيلي (TOTAL CONNECTED LOAD kW)' : 'الحمل التوصيلي (TOTAL CONNECTED LOAD)')
                                      : (isIecMode ? 'TOTAL CONNECTED LOAD (kW)' : 'TOTAL CONNECTED LOAD (kVA)')}
                                  </th>
                                  <th className="py-2.5 px-3 w-28 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isIecMode
                                      ? (isAr ? 'معامل التزامن (SIMULTANEITY FACTOR - SF)' : 'SIMULTANEITY FACTOR (SF)')
                                      : (isAr ? 'معامل الطلب (DEMAND FACTOR)' : 'DEMAND FACTOR (Editable)')}
                                  </th>
                                  <th className="py-2.5 px-3 w-36 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr
                                      ? (isIecMode ? 'حمل الطلب (TOTAL DEMAND LOAD kW)' : 'حمل الطلب (TOTAL DEMAND LOAD)')
                                      : (isIecMode ? 'TOTAL DEMAND LOAD (kW)' : 'TOTAL DEMAND LOAD (kVA)')}
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
                                  const appliedDensity = getFloorAppliedDensity(fl.name, bldActiveType, bldEstType, fl.appliedLoadDensity);
                                  const connectedLoadKva = (rowSubtotal * appliedDensity) / densityDivisor;
                                  const fallbackDf = isIecMode
                                    ? (isBasement ? 0.6 : (iecBuildingCat?.sf ?? 0.6))
                                    : 0.8;
                                  const demandFactor = fl.demandFactor !== undefined ? (Number(fl.demandFactor) ?? fallbackDf) : fallbackDf;
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
                                            {selectedStandardId === 'saudi'
                                              ? (isAr ? '⚠️ كود البدروم (30 ف.أ/م² / 3 ك.ف.أ/100م²)' : '⚠️ Basement Code: 30 VA/m² (3 kVA/100m²)')
                                              : isNecMode
                                              ? (isAr ? '⚠️ كود البدروم (3 ف.أ/م²)' : '⚠️ Basement Code: 3 VA/m²')
                                              : isIecMode
                                              ? (isAr
                                                  ? `⚠️ كود البدروم (${getIecBasementCategory()[iecDemandType]} W/m²)`
                                                  : `⚠️ Basement Code: ${getIecBasementCategory()[iecDemandType]} W/m²`)
                                              : (isAr ? '⚠️ كود البدروم (3 ك.ف.أ/100م²)' : '⚠️ Basement Code: 3 kVA/100m²')}
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
                                          ) : isIecMode ? (
                                            <>
                                              <span dir="ltr" className="text-gray-900">{formatEnglishNumber(appliedDensity, 0, 1)}</span>
                                              <span className="text-[10px] font-bold opacity-80 uppercase text-gray-900">W/m²</span>
                                            </>
                                          ) : isNecMode ? (
                                            <>
                                              <span dir="ltr" className="text-gray-900">{formatEnglishNumber(appliedDensity, 0, 1)}</span>
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
                                          {formatEnglishNumber(connectedLoadKva, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}
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
                                                const fallbackDf =
                                                  selectedStandardId === 'saudi'
                                                    ? (isBasement
                                                        ? 0.7
                                                        : (getSaudiCategoryByCodeOrName(bld.buildingType)?.df ?? saudiDemandFactor))
                                                    : isIecMode
                                                    ? (isBasement ? 0.6 : (iecBuildingCat?.sf ?? 0.6))
                                                    : 0.8;
                                                handleUpdateFloorRow(bld.id, fl.id, 'demandFactor', fallbackDf);
                                              } else {
                                                const val = Math.max(0, Math.min(2, Number(fl.demandFactor) || 0));
                                                handleUpdateFloorRow(bld.id, fl.id, 'demandFactor', val);
                                              }
                                            }}
                                            onKeyDown={handleArabicDigitsKeyDown}
                                            onPaste={handleNumericPaste}
                                            className="w-18 bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 border-2 border-blue-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-black text-slate-900 dark:text-white text-center transition-all shadow-2xs"
                                            placeholder={isIecMode ? '0.6' : '0.8'}
                                          />
                                        </div>
                                      </td>

                                      {/* Column 4: TOTAL DEMAND LOAD (kVA) */}
                                      <td className="p-2 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                        <span dir="ltr" className="inline-block font-mono font-black text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                          {formatEnglishNumber(demandLoadKva, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}
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
                                      <span>{isAr ? (isIecMode ? 'ملخص الأحمال المحسوبة (kW)' : 'ملخص الأحمال المحسوبة') : (isIecMode ? 'LOADS SUMMARY (kW)' : 'LOADS SUMMARY')}</span>
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
                                      {formatEnglishNumber(bldConnectedLoadSum, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}
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
                                      {formatEnglishNumber(bldDemandLoadSum, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-2 text-center"></td>
                                </tr>

                                {/* Total for this Building Row */}
                                <tr className="bg-slate-100/90 dark:bg-gray-900/80 font-black border-t border-slate-300 dark:border-gray-600 text-xs text-slate-900 dark:text-gray-200">
                                  <td className="py-2.5 px-3 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                                    {isAr ? (isIecMode ? 'المجموع الإجمالي للمبنى (kW)' : 'المجموع الإجمالي للمبنى') : (isIecMode ? 'Total for this Building (kW)' : 'Total for this Building')}
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
                                    <span dir="ltr">{formatEnglishNumber(bldConnectedLoadSum, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-xs text-slate-700 dark:text-gray-300">
                                    <span dir="ltr">{formatEnglishNumber(bldOverallDemandFactor * 100, 1, 1)}%</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-emerald-900 dark:text-emerald-300 font-extrabold">
                                    <span dir="ltr">{formatEnglishNumber(bldDemandLoadSum, 1, isIecMode ? 2 : 1)} {isIecMode ? 'kW' : 'kVA'}</span>
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
            )}

            {/* SECTION 3: "Pumps & Extra Loads (المضخات والأحمال الإضافية)" */}
            {includeAdditionalLoads && (
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

                {/* Sub-Tabs: Pumps vs Extra Loads (Hide Pumps tab for IEC) */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-gray-900 p-1 rounded-xl self-start sm:self-auto">
                  {selectedStandardId !== 'europe' && (
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
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveLoadsTab('extra')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedStandardId === 'europe' || activeLoadsTab === 'extra'
                        ? 'bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-blue-300 shadow-xs'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {selectedStandardId === 'europe'
                      ? isAr
                        ? `المساحات الوظيفية والمعدات (${iecExtraLoads.length})`
                        : `Functional Areas / Equipment (${iecExtraLoads.length})`
                      : isAr
                      ? `أحمال إضافية (${extraLoads.length})`
                      : `Extra Loads (${extraLoads.length})`}
                  </button>
                </div>
              </div>

              {/* Action Buttons (For IEC, show ONLY full-width + Add Functional Area / Equipment) */}
              <div className={`grid gap-3 ${selectedStandardId === 'europe' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLoadsTab('extra');
                    setIsAddingExtra(true);
                    setIsAddingPump(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAddingExtra
                      ? 'bg-[#1E3A8A] hover:bg-blue-900 active:bg-blue-950 border-[#1E3A8A] text-white shadow-sm'
                      : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 active:bg-slate-100 dark:active:bg-gray-600 text-slate-800 dark:text-gray-200 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <Plus className={`w-4 h-4 ${isAddingExtra ? 'text-amber-300' : 'text-[#1E3A8A] dark:text-blue-300'}`} />
                  <span>
                    {selectedStandardId === 'europe'
                      ? isAr
                        ? '+ إضافة مساحة وظيفية / معدات'
                        : '+ Add Functional Area / Equipment'
                      : isAr
                      ? '+ إضافة أحمال إضافية'
                      : '+ Add Extra Loads'}
                  </span>
                </button>

                {selectedStandardId !== 'europe' && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLoadsTab('pumps');
                      setIsAddingPump(true);
                      setIsAddingExtra(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAddingPump
                        ? 'bg-[#1E3A8A] hover:bg-blue-900 active:bg-blue-950 border-[#1E3A8A] text-white shadow-sm'
                        : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 active:bg-slate-100 dark:active:bg-gray-600 text-slate-800 dark:text-gray-200 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <Plus className={`w-4 h-4 ${isAddingPump ? 'text-amber-300' : 'text-[#1E3A8A] dark:text-blue-300'}`} />
                    <span>{isAr ? '+ إضافة مضخات (مياه / حريق)' : '+ Add Pumps (Water/Fire)'}</span>
                  </button>
                )}
              </div>

              {/* Inline Form: Add Pump */}
              {selectedStandardId !== 'europe' && isAddingPump && (
                <form
                  onSubmit={handleAddPump}
                  className="p-4 bg-blue-50/70 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-700 rounded-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      {isAr ? 'إدخال بيانات مضخة جديدة (ADD NEW PUMP PARAMETERS)' : 'Add New Pump Parameters'}
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
                      placeholder={isAr ? 'اسم المضخة (مثال: PUMP-2)' : 'Pump Name (e.g., PUMP-2)'}
                      value={newPumpName}
                      onChange={(e) => setNewPumpName(e.target.value)}
                      className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                      required
                    />
                    <div className="flex items-stretch gap-2" dir="ltr">
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        lang="en"
                        style={{ direction: 'ltr', textAlign: 'left' }}
                        placeholder="Power Value"
                        value={toEnglishDigits(newPumpPower)}
                        onChange={(e) => {
                          let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                          const parts = clean.split('.');
                          if (parts.length > 2) {
                            clean = parts[0] + '.' + parts.slice(1).join('');
                          }
                          setNewPumpPower(clean);
                        }}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="flex-1 min-w-0 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                        required
                      />
                      <select
                        dir="ltr"
                        lang="en"
                        value={newPumpUnit}
                        onChange={(e) => setNewPumpUnit(e.target.value as PumpPowerUnit)}
                        className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg px-2.5 py-2 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden cursor-pointer"
                        aria-label="Pump Power Unit"
                      >
                        <option value="HP">HP</option>
                        <option value="W">Watts (W)</option>
                        <option value="kVA">kVA</option>
                      </select>
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

              {/* Inline Form: Add Extra Load (IEC Table 30/2 vs Standard Extra Load) */}
              {isAddingExtra && selectedStandardId === 'europe' && (
                <form
                  onSubmit={handleAddIecExtraLoad}
                  className="p-4 bg-blue-50/70 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-700 rounded-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      {isAr
                        ? 'إضافة مساحة وظيفية / معدات (جدول IEC 30/2)'
                        : 'Add Functional Area / Equipment (IEC Table 30/2)'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingExtra(false)}
                      className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    {/* Dropdown: Select Equipment / Area */}
                    <div className="sm:col-span-6 space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300">
                        {isAr ? 'اختر المعدات / المساحة (Select Equipment / Area)' : 'Select Equipment / Area'}
                      </label>
                      <select
                        value={selectedIecExtraName}
                        onChange={(e) => setSelectedIecExtraName(e.target.value)}
                        className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-semibold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden cursor-pointer"
                      >
                        <optgroup label="Functional Areas (W/m²)">
                          {IEC_EXTRA_LOADS_DATA.filter((item) => item.category === 'Functional Area').map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name} — {getIecExtraLoadDensity(item, iecDemandType)} W/m² (SF: {item.sf.toFixed(1)})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Building Installations (Direct Power kW)">
                          {IEC_EXTRA_LOADS_DATA.filter((item) => item.category === 'Installation').map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name} — Direct kW (SF: {item.sf.toFixed(1)})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Heating / Cooling / PV (W/m²)">
                          {IEC_EXTRA_LOADS_DATA.filter((item) => item.category === 'Heating/Cooling').map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name} — {getIecExtraLoadDensity(item, iecDemandType)} W/m² (SF: {item.sf.toFixed(1)})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Input: Area (M²) OR Direct Power (kW) for Installations */}
                    <div className="sm:col-span-3 space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300">
                        {isSelectedIecInstallation
                          ? isAr
                            ? 'القدرة المباشرة (Power kW)'
                            : 'Power (kW)'
                          : isAr
                          ? 'المساحة (Area M²)'
                          : 'Area (M²)'}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        lang="en"
                        style={{ direction: 'ltr', textAlign: 'left' }}
                        placeholder={isSelectedIecInstallation ? '15' : '100'}
                        value={toEnglishDigits(isSelectedIecInstallation ? newIecExtraPowerKw : newIecExtraArea)}
                        onChange={(e) => {
                          let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                          const parts = clean.split('.');
                          if (parts.length > 2) {
                            clean = parts[0] + '.' + parts.slice(1).join('');
                          }
                          if (isSelectedIecInstallation) {
                            setNewIecExtraPowerKw(clean);
                          } else {
                            setNewIecExtraArea(clean);
                          }
                        }}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="w-full bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                        required
                      />
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-3">
                      <button
                        type="submit"
                        className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-lg p-2.5 transition-colors cursor-pointer"
                      >
                        {isAr ? 'إضافة العنصر' : 'Add Item'}
                      </button>
                    </div>
                  </div>

                  {/* Quick preview of selected Table 30/2 parameters */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 dark:text-gray-300 font-medium">
                    <span>
                      Category: <strong className="text-slate-900 dark:text-white">{selectedIecExtraSpec.category}</strong>
                    </span>
                    <span>•</span>
                    {isSelectedIecInstallation ? (
                      <span>
                        Mode: <strong className="text-[#1E3A8A] dark:text-blue-300">Direct Power Input (kW)</strong>
                      </span>
                    ) : (
                      <span>
                        Density ({iecDemandType.toUpperCase()}):{' '}
                        <strong className="font-mono text-[#1E3A8A] dark:text-blue-300">
                          {getIecExtraLoadDensity(selectedIecExtraSpec, iecDemandType)} W/m²
                        </strong>
                      </span>
                    )}
                    <span>•</span>
                    <span>
                      Simultaneity Factor (SF):{' '}
                      <strong className="font-mono text-emerald-700 dark:text-emerald-300">
                        {selectedIecExtraSpec.sf.toFixed(2)}
                      </strong>
                    </span>
                  </div>
                </form>
              )}

              {isAddingExtra && selectedStandardId !== 'europe' && (
                <form
                  onSubmit={handleAddExtraLoad}
                  className="p-4 bg-slate-50 dark:bg-gray-900/80 border border-slate-300 dark:border-gray-700 rounded-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      {isAr ? 'إدخال حمل إضافي جديد (ADD NEW EXTRA LOAD ITEM)' : 'Add New Extra Load Item'}
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
                      placeholder={isAr ? 'اسم الحمل (مثال: ELEVATOR-2)' : 'Load Name (e.g. EV Chargers)'}
                      value={newExtraName}
                      onChange={(e) => setNewExtraName(e.target.value)}
                      className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-medium sm:col-span-2 focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                      required
                    />
                    <div className="flex items-stretch gap-2" dir="ltr">
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        lang="en"
                        style={{ direction: 'ltr', textAlign: 'left' }}
                        placeholder="Power Value"
                        value={toEnglishDigits(newExtraPower)}
                        onChange={(e) => {
                          let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                          const parts = clean.split('.');
                          if (parts.length > 2) {
                            clean = parts[0] + '.' + parts.slice(1).join('');
                          }
                          setNewExtraPower(clean);
                        }}
                        onKeyDown={handleArabicDigitsKeyDown}
                        onPaste={handleNumericPaste}
                        className="flex-1 min-w-0 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg p-2.5 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                        required
                      />
                      <select
                        dir="ltr"
                        lang="en"
                        value={newExtraUnit}
                        onChange={(e) => setNewExtraUnit(e.target.value as ExtraLoadUnit)}
                        className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white text-xs sm:text-sm rounded-lg px-2.5 py-2 font-mono font-bold focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden cursor-pointer"
                        aria-label="Extra Load Power Unit"
                      >
                        <option value="kVA">kVA</option>
                        <option value="W">Watts (W)</option>
                      </select>
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

              {/* Data Grid to Show Added Items (IEC shows ONLY Extra Loads) */}
              {selectedStandardId !== 'europe' && activeLoadsTab === 'pumps' ? (
                <div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="bg-[#F8FAFC] dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-gray-600">
                        <tr>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-200">
                            {isAr ? 'اسم المضخة (Pump Name)' : 'Pump Name'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'القدرة (POWER - Value & Unit)' : 'Power (Value & Unit)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'الكفاءة (EFFICIENCY η)' : 'Efficiency (η)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'معامل القدرة (PF)' : 'Power Factor (PF)'}
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
                          const effValue = pump.efficiency !== undefined ? pump.efficiency : 95;
                          const pfValue = pump.pf !== undefined ? pump.pf : 0.85;
                          const unitValue: PumpPowerUnit = pump.unit || 'HP';
                          const kvaValue = calculatePumpKva(pump.power, unitValue, effValue, pfValue);
                          return (
                            <tr
                              key={pump.id}
                              className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800 hover:bg-blue-50/30 dark:hover:bg-gray-700/50' : 'bg-[#FAFCFF] dark:bg-gray-900/50 hover:bg-blue-50/30 dark:hover:bg-gray-700/50'}
                            >
                              <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                  <span>{isAr && pump.nameAr ? pump.nameAr : pump.name}</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-1.5" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(pump.power)}
                                    onChange={(e) => {
                                      let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      const parts = clean.split('.');
                                      if (parts.length > 2) {
                                        clean = parts[0] + '.' + parts.slice(1).join('');
                                      }
                                      handleUpdatePump(pump.id, 'power', clean);
                                    }}
                                    onBlur={() => {
                                      const num = Number(pump.power);
                                      if (pump.power === '' || isNaN(num) || num < 0) {
                                        handleUpdatePump(pump.id, 'power', 0);
                                      } else {
                                        handleUpdatePump(pump.id, 'power', num);
                                      }
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-20 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                    placeholder="10"
                                  />
                                  <select
                                    dir="ltr"
                                    lang="en"
                                    value={unitValue}
                                    onChange={(e) => handleUpdatePump(pump.id, 'unit', e.target.value as PumpPowerUnit)}
                                    className="bg-slate-50 dark:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-700 dark:text-gray-200 text-xs focus:outline-hidden cursor-pointer"
                                    aria-label="Row Pump Unit"
                                  >
                                    <option value="HP">HP</option>
                                    <option value="W">Watts (W)</option>
                                    <option value="kVA">kVA</option>
                                  </select>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-1" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(effValue)}
                                    onChange={(e) => {
                                      let clean = toEnglishDigits(e.target.value).replace(/[^0-9]/g, '');
                                      if (clean !== '') {
                                        const num = parseInt(clean, 10);
                                        if (num > 100) {
                                          clean = '100';
                                        } else {
                                          clean = String(num);
                                        }
                                      }
                                      handleUpdatePump(pump.id, 'efficiency', clean);
                                    }}
                                    onBlur={() => {
                                      const num = parseInt(String(effValue), 10);
                                      if (effValue === '' || isNaN(num)) {
                                        handleUpdatePump(pump.id, 'efficiency', 95);
                                      } else if (num < 1) {
                                        handleUpdatePump(pump.id, 'efficiency', 1);
                                      } else if (num > 100) {
                                        handleUpdatePump(pump.id, 'efficiency', 100);
                                      } else {
                                        handleUpdatePump(pump.id, 'efficiency', num);
                                      }
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-16 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                    placeholder="95"
                                  />
                                  <span className="text-xs font-bold text-slate-500 dark:text-gray-400 font-mono select-none">%</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center justify-center" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(pfValue)}
                                    onChange={(e) => {
                                      let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      const parts = clean.split('.');
                                      if (parts.length > 2) {
                                        clean = parts[0] + '.' + parts.slice(1).join('');
                                      }
                                      handleUpdatePump(pump.id, 'pf', clean);
                                    }}
                                    onBlur={() => {
                                      const num = Number(pfValue);
                                      if (pfValue === '' || isNaN(num) || num <= 0) {
                                        handleUpdatePump(pump.id, 'pf', 0.85);
                                      } else if (num > 1) {
                                        handleUpdatePump(pump.id, 'pf', 1);
                                      } else {
                                        handleUpdatePump(pump.id, 'pf', num);
                                      }
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-20 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                    placeholder="0.85"
                                  />
                                </div>
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
                            <td colSpan={6} className="py-6 text-center text-slate-400 dark:text-gray-500 font-medium text-xs">
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

                    {/* Line 2 (Equation, large and centered): Power (kVA) = (HP × 0.746) ÷ (η% × PF) */}
                    <div className="py-1 text-lg sm:text-[20px] font-serif font-bold text-slate-900 dark:text-white tracking-wide select-all">
                      Power (kVA) = (HP × 0.746) ÷ (η% × PF)
                    </div>

                    {/* Line 3 (Subtext below equation, smaller font) */}
                    <p className="text-xs text-slate-600 dark:text-gray-300 font-medium mt-1">
                      {isAr ? (
                        <>HP: <span dir="ltr" className="font-bold text-slate-800 dark:text-white font-mono">(HP × 0.746) ÷ (η% × PF)</span> • Watts: <span dir="ltr" className="font-bold text-slate-800 dark:text-white font-mono">(Watts ÷ 1000) ÷ PF</span> • kVA: <span dir="ltr" className="font-bold text-slate-800 dark:text-white font-mono">Direct</span> (الافتراضي: η = <span dir="ltr" className="font-bold text-slate-800 dark:text-white font-mono">95%</span>, PF = <span dir="ltr" className="font-bold text-slate-800 dark:text-white font-mono">0.85</span>).</>
                      ) : (
                        <>HP: <span className="font-bold text-slate-800 dark:text-white font-mono">(HP × 0.746) ÷ (η% × PF)</span> • Watts: <span className="font-bold text-slate-800 dark:text-white font-mono">(Watts ÷ 1000) ÷ PF</span> • kVA: <span className="font-bold text-slate-800 dark:text-white font-mono">Direct</span> (Defaults: η = <span className="font-bold text-slate-800 dark:text-white font-mono">95%</span>, PF = <span className="font-bold text-slate-800 dark:text-white font-mono">0.85</span>).</>
                      )}
                    </p>
                  </div>
                </div>
              ) : selectedStandardId === 'europe' ? (
                /* IEC Table 30/2 Extra Loads Grid (IEC ONLY) */
                <div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="bg-[#F8FAFC] dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-gray-600">
                        <tr>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-200">
                            {isAr ? 'اسم العنصر (ITEM NAME)' : 'ITEM NAME'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'المساحة (AREA M²)' : 'AREA (M²)'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'كثافة الحمل المطبقة (W/m²)' : 'APPLIED LOAD DENSITY (W/m²)'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-[#1E3A8A] dark:text-blue-300">
                            {isAr ? 'إجمالي الحمل التوصيلي (kW)' : 'TOTAL CONNECTED LOAD (kW)'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'معامل التزامن (SF)' : 'SIMULTANEITY FACTOR (SF)'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-emerald-800 dark:text-emerald-300">
                            {isAr ? 'إجمالي حمل الطلب (kW)' : 'TOTAL DEMAND LOAD (kW)'}
                          </th>
                          <th className="py-3 px-3 border-b border-slate-200 dark:border-gray-600 text-center text-slate-700 dark:text-gray-300">
                            {isAr ? 'حذف (ACTION)' : 'ACTION'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-gray-700 font-medium">
                        {iecExtraLoadsList.map((entry, idx) => {
                          const { item, isInstallation, density, connected, sf, demand } = entry;
                          return (
                            <tr
                              key={item.id}
                              className={
                                idx % 2 === 0
                                  ? 'bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50'
                                  : 'bg-[#FAFCFF] dark:bg-gray-900/50 hover:bg-slate-50 dark:hover:bg-gray-700/50'
                              }
                            >
                              {/* ITEM NAME */}
                              <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                  <div>
                                    <div>{item.name}</div>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* AREA (M²) - Editable for area-based items */}
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                {isInstallation ? (
                                  <span className="text-xs font-mono text-slate-400 dark:text-gray-500 select-none">
                                    —
                                  </span>
                                ) : (
                                  <div className="flex items-center justify-center gap-1" dir="ltr">
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      dir="ltr"
                                      lang="en"
                                      style={{ direction: 'ltr', textAlign: 'center' }}
                                      value={toEnglishDigits(item.area)}
                                      onChange={(e) => {
                                        let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                        const parts = clean.split('.');
                                        if (parts.length > 2) {
                                          clean = parts[0] + '.' + parts.slice(1).join('');
                                        }
                                        handleUpdateIecExtraLoad(item.id, 'area', clean);
                                      }}
                                      onBlur={() => {
                                        const num = Number(item.area);
                                        if (item.area === '' || isNaN(num) || num < 0) {
                                          handleUpdateIecExtraLoad(item.id, 'area', 0);
                                        } else {
                                          handleUpdateIecExtraLoad(item.id, 'area', num);
                                        }
                                      }}
                                      onKeyDown={handleArabicDigitsKeyDown}
                                      onPaste={handleNumericPaste}
                                      className="w-24 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                      placeholder="100"
                                    />
                                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400">m²</span>
                                  </div>
                                )}
                              </td>

                              {/* APPLIED LOAD DENSITY (W/m²) - Read-only */}
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700 font-mono">
                                {isInstallation ? (
                                  <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-900 px-2 py-1 rounded-md border border-slate-200 dark:border-gray-700">
                                    Direct kW
                                  </span>
                                ) : (
                                  <span
                                    dir="ltr"
                                    className="inline-block bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 px-2.5 py-1 rounded-md font-bold text-slate-800 dark:text-gray-200 text-xs"
                                  >
                                    {formatEnglishNumber(density, 0, 1)} W/m²
                                  </span>
                                )}
                              </td>

                              {/* TOTAL CONNECTED LOAD (kW) */}
                              <td className="py-2.5 px-3 text-center font-mono font-black text-[#1E3A8A] dark:text-blue-300 border-b border-slate-100 dark:border-gray-700">
                                {isInstallation ? (
                                  <div className="flex items-center justify-center gap-1" dir="ltr">
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      dir="ltr"
                                      lang="en"
                                      style={{ direction: 'ltr', textAlign: 'center' }}
                                      value={toEnglishDigits(item.directPowerKw)}
                                      onChange={(e) => {
                                        let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                        const parts = clean.split('.');
                                        if (parts.length > 2) {
                                          clean = parts[0] + '.' + parts.slice(1).join('');
                                        }
                                        handleUpdateIecExtraLoad(item.id, 'directPowerKw', clean);
                                      }}
                                      onBlur={() => {
                                        const num = Number(item.directPowerKw);
                                        if (item.directPowerKw === '' || isNaN(num) || num < 0) {
                                          handleUpdateIecExtraLoad(item.id, 'directPowerKw', 0);
                                        } else {
                                          handleUpdateIecExtraLoad(item.id, 'directPowerKw', num);
                                        }
                                      }}
                                      onKeyDown={handleArabicDigitsKeyDown}
                                      onPaste={handleNumericPaste}
                                      className="w-20 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-[#1E3A8A] dark:text-blue-300 text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                      placeholder="15"
                                    />
                                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400">kW</span>
                                  </div>
                                ) : (
                                  <span dir="ltr">{formatEnglishNumber(connected, 2, 2)} kW</span>
                                )}
                              </td>

                              {/* SIMULTANEITY FACTOR (SF) - Read-only */}
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700 font-mono font-bold text-slate-700 dark:text-gray-200">
                                <span
                                  dir="ltr"
                                  className="inline-block bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 px-2.5 py-1 rounded-md text-xs"
                                >
                                  {formatEnglishNumber(sf, 2, 2)}
                                </span>
                              </td>

                              {/* TOTAL DEMAND LOAD (kW) - Read-only */}
                              <td className="py-2.5 px-3 text-center font-mono font-black text-emerald-700 dark:text-emerald-300 border-b border-slate-100 dark:border-gray-700">
                                <span dir="ltr">{formatEnglishNumber(demand, 2, 2)} kW</span>
                              </td>

                              {/* ACTION */}
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteIecExtraLoad(item.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer inline-flex items-center justify-center"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {iecExtraLoadsList.length === 0 && (
                          <tr>
                            <td colSpan={7} className="py-6 text-center text-slate-400 dark:text-gray-500 font-medium text-xs">
                              {isAr
                                ? 'لا توجد مساحات وظيفية أو معدات مضافة حالياً. اضغط على "+ إضافة مساحة وظيفية / معدات" أعلاه.'
                                : 'No functional areas or equipment added yet. Click "+ Add Functional Area / Equipment" above to add.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Extra Loads Grid (Non-IEC Standards) */
                <div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="bg-[#F8FAFC] dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-gray-600">
                        <tr>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-200">
                            {isAr ? 'اسم الحمل (Load Name)' : 'Equipment / Load Name'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'القدرة (POWER - Value & Unit)' : 'Power (Value & Unit)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-800 dark:text-gray-300">
                            {isAr ? 'الكمية (Qty)' : 'Quantity'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-[#1E3A8A] dark:text-blue-300">
                            {isAr ? 'القيمة المحسوبة (kVA)' : 'Calculated Value (kVA)'}
                          </th>
                          <th className="py-3 px-4 border-b border-slate-200 dark:border-gray-600 text-center text-slate-700 dark:text-gray-300">
                            {isAr ? 'حذف' : 'Action'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-gray-700 font-medium">
                        {extraLoads.map((load, idx) => {
                          const unitValue: ExtraLoadUnit = load.unit || 'kVA';
                          const qtyValue = Number(load.qty) || 1;
                          const totalKva = calculateExtraLoadUnitKva(load.power, unitValue) * qtyValue;
                          return (
                            <tr
                              key={load.id}
                              className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50' : 'bg-[#FAFCFF] dark:bg-gray-900/50 hover:bg-slate-50 dark:hover:bg-gray-700/50'}
                            >
                              <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                  <span>{isAr && load.nameAr ? load.nameAr : load.name}</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center border-b border-slate-100 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-1.5" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(load.power)}
                                    onChange={(e) => {
                                      let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      const parts = clean.split('.');
                                      if (parts.length > 2) {
                                        clean = parts[0] + '.' + parts.slice(1).join('');
                                      }
                                      handleUpdateExtraLoad(load.id, 'power', clean);
                                    }}
                                    onBlur={() => {
                                      const num = Number(load.power);
                                      if (load.power === '' || isNaN(num) || num < 0) {
                                        handleUpdateExtraLoad(load.id, 'power', 0);
                                      } else {
                                        handleUpdateExtraLoad(load.id, 'power', num);
                                      }
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-20 bg-slate-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-900 dark:text-white text-center transition-colors shadow-2xs text-xs sm:text-sm focus:outline-hidden"
                                    placeholder="25"
                                  />
                                  <select
                                    dir="ltr"
                                    lang="en"
                                    value={unitValue}
                                    onChange={(e) => handleUpdateExtraLoad(load.id, 'unit', e.target.value as ExtraLoadUnit)}
                                    className="bg-slate-50 dark:bg-gray-900 border border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg px-2 py-1.5 font-mono font-bold text-slate-700 dark:text-gray-200 text-xs focus:outline-hidden cursor-pointer"
                                    aria-label="Row Extra Load Unit"
                                  >
                                    <option value="kVA">kVA</option>
                                    <option value="W">Watts (W)</option>
                                  </select>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-700 dark:text-gray-300 border-b border-slate-100 dark:border-gray-700">
                                <span dir="ltr">{formatEnglishInt(qtyValue)}</span>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-black text-[#1E3A8A] dark:text-blue-300 border-b border-slate-100 dark:border-gray-700">
                                <span dir="ltr">{formatEnglishNumber(totalKva, 2, 2)} kVA</span>
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
                          );
                        })}
                        {extraLoads.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-slate-400 dark:text-gray-500 font-medium text-xs">
                              {isAr ? 'لا توجد أحمال إضافية حالياً. اضغط على زر + إضافة أحمال إضافية أعلاه.' : 'No extra loads currently listed. Click "+ Add Extra Loads" above to add.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* ============================================================== */}
            {/* NEW SECTION: "DETAILED LOAD SUMMARY (ملخص الأحمال التفصيلي)"     */}
            {/* ============================================================== */}
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
                          {formatEnglishNumber(grandTotalConnected, 1, selectedStandardId === 'europe' ? 2 : 1)} {selectedStandardId === 'europe' ? 'kW' : 'kVA'}
                        </span>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-2xs">
                        <span className="text-2xs font-extrabold uppercase text-slate-600 dark:text-gray-300">
                          {selectedStandardId === 'europe'
                            ? (isAr ? 'إجمالي حمل الطلب (kVA):' : 'Total Demand (kVA):')
                            : (isAr ? 'بعد معامل التباين:' : 'After Diversity:')}
                        </span>
                        <span dir="ltr" className="text-sm sm:text-base font-mono font-black text-emerald-800 dark:text-emerald-300">
                          {selectedStandardId === 'europe'
                            ? `${formatEnglishNumber(iecTotalDemandKva, 1, 2)} kVA`
                            : `${formatEnglishNumber(finalDiversifiedDemand, 1, 1)} kVA`}
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
                            {isAr
                              ? (selectedStandardId === 'europe' ? 'الحمل التوصيلي (TOTAL CONNECTED kW)' : 'الحمل التوصيلي (TOTAL CONNECTED kVA)')
                              : (selectedStandardId === 'europe' ? 'TOTAL CONNECTED (kW)' : 'TOTAL CONNECTED (kVA)')}
                          </th>
                          <th className="py-3 px-3.5 w-36 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                            {selectedStandardId === 'europe'
                              ? (isAr ? 'معامل التزامن (SF)' : 'SIMULTANEITY FACTOR (SF)')
                              : (isAr ? 'معامل الطلب (DEMAND FACTOR)' : 'DEMAND FACTOR')}
                          </th>
                          <th className="py-3 px-3.5 w-40 text-right rtl:text-left">
                            {isAr
                              ? (selectedStandardId === 'europe' ? 'حمل الطلب (TOTAL DEMAND LOAD kW)' : 'حمل الطلب (TOTAL DEMAND LOAD kVA)')
                              : (selectedStandardId === 'europe' ? 'TOTAL DEMAND LOAD (kW)' : 'TOTAL DEMAND LOAD (kVA)')}
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
                            <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-gray-900 dark:text-gray-100">
                              <span
                                dir="ltr"
                                lang="en"
                                className="bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 text-sm inline-block"
                              >
                                {selectedStandardId === 'egypt' && egyptSubStandard === 'acud'
                                  ? (item.bld.isTypeCustomized ? item.bld.buildingType : `ACUD: ${getAcudActivity().name}`)
                                  : selectedStandardId === 'europe'
                                  ? (item.bld.iecBuildingType || iecCategory)
                                  : selectedStandardId === 'usa'
                                  ? (item.bld.necBuildingType || necCategory)
                                  : item.bld.buildingType}
                              </span>
                              {isC1orC2 && c1c2LookupResult && (
                                <span dir="ltr" lang="en" className="block text-2xs font-mono font-bold text-blue-700 dark:text-blue-300 mt-1.5">
                                  {saudiC1C2Voltage === '220V' ? '220 V Phase to Phase' : '400/230 V'} • CB: {formatEnglishInt(c1c2LookupResult.circuitBreakerRating)} A
                                </span>
                              )}
                              {isSaudiC3toC29 && (
                                <span dir="ltr" lang="en" className="block text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight mt-2">
                                  {SAUDI_LOAD_ESTIMATION_OPTIONS.find(
                                    (o) => o.value === (item.bld.saudiLoadEstimationType || 'standard')
                                  )?.label}
                                </span>
                              )}
                            </td>

                            {/* AREA / POWER */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-800 dark:text-gray-200">
                              <span dir="ltr">{formatEnglishInt(item.bld.totalArea)} m²</span>
                              {isC1orC2 && c1c2LookupResult ? (
                                <span dir="ltr" className="block text-2xs text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                                  CB: {formatEnglishInt(c1c2LookupResult.circuitBreakerRating)} A
                                </span>
                              ) : isSaudiC3toC29 ? (
                                <span dir="ltr" className="block text-2xs text-slate-500 dark:text-gray-400 font-sans font-medium">
                                  ({formatEnglishInt(item.bld.floorsCount)} {item.bld.floorsCount === 1 ? 'floor' : 'floors'}) • SEC Table 19
                                </span>
                              ) : (
                                <span dir="ltr" className="block text-2xs text-slate-400 dark:text-gray-400 font-sans font-medium">
                                  ({formatEnglishInt(item.bld.floorsCount)} {item.bld.floorsCount === 1 ? 'floor' : 'floors'})
                                </span>
                              )}
                            </td>

                            {/* LOAD DENSITY / FORMULA */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-xs text-slate-700 dark:text-gray-300">
                              {selectedStandardId === 'usa' ? (
                                <span className="font-mono font-bold text-slate-400 dark:text-gray-500">
                                  ---
                                </span>
                              ) : isC1orC2 && c1c2LookupResult ? (
                                <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-700 font-bold">
                                  <span dir="ltr">
                                    {c1c2LookupResult.exceedsTableLimit
                                      ? `SEC Fallback (${selectedSaudiCategoryCode === 'C1' ? 116 : 172} VA/m²)`
                                      : `SEC Table (${formatEnglishInt(c1c2LookupResult.matchedArea)} m²)`}
                                  </span>
                                </span>
                              ) : isSaudiC3toC29 ? (
                                <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-300 text-gray-900 px-2.5 py-1 rounded-lg border border-yellow-300 font-bold">
                                  <span dir="ltr" className="text-gray-900">
                                    Avg: {formatEnglishNumber(item.avgDensity * 10, 0, 1)}
                                  </span>
                                  <span className="text-2xs opacity-80 text-gray-900">VA/m²</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-300 text-gray-900 px-2.5 py-1 rounded-lg border border-yellow-300 font-bold">
                                  <span dir="ltr" className="text-gray-900">
                                    Avg: {selectedStandardId === 'saudi' ? formatEnglishNumber(item.avgDensity * 10, 1, 1) : formatEnglishNumber(item.avgDensity, 1, 1)}
                                  </span>
                                  <span className="text-2xs opacity-80 text-gray-900">
                                    {selectedStandardId === 'saudi' ? 'VA/m²' : selectedStandardId === 'europe' ? 'W/m²' : 'kVA/100m²'}
                                  </span>
                                </span>
                              )}
                            </td>

                            {/* TOTAL CONNECTED (kVA / kW) */}
                            <td className="py-2.5 px-3.5 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-black text-blue-900 dark:text-blue-200">
                              <span dir="ltr" className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded-md">
                                {formatEnglishNumber(item.connected, 1, selectedStandardId === 'europe' ? 2 : 1)} {selectedStandardId === 'europe' ? 'kW' : 'kVA'}
                              </span>
                            </td>

                            {/* DEMAND FACTOR (Editable or "-" for NEC) */}
                            <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l">
                              {selectedStandardId === 'usa' ? (
                                <span className="font-mono font-bold text-slate-400 dark:text-gray-500">
                                  -
                                </span>
                              ) : (
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
                              )}
                            </td>

                            {/* TOTAL DEMAND LOAD (kVA / kW) */}
                            <td className="py-2.5 px-3.5 text-right rtl:text-left font-mono font-black text-emerald-900 dark:text-emerald-200">
                              <span dir="ltr" className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md">
                                {formatEnglishNumber(item.demand, 1, selectedStandardId === 'europe' ? 2 : 1)} {selectedStandardId === 'europe' ? 'kW' : 'kVA'}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {includeAdditionalLoads && (
                          <>
                        {selectedStandardId !== 'europe' && (
                        <>
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
                                  {formatEnglishNumber(item.pump.power, 0, 2)} {item.pump.unit}
                                </span>
                              </td>

                              {/* LOAD DENSITY / FORMULA */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-gray-300">
                                <span dir="ltr" className="bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  {item.pump.unit === 'kVA'
                                    ? 'Direct (kVA)'
                                    : item.pump.unit === 'W'
                                    ? `(Watts ÷ 1000) ÷ ${formatEnglishNumber(item.pump.pf, 2, 2)}`
                                    : `(HP × 0.746) ÷ (${formatEnglishInt(item.pump.efficiency)}% × ${formatEnglishNumber(item.pump.pf, 2, 2)})`}
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
                        </>
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
                                {selectedStandardId === 'europe'
                                  ? `${iecExtraLoadsList.length} ${iecExtraLoadsList.length === 1 ? 'Item' : 'Items'}`
                                  : `${extraLoadsList.length} ${extraLoadsList.length === 1 ? 'Item' : 'Items'}`}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {selectedStandardId === 'europe' ? (
                          iecExtraLoadsList.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-3 px-3.5 text-center text-slate-400 dark:text-gray-500 text-xs italic">
                                {isAr ? 'لا توجد مساحات وظيفية أو معدات مدخلة.' : 'No functional areas or equipment registered.'}
                              </td>
                            </tr>
                          ) : (
                            iecExtraLoadsList.map((entry, idx) => (
                              <tr key={entry.item.id} className="hover:bg-purple-50/40 dark:hover:bg-gray-800/60 transition-colors">
                                {/* ITEM NAME */}
                                <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-extrabold text-slate-900 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-mono text-2xs font-bold flex items-center justify-center shrink-0">
                                      {idx + 1}
                                    </span>
                                    <span>{entry.item.name}</span>
                                  </div>
                                </td>

                                {/* CATEGORY / TYPE */}
                                <td className="py-2.5 px-3.5 border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l text-slate-700 dark:text-gray-300 font-semibold">
                                  <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800 text-xs inline-block">
                                    {entry.item.category}
                                  </span>
                                </td>

                                {/* AREA / POWER */}
                                <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-800 dark:text-gray-200">
                                  <span dir="ltr" className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                    {entry.isInstallation
                                      ? `${formatEnglishNumber(entry.directKw, 0, 2)} kW`
                                      : `${formatEnglishNumber(entry.areaNum, 0, 2)} m²`}
                                  </span>
                                </td>

                                {/* LOAD DENSITY / FORMULA */}
                                <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-gray-300">
                                  <span dir="ltr" className="bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                    {entry.isInstallation
                                      ? 'Direct (kW)'
                                      : `${formatEnglishNumber(entry.density, 0, 1)} W/m²`}
                                  </span>
                                </td>

                                {/* TOTAL CONNECTED (kW) */}
                                <td className="py-2.5 px-3.5 text-right rtl:text-left border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-black text-blue-900 dark:text-blue-200">
                                  <span dir="ltr" className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded-md">
                                    {formatEnglishNumber(entry.connected, 1, 2)} kW
                                  </span>
                                </td>

                                {/* SIMULTANEITY FACTOR (SF - Read-only) */}
                                <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono font-bold text-slate-700 dark:text-gray-200">
                                  <span dir="ltr" className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2.5 py-1 rounded-md text-xs">
                                    {formatEnglishNumber(entry.sf, 2, 2)}
                                  </span>
                                </td>

                                {/* TOTAL DEMAND LOAD (kW) */}
                                <td className="py-2.5 px-3.5 text-right rtl:text-left font-mono font-black text-emerald-900 dark:text-emerald-200">
                                  <span dir="ltr" className="bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md">
                                    {formatEnglishNumber(entry.demand, 1, 2)} kW
                                  </span>
                                </td>
                              </tr>
                            ))
                          )
                        ) : extraLoadsList.length === 0 ? (
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
                                  <span>{isAr && item.extra.nameAr ? item.extra.nameAr : item.extra.name}</span>
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
                                  {formatEnglishInt(item.extra.qty || 1)} × {formatEnglishNumber(item.extra.power, 0, 2)} {item.extra.unit}
                                </span>
                              </td>

                              {/* LOAD DENSITY / FORMULA */}
                              <td className="py-2.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-600 rtl:border-r-0 rtl:border-l font-mono text-2xs text-slate-600 dark:text-gray-300">
                                <span dir="ltr" className="bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 px-2 py-1 rounded-md">
                                  {item.extra.unit === 'W' ? '(W ÷ 1000) ÷ 0.85' : 'Direct (Qty × kVA)'}
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
                          </>
                        )}
                        {/* =================================================== */}
                        {/* BOLD TOTAL ROWS AT THE BOTTOM                       */}
                        {/* =================================================== */}
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
                            <span dir="ltr">
                              {formatEnglishInt(
                                isC1orC2
                                  ? buildingsLoadsList.reduce((s, b) => s + (Number(b.bld.totalArea) || 0), 0)
                                  : buildingsList.reduce((s, b) => s + (Number(b.totalArea) || 0), 0)
                              )} m²
                            </span>
                          </td>

                          {/* LOAD DENSITY / FORMULA */}
                          <td className="py-3 px-3.5 text-center border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono text-2xs text-blue-200">
                            Combined Aggregate
                          </td>

                          {/* TOTAL CONNECTED (kVA / kW) */}
                          <td className="py-3 px-3.5 text-right rtl:text-left border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono font-black text-sm sm:text-base text-yellow-300">
                            <span dir="ltr">{formatEnglishNumber(grandTotalConnected, 1, selectedStandardId === 'europe' ? 2 : 1)} {selectedStandardId === 'europe' ? 'kW' : 'kVA'}</span>
                          </td>

                          {/* DEMAND FACTOR: REMOVED calculated value as requested -> dash "-" */}
                          <td className="py-3 px-3.5 text-center border-r border-blue-800 dark:border-blue-900 rtl:border-r-0 rtl:border-l font-mono font-bold text-sm text-blue-200">
                            —
                          </td>

                          {/* TOTAL DEMAND LOAD (kVA / kW) */}
                          <td className="py-3 px-3.5 text-right rtl:text-left font-mono font-black text-sm sm:text-base text-emerald-300">
                            <span dir="ltr">{formatEnglishNumber(grandTotalDemand, 1, selectedStandardId === 'europe' ? 2 : 1)} {selectedStandardId === 'europe' ? 'kW' : 'kVA'}</span>
                          </td>
                        </tr>

                        {selectedStandardId === 'europe' ? (
                          <>
                            {/* ROW 2 (IEC ONLY): POWER FACTOR (PF) */}
                            <tr className="bg-slate-50/90 dark:bg-gray-800/80 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t-2 border-blue-600 dark:border-blue-500">
                              {/* Column 1: ITEM NAME */}
                              <td className="py-3.5 px-3.5 border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                                <div className="flex items-center gap-2">
                                  <span className="text-base">📐</span>
                                  <span className="font-black text-xs sm:text-sm">
                                    POWER FACTOR (PF)
                                  </span>
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
                              <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-blue-900/80 dark:text-blue-300/80 font-semibold">
                                kW → kVA Conversion Factor
                              </td>

                              {/* Column 5: TOTAL CONNECTED (kW) */}
                              <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                —
                              </td>

                              {/* Column 6: Editable Power Factor Input (Default 0.85) */}
                              <td className="py-3.5 px-3.5 text-center border-r border-slate-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                                <div className="flex items-center justify-center" dir="ltr">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    lang="en"
                                    style={{ direction: 'ltr', textAlign: 'center' }}
                                    value={toEnglishDigits(iecPowerFactor)}
                                    onChange={(e) => {
                                      let clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                      const parts = clean.split('.');
                                      if (parts.length > 2) {
                                        clean = parts[0] + '.' + parts.slice(1).join('');
                                      }
                                      setIecPowerFactor(clean);
                                    }}
                                    onBlur={() => {
                                      if (iecPowerFactor === '' || Number(iecPowerFactor) <= 0) {
                                        setIecPowerFactor(0.85);
                                      }
                                    }}
                                    onKeyDown={handleArabicDigitsKeyDown}
                                    onPaste={handleNumericPaste}
                                    className="w-22 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-blue-400 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                    title="Power Factor (PF)"
                                    placeholder="0.85"
                                  />
                                </div>
                              </td>

                              {/* Column 7: TOTAL DEMAND LOAD */}
                              <td className="py-3.5 px-3.5 text-center font-mono text-slate-400 dark:text-gray-500">
                                —
                              </td>
                            </tr>

                            {/* ROW 2.5 (IEC ONLY): TOTAL DEMAND LOAD (kVA) */}
                            <tr className="bg-[#EFF6FF] dark:bg-gray-800 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t border-blue-200 dark:border-blue-800">
                              {/* Column 1: ITEM NAME */}
                              <td className="py-3.5 px-3.5 border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                                <div className="flex items-center gap-2">
                                  <span className="text-base">⚡</span>
                                  <span className="font-black text-xs sm:text-sm">
                                    TOTAL DEMAND LOAD (kVA)
                                  </span>
                                </div>
                              </td>

                              {/* Column 2: CATEGORY / TYPE */}
                              <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                —
                              </td>

                              {/* Column 3: AREA / POWER */}
                              <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                —
                              </td>

                              {/* Column 4: LOAD DENSITY / FORMULA */}
                              <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-2xs text-blue-900/80 dark:text-blue-300/80 font-semibold">
                                Total Demand Load (kW) / PF
                              </td>

                              {/* Column 5: TOTAL CONNECTED (kW) */}
                              <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                                —
                              </td>

                              {/* Column 6: PF indicator */}
                              <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono font-bold text-xs text-blue-800 dark:text-blue-300">
                                <span dir="ltr">÷ {numericIecPowerFactor > 0 ? numericIecPowerFactor : '0'}</span>
                              </td>

                              {/* Column 7: Read-only Bold TOTAL DEMAND LOAD (kVA) */}
                              <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl text-[#1E3A8A] dark:text-blue-300 tracking-tight">
                                <span dir="ltr" className="inline-block bg-[#1E3A8A] dark:bg-blue-600 text-white border border-blue-900 dark:border-blue-700 px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg">
                                  {formatEnglishNumber(iecTotalDemandKva, 1, 2)} kVA
                                </span>
                              </td>
                            </tr>
                          </>
                        ) : (
                        /* ROW 2: TOTAL LOAD AFTER COINCIDENT / DIVERSITY FACTOR (Egyptian / Saudi / NEC) */
                        <tr className="bg-[#EFF6FF] dark:bg-gray-800 text-slate-900 dark:text-white font-black text-xs sm:text-sm border-t-2 border-blue-600 dark:border-blue-500">
                          {/* Column 1: ITEM NAME */}
                          <td className="py-3.5 px-3.5 border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                            <div className="flex items-center gap-2">
                              <span className="text-base">⚡</span>
                              <span className="font-black text-xs sm:text-sm">
                                {selectedStandardId === 'saudi'
                                  ? 'TOTAL LOAD AFTER COINCIDENT FACTOR (معامل التطابق)'
                                  : isAr
                                  ? 'إجمالي الحمل بعد معامل التباين (TOTAL LOAD AFTER DIVERSITY FACTOR)'
                                  : 'TOTAL LOAD AFTER DIVERSITY FACTOR'}
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
                            {selectedStandardId === 'saudi'
                              ? 'Total Demand × Coincident factor (CF)'
                              : 'Total Demand × Diversity Factor'}
                          </td>

                          {/* Column 5: TOTAL CONNECTED (kVA) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l font-mono text-slate-400 dark:text-gray-500">
                            —
                          </td>

                          {/* Column 6: DEMAND FACTOR (Number of Meters for Saudi / Diversity Factor for Others) */}
                          <td className="py-3.5 px-3.5 text-center border-r border-blue-200 dark:border-gray-700 rtl:border-r-0 rtl:border-l">
                            {selectedStandardId === 'saudi' ? (
                              <div className="flex flex-col items-center justify-center gap-1.5" dir="ltr">
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                  <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 whitespace-nowrap">
                                      Number of Meters (N)
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-gray-400 whitespace-nowrap">
                                      (Using 1 meter per building)
                                    </span>
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      dir="ltr"
                                      lang="en"
                                      style={{ direction: 'ltr', textAlign: 'center' }}
                                      value={toEnglishDigits(numberOfMeters)}
                                      onChange={(e) => {
                                        const clean = toEnglishDigits(e.target.value).replace(/[^0-9]/g, '');
                                        setNumberOfMeters(clean);
                                        if (clean !== '') {
                                          const nVal = Math.max(1, parseInt(clean, 10) || 1);
                                          setCoincidentFactor(getSaudiCoincidentFactor(nVal));
                                        }
                                      }}
                                      onBlur={() => {
                                        if (numberOfMeters === '' || Number(numberOfMeters) < 1) {
                                          setNumberOfMeters(1);
                                          setCoincidentFactor(1);
                                        }
                                      }}
                                      onKeyDown={handleArabicDigitsKeyDown}
                                      onPaste={handleNumericPaste}
                                      className="w-20 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-blue-400 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                      title="Number of Meters (N)"
                                      placeholder="1"
                                    />
                                  </div>
                                  <span
                                    dir="ltr"
                                    className="inline-flex items-center bg-blue-100 dark:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-200 border border-blue-300 dark:border-blue-700 font-mono font-black text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                                  >
                                    CF: {coincidentFactor === 1 ? '1' : coincidentFactor.toFixed(3)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center" dir="ltr">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  dir="ltr"
                                  lang="en"
                                  style={{ direction: 'ltr', textAlign: 'center' }}
                                  value={toEnglishDigits(selectedStandardId === 'usa' ? necDiversityFactor : projectDiversityFactor)}
                                  onChange={(e) => {
                                    const clean = toEnglishDigits(e.target.value).replace(/[^0-9.]/g, '');
                                    if (selectedStandardId === 'usa') {
                                      setNecDiversityFactor(clean);
                                    } else {
                                      setProjectDiversityFactor(clean);
                                    }
                                  }}
                                  onBlur={() => {
                                    if (selectedStandardId === 'usa' && necDiversityFactor === '') {
                                      setNecDiversityFactor(1.0);
                                    }
                                  }}
                                  onKeyDown={handleArabicDigitsKeyDown}
                                  onPaste={handleNumericPaste}
                                  className="w-22 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-blue-400 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-black text-xs sm:text-sm text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs"
                                  title="Project Diversity Factor (معامل التباين)"
                                  placeholder="1.00"
                                />
                              </div>
                            )}
                          </td>

                          {/* Column 7: TOTAL DEMAND LOAD (kVA) */}
                          <td className="py-3.5 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl text-[#1E3A8A] dark:text-blue-300 tracking-tight">
                            <span dir="ltr" className="inline-block bg-[#1E3A8A] dark:bg-blue-600 text-white border border-blue-900 dark:border-blue-700 px-3.5 py-1.5 rounded-xl shadow-xs font-black text-base sm:text-lg">
                              {formatEnglishNumber(finalDiversifiedDemand, 1, 1)} kVA
                            </span>
                          </td>
                        </tr>
                        )}

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
                            {selectedStandardId === 'europe'
                              ? 'Total Demand (kVA) × (1 + Spare %)'
                              : 'Total Demand × (1 + Spare %)'}
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
                              {formatEnglishNumber(finalLoadWithSpare, 1, selectedStandardId === 'europe' ? 2 : 1)} kVA
                            </span>
                          </td>
                        </tr>

                        {/* ROW 3.5 (Saudi C1 & C2 Only): DO YOU NEED A TRANSFORMER? */}
                        {isC1orC2 && (
                          <tr className="border-t border-slate-200 dark:border-gray-700 bg-slate-50/70 dark:bg-gray-900/60">
                            <td colSpan={7} className="p-0">
                              <div className="m-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-5 sm:px-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                                <span dir="ltr" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                  DO YOU NEED A TRANSFORMER? (هل تحتاج إلى محول؟)
                                </span>

                                <div className="flex items-center gap-3 shrink-0" dir="ltr">
                                  <button
                                    type="button"
                                    onClick={() => setNeedsTransformer(true)}
                                    className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                                      needsTransformer
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/25'
                                        : 'bg-white dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                                    }`}
                                  >
                                    Yes (نعم)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setNeedsTransformer(false)}
                                    className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                                      !needsTransformer
                                        ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/25'
                                        : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-200 border-slate-300 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-800'
                                    }`}
                                  >
                                    No (لا)
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                        {includeTransformer && (
                          <>
                            {/* ROW 4: TRANSFORMER LOADING RATIO & REQUIRED TRANSFORMER */}
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
                                      {selectedStandardId === 'saudi' ? 'Standard Saudi Code (SEC) Sizes' : 'Standard Schneider Sizes'}
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
                                      dir="ltr"
                                      lang="en"
                                      value={selectedTransformerSize}
                                      onChange={(e) => setSelectedTransformerSize(Number(e.target.value))}
                                      className="w-full bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-gray-600 focus:border-[#1E3A8A] font-mono font-bold text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-300 focus:outline-hidden shadow-2xs cursor-pointer"
                                      title="Selected Transformer Size (kVA)"
                                    >
                                      {availableTransformerSizes.map((size) => (
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
                                      value={toEnglishDigits(transformerQty)}
                                      onChange={(e) => setTransformerQty(toEnglishDigits(e.target.value).replace(/[^0-9]/g, ''))}
                                      onBlur={() => {
                                        if (transformerQty === '' || Number(transformerQty) < 1) {
                                          setTransformerQty(1);
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
                              <td className="py-3 px-3.5 text-right rtl:text-left font-mono font-black text-base sm:text-xl tracking-tight">
                                <div className="flex flex-col items-end gap-1" dir="ltr">
                                  <span className="text-2xs sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    LOADING RATIO (نسبة التحميل)
                                  </span>
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
                                </div>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

        {/* ============================================================== */}
        {/* 4th: "Calculation Result" card (previously right sidebar)        */}
        {/* ============================================================== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/90 dark:border-gray-700 shadow-2xs p-6 space-y-6">
          {/* Header Title */}
          <div className="border-b border-slate-200 dark:border-gray-700 pb-3.5">
            <h3 className="text-xl font-extrabold text-[#1E3A8A] dark:text-white tracking-tight uppercase">
              CALCULATION SUMMARY
            </h3>
          </div>

          {selectedStandardId === 'europe' ? (
            /* 6 UNIFORM KPI CARDS FOR IEC ONLY */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-stretch">
              {/* CARD 1: TOTAL CONNECTED (kW) */}
              <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">
                  TOTAL CONNECTED (kW)
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                    {formatEnglishNumber(grandTotalConnected, 1, 2)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300">
                    kW
                  </span>
                </div>
              </div>

              {/* CARD 2: SIMULTANEITY FACTOR (SF) */}
              <div className="p-5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 block uppercase tracking-wider">
                  SIMULTANEITY FACTOR (SF)
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-purple-900 dark:text-purple-200 font-mono tabular-nums">
                    {formatEnglishNumber(iecEffectiveSf, 3, 3)}
                  </span>
                </div>
              </div>

              {/* CARD 3: TOTAL DEMAND LOAD (kW) */}
              <div className="p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-300 block uppercase tracking-wider">
                  TOTAL DEMAND LOAD (kW)
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-[#1E3A8A] dark:text-blue-200 font-mono tabular-nums">
                    {formatEnglishNumber(grandTotalDemand, 1, 2)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300">
                    kW
                  </span>
                </div>
              </div>

              {/* CARD 4: TOTAL DEMAND LOAD (kVA) */}
              <div className="p-5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 block uppercase tracking-wider">
                  TOTAL DEMAND LOAD (kVA)
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono tabular-nums">
                    {formatEnglishNumber(iecTotalDemandKva, 1, 2)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300">
                    kVA
                  </span>
                </div>
              </div>

              {/* CARD 5: NO. OF TRANSFORMERS */}
              <div className="p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider">
                  NO. OF TRANSFORMERS
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono tabular-nums">
                    {toEnglishDigits(numericQuantity)} x {toEnglishDigits(selectedTransformerSize)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300">kVA</span>
                </div>
              </div>

              {/* CARD 6: TRANSFORMER LOADING RATIO (%) */}
              <div className="p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block uppercase tracking-wider">
                  TRANSFORMER LOADING RATIO (%)
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                  <span className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 font-mono tabular-nums">
                    {formatEnglishNumber(actualLoadingRatio, 1, 1)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
          /* 5 UNIFORM KPI CARDS IN A RESPONSIVE GRID (Adjusts to 3 when needsTransformer is false) */
          <div className={`grid grid-cols-1 ${includeTransformer ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-3'} gap-3.5 items-stretch`}>
            {/* BOX 1: TOTAL CONNECTED LOAD */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between gap-3 h-full">
              <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">
                TOTAL CONNECTED LOAD
              </span>
              <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                  {formatEnglishNumber(grandTotalConnected, 1, 1)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300">
                  kVA
                </span>
              </div>
            </div>

            {/* BOX 2: TOTAL DEMAND LOAD */}
            <div className="p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
              <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-300 block uppercase tracking-wider">
                TOTAL DEMAND LOAD
              </span>
              <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                <span className="text-xl sm:text-2xl font-black text-[#1E3A8A] dark:text-blue-200 font-mono tabular-nums">
                  {formatEnglishNumber(grandTotalDemand, 1, 1)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300">
                  kVA
                </span>
              </div>
            </div>

            {/* BOX 3: LOAD AFTER DIVERSITY */}
            <div className="p-5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 block uppercase tracking-wider">
                {selectedStandardId === 'saudi' ? 'LOAD AFTER COINCIDENT (kVA)' : 'LOAD AFTER DIVERSITY (kVA)'}
              </span>
              <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                <span className="text-xl sm:text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono tabular-nums">
                  {formatEnglishNumber(finalDiversifiedDemand, 1, 1)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300">
                  kVA
                </span>
              </div>
            </div>

            {includeTransformer && (
              <>
                {/* BOX 4: NO. OF TRANSFORMERS */}
                <div className="p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider">
                    NO. OF TRANSFORMERS
                  </span>
                  <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                    <span className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono tabular-nums">
                      {toEnglishDigits(numericQuantity)} x {toEnglishDigits(selectedTransformerSize)}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300">kVA</span>
                  </div>
                </div>

                {/* BOX 5: TRANSFORMER LOADING RATIO */}
                <div className="p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                  <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block uppercase tracking-wider">
                    TRANSFORMER LOADING RATIO (نسبة تحميل المحول)
                  </span>
                  <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                    <span className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 font-mono tabular-nums">
                      {formatEnglishNumber(actualLoadingRatio, 1, 1)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          )}

          {/* Action Button: Prominent & Centered Export to Excel */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleExportToExcel}
              className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className="text-base">📥</span>
              <span>{isAr ? 'تصدير النتائج إلى Excel' : 'Export to Excel'}</span>
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
            className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
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
                    Category: <span className="font-bold text-slate-700 dark:text-gray-200">{activeCategory}</span> · Built-Up Area: <span dir="ltr" className="font-bold text-slate-700 dark:text-gray-200">{formatEnglishInt(areaSquareMeters)} m²</span>
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
                        <FlagIcon country={code.id} className="w-6 h-4 rounded-2xs border border-slate-200 dark:border-gray-700 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {code.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Stacked CALCULATION SUMMARY Blocks: Displaying one block per checked standard */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                    {isAr ? 'ملخصات الحسابات لكل كود مختار' : 'Code Calculation Summaries'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                    Synced with Calculation Summary
                  </span>
                </div>

                {displayedCompareCodes.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 dark:bg-gray-900/60 rounded-xl border border-dashed border-slate-300 dark:border-gray-700 text-slate-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                    {isAr
                      ? 'يرجى تحديد كود واحد على الأقل أعلاه لعرض ملخص الحسابات.'
                      : 'Please select at least one code above to display its calculation summary.'}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {STANDARDS_DATA.filter((std) => displayedCompareCodes.includes(std.id)).map((std) => {
                      const row = getCompareSummaryRow(std.id as StandardId);
                      const isCurrent = std.id === selectedStandardId;
                      const blockTitle =
                        std.id === 'egypt'
                          ? 'EGYPTIAN CODE SUMMARY'
                          : std.id === 'saudi'
                          ? 'SAUDI CODE SUMMARY'
                          : std.id === 'europe'
                          ? 'EUROPEAN (IEC) CODE SUMMARY'
                          : 'AMERICAN (NEC) CODE SUMMARY';

                      return (
                        <div
                          key={std.id}
                          className={`rounded-2xl p-5 sm:p-6 border space-y-4 transition-colors shadow-2xs ${
                            isCurrent
                              ? 'bg-blue-50/40 dark:bg-blue-950/25 border-blue-300 dark:border-blue-700'
                              : 'bg-[#F8FAFC] dark:bg-gray-900/60 border-slate-200 dark:border-gray-700'
                          }`}
                        >
                          {/* Block Header: Large Flag, Standard Name, Dynamic Subtitle & Block Title */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-gray-700 pb-3.5">
                            <div className="flex items-center gap-3.5">
                              <FlagIcon
                                country={std.id}
                                className="w-12 h-8 rounded-sm border border-slate-300 dark:border-gray-600 shadow-xs shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {isAr ? std.codeNameAr : std.codeName}
                                  </h4>
                                  {isCurrent && (
                                    <span className="text-[11px] bg-[#1E3A8A] text-white px-2.5 py-0.5 rounded-full font-bold">
                                      {isAr ? 'الكود النشط' : 'Active'}
                                    </span>
                                  )}
                                  {std.id === 'egypt' && (
                                    <div
                                      className="inline-flex items-center bg-slate-100 dark:bg-gray-900 p-0.5 rounded-lg border border-slate-300 dark:border-gray-600 shadow-2xs"
                                      role="group"
                                      aria-label="Egyptian Code Methodology"
                                    >
                                      {(
                                        [
                                          { id: 'ecp203', label: 'ECP 203' },
                                          { id: 'acud', label: 'ACUD' },
                                        ] as const
                                      ).map((opt) => (
                                        <button
                                          key={opt.id}
                                          type="button"
                                          onClick={() => setEgyptMethodologyInModal(opt.id)}
                                          className={`px-2.5 py-1 text-2xs font-extrabold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                                            egyptMethodologyInModal === opt.id
                                              ? 'bg-[#1E3A8A] text-white shadow-2xs'
                                              : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                                          }`}
                                        >
                                          {opt.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-gray-400 font-mono block mt-0.5">
                                  {std.id === 'egypt'
                                    ? egyptMethodologyInModal === 'acud'
                                      ? 'ACUD Standards'
                                      : 'ECP 203'
                                    : std.standardReference.split('/')[0]}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1E3A8A] dark:text-blue-300">
                              {blockTitle}
                            </span>
                          </div>

                          {/* Summary Cards Row */}
                          {std.id === 'europe' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-stretch">
                              {/* 1. TOTAL CONNECTED (kW) */}
                              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">
                                  TOTAL CONNECTED (kW)
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                                    {formatEnglishNumber(row.connectedLoad, 1, 2)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300">
                                    kW
                                  </span>
                                </div>
                              </div>

                              {/* 2. SIMULTANEITY FACTOR (SF) */}
                              <div className="p-4 sm:p-5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 block uppercase tracking-wider">
                                  SIMULTANEITY FACTOR (SF)
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-purple-900 dark:text-purple-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.simultaneityFactor, 3, 3)}
                                  </span>
                                </div>
                              </div>

                              {/* 3. TOTAL DEMAND LOAD (kW) */}
                              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-300 block uppercase tracking-wider">
                                  TOTAL DEMAND LOAD (kW)
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-[#1E3A8A] dark:text-blue-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.demandKw, 1, 2)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300">
                                    kW
                                  </span>
                                </div>
                              </div>

                              {/* 4. TOTAL DEMAND LOAD (kVA) */}
                              <div className="p-4 sm:p-5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 block uppercase tracking-wider">
                                  TOTAL DEMAND LOAD (kVA)
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.demandKva, 1, 2)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 5. NO. OF TRANSFORMERS */}
                              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider">
                                  NO. OF TRANSFORMERS
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono tabular-nums">
                                    {toEnglishDigits(row.transformerQty)} x {toEnglishDigits(row.transformerSize)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 6. TRANSFORMER LOADING RATIO */}
                              <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block uppercase tracking-wider">
                                  TRANSFORMER LOADING RATIO
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.loadingRatio, 1, 1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch">
                              {/* 1. TOTAL CONNECTED LOAD */}
                              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 block uppercase tracking-wider">
                                  TOTAL CONNECTED LOAD
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                                    {formatEnglishNumber(row.connectedLoad, 1, 1)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 2. TOTAL DEMAND LOAD */}
                              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-[#1E3A8A] dark:text-blue-300 block uppercase tracking-wider">
                                  TOTAL DEMAND LOAD
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-[#1E3A8A] dark:text-blue-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.rawDemandKva, 1, 1)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 3. LOAD AFTER COINCIDENT / DIVERSITY (kVA) */}
                              <div className="p-4 sm:p-5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 block uppercase tracking-wider">
                                  {std.id === 'saudi' ? 'LOAD AFTER COINCIDENT (kVA)' : 'LOAD AFTER DIVERSITY (kVA)'}
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.demandKva, 1, 1)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 4. NO. OF TRANSFORMERS */}
                              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider">
                                  NO. OF TRANSFORMERS
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono tabular-nums">
                                    {toEnglishDigits(row.transformerQty)} x {toEnglishDigits(row.transformerSize)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300">
                                    kVA
                                  </span>
                                </div>
                              </div>

                              {/* 5. TRANSFORMER LOADING RATIO */}
                              <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs flex flex-col justify-between gap-3 h-full">
                                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block uppercase tracking-wider">
                                  TRANSFORMER LOADING RATIO
                                </span>
                                <div className="flex items-baseline gap-1.5 flex-wrap" dir="ltr">
                                  <span className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 font-mono tabular-nums">
                                    {formatEnglishNumber(row.loadingRatio, 1, 1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
