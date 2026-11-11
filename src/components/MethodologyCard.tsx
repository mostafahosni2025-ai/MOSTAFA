import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { StandardMethodology } from '../data/standardsData';
import { FlagIcon } from './Flags';
import { Language, TRANSLATIONS } from '../data/translations';

interface MethodologyCardProps {
  standard: StandardMethodology;
  isExpanded: boolean;
  onToggle: () => void;
  onShowDetails: (standard: StandardMethodology) => void;
  lang: Language;
  isDarkMode?: boolean;
}

export const MethodologyCard: React.FC<MethodologyCardProps> = ({
  standard,
  isExpanded,
  onToggle,
  onShowDetails,
  lang,
  isDarkMode = false,
}) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const countryName = isAr ? standard.countryAr : standard.country;
  const codeTitle = isAr ? standard.codeNameAr : standard.codeName;
  const refText = isAr ? standard.standardReferenceAr : standard.standardReference;
  const bullet1Text = isAr ? standard.bullet1Ar : standard.bullet1;
  const bullet2Text = isAr ? standard.bullet2Ar : standard.bullet2;

  return (
    <div
      className={`rounded-2xl shadow-xs hover:shadow-md border transition-all duration-300 flex flex-col justify-between overflow-hidden group bg-white dark:bg-gray-800 border-slate-200/90 dark:border-gray-700 text-slate-800 dark:text-gray-200 ${standard.borderColor} border-l-[6px] rtl:border-l-0 rtl:border-r-[6px]`}
    >
      {/* Card Header (Collapsed State content) */}
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer select-none flex items-center justify-between gap-4.5"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${codeTitle} (${countryName})`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Left/Right Side: Flag + Text Container */}
        <div className="flex items-center gap-4.5 min-w-0">
          <FlagIcon
            country={standard.id}
            className="w-16 h-11 shadow-sm border border-slate-300 rounded-md shrink-0"
          />
          <div className="min-w-0">
            <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {countryName}
            </span>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight truncate ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {codeTitle}
            </h2>
          </div>
        </div>

        {/* Right/Left Side: Circular Gray Button with Chevron Down */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border shadow-2xs ${
            isDarkMode
              ? (isExpanded ? 'rotate-180 bg-slate-700 text-white border-slate-600' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700')
              : (isExpanded ? 'rotate-180 bg-slate-200 text-slate-900 border-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200')
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.25]" />
        </div>
      </div>

      {/* Expanded State (Accordion Area) */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0 animate-in fade-in duration-200">
          {/* Divider line below title */}
          <div className={`border-t my-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`} />

          {/* Methodology Bullet Points with fully localized text and high clarity */}
          <div className={`space-y-3.5 text-sm sm:text-base leading-relaxed font-normal ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}>
            <div className="flex items-start gap-3">
              <span className={`inline-block w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                isDarkMode ? 'bg-blue-400' : 'bg-[#1E3A8A]'
              }`} />
              <p className="flex-1 leading-relaxed">
                {bullet1Text}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className={`inline-block w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                isDarkMode ? 'bg-blue-400' : 'bg-[#1E3A8A]'
              }`} />
              <p className="flex-1 leading-relaxed">
                {bullet2Text}
              </p>
            </div>
          </div>

          {/* Technical Summary & Show Details Action */}
          <div className={`mt-5 pt-3.5 border-t flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm ${
            isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs px-3 py-1 rounded-md border font-bold ${
                isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {refText}
              </span>
              <span>·</span>
              <span className={`font-mono font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{standard.frequency}</span>
            </div>

            {/* Action button "Show details" / "عرض التفاصيل" */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(standard);
              }}
              className={`font-extrabold text-sm sm:text-base hover:underline cursor-pointer inline-flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#1E3A8A] hover:text-blue-900'
              }`}
            >
              <span>{t.showDetails}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
