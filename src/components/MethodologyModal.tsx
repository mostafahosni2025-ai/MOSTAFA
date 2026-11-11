import React, { useState } from 'react';
import { X, ExternalLink, Edit3, Zap, Info, Globe } from 'lucide-react';
import { StandardMethodology } from '../data/standardsData';
import { FlagIcon } from './Flags';
import { Language, TRANSLATIONS, ACUD_ACTIVITIES_TRANSLATIONS } from '../data/translations';

interface MethodologyModalProps {
  standard: StandardMethodology | null;
  onClose: () => void;
  onProceedToCalculation: () => void;
  lang: Language;
  onToggleLang?: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  standard,
  onClose,
  onProceedToCalculation,
  lang,
  onToggleLang,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'egypt_standard' | 'nac_acud'>('egypt_standard');

  // Exact Verified Document Links provided by the user
  const [egyptOnlineUrl, setEgyptOnlineUrl] = useState(
    'https://www.scribd.com/document/689302277/Load-Estimation-EGY-CODE'
  );
  const [acudOnlineUrl, setAcudOnlineUrl] = useState(
    'https://www.scribd.com/document/651983175/%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D8%B7%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D8%B5%D9%85%D8%A9'
  );

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  if (!standard) return null;

  const isEgypt = standard.id === 'egypt';
  const activeUrl = activeTab === 'egypt_standard' ? egyptOnlineUrl : acudOnlineUrl;

  const handleStartEditUrl = (currentUrl: string) => {
    setTempUrl(currentUrl);
    setIsEditingUrl(true);
  };

  const handleSaveUrl = () => {
    if (activeTab === 'egypt_standard') {
      setEgyptOnlineUrl(tempUrl.trim() || egyptOnlineUrl);
    } else {
      setAcudOnlineUrl(tempUrl.trim() || acudOnlineUrl);
    }
    setIsEditingUrl(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Dialog Window: ~80% of screen width and height, Windows 11 desktop styling */}
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-[88vw] max-w-5xl h-[86vh] max-h-[86vh] flex flex-col overflow-hidden text-[#111827] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. HEADER (Top) */}
        <div className="px-6 py-4.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          {/* Left: Egyptian Flag + small tag + Title in dark blue */}
          <div className="flex items-center gap-4">
            <FlagIcon country={standard.id} className="w-15 h-10 rounded-sm shadow-xs border border-slate-300" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isEgypt ? t.modalHeaderTag : `${standard.country.toUpperCase()} METHODOLOGY DOSSIER`}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] tracking-tight leading-tight">
                {isEgypt ? t.modalTitle : `${standard.codeName} Details`}
              </h2>
            </div>
          </div>

          {/* Right: Language toggle (EN | AR) + Close button (X) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-full border border-slate-300 shadow-2xs transition-colors cursor-pointer"
              title={lang === 'en' ? 'تبديل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>EN | AR</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Close dialog"
              title="Close Review (Esc)"
            >
              <X className="w-4 h-4 stroke-[2.25]" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with high-clarity desktop typography */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#F4F6F8]/60 text-slate-800">
          {/* 2. TOP INFO BAR (Clean Focus: Frequency & Voltage Only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: GRID FREQUENCY -> 50 Hz */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.gridFrequency}
                </span>
                <span className="font-mono font-black text-[#111827] text-2xl mt-1 block">
                  50 Hz
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1E3A8A] border border-blue-200 flex items-center justify-center font-extrabold text-sm">
                Hz
              </div>
            </div>

            {/* Card 2: NOMINAL VOLTAGE -> 220V */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.nominalVoltage}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono font-black text-[#111827] text-2xl">
                    220V
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    / 380V (3-Phase 4-Wire)
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600 fill-amber-500" />
              </div>
            </div>
          </div>

          {/* 3. TOGGLE SWITCH & DIRECT VERIFIED ONLINE LINK BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            {/* Segmented Control Pill Toggle */}
            <div className="inline-flex p-1.5 bg-slate-100 border border-slate-300 rounded-xl sm:rounded-full self-start">
              {/* Option 1: Standard Egyptian Code */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('egypt_standard');
                  setIsEditingUrl(false);
                }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg sm:rounded-full transition-all duration-150 cursor-pointer ${
                  activeTab === 'egypt_standard'
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'bg-transparent text-slate-700 hover:text-slate-900'
                }`}
              >
                {t.tabStandard}
              </button>

              {/* Option 2: New Administrative Capital Code */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('nac_acud');
                  setIsEditingUrl(false);
                }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg sm:rounded-full transition-all duration-150 cursor-pointer ${
                  activeTab === 'nac_acud'
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'bg-transparent text-slate-700 hover:text-slate-900'
                }`}
              >
                {t.tabACUD}
              </button>
            </div>

