import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-[#FAF4AA] border-2 border-[#7B4D31] rounded-2xl p-4 shadow-[4px_6px_0px_#7B4D31] max-w-sm flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F7B915] border border-[#7B4D31] flex items-center justify-center shrink-0 text-[#6E0300]">
          <Sparkles className="w-4 h-4 fill-[#6E0300]" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="font-serif font-bold text-[#6E0300] text-sm">{toast.title}</h5>
          {toast.description && (
            <p className="text-xs text-[#7B4D31] mt-0.5 leading-relaxed">{toast.description}</p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-[#7B4D31] hover:text-[#6E0300] p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
