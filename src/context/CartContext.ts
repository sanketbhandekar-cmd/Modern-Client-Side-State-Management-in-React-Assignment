import { createContext, useContext, type Dispatch } from 'react';
import type { Product, CartItem } from '../types';

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'added'; product: Product }
  | { type: 'removed'; id: string }
  | { type: 'cleared' };

/**
 * Pure reducer function for cart state transitions.
 * Guarantees immutability and predictability.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'added': {
      const existing = state.items.find((i) => i.id === action.product.id);
      return {
        items: existing
          ? state.items.map((i) =>
              i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i,
            )
          : [...state.items, { ...action.product, qty: 1 }],
      };
    }
    case 'removed':
      return {
        items: state.items.filter((i) => i.id !== action.id),
      };
    case 'cleared':
      return {
        items: [],
      };
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`);
  }
}

// Separate contexts to eliminate wasteful consumer re-renders
export const CartStateContext = createContext<CartState | null>(null);
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

/**
 * Custom hook to consume the cart state.
 * Throws a descriptive error when invoked outside <CartProvider>.
 */
export function useCartState(): CartState {
  const ctx = useContext(CartStateContext);
  if (!ctx) {
    throw new Error('useCartState must be used within <CartProvider>');
  }
  return ctx;
}

/**
 * Custom hook to consume the cart dispatch function.
 * Throws a descriptive error when invoked outside <CartProvider>.
 */
export function useCartDispatch(): Dispatch<CartAction> {
  const ctx = useContext(CartDispatchContext);
  if (!ctx) {
    throw new Error('useCartDispatch must be used within <CartProvider>');
  }
  return ctx;
}

