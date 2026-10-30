interface CartBadgeProps {
  count?: number;
}

export function CartBadge({ count = 0 }: CartBadgeProps) {
  return (
    <div className="cart-badge" aria-label={`Shopping cart with ${count} items`}>
      <span className="badge-icon">🛍️</span>
      <span className="badge-label">Cart:</span>
      <span className="badge-count">{count}</span>
    </div>
  );
}

