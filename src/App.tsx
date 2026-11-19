/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PublisherPage } from './components/PublisherPage';
import { MethodologyCard } from './components/MethodologyCard';
import { MasterDetailStandardsModal } from './components/MasterDetailStandardsModal';
import { AmericanModal } from './components/AmericanModal';
import {
  CalculationStep,
  StandardId,
  OccupancyCategory,
  SaudiCategoryItem,
  SAUDI_SEC_CATEGORIES,
  IecOccupancyCategory,
  IecDemandType,
  IEC_OCCUPANCY_CATEGORIES,
  NEC_OCCUPANCY_CATEGORIES,
  BuildingItem,
  PumpItem,
  ExtraLoadItem,
  IecExtraLoadItem,
  createDefaultNecLoads,
} from './components/CalculationStep';
import { SaudiVoltageOption } from './data/c1c2TablesData';
import { STANDARDS_DATA, StandardMethodology } from './data/standardsData';
import { ChevronsUpDown, ArrowLeft } from 'lucide-react';
import { Language, TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en'); // Default is ENGLISH as requested
  const [currentView, setCurrentView] = useState<'home' | 'load-estimation' | 'publisher'>('home');
  const [currentStep, setCurrentStep] = useState<'overview' | 'calculation'>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Lifted Step 2 Project & Calculation State (persists across Step 1 <-> Step 2 navigation)
  const [projectName, setProjectName] = useState<string>('Capital Commercial Complex Phase 1');
  const [selectedStandardId, setSelectedStandardId] = useState<StandardId>('egypt');
  const [egyptSubStandard, setEgyptSubStandard] = useState<'ecp203' | 'acud'>('ecp203');
  const [egyptLocationType, setEgyptLocationType] = useState<'cities' | 'villages'>('cities');
  const [egyptBuildingCategory, setEgyptBuildingCategory] = useState<'residential' | 'commercial_admin'>('residential');
  const [egyptCityDistrictType, setEgyptCityDistrictType] = useState<'low_middle' | 'upscale'>('low_middle');
  const [acudActivityId, setAcudActivityId] = useState<string>('commercial');
  const [acudEvChargers, setAcudEvChargers] = useState<number>(2);

  const [sharedCategory, setSharedCategory] = useState<OccupancyCategory>('Offices'); // For Egyptian & Saudi
  const [iecCategory, setIecCategory] = useState<string>(IEC_OCCUPANCY_CATEGORIES[2].value); // For IEC only ('Office')
  const [necCategory, setNecCategory] = useState<string>(NEC_OCCUPANCY_CATEGORIES[12].value); // For NEC only ('Office buildings')
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(3500);

  const [saudiSelectedCategory, setSaudiSelectedCategory] = useState<SaudiCategoryItem>(SAUDI_SEC_CATEGORIES[6]);
  const [saudiLoadDensityVA, setSaudiLoadDensityVA] = useState<number>(176);
  const [saudiDemandFactor, setSaudiDemandFactor] = useState<number>(0.6);

  const [iecSelectedCategory, setIecSelectedCategory] = useState<IecOccupancyCategory>(
    IEC_OCCUPANCY_CATEGORIES[2]
  );
  const [iecDemandType, setIecDemandType] = useState<IecDemandType>('avg');
  const [iecPowerFactor, setIecPowerFactor] = useState<number | string>(0.85);

  const [saudiC1C2Voltage, setSaudiC1C2Voltage] = useState<SaudiVoltageOption>('400V');
  const [saudiC1C2Area, setSaudiC1C2Area] = useState<number | string>(350);
  const [hasAdditionalLoads, setHasAdditionalLoads] = useState<boolean>(false);
  const [needsTransformer, setNeedsTransformer] = useState<boolean>(false);

  const [buildingsList, setBuildingsList] = useState<BuildingItem[]>([
    {
      id: 'bld-1',
      name: 'Building 1',
      buildingType: 'Offices',
      iecBuildingType: IEC_OCCUPANCY_CATEGORIES[2].value,
      necBuildingType: NEC_OCCUPANCY_CATEGORIES[12].value,
      isTypeCustomized: false,
      saudiLoadEstimationType: 'standard',
      floorsCount: 7,
      floors: [
        {
          id: 'f-1',
          name: 'Ground Floor',
          floorsCount: 1,
          areaPerFloor: 500,
          demandFactor: 0.8,
          appliedLoadDensity: 4,
          necPowerDensity: 20,
          necPowerDf: 0.5,
          necHvacDensity: 50,
          necHvacDf: 1.0,
          necAdditionalKva: 0,
          necAdditionalDf: 1.0,
          loads: createDefaultNecLoads(NEC_OCCUPANCY_CATEGORIES[12].vaPerM2),
        },
        {
          id: 'f-2',
          name: 'Typical Floor',
          floorsCount: 5,
          areaPerFloor: 500,
          demandFactor: 0.8,
          appliedLoadDensity: 4,
          necPowerDensity: 20,
          necPowerDf: 0.5,
          necHvacDensity: 50,
          necHvacDf: 1.0,
          necAdditionalKva: 0,
          necAdditionalDf: 1.0,
          loads: createDefaultNecLoads(NEC_OCCUPANCY_CATEGORIES[12].vaPerM2),
        },
        {
          id: 'f-3',
          name: 'Basement Parking',
          floorsCount: 1,
          areaPerFloor: 500,
          demandFactor: 0.8,
          appliedLoadDensity: 3,
          necPowerDensity: 20,
          necPowerDf: 0.5,
          necHvacDensity: 50,
          necHvacDf: 1.0,
          necAdditionalKva: 0,
          necAdditionalDf: 1.0,
          loads: createDefaultNecLoads(3),
        },
      ],
      totalArea: 3500,
    },
  ]);

  const [numberOfAreas, setNumberOfAreas] = useState<number | string>(1);
  const [buildingAreas, setBuildingAreas] = useState<(number | string)[]>([3500]);

  const [pumps, setPumps] = useState<PumpItem[]>([
    {
      id: 1,
      name: 'PUMP-1',
      power: 10,
      unit: 'HP',
      efficiency: 95,
      pf: 0.85,
      category: 'water',
      demandFactor: 0.8,
    },
  ]);

  const [extraLoads, setExtraLoads] = useState<ExtraLoadItem[]>([
    {
      id: 1,
      name: 'ELEVATOR-1',
      power: 25,
      unit: 'kVA',
      category: 'transport',
      qty: 1,
      demandFactor: 0.8,
    },
  ]);

  const [iecExtraLoads, setIecExtraLoads] = useState<IecExtraLoadItem[]>([]);

  const [projectDiversityFactor, setProjectDiversityFactor] = useState<number | string>(0.8);
  const [necDiversityFactor, setNecDiversityFactor] = useState<number | string>(1.0);
  const [numberOfMeters, setNumberOfMeters] = useState<number | string>(1);
  const [coincidentFactor, setCoincidentFactor] = useState<number>(1);
  const [spareCapacityPercent, setSpareCapacityPercent] = useState<number | string>(20);
  const [transformerLoadingRatio, setTransformerLoadingRatio] = useState<number | string>(80);
  const [egyptTransformerSize, setEgyptTransformerSize] = useState<number>(1000);
  const [egyptTransformerQty, setEgyptTransformerQty] = useState<number | string>(1);
  const [saudiTransformerSize, setSaudiTransformerSize] = useState<number>(500);
  const [saudiTransformerQty, setSaudiTransformerQty] = useState<number | string>(1);
  const [iecTransformerSize, setIecTransformerSize] = useState<number>(1000);
  const [iecTransformerQty, setIecTransformerQty] = useState<number | string>(1);
  const [necTransformerSize, setNecTransformerSize] = useState<number>(1000);
  const [necTransformerQty, setNecTransformerQty] = useState<number | string>(1);

  const [buildingsDemandFactorOverrides, setBuildingsDemandFactorOverrides] = useState<Record<string, number | string>>({});
  const [pumpsDemandFactorOverrides, setPumpsDemandFactorOverrides] = useState<Record<string | number, number | string>>({});
  const [extraLoadsDemandFactorOverrides, setExtraLoadsDemandFactorOverrides] = useState<Record<string | number, number | string>>({});

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
        currentView={currentView}
        onBackToHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        lang={lang}
        onToggleLang={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main View Router */}
      {currentView === 'home' ? (
        <HomePage
          onOpenLoadEstimation={() => {
            setCurrentView('load-estimation');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPublisher={() => {
            setCurrentView('publisher');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : currentView === 'publisher' ? (
        <PublisherPage
          onBack={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : currentStep === 'overview' ? (
        <main className="flex-1 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 w-full">
            {/* Back to Home Page link bar */}
            <div className="mb-5">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1F2937] hover:bg-slate-700 text-blue-300 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-[#1E3A8A] border-slate-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Home Page'}</span>
              </button>
            </div>

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
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
          isDarkMode={isDarkMode}
          projectName={projectName}
          setProjectName={setProjectName}
          selectedStandardId={selectedStandardId}
          setSelectedStandardId={setSelectedStandardId}
          egyptSubStandard={egyptSubStandard}
          setEgyptSubStandard={setEgyptSubStandard}
          egyptLocationType={egyptLocationType}
          setEgyptLocationType={setEgyptLocationType}
          egyptBuildingCategory={egyptBuildingCategory}
          setEgyptBuildingCategory={setEgyptBuildingCategory}
          egyptCityDistrictType={egyptCityDistrictType}
          setEgyptCityDistrictType={setEgyptCityDistrictType}
          acudActivityId={acudActivityId}
          setAcudActivityId={setAcudActivityId}
          acudEvChargers={acudEvChargers}
          setAcudEvChargers={setAcudEvChargers}
          sharedCategory={sharedCategory}
          setSharedCategory={setSharedCategory}
          iecCategory={iecCategory}
          setIecCategory={setIecCategory}
          necCategory={necCategory}
          setNecCategory={setNecCategory}
          areaSquareMeters={areaSquareMeters}
          setAreaSquareMeters={setAreaSquareMeters}
          saudiSelectedCategory={saudiSelectedCategory}
          setSaudiSelectedCategory={setSaudiSelectedCategory}
          saudiLoadDensityVA={saudiLoadDensityVA}
          setSaudiLoadDensityVA={setSaudiLoadDensityVA}
          saudiDemandFactor={saudiDemandFactor}
          setSaudiDemandFactor={setSaudiDemandFactor}
          iecSelectedCategory={iecSelectedCategory}
          setIecSelectedCategory={setIecSelectedCategory}
          iecDemandType={iecDemandType}
          setIecDemandType={setIecDemandType}
          iecPowerFactor={iecPowerFactor}
          setIecPowerFactor={setIecPowerFactor}
          saudiC1C2Voltage={saudiC1C2Voltage}
          setSaudiC1C2Voltage={setSaudiC1C2Voltage}
          saudiC1C2Area={saudiC1C2Area}
          setSaudiC1C2Area={setSaudiC1C2Area}
          hasAdditionalLoads={hasAdditionalLoads}
          setHasAdditionalLoads={setHasAdditionalLoads}
          needsTransformer={needsTransformer}
          setNeedsTransformer={setNeedsTransformer}
          buildingsList={buildingsList}
          setBuildingsList={setBuildingsList}
          numberOfAreas={numberOfAreas}
          setNumberOfAreas={setNumberOfAreas}
          buildingAreas={buildingAreas}
          setBuildingAreas={setBuildingAreas}
          pumps={pumps}
          setPumps={setPumps}
          extraLoads={extraLoads}
          setExtraLoads={setExtraLoads}
          iecExtraLoads={iecExtraLoads}
          setIecExtraLoads={setIecExtraLoads}
          projectDiversityFactor={projectDiversityFactor}
          setProjectDiversityFactor={setProjectDiversityFactor}
          necDiversityFactor={necDiversityFactor}
          setNecDiversityFactor={setNecDiversityFactor}
          numberOfMeters={numberOfMeters}
          setNumberOfMeters={setNumberOfMeters}
          coincidentFactor={coincidentFactor}
          setCoincidentFactor={setCoincidentFactor}
          spareCapacityPercent={spareCapacityPercent}
          setSpareCapacityPercent={setSpareCapacityPercent}
          transformerLoadingRatio={transformerLoadingRatio}
          setTransformerLoadingRatio={setTransformerLoadingRatio}
          egyptTransformerSize={egyptTransformerSize}
          setEgyptTransformerSize={setEgyptTransformerSize}
          egyptTransformerQty={egyptTransformerQty}
          setEgyptTransformerQty={setEgyptTransformerQty}
          saudiTransformerSize={saudiTransformerSize}
          setSaudiTransformerSize={setSaudiTransformerSize}
          saudiTransformerQty={saudiTransformerQty}
          setSaudiTransformerQty={setSaudiTransformerQty}
          iecTransformerSize={iecTransformerSize}
          setIecTransformerSize={setIecTransformerSize}
          iecTransformerQty={iecTransformerQty}
          setIecTransformerQty={setIecTransformerQty}
          necTransformerSize={necTransformerSize}
          setNecTransformerSize={setNecTransformerSize}
          necTransformerQty={necTransformerQty}
          setNecTransformerQty={setNecTransformerQty}
          buildingsDemandFactorOverrides={buildingsDemandFactorOverrides}
          setBuildingsDemandFactorOverrides={setBuildingsDemandFactorOverrides}
          pumpsDemandFactorOverrides={pumpsDemandFactorOverrides}
          setPumpsDemandFactorOverrides={setPumpsDemandFactorOverrides}
          extraLoadsDemandFactorOverrides={extraLoadsDemandFactorOverrides}
          setExtraLoadsDemandFactorOverrides={setExtraLoadsDemandFactorOverrides}
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
