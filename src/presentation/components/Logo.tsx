import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-10' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Resplandor verde Matrix neón */}
        <filter id="hatGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>{`
          @keyframes logoHatLatency {
            0%, 100% {
              opacity: 1;
            }
            45% {
              opacity: 1;
            }
            48% {
              opacity: 0.25;
            }
            50% {
              opacity: 0.95;
            }
            52% {
              opacity: 0.35;
            }
            54% {
              opacity: 1;
            }
            82% {
              opacity: 1;
            }
            84% {
              opacity: 0.45;
            }
            86% {
              opacity: 1;
            }
          }
          .animate-hat-latency {
            animation: logoHatLatency 3.5s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Contenedor estilo placa/badge con esquinas en término medio elegante */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="16"
        fill="#090d16"
        stroke="#00b835"
        strokeWidth="4.5"
      />

      {/* Sombrero de graduación (GraduationCap) centrado en verde neón con animación de latencia / titileo */}
      <g
        className="animate-hat-latency"
        transform="translate(20, 20) scale(2.5)"
        stroke="#00b835"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hatGlow)"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </g>
    </svg>
  );
};
