import { useCartStore } from '../cartStore';

export function CartBadge() {
  const count = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.qty, 0),
  );

  return (
    <div className="cart-badge" aria-label={`Shopping cart with ${count} items`}>
      <span className="badge-icon">🛍️</span>
      <span className="badge-label">Cart:</span>
      <span className="badge-count">{count}</span>
    </div>
  );
}
