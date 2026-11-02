import { useCartStore } from '../cartStore';
import { CartItemsList } from './CartItemsList';
import { CartErrorBanner } from './CartErrorBanner';
import { CheckoutButton } from './CheckoutButton';

/**
 * Decomposed CartDrawer housing CartItemsList, CartErrorBanner, and CheckoutButton.
 * The drawer container does not re-render on checkout state transitions because
 * each leaf sub-component subscribes to its own specific slice.
 */
export function CartDrawer() {
  const total = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
  const hasItems = useCartStore((s) => s.items.length > 0);

  return (
    <aside className="cart-drawer">
      <h2 className="drawer-title">Shopping Cart</h2>

      <CartErrorBanner />
      <CartItemsList />

      {hasItems && (
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total-amount">${total.toFixed(2)}</span>
          </div>
          <CheckoutButton />
        </div>
      )}
    </aside>
  );
}
