import React, { useState } from 'react';
import { X, Globe, Table as TableIcon } from 'lucide-react';
import { FlagIcon } from './Flags';
import { Language } from '../data/translations';
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

interface IecModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCalculation: () => void;
  lang: Language;
  onToggleLang?: () => void;
}

type SelectedIecTab = 'fig24' | 'tab302' | 'installations' | 'lighting' | 'ks' | 'sps';

interface TabNavItem {
  id: SelectedIecTab;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const IecModal: React.FC<IecModalProps> = ({
  isOpen,
  onClose,
  onProceedToCalculation,
  lang,
  onToggleLang,
}) => {
  const [selectedTable, setSelectedTable] = useState<SelectedIecTab>('fig24');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  // Exactly 6 Tabs with 2-line pill structure matching Saudi Modal design
  const tableNavButtons: TabNavItem[] = [
    { id: 'fig24', titleEn: 'Fig. 2-4', titleAr: 'شكل 2-4', descEn: 'BUILDING USE', descAr: 'استخدام المبنى' },
    { id: 'tab302', titleEn: 'Table 30/2', titleAr: 'جدول 30/2', descEn: 'FUNCTIONAL AREAS', descAr: 'المناطق الوظيفية' },
    { id: 'installations', titleEn: 'Installations', titleAr: 'التجهيزات', descEn: 'SPECIAL LOADS', descAr: 'الأحمال الخاصة' },
    { id: 'lighting', titleEn: 'Lighting & Power', titleAr: 'الإنارة والمقابس', descEn: 'LIGHTING & POWER', descAr: 'الإنارة والقوى' },
    { id: 'ks', titleEn: 'IEC Ks', titleAr: 'معاملات Ks', descEn: 'SIMULTANEITY FACTORS', descAr: 'معاملات التزامن' },
    { id: 'sps', titleEn: 'SPS & RPS', titleAr: 'SPS و RPS', descEn: 'SAFETY POWER SUPPLY', descAr: 'تغذية الطوارئ والسلامة' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Modal Dialog Window: ~80-92% screen dimensions, Windows 11 desktop styling */}
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-[92vw] max-w-6xl h-[88vh] max-h-[88vh] flex flex-col overflow-hidden text-[#111827] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. HEADER (Top) */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <FlagIcon country="europe" className="w-14 h-9.5 rounded-sm shadow-xs border border-slate-300" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? 'ملف منهجية الكود الأوروبي الدولي (IEC 60364)' : 'IEC METHODOLOGY DOSSIER'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] tracking-tight leading-tight">
                {isAr ? 'تفاصيل الكود الأوروبي (6 جداول رسمية)' : 'European (IEC) Code Details (6 Official Tables)'}
              </h2>
            </div>
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
        <div className="px-6 py-3 bg-white border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'المواصفة القياسية' : 'STANDARD CODE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-sm sm:text-base mt-0.5 block">
                IEC 60364
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'تردد الشبكة' : 'GRID FREQUENCY'}
              </span>
              <span className="font-mono font-black text-[#111827] text-sm sm:text-base mt-0.5 block">
                50 Hz
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهد الاسمي' : 'NOMINAL VOLTAGE'}
              </span>
              <span className="font-mono font-black text-[#111827] text-sm sm:text-base mt-0.5 block">
                230/400 V
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهة المنظمة' : 'GOVERNING BODY'}
              </span>
              <span className="font-extrabold text-[#111827] text-xs sm:text-sm mt-0.5 block truncate" title="International Electrotechnical Commission">
                {isAr ? 'اللجنة الدولية (IEC)' : 'IEC'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. SIX TABLES SELECTOR BAR (2-Line Pill Tabs matching Saudi modal layout) */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {tableNavButtons.map((btn) => {
              const isActive = selectedTable === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedTable(btn.id)}
                  className={`flex flex-col items-start rtl:items-start justify-center py-2 px-3 sm:px-4 rounded-xl min-h-[52px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white shadow-md ring-1 ring-blue-700/60'
                      : 'bg-white hover:bg-slate-200/80 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full">
                    <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-200' : 'text-slate-500'}`} />
                    <span className="text-xs sm:text-sm font-extrabold tracking-tight leading-none">
                      {isAr ? btn.titleAr : btn.titleEn}
                    </span>
                  </div>
                  <span
                    className={`text-[9.5px] uppercase font-bold tracking-wider leading-none mt-1 block ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? btn.descAr : btn.descEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MAIN CONTENT AREA (Scrollable, Exactly Selected Real Data Table with Sticky Headers) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-9 bg-[#F4F6F8]/60 text-slate-800 table-scrollbar pb-16 max-h-[calc(100vh-350px)]">
          {/* ============================================================== */}
          {/* TAB 1: Fig. 2-4 - BUILDING USE                                 */}
          {/* ============================================================== */}
          {selectedTable === 'fig24' && (
            <section id="tab-fig24" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'شكل 2-4: الطلب النوعي على القدرة وفقاً لاستخدام المبنى'
                      : 'Fig. 2-4: Specific Power Demand according to Building Use'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'منهجية تقدير أحمال المباني · BUILDING USE LOAD ESTIMATION' : 'BUILDING USE LOAD ESTIMATION'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  IEC 60364-8-1 / TIP Fig 2-4
                </span>
              </div>

              {/* Table wrapper with Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative table-scrollbar">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                      <tr className="text-slate-800 font-bold bg-slate-100">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                          {isAr ? 'استخدام المبنى (Building Use)' : 'Building Use'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'التفاصيل (Details)' : 'Details'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الوحدة (Unit)' : 'Unit'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الحد الأدنى (Min)' : 'Min'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الحد الأقصى (Max)' : 'Max'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                          {isAr ? 'المتوسط (Average)' : 'Average'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-slate-900">
                          {isAr ? 'معامل التزامن (SF)' : 'SF'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {IEC_FIG_2_4_BUILDING_USE.map((row, idx) => (
                        <tr
                          key={row.buildingUse}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {isAr ? row.buildingUseAr : row.buildingUse}
                          </td>
                          <td className="py-2.5 px-4 text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {isAr ? row.detailsAr : row.details}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.unit}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.min}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.max}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.average}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 bg-slate-50/60 border-b border-slate-100">
                            {row.sf}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TAB 2: Table 30/2 - FUNCTIONAL AREAS                           */}
          {/* ============================================================== */}
          {selectedTable === 'tab302' && (
            <section id="tab-tab302" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول 30/2: الطلب النوعي على القدرة وفقاً للمناطق الوظيفية'
                      : 'Table 30/2: Specific Power Demand according to Functional Areas'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'الطلب النوعي للمناطق الوظيفية · FUNCTIONAL AREAS SPECIFIC DEMAND' : 'FUNCTIONAL AREAS SPECIFIC DEMAND'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  IEC 60364 Table 30/2
                </span>
              </div>

              {/* Table wrapper with Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative table-scrollbar">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                      <tr className="text-slate-800 font-bold bg-slate-100">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                          {isAr ? 'المنطقة الوظيفية (Functional Area)' : 'Functional Area'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الوحدة (Unit)' : 'Unit'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الحد الأدنى (Min)' : 'Min'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                          {isAr ? 'الحد الأقصى (Max)' : 'Max'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                          {isAr ? 'المتوسط (Average)' : 'Average'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-slate-900">
                          {isAr ? 'معامل التزامن (SF)' : 'SF'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {IEC_TABLE_30_2_FUNCTIONAL_AREAS.map((row, idx) => (
                        <tr
                          key={row.area}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {isAr ? row.areaAr : row.area}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.unit}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.min}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.max}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                            {row.average}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 bg-slate-50/60 border-b border-slate-100">
                            {row.sf}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TAB 3: Installations - SPECIAL LOADS                           */}
          {/* ============================================================== */}
          {selectedTable === 'installations' && (
            <section id="tab-installations" className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'التجهيزات: الأحمال الخاصة والخدمات الميكانيكية'
                      : 'Installations: Special Loads & Mechanical Services'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'معاملات تزامن التجهيزات والتدفئة · SPECIAL LOADS & EQUIPMENT' : 'SPECIAL LOADS & EQUIPMENT'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  IEC 60364-8-1 Sec 4
                </span>
              </div>

              {/* Part A: Equipment Simultaneity Factors */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {isAr
                      ? 'الجزء أ: معاملات تزامن المعدات (Escalator, Elevator, Sanitary, Heating, A/C)'
                      : 'Part A: Equipment Simultaneity Factors (Escalator, Elevator, Sanitary, Heating, A/C)'}
                  </h4>
                  <span className="text-xs font-bold text-[#1E3A8A] font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Part A: Equipment
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto relative table-scrollbar">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                        <tr className="text-slate-800 font-bold bg-slate-100">
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                            {isAr ? 'المعدة (Equipment)' : 'Equipment'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                            {isAr ? 'معامل التزامن (SF)' : 'SF'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            {isAr ? 'القدرة النمطية' : 'Typical Rating'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                            {isAr ? 'ملاحظات التشغيل' : 'Operational Notes'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {IEC_INSTALLATIONS_PART_A.map((row, idx) => (
                          <tr
                            key={row.equipment}
                            className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.equipmentAr : row.equipment}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.sf}
                            </td>
                            <td className="py-2.5 px-4 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.typicalRatingAr : row.typicalRating}
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
              </div>

              {/* Part B: Space Heating, Cooling & PV */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {isAr
                      ? 'الجزء ب: أنظمة التدفئة والتبريد والطاقة الكهروضوئية (Floor heating, Night storage, PV)'
                      : 'Part B: Heating, Cooling & Renewables (Floor heating, Night storage, PV)'}
                  </h4>
                  <span className="text-xs font-bold text-[#1E3A8A] font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Part B: Heating / PV
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto relative table-scrollbar">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                        <tr className="text-slate-800 font-bold bg-slate-100">
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                            {isAr ? 'البند (Item)' : 'Item'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            {isAr ? 'الوحدة (Unit)' : 'Unit'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            Min
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            Max
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                            Average
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                            {isAr ? 'الملاحظات الفنية' : 'Engineering Notes'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {IEC_INSTALLATIONS_PART_B.map((row, idx) => (
                          <tr
                            key={row.item}
                            className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.itemAr : row.item}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.unit}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.min}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.max}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.average}
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
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TAB 4: Lighting & Power - LIGHTING & POWER                     */}
          {/* ============================================================== */}
          {selectedTable === 'lighting' && (
            <section id="tab-lighting" className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'الإنارة والمقابس: كثافة الأحمال ومستويات الإضاءة ومخصصات القوى'
                      : 'Lighting & Power: Load Densities & Receptacles'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'منهجية الإنارة ومخارج المقابس · LIGHTING & POWER METHODOLOGY' : 'LIGHTING & POWER METHODOLOGY'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  EN 12464-1 / IEC 60364
                </span>
              </div>

              {/* Part A: Lighting Load Density & Illuminance Levels */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {isAr
                      ? 'الجزء أ: الإنارة (Roads, Heavy-duty, Office work, Fine work) - VA/m² و Lux'
                      : 'Part A: Lighting Load Density & Illuminance (Roads, Heavy-duty, Office work, Fine work)'}
                  </h4>
                  <span className="text-xs font-bold text-[#1E3A8A] font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Part A: Lighting
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto max-h-[300px] overflow-y-auto relative table-scrollbar">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                        <tr className="text-slate-800 font-bold bg-slate-100">
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                            {isAr ? 'تطبيق الإنارة' : 'Lighting Application'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                            VA/m²
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-amber-700">
                            Lux (E_m)
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                            {isAr ? 'المعيار المرجعي' : 'Standard Target / Reference'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {IEC_LIGHTING_PART_A.map((row, idx) => (
                          <tr
                            key={row.application}
                            className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.applicationAr : row.application}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.vaPerM2}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-bold text-amber-700 bg-amber-50/30 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.lux}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                              {isAr ? row.standardTargetAr : row.standardTarget}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Part B: Small Power / Socket-Outlets */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {isAr
                      ? 'الجزء ب: المقابس وقوى الأجهزة (Ventilation, Heaters, Offices, Workshops) - Min, Max, Average'
                      : 'Part B: Small Power & Receptacles (Ventilation, Heaters, Offices, Workshops)'}
                  </h4>
                  <span className="text-xs font-bold text-[#1E3A8A] font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Part B: Small Power
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto max-h-[300px] overflow-y-auto relative table-scrollbar">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                      <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                        <tr className="text-slate-800 font-bold bg-slate-100">
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                            {isAr ? 'تطبيق القوى' : 'Power Application'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            {isAr ? 'التفاصيل' : 'Details'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            {isAr ? 'الوحدة' : 'Unit'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            Min
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-800">
                            Max
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-slate-300 font-bold text-blue-900">
                            Average
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {IEC_POWER_PART_B.map((row, idx) => (
                          <tr
                            key={row.application}
                            className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-900 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.applicationAr : row.application}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {isAr ? row.detailsAr : row.details}
                            </td>
                            <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.unit}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.min}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                              {row.max}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                              {row.average}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TAB 5: IEC Ks - SIMULTANEITY FACTORS                           */}
          {/* ============================================================== */}
          {selectedTable === 'ks' && (
            <section id="tab-ks" className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'معاملات التزامن وفقاً لكود IEC 60364-5-52 (Simultaneity Factor Ks)'
                      : 'IEC Ks: Simultaneity Factors according to IEC 60364-5-52'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'معاملات التزامن للمستهلكين والدوائر والوظائف · SIMULTANEITY FACTORS' : 'SIMULTANEITY FACTORS'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  IEC 60364-5-52
                </span>
              </div>

              {/* Three Real Tables: Fig. B10, Fig. B12, and Fig. B13 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 1. Fig. B10: Number of Consumers */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {isAr ? 'شكل B10: عدد المستهلكين' : 'Fig. B10: Number of consumers'}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                      IEC B10
                    </span>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto max-h-[380px] overflow-y-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'من (From)' : 'From'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'إلى (To)' : 'To'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b-2 border-slate-300 font-extrabold text-[#1E3A8A]">
                              Ks
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-xs font-medium">
                          {IEC_KS_FIG_B10.map((row, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                            >
                              <td className="py-2 px-3 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.from}</td>
                              <td className="py-2 px-3 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">{row.to}</td>
                              <td className="py-2 px-3 text-center font-extrabold text-[#1E3A8A] border-b border-slate-100" dir="ltr">
                                {row.ks.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 2. Fig. B12: Number of Circuits */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {isAr ? 'شكل B12: عدد الدوائر باللوحة' : 'Fig. B12: Number of circuits'}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                      IEC B12
                    </span>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto max-h-[380px] overflow-y-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'من (From)' : 'From'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'إلى (To)' : 'To'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b-2 border-slate-300 font-extrabold text-[#1E3A8A]">
                              Ks
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-xs font-medium">
                          {IEC_KS_FIG_B12.map((row, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                            >
                              <td className="py-2 px-3 text-slate-700 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l" dir="ltr">{row.from}</td>
                              <td className="py-2 px-3 text-slate-700 border-b border-slate-100 rtl:border-r-0 rtl:border-l" dir="ltr">{row.to}</td>
                              <td className="py-2 px-3 text-center font-extrabold text-[#1E3A8A] border-b border-slate-100" dir="ltr">
                                {row.ks.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 3. Fig. B13: Circuit Function */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {isAr ? 'شكل B13: وظيفة الدائرة' : 'Fig. B13: Circuit function'}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                      IEC B13
                    </span>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto max-h-[380px] overflow-y-auto relative table-scrollbar">
                      <table className="w-full text-left rtl:text-right text-xs border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          <tr className="text-slate-800 font-bold bg-slate-100">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                              {isAr ? 'وظيفة الدائرة' : 'Function'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-2.5 text-center border-b-2 border-slate-300 font-extrabold text-[#1E3A8A]">
                              Ks
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium">
                          {IEC_KS_FIG_B13.map((row, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                            >
                              <td className="py-2 px-3 font-semibold text-slate-800 border-b border-r border-slate-100 rtl:border-r-0 rtl:border-l">
                                {isAr ? row.functionNameAr : row.functionName}
                              </td>
                              <td className="py-2 px-2.5 text-center font-mono font-extrabold text-[#1E3A8A] border-b border-slate-100">
                                {row.ks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SPS & RPS - SAFETY POWER SUPPLY                         */}
          {/* ============================================================== */}
          {selectedTable === 'sps' && (
            <section id="tab-sps" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'أنظمة تغذية الطوارئ والاحتياط (SPS & RPS - Safety & Reserve Power Supply)'
                      : 'Safety Power Supply (SPS) & Reserve Power Supply (RPS)'}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mt-1">
                    {isAr ? 'تغذية الطوارئ والسلامة والخدمات الحرجة · SAFETY POWER SUPPLY' : 'SAFETY POWER SUPPLY'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  IEC 60364-5-56
                </span>
              </div>

              {/* Table wrapper with Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative table-scrollbar">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                      <tr className="text-slate-800 font-bold bg-slate-100">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-slate-900">
                          {isAr ? 'الحمل / الخدمة الحرجة (Load)' : 'Load'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center border-b-2 border-r border-slate-300 rtl:border-r-0 rtl:border-l font-bold text-blue-900">
                          {isAr ? 'معامل التزامن (System-SF)' : 'System-SF'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b-2 border-slate-300 font-bold text-slate-800">
                          {isAr ? 'الملاحظات والمتطلبات التنظيمية (Comments)' : 'Comments'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {IEC_SPS_RPS_TABLE.map((row, idx) => (
                        <tr
                          key={row.load}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                        >
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
            </section>
          )}
        </div>

        {/* 5. FOOTER */}
        <div className="px-6 py-4.5 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
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
