import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '../cartStore';

/**
 * Uses useShallow so selecting both `items` and `removeItem`
 * compares shallowly and avoids re-rendering on unrelated store updates.
 */
export function CartItemsList() {
  const { items, removeItem } = useCartStore(
    useShallow((s) => ({ items: s.items, removeItem: s.removeItem })),
  );

  if (items.length === 0) {
    return <div className="cart-empty-message">Your cart is empty.</div>;
  }

  return (
    <ul className="cart-items-list">
      {items.map((item) => (
        <li key={item.id} className="cart-item">
          <div className="cart-item-info">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-meta">
              ${item.price} &times; {item.qty} = ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            className="btn-remove"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
