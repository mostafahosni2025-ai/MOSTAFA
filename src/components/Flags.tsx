import React from 'react';

interface FlagProps {
  country: 'egypt' | 'saudi' | 'europe' | 'usa';
  className?: string;
}

export const FlagIcon: React.FC<FlagProps> = ({ country, className = 'w-14 h-9.5' }) => {
  switch (country) {
    case 'egypt':
      return (
        <div
          className={`relative overflow-hidden rounded-md shadow-xs border border-slate-300 shrink-0 bg-white ${className}`}
          title="علم جمهورية مصر العربية"
        >
          <img
            src="/assets/aistudio/12_f0e34b20.png"
            alt="علم مصر"
            className="w-full h-full object-cover block"
            loading="eager"
          />
        </div>
      );

    case 'saudi':
      return (
        <div
          className={`relative overflow-hidden rounded-md shadow-xs border border-slate-300 shrink-0 bg-[#006C35] ${className}`}
          title="علم المملكة العربية السعودية"
        >
          <img
            src="/assets/aistudio/33_6f57ff6a.jpg"
            alt="علم المملكة العربية السعودية"
            className="w-full h-full object-cover block"
            loading="eager"
          />
        </div>
      );

    case 'europe':
      return (
        <div
          className={`relative overflow-hidden rounded-md shadow-xs border border-slate-300 shrink-0 bg-[#003399] ${className}`}
          title="علم الاتحاد الأوروبي - European Union"
        >
          <svg viewBox="0 0 300 200" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="#003399" />
            <g fill="#FFCC00" transform="translate(150, 100)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={58 * Math.cos((deg * Math.PI) / 180)}
                  cy={58 * Math.sin((deg * Math.PI) / 180)}
                  r="6.5"
                />
              ))}
            </g>
          </svg>
        </div>
      );

    case 'usa':
      return (
        <div
          className={`relative overflow-hidden rounded-md shadow-xs border border-slate-300 shrink-0 bg-white ${className}`}
          title="علم الولايات المتحدة الأمريكية - United States"
        >
          <svg viewBox="0 0 300 200" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            {/* 13 Stripes */}
            {Array.from({ length: 13 }).map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 13}
                width="300"
                height={200 / 13 + 0.2}
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect x="0" y="0" width="125" height={(7 * 200) / 13} fill="#3C3B6E" />
            {/* Stars representation */}
            <g fill="#FFFFFF">
              {[15, 38, 61, 84, 107].map((x) =>
                [14, 34, 54, 74, 94].map((y) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />
                ))
              )}
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
