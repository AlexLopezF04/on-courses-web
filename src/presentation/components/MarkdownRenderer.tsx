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

        // Regular Markdown text processing
        const lines = block.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
        let currentTable: { headers: string[]; rows: string[][] } | null = null;

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

        const flushTable = () => {
          if (currentTable && currentTable.headers.length > 0) {
            elements.push(
              <div key={`table-${elements.length}`} className="my-6 overflow-x-auto border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-[#00ff41] border-b-2 border-slate-950 font-mono text-[11px] font-bold uppercase tracking-wider">
                      {currentTable.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-3 px-4 border-r border-slate-800 last:border-r-0">
                          {formatInlineMarkdown(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y border-t border-slate-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                    {currentTable.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                        {r.map((c, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-4 border-r border-slate-200 dark:border-slate-800 last:border-r-0">
                            {formatInlineMarkdown(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            currentTable = null;
          }
        };

        const flushAll = () => {
          flushList();
          flushTable();
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();

          if (!trimmed) {
            flushAll();
            return;
          }

          // Markdown Table Row Detection
          if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            flushList(); // Table ends any list
            const cells = trimmed
              .split('|')
              .slice(1, -1)
              .map((c) => c.trim());

            // Skip delimiter lines like | --- | --- |
            const isDelimiter = cells.every((c) => /^:?-+:?$/.test(c));
            if (isDelimiter) {
              return;
            }

            if (!currentTable) {
              currentTable = { headers: cells, rows: [] };
            } else {
              currentTable.rows.push(cells);
            }
            return;
          }

          // Non-table line flushes table
          flushTable();

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

        flushAll();

        return <React.Fragment key={index}>{elements}</React.Fragment>;
      })}
    </div>
  );
};

// Inline Markdown parser for Bold, Italic, Inline Code and Links
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

    // Process links [Label](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const linkMatches: Array<{ label: string; url: string; index: number; length: number }> = [];
    let match;

    while ((match = linkRegex.exec(part)) !== null) {
      linkMatches.push({
        label: match[1],
        url: match[2],
        index: match.index,
        length: match[0].length,
      });
    }

    if (linkMatches.length > 0) {
      const linkElements: React.ReactNode[] = [];
      let lastIdx = 0;

      linkMatches.forEach((m, mIdx) => {
        if (m.index > lastIdx) {
          linkElements.push(formatBoldItalics(part.substring(lastIdx, m.index), `${i}-${mIdx}-pre`));
        }
        linkElements.push(
          <a
            key={`${i}-${mIdx}-link`}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00cc33] dark:text-[#00ff41] font-bold underline hover:text-brand-500 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{m.label}</span>
            <span className="text-[10px]">↗</span>
          </a>
        );
        lastIdx = m.index + m.length;
      });

      if (lastIdx < part.length) {
        linkElements.push(formatBoldItalics(part.substring(lastIdx), `${i}-post`));
      }

      return <React.Fragment key={i}>{linkElements}</React.Fragment>;
    }

    return <React.Fragment key={i}>{formatBoldItalics(part, `${i}`)}</React.Fragment>;
  });
}

function formatBoldItalics(text: string, keyPrefix: string): React.ReactNode {
  if (!text) return null;

  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);

  return boldParts.map((bPart, j) => {
    if (bPart.startsWith('**') && bPart.endsWith('**')) {
      return <strong key={`${keyPrefix}-b-${j}`} className="font-extrabold text-slate-950 dark:text-white">{bPart.slice(2, -2)}</strong>;
    }

    const italicParts = bPart.split(/(\*[^*]+\*)/g);

    return italicParts.map((iPart, k) => {
      if (iPart.startsWith('*') && iPart.endsWith('*')) {
        return <em key={`${keyPrefix}-i-${j}-${k}`} className="italic text-slate-900 dark:text-slate-100">{iPart.slice(1, -1)}</em>;
      }
      return iPart;
    });
  });
}
