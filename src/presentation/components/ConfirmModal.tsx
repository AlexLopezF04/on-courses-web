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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className={`p-3 border border-slate-950 shrink-0 ${isDanger ? 'bg-rose-400 text-slate-950' : 'bg-brand-400 text-slate-950'}`}>
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-black text-lg text-slate-950">
              {title}
            </h3>
            <p className="text-slate-700 text-xs font-medium mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            size="sm"
            variant={isDanger ? 'danger' : 'primary'}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
