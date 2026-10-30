import { useAtomValue, useSetAtom } from 'jotai';
import { cartTotalAtom, cartCountAtom, clearCartAtom } from '../cartAtoms';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const total = useAtomValue(cartTotalAtom);
  const count = useAtomValue(cartCountAtom);
  const clearCart = useSetAtom(clearCartAtom);

  const handleCheckout = () => {
    alert(`Checkout triggered for ${count} item(s). Total: $${total.toFixed(2)}`);
  };

  return (
    <aside className="cart-drawer">
      <div className="drawer-header">
        <h2 className="drawer-title">Shopping Cart</h2>
        {count > 0 && (
          <button type="button" className="btn-clear" onClick={() => clearCart()}>
            Clear
          </button>
        )}
      </div>

      <CartItemsList />

      {count > 0 && (
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
