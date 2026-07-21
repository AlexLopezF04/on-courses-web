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
      {/* Contenedor redondeado estilo Squircle en verde Matrix brillante */}
      <rect
        width="100"
        height="100"
        rx="28"
        fill="#00FF41"
        className="dark:fill-[#00FF41] fill-[#00cc33]"
      />

      {/* Icono de Birrete (GraduationCap) en color blanco en el centro */}
      <g
        transform="translate(20, 20) scale(2.5)"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Rombo superior del birrete */}
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        {/* Base del birrete */}
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </g>
    </svg>
  );
};
