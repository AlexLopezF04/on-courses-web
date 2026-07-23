import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,255,65,0.3)] transition-all duration-200 outline-none focus:border-brand-400 focus:ring-0 focus:shadow-[0_0_14px_rgba(0,255,65,0.75),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85)] disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-950 text-sm font-medium',
            {
              'border-rose-500 focus:border-rose-500 focus:shadow-[0_0_12px_rgba(244,63,94,0.7)]': !!error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-rose-500 font-bold">{error}</span>
        )}
        {!error && helperText && (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
