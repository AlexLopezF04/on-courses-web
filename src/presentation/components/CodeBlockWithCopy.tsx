import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockWithCopyProps {
  code: string;
  language?: string;
}

export const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({ code, language = 'sql' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code to clipboard', err);
    }
  };

  return (
    <div className="my-6 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] overflow-hidden group">
      {/* Header bar of Code Block */}
      <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-slate-800 text-[10px] uppercase font-bold tracking-wider">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00cc33]" />
          <span className="font-mono text-[#00ff41]">{language.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono hidden sm:inline">ONCOURSES CONSOLE</span>
          <button
            type="button"
            onClick={handleCopy}
            className={`px-2.5 py-1 font-mono font-bold text-[10px] uppercase tracking-wider border border-slate-800 transition-all flex items-center gap-1 cursor-pointer select-none ${
              copied
                ? 'bg-[#00cc33] text-slate-950 border-[#00cc33]'
                : 'bg-slate-900 text-slate-300 hover:bg-[#00cc33] hover:text-slate-950 hover:border-slate-950'
            }`}
            title="Copiar código al portapapeles"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-slate-950" />
                <span>¡COPIADO!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>COPIAR CÓDIGO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-emerald-300 select-all font-mono text-[12px] p-1">
        {code.trim()}
      </pre>
    </div>
  );
};
