import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <svg
      viewBox="0 0 170 110"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Degradado Neón Matrix (Verde neón a Cian brillante) */}
        <linearGradient id="matrixNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>

        {/* Efecto de Resplandor Neón */}
        <filter id="matrixGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Llave Izquierda - Con trazo grueso y resplandor neón */}
      <text
        x="10"
        y="85"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="90"
        fontWeight="800"
        fill="url(#matrixNeonGrad)"
        filter="url(#matrixGlow)"
        stroke="url(#matrixNeonGrad)"
        strokeWidth="1.5"
      >
        {"{"}
      </text>

      {/* Símbolo de Encendido (Power) en el centro - Con gradiente y resplandor */}
      <g
        transform="translate(56, 33) scale(1.65)"
        stroke="url(#matrixNeonGrad)"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#matrixGlow)"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </g>

      {/* Llave Derecha */}
      <text
        x="102"
        y="85"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="90"
        fontWeight="800"
        fill="url(#matrixNeonGrad)"
        filter="url(#matrixGlow)"
        stroke="url(#matrixNeonGrad)"
        strokeWidth="1.5"
      >
        {"}"}
      </text>

      {/* Placa/Tag para 'dev' arriba a la derecha para que resalte mucho más */}
      <g transform="translate(126, 20)">
        {/* Fondo de la etiqueta 'dev' */}
        <rect
          x="0"
          y="0"
          width="42"
          height="22"
          rx="6"
          fill="#00FF41"
          className="dark:fill-[#00FF41] fill-[#00cc33]"
        />
        {/* Texto 'dev' dentro de la etiqueta */}
        <text
          x="21"
          y="15"
          fontFamily="system-ui, sans-serif"
          fontSize="12"
          fontWeight="900"
          fill="#052e16" /* Fondo oscuro de contraste */
          textAnchor="middle"
        >
          DEV
        </text>
      </g>
    </svg>
  );
};