            {/* Direct Document Action Link (Uses real verified URLs provided by user) */}
            <div className="flex items-center gap-2.5 self-start lg:self-auto">
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e40af] text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all hover:shadow cursor-pointer"
                title={`Open official Scribd document: ${activeUrl}`}
              >
                <ExternalLink className="w-4 h-4 text-blue-200" />
                <span>
                  {activeTab === 'egypt_standard' ? t.onlinePdfBtnEgypt : t.onlinePdfBtnACUD}
                </span>
              </a>

              <button
                type="button"
                onClick={() => handleStartEditUrl(activeUrl)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
                title="Edit / verify URL link"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* URL Editor input modal bar if user wants custom link */}
          {isEditingUrl && (
            <div className="bg-blue-50 border border-blue-300 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-3 animate-in fade-in duration-150">
              <span className="text-xs font-bold text-blue-900 shrink-0">Custom Web Link (URL):</span>
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="flex-1 w-full bg-white border border-blue-300 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                placeholder="https://www.scribd.com/..."
              />
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveUrl}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Save URL
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingUrl(false)}
                  className="px-3.5 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Active Link Path Indicator */}
          <div className="px-3 py-1.5 bg-slate-100/90 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 font-mono flex items-center justify-between gap-2 overflow-hidden">
            <span className="truncate">
              <strong>Active Document Link:</strong> {activeUrl}
            </span>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-bold shrink-0 ml-2"
            >
              Direct Link ↗
            </a>
          </div>

          {/* 4. MAIN CONTENT AREA */}
          {activeTab === 'egypt_standard' ? (
            /* =========================================================================
               TAB 1: Standard Egyptian Code & Distribution Regulations (FULL IMAGE 1 DATA)
               ========================================================================= */
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Notice banner */}
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-[#1E3A8A]">
                <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">
                  {t.noticeDistribution}
                </span>
              </div>

              {/* 1. Main Design Capacity Table */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="bg-slate-100 p-4 border-b border-slate-200 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between">
                  <span>{t.tableDesignCapacityTitle}</span>
                  <span className="font-mono text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 text-slate-800">
                    kVA / 100 m²
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                    <thead className="sticky top-0 z-20 bg-slate-100 text-slate-800 border-b border-slate-300 font-bold shadow-2xs">
                      <tr>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3.5 px-5 border-r rtl:border-r-0 rtl:border-l border-slate-300">
                          {t.colDescription}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3.5 px-5 text-center border-r rtl:border-r-0 rtl:border-l border-slate-300 w-36 sm:w-44 font-extrabold text-slate-900">
                          {t.colResidential}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3.5 px-5 text-center w-44 sm:w-56 font-extrabold text-slate-900">
                          {t.colCommercialAdmin}
                        </th>
                      </tr>
                    </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {/* Row 1: Villages */}
                    <tr className="bg-white hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-5 font-semibold text-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-200">
                        {t.rowVillages}
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-200 text-base">
                        2
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 text-base">
                        5
                      </td>
                    </tr>
                    {/* Row 2: Cities - Low/Middle income */}
                    <tr className="bg-[#F8FAFC] hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-5 border-r rtl:border-r-0 rtl:border-l border-slate-200">
                        <span className="font-bold text-slate-900 block">{t.rowCitiesPopular}</span>
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-200 text-base">
                        4
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 text-base">
                        10
                      </td>
                    </tr>
                    {/* Row 3: Cities - Upscale / Affluent */}
                    <tr className="bg-white hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-5 border-r rtl:border-r-0 rtl:border-l border-slate-200">
                        <span className="font-bold text-slate-900 block">{t.rowCitiesAffluent}</span>
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-200 text-base">
                        8
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-black text-slate-900 text-base">
                        10
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

              {/* 2. Mandatory Minimum Additional Loads */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                  <span>{t.additionalLoadsTitle}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{t.singleElevator}</span>
                    <span className="font-mono font-black text-[#1E3A8A] text-base">9 kVA</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{t.singleWaterPump}</span>
                    <span className="font-mono font-black text-[#1E3A8A] text-base">5 kVA</span>
                  </div>
                </div>
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  ⚠️ <strong>{t.centralHvacNote}</strong>
                </div>
              </div>

              {/* 3. Detailed Rules: Basements, Garages, Overall Area, Outdoor */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                  {t.areaRulesTitle}
                </h4>
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                    <p className="flex-1">
                      {t.ruleBasementGarage}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                    <p className="flex-1">
                      {t.ruleOverallArea}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                    <p className="flex-1">
                      {t.ruleOutdoorSpaces}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
               TAB 2: New Administrative Capital (ACUD 2.2 Load Estimate - FULL IMAGE 2)
               ========================================================================= */
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Document Header Section 2.2 */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  {t.acudHeaderTag}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {t.acudTitle}
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
                  <p>{t.acudClauseA}</p>
                  <p>{t.acudClauseB}</p>
                </div>
              </div>

              {/* Table 1: Load Estimate Factors (KVA / 100 m²) */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="bg-slate-100 p-4 border-b border-slate-200 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between">
                  <span>{t.tableFactorsTitle}</span>
                  <span className="font-mono text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 text-slate-800">
                    kVA / 100 m² (*)
                  </span>
                </div>
                <div className="overflow-x-auto max-h-[460px] overflow-y-auto relative">
                  <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                    <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                      <tr className="text-slate-800 font-bold">
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-5 border-b border-slate-300 shadow-xs">
                          {t.colProjectActivity}
                        </th>
                        <th className="sticky top-0 z-20 bg-slate-100 py-3 px-5 text-right rtl:text-left w-48 font-black text-slate-900 border-b border-slate-300 shadow-xs">
                          kVA / 100 m² (*)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium">
                      {Object.entries(ACUD_ACTIVITIES_TRANSLATIONS).map(([key, item], idx) => (
                        <tr
                          key={key}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#F8FAFC] hover:bg-blue-50/40'}
                        >
                          <td className="py-3 px-5 font-semibold text-slate-800">
                            {lang === 'ar' ? item.ar : item.en}
                          </td>
                          <td className="py-3 px-5 text-right rtl:text-left font-mono font-black text-slate-900 text-sm sm:text-base">
                            {item.factor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2 & Table 3 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Table 2: Node Demand Factor (D.F.) */}
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="bg-slate-100 p-3.5 border-b border-slate-200 font-bold text-slate-900 text-sm">
                    {t.tableNodeDemandTitle}
                  </div>
                  <div className="overflow-x-auto max-h-[280px] overflow-y-auto relative">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                      <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                        <tr className="text-slate-800 font-bold">
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-4 border-b border-slate-300 shadow-xs">
                            {t.colNode}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-4 text-right rtl:text-left font-bold text-slate-900 border-b border-slate-300 shadow-xs">
                            D.F.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-medium">
                        {[
                          { node: 'Coffree', val: '0.8' },
                          { node: 'Feeder pillar \\ Submain DB', val: '0.8' },
                          { node: 'Transformer', val: '0.8' },
                          { node: 'Distributor', val: '0.8' },
                        ].map((r, i) => (
                          <tr key={r.node} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50/30' : 'bg-[#F8FAFC] hover:bg-blue-50/30'}>
                            <td className="py-3 px-4 font-semibold text-slate-800">{r.node}</td>
                            <td className="py-3 px-4 text-right rtl:text-left font-mono font-black text-slate-900">
                              {r.val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 3: EV Car Charger Load */}
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="bg-slate-100 p-3.5 border-b border-slate-200 font-bold text-slate-900 text-sm">
                    {t.tableEvChargerTitle}
                  </div>
                  <div className="overflow-x-auto max-h-[280px] overflow-y-auto relative">
                    <table className="w-full text-left rtl:text-right text-xs sm:text-sm border-collapse">
                      <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 shadow-xs">
                        <tr className="text-slate-800 font-bold">
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-4 border-b border-slate-300 shadow-xs">
                            {t.colProjectActivity}
                          </th>
                          <th className="sticky top-0 z-20 bg-slate-100 py-2.5 px-4 text-right rtl:text-left font-bold text-slate-900 border-b border-slate-300 shadow-xs">
                            {t.colEvChargerLoad}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-medium">
                        {[
                          { act: lang === 'ar' ? 'المنطقة السكنية (Residential Area)' : 'Residential Area', p: '11 kW' },
                          { act: lang === 'ar' ? 'المنطقة الإدارية (Administration Area)' : 'Administration Area', p: '22 kW' },
                          { act: lang === 'ar' ? 'المنطقة التجارية (Commercial Area)' : 'Commercial Area', p: '50 kW' },
                        ].map((r, i) => (
                          <tr key={r.act} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50/30' : 'bg-[#F8FAFC] hover:bg-blue-50/30'}>
                            <td className="py-3 px-4 font-semibold text-slate-800">{r.act}</td>
                            <td className="py-3 px-4 text-right rtl:text-left font-mono font-black text-slate-900">
                              {r.p}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. FOOTER */}
        <div className="px-6 py-4.5 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
          {/* Left: A secondary button "Close Review" (outline style) */}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
          >
            {t.closeReview}
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
            <span>{t.proceedCalculation}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
