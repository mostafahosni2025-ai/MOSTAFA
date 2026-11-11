import React from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onGoToCalculation: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onGoToCalculation, lang, isDarkMode = false }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="border-t shadow-md sticky bottom-0 z-30 select-none transition-colors duration-300 bg-white dark:bg-gray-800 border-slate-200/90 dark:border-gray-700 text-slate-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Review Text */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm">
          <Info className={`w-5 h-5 shrink-0 hidden sm:inline-block ${
            isDarkMode ? 'text-blue-400' : 'text-blue-700'
          }`} />
          <span className={`font-semibold ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {t.footerReviewText}
          </span>
        </div>

        {/* Right: Prominent Dark Blue button "Go to calculation ➔" */}
        <button
          type="button"
          onClick={onGoToCalculation}
          className="w-full sm:w-auto px-7 py-3 bg-[#1E3A8A] hover:bg-[#1e40af] active:bg-[#172554] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        >
          <span>{t.goToCalculation}</span>
        </button>
      </div>
    </footer>
  );
};
