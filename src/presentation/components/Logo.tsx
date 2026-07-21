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

      {/* Símbolo de Llave Izquierda '{' en blanco */}
      <text
        x="12"
        y="68"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="54"
        fontWeight="800"
        fill="#ffffff"
      >
        {"{"}
      </text>

      {/* Símbolo de Encendido (Power) en blanco en el centro */}
      <g
        transform="translate(35, 33) scale(1.25)"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </g>

      {/* Símbolo de Llave Derecha '}' en blanco */}
      <text
        x="63"
        y="68"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="54"
        fontWeight="800"
        fill="#ffffff"
      >
        {"}"}
      </text>

      {/* Superíndice 'dev' arriba a la derecha en blanco */}
      <text
        x="78"
        y="30"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="15"
        fontWeight="900"
        fill="#ffffff"
      >
        dev
      </text>
    </svg>
  );
};
