import React from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Cpu,
  Award,
  GraduationCap,
  Code2,
  Wrench,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Rocket,
} from 'lucide-react';
import { Language } from '../data/translations';

interface PublisherPageProps {
  onBack: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

interface ExperienceRole {
  id: string;
  companyEn: string;
  companyAr: string;
  roleEn: string;
  roleAr: string;
  periodEn: string;
  periodAr: string;
  locationEn: string;
  locationAr: string;
  summaryEn: string;
  summaryAr: string;
  isCurrent?: boolean;
  projectsEn?: string[];
  projectsAr?: string[];
}

interface CertificationItem {
  id: string;
  titleEn: string;
  titleAr: string;
  issuerEn: string;
  issuerAr: string;
  metaEn: string;
  metaAr: string;
  isTopHighlight?: boolean;
}

const EXPERIENCE_TIMELINE: ExperienceRole[] = [
  {
    id: 'maeen',
    companyEn: 'Maeen Engineering Consulting',
    companyAr: 'معين للاستشارات الهندسية (Maeen)',
    roleEn: 'Senior Electrical Design Engineer',
    roleAr: 'مهندس تصميم كهربائي أول',
    periodEn: 'Jun 2026 – Present',
    periodAr: 'يونيو 2026 – الآن',
    locationEn: 'Cairo',
    locationAr: 'القاهرة',
    isCurrent: true,
    summaryEn:
      'Designing MV/LV electrical systems (power, lighting, earthing, low current) and infrastructure networks for commercial and mixed-use developments.',
    summaryAr:
      'تصميم أنظمة الجهد المتوسط والمنخفض (القوى، الإنارة، التأريض، التيار الخفيف) وشبكات البنية التحتية للمشاريع التجارية ومتعددة الاستخدامات.',
  },
  {
    id: 'direct',
    companyEn: 'Direct',
    companyAr: 'دايركت (Direct)',
    roleEn: 'Senior Electrical Design Engineer',
    roleAr: 'مهندس تصميم كهربائي أول',
    periodEn: 'Oct 2025 – Jul 2026',
    periodAr: 'أكتوبر 2025 – يوليو 2026',
    locationEn: 'Maadi, Cairo',
    locationAr: 'المعادي، القاهرة',
    summaryEn:
      'Led electrical design teams for high-rise towers and hotels in Egypt and Saudi Arabia.',
    summaryAr:
      'قيادة فرق التصميم الكهربائي للأبراج الشاهقة والفنادق في مصر والسعودية.',
    projectsEn: [
      'Sirah Garden',
      'Najed Tower',
      'Maghana Tower',
      'Shepheard Hotel',
      'Al Tassan Compound',
    ],
    projectsAr: [
      'سيرة جاردن',
      'برج نجد',
      'برج مغنى',
      'فندق شبرد',
      'مجمع الطاسان السكني',
    ],
  },
  {
    id: 'ice',
    companyEn: 'ICE',
    companyAr: 'مكتب ICE للاستشارات الهندسية',
    roleEn: 'Senior Electrical Design Engineer (Jan 2025 – Sep 2025) & Junior Electrical Design Engineer (Jan 2024 – Jan 2025)',
    roleAr: 'مهندس تصميم كهربائي أول (يناير 2025 – سبتمبر 2025) ومهندس تصميم كهربائي (يناير 2024 – يناير 2025)',
    periodEn: 'Jan 2024 – Sep 2025',
    periodAr: 'يناير 2024 – سبتمبر 2025',
    locationEn: '5th Settlement, Cairo',
    locationAr: 'التجمع الخامس، القاهرة',
    summaryEn:
      'Led MV/LV, lighting, and ELV design teams and shop drawings across mega KSA & Egypt developments.',
    summaryAr:
      'قيادة فرق تصميم أنظمة الجهد المتوسط والمنخفض والتيار الخفيف وإعداد الرسومات التنفيذية لكبرى مشاريع السعودية ومصر.',
    projectsEn: [
      'Riyadh Avenue Mall',
      'Entertainment City (Al-Kharj)',
      'Darb El Harameen',
      'Alpha & Roshen Towers',
      'Capital Monorail',
      'Sidra Township',
    ],
    projectsAr: [
      'مول رياض أفنيو',
      'المدينة الترفيهية (الخرج)',
      'أبراج درب الحرمين',
      'برج ألفا وأبراج روشن',
      'مونوريل العاصمة',
      'ضاحية سدرة',
    ],
  },
  {
    id: 'katic',
    companyEn: 'KATIC',
    companyAr: 'مكتب KATIC للاستشارات الهندسية',
    roleEn: 'Junior Electrical Design Engineer',
    roleAr: 'مهندس تصميم كهربائي',
    periodEn: 'Sep 2023 – Jan 2024',
    periodAr: 'سبتمبر 2023 – يناير 2024',
    locationEn: '5th Settlement, Cairo',
    locationAr: 'التجمع الخامس، القاهرة',
    summaryEn:
      'Prepared electrical designs (lighting, power distribution) and shop drawing verification for commercial and mixed-use projects.',
    summaryAr:
      'إعداد التصميمات الكهربائية (الإنارة وتوزيع القوى) ومراجعة الرسومات التنفيذية للمشاريع التجارية ومتعددة الاستخدامات.',
    projectsEn: ['Zia Mall (NAC)', 'Oaks Tower (NAC)'],
    projectsAr: ['زيا مول (العاصمة الإدارية)', 'برج أوكس (العاصمة الإدارية)'],
  },
  {
    id: 'afea',
    companyEn: 'Armed Forces Engineering Authority (Military Service)',
    companyAr: 'الهيئة الهندسية للقوات المسلحة (الخدمة العسكرية)',
    roleEn: 'Consulting Electrical Engineer',
    roleAr: 'مهندس كهرباء استشاري',
    periodEn: 'Sep 2022 – Sep 2023',
    periodAr: 'سبتمبر 2022 – سبتمبر 2023',
    locationEn: 'Olympic Games City',
    locationAr: 'مدينة الألعاب الأولمبية',
    summaryEn:
      'Site supervision, design reviews, technical submittals, RFIs, and quality control alongside major contractors (Arab Contractors, Concord, Gama, Al Rowad).',
    summaryAr:
      'إشراف تنفيذي ومراجعة تصميمات واعتمادات فنية ومراقبة جودة في المشاريع القومية الكبرى بالتنسيق مع كبرى شركات المقاولات.',
    projectsEn: ['Olympic Games City', 'Egypt Islamic Cultural Center'],
    projectsAr: ['مدينة الألعاب الأولمبية', 'المركز الثقافي الإسلامي المصري'],
  },
  {
    id: 'elmasria',
    companyEn: 'El Masria',
    companyAr: 'شركة المصرية (El Masria)',
    roleEn: 'Junior Electrical Technical Office',
    roleAr: 'مهندس مكتب فني كهرباء',
    periodEn: 'Aug 2021 – May 2022',
    periodAr: 'أغسطس 2021 – مايو 2022',
    locationEn: 'Egypt',
    locationAr: 'مصر',
    summaryEn:
      'Prepared shop drawings, as-built drawings, material submittals, and RFIs for residential and commercial buildings.',
    summaryAr:
      'إعداد الرسومات التنفيذية ورسومات As-Built والاعتمادات الفنية وطلبات الاستفسار للمباني السكنية والتجارية.',
  },
];

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'bim-api',
    titleEn: 'BIM Development API (Revit API)',
    titleAr: 'تطوير إضافات BIM API (Revit API)',
    issuerEn: 'Revitec / Kayan Academy (Autodesk ATC)',
    issuerAr: 'Revitec / أكاديمية كيان (مركز Autodesk معتمد)',
    metaEn: 'Mar 2025 · 23.25 CPD Hrs',
    metaAr: 'مارس 2025 · 23.25 ساعة معتمدة',
    isTopHighlight: true,
  },
  {
    id: 'bim-electrical',
    titleEn: 'BIM for Electrical Engineers (Revit 2024)',
    titleAr: 'تطبيقات BIM لمهندسي الكهرباء (Revit 2024)',
    issuerEn: 'Kayan Academy (Autodesk ATC)',
    issuerAr: 'أكاديمية كيان (مركز Autodesk معتمد)',
    metaEn: 'Aug 2024 · 40 Hrs',
    metaAr: 'أغسطس 2024 · 40 ساعة',
  },
  {
    id: 'revit-essential',
    titleEn: 'Revit Electrical Essential (Revit 2024)',
    titleAr: 'أساسيات الريفيت الكهربائي (Revit 2024)',
    issuerEn: 'Kayan Academy (Autodesk ATC)',
    issuerAr: 'أكاديمية كيان (مركز Autodesk معتمد)',
    metaEn: 'Jun 2024 · 25 Hrs',
    metaAr: 'يونيو 2024 · 25 ساعة',
  },
  {
    id: 'afea-cert',
    titleEn: 'Accredited Experience Certificate',
    titleAr: 'شهادة خبرة معتمدة',
    issuerEn: 'Armed Forces Engineering Authority (الهيئة الهندسية للقوات المسلحة)',
    issuerAr: 'الهيئة الهندسية للقوات المسلحة',
    metaEn: 'Mega National Projects Supervision & Consulting',
    metaAr: 'الإشراف والاستشارات الهندسية للمشاريع القومية الكبرى',
  },
];

