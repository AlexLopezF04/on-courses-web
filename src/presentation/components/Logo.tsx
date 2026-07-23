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

      {/* Símbolo de Encendido (Power) en negro - Trazo más delgado para armonía visual */}
      <g
        transform="translate(34, 34) scale(1.33)"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
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
