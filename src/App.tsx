/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MethodologyCard } from './components/MethodologyCard';
import { MasterDetailStandardsModal } from './components/MasterDetailStandardsModal';
import { AmericanModal } from './components/AmericanModal';
import { CalculationStep } from './components/CalculationStep';
import { STANDARDS_DATA, StandardMethodology } from './data/standardsData';
import { ChevronsUpDown } from 'lucide-react';
import { Language, TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en'); // Default is ENGLISH as requested
  const [currentStep, setCurrentStep] = useState<'overview' | 'calculation'>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Track expanded state for each card independently (key = standard id)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    egypt: true, // initial expanded view for immediate preview
    saudi: false,
    europe: false,
    usa: false,
  });

  const [activeModalStandard, setActiveModalStandard] = useState<StandardMethodology | null>(null);

  const t = TRANSLATIONS[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllExpanded = Object.values(expandedCards).every(Boolean);

  const toggleExpandAll = () => {
    const nextState = !areAllExpanded;
    const updated: Record<string, boolean> = {};
    STANDARDS_DATA.forEach((s) => {
      updated[s.id] = nextState;
    });
    setExpandedCards(updated);
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-[#F4F6F8] dark:bg-gray-900 text-slate-800 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-900"
    >
      {/* 1. Header (Top): Dark Blue (#1E3A8A) with Language & Dark Mode Switcher */}
      <Header
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        lang={lang}
        onToggleLang={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main View Router */}
      {currentStep === 'overview' ? (
        <main className="flex-1 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 w-full">
            {/* 3. Top Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                {/* Main Title: "Explore Load Estimation Methodologies" */}
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {t.mainTitle}
                </h2>

                {/* Subtitle */}
                <p className={`text-base sm:text-lg max-w-3xl leading-relaxed font-normal transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {t.subtitle}
                </p>
              </div>

              {/* Quick utility controls for desktop users */}
              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={toggleExpandAll}
                  className={`px-4 py-2 border rounded-xl text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#1F2937] hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                  }`}
                  title="Expand or collapse all methodology cards"
                >
                  <ChevronsUpDown className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                  <span>{areAllExpanded ? t.collapseAll : t.expandAll}</span>
                </button>
              </div>
            </div>

            {/* 4. Grid Layout (2x2 Grid for 4 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {STANDARDS_DATA.map((standard) => (
                <MethodologyCard
                  key={standard.id}
                  standard={standard}
                  isExpanded={Boolean(expandedCards[standard.id])}
                  onToggle={() => toggleCard(standard.id)}
                  onShowDetails={(std) => setActiveModalStandard(std)}
                  lang={lang}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>

          {/* 7. Footer (Bottom) */}
          <Footer
            onGoToCalculation={() => setCurrentStep('calculation')}
            lang={lang}
            isDarkMode={isDarkMode}
          />
        </main>
      ) : (
        /* Step 2 View: Calculation & Selection Engine */
        <CalculationStep
          onBackToOverview={() => setCurrentStep('overview')}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Engineering Standards Modal */}
      {activeModalStandard && (
        activeModalStandard.id === 'usa' ? (
          <AmericanModal
            isOpen={true}
            onClose={() => setActiveModalStandard(null)}
            onProceedToCalculation={() => {
              setActiveModalStandard(null);
              setCurrentStep('calculation');
            }}
            lang={lang}
            onToggleLang={toggleLanguage}
            onSelectStandard={(std) => setActiveModalStandard(std)}
          />
        ) : (
          <MasterDetailStandardsModal
            standard={activeModalStandard}
            onClose={() => setActiveModalStandard(null)}
            onProceedToCalculation={() => {
              setActiveModalStandard(null);
              setCurrentStep('calculation');
            }}
            lang={lang}
            onToggleLang={toggleLanguage}
            onSelectStandard={(std) => setActiveModalStandard(std)}
          />
        )
      )}
    </div>
  );
}
