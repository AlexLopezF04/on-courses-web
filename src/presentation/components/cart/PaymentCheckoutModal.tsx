import React, { useState } from 'react';
import { Course } from '@domain/entities/Course';
import { Button } from '../Button';
import { CreditCard, Building2, Wallet, Receipt, Lock, ShieldCheck, X } from 'lucide-react';

export interface BillingDetails {
  taxId: string;
  billingName: string;
  billingEmail: string;
  billingAddress: string;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  totalRaw: number;
  totalFinal: number;
  discountAmount: number;
  appliedCoupon?: string | null;
  discountPercent?: number;
  onCompleteCheckout: (billing: BillingDetails, paymentMethod: string) => Promise<void>;
}

export const PaymentCheckoutModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  courses,
  totalRaw,
  totalFinal,
  discountAmount,
  appliedCoupon,
  discountPercent = 0,
  onCompleteCheckout,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'paypal'>('card');

  // Billing Form State
  const [taxId, setTaxId] = useState('1723456789001');
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingAddress, setBillingAddress] = useState('Quito, Ecuador');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFree = totalFinal === 0;
  const subtotalBeforeTax = totalFinal / 1.15;
  const taxAmount = totalFinal - subtotalBeforeTax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFree) {
      if (!taxId.trim()) {
        setError('Por favor ingresa tu número de Cédula o RUC para la factura');
        return;
      }
      if (!billingName.trim()) {
        setError('Por favor ingresa el Nombre o Razón Social para la factura');
        return;
      }
    }

    setIsLoading(true);
    try {
      await onCompleteCheckout(
        {
          taxId: taxId.trim() || 'Consumidor Final',
          billingName: billingName.trim() || 'Estudiante OnCourses',
          billingEmail: billingEmail.trim(),
          billingAddress: billingAddress.trim(),
        },
        paymentMethod
      );
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar el pago y la matrícula');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] my-8 overflow-hidden text-slate-950 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-100 dark:bg-slate-950 border-b-2 border-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00cc33] text-slate-950 border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-slate-950 dark:text-white leading-none">
                {isFree ? 'Matrícula Gratuita de Cursos' : 'Pasarela de Pago Segura & Facturación'}
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                OnCourses Checkout v2.4 • Encriptación SSL 256-bit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-slate-950 font-black text-slate-950 bg-white hover:bg-rose-500 hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-rose-100 dark:bg-rose-950/60 border-2 border-rose-600 text-rose-900 dark:text-rose-200 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ⚠️ {error}
            </div>
          )}

          {/* Courses Summary Box */}
          <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-[#00cc33]" />
              Resumen de Cursos a Adquirir ({courses.length})
            </h4>
            <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-36 overflow-y-auto pr-1">
              {courses.map((c) => (
                <div key={c.id} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-extrabold truncate max-w-md">{c.title}</span>
                  <span className="font-mono font-bold shrink-0 ml-2">
                    {parseFloat(c.price) === 0 ? 'GRATIS' : `$${parseFloat(c.price).toFixed(2)} USD`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!isFree && (
            <>
              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                  1. Selecciona tu Método de Pago *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#00cc33] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Tarjeta Crédito/Débito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'transfer'
                        ? 'bg-amber-400 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Transferencia / Deuna</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'bg-sky-400 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span>PayPal / Crypto</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Sub-form */}
              {paymentMethod === 'card' && (
                <div className="p-4 border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Datos de la Tarjeta</span>
                    <div className="flex gap-1.5 text-[10px] font-black font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 border border-slate-950">
                      <span>VISA</span> • <span>MC</span> • <span>AMEX</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">Expiración (MM/AA)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">CVC / CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="p-4 border-2 border-slate-950 bg-amber-50 dark:bg-amber-950/40 text-xs space-y-2">
                  <span className="font-extrabold text-amber-900 dark:text-amber-200 block">
                    🏦 Cuentas Bancarias de Transferencia Directa (Ecuador):
                  </span>
                  <div className="font-mono text-[11px] space-y-1 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-2.5 border border-slate-950">
                    <p>• <strong>Banco Pichincha:</strong> Cta. Cta. #2100492810 - OnCourses S.A. (RUC: 1793049281001)</p>
                    <p>• <strong>Banco Guayaquil:</strong> Cta. Cta. #0012948192 - OnCourses S.A.</p>
                    <p>• <strong>Deuna!:</strong> Escanea el QR o envía al 0991234567</p>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                    * Tu matrícula se activará automáticamente al procesar la confirmación.
                  </p>
                </div>
              )}

              {/* Billing Info Form */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                  2. Datos de Facturación Electrónica (SRI Ecuador) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Cédula / RUC *</label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="1723456789001"
                      className="w-full px-3 py-1.5 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Nombre / Razón Social *</label>
                    <input
                      type="text"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      placeholder="Ej: María Gómez"
                      className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Correo para Factura</label>
                    <input
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="facturacion@correo.com"
                      className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Dirección</label>
                    <input
                      type="text"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      placeholder="Av. 10 de Agosto N24-12"
                      className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Pricing Breakdown Summary */}
          <div className="p-4 border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 space-y-1.5 text-xs font-medium">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal Cursos:</span>
              <span className="font-bold">${totalRaw.toFixed(2)} USD</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Descuento ({appliedCoupon}):</span>
                <span>-${discountAmount.toFixed(2)} USD</span>
              </div>
            )}

            {!isFree && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>IVA Incluido (15%):</span>
                <span className="font-bold">${taxAmount.toFixed(2)} USD</span>
              </div>
            )}

            <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white pt-2 border-t-2 border-slate-950">
              <span>TOTAL NETO A PAGAR:</span>
              <span className="text-lg font-mono text-[#00cc33] font-black">${totalFinal.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border-2 border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase hover:bg-slate-200 cursor-pointer"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider"
            >
              <Lock className="h-4 w-4" />
              <span>{isFree ? 'Confirmar Matrícula Gratuita' : `Pagar $${totalFinal.toFixed(2)} USD y Matricularme`}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
