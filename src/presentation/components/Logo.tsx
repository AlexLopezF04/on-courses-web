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

      {/* Símbolo de Llave Izquierda '{' en blanco - Perfectamente centrado */}
      <text
        x="15"
        y="71"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="56"
        fontWeight="800"
        fill="#ffffff"
      >
        {"{"}
      </text>

      {/* Símbolo de Encendido (Power) en blanco en el centro geométrico */}
      <g
        transform="translate(34, 34) scale(1.33)"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </g>

      {/* Símbolo de Llave Derecha '}' en blanco - Perfectamente centrado */}
      <text
        x="64"
        y="71"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="56"
        fontWeight="800"
        fill="#ffffff"
      >
        {"}"}
      </text>
    </svg>
  );
};
