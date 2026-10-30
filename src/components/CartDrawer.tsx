import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '../cartStore';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const { status, errorMessage, checkout, clear } = useCartStore(
    useShallow((s) => ({
      status: s.status,
      errorMessage: s.errorMessage,
      checkout: s.checkout,
      clear: s.clear,
    })),
  );

  // Derived selector: computes total on the fly without duplicating state
  const total = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
  const hasItems = useCartStore((s) => s.items.length > 0);

  return (
    <aside className="cart-drawer">
      <h2 className="drawer-title">Shopping Cart</h2>

      {status === 'success' && (
        <div className="cart-alert success">
          <span>Order placed successfully!</span>
          <button type="button" className="btn-dismiss" onClick={clear}>
            Dismiss
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="cart-alert error">
          <span>{errorMessage || 'Checkout failed. Please try again.'}</span>
          <button type="button" className="btn-dismiss" onClick={clear}>
            Dismiss
          </button>
        </div>
      )}

      <CartItemsList />

      {hasItems && (
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total-amount">${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn-checkout"
            disabled={status === 'submitting'}
            onClick={() => checkout()}
          >
            {status === 'submitting' ? 'Processing Order...' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </aside>
  );
}
