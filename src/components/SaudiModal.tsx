import React, { useState } from 'react';
import { X, Globe, Table as TableIcon } from 'lucide-react';
import { FlagIcon } from './Flags';
import { Language } from '../data/translations';
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

interface SaudiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCalculation: () => void;
  lang: Language;
  onToggleLang?: () => void;
}

type SelectedTable = 'all' | '19' | '20' | '21' | '22' | 'c1' | 'c2';

interface TabNavItem {
  id: SelectedTable;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const SaudiModal: React.FC<SaudiModalProps> = ({
  isOpen,
  onClose,
  onProceedToCalculation,
  lang,
  onToggleLang,
}) => {
  const [selectedTable, setSelectedTable] = useState<SelectedTable>('all');
  const [c1VoltageFilter, setC1VoltageFilter] = useState<'both' | '230' | '400'>('both');
  const [c2VoltageFilter, setC2VoltageFilter] = useState<'both' | '230' | '400'>('both');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  // 2-Line Tab Navigation items with exact requested mapping
  const tableNavButtons: TabNavItem[] = [
    { id: '19', titleEn: 'Table 19', titleAr: 'جدول 19', descEn: 'LOAD ESTIMATION', descAr: 'LOAD ESTIMATION' },
    { id: '20', titleEn: 'Table 20', titleAr: 'جدول 20', descEn: 'DEMAND FACTOR', descAr: 'DEMAND FACTOR' },
    { id: '21', titleEn: 'Table 21', titleAr: 'جدول 21', descEn: 'COINCIDENT FACTORS', descAr: 'COINCIDENT FACTORS' },
    { id: '22', titleEn: 'Table 22', titleAr: 'جدول 22', descEn: 'CONSIDERATIONS', descAr: 'CONSIDERATIONS' },
    { id: 'c1', titleEn: 'Table C1', titleAr: 'جدول C1', descEn: 'RESIDENTIAL BUILDINGS', descAr: 'RESIDENTIAL BUILDINGS' },
    { id: 'c2', titleEn: 'Table C2', titleAr: 'جدول C2', descEn: 'COMMERCIAL BUILDINGS', descAr: 'COMMERCIAL BUILDINGS' },
    { id: 'all', titleEn: 'View All', titleAr: 'عرض الكل', descEn: 'ALL 6 TABLES', descAr: 'ALL 6 TABLES' },
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
            <FlagIcon country="saudi" className="w-14 h-9.5 rounded-sm shadow-xs border border-slate-300" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? 'ملف منهجية الكود السعودي (SEC / SBC 401)' : 'KSA METHODOLOGY DOSSIER'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#006C35] tracking-tight leading-tight">
                {isAr ? 'تفاصيل الكود السعودي (6 جداول رسمية)' : 'Saudi Code Details (6 Official Tables)'}
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
              <Globe className="w-3.5 h-3.5 text-[#006C35]" />
              <span>EN | AR</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              aria-label="Close dialog"
              title="Close Review (Esc)"
            >
              <X className="w-4 h-4 stroke-[2.25]" />
            </button>
          </div>
        </div>

        {/* 2. TOP INFO BAR (Static - 4 columns) */}
        <div className="px-6 pt-3.5 pb-2.5 bg-white shrink-0 border-b border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'رمز الكود' : 'STANDARD CODE'}
              </span>
              <span className="font-extrabold text-[#111827] text-sm sm:text-base mt-0.5 block">
                SBC 401 / SEC DPS Rev-02
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'تردد الشبكة' : 'GRID FREQUENCY'}
              </span>
              <span className="font-mono font-black text-[#111827] text-sm sm:text-base mt-0.5 block">
                60 Hz
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهد الاسمي المزدوج' : 'NOMINAL VOLTAGES'}
              </span>
              <span className="font-mono font-black text-[#111827] text-sm sm:text-base mt-0.5 block">
                230 V & 400 V
              </span>
            </div>

            <div className="bg-[#F4F6F8] p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'الجهة المنظمة' : 'GOVERNING BODY'}
              </span>
              <span className="font-extrabold text-[#111827] text-xs sm:text-sm mt-0.5 block truncate" title="Saudi Electricity Co. (SEC)">
                {isAr ? 'الشركة السعودية للكهرباء (SEC)' : 'Saudi Electricity Co. (SEC)'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. SIX TABLES SELECTOR BAR (2-Line Redesigned Tab Navigation) */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {tableNavButtons.map((btn) => {
              const isActive = selectedTable === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedTable(btn.id)}
                  className={`flex flex-col items-start rtl:items-start justify-center py-2 px-3 sm:px-4 rounded-xl min-h-[52px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#006C35] text-white shadow-md ring-1 ring-emerald-700/60'
                      : 'bg-white hover:bg-slate-200/80 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full">
                    <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-200' : 'text-slate-500'}`} />
                    <span className="text-xs sm:text-sm font-extrabold tracking-tight leading-none">
                      {isAr ? btn.titleAr : btn.titleEn}
                    </span>
                  </div>
                  <span
                    className={`text-[9.5px] uppercase font-bold tracking-wider leading-none mt-1 block ${
                      isActive ? 'text-emerald-100' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? btn.descAr : btn.descEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MAIN CONTENT AREA (Scrollable, Exactly 6 Tables in Strict Order with STICKY HEADERS) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-9 bg-[#F4F6F8]/60 text-slate-800">
          {/* ============================================================== */}
          {/* TABLE 1: جدول 19                                              */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === '19') && (
            <section id="table-19" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول 19: تقدير الأحمال للمنشآت المعتمدة على المساحة وبدون تكييف ومناطق الذروة الشتوية'
                      : 'Table 19: Load Estimation for Area-based Facilities, Facilities without AC & Winter Peak Area'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'منهجية تقدير الأحمال · LOAD ESTIMATION METHODOLOGY' : 'LOAD ESTIMATION METHODOLOGY'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  SEC DPS Sec 2.2
                </span>
              </div>

              {/* Table wrapper with fixed max-height & Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                    <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                      <tr className="text-slate-800 font-bold">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 w-16 text-center border-b border-slate-300 shadow-xs">
                          {isAr ? 'الرمز' : 'Code'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 border-b border-slate-300 shadow-xs">
                          {isAr ? 'فئة المنشأة / العميل' : 'Customer Category'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center font-bold border-b border-slate-300 shadow-xs">
                          {isAr ? 'مع التكييف (ف.أ/م²)' : 'Area-based Facilities (VA/m²)'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center font-bold border-b border-slate-300 shadow-xs">
                          {isAr ? 'بدون تكييف (تبريد مركزي) (ف.أ/م²)' : 'Without AC (VA/m²)'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center font-bold border-b border-slate-300 shadow-xs">
                          {isAr ? 'مناطق الذروة الشتوية (ف.أ/م²)' : 'Winter Peak Area (VA/m²)'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {SAUDI_TABLE_19.map((row, idx) => (
                        <tr
                          key={row.code}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}
                        >
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 bg-slate-50/60">
                            {row.code}
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-800">
                            {isAr ? row.categoryAr : row.category}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900">
                            {row.areaBasedVA}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900">
                            {row.withoutAcVA}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900">
                            {row.winterPeakVA}
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
          {/* TABLE 2: جدول 20                                              */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === '20') && (
            <section id="table-20" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول 20: معاملات الطلب لكافة أنواع المنشآت'
                      : 'Table 20: Demand Factors for all facility types'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'معاملات الطلب · DEMAND FACTORS (DF)' : 'DEMAND FACTORS (DF)'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  SEC DPS Sec 2.5
                </span>
              </div>

              {/* Table wrapper with fixed max-height & Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                    <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                      <tr className="text-slate-800 font-bold">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 w-16 text-center border-b border-slate-300 shadow-xs">
                          {isAr ? 'الرمز' : 'Code'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 border-b border-slate-300 shadow-xs">
                          {isAr ? 'فئة المنشأة / العميل' : 'Customer Category'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-3.5 text-center font-bold w-44 border-b border-slate-300 shadow-xs">
                          {isAr ? 'معامل الطلب (DF)' : 'Demand Factor (DF)'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {SAUDI_TABLE_20.map((row, idx) => (
                        <tr
                          key={row.code}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}
                        >
                          <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-900 bg-slate-50/60">
                            {row.code}
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-800">
                            {isAr ? row.categoryAr : row.category}
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-mono font-black text-slate-900 text-sm">
                            {row.df}
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
          {/* TABLE 3: جدول 21                                              */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === '21') && (
            <section id="table-21" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول 21: معاملات التزامن حسب عدد العدادات (N = 1 إلى 100)'
                      : 'Table 21: Coincident Factors by number of meters (N = 1 to 100)'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'معاملات التزامن · COINCIDENT FACTORS' : 'COINCIDENT FACTORS'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  SEC DPS Sec 2.6
                </span>
              </div>

              {/* Table wrapper with fixed max-height & Sticky Headers on all 3 columns */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: N = 1 to 33 */}
                  <div className="border border-slate-300 rounded-lg overflow-hidden max-h-[450px] overflow-y-auto relative">
                    <table className="w-full text-xs border-collapse">
                      <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs font-bold text-slate-800">
                        <tr>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'عدد العدادات (N)' : 'Meters N'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'معامل التزامن CF(N)' : 'CF(N)'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {SAUDI_TABLE_21.slice(0, 33).map((r, i) => (
                          <tr key={r.n} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                            <td className="py-1.5 px-3 text-center font-bold text-slate-900">{r.n}</td>
                            <td className="py-1.5 px-3 text-center font-black text-emerald-800">{r.cf}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Column 2: N = 34 to 66 */}
                  <div className="border border-slate-300 rounded-lg overflow-hidden max-h-[450px] overflow-y-auto relative">
                    <table className="w-full text-xs border-collapse">
                      <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs font-bold text-slate-800">
                        <tr>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'عدد العدادات (N)' : 'Meters N'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'معامل التزامن CF(N)' : 'CF(N)'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {SAUDI_TABLE_21.slice(33, 66).map((r, i) => (
                          <tr key={r.n} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                            <td className="py-1.5 px-3 text-center font-bold text-slate-900">{r.n}</td>
                            <td className="py-1.5 px-3 text-center font-black text-emerald-800">{r.cf}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Column 3: N = 67 to 100 */}
                  <div className="border border-slate-300 rounded-lg overflow-hidden max-h-[450px] overflow-y-auto relative">
                    <table className="w-full text-xs border-collapse">
                      <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs font-bold text-slate-800">
                        <tr>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'عدد العدادات (N)' : 'Meters N'}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                            {isAr ? 'معامل التزامن CF(N)' : 'CF(N)'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {SAUDI_TABLE_21.slice(66, 100).map((r, i) => (
                          <tr key={r.n} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                            <td className="py-1.5 px-3 text-center font-bold text-slate-900">{r.n}</td>
                            <td className="py-1.5 px-3 text-center font-black text-emerald-800">{r.cf}</td>
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
          {/* TABLE 4: جدول 22                                              */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === '22') && (
            <section id="table-22" className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول 22: اعتبارات تقدير الأحمال للحالات الخاصة'
                      : 'Table 22: Considerations for Load Estimation of Special Cases'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'اعتبارات الحالات الخاصة · SPECIAL CASES CONSIDERATIONS' : 'SPECIAL CASES CONSIDERATIONS'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block pt-1">
                  SEC DPS Sec 2.7
                </span>
              </div>

              {/* Table wrapper with fixed max-height & Sticky Headers */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] lg:max-h-[520px] overflow-y-auto relative">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                    <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                      <tr className="text-slate-800 font-bold">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 w-40 border-b border-slate-300 shadow-xs">
                          {isAr ? 'الحالة الخاصة' : 'Special Case'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 border-b border-slate-300 shadow-xs">
                          {isAr ? 'التعريف والوصف الرسمي' : 'Official SEC Definition'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center font-bold w-32 border-b border-slate-300 shadow-xs">
                          {isAr ? 'معامل الطلب (DF)' : 'Demand Factor'}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-4 text-center font-bold w-32 border-b border-slate-300 shadow-xs">
                          {isAr ? 'معامل التزامن (CF)' : 'Coincidence Factor'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {SAUDI_TABLE_22.map((row, idx) => (
                        <tr
                          key={row.id}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-900">
                            {isAr ? row.specialCaseAr : row.specialCase}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700 leading-relaxed text-xs">
                            {isAr ? row.definitionAr : row.definition}
                          </td>
                          <td className="py-2.5 px-4 text-center font-mono font-black text-slate-900 text-sm">
                            {row.demandFactor}
                          </td>
                          <td className="py-2.5 px-4 text-center font-mono font-black text-slate-900 text-sm">
                            {row.coincidenceFactor}
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
          {/* TABLE 5: جدول C1 (مقسوم نصين: 230V و 400V)                     */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === 'c1') && (
            <section id="table-c1" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول C1: أحمال وسعات القواطع للمباني السكنية (مقسوم نصفين لجهد 230 فولت و 400 فولت)'
                      : 'Table C1: Residential Buildings Loads & Breakers (Split Dual Voltage: 230V & 400V)'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'المباني السكنية · RESIDENTIAL BUILDINGS' : 'RESIDENTIAL BUILDINGS'}
                  </p>
                </div>

                {/* Sub-toggle for voltage view filter if needed */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-300 self-start sm:self-auto">
                  <button
                    onClick={() => setC1VoltageFilter('both')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c1VoltageFilter === 'both' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isAr ? 'النصفين معاً' : 'Both Halves'}
                  </button>
                  <button
                    onClick={() => setC1VoltageFilter('230')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c1VoltageFilter === '230' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    230 V
                  </button>
                  <button
                    onClick={() => setC1VoltageFilter('400')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c1VoltageFilter === '400' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    400 V
                  </button>
                </div>
              </div>

              {/* DUAL VOLTAGE SPLIT CONTAINER (نصفين with STICKY HEADERS) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* النصف الأول: جهد 230 / 220 فولت (Table 1) */}
                {(c1VoltageFilter === 'both' || c1VoltageFilter === '230') && (
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden flex flex-col">
                    <div className="px-4 py-2.5 bg-blue-50/80 border-b border-blue-200 flex items-center justify-between">
                      <div className="font-extrabold text-blue-900 text-xs sm:text-sm">
                        {isAr ? 'النصف الأول: جهد 230 / 220 فولت (Table 1)' : 'Half 1: 230 / 220 V Voltage (Table 1)'}
                      </div>
                      <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        220V Phase-to-Phase
                      </span>
                    </div>

                    <div className="overflow-x-auto max-h-[460px] overflow-y-auto relative">
                      <table className="w-full text-left rtl:text-right text-xs border-collapse">
                        <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                          <tr className="text-slate-800 font-bold">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'المساحة المبنية (م²)' : 'Area (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Load (kVA)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center font-bold text-blue-800 border-b border-slate-300 shadow-xs">
                              {isAr ? 'القاطع 230V (A)' : 'Breaker (A)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {SAUDI_C1_220V_TABLE.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2 px-3 text-center font-bold text-slate-900">{row.area}</td>
                              <td className="py-2 px-3 text-center text-slate-700">{row.kva}</td>
                              <td className="py-2 px-3 text-center font-black text-blue-800 bg-blue-50/30">{row.breakerA} A</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* النصف الثاني: جهد 400 فولت (Table 2) */}
                {(c1VoltageFilter === 'both' || c1VoltageFilter === '400') && (
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden flex flex-col">
                    <div className="px-4 py-2.5 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between">
                      <div className="font-extrabold text-emerald-900 text-xs sm:text-sm">
                        {isAr ? 'النصف الثاني: جهد 400 / 230 فولت (Table 2)' : 'Half 2: 400 / 230 V Voltage (Table 2)'}
                      </div>
                      <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        400V 3-Phase Standard
                      </span>
                    </div>

                    <div className="overflow-x-auto max-h-[460px] overflow-y-auto relative">
                      <table className="w-full text-left rtl:text-right text-xs border-collapse">
                        <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                          <tr className="text-slate-800 font-bold">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'المساحة المبنية (م²)' : 'Area (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Load (kVA)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center font-bold text-emerald-800 border-b border-slate-300 shadow-xs">
                              {isAr ? 'القاطع 400V (A)' : 'Breaker (A)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {SAUDI_C1_400V_TABLE.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-2 px-3 text-center font-bold text-slate-900">{row.area}</td>
                              <td className="py-2 px-3 text-center text-slate-700">{row.kva}</td>
                              <td className="py-2 px-3 text-center font-black text-emerald-800 bg-emerald-50/30">{row.breakerA} A</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Rule Note for C1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>{isAr ? 'ملاحظة كود C1:' : 'C1 Sizing Directives:'}</strong>{' '}
                  {isAr
                    ? 'في التكييف المركزي يُخصم 81 ف.أ/م² ويضاف التكييف الفعلي، وإذا تجاوزت المساحة حدود الجدول يحسب الحمل بـ 116 ف.أ/م².'
                    : 'For Central AC subtract 81 VA/m² and add actual AC. If area exceeds table limit use 116 VA/m².'}
                </span>
                <span className="font-mono text-slate-500 shrink-0">SEC DPS Sec 2.4</span>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* TABLE 6: جدول C2 (مقسوم نصين: 230V و 400V)                     */}
          {/* ============================================================== */}
          {(selectedTable === 'all' || selectedTable === 'c2') && (
            <section id="table-c2" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isAr
                      ? 'جدول C2: أحمال وسعات القواطع للمحلات والمباني التجارية (مقسوم نصفين لجهد 230 فولت و 400 فولت)'
                      : 'Table C2: Commercial Buildings Loads & Breakers (Split Dual Voltage: 230V & 400V)'}
                  </h3>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mt-1">
                    {isAr ? 'المباني التجارية · COMMERCIAL BUILDINGS' : 'COMMERCIAL BUILDINGS'}
                  </p>
                </div>

                {/* Sub-toggle for voltage view filter if needed */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-300 self-start sm:self-auto">
                  <button
                    onClick={() => setC2VoltageFilter('both')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c2VoltageFilter === 'both' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isAr ? 'النصفين معاً' : 'Both Halves'}
                  </button>
                  <button
                    onClick={() => setC2VoltageFilter('230')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c2VoltageFilter === '230' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    230 V
                  </button>
                  <button
                    onClick={() => setC2VoltageFilter('400')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      c2VoltageFilter === '400' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    400 V
                  </button>
                </div>
              </div>

              {/* DUAL VOLTAGE SPLIT CONTAINER (نصفين with STICKY HEADERS) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* النصف الأول: جهد 230 / 220 فولت (Table 3) */}
                {(c2VoltageFilter === 'both' || c2VoltageFilter === '230') && (
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden flex flex-col">
                    <div className="px-4 py-2.5 bg-blue-50/80 border-b border-blue-200 flex items-center justify-between">
                      <div className="font-extrabold text-blue-900 text-xs sm:text-sm">
                        {isAr ? 'النصف الأول: جهد 230 / 220 فولت (Table 3)' : 'Half 1: 230 / 220 V Voltage (Table 3)'}
                      </div>
                      <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        220V Phase-to-Phase
                      </span>
                    </div>

                    <div className="overflow-x-auto max-h-[460px] overflow-y-auto relative">
                      <table className="w-full text-left rtl:text-right text-xs border-collapse">
                        <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                          <tr className="text-slate-800 font-bold">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'المساحة المبنية (م²)' : 'Area (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Load (kVA)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center font-bold text-blue-800 border-b border-slate-300 shadow-xs">
                              {isAr ? 'القاطع 230V (A)' : 'Breaker (A)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {SAUDI_C2_220V_TABLE.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}>
                              <td className="py-2 px-3 text-center font-bold text-slate-900">{row.area}</td>
                              <td className="py-2 px-3 text-center text-slate-700">{row.kva}</td>
                              <td className="py-2 px-3 text-center font-black text-blue-800 bg-blue-50/30">{row.breakerA} A</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* النصف الثاني: جهد 400 فولت (Table 4) */}
                {(c2VoltageFilter === 'both' || c2VoltageFilter === '400') && (
                  <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden flex flex-col">
                    <div className="px-4 py-2.5 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between">
                      <div className="font-extrabold text-emerald-900 text-xs sm:text-sm">
                        {isAr ? 'النصف الثاني: جهد 400 / 230 فولت (Table 4)' : 'Half 2: 400 / 230 V Voltage (Table 4)'}
                      </div>
                      <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        400V 3-Phase Standard
                      </span>
                    </div>

                    <div className="overflow-x-auto max-h-[460px] overflow-y-auto relative">
                      <table className="w-full text-left rtl:text-right text-xs border-collapse">
                        <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                          <tr className="text-slate-800 font-bold">
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'المساحة المبنية (م²)' : 'Area (m²)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center border-b border-slate-300 shadow-xs">
                              {isAr ? 'الحمل المتصل (ك.ف.أ)' : 'Load (kVA)'}
                            </th>
                            <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-3 text-center font-bold text-emerald-800 border-b border-slate-300 shadow-xs">
                              {isAr ? 'القاطع 400V (A)' : 'Breaker (A)'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {SAUDI_C2_400V_TABLE.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/40' : 'bg-[#F8FAFC] hover:bg-emerald-50/40'}>
                              <td className="py-2 px-3 text-center font-bold text-slate-900">{row.area}</td>
                              <td className="py-2 px-3 text-center text-slate-700">{row.kva}</td>
                              <td className="py-2 px-3 text-center font-black text-emerald-800 bg-emerald-50/30">{row.breakerA} A</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Rule Note for C2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>{isAr ? 'ملاحظة كود C2:' : 'C2 Sizing Directives:'}</strong>{' '}
                  {isAr
                    ? 'في التكييف المركزي التجاري يُخصم 120 ف.أ/م² ويضاف التكييف الفعلي، وإذا تجاوزت المساحة حدود الجدول يحسب الحمل بـ 172 ف.أ/م².'
                    : 'For Commercial Central AC subtract 120 VA/m² and add actual AC. If area exceeds table limit use 172 VA/m².'}
                </span>
                <span className="font-mono text-slate-500 shrink-0">SEC DPS Sec 2.4</span>
              </div>
            </section>
          )}
        </div>

        {/* 5. FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق المراجعة' : 'Close Review'}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToCalculation();
            }}
            className="px-7 py-2.5 bg-[#1E3A8A] hover:bg-[#1e40af] active:bg-[#172554] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center gap-2 cursor-pointer"
          >
            <span>{isAr ? 'المتابعة إلى الخطوة 2 (الحسابات) ➔' : 'Proceed to Step 2 Calculation ➔'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
