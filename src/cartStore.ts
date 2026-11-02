import { create } from 'zustand';
import type { Product, CartItem } from './types';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface CartState {
  items: CartItem[];
  status: CheckoutStatus;
  errorMessage: string | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  checkout: () => Promise<void>;
  clear: () => void;
  resetStatus: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  status: 'idle',
  errorMessage: null,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  checkout: async () => {
    const items = get().items;
    if (items.length === 0) return;

    set({ status: 'submitting', errorMessage: null });
    try {
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Checkout failed with status: ${res.status}`);
      }

      set({ items: [], status: 'success', errorMessage: null });
    } catch (err: unknown) {
      set({
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Checkout failed',
      });
    }
  },

  clear: () => set({ items: [], status: 'idle', errorMessage: null }),
  resetStatus: () => set({ status: 'idle', errorMessage: null }),
}));

