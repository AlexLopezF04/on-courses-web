import React from 'react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', iconClassName = 'text-brand-400' }) => {
  return (
    <svg
      viewBox="0 0 160 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Llave Izquierda */}
      <text
        x="15"
        y="82"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="85"
        fontWeight="300"
        fill="currentColor"
        className={iconClassName}
      >
        {"{"}
      </text>

      {/* Símbolo de Encendido (Power) en el centro */}
      <g
        transform="translate(56, 36) scale(1.6)"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </g>

      {/* Llave Derecha */}
      <text
        x="98"
        y="82"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="85"
        fontWeight="300"
        fill="currentColor"
        className={iconClassName}
      >
        {"}"}
      </text>

      {/* Texto 'dev' arriba a la derecha */}
      <text
        x="128"
        y="38"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        className={iconClassName}
      >
        dev
      </text>
    </svg>
  );
};
