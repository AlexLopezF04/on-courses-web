import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BarChart3, TrendingUp, ArrowLeft, Download, Activity } from 'lucide-react';

export const AnalyticsDashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00FF41] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Panel de Control</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-brand-500" />
              Analíticas Académicas & Reportes
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Indicadores clave de rendimiento (KPIs), ingresos por ventas y tasa de retención estudiantil.
            </p>
          </div>

          <button
            onClick={() => alert('Generando informe ejecutivo en formato PDF para la presentación...')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-400 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-300 transition-all cursor-pointer w-fit"
          >
            <Download className="h-4 w-4" />
            <span>Exportar Informe PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ingresos Totales</span>
            <span className="p-2 bg-emerald-100 text-emerald-600 border border-slate-950 font-bold text-xs">$</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">$4,850.00</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +18.5% este mes</span>
        </div>

        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tasa de Completado</span>
            <span className="p-2 bg-brand-100 text-brand-600 border border-slate-950 font-bold text-xs">%</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">84.2%</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +5.2% retención</span>
        </div>

        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Horas de Estudio</span>
            <span className="p-2 bg-amber-100 text-amber-600 border border-slate-950 font-bold text-xs">⏱</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">1,420 hrs</div>
          <span className="text-[10px] text-slate-400 font-bold">Lecciones vistas</span>
        </div>

        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Certificados Emitidos</span>
            <span className="p-2 bg-purple-100 text-purple-600 border border-slate-950 font-bold text-xs">🎓</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">128</div>
          <span className="text-[10px] text-emerald-600 font-bold">Verificados con QR</span>
        </div>
      </div>

      {/* Visual Charts Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Popular Courses Bar Graph */}
        <div className="lg:col-span-8 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00FF41]">
          <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-slate-950">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-500" />
              Inscripciones y Popularidad por Curso
            </h3>
            <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 border border-slate-950">SEMESTRE ACTUAL</span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Python para Principiantes: Desde Cero a Pro</span>
                <span className="font-mono">142 Estudiantes (42%)</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                <div className="h-full bg-brand-500 w-[85%] transition-all duration-1000" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>JavaScript Moderno (ES6+) y Desarrollo Web</span>
                <span className="font-mono">118 Estudiantes (35%)</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[70%] transition-all duration-1000" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Terminal Bash, Linux y Línea de Comandos</span>
                <span className="font-mono">94 Estudiantes (28%)</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                <div className="h-full bg-amber-500 w-[55%] transition-all duration-1000" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Git y GitHub: Control de Versiones para Devs</span>
                <span className="font-mono">82 Estudiantes (24%)</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                <div className="h-full bg-blue-500 w-[45%] transition-all duration-1000" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Bases de Datos SQL y Modelado Relacional</span>
                <span className="font-mono">68 Estudiantes (20%)</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                <div className="h-full bg-purple-500 w-[35%] transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log / Recent Activity */}
        <div className="lg:col-span-4 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00FF41]">
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-slate-950">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Bitácora del Sistema
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
              <span className="text-[10px] text-slate-400 font-mono block">Hace 10 min</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Sofía Ramírez completó el Módulo 3 de Python</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
              <span className="text-[10px] text-slate-400 font-mono block">Hace 25 min</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Prof. García creó la lección 'Async/Await'</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
              <span className="text-[10px] text-slate-400 font-mono block">Hace 1 hora</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Mateo Torres obtuvo Certificado en JS ES6+</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
              <span className="text-[10px] text-slate-400 font-mono block">Hace 3 horas</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Nuevo registro de usuario: @valeria.cardenas</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
