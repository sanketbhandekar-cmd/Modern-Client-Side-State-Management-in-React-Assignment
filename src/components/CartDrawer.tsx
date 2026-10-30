import { useCartState } from '../context/CartContext';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const { items } = useCartState();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    alert(`Checkout triggered for ${items.length} item(s). Total: $${total.toFixed(2)}`);
  };

  return (
    <aside className="cart-drawer">
      <h2 className="drawer-title">Shopping Cart</h2>
      <CartItemsList />
      {items.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total-amount">${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn-checkout"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </aside>
  );
}
