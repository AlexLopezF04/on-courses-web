import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-extrabold tracking-wider uppercase border-2 border-slate-950 transition-all cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:translate-x-0.5 active:translate-y-0.5',
        {
          // Primary: High-Vibrancy Solid Matrix Green (Main CTA)
          'bg-brand-500 hover:bg-brand-400 dark:bg-[#00e63a] hover:dark:bg-[#2eff61] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#007a1f]':
            variant === 'primary',
          // Secondary: Rich Deep Emerald
          'bg-slate-900 hover:bg-slate-800 dark:bg-[#064222] hover:dark:bg-[#09592f] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00e63a]':
            variant === 'secondary',
          // Danger: Red Alert (Destructive CTA)
          'bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 hover:dark:bg-rose-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#991b1b]':
            variant === 'danger',
          // Outline: Intense Medium Emerald Green Fill
          'bg-white hover:bg-emerald-50 dark:bg-[#0a4d29] hover:dark:bg-[#0f6336] text-slate-950 dark:text-emerald-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00e63a]':
            variant === 'outline',
          // Ghost: Saturated Slate-Emerald
          'bg-slate-100 hover:bg-emerald-100 dark:bg-[#0c4024] hover:dark:bg-[#115430] text-slate-950 dark:text-emerald-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00cc33]':
            variant === 'ghost',

          'px-3 py-1.5 text-xs': size === 'sm',
          'px-5 py-2.5 text-xs sm:text-sm': size === 'md',
          'px-7 py-3 text-sm sm:text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
