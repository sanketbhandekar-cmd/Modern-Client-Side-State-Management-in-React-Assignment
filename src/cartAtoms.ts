import { atom } from 'jotai';
import type { Product, CartItem } from './types';

// Primitive atom: holds the raw cart items array outside of components
export const cartItemsAtom = atom<CartItem[]>([]);

// Derived read-only atom: dynamically computes total item count without storing duplicate state
export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.qty, 0),
);

// Derived read-only atom: dynamically computes total cart price without storing duplicate state
export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.price * item.qty, 0),
);

// Write-only action atom: adds a product to the cart or increments its quantity
export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom);
  const existing = items.find((i) => i.id === product.id);
  set(
    cartItemsAtom,
    existing
      ? items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        )
      : [...items, { ...product, qty: 1 }],
  );
});

// Write-only action atom: removes an item by ID
export const removeItemAtom = atom(null, (get, set, id: string) => {
  set(cartItemsAtom, get(cartItemsAtom).filter((i) => i.id !== id));
});

// Write-only action atom: clears all items from the cart
export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, []);
});