const TECHNICAL_GROUPS = [
  {
    id: 'bim',
    titleEn: 'BIM & Automation',
    titleAr: 'BIM والأتمتة البرمجية',
    icon: Code2,
    accentClasses:
      'bg-emerald-50 text-emerald-800 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/70',
    items: [
      'Revit API (C# Add-ins)',
      'AutoLISP',
      'Dynamo',
      'Navisworks',
    ],
  },
  {
    id: 'software',
    titleEn: 'Engineering Software',
    titleAr: 'البرامج والأدوات الهندسية',
    icon: Wrench,
    accentClasses:
      'bg-slate-100 text-slate-800 border-slate-200 dark:bg-gray-700/60 dark:text-slate-200 dark:border-gray-600',
    items: [
      'AutoCAD',
      'DIALux evo',
      'Ecodial',
      'Visual Studio',
      'AI',
    ],
  },
];

export const PublisherPage: React.FC<PublisherPageProps> = ({
  onBack,
  lang,
  isDarkMode = false,
}) => {
  const isAr = lang === 'ar';

  const metrics = [
    {
      id: 'exp',
      icon: Briefcase,
      valueEn: '5+ Years',
      valueAr: '+5 سنوات',
      labelEn: 'Electrical Design',
      labelAr: 'التصميم الكهربائي',
      iconStyle:
        'bg-blue-50 text-[#1E3A8A] border-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    },
    {
      id: 'projects',
      icon: Building2,
      valueEn: 'Mega Projects',
      valueAr: 'مشاريع كبرى',
      labelEn: 'Across Egypt & Saudi Arabia',
      labelAr: 'في مصر والسعودية',
      iconStyle:
        'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    },
    {
      id: 'bim',
      icon: Cpu,
      valueEn: 'BIM & Automation',
      valueAr: 'BIM والأتمتة',
      labelEn: 'Revit API · AutoLISP',
      labelAr: 'Revit API · AutoLISP',
      iconStyle:
        'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60',
    },
  ];

  return (
    <main className="flex-1 flex flex-col bg-[#F4F6F8] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 w-full space-y-8">
        {/* 0. Top Navigation Bar */}
        <div>
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#1F2937] hover:bg-slate-700 text-blue-300 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-[#1E3A8A] border-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home Page'}</span>
          </button>
        </div>

        {/* 1. Executive Hero Profile Card */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#1e40af] dark:from-[#0f1f4b] dark:via-[#1e3a8a] dark:to-[#1d4ed8] border border-blue-400/30 dark:border-blue-500/30 shadow-lg text-white p-6 sm:p-8 lg:p-10">
          {/* Subtle Architectural Grid Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] bg-[length:24px_24px]"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 min-w-0">
              <img
                src="/assets/aistudio/EE_5703fd0d.jpg"
                alt={isAr ? 'م. مصطفى حسني أبو العطا' : 'Eng. Mostafa Hosni Abo El Ata'}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top ring-4 ring-white/80 shadow-lg shrink-0"
              />

              <div className="space-y-2.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-semibold text-blue-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{isAr ? 'القاهرة، مصر · دفعة 2021' : 'Cairo, Egypt · B.Sc. 2021'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-tight">
                  {isAr ? 'م. مصطفى حسني أبو العطا' : 'Eng. Mostafa Hosni Abo El Ata'}
                </h2>

                <p className="text-sm sm:text-base font-semibold text-amber-300">
                  {isAr
                    ? 'مهندس تصميم كهربائي أول | تطوير أدوات BIM و AutoCAD'
                    : 'Senior Electrical Design Engineer | BIM & CAD Automation'}
                </p>

                <p className="text-sm sm:text-[15px] text-blue-100/95 leading-relaxed max-w-3xl">
                  {isAr
                    ? 'مهندس تصميم كهربائي بخبرة تتجاوز 5 سنوات في أنظمة توزيع الجهد المتوسط والمنخفض، التيار الخفيف، أنظمة الجهد المنخفض، وشبكات البنية التحتية لكبرى المشاريع في مصر والسعودية، ومن اهتماماتي تطوير إضافات Revit API وأدوات AutoCAD LISP ونشرها مجاناً.'
                    : 'Electrical Design Engineer with 5+ years of experience in MV/LV power distribution, low-current, low voltage systems, and infrastructure systems for mega projects across Egypt and Saudi Arabia (KSA), with a strong interest in developing Revit API Add-ins and AutoCAD LISP automation tools and sharing them for free.'}
                </p>
              </div>
            </div>

            {/* Prominent Action Buttons & Contact Card */}
            <div className="flex flex-col items-stretch gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://www.linkedin.com/in/mostafa-hosni-31b65518a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>{isAr ? 'حساب لينكد إن' : 'LinkedIn Profile'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" />
              </a>

              {/* Translucent Contact Card */}
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm rounded-xl p-3 space-y-2 text-xs sm:text-sm text-white min-w-[255px] transition-colors">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mostafahosni959@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-blue-200 font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span dir="ltr" className="break-all sm:whitespace-nowrap">
                    mostafahosni959@gmail.com
                  </span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mostafahosni2025@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-blue-200 font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span dir="ltr" className="break-all sm:whitespace-nowrap">
                    mostafahosni2025@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span dir="ltr" className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <a href="tel:+201007657485" className="hover:underline">
                      01007657485
                    </a>
                    <span className="text-white/50">/</span>
                    <a href="tel:+201505947485" className="hover:underline">
                      01505947485
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Impact Metrics Strip */}
        <section
          aria-label={isAr ? 'ملخص الإنجازات' : 'Key Impact Metrics'}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {metrics.map((metric) => {
            const IconComp = metric.icon;
            return (
              <div
                key={metric.id}
                className="rounded-2xl bg-white dark:bg-gray-800 border border-slate-200/90 dark:border-gray-700 p-4 sm:p-5 shadow-2xs flex flex-col justify-between gap-3 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${metric.iconStyle}`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {isAr ? metric.valueAr : metric.valueEn}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 leading-snug">
                    {isAr ? metric.labelAr : metric.labelEn}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 3. Career Timeline */}
        <section className="rounded-2xl bg-white dark:bg-gray-800 border border-slate-200/90 dark:border-gray-700 shadow-2xs p-6 sm:p-7 space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-200/80 dark:border-gray-700">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isAr ? 'الخبرات المهنية' : 'Professional Experience'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 font-medium">
                {isAr
                  ? 'مهندس تصميم كهربائي ومهندس مكتب فني'
                  : 'Electrical Design Engineer & Technical Office Engineer'}
              </p>
            </div>
          </div>

          <div className="relative border-s-2 border-slate-200 dark:border-gray-700 ms-3 space-y-6">
            {EXPERIENCE_TIMELINE.map((item) => {
              const chips = isAr ? item.projectsAr : item.projectsEn;
              return (
                <div key={item.id} className="relative ps-6 sm:ps-8">
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -start-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${
                      item.isCurrent
                        ? 'bg-[#1E3A8A] border-blue-200 dark:bg-blue-400 dark:border-blue-900 ring-4 ring-blue-100 dark:ring-blue-950'
                        : 'bg-white dark:bg-gray-800 border-[#1E3A8A] dark:border-blue-400'
                    }`}
                  />

                  <div className="rounded-xl border border-slate-200/80 dark:border-gray-700/80 bg-slate-50/50 dark:bg-gray-900/35 p-4 sm:p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60">
                            {isAr ? item.companyAr : item.companyEn}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-gray-400">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            {isAr ? item.locationAr : item.locationEn}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                          {isAr ? item.roleAr : item.roleEn}
                        </h4>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border shrink-0 self-start whitespace-nowrap ${
                          item.isCurrent
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/70'
                            : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-gray-700'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{isAr ? item.periodAr : item.periodEn}</span>
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr ? item.summaryAr : item.summaryEn}
                    </p>

                    {chips && chips.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {chips.map((proj) => (
                          <span
                            key={proj}
                            className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-gray-700"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Bottom 2-Column Section: Certifications & Education + Technical Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Certifications & Education */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 border border-slate-200/90 dark:border-gray-700 shadow-2xs p-6 space-y-6 transition-colors">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isAr ? 'الشهادات المعتمدة والتعليم' : 'Certifications & Education'}
              </h3>
            </div>

            {/* Certified Courses */}
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className={`rounded-xl border p-4 space-y-1.5 transition-colors ${
                    cert.isTopHighlight
                      ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/90 dark:border-blue-800/70'
                      : 'bg-slate-50/60 dark:bg-gray-900/40 border-slate-200/80 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        cert.isTopHighlight
                          ? 'text-[#1E3A8A] dark:text-blue-300'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    />
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {isAr ? cert.titleAr : cert.titleEn}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 ps-6">
                    {isAr ? cert.issuerAr : cert.issuerEn}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-gray-400 ps-6">
                    {isAr ? cert.metaAr : cert.metaEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-gray-900/70 dark:to-blue-950/20 p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A] dark:text-blue-400">
                  {isAr ? 'التعليم الجامعي' : 'Education'}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {isAr
                    ? 'بكالوريوس هندسة القوى الكهربائية — جامعة المنوفية (دفعة 2021)'
                    : 'B.Sc. in Electrical Power Engineering — Menoufia University (Class of 2021)'}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isAr
                    ? 'مشروع التخرج: توزيع الجهد المنخفض لفندق — بتقدير امتياز'
                    : 'Graduation Project: Low Voltage Distribution for a Hotel — Grade: Excellent'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Technical Stack & Tools + Vision & Future Roadmap */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-slate-200/90 dark:border-gray-700 shadow-2xs p-6 space-y-6 transition-colors">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-gray-700">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#1E3A8A] dark:text-blue-300 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {isAr ? 'المهارات والأدوات التقنية' : 'Technical Stack & Tools'}
                </h3>
              </div>

              <div className="space-y-5">
                {TECHNICAL_GROUPS.map((group) => {
                  const GroupIcon = group.icon;
                  return (
                    <div key={group.id} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200">
                        <GroupIcon className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0" />
                        <h4>{isAr ? group.titleAr : group.titleEn}</h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border ${group.accentClasses}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vision & Future Roadmap Card (Relocated directly below Technical Stack & Tools) */}
            <div className="rounded-2xl bg-blue-50/50 dark:bg-slate-800/90 border-2 border-blue-200/80 dark:border-blue-800/60 shadow-sm p-6 space-y-5 transition-colors">
              <div className="flex items-center gap-3 pb-4 border-b border-blue-200/70 dark:border-blue-800/50">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">
                  {isAr ? 'الرؤية وخارطة الطريق المستقبلية' : 'VISION & FUTURE ROADMAP'}
                </h3>
              </div>

              <div className="space-y-3 text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {isAr ? (
                  <>
                    <p>
                      أكرّس جهودي لبناء أدوات هندسية متقدمة (إضافات Revit، أكواد AutoCAD LISP، وشيتات إكسل متقدمة) لجعل الحسابات الكهربائية أسرع، أكثر دقة، وأعلى احترافية.
                    </p>
                    <p>
                      خلال الفترة القادمة، سأقوم بنشر مصادر شاملة لكل من أنظمة التيار الخفيف والجهد المنخفض. سيتم تحديث هذه المنصة{' '}
                      <strong className="text-blue-600 dark:text-blue-400 font-bold">أسبوعياً</strong>{' '}
                      بناءً على طلبات وملاحظات الاستشاريين والمهندسين.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      I am dedicated to building advanced engineering tools (Revit Add-ins, AutoCAD LISP, and Advanced Excel Sheets) to make electrical calculations faster, more accurate, and highly professional.
                    </p>
                    <p>
                      Over the coming period, I will be publishing comprehensive resources for both Low Current and Low Voltage systems. This platform will be updated{' '}
                      <strong className="text-blue-600 dark:text-blue-400 font-bold">weekly</strong>{' '}
                      based on the specific requests and feedback of senior consultants and engineers.
                    </p>
                  </>
                )}
              </div>

              {/* Sadaqah Jariyah Dedication Box */}
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-700/60 px-5 py-4 text-center space-y-2.5">
                <p className="text-sm sm:text-[15px] italic text-amber-900 dark:text-amber-200 leading-relaxed">
                  This project is a continuous charity (Sadaqah Jariyah) dedicated to the souls of my father, Mr. Hosni El-Khadry, and my grandfather, Haj Khadry Abu El-Ata. I kindly ask for your sincere prayers for them.
                </p>
                <p
                  dir="rtl"
                  className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 leading-relaxed"
                >
                  صدقة جارية على روح والدي الأستاذ حسني الخضري، وجدي الحاج خضري أبوالعطا. برجاء الدعاء لهما.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
