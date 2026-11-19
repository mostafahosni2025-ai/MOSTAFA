import React from 'react';
import { Zap, Globe, Sun, Moon, ArrowLeft } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentView?: 'home' | 'load-estimation' | 'publisher';
  onBackToHome?: () => void;
  currentStep?: 'overview' | 'calculation';
  onNavigate?: (step: 'overview' | 'calculation') => void;
  lang: Language;
  onToggleLang: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = 'load-estimation',
  onBackToHome,
  currentStep = 'overview',
  onNavigate,
  lang,
  onToggleLang,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const t = TRANSLATIONS[lang];
  const isHome = currentView === 'home';
  const isLoadEstimation = currentView === 'load-estimation';

  return (
    <header className="bg-[#1E3A8A] dark:bg-gray-800 text-white shadow-md select-none sticky top-0 z-40 transition-colors duration-300 border-b border-blue-900/40 dark:border-gray-700">
      {/* Main Header Bar */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left Side: App Icon + App Name (Hidden on Home Page only; clicks back to Home Page elsewhere) */}
        {!isHome ? (
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-3.5 min-w-0 text-left rtl:text-right cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-300/70 rounded-xl"
            title={lang === 'ar' ? 'الصفحة الرئيسية' : 'Home Page'}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-900/90 dark:bg-blue-950 border border-blue-400/40 dark:border-blue-500/30 flex items-center justify-center shadow-md text-amber-300 shrink-0">
              <Zap className="w-6 h-6 fill-amber-300" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight truncate">
                {!isLoadEstimation
                  ? (lang === 'ar' ? 'منصة التصميم الكهربائي' : 'Electrical Design Suite')
                  : currentStep === 'calculation'
                  ? (lang === 'ar' ? 'حساب تقدير الأحمال' : 'Load Estimation Calculation')
                  : t.appName}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/90 dark:text-blue-300/80 font-medium truncate">
                {!isLoadEstimation
                  ? (lang === 'ar' ? 'بوابة الحسابات الهندسية الكهربائية' : 'Electrical Engineering Calculation Portal')
                  : currentStep === 'calculation'
                  ? (lang === 'ar' ? 'المرحلة 2: تقدير الأحمال والمحول المطلوب' : 'Step 2: Load Estimation & Required Transformer')
                  : t.appSubtitle}
              </p>
            </div>
          </button>
        ) : (
          <div className="h-11" aria-hidden="true" />
        )}

        {/* Right Side: Back to Home + Step Navigation + Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Back to Home Page button when inside Load Estimation app */}
          {!isHome && onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-950/70 hover:bg-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-400/50 dark:border-slate-600 rounded-lg text-xs sm:text-sm font-bold text-white transition-all shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              title={lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home Page'}
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'الصفحة الرئيسية' : 'Back to Home Page'}
              </span>
            </button>
          )}

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
            className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/70 hover:bg-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-400/50 dark:border-slate-600 rounded-lg text-xs sm:text-sm font-bold text-white transition-all shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            title={lang === 'en' ? 'تبديل إلى اللغة العربية' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Workflow step indicator (only in Load Estimation view) */}
          {isLoadEstimation && (
            <div className="hidden md:flex items-center bg-blue-950/80 dark:bg-slate-800/90 border border-blue-700/60 dark:border-slate-700 rounded-lg p-1 text-xs sm:text-sm shrink-0">
              <button
                onClick={() => onNavigate?.('overview')}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap ${
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
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentStep === 'calculation'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-200 hover:text-white dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.step2}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
