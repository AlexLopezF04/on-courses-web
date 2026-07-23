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

      {/* Contenedor redondeado estilo Squircle en verde Matrix brillante */}
      <rect
        width="100"
        height="100"
        rx="28"
        fill="#00FF41"
        className="dark:fill-[#00FF41] fill-[#00cc33]"
      />

      {/* Símbolo de Llave Izquierda '{' en negro - Delgada y estilizada */}
      <text
        x="18"
        y="72"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="62"
        fontWeight="300"
        fill="#000000"
      >
        {"{"}
      </text>

      {/* Sombrero de graduación (GraduationCap) con animación de latencia / titileo */}
      <g
        className="animate-hat-latency"
        transform="translate(36, 37) scale(1.15)"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </g>

      {/* Símbolo de Llave Derecha '}' en negro - Delgada y estilizada */}
      <text
        x="63"
        y="72"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="62"
        fontWeight="300"
        fill="#000000"
      >
        {"}"}
      </text>
    </svg>
  );
};
