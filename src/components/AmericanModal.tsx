import React, { useState } from 'react';
import { X, Globe, Table as TableIcon, Layers, ShieldCheck, ExternalLink, Link2 } from 'lucide-react';
import { FlagIcon } from './Flags';
import { Language } from '../data/translations';
import { STANDARDS_DATA, StandardMethodology } from '../data/standardsData';
import {
  NEC_LIGHTING_LOADS,
  NEC_TIERED_DF,
  NEC_DWELLING_DF,
  NEC_COMMERCIAL_DF,
  NEC_SPECIAL_OCCUPANCIES,
  NEC_FARM_LOADS,
} from '../data/necCodeData';
import {
  IEEE_TABLE_3_BUILDINGS,
  IEEE_TABLE_4_HVAC,
  IEEE_TABLE_5_TRANSFORMERS,
  IEEE_TABLE_8_LOAD_FACTORS,
  IEEE_TABLE_11_ELEVATORS,
  IEEE_TABLE_14_EMERGENCY,
} from '../data/ieeeCodeData';

interface AmericanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCalculation: () => void;
  lang: Language;
  onToggleLang?: () => void;
  onSelectStandard?: (std: StandardMethodology) => void;
}

type StandardVariant = 'nec' | 'ieee';

interface SidebarItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const AmericanModal: React.FC<AmericanModalProps> = ({
  isOpen,
  onClose,
  onProceedToCalculation,
  lang,
  onToggleLang,
  onSelectStandard,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<StandardVariant>('nec');
  const [activeNecItem, setActiveNecItem] = useState<string>('nec_220_12');
  const [activeIeeeItem, setActiveIeeeItem] = useState<string>('ieee_table_3');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  // 1. NEC Sidebar Items (Exact mapping from prompt)
  const necSidebarItems: SidebarItem[] = [
    {
      id: 'nec_220_12',
      titleEn: 'Table 220.12',
      titleAr: 'جدول 220.12',
      descEn: 'Lighting Loads (VA/m²)',
      descAr: 'أحمال الإنارة (ف.أ/م²)',
    },
    {
      id: 'nec_220_42',
      titleEn: 'Table 220.42',
      titleAr: 'جدول 220.42',
      descEn: 'Tiered Factors (Lighting)',
      descAr: 'معاملات متدرجة للإنارة',
    },
    {
      id: 'nec_220_55',
      titleEn: 'Table 220.55',
      titleAr: 'جدول 220.55',
      descEn: 'Dwelling Appliances (Ranges)',
      descAr: 'أجهزة الطهي السكنية',
    },
    {
      id: 'nec_620_14',
      titleEn: 'Table 620.14',
      titleAr: 'جدول 620.14',
      descEn: 'Commercial (Elevators)',
      descAr: 'المصاعد التجارية',
    },
    {
      id: 'nec_626_11',
      titleEn: 'Table 626.11',
      titleAr: 'جدول 626.11',
      descEn: 'Special Occupancies (EV)',
      descAr: 'شواحن السيارات والمنازل المتنقلة',
    },
    {
      id: 'nec_220_103',
      titleEn: 'Table 220.103',
      titleAr: 'جدول 220.103',
      descEn: 'Farm Loads',
      descAr: 'معاملات الأحمال الزراعية',
    },
  ];

  // 2. IEEE Std 241 (Gray Book) Sidebar Items
  const ieeeSidebarItems: SidebarItem[] = [
    {
      id: 'ieee_table_3',
      titleEn: 'Table 3',
      titleAr: 'جدول 3',
      descEn: 'Power Densities (VA/m²)',
      descAr: 'كثافة القدرة للمباني',
    },
    {
      id: 'ieee_table_4',
      titleEn: 'Table 4',
      titleAr: 'جدول 4',
      descEn: 'HVAC & Diversity (kW/ton)',
      descAr: 'التكييف وتزامن التبريد',
    },
    {
      id: 'ieee_table_5',
      titleEn: 'Table 5',
      titleAr: 'جدول 5',
      descEn: 'Transformer Growth Sizing',
      descAr: 'توسعات وسعات المحولات',
    },
    {
      id: 'ieee_table_8',
      titleEn: 'Table 8',
      titleAr: 'جدول 8',
      descEn: 'Load Factors & Coincidence',
      descAr: 'معاملات التحميل والتزامن',
    },
    {
      id: 'ieee_table_11',
      titleEn: 'Table 11',
      titleAr: 'جدول 11',
      descEn: 'Elevator Feeder Diversity',
      descAr: 'تزامن مغذيات المصاعد',
    },
    {
      id: 'ieee_table_14',
      titleEn: 'Table 14',
      titleAr: 'جدول 14',
      descEn: 'Emergency & Standby',
      descAr: 'أنظمة الطوارئ والاحتياط',
    },
  ];

  const currentSidebarItems = selectedStandard === 'nec' ? necSidebarItems : ieeeSidebarItems;
  const activeItemId = selectedStandard === 'nec' ? activeNecItem : activeIeeeItem;
  const setActiveItemId = selectedStandard === 'nec' ? setActiveNecItem : setActiveIeeeItem;

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
        {/* 1. HEADER (Top) */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <FlagIcon country="usa" className="w-14 h-9.5 rounded-sm shadow-xs border border-slate-300" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? 'ملف منهجية الكود الأمريكي (NFPA / IEEE)' : 'US METHODOLOGY DOSSIER'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] tracking-tight leading-tight">
                {isAr ? 'تفاصيل الكود الأمريكي (American Code Details)' : 'American Code Details'}
              </h2>
            </div>
          </div>

          {/* Center Code Switcher Pills */}
          {onSelectStandard && (
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {STANDARDS_DATA.map((std) => {
                const isSelected = std.id === 'usa';
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => onSelectStandard(std)}
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
          )}

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

        {/* 1.1 INFO BAR (Static - 4 cards) */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'المواصفة القياسية' : 'STANDARD CODE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                NEC / IEEE
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'تردد الشبكة' : 'GRID FREQUENCY'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block">
                60 Hz
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهد الاسمي' : 'NOMINAL VOLTAGE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                120/240 V
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهة المنظمة' : 'GOVERNING BODY'}
              </span>
              <span className="font-extrabold text-[#111827] text-xs sm:text-sm mt-0.5 block truncate">
                NFPA / IEEE
              </span>
            </div>
          </div>
        </div>

        {/* 2. STANDARD SELECTOR & OFFICIAL REFERENCES (Top Bar Row) */}
        <div className="px-6 py-2.5 bg-[#F8FAFC] border-b border-slate-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Standard Selector Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {isAr ? 'اختيار الكود المرجعي:' : 'Select Standard:'}
            </span>
            <div className="inline-flex items-center bg-slate-200/80 p-1 rounded-full border border-slate-300 shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedStandard('nec')}
                className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStandard === 'nec'
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NEC (NFPA 70)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStandard('ieee')}
                className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStandard === 'ieee'
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>IEEE (Std 241)</span>
              </button>
            </div>
          </div>

          {/* Right: OFFICIAL REFERENCES Container (Aligned Far Right, Items Left-Aligned with Title) */}
          <div className="flex flex-col items-start justify-center text-left">
            {/* Top line: Title */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 select-none">
              {isAr ? 'المراجع الرسمية · OFFICIAL REFERENCES' : 'OFFICIAL REFERENCES'}
            </span>

            {/* Below the title: Two links stacked vertically with 4px gap, perfectly left-aligned */}
            <div className="flex flex-col gap-1 items-start">
              <a
                href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1E3A8A] hover:text-blue-950 hover:underline leading-tight transition-colors cursor-pointer group text-left"
                title="NEC 2026 Load Calculations: Article 120 Guide for Engineers"
              >
                <span className="text-xs shrink-0 select-none">🔗</span>
                <span className="underline decoration-[#1E3A8A]/40 group-hover:decoration-[#1E3A8A]">
                  NEC 2026 Load Calculations: Article 120 Guide for Engineers
                </span>
              </a>

              <a
                href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1E3A8A] hover:text-blue-950 hover:underline leading-tight transition-colors cursor-pointer group text-left"
                title="NEC Article 220: Branch Circuit & Feeder Load Calculations"
              >
                <span className="text-xs shrink-0 select-none">🔗</span>
                <span className="underline decoration-[#1E3A8A]/40 group-hover:decoration-[#1E3A8A]">
                  NEC Article 220: Branch Circuit & Feeder Load Calculations
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. MAIN BODY (Master-Detail Split Layout) */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-[#F4F6F8]">
          {/* LEFT SIDEBAR (Width: ~250px) */}
          <aside className="w-[250px] shrink-0 border-r border-slate-200 bg-white p-3 space-y-2 overflow-y-auto table-scrollbar flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="px-2 py-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>{isAr ? 'فهرس الجداول' : 'TABLES INDEX'}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  {selectedStandard.toUpperCase()}
                </span>
              </div>

              {currentSidebarItems.map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemId(item.id)}
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex flex-col justify-center border ${
                      isActive
                        ? 'bg-blue-50/90 text-[#1E3A8A] border-l-4 border-l-[#1E3A8A] rtl:border-l-0 rtl:border-r-4 rtl:border-r-[#1E3A8A] border-y border-r rtl:border-r-0 rtl:border-l border-blue-200 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#1E3A8A]' : 'text-slate-400'}`} />
                      <span className={`text-xs sm:text-sm font-extrabold tracking-tight leading-none ${isActive ? 'text-[#1E3A8A]' : 'text-slate-900'}`}>
                        {isAr ? item.titleAr : item.titleEn}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider leading-none mt-1.5 block ${
                        isActive ? 'text-blue-700 font-extrabold' : 'text-slate-500'
                      }`}
                    >
                      {isAr ? item.descAr : item.descEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick footer badge */}
            <div className="pt-2.5 border-t border-slate-100 mt-auto">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center gap-2">
                <FlagIcon country="usa" className="w-7 h-5 rounded-2xs shadow-2xs" />
                <div className="text-[10.5px] font-bold text-slate-600 leading-tight">
                  <span>{selectedStandard === 'nec' ? 'NEC Article 220 Suite' : 'IEEE 241 Gray Book'}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA (Displays Real Tables with STICKY HEADERS) */}
          <main className="flex-1 min-h-0 bg-[#F4F6F8] p-5 flex flex-col overflow-hidden">
            {/* ============================================================== */}
            {/* A. NEC (NFPA 70) TABLES                                         */}
            {/* ============================================================== */}
            {selectedStandard === 'nec' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                {/* 1. Table 220.12: General Lighting Loads by Occupancy */}
                {activeNecItem === 'nec_220_12' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 220.12: أحمال الإنارة العامة للإشغالات المختلفة'
                            : 'Table 220.12: General Lighting Loads by Occupancy'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'كثافة أحمال الإنارة بالوحدات المترية والإنجليزية' : 'GENERAL OCCUPANCY LIGHTING POWER DENSITIES'}
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
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              {isAr ? 'المجموعة (Group)' : 'Group'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Unit Load (VA/m²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-slate-900">
                              Unit Load (VA/ft²)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {NEC_LIGHTING_LOADS.map((row, idx) => (
                            <tr
                              key={row.occupancy}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                            >
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.occupancyAr : row.occupancy}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-semibold text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.group}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.unitLoadVAm2}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800 border-b border-slate-100">
                                {row.unitLoadVAft2}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. Table 220.42: Tiered Factors (Lighting) */}
                {activeNecItem === 'nec_220_42' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 220.42: معاملات الطلب المتدرجة للإنارة ومخارج المقابس'
                            : 'Table 220.42: General Lighting & Receptacle Demand Factors'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معاملات الطلب المتدرجة' : 'TIERED LIGHTING & RECEPTACLES FACTORS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.42
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
                              {isAr ? 'شريحة الحمل المتصل' : 'Portion of Connected Load'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              Demand Factor (DF)
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

                {/* 3. Table 220.55: Dwelling Appliances (Ranges & Dryers) */}
                {activeNecItem === 'nec_220_55' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 220.55: معاملات طلب أجهزة الطهي والمجففات السكنية'
                            : 'Table 220.55: Household Electric Ranges & Clothes Dryers'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الأجهزة المنزلية والتزامن' : 'DWELLING APPLIANCES DEMAND'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.55
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'عدد الأجهزة (Number of Appliances)' : 'Number of Appliances'}
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

                {/* 4. Table 620.14: Commercial (Elevators) */}
                {activeNecItem === 'nec_620_14' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 620.14: معاملات طلب مجموعات المصاعد والمطابخ التجارية'
                            : 'Table 620.14: Commercial Elevator Feeders & Kitchen Demand'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معاملات طلب المغذيات للمصاعد' : 'FEEDER DEMAND FACTORS FOR ELEVATORS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 620.14
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'المعدة / التجهيزة' : 'Equipment / Elevator Bank'}
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

                {/* 5. Table 626.11: Special Occupancies (EV & Mobile Homes) */}
                {activeNecItem === 'nec_626_11' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 626.11 ومادة 625: شواحن السيارات الكهربائية ومواقف الكرفانات'
                            : 'Table 626.11 & Art. 625: EV Charging & Special Occupancies'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'اشتراطات شواحن السيارات والمنازل المتنقلة' : 'EV CHARGING & SPECIAL OCCUPANCIES'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Art. 625 / 626
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
                              {isAr ? 'قاعدة التقدير والحساب' : 'Rating & Sizing Rule'}
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

                {/* 6. Table 220.103: Farm Loads */}
                {activeNecItem === 'nec_220_103' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 220.103: طريقة حساب معاملات الأحمال الزراعية'
                            : 'Table 220.103: Method for Computing Farm Loads'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'الأحمال الزراعية والمزارع' : 'AGRICULTURAL DEMAND FACTORS'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        NEC Table 220.103
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

            {/* ============================================================== */}
            {/* B. IEEE (Std 241) TABLES                                        */}
            {/* ============================================================== */}
            {selectedStandard === 'ieee' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                {/* 1. IEEE Table 3: Power Densities */}
                {activeIeeeItem === 'ieee_table_3' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr
                            ? 'جدول 3 (IEEE 241): كثافة القدرة الإجمالية للمباني التجارية'
                            : 'Table 3: Commercial Building Electrical Power Densities'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'كثافة الأحمال ومعاملات التحميل' : 'CONNECTED & DEMAND POWER DENSITIES (VA/m² & W/ft²)'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Table 3
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نوع المبنى التجاري' : 'Building Type'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Connected (VA/m²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Connected (W/ft²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Demand (VA/m²)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                              Load Factor
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'الملاحظات الفنية' : 'Engineering Scope'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_3_BUILDINGS.map((row, idx) => (
                            <tr key={row.buildingType} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.buildingTypeAr : row.buildingType}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.connectedVaPerM2}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.connectedWPerFt2}
                              </td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.demandVaPerM2}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.loadFactor}
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

                {/* 2. IEEE Table 4: HVAC */}
                {activeIeeeItem === 'ieee_table_4' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 4 (IEEE 241): كفاءة وتزامن التكييف والتهوية' : 'Table 4: HVAC & Air Conditioning Power & Diversity'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معدلات الاستهلاك النوعي للتبريد المركزي' : 'COOLING EFFICIENCY (kW/ton) & DIVERSITY'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Table 4
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'معدة التبريد والتكييف' : 'HVAC Plant Equipment'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Specific Power (kW/ton)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                              Diversity Factor
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Typical Rating
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'التفاصيل التشغيلية' : 'Operational Scope'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_4_HVAC.map((row, idx) => (
                            <tr key={row.equipment} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.equipmentAr : row.equipment}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.kwPerTon}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.diversityFactor}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.typicalRating}
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

                {/* 3. IEEE Table 5: Transformer Growth */}
                {activeIeeeItem === 'ieee_table_5' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 5 (IEEE 241): سعات المحولات وهوامش التوسع المستقبلي' : 'Table 5: Transformer Sizing & Growth Margins'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معايير اختيار قدرة المحولات الكهربائية' : 'SUBSTATION TRANSFORMER CAPACITY ALLOCATION'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Table 5
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'نوع المنشأة' : 'Facility Classification'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Initial Demand Ratio
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Growth Allowance
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'توصيات الحجم والتكرارية' : 'Recommended Topology'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_5_TRANSFORMERS.map((row, idx) => (
                            <tr key={row.facilityType} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.facilityTypeAr : row.facilityType}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.initialDemandRatio}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.growthAllowance}
                              </td>
                              <td className="py-2.5 px-4 text-slate-700 border-b border-slate-100">
                                {isAr ? row.recommendedSizingAr : row.recommendedSizing}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. IEEE Table 8: Load Factors */}
                {activeIeeeItem === 'ieee_table_8' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 8 (IEEE 241): ساعات التشغيل ومعاملات التحميل والتزامن' : 'Table 8: Commercial Load Factors & Coincidence'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معامل التحميل السنوي وتزامن الذروة' : 'ANNUAL LOAD FACTORS & PEAK COINCIDENCE'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Table 8
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'النشاط التجاري' : 'Commercial Facility'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Operating Profile
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                              Annual Load Factor
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-slate-300 font-bold text-[#1E3A8A]">
                              Peak Season Coincidence
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_8_LOAD_FACTORS.map((row, idx) => (
                            <tr key={row.commercialActivity} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.commercialActivityAr : row.commercialActivity}
                              </td>
                              <td className="py-2.5 px-4 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.operatingHours}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.annualLoadFactor}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                                {row.peakSeasonCoincidence}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. IEEE Table 11: Elevator Diversity */}
                {activeIeeeItem === 'ieee_table_11' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 11 (IEEE 241): معاملات تزامن مغذيات مجموعات المصاعد' : 'Table 11: Elevator Feeder Group Diversity Factors'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'معامل التزامن وتيارات البدء للمصاعد' : 'PASSENGER ELEVATOR CORE FEEDER DEMAND'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Table 11
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'عدد كبائن المصاعد' : 'Elevator Group'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Demand Factor (DF)
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                              Starting Current Sizing
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'التوجيهات' : 'Dispatching Guidance'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_11_ELEVATORS.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.numberOfElevators}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.demandFactor}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-xs text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.startingCurrentFactor}
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

                {/* 6. IEEE Table 14: Emergency & Standby Systems */}
                {activeIeeeItem === 'ieee_table_14' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="shrink-0 bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {isAr ? 'جدول 14 (IEEE 241): تصنيف أنظمة الطوارئ والاحتياط وتأمين الأحمال' : 'Table 14: Emergency & Standby System Classification'}
                        </h3>
                        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-0.5">
                          {isAr ? 'زمن التحويل وسعات الوقود الاحتياطي' : 'TRANSFER TIMING & RELIABILITY CRITERIA'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                        IEEE Std 241 Sec 5
                      </span>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'فرع نظام الطوارئ' : 'Emergency / Standby Branch'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-[#1E3A8A]">
                              Max Transfer Time
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-emerald-800">
                              Fuel Autonomy
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                              {isAr ? 'الخدمات المغذاة' : 'Covered Loads & Scope'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {IEEE_TABLE_14_EMERGENCY.map((row, idx) => (
                            <tr key={row.branchType} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.branchTypeAr : row.branchType}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.maxTransferTime}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {row.storageFuelAutonomy}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                                {isAr ? row.standardGuidanceAr : row.standardGuidance}
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

        {/* 4. FOOTER */}
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
