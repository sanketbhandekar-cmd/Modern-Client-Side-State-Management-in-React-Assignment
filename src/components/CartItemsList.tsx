import type { CartItem } from '../types';

interface CartItemsListProps {
  items?: CartItem[];
  onRemove?: (id: string) => void;
}

export function CartItemsList({ items = [], onRemove }: CartItemsListProps) {
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
            onClick={() => onRemove?.(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

