import { create } from 'zustand';
import { Course } from '@domain/entities/Course';

interface CartState {
  items: Course[];
  isOpen: boolean;
  appliedCoupon: string | null;
  discountPercent: number;
  addItem: (course: Course) => boolean;
  removeItem: (courseId: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getTotalPrice: () => number;
  getDiscountedTotal: () => number;
}

const STORAGE_KEY = 'oncourses_cart_v1';

const getInitialItems = (): Course[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveItems = (items: Course[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Failed to save cart to localStorage', err);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: getInitialItems(),
  isOpen: false,
  appliedCoupon: null,
  discountPercent: 0,

  addItem: (course: Course) => {
    const { items } = get();
    const exists = items.some((item) => item.id === course.id);
    if (exists) {
      set({ isOpen: true });
      return false;
    }
    const newItems = [...items, course];
    saveItems(newItems);
    set({ items: newItems, isOpen: true });
    return true;
  },

  removeItem: (courseId: number) => {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== courseId);
    saveItems(newItems);
    set({ items: newItems });
  },

  clearCart: () => {
    saveItems([]);
    set({ items: [], appliedCoupon: null, discountPercent: 0 });
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  applyCoupon: (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return { success: false, message: 'Ingresa un código promocional' };
    }
    if (clean === 'ALEXLOPEZ' || clean === 'PROMO100' || clean === 'ONCOURSES100' || clean === 'PROFESOR') {
      set({ appliedCoupon: clean, discountPercent: 100 });
      return { success: true, message: '¡Cupón de 100% de descuento aplicado con éxito! 🎉' };
    }
    if (clean === 'BECA50' || clean === 'ESTUDIANTE50') {
      set({ appliedCoupon: clean, discountPercent: 50 });
      return { success: true, message: '¡Cupón de 50% de descuento aplicado con éxito! 🚀' };
    }
    if (clean === 'ONCOURSES20' || clean === 'DEV20') {
      set({ appliedCoupon: clean, discountPercent: 20 });
      return { success: true, message: '¡Cupón de 20% de descuento aplicado con éxito! ⚡' };
    }
    return { success: false, message: 'Código promocional no válido o expirado' };
  },

  removeCoupon: () => set({ appliedCoupon: null, discountPercent: 0 }),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((acc, item) => {
      const priceNum = parseFloat(item.price) || 0;
      return acc + priceNum;
    }, 0);
  },

  getDiscountedTotal: () => {
    const total = get().getTotalPrice();
    const discount = get().discountPercent;
    const finalAmount = total * (1 - discount / 100);
    return Math.max(0, parseFloat(finalAmount.toFixed(2)));
  },
}));
