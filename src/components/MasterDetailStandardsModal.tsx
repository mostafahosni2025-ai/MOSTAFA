import React, { useState, useEffect } from 'react';
import { X, Globe, Table as TableIcon } from 'lucide-react';
import { FlagIcon } from './Flags';
import { Language, TRANSLATIONS, ACUD_ACTIVITIES_TRANSLATIONS } from '../data/translations';
import { STANDARDS_DATA, StandardMethodology } from '../data/standardsData';
import {
  SAUDI_TABLE_19,
  SAUDI_TABLE_20,
  SAUDI_TABLE_21,
  SAUDI_TABLE_22,
} from '../data/saudiCodeData';
import {
  SAUDI_C1_220V_TABLE,
  SAUDI_C1_400V_TABLE,
  SAUDI_C2_220V_TABLE,
  SAUDI_C2_400V_TABLE,
} from '../data/c1c2TablesData';
import {
  IEC_FIG_2_4_BUILDING_USE,
  IEC_TABLE_30_2_FUNCTIONAL_AREAS,
  IEC_INSTALLATIONS_PART_A,
  IEC_INSTALLATIONS_PART_B,
  IEC_LIGHTING_PART_A,
  IEC_POWER_PART_B,
  IEC_KS_FIG_B10,
  IEC_KS_FIG_B12,
  IEC_KS_FIG_B13,
  IEC_SPS_RPS_TABLE,
} from '../data/iecCodeData';
import {
  NEC_LIGHTING_LOADS,
  NEC_TIERED_DF,
  NEC_DWELLING_DF,
  NEC_COMMERCIAL_DF,
  NEC_SPECIAL_OCCUPANCIES,
  NEC_FARM_LOADS,
} from '../data/necCodeData';

interface MasterDetailStandardsModalProps {
  standard: StandardMethodology | null;
  onClose: () => void;
  onProceedToCalculation: () => void;
  lang: Language;
  onToggleLang?: () => void;
  onSelectStandard?: (std: StandardMethodology) => void;
}

