import React from 'react';
import { Button } from './Button';
import { ShieldAlert } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl shrink-0 ${isDanger ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-455' : 'bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400'}`}>
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={isDanger ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/10' : ''}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
