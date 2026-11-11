import React from 'react';
import { Zap, Globe, Sun, Moon } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentStep?: 'overview' | 'calculation';
  onNavigate?: (step: 'overview' | 'calculation') => void;
  lang: Language;
  onToggleLang: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep = 'overview',
  onNavigate,
  lang,
  onToggleLang,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="bg-[#1E3A8A] dark:bg-gray-800 text-white shadow-md select-none sticky top-0 z-40 transition-colors duration-300 border-b border-blue-900/40 dark:border-gray-700">
      {/* Main Header Bar */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left Side: App Icon + App Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-900/90 dark:bg-blue-950 border border-blue-400/40 dark:border-blue-500/30 flex items-center justify-center shadow-md text-amber-300 shrink-0">
            <Zap className="w-6 h-6 fill-amber-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              {currentStep === 'calculation' ? (lang === 'ar' ? 'حساب تقدير الأحمال' : 'Load Estimation Calculation') : t.appName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/90 dark:text-blue-300/80 font-medium">
              {currentStep === 'calculation'
                ? (lang === 'ar' ? 'المرحلة 2: تقدير الأحمال والمحول المطلوب' : 'Step 2: Load Estimation & Required Transformer')
                : t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Step Navigation + Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Dark / Light Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center justify-center p-2 bg-blue-950/70 hover:bg-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-400/50 dark:border-slate-600 rounded-lg text-white transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              title={isDarkMode ? (lang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to Light Mode') : (lang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to Dark Mode')}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-amber-200 transition-transform duration-300" />
              )}
            </button>
          )}

          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/70 hover:bg-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-400/50 dark:border-slate-600 rounded-lg text-xs sm:text-sm font-bold text-white transition-all shadow-2xs hover:shadow-xs cursor-pointer"
            title={lang === 'en' ? 'تبديل إلى اللغة العربية' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Workflow step indicator */}
          <div className="hidden md:flex items-center bg-blue-950/80 dark:bg-slate-800/90 border border-blue-700/60 dark:border-slate-700 rounded-lg p-1 text-xs sm:text-sm">
            <button
              onClick={() => onNavigate?.('overview')}
              className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                currentStep === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-200 hover:text-white dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {t.step1}
            </button>
            <span className="text-blue-400 dark:text-slate-500 px-1.5">›</span>
            <button
              onClick={() => onNavigate?.('calculation')}
              className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                currentStep === 'calculation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-200 hover:text-white dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {t.step2}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
