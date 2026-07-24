import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../Button';
import { ShoppingBag, Trash2, Tag, CheckCircle2, ArrowRight, X, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    clearCart,
    appliedCoupon,
    discountPercent,
    applyCoupon,
    removeCoupon,
    getTotalPrice,
    getDiscountedTotal,
  } = useCartStore();

  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const totalRaw = getTotalPrice();
  const totalFinal = getDiscountedTotal();
  const discountAmount = totalRaw - totalFinal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1200);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setCheckoutSuccess(false);
    closeCart();
    navigate(user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l-2 border-slate-950 flex flex-col h-full shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-8px_0px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
        {/* Retro OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono">
              ONCOURSES.APP/CART ({items.length})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={closeCart}
              className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 bg-white hover:bg-rose-500 hover:text-white transition-colors cursor-pointer select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            >
              X
            </button>
          </div>
        </div>

        {/* Checkout Success Screen */}
        {checkoutSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-[#00cc33] text-slate-950 border-2 border-slate-950 flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white mb-2">
              ¡Inscripción Exitosa! 🎉
            </h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Te has inscrito correctamente a tus nuevos cursos. Ya están disponibles en tu Campus Estudiantil.
            </p>
            <Button onClick={handleFinishCheckout} className="w-full flex items-center justify-center gap-2">
              <span>Ir a mis Cursos</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 border-2 border-slate-950 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h4 className="font-display text-lg font-black text-slate-950 dark:text-white mb-1">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                    Explora nuestro catálogo completo y agrega tus cursos de programación preferidos.
                  </p>
                  <Button
                    onClick={() => {
                      closeCart();
                      navigate('/courses');
                    }}
                    variant="primary"
                    size="sm"
                  >
                    Explorar Cursos
                  </Button>
                </div>
              ) : (
                items.map((course) => {
                  const priceNum = parseFloat(course.price) || 0;
                  return (
                    <div
                      key={course.id}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-slate-950 border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] transition-all"
                    >
                      <div className="w-14 h-14 bg-slate-900 border border-slate-950 shrink-0 overflow-hidden flex items-center justify-center text-white font-extrabold text-xs">
                        {course.cover_image ? (
                          <img
                            src={course.cover_image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{course.title.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-xs font-black text-slate-950 dark:text-white truncate">
                          {course.title}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {course.professor_name || 'Profesor OnCourses'}
                        </p>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1">
                          {priceNum === 0 ? 'GRATIS' : `$${priceNum.toFixed(2)} USD`}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(course.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-slate-950 transition-all cursor-pointer"
                        title="Eliminar curso"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 shrink-0 space-y-3">
                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-1.5">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Código: ALEXLOPEZ"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs font-bold font-mono border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white uppercase outline-none focus:border-brand-500"
                      />
                    </div>
                    <Button type="submit" size="sm" variant="outline">
                      Aplicar
                    </Button>
                  </div>

                  {couponFeedback && (
                    <p
                      className={`text-[11px] font-bold ${
                        couponFeedback.success
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 p-1.5 text-emerald-900 dark:text-emerald-200">
                      <span>Cupón {appliedCoupon} ({discountPercent}% DESC)</span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-rose-600 hover:underline font-extrabold cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-1 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal ({items.length} cursos):</span>
                    <span className="font-bold">${totalRaw.toFixed(2)} USD</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Descuento aplicado:</span>
                      <span>-${discountAmount.toFixed(2)} USD</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white pt-1.5 border-t border-slate-950 dark:border-slate-800">
                    <span>TOTAL A PAGAR:</span>
                    <span className="text-base text-[#00cc33] font-mono">${totalFinal.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  isLoading={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 py-3"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{totalFinal === 0 ? 'Inscribirme Gratis' : 'Completar Compra'}</span>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
