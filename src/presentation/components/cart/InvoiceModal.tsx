import React from 'react';
import { Course } from '@domain/entities/Course';
import { Button } from '../Button';
import { Printer, CheckCircle2, ArrowRight, Download, FileText } from 'lucide-react';
import { BillingDetails } from './PaymentCheckoutModal';

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose?: () => void;
  courses: Course[];
  billing: BillingDetails;
  paymentMethod: string;
  totalRaw: number;
  totalFinal: number;
  discountAmount: number;
  invoiceNumber: string;
  invoiceDate: string;
  onGoToCourses: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose: _onClose,
  courses,
  billing,
  paymentMethod,
  totalRaw,
  totalFinal,
  discountAmount,
  invoiceNumber,
  invoiceDate,
  onGoToCourses,
}) => {
  if (!isOpen) return null;

  const isFree = totalFinal === 0;
  const subtotalBeforeTax = totalFinal / 1.15;
  const taxAmount = totalFinal - subtotalBeforeTax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto print:p-0 print:bg-white">
      <div className="w-full max-w-2xl bg-white text-slate-950 border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] my-8 overflow-hidden print:border-none print:shadow-none print:my-0">
        
        {/* Header Ribbon */}
        <div className="bg-[#00cc33] text-slate-950 px-6 py-4 border-b-2 border-slate-950 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-7 w-7" />
            <div>
              <h3 className="font-display font-black text-xl leading-none">¡Inscripción & Pago Exitoso!</h3>
              <p className="text-xs font-bold mt-1">Se ha generado tu comprobante electrónico de compra.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white text-slate-950 font-black text-xs uppercase border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Invoice Main Body (Printable) */}
        <div className="p-8 space-y-6 bg-white" id="invoice-printable">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-950 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-6 w-6 text-[#00cc33]" />
                <h2 className="font-display font-black text-2xl tracking-tight text-slate-950">OnCourses</h2>
              </div>
              <p className="text-xs font-bold text-slate-600">OnCourses Learning Platforms S.A.</p>
              <p className="text-[11px] font-mono text-slate-500">RUC: 1793049281001 • Autorización SRI #202604812</p>
              <p className="text-[11px] font-mono text-slate-500">Av. República E7-123 y Almagro, Quito, Ecuador</p>
            </div>

            <div className="text-left sm:text-right border-l-2 sm:border-l-0 border-slate-950 pl-4 sm:pl-0">
              <span className="inline-block bg-slate-950 text-white font-mono font-black text-xs px-3 py-1 uppercase tracking-wider mb-2">
                FACTURA ELECTRÓNICA
              </span>
              <p className="text-sm font-mono font-black text-slate-950">No. {invoiceNumber}</p>
              <p className="text-xs font-mono text-slate-600 mt-1">Fecha: {invoiceDate}</p>
              <p className="text-xs font-mono font-bold text-emerald-700 mt-1">Forma de Pago: {paymentMethod.toUpperCase()}</p>
            </div>
          </div>

          {/* Customer Details Box */}
          <div className="border-2 border-slate-950 bg-slate-50 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] block">Cliente / Razon Social:</span>
              <span className="font-extrabold text-slate-950 text-sm">{billing.billingName}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] block">Cédula / RUC / Pasaporte:</span>
              <span className="font-mono font-black text-slate-950 text-sm">{billing.taxId}</span>
            </div>
            {billing.billingEmail && (
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Correo Electrónico:</span>
                <span className="font-medium text-slate-800">{billing.billingEmail}</span>
              </div>
            )}
            {billing.billingAddress && (
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Dirección:</span>
                <span className="font-medium text-slate-800">{billing.billingAddress}</span>
              </div>
            )}
          </div>

          {/* Table of Purchased Items */}
          <div className="border-2 border-slate-950 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-white font-black uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Descripción del Curso</th>
                  <th className="py-2.5 px-4 text-center">Cant.</th>
                  <th className="py-2.5 px-4 text-right">Precio Unit.</th>
                  <th className="py-2.5 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y border-t-2 border-slate-950 font-medium">
                {courses.map((course) => {
                  const priceNum = parseFloat(course.price) || 0;
                  return (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-950">
                        {course.title}
                        <span className="block text-[10px] font-mono font-normal text-slate-500">
                          Acceso Vitalicio • Campus Virtual OnCourses
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">1</td>
                      <td className="py-3 px-4 text-right font-mono">${priceNum.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono font-extrabold">${priceNum.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown Table */}
          <div className="flex justify-end pt-2">
            <div className="w-full max-w-xs border-2 border-slate-950 bg-slate-50 p-4 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Bruto:</span>
                <span>${totalRaw.toFixed(2)} USD</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Descuento Promocional:</span>
                  <span>-${discountAmount.toFixed(2)} USD</span>
                </div>
              )}

              {!isFree && (
                <div className="flex justify-between text-slate-600">
                  <span>IVA Incluido (15%):</span>
                  <span>${taxAmount.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t-2 border-slate-950">
                <span>VALOR TOTAL:</span>
                <span className="text-base text-[#00cc33] font-mono font-black">${totalFinal.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-500 font-mono">
            Documento de Validez Tributaria • Emitido electrónicamente por OnCourses Ecuador. ¡Gracias por tu compra!
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 bg-slate-100 border-t-2 border-slate-950 flex flex-col sm:flex-row gap-3 items-center justify-between print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 bg-white text-slate-950 border-2 border-slate-950 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#00cc33]" />
            <span>Descargar Factura (PDF)</span>
          </button>

          <Button
            onClick={onGoToCourses}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider"
          >
            <span>Ir a mis Cursos Matriculados</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
