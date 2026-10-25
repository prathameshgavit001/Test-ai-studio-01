import React from 'react';

interface ArtCanvasProps {
  pattern: 'grid' | 'waves' | 'isometric' | 'circles' | 'minimal-arch';
  title?: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export const ArtCanvas: React.FC<ArtCanvasProps> = ({
  pattern,
  title,
  subtitle,
  className = '',
  aspectRatio = '16:9',
}) => {
  const aspectClass =
    aspectRatio === '1:1'
      ? 'aspect-square'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : 'aspect-[16/9]';

  return (
    <div
      className={`relative overflow-hidden bg-stone-900 text-stone-100 flex items-center justify-center select-none ${aspectClass} ${className}`}
      role="img"
      aria-label={title || 'Architectural visual composition'}
    >
      {/* Background Architectural Canvas */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`grad-${pattern}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="50%" stopColor="#292524" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>

          <pattern id="fineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="500" fill={`url(#grad-${pattern})`} />
        <rect width="800" height="500" fill="url(#fineGrid)" opacity="0.8" />

        {pattern === 'minimal-arch' && (
          <g opacity="0.85">
            {/* Monumental cantilevered planes */}
            <path d="M 120 400 L 480 120 L 720 120 L 360 400 Z" fill="#44403c" opacity="0.4" />
            <path d="M 220 400 L 580 120 L 640 120 L 280 400 Z" fill="#57534e" opacity="0.5" />
            <line x1="80" y1="400" x2="720" y2="400" stroke="#78716c" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="560" cy="180" r="48" fill="none" stroke="#d6d3d1" strokeWidth="1" opacity="0.6" />
            <line x1="560" y1="120" x2="560" y2="240" stroke="#a8a29e" strokeWidth="1" opacity="0.4" />
            <line x1="500" y1="180" x2="620" y2="180" stroke="#a8a29e" strokeWidth="1" opacity="0.4" />
          </g>
        )}

        {pattern === 'isometric' && (
          <g opacity="0.75">
            {/* Monolithic acoustic block */}
            <polygon points="400,100 580,200 400,300 220,200" fill="#44403c" />
            <polygon points="220,200 400,300 400,420 220,320" fill="#292524" />
            <polygon points="400,300 580,200 580,320 400,420" fill="#1c1917" />
            <line x1="400" y1="100" x2="400" y2="420" stroke="#78716c" strokeWidth="1" opacity="0.5" />
            <circle cx="400" cy="200" r="28" fill="none" stroke="#e7e5e4" strokeWidth="1.5" />
            <circle cx="400" cy="200" r="14" fill="#a8a29e" opacity="0.4" />
          </g>
        )}

        {pattern === 'grid' && (
          <g opacity="0.7">
            {/* Typographic modular baseline grid */}
            {[100, 160, 220, 280, 340, 400].map((y, i) => (
              <line key={i} x1="100" y1={y} x2="700" y2={y} stroke="#78716c" strokeWidth="1" strokeDasharray={i % 2 === 0 ? "none" : "3 3"} />
            ))}
            <text x="140" y="270" fill="#f5f5f4" fontSize="72" fontFamily="serif" fontStyle="italic" opacity="0.3">Aa</text>
            <rect x="420" y="160" width="160" height="180" fill="none" stroke="#a8a29e" strokeWidth="1.5" />
            <circle cx="500" cy="250" r="60" fill="none" stroke="#78716c" strokeWidth="1" />
          </g>
        )}

        {pattern === 'waves' && (
          <g opacity="0.65">
            {/* Contour & maritime curves */}
            <path d="M 50 380 Q 240 180 400 320 T 750 200" fill="none" stroke="#e7e5e4" strokeWidth="1.5" />
            <path d="M 50 410 Q 240 210 400 350 T 750 230" fill="none" stroke="#a8a29e" strokeWidth="1" opacity="0.7" />
            <path d="M 50 440 Q 240 240 400 380 T 750 260" fill="none" stroke="#78716c" strokeWidth="1" opacity="0.4" />
            <circle cx="320" cy="190" r="6" fill="#f5f5f4" />
            <line x1="320" y1="190" x2="320" y2="400" stroke="#78716c" strokeWidth="1" strokeDasharray="2 4" />
          </g>
        )}

        {pattern === 'circles' && (
          <g opacity="0.7">
            {/* Concentric ceramic radial wheel */}
            <circle cx="400" cy="250" r="160" fill="none" stroke="#78716c" strokeWidth="1" />
            <circle cx="400" cy="250" r="120" fill="none" stroke="#a8a29e" strokeWidth="1.2" strokeDasharray="6 4" />
            <circle cx="400" cy="250" r="80" fill="none" stroke="#d6d3d1" strokeWidth="1.5" />
            <circle cx="400" cy="250" r="40" fill="#44403c" opacity="0.6" />
            <line x1="200" y1="250" x2="600" y2="250" stroke="#78716c" strokeWidth="1" />
            <line x1="400" y1="50" x2="400" y2="450" stroke="#78716c" strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Subtle Grain & Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 pointer-events-none" />

      {/* Title / Caption if provided */}
      {(title || subtitle) && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <div className="inline-block px-3 py-1.5 rounded-md bg-stone-950/70 backdrop-blur-xs border border-white/10 max-w-full">
            {title && (
              <div className="text-xs font-semibold tracking-wide text-white truncate">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-[11px] text-stone-300 truncate mt-0.5">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