interface SidebarItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const MasterDetailStandardsModal: React.FC<MasterDetailStandardsModalProps> = ({
  standard,
  onClose,
  onProceedToCalculation,
  lang,
  onToggleLang,
  onSelectStandard,
}) => {
  const [activeCodeId, setActiveCodeId] = useState<'egypt' | 'saudi' | 'europe' | 'usa'>('egypt');
  const [activeItem, setActiveItem] = useState<string>('item1');
  const [c1Voltage, setC1Voltage] = useState<'both' | '230' | '400'>('both');
  const [c2Voltage, setC2Voltage] = useState<'both' | '230' | '400'>('both');

  useEffect(() => {
    if (standard) {
      setActiveCodeId(standard.id);
      setActiveItem('item1');
    }
  }, [standard]);

  if (!standard) return null;

  const currentStandard = STANDARDS_DATA.find((s) => s.id === activeCodeId) || standard;
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Specific 2-Line Sidebar Items for each of the 4 Codes
  const getSidebarItems = (): SidebarItem[] => {
    switch (activeCodeId) {
      case 'egypt':
        return [
          {
            id: 'item1',
            titleEn: 'Standard ECP 203',
            titleAr: 'الكود المصري ECP 203',
            descEn: 'Design Capacity Tables',
            descAr: 'جداول القدرة التصميمية',
          },
          {
            id: 'item2',
            titleEn: 'ACUD Guidelines',
            titleAr: 'اشتراطات العاصمة الإدارية',
            descEn: 'New Capital Load Estimates',
            descAr: 'تقديرات أحمال العاصمة',
          },
        ];

      case 'saudi':
        return [
          {
            id: 'item1',
            titleEn: 'Table 19',
            titleAr: 'جدول 19',
            descEn: 'Load Estimation',
            descAr: 'منهجية تقدير الأحمال',
          },
          {
            id: 'item2',
            titleEn: 'Table 20',
            titleAr: 'جدول 20',
            descEn: 'Demand Factors',
            descAr: 'معاملات الطلب (DF)',
          },
          {
            id: 'item3',
            titleEn: 'Table 21',
            titleAr: 'جدول 21',
            descEn: 'Coincident Factors',
            descAr: 'معاملات التزامن (CF)',
          },
          {
            id: 'item4',
            titleEn: 'Table 22',
            titleAr: 'جدول 22',
            descEn: 'Special Cases',
            descAr: 'الحالات والمنشآت الخاصة',
          },
          {
            id: 'item5',
            titleEn: 'Table C1',
            titleAr: 'جدول C1',
            descEn: 'Residential Buildings',
            descAr: 'المباني السكنية',
          },
          {
            id: 'item6',
            titleEn: 'Table C2',
            titleAr: 'جدول C2',
            descEn: 'Commercial Buildings',
            descAr: 'المباني التجارية',
          },
        ];

      case 'europe':
        return [
          {
            id: 'item1',
            titleEn: 'Fig. 2-4',
            titleAr: 'شكل 2-4',
            descEn: 'Building Use (W/m²)',
            descAr: 'استخدام المبنى (وات/م²)',
          },
          {
            id: 'item2',
            titleEn: 'Table 30/2',
            titleAr: 'جدول 30/2',
            descEn: 'Functional Areas',
            descAr: 'المناطق الوظيفية',
          },
          {
            id: 'item3',
            titleEn: 'Installations',
            titleAr: 'التجهيزات الخاصة',
            descEn: 'Special Loads (HVAC/Elevator)',
            descAr: 'التكييف والمصاعد والمضخات',
          },
          {
            id: 'item4',
            titleEn: 'Lighting & Power',
            titleAr: 'الإنارة والمقابس',
            descEn: 'VA/m² & Lux',
            descAr: 'كثافة الإنارة ومستويات الإضاءة',
          },
          {
            id: 'item5',
            titleEn: 'IEC Ks',
            titleAr: 'معاملات Ks',
            descEn: 'Simultaneity Factors',
            descAr: 'معاملات التزامن للمستهلكين',
          },
          {
            id: 'item6',
            titleEn: 'SPS & RPS',
            titleAr: 'SPS و RPS',
            descEn: 'Safety Power Supply',
            descAr: 'تغذية الطوارئ والسلامة',
          },
        ];

      case 'usa':
        return [
          {
            id: 'item1',
            titleEn: 'Lighting Loads',
            titleAr: 'أحمال الإنارة',
            descEn: 'General Occupancy VA/m²',
            descAr: 'كثافة الإشغال العام (ف.أ/م²)',
          },
          {
            id: 'item2',
            titleEn: 'Tiered DF',
            titleAr: 'معاملات الطلب المتدرجة',
            descEn: 'Lighting & Receptacles',
            descAr: 'الإنارة العامة ومخارج المقابس',
          },
          {
            id: 'item3',
            titleEn: 'Dwelling DF',
            titleAr: 'معاملات الأحمال السكنية',
            descEn: 'Dryers & Cooking Appliances',
            descAr: 'المجففات وأجهزة الطهي',
          },
          {
            id: 'item4',
            titleEn: 'Commercial DF',
            titleAr: 'معاملات الأحمال التجارية',
            descEn: 'Kitchen & Elevators',
            descAr: 'المطابخ التجارية والمصاعد',
          },
          {
            id: 'item5',
            titleEn: 'Special Occupancies',
            titleAr: 'الإشغالات الخاصة',
            descEn: 'Mobile Homes & EV Charging',
            descAr: 'المنازل المتنقلة وشواحن السيارات',
          },
          {
            id: 'item6',
            titleEn: 'Farm Loads',
            titleAr: 'الأحمال الزراعية',
            descEn: 'Agricultural Demand Factors',
            descAr: 'معاملات طلب المنشآت الزراعية',
          },
        ];
    }
  };

  const sidebarItems = getSidebarItems();

  const handleSelectCode = (codeId: 'egypt' | 'saudi' | 'europe' | 'usa') => {
    setActiveCodeId(codeId);
    setActiveItem('item1');
    const newStd = STANDARDS_DATA.find((s) => s.id === codeId);
    if (newStd && onSelectStandard) {
      onSelectStandard(newStd);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Modal Dialog Window: Windows 11 Desktop Style */}
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-[92vw] max-w-6xl h-[88vh] max-h-[88vh] flex flex-col overflow-hidden text-[#111827] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. HEADER (Top Bar) */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <FlagIcon country={activeCodeId} className="w-14 h-9.5 rounded-sm shadow-xs border border-slate-300" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {activeCodeId === 'egypt' && (isAr ? 'ملف منهجية الكود المصري (ECP 203)' : 'EGYPT METHODOLOGY DOSSIER')}
                {activeCodeId === 'saudi' && (isAr ? 'ملف منهجية الكود السعودي (SEC / SBC 401)' : 'KSA METHODOLOGY DOSSIER')}
                {activeCodeId === 'europe' && (isAr ? 'ملف منهجية الكود الأوروبي (IEC 60364)' : 'IEC METHODOLOGY DOSSIER')}
                {activeCodeId === 'usa' && (isAr ? 'ملف منهجية الكود الأمريكي (NFPA 70 / NEC)' : 'NEC METHODOLOGY DOSSIER')}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] tracking-tight leading-tight">
                {activeCodeId === 'egypt' && (isAr ? 'تفاصيل الكود المصري' : 'Egyptian Code Details')}
                {activeCodeId === 'saudi' && (isAr ? 'تفاصيل الكود السعودي' : 'Saudi Code Details')}
                {activeCodeId === 'europe' && (isAr ? 'تفاصيل الكود الأوروبي الدولي' : 'European (IEC) Code Details')}
                {activeCodeId === 'usa' && (isAr ? 'تفاصيل الكود الأمريكي الوطني' : 'American (NEC) Code Details')}
              </h2>
            </div>
          </div>

          {/* Center Code Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {STANDARDS_DATA.map((std) => {
              const isSelected = activeCodeId === std.id;
              return (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => handleSelectCode(std.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <FlagIcon country={std.id} className="w-4 h-3 rounded-2xs inline-block" />
                  <span>{isAr ? std.countryAr : std.country}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Language toggle (EN | AR) + Close button (X) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-full border border-slate-300 shadow-2xs transition-colors cursor-pointer"
              title={isAr ? 'Switch to English' : 'تبديل إلى اللغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>EN | AR</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. TOP INFO BAR (Static - 4 columns) */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'المواصفة القياسية' : 'STANDARD CODE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                {currentStandard.standardReference}
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'تردد الشبكة' : 'GRID FREQUENCY'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block">
                {currentStandard.frequency}
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهد الاسمي' : 'NOMINAL VOLTAGE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                {currentStandard.nominalVoltage}
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهة المنظمة' : 'GOVERNING BODY'}
              </span>
              <span className="font-extrabold text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                {activeCodeId === 'egypt' && (isAr ? 'الشركة القابضة لكهرباء مصر (EEHC)' : 'EEHC (Egypt)')}
                {activeCodeId === 'saudi' && (isAr ? 'الشركة السعودية للكهرباء (SEC)' : 'Saudi Electricity Co. (SEC)')}
                {activeCodeId === 'europe' && (isAr ? 'اللجنة الكهروتقنية الدولية (IEC)' : 'IEC (Europe)')}
                {activeCodeId === 'usa' && (isAr ? 'المنظمة الوطنية للحماية من الحرائق (NFPA)' : 'NFPA / NEC (USA)')}
              </span>
            </div>
          </div>
        </div>

        {/* 3. MASTER-DETAIL BODY (Left Sidebar: 250px | Right Content Area: Real Tables with STICKY HEADERS) */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-[#F4F6F8]">
          {/* LEFT SIDEBAR NAVIGATION (Width: 250px) */}
          <aside className="w-[250px] shrink-0 border-r border-slate-200 bg-white p-3.5 space-y-2 overflow-y-auto table-scrollbar flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="px-2 py-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                {isAr ? 'أقسام المنهجية والجداول' : 'METHODOLOGY SECTIONS'}
              </div>

              {sidebarItems.map((item) => {
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex flex-col justify-center border ${
                      isActive
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md ring-1 ring-blue-700/60'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-200' : 'text-slate-500'}`} />
                      <span className={`text-xs sm:text-sm font-extrabold tracking-tight leading-none ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {isAr ? item.titleAr : item.titleEn}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider leading-none mt-1.5 block ${
                        isActive ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {isAr ? item.descAr : item.descEn}
                    </span>
                  </button>
                );
              })}

              {/* OFFICIAL REFERENCES (Egyptian Code) */}
              {activeCodeId === 'egypt' && (
                <div className="pt-4 mt-3 border-t border-slate-200/90 text-left rtl:text-right">
                  <div className="px-1 mb-2.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <span className="text-xs">🔗</span>
                    <span>{isAr ? 'المراجع الرسمية' : 'OFFICIAL REFERENCES'}</span>
                  </div>
                  <div className="space-y-2.5 px-1">
                    <a
                      href="https://www.scribd.com/document/651983175/%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D8%B7%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D8%B5%D9%85%D8%A9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-bold text-[#1E3A8A] hover:underline flex items-start gap-1.5 leading-snug group cursor-pointer"
                    >
                      <span className="shrink-0 text-xs mt-0.5">🔗</span>
                      <span className="group-hover:text-blue-900 transition-colors">
                        ACUD - New Administrative Capital Guidelines
                      </span>
                    </a>

                    <a
                      href="/assets/aistudio/________________________________4cea8f35.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-bold text-[#1E3A8A] hover:underline flex items-start gap-1.5 leading-snug group cursor-pointer"
                    >
                      <span className="shrink-0 text-xs mt-0.5">🔗</span>
                      <span className="group-hover:text-blue-900 transition-colors">
                        ECP 203 - Egyptian Code for Electrical Installations
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Country Code Badge at bottom of sidebar */}
            <div className="pt-3 border-t border-slate-100 mt-auto">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <FlagIcon country={activeCodeId} className="w-8 h-5.5 rounded-2xs shadow-2xs" />
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  <span>{isAr ? currentStandard.codeNameAr : currentStandard.codeName}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA (Displays Real Tables with STICKY HEADERS) */}
          <main className="flex-1 min-h-0 bg-[#F4F6F8] p-5 flex flex-col overflow-hidden">
            {/* ============================================================== */}
            {/* 1. EGYPTIAN CODE TABLES                                        */}
            {/* ============================================================== */}
            {activeCodeId === 'egypt' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                {activeItem === 'item1' ? (
                  // Item 1: Standard ECP 203 - Design Capacity Tables
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'الكود المصري ECP 203: جدول القدرة التصميمية لشركات التوزيع' : 'Standard ECP 203: Design Capacity Table'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'القدرة التصميمية (ك.ف.أ / 100 م²)' : 'DESIGN CAPACITY (kVA / 100 m²)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        ECP 203 Table 1
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar p-0">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'البيان والنطاق الجغرافي (Category)' : 'Category / Jurisdiction'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'سكني (Residential) - ك.ف.أ/100م²' : 'Residential (kVA / 100 m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              {isAr ? 'تجاري / إداري (Commercial) - ك.ف.أ/100م²' : 'Commercial / Admin (kVA / 100 m²)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          <tr className="bg-white hover:bg-blue-50/40">
                            <td className="py-3 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? 'القرى - جميع شركات التوزيع' : 'Villages - All Distribution Companies'}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              2
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                              5
                            </td>
                          </tr>
                          <tr className="bg-[#F8FAFC] hover:bg-blue-50/40">
                            <td className="py-3 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? 'المدن - الأحياء الشعبية والمتوسطة' : 'Cities - Low & Middle Income Districts'}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              4
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                              10
                            </td>
                          </tr>
                          <tr className="bg-white hover:bg-blue-50/40">
                            <td className="py-3 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? 'المدن - المناطق والأحياء الراقية' : 'Cities - Upscale & Affluent Districts'}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              8
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                              10
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Official Regulatory Sizing Directives Cards */}
                      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          {isAr ? 'الأحمال الإضافية الإلزامية طبقاً للائحة:' : 'Mandatory Minimum Sizing Directives:'}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                            <span className="font-bold text-slate-700 block">{isAr ? 'المصعد الواحد:' : 'Single Elevator:'}</span>
                            <span className="font-mono font-black text-blue-900 text-sm">9 kVA</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                            <span className="font-bold text-slate-700 block">{isAr ? 'طلمبة المياه الواحدة:' : 'Single Water Pump:'}</span>
                            <span className="font-mono font-black text-blue-900 text-sm">5 kVA</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                            <span className="font-bold text-slate-700 block">{isAr ? 'جراج السيارات المستقل:' : 'Dedicated Garage:'}</span>
                            <span className="font-mono font-black text-blue-900 text-sm">3 kVA / 100 m²</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Item 2: ACUD Guidelines - New Administrative Capital Load Estimates
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'اشتراطات العاصمة الإدارية (ACUD 2.2): معاملات تقدير الأحمال للمشروعات' : 'ACUD 2.2 Guidelines: Load Estimate Factors'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'كثافة الحمل (ك.ف.أ / 100 م²)' : 'LOAD DENSITY (kVA / 100 m²)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        ACUD Sec 2.2
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نشاط المشروع (Project Activity)' : 'Project Activity'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-right rtl:text-left border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              kVA / 100 m² (*)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {Object.entries(ACUD_ACTIVITIES_TRANSLATIONS).map(([key, item], idx) => (
                            <tr
                              key={key}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                            >
                              <td className="py-2.5 px-4 font-semibold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? item.ar : item.en}
                              </td>
                              <td className="py-2.5 px-4 text-right rtl:text-left font-mono font-black text-slate-900 border-b border-slate-100">
                                {item.factor}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. SAUDI CODE TABLES                                           */}
            {/* ============================================================== */}
            {activeCodeId === 'saudi' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                {activeItem === 'item1' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 19: تقدير الأحمال للمنشآت المعتمدة على المساحة' : 'Table 19: Load Estimation for Area-based Facilities'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'منهجية تقدير الأحمال (ف.أ/م²)' : 'LOAD ESTIMATION METHODOLOGY (VA/m²)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        SEC DPS Table 19
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'الرمز' : 'Code'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'فئة المنشأة / العميل' : 'Customer Category'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'مع التكييف (ف.أ/م²)' : 'Area-based (VA/m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'بدون تكييف (ف.أ/م²)' : 'Without AC (VA/m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'مناطق الذروة الشتوية' : 'Winter Peak (VA/m²)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {SAUDI_TABLE_19.map((row, idx) => (
                            <tr key={row.code} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.code}
                              </td>
                              <td className="py-2.5 px-4 font-semibold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.categoryAr : row.category}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.areaBasedVA}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.withoutAcVA}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 border-b border-slate-100">
                                {row.winterPeakVA}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item2' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 20: معاملات الطلب لجميع فئات المنشآت' : 'Table 20: Demand Factors for All Facility Types'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معامل الطلب (DF)' : 'DEMAND FACTORS (DF)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        SEC Table 20
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'الرمز' : 'Code'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'فئة المنشأة / العميل' : 'Customer Category'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#006C35]">
                              {isAr ? 'معامل الطلب (DF)' : 'Continuous Demand Factor (DF)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {SAUDI_TABLE_20.map((row, idx) => (
                            <tr key={row.code} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.code}
                              </td>
                              <td className="py-2.5 px-4 font-semibold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.categoryAr : row.category}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#006C35] border-b border-slate-100">
                                {row.df}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item3' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 21: معاملات التزامن بعدد العدادات (N = 1 إلى 100)' : 'Table 21: Coincident Factors by Meters (N = 1 to 100)'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معامل التزامن (CF)' : 'COINCIDENT FACTORS (CF)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        SEC Table 21
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'عدد العدادات (N)' : 'Number of Meters (N)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#006C35]">
                              {isAr ? 'معامل التزامن (CF)' : 'Coincident Factor (CF)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm font-medium">
                          {SAUDI_TABLE_21.map((row, idx) => (
                            <tr key={row.n} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-2.5 px-4 text-center font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.n}
                              </td>
                              <td className="py-2.5 px-4 text-center font-extrabold text-[#006C35] border-b border-slate-100">
                                {row.cf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item4' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 22: اشتراطات تقدير الأحمال للحالات الخاصة' : 'Table 22: Considerations for Special Cases'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الحالات الخاصة والاستثناءات' : 'SPECIAL CASES CONSIDERATIONS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        SEC Table 22
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900 w-1/3">
                              {isAr ? 'المنشأة / الحالة الخاصة' : 'Special Facility Case'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'التعريف والاشتراطات' : 'Definition & Sizing Directives'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#006C35]">
                              DF
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              CF
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {SAUDI_TABLE_22.map((row, idx) => (
                            <tr key={row.id} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-3 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.specialCaseAr : row.specialCase}
                              </td>
                              <td className="py-3 px-4 text-slate-700 leading-relaxed border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.definitionAr : row.definition}
                              </td>
                              <td className="py-3 px-3.5 text-center font-mono font-extrabold text-[#006C35] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.demandFactor}
                              </td>
                              <td className="py-3 px-3.5 text-center font-mono font-bold text-[#1E3A8A] border-b border-slate-100">
                                {row.coincidenceFactor}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item5' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول C1: المباني السكنية (جهد 230 فولت و 400 فولت)' : 'Table C1: Residential Buildings (230V & 400V)'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الأحمال المتصلة وسعات القواطع (CBR)' : 'CONNECTED LOAD & CIRCUIT BREAKER RATINGS'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setC1Voltage('both')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c1Voltage === 'both' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          {isAr ? 'كلا الجهدين' : 'Both (230 & 400V)'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setC1Voltage('230')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c1Voltage === '230' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          230 V
                        </button>
                        <button
                          type="button"
                          onClick={() => setC1Voltage('400')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c1Voltage === '400' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          400 V
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نطاق المساحة (م²)' : 'Area Range (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Connected Load (kVA)'}
                            </th>
                            {(c1Voltage === 'both' || c1Voltage === '230') && (
                              <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                                {isAr ? 'القاطع @ 230 فولت (أمبير)' : 'CBR @ 230V (A)'}
                              </th>
                            )}
                            {(c1Voltage === 'both' || c1Voltage === '400') && (
                              <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-blue-800">
                                {isAr ? 'القاطع @ 400 فولت (أمبير)' : 'CBR @ 400V (A)'}
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {SAUDI_C1_220V_TABLE.map((row, idx) => {
                            const row400 = SAUDI_C1_400V_TABLE[idx] || SAUDI_C1_400V_TABLE[0];
                            return (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                                <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                  {row.area} m²
                                </td>
                                <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                  {row.kva}
                                </td>
                                {(c1Voltage === 'both' || c1Voltage === '230') && (
                                  <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#006C35] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                    {row.breakerA} A
                                  </td>
                                )}
                                {(c1Voltage === 'both' || c1Voltage === '400') && (
                                  <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                                    {row400.breakerA} A
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item6' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول C2: المباني التجارية (جهد 230 فولت و 400 فولت)' : 'Table C2: Commercial Buildings (230V & 400V)'}
                        </h3>
                        <p className="text-xs font-bold text-[#006C35] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الأحمال المتصلة وسعات القواطع (CBR)' : 'COMMERCIAL CONNECTED LOAD & CBR'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setC2Voltage('both')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c2Voltage === 'both' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          {isAr ? 'كلا الجهدين' : 'Both (230 & 400V)'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setC2Voltage('230')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c2Voltage === '230' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          230 V
                        </button>
                        <button
                          type="button"
                          onClick={() => setC2Voltage('400')}
                          className={`px-2.5 py-1 rounded cursor-pointer ${c2Voltage === '400' ? 'bg-[#006C35] text-white' : 'text-slate-600'}`}
                        >
                          400 V
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نطاق المساحة (م²)' : 'Area Range (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Connected Load (kVA)'}
                            </th>
                            {(c2Voltage === 'both' || c2Voltage === '230') && (
                              <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                                {isAr ? 'القاطع @ 230 فولت (أمبير)' : 'CBR @ 230V (A)'}
                              </th>
                            )}
                            {(c2Voltage === 'both' || c2Voltage === '400') && (
                              <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-blue-800">
                                {isAr ? 'القاطع @ 400 فولت (أمبير)' : 'CBR @ 400V (A)'}
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {SAUDI_C2_220V_TABLE.map((row, idx) => {
                            const row400 = SAUDI_C2_400V_TABLE[idx] || SAUDI_C2_400V_TABLE[0];
                            return (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                                <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                  {row.area} m²
                                </td>
                                <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                  {row.kva}
                                </td>
                                {(c2Voltage === 'both' || c2Voltage === '230') && (
                                  <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#006C35] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                    {row.breakerA} A
                                  </td>
                                )}
                                {(c2Voltage === 'both' || c2Voltage === '400') && (
                                  <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                                    {row400.breakerA} A
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. EUROPEAN (IEC) CODE TABLES                                  */}
            {/* ============================================================== */}
            {activeCodeId === 'europe' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden max-h-[calc(100vh-320px)]">
                {activeItem === 'item1' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'شكل 2-4: الطلب النوعي على القدرة وفقاً لاستخدام المبنى (W/m²)' : 'Fig. 2-4: Building Use Power Demand (W/m²)'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'منهجية تقدير أحمال المباني' : 'BUILDING USE LOAD ESTIMATION'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEC 60364-8-1 / TIP
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar max-h-[calc(100vh-350px)] pb-10">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'استخدام المبنى (Building Use)' : 'Building Use'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'التفاصيل (Details)' : 'Details'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'الوحدة (Unit)' : 'Unit'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Min
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Max
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                              Average
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-slate-300 font-bold text-slate-900">
                              SF
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEC_FIG_2_4_BUILDING_USE.map((row, idx) => (
                            <tr key={row.buildingUse} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.buildingUseAr : row.buildingUse}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.detailsAr : row.details}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.unit}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.min}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.max}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.average}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 bg-slate-50/60 border-b border-slate-100">
                                {row.sf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item2' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 30/2: الطلب النوعي للمناطق الوظيفية' : 'Table 30/2: Functional Areas Power Demand'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الطلب النوعي للمناطق الوظيفية' : 'FUNCTIONAL AREAS SPECIFIC DEMAND'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEC 60364 Table 30/2
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar max-h-[calc(100vh-350px)] pb-10">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'المنطقة الوظيفية (Functional Area)' : 'Functional Area'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'الوحدة (Unit)' : 'Unit'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Min
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Max
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                              Average
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-slate-300 font-bold text-slate-900">
                              SF
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEC_TABLE_30_2_FUNCTIONAL_AREAS.map((row, idx) => (
                            <tr key={row.area} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.areaAr : row.area}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.unit}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.min}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.max}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.average}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 bg-slate-50/60 border-b border-slate-100">
                                {row.sf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item3' && (
                  <div className="flex-1 min-h-0 overflow-y-auto table-scrollbar max-h-[calc(100vh-350px)] p-4 sm:p-5 space-y-6 pb-14">
                    {/* Part A: Equipment */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                      <div className="sticky top-0 z-20 bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {isAr ? 'الجزء أ: معاملات تزامن المعدات (Escalator, Elevator, Sanitary, Heating, A/C)' : 'Part A: Equipment Simultaneity Factors (Escalator, Elevator, Sanitary, Heating, A/C)'}
                        </h4>
                        <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          Part A: Equipment
                        </span>
                      </div>
                      <div className="overflow-x-auto relative table-scrollbar">
                        <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                          <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                            <tr className="text-slate-800 font-bold bg-slate-100">
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                                Equipment
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                                SF
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Rating
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-slate-300 font-bold text-slate-800">
                                Notes
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {IEC_INSTALLATIONS_PART_A.map((row, idx) => (
                              <tr key={row.equipment} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                                <td className="py-2 px-3 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.equipmentAr : row.equipment}</td>
                                <td className="py-2 px-3 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.sf}</td>
                                <td className="py-2 px-3 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.typicalRatingAr : row.typicalRating}</td>
                                <td className="py-2 px-3 text-slate-600 border-b border-slate-100">{isAr ? row.notesAr : row.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Part B: Space Heating, Cooling & PV */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                      <div className="sticky top-0 z-20 bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {isAr ? 'الجزء ب: أنظمة التدفئة والتبريد والطاقة (Floor heating, Night storage, PV)' : 'Part B: Heating, Cooling & Renewables (Floor heating, Night storage, PV)'}
                        </h4>
                        <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          Part B: HVAC & PV
                        </span>
                      </div>
                      <div className="overflow-x-auto relative table-scrollbar">
                        <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                          <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                            <tr className="text-slate-800 font-bold bg-slate-100">
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                                Item
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Unit
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Min
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Max
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                                Avg
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-slate-300 font-bold text-slate-800">
                                Notes
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {IEC_INSTALLATIONS_PART_B.map((row, idx) => (
                              <tr key={row.item} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                                <td className="py-2 px-3 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.itemAr : row.item}</td>
                                <td className="py-2 px-2.5 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.unit}</td>
                                <td className="py-2 px-2.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.min}</td>
                                <td className="py-2 px-2.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.max}</td>
                                <td className="py-2 px-2.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.average}</td>
                                <td className="py-2 px-3 text-slate-600 border-b border-slate-100">{isAr ? row.notesAr : row.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem === 'item4' && (
                  <div className="flex-1 min-h-0 overflow-y-auto table-scrollbar max-h-[calc(100vh-350px)] p-4 sm:p-5 space-y-6 pb-14">
                    {/* Part A: Lighting (Roads, Heavy-duty, Office work, Fine work) */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                      <div className="sticky top-0 z-20 bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {isAr ? 'الجزء أ: كثافة أحمال الإنارة ومستويات LUX (Roads, Heavy-duty, Office work, Fine work)' : 'Part A: Lighting Load Density & Lux (Roads, Heavy-duty, Office work, Fine work)'}
                        </h4>
                        <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          Part A: Lighting
                        </span>
                      </div>
                      <div className="overflow-x-auto relative table-scrollbar">
                        <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                          <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                            <tr className="text-slate-800 font-bold bg-slate-100">
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                                Application
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                                VA/m²
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-amber-700">
                                Lux (E_m)
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-slate-300 font-bold text-slate-800">
                                Standard Target
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {IEC_LIGHTING_PART_A.map((row, idx) => (
                              <tr key={row.application} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                                <td className="py-2 px-3 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.applicationAr : row.application}</td>
                                <td className="py-2 px-2.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.vaPerM2}</td>
                                <td className="py-2 px-2.5 text-center font-mono font-bold text-amber-700 bg-amber-50/30 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.lux}</td>
                                <td className="py-2 px-3 text-slate-600 border-b border-slate-100">{isAr ? row.standardTargetAr : row.standardTarget}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Part B: Small Power (Ventilation, Heaters, Offices, Workshops) */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                      <div className="sticky top-0 z-20 bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {isAr ? 'الجزء ب: مخصصات المقابس وقوى الأجهزة (Ventilation, Heaters, Offices, Workshops)' : 'Part B: Small Power (Ventilation, Heaters, Offices, Workshops)'}
                        </h4>
                        <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          Part B: Small Power
                        </span>
                      </div>
                      <div className="overflow-x-auto relative table-scrollbar">
                        <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                          <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                            <tr className="text-slate-800 font-bold bg-slate-100">
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                                Application
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Details
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Unit
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Min
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                                Max
                              </th>
                              <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                                Avg
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {IEC_POWER_PART_B.map((row, idx) => (
                              <tr key={row.application} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                                <td className="py-2 px-3 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.applicationAr : row.application}</td>
                                <td className="py-2 px-3 text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{isAr ? row.detailsAr : row.details}</td>
                                <td className="py-2 px-2 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.unit}</td>
                                <td className="py-2 px-2 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.min}</td>
                                <td className="py-2 px-2 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.max}</td>
                                <td className="py-2 px-2 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">{row.average}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem === 'item5' && (
                  <div className="flex-1 min-h-0 overflow-y-auto table-scrollbar max-h-[calc(100vh-350px)] p-4 sm:p-5 space-y-6 pb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Fig B10 */}
                      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                        <div className="sticky top-0 z-20 bg-slate-100 px-3 py-2 border-b border-slate-200">
                          <h4 className="font-bold text-slate-900 text-xs">Fig. B10: Number of consumers</h4>
                        </div>
                        <div className="overflow-x-auto relative table-scrollbar">
                          <table className="w-full text-xs border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                              <tr className="bg-slate-100 font-bold">
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-r border-slate-300 text-left">From</th>
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-r border-slate-300 text-left">To</th>
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-slate-300 text-center font-extrabold text-[#1E3A8A]">Ks</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono text-xs">
                              {IEC_KS_FIG_B10.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                                  <td className="py-1.5 px-2.5 border-b border-r border-slate-100">{row.from}</td>
                                  <td className="py-1.5 px-2.5 border-b border-r border-slate-100">{row.to}</td>
                                  <td className="py-1.5 px-2.5 text-center font-bold text-[#1E3A8A] border-b" dir="ltr">{row.ks.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Fig B12 */}
                      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                        <div className="sticky top-0 z-20 bg-slate-100 px-3 py-2 border-b border-slate-200">
                          <h4 className="font-bold text-slate-900 text-xs">Fig. B12: Number of circuits</h4>
                        </div>
                        <div className="overflow-x-auto relative table-scrollbar">
                          <table className="w-full text-xs border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                              <tr className="bg-slate-100 font-bold">
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-r border-slate-300 text-left">From</th>
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-r border-slate-300 text-left">To</th>
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-slate-300 text-center font-extrabold text-[#1E3A8A]">Ks</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono text-xs">
                              {IEC_KS_FIG_B12.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                                  <td className="py-1.5 px-2.5 border-b border-r border-slate-100" dir="ltr">{row.from}</td>
                                  <td className="py-1.5 px-2.5 border-b border-r border-slate-100" dir="ltr">{row.to}</td>
                                  <td className="py-1.5 px-2.5 text-center font-bold text-[#1E3A8A] border-b" dir="ltr">{row.ks.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Fig B13 */}
                      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                        <div className="sticky top-0 z-20 bg-slate-100 px-3 py-2 border-b border-slate-200">
                          <h4 className="font-bold text-slate-900 text-xs">Fig. B13: Circuit function</h4>
                        </div>
                        <div className="overflow-x-auto relative table-scrollbar">
                          <table className="w-full text-xs border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                              <tr className="bg-slate-100 font-bold">
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-r border-slate-300 text-left">Function</th>
                                <th className="sticky top-0 z-20 bg-slate-100 py-2 px-2.5 border-b-2 border-slate-300 text-center font-extrabold text-[#1E3A8A]">Ks</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                              {IEC_KS_FIG_B13.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                                  <td className="py-2 px-2.5 font-semibold text-slate-800 border-b border-r border-slate-100">{isAr ? row.functionNameAr : row.functionName}</td>
                                  <td className="py-2 px-2.5 text-center font-mono font-bold text-[#1E3A8A] border-b">{row.ks}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem === 'item6' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'أنظمة تغذية الطوارئ والاحتياط (SPS & RPS)' : 'Safety Power Supply (SPS) & Reserve Power Supply (RPS)'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'تغذية الطوارئ والسلامة' : 'SAFETY POWER SUPPLY'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEC 60364-5-56
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar max-h-[calc(100vh-350px)] pb-10">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'الحمل / الخدمة الحرجة (Load)' : 'Load'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                              System-SF
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'الملاحظات والاشتراطات (Comments)' : 'Comments'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEC_SPS_RPS_TABLE.map((row, idx) => (
                            <tr key={row.load} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.loadAr : row.load}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.systemSf}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                                {isAr ? row.commentsAr : row.comments}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. AMERICAN (NEC) CODE TABLES                                  */}
            {/* ============================================================== */}
            {activeCodeId === 'usa' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                {activeItem === 'item1' && (
                  // Item 1: Lighting Loads (General Occupancy VA/m² and VA/ft²)
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'أحمال الإنارة العامة للإشغالات المختلفة (NEC Table 220.12)' : 'General Lighting Loads by Occupancy (Table 220.12)'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'كثافة أحمال الإنارة (ف.أ/م² و ف.أ/قدم²)' : 'LIGHTING UNIT LOAD DENSITY (VA/m² & VA/ft²)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.12
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نوع الإشغال (Type of Occupancy)' : 'Type of Occupancy'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'المجموعة (Group)' : 'Group'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Unit load (VA/m²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              Unit load (VA/ft²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'حمل مستمر (125%)' : 'Continuous Load'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_LIGHTING_LOADS.map((row, idx) => (
                            <tr key={row.occupancy} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.occupancyAr : row.occupancy}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.group}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.unitLoadVAm2}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.unitLoadVAft2}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono text-xs text-slate-600 border-b border-slate-100">
                                {row.continuousDuty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item2' && (
                  // Item 2: Tiered DF - Lighting & Receptacles
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'معاملات الطلب المتدرجة للإنارة والمقابس (Table 220.42 & Table 220.44)' : 'Tiered Demand Factors: Lighting & Receptacles'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معاملات الطلب المتدرجة' : 'TIERED DEMAND FACTORS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Art. 220
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نوع الإشغال (Type of Occupancy)' : 'Type of Occupancy'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'شريحة الحمل المتصل (Portion of Connected Load)' : 'Portion of Connected Load'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              {isAr ? 'معامل الطلب (DF)' : 'Demand Factor (DF)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_TIERED_DF.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.occupancyAr : row.occupancy}
                              </td>
                              <td className="py-2.5 px-4 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.portionAr : row.portion}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                                {row.df}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item3' && (
                  // Item 3: Dwelling DF - Dryers & Cooking Appliances
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'معاملات طلب المجففات وأجهزة الطهي السكنية (Table 220.54 & Table 220.55)' : 'Dwelling Demand Factors: Dryers & Cooking Appliances'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معاملات الأجهزة المنزلية' : 'HOUSEHOLD APPLIANCES DEMAND'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.54/55
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'عدد الأجهزة / الوحدات' : 'Number of Appliances'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Dryers Demand Factor
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                              Household Ranges (Max Demand)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'ملاحظات تطبيقية' : 'Engineering Notes'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_DWELLING_DF.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.appliances}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.dryersDf}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-blue-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.rangesDemand}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                                {isAr ? row.notesAr : row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item4' && (
                  // Item 4: Commercial DF - Kitchen & Elevators
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'معاملات طلب المطابخ التجارية والمصاعد (Table 220.56 & Art. 620)' : 'Commercial DF: Kitchen Equipment & Elevators'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'المطابخ التجارية والمصاعد' : 'COMMERCIAL KITCHEN & ELEVATORS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.56
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'المعدة / التجهيزة' : 'Equipment / Installation'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Demand Factor (DF)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'الملاحظات والمرجع' : 'Notes & Code Guidance'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_COMMERCIAL_DF.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.equipmentAr : row.equipment}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.df}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                                {isAr ? row.notesAr : row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item5' && (
                  // Item 5: Special Occupancies - Mobile Homes & EV Charging
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'الإشغالات الخاصة: شواحن السيارات الكهربائية ومواقف الكرفانات' : 'Special Occupancies: EV Charging & Mobile Home Parks'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'اشتراطات شواحن السيارات والمنازل المتنقلة' : 'EV CHARGING & MOBILE HOMES'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Art. 550 / 625
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نوع الحمل الخاص' : 'Special Load Type'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'قاعدة التقدير والحساب' : 'Rating & Calculation Rule'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              DF
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'البند المرجعي' : 'Code Reference'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_SPECIAL_OCCUPANCIES.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.loadTypeAr : row.loadType}
                              </td>
                              <td className="py-2.5 px-4 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.ratingRuleAr : row.ratingRule}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.df}
                              </td>
                              <td className="py-2.5 px-4 font-mono text-xs text-slate-600 border-b border-slate-100">
                                {row.codeRef}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === 'item6' && (
                  // Item 6: Farm Loads - Agricultural Demand Factors
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'الأحمال الزراعية والمزارع (NEC Table 220.102)' : 'Farm Loads: Agricultural Demand Factors'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'طريقة حساب أحمال المزارع' : 'FARM LOAD COMPUTING METHOD'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.102
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'شريحة الحمل الزراعي' : 'Portion of Connected Load'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Demand Factor (DF)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'إرشادات التطبيق' : 'Application Guidance'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_FARM_LOADS.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.portionAr : row.portion}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.df}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                                {isAr ? row.guidanceAr : row.guidance}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

        {/* 4. FOOTER (Static Bottom Bar) */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
          {/* Left: A secondary outline button "Close Review" */}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق المراجعة' : 'Close Review'}
          </button>

          {/* Right: A primary dark blue button "Proceed to Step 2 Calculation ➔" */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToCalculation();
            }}
            className="px-7 py-2.5 bg-[#1E3A8A] hover:bg-[#1e40af] active:bg-[#172554] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center gap-2 cursor-pointer"
          >
            <span>{isAr ? 'الانتقال إلى خطوة الحساب 2 ➔' : 'Proceed to Step 2 Calculation ➔'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
