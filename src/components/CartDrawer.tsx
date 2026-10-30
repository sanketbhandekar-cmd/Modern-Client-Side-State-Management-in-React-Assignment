import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import { CartItemsList } from './CartItemsList';

interface CartDrawerProps {
  items?: CartItem[];
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  children?: ReactNode;
}

export function CartDrawer({
  items = [],
  onRemove,
  onCheckout,
  children,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <aside className="cart-drawer">
      <h2 className="drawer-title">Shopping Cart</h2>
      {children ?? (
        <>
          <CartItemsList items={items} onRemove={onRemove} />
          {items.length > 0 && (
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="btn-checkout"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}
    </aside>
  );
}

