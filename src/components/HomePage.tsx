import React, { useState } from 'react';
import {
  PlugZap,
  Plug,
  Network,
  ChevronDown,
  ChevronRight,
  Calculator,
  Lightbulb,
  Wind,
  ArrowUpDown,
  LayoutGrid,
  Zap,
  Power,
  BatteryCharging,
  GitBranch,
  Server,
  Layers,
  Anchor,
  CloudLightning,
  Activity,
  ShieldAlert,
  Gauge,
  FileText,
  Box,
  Building2,
  Landmark,
  Inbox,
  Route,
  ToggleRight,
  Sliders,
  Share2,
  ClipboardList,
  Briefcase,
  Camera,
  Bell,
  Volume2,
  Wifi,
  Phone,
  KeyRound,
  HeartPulse,
  Tv,
  Users,
  Radio,
  Cpu,
  Workflow,
  FileSpreadsheet,
  BookOpen,
  Code,
} from 'lucide-react';
import { Language } from '../data/translations';

interface HomePageProps {
  onOpenLoadEstimation: () => void;
  onOpenPublisher: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

type DivisionId = 'low-voltage' | 'light-current';

interface DivisionModule {
  id: string;
  titleEn: string;
  titleAr: string;
  available: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const LOW_VOLTAGE_MODULES: DivisionModule[] = [
  { id: 'load-estimation', titleEn: 'Load Estimation', titleAr: 'تقدير الأحمال (Load Estimation)', available: true, icon: Calculator },
  { id: 'lighting', titleEn: 'Lighting (Internal / External)', titleAr: 'الإنارة (داخلية / خارجية)', available: false, icon: Lightbulb },
  { id: 'sockets-power-outlets', titleEn: 'Sockets & Power Outlets', titleAr: 'البرايز ومخارج القوى', available: false, icon: Plug },
  { id: 'hvac-loads', titleEn: 'HVAC Loads', titleAr: 'أحمال التكييف (HVAC)', available: false, icon: Wind },
  { id: 'elevator-loads', titleEn: 'Elevator Loads', titleAr: 'أحمال المصاعد', available: false, icon: ArrowUpDown },
  { id: 'panel-design', titleEn: 'Panel Design', titleAr: 'تصميم اللوحات الكهربائية', available: false, icon: LayoutGrid },
  { id: 'transformer-selection', titleEn: 'Transformer Selection', titleAr: 'اختيار المحولات', available: false, icon: Zap },
  { id: 'generator-selection', titleEn: 'Generator Selection', titleAr: 'اختيار المولدات', available: false, icon: Power },
  { id: 'ups-selection', titleEn: 'UPS Selection', titleAr: 'اختيار أنظمة UPS', available: false, icon: BatteryCharging },
  { id: 'distributor', titleEn: 'Distributor', titleAr: 'الموزع الكهربائي (Distributor)', available: false, icon: GitBranch },
  { id: 'rmu', titleEn: 'RMU', titleAr: 'وحدة الربط الحلقي (RMU)', available: false, icon: Server },
  { id: 'cable-tray-sizing', titleEn: 'Cable Tray Sizing', titleAr: 'تحديد مقاسات حوامل الكابلات', available: false, icon: Layers },
  { id: 'earthing', titleEn: 'Earthing', titleAr: 'نظام التأريض (Earthing)', available: false, icon: Anchor },
  { id: 'lightning-protection', titleEn: 'Lightning Protection', titleAr: 'الحماية من الصواعق', available: false, icon: CloudLightning },
  { id: 'voltage-drop', titleEn: 'Voltage Drop', titleAr: 'هبوط الجهد (Voltage Drop)', available: false, icon: Activity },
  { id: 'short-circuit', titleEn: 'Short Circuit', titleAr: 'تيار القصر (Short Circuit)', available: false, icon: ShieldAlert },
  { id: 'power-factor-correction', titleEn: 'Power Factor Correction (Capacitor Bank)', titleAr: 'تحسين معامل القدرة (لوحات المكثفات)', available: false, icon: Gauge },
  { id: 'specs', titleEn: 'Specs', titleAr: 'المواصفات الفنية (Specs)', available: false, icon: FileText },
  { id: 'spaces', titleEn: 'Spaces', titleAr: 'فراغات الغرف الكهربائية (Spaces)', available: false, icon: Box },
  { id: 'package-substation', titleEn: 'Package Substation', titleAr: 'محطة المحولات المدمجة (Package Substation)', available: false, icon: Building2 },
  { id: 'pillar', titleEn: 'Pillar', titleAr: 'أعمدة التوزيع (Pillar)', available: false, icon: Landmark },
  { id: 'coffret', titleEn: 'Coffret', titleAr: 'الكوفريهات (Coffret)', available: false, icon: Inbox },
  { id: 'cable-routing', titleEn: 'Cable Routing', titleAr: 'مسارات الكابلات (Cable Routing)', available: false, icon: Route },
  { id: 'circuit-breaker', titleEn: 'Circuit Breaker', titleAr: 'القواطع الكهربائية (Circuit Breaker)', available: false, icon: ToggleRight },
  { id: 'loads-static-dynamic', titleEn: 'Loads (Static / Dynamic)', titleAr: 'الأحمال (الاستاتيكية / الديناميكية)', available: false, icon: Sliders },
  { id: 'sld', titleEn: 'SLD', titleAr: 'المخطط الأحادي (SLD)', available: false, icon: Share2 },
  { id: 'boq', titleEn: 'BOQ', titleAr: 'حصر الكميات (BOQ)', available: false, icon: ClipboardList },
  { id: 'tender', titleEn: 'Tender', titleAr: 'مستندات الطرح والمناقصة (Tender)', available: false, icon: Briefcase },
];

const LIGHT_CURRENT_MODULES: DivisionModule[] = [
  { id: 'fire-alarm', titleEn: 'Fire Alarm System', titleAr: 'نظام إنذار الحريق (Fire Alarm)', available: false, icon: Bell },
  { id: 'sound-system', titleEn: 'Sound System', titleAr: 'نظام الصوتيات والإذاعة الداخلية (Sound System)', available: false, icon: Volume2 },
  { id: 'data-network', titleEn: 'Data Network', titleAr: 'شبكة المعلومات والبيانات (Data Network)', available: false, icon: Wifi },
  { id: 'telephone-system', titleEn: 'Telephone System', titleAr: 'نظام التليفونات (Telephone System)', available: false, icon: Phone },
  { id: 'access-control', titleEn: 'Access Control System', titleAr: 'نظام التحكم في الدخول (Access Control)', available: false, icon: KeyRound },
  { id: 'nurse-call', titleEn: 'Nurse Call System', titleAr: 'نظام استدعاء الممرضات (Nurse Call)', available: false, icon: HeartPulse },
  { id: 'matv-iptv', titleEn: 'MATV / IPTV System', titleAr: 'نظام الدش المركزي والتلفاز (MATV / IPTV)', available: false, icon: Tv },
  { id: 'cctv-system', titleEn: 'CCTV System', titleAr: 'نظام كاميرات المراقبة (CCTV System)', available: false, icon: Camera },
  { id: 'queuing-system', titleEn: 'Queuing System', titleAr: 'نظام تنظيم الدور والانتظار (Queuing System)', available: false, icon: Users },
  { id: 'intercom-system', titleEn: 'Intercom System', titleAr: 'نظام الإنتركوم (Intercom System)', available: false, icon: Radio },
  { id: 'bms', titleEn: 'BMS (Building Management System)', titleAr: 'نظام إدارة المباني (BMS)', available: false, icon: Cpu },
  { id: 'riser-diagram', titleEn: 'Riser Diagram', titleAr: 'مخطط الصواعد (Riser Diagram)', available: false, icon: Workflow },
];

export const HomePage: React.FC<HomePageProps> = ({
  onOpenLoadEstimation,
  onOpenPublisher,
  lang,
}) => {
  const isAr = lang === 'ar';

  // Both division accordions are expanded by default
  const [expandedDivisions, setExpandedDivisions] = useState<Record<DivisionId, boolean>>({
    'low-voltage': true,
    'light-current': true,
  });

  const toggleDivision = (divisionId: DivisionId) => {
    setExpandedDivisions((prev) => ({
      ...prev,
      [divisionId]: !prev[divisionId],
    }));
  };

  const handleModuleClick = (mod: DivisionModule) => {
    if (mod.id === 'load-estimation' && mod.available) {
      onOpenLoadEstimation();
    }
  };

  const divisions: Array<{
    id: DivisionId;
    title: string;
    description: string;
    meta: string;
    icon: React.ComponentType<{ className?: string }>;
    isPrimary?: boolean;
    modules: DivisionModule[];
  }> = [
    {
      id: 'low-voltage',
      title: 'Low Voltage (الجهد المنخفض)',
      description: isAr
        ? 'حسابات تقدير الأحمال الكهربائية، تحجيم المحولات، تيارات القصر، والتحقق من هبوط الجهد.'
        : 'Electrical load estimation, transformer sizing, short-circuit studies, and voltage drop verification.',
      meta: isAr
        ? `${LOW_VOLTAGE_MODULES.length} وحدة · متاح: تقدير الأحمال`
        : `${LOW_VOLTAGE_MODULES.length} Modules · Load Estimation Ready`,
      icon: PlugZap,
      isPrimary: true,
      modules: LOW_VOLTAGE_MODULES,
    },
    {
      id: 'light-current',
      title: 'Light Current (التيار الخفيف)',
      description: isAr
        ? 'أنظمة المراقبة الأمنية وإنذار الحريق ومخططات الصواعد للمباني والمنشآت.'
        : 'Low-current building systems covering security surveillance, fire detection, and vertical riser topology.',
      meta: isAr
        ? `${LIGHT_CURRENT_MODULES.length} وحدة · أنظمة التيار الخفيف`
        : `${LIGHT_CURRENT_MODULES.length} Modules · Extra-Low Voltage Systems`,
      icon: Network,
      isPrimary: false,
      modules: LIGHT_CURRENT_MODULES,
    },
  ];

  return (
    <main className="flex-1 flex flex-col justify-between bg-[#F4F6F8] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14 w-full space-y-8">
        {/* Hero Header */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight [text-wrap:balance]">
                {isAr ? 'مصادر وأدوات التصميم الكهربائي' : 'Electrical Design Resources'}
              </h2>
            </div>

            {/* Publisher Profile Button (Top-End Corner) */}
            <button
              type="button"
              onClick={onOpenPublisher}
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#172554] hover:to-[#1d4ed8] dark:from-blue-800 dark:to-blue-600 dark:hover:from-blue-900 dark:hover:to-blue-700 border border-blue-400/40 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0 self-start focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <img
                src="/assets/aistudio/EE_5703fd0d.jpg"
                alt={isAr ? 'م. مصطفى حسني' : 'Eng. Mostafa Hosni'}
                className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-white/80 shadow-sm shrink-0"
              />

              <span className="flex flex-col text-left rtl:text-right leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  {isAr ? 'الناشر' : 'Publisher'}
                </span>
                <span className="text-sm sm:text-base font-bold text-white leading-tight whitespace-nowrap">
                  {isAr ? 'م. مصطفى حسني' : 'Eng. Mostafa Hosni'}
                </span>
              </span>

              <ChevronRight className="w-4 h-4 text-blue-200 group-hover:text-white rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shrink-0" />
            </button>
          </div>

          {/* Vertical Feature Tags */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="px-4 py-2 rounded-lg inline-flex items-center gap-3 w-fit text-sm font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/70">
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'شيتات حسابات إكسل' : 'Excel Calculation Sheets'}</span>
            </div>

            <div className="px-4 py-2 rounded-lg inline-flex items-center gap-3 w-fit text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/70">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'شروحات وأدلة تفصيلية' : 'Detailed Explanations & Guides'}</span>
            </div>

            <div className="px-4 py-2 rounded-lg inline-flex items-center gap-3 w-fit text-sm font-medium bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/70">
              <Code className="w-4 h-4 shrink-0" />
              <span>AutoCAD LISP</span>
            </div>

            <div className="px-4 py-2 rounded-lg inline-flex items-center gap-3 w-fit text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/70">
              <Box className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'إضافات الريفت (Revit Add-ins)' : 'Revit Add-ins'}</span>
            </div>
          </div>
        </section>

        {/* Two Main Division Cards: Left = Low Voltage, Right = Light Current */}
        <section
          aria-label="Engineering Divisions"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
        >
          {divisions.map((division) => {
            const IconComponent = division.icon;
            const isExpanded = expandedDivisions[division.id];

            return (
              <div
                key={division.id}
                className={`rounded-2xl bg-white dark:bg-gray-800 border transition-all duration-200 overflow-hidden flex flex-col ${
                  isExpanded
                    ? 'border-blue-300/90 dark:border-blue-700/80 shadow-sm'
                    : 'border-slate-200/90 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs hover:shadow-sm'
                }`}
              >
                {/* Clickable Card Header (Always Visible) */}
                <button
                  type="button"
                  onClick={() => toggleDivision(division.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left rtl:text-right p-6 flex flex-col gap-3.5 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E3A8A] transition-colors hover:bg-slate-50/70 dark:hover:bg-gray-800/80 shrink-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          division.isPrimary
                            ? 'bg-[#1E3A8A] text-amber-300 border-blue-900 shadow-xs'
                            : 'bg-blue-50 dark:bg-gray-700/80 text-[#1E3A8A] dark:text-blue-300 border-blue-100 dark:border-gray-600'
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                          {division.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400">
                          {division.meta}
                        </p>
                      </div>
                    </div>

                    {/* Chevron Arrow: Points UP when expanded, DOWN when collapsed */}
                    <span
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isExpanded
                          ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                          : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-600 text-slate-500 dark:text-gray-400'
                      }`}
                      title={isExpanded ? (isAr ? 'طي القائمة' : 'Collapse list') : (isAr ? 'توسيع القائمة' : 'Expand list')}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {division.description}
                  </p>
                </button>

                {/* Scrollable Vertical Module List: Icon + Title + Status Badge ONLY */}
                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-gray-700 divide-y divide-slate-100 dark:divide-gray-700/70 bg-slate-50/40 dark:bg-gray-900/30 max-h-[500px] overflow-y-auto table-scrollbar">
                    {division.modules.map((mod) => {
                      const ModIcon = mod.icon;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          disabled={!mod.available}
                          onClick={() => handleModuleClick(mod)}
                          className={`w-full text-left rtl:text-right px-6 py-2.5 transition-colors duration-150 flex items-center justify-between gap-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E3A8A] ${
                            mod.available
                              ? 'bg-blue-50/70 dark:bg-blue-950/30 hover:bg-blue-100/70 dark:hover:bg-blue-950/50 cursor-pointer group'
                              : 'opacity-70 cursor-not-allowed bg-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                mod.available
                                  ? 'bg-[#1E3A8A] text-white shadow-2xs'
                                  : 'bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-400 dark:text-gray-500'
                              }`}
                            >
                              <ModIcon className="w-4 h-4" />
                            </div>

                            <span
                              className={`text-sm sm:text-[15px] font-bold truncate ${
                                mod.available
                                  ? 'text-[#1E3A8A] dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-white'
                                  : 'text-slate-600 dark:text-gray-400'
                              }`}
                            >
                              {isAr ? mod.titleAr : mod.titleEn}
                            </span>
                          </div>

                          {mod.available ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/60 shrink-0 whitespace-nowrap">
                              {isAr ? 'تم النشر 19/11/2026' : 'Published 19/11/2026'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-gray-700 shrink-0 whitespace-nowrap">
                              {isAr ? 'مجدول' : 'Planned'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Card Footer (Always Visible when Expanded) */}
                {isExpanded && (
                  <div className="px-6 py-3 border-t border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium text-slate-500 dark:text-gray-400 flex items-center justify-between shrink-0">
                    <span>
                      {isAr
                        ? `إجمالي الوحدات: ${division.modules.length}`
                        : `Total Modules: ${division.modules.length}`}
                    </span>
                    <span>
                      {isAr ? 'مرر لعرض جميع الوحدات' : 'Scroll to view all modules'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
