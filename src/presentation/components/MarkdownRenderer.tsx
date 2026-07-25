import React from 'react';
import { CodeBlockWithCopy } from './CodeBlockWithCopy';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split code blocks from standard markdown blocks
  const blocks = content.split('```');

  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
      {blocks.map((block, index) => {
        // Odd index means it is inside a ``` ... ``` code block
        if (index % 2 === 1) {
          const lines = block.trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-z0-9_-]+$/i.test(firstLine);
          const lang = hasLang ? firstLine : 'sql';
          const code = hasLang ? lines.slice(1).join('\n') : block;

          return <CodeBlockWithCopy key={index} code={code} language={lang} />;
        }

        // Even index: regular Markdown text paragraphs, headers, lists, quotes
        const lines = block.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

        const flushList = () => {
          if (currentList) {
            if (currentList.type === 'ul') {
              elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1.5 font-medium my-3 pl-2 text-slate-800 dark:text-slate-200">
                  {currentList.items.map((item, i) => (
                    <li key={i}>{formatInlineMarkdown(item)}</li>
                  ))}
                </ul>
              );
            } else {
              elements.push(
                <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1.5 font-medium my-3 pl-2 text-slate-800 dark:text-slate-200">
                  {currentList.items.map((item, i) => (
                    <li key={i}>{formatInlineMarkdown(item)}</li>
                  ))}
                </ol>
              );
            }
            currentList = null;
          }
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();

          if (!trimmed) {
            flushList();
            return;
          }

          // Unordered List (- or *)
          if (/^[-*]\s+/.test(trimmed)) {
            const itemText = trimmed.replace(/^[-*]\s+/, '');
            if (currentList && currentList.type === 'ul') {
              currentList.items.push(itemText);
            } else {
              flushList();
              currentList = { type: 'ul', items: [itemText] };
            }
            return;
          }

          // Ordered List (1. 2.)
          if (/^\d+\.\s+/.test(trimmed)) {
            const itemText = trimmed.replace(/^\d+\.\s+/, '');
            if (currentList && currentList.type === 'ol') {
              currentList.items.push(itemText);
            } else {
              flushList();
              currentList = { type: 'ol', items: [itemText] };
            }
            return;
          }

          // Any non-list line flushes list
          flushList();

          // Headers
          if (trimmed.startsWith('# ')) {
            elements.push(
              <h1 key={lineIdx} className="font-display text-2xl font-black text-slate-950 dark:text-white mt-6 mb-3 border-b-2 border-slate-950 pb-2">
                {formatInlineMarkdown(trimmed.replace('# ', ''))}
              </h1>
            );
            return;
          }

          if (trimmed.startsWith('## ')) {
            elements.push(
              <h2 key={lineIdx} className="font-display text-xl font-extrabold text-slate-950 dark:text-white mt-5 mb-2 border-b border-slate-300 dark:border-slate-800 pb-1">
                {formatInlineMarkdown(trimmed.replace('## ', ''))}
              </h2>
            );
            return;
          }

          if (trimmed.startsWith('### ')) {
            elements.push(
              <h3 key={lineIdx} className="font-display text-base font-extrabold text-slate-950 dark:text-white mt-4 mb-1.5 flex items-center gap-2">
                {formatInlineMarkdown(trimmed.replace('### ', ''))}
              </h3>
            );
            return;
          }

          if (trimmed.startsWith('#### ')) {
            elements.push(
              <div key={lineIdx} className="my-3 p-3 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                {formatInlineMarkdown(trimmed.replace('#### ', ''))}
              </div>
            );
            return;
          }

          // Blockquote
          if (trimmed.startsWith('> ')) {
            elements.push(
              <blockquote key={lineIdx} className="my-3 p-3 bg-slate-100 dark:bg-slate-850 border-l-4 border-[#00cc33] text-slate-700 dark:text-slate-300 font-medium italic">
                {formatInlineMarkdown(trimmed.replace('> ', ''))}
              </blockquote>
            );
            return;
          }

          // Horizontal rule
          if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
            elements.push(<hr key={lineIdx} className="my-6 border-slate-950 dark:border-slate-800 border-t-2" />);
            return;
          }

          // Standard paragraph
          elements.push(
            <p key={lineIdx} className="leading-relaxed font-medium mb-2.5">
              {formatInlineMarkdown(trimmed)}
            </p>
          );
        });

        flushList();

        return <React.Fragment key={index}>{elements}</React.Fragment>;
      })}
    </div>
  );
};

function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Split by inline code `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-slate-900 text-[#00ff41] font-mono text-[11px] border border-slate-700 rounded-sm">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Process bold **text** and italic *text*
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);

    return (
      <React.Fragment key={i}>
        {boldParts.map((bPart, j) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            return <strong key={j} className="font-extrabold text-slate-950 dark:text-white">{bPart.slice(2, -2)}</strong>;
          }

          const italicParts = bPart.split(/(\*[^*]+\*)/g);

          return italicParts.map((iPart, k) => {
            if (iPart.startsWith('*') && iPart.endsWith('*')) {
              return <em key={k} className="italic text-slate-900 dark:text-slate-100">{iPart.slice(1, -1)}</em>;
            }
            return iPart;
          });
        })}
      </React.Fragment>
    );
  });
}
