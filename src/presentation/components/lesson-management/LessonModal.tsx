import React, { useState } from 'react';
import { Module } from '@domain/entities/Module';
import { Input } from '../Input';
import { Button } from '../Button';
import { ShieldAlert, FileCode2, Terminal, BookOpen, Code2 } from 'lucide-react';

interface LessonModalProps {
  isOpen: boolean;
  isEditing: boolean;
  modules: Module[];
  title: string;
  content: string;
  videoUrl: string;
  order: string;
  moduleId: number | '';
  loading: boolean;
  error: string | null;
  onTitleChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onVideoUrlChange: (val: string) => void;
  onOrderChange: (val: string) => void;
  onModuleChange: (val: number | '') => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  isEditing,
  modules,
  title,
  content,
  videoUrl,
  order,
  moduleId,
  loading,
  error,
  onTitleChange,
  onContentChange,
  onVideoUrlChange,
  onOrderChange,
  onModuleChange,
  onClose,
  onSubmit,
}) => {
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');

  if (!isOpen) return null;

  const insertTemplate = (type: 'manual' | 'code' | 'theory' | 'sublesson') => {
    let templateText = '';
    if (type === 'sublesson') {
      templateText = `#### 📌 Sub-lección 1.1: Titulo del Sub-paso Específico
Explicación detallada de esta sub-lección secundaria dentro del tema.

\`\`\`bash
# Comandos específicos para este sub-paso
npm run test
\`\`\``;
    } else if (type === 'manual') {
      templateText = `### 🛠️ Guía Paso a Paso: Manual de Instalación

#### 1. Requisitos Previos:
- Sistema Operativo: Windows / Linux / macOS.
- Tener instalado Node.js (v18+) o Python (3.10+).

#### 2. Comandos de Instalación:
\`\`\`bash
# Clonar el repositorio
git clone https://github.com/ejemplo/repositorio.git
cd repositorio

# Instalar dependencias del proyecto
npm install
\`\`\`

#### 3. Configuración del Entorno:
Crea un archivo \`.env\` en la raíz del proyecto con la siguiente variable:
\`\`\`bash
PORT=3000
DATABASE_URL=postgres://localhost:5432/mydb
\`\`\`

#### 4. Ejecución del Servidor:
\`\`\`bash
# Iniciar en modo desarrollo
npm run dev
\`\`\`

#### 5. Verificación Final:
Ingresa en tu navegador a \`http://localhost:3000\` para comprobar el correcto despliegue.`;
    } else if (type === 'code') {
      templateText = `### 💻 Tutorial Práctico: Implementación de Código

#### Explicación del Algoritmo:
En este tutorial aprenderás la lógica fundamental para procesar la información de forma eficiente.

#### Código Fuente:
\`\`\`python
# Ejemplo de función principal en Python
def procesar_datos(lista_elementos):
    """
    Función para iterar y filtrar registros válidos
    """
    resultados = [item for item in lista_elementos if item > 0]
    print(f"Total procesados correctamente: {len(resultados)}")
    return resultados

if __name__ == "__main__":
    datos = [10, -5, 20, 0, 30]
    procesar_datos(datos)
\`\`\`

#### Reto / Ejercicio:
Modifica la condición dentro de la lista para filtrar únicamente números pares.`;
    } else if (type === 'theory') {
      templateText = `### 📖 Guía Teórica y Conceptos Clave

#### 1. Concepto Fundamental:
Descripción clara y estructurada sobre los principios del tema.

#### 2. Ventajas Principales:
- **Rendimiento:** Optimización en tiempo de ejecución.
- **Escalabilidad:** Estructura modular y limpia.
- **Mantenibilidad:** Fácil refactorización para equipos DEV.

#### 3. Referencias y Documentación Oficial:
Consulta los enlaces oficiales para profundizar en los conceptos avanzados.`;
    }

    onContentChange(content ? `${content}\n\n${templateText}` : templateText);
  };

  const insertSnippet = (snippet: string) => {
    onContentChange(content ? `${content}\n\n${snippet}` : snippet);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-slate-950 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-black text-slate-950 dark:text-white">
              {isEditing ? '✏️ Editar Tema / Lección' : '➕ Crear Nuevo Tema / Manual'}
            </h2>
            <span className="text-xs font-mono bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950 font-extrabold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">TEMA</span>
          </div>

          <div className="flex border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-slate-950 text-white dark:bg-[#00cc33] dark:text-slate-950'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              ✏️ Editor
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-[#00cc33] text-slate-950 font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              👁️ Vista Previa en Vivo
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900 dark:text-rose-200 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
            <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {viewMode === 'preview' ? (
          /* Live Preview Display Container */
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
            <div className="border-b-2 border-slate-950 dark:border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00cc33] uppercase">VISTA PREVIA EN VIVO</span>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{title || 'Título de la Lección / Manual'}</h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 border border-slate-950 bg-amber-400 text-slate-950">
                Orden: {order || '1'}
              </span>
            </div>

            {videoUrl && (
              <div className="border-2 border-slate-950 bg-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-slate-900 px-3 py-1 text-[10px] font-mono text-emerald-400 border-b border-slate-800">
                  ▶ VIDEO DE LA CLASE
                </div>
                <div className="aspect-video">
                  <iframe
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={title}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <article className="prose dark:prose-invert max-w-none space-y-4 text-xs sm:text-sm">
              {content ? (
                content.split('```').map((block, i) => {
                  if (i % 2 === 1) {
                    const lines = block.trim().split('\n');
                    const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : 'code';
                    const codeContent = lines[0].match(/^[a-z]+/i) ? lines.slice(1).join('\n') : block;

                    return (
                      <div key={i} className="my-4 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] overflow-x-auto">
                        <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold">
                          <span>{lang}</span>
                          <span>Console Output</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{codeContent.trim()}</pre>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="space-y-3">
                      {block.split('\n\n').map((para, j) => {
                        if (para.startsWith('### ')) {
                          return <h3 key={j} className="text-base font-black text-slate-950 dark:text-white mt-4 mb-1">{para.replace('### ', '')}</h3>;
                        }
                        if (para.startsWith('#### ')) {
                          return (
                            <div key={j} className="my-2 p-2 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200">
                              {para.replace('#### ', '')}
                            </div>
                          );
                        }
                        if (para.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
                          return (
                            <ul key={j} className="list-disc list-inside space-y-1 text-xs text-slate-800 dark:text-slate-200 font-medium pl-2">
                              {para.split('\n').map((item, k) => (
                                <li key={k}>{item.replace(/^[-*]\s+/, '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={j} className="text-xs sm:text-sm leading-relaxed font-medium">{para}</p>;
                      })}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 border border-dashed border-slate-400 text-center text-slate-400 text-xs italic">
                  Escribe contenido en el editor para previsualizarlo aquí.
                </div>
              )}
            </article>

            <div className="pt-4 border-t-2 border-slate-950 dark:border-slate-800 flex justify-end gap-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setViewMode('editor')}>
                ✏️ Volver al Editor
              </Button>
            </div>
          </div>
        ) : (
          /* Editor Form */
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Sección Asociada (Módulo) *
                </label>
                <select
                  value={moduleId}
                  onChange={(e) => onModuleChange(e.target.value ? Number(e.target.value) : '')}
                  disabled={loading}
                  className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white px-4 py-2.5 text-xs font-bold outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] focus:border-[#00cc33]"
                  required
                >
                  <option value="">-- Selecciona una Sección --</option>
                  {modules.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.title}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Orden *"
                type="number"
                placeholder="1"
                value={order}
                onChange={(e) => onOrderChange(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Input
              label="Título del Tema / Manual *"
              placeholder="Ej: Manual 1.1: Instalación de Entorno y Comandos Terminal"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              disabled={loading}
              required
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Enlace de Video (Opcional si es Manual o Guía escrita)"
                placeholder="https://www.youtube.com/watch?v=... (Dejar vacío si no requiere video)"
                type="url"
                value={videoUrl}
                onChange={(e) => onVideoUrlChange(e.target.value)}
                disabled={loading}
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                💡 Para manuales paso a paso o tutoriales teóricos sin video, puedes dejar este campo en blanco.
              </span>
            </div>

            {/* Quick Preset Buttons & Code Snippet Toolbar */}
            <div className="flex flex-col gap-2 pt-2 border-t-2 border-slate-950 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Contenido del Manual / Tutorial / Guía (Markdown & Código)
                </label>
              </div>

              {/* Template Presets Bar */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-950 p-2.5 border-2 border-slate-950 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 mr-1">
                  Insertar Plantilla:
                </span>
                <button
                  type="button"
                  onClick={() => insertTemplate('manual')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-amber-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <Terminal className="h-3.5 w-3.5 text-amber-600" />
                  <span>🛠️ Manual Instalación</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('code')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-emerald-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <Code2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>💻 Tutorial Código</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('sublesson')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-purple-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <span>📌 Sub-lección</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('theory')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-blue-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                  <span>📖 Guía Teórica</span>
                </button>
              </div>

              {/* Quick Code Block Snippets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  Añadir Bloque de Código:
                </span>
                <button
                  type="button"
                  onClick={() => insertSnippet("```bash\n# Comandos terminal\n```")}
                  className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
                >
                  + Terminal (bash)
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("```python\n# Codigo Python\n```")}
                  className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
                >
                  + Python
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("```sql\n-- Consultas SQL\n```")}
                  className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
                >
                  + SQL
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("```javascript\n// Codigo JavaScript/TypeScript\n```")}
                  className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
                >
                  + JS/TS
                </button>
              </div>

              <textarea
                placeholder="Escribe aquí el manual paso a paso o el tutorial con instrucciones y bloques de código..."
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                disabled={loading}
                rows={8}
                className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white px-4 py-3 text-xs font-mono outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] focus:border-[#00cc33] resize-y"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t-2 border-slate-950 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm" isLoading={loading} className="flex items-center gap-1.5">
                <FileCode2 className="h-4 w-4" />
                <span>{isEditing ? 'Guardar Cambios' : 'Crear Tema / Manual'}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
